// The PayPal gatekeeper, in the starter's custom-gatekeeper slot: the class names are the slot's
// (`cf-os deploy` binds `GatekeeperVendor` as GATEKEEPER_CUSTOM, and `CustomGatekeeper` is the
// Durable Object class its migration created), everything else is PayPal's.
//
// One account per user, provisioned without a connect flow, whose singleton is the deployment's
// shared PayPal sandbox account. See paypal-session.ts for the session and its write protocol.

import {
  DurableObject,
  RpcStub,
  WorkerEntrypoint,
} from "cloudflare:workers";
import { skipRpcValidation, validateRpc } from "capnweb-validate";
import type {
  AccountDescription,
  ActionKind,
  AgentCatalog,
  ApprovalQueue,
  Gatekeeper,
  GatekeeperConnectCallback,
  GatekeeperConnectOptions,
  GatekeeperUser,
  GatekeeperUserVerifier,
  GitCache,
  ResourceConfiguratorFrame,
  ResourceDescription,
  SupportedResource,
  VendorDescription,
} from "@gadgets/workshop-shared/gatekeeper";
import { ActionStore } from "./paypal-actions.js";
import { PayPalNotConfiguredError, payPalClient } from "./paypal-client.js";
import { runOperation } from "./paypal-operations.js";
import { PAYPAL_ACTION_KIND, PayPalSessionImpl } from "./paypal-session.js";
import type { PayPalResult, PayPalSandbox } from "./types.js";
import TYPES_CODE from "./types-code.js";

const PAYPAL_ICON = {
  url:
    "data:image/svg+xml," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='none' stroke='currentColor' stroke-width='20' stroke-linejoin='round'><path d='M88 216l24-152h64c28 0 44 18 38 44-6 30-30 44-58 44h-36l-12 64z'/><path d='M60 192l24-152'/></svg>",
    ),
};

const SESSION_TYPE = "PayPalSandbox";

export function describeCustomVendor(): VendorDescription {
  return {
    displayName: "PayPal (sandbox)",
    url: "https://developer.paypal.com/tools/sandbox/",
    logo: PAYPAL_ICON,
    color: "#e6f0fb",
    tagline: "Take test payments through PayPal's sandbox",
    description:
      "Orders, card authorizations, captures, refunds, saved cards and transaction search against " +
      "this deployment's PayPal sandbox account. No real money moves.",
    autoProvisionsAccount: true,
    providesAuth: false,
  };
}

export function describeCustomAccount(): AccountDescription {
  return {
    displayName: "PayPal sandbox",
    avatar: PAYPAL_ICON,
    singleton: { tsType: SESSION_TYPE },
  };
}

@validateRpc()
export class CustomGatekeeper extends DurableObject<Cloudflare.Env> implements Gatekeeper<PayPalSandbox> {
  #store: ActionStore | undefined;

  get #actions(): ActionStore {
    this.#store ??= new ActionStore(this.ctx.storage.sql);
    return this.#store;
  }

  async describe(): Promise<ResourceDescription> {
    return {
      url: "paypal-sandbox://account",
      title: "PayPal sandbox",
      snippet: "The deployment's PayPal sandbox account: orders, payments, saved cards and transactions.",
      suggestedBindingName: "PAYPAL",
      tsType: SESSION_TYPE,
    };
  }

  async getTypeScriptTypes(): Promise<string> {
    return TYPES_CODE;
  }

  async getAutoApprovableActions(): Promise<ActionKind[]> {
    return [PAYPAL_ACTION_KIND];
  }

  /** No catalog: the session's types say everything there is to know. */
  async getAgentCatalog(): Promise<AgentCatalog | null> {
    return null;
  }

  async startSession(approvalQueue: RpcStub<ApprovalQueue>): Promise<PayPalSandbox> {
    return new PayPalSessionImpl(approvalQueue.dup(), {
      store: this.#actions,
      client: () => payPalClient(this.env),
    });
  }

  /**
   * The sandbox account is shared by everyone the deployment provisions this connector for, so a
   * collaborator may see what a Gadget read through it exactly when they hold a PayPal account
   * here too: every verifier this vendor mints answers yes, and one minted elsewhere cannot answer.
   * (The binding is one atomic resource, so nothing per read is tracked.)
   */
  async addObserver(_id: string, user: Fetcher<GatekeeperUserVerifier>): Promise<void> {
    const verifier = user as unknown as Fetcher<CustomVerifier>;
    let holds = false;
    try {
      holds = (await verifier.holdsPayPalSandboxAccount()) === true;
    } catch {
      holds = false;
    }
    if (!holds) {
      throw new Error("This person has no PayPal sandbox connection here, so they cannot see PayPal data this Gadget read.");
    }
  }

  async removeObserver(_id: string): Promise<void> {}

  // `cache` is the workspace's git cache, which PayPal actions never use.
  async applyAction(action: number, _cache?: RpcStub<GitCache>): Promise<void> {
    const store = this.#actions;
    const stored = store.get(action);
    if (!stored) throw new Error(`No PayPal action ${action}.`);
    if (stored.state === "applied") return;
    if (!store.markApplying(action)) throw new Error(`PayPal action ${action} is ${stored.state}.`);

    let result: PayPalResult<unknown>;
    try {
      result = await runOperation(payPalClient(this.env), stored.op, stored.request);
    } catch (err) {
      if (err instanceof PayPalNotConfiguredError) {
        result = { kind: "error", error: { kind: "api", name: "NOT_CONFIGURED", message: err.message } };
      } else {
        // A fault outside the SDK: leave the write pending so a retried apply can run it.
        store.markPending(action);
        throw err;
      }
    }
    // A PayPal error is an outcome, not a failed apply: the call was made and PayPal answered.
    store.markApplied(action, result);
  }

  async rejectAction(action: number): Promise<void> {
    this.#actions.markDeclined(action);
  }

  async revertAction(action: number): Promise<void> {
    throw new Error(`PayPal calls cannot be reverted (${action}); issue the opposite call instead.`);
  }
}

@validateRpc()
export class CustomAccount extends WorkerEntrypoint<Cloudflare.Env> implements GatekeeperUser {
  async describe(): Promise<AccountDescription> {
    return describeCustomAccount();
  }

  async getSingletonGatekeeperClass(): Promise<DurableObjectClass<Gatekeeper<PayPalSandbox>>> {
    return this.ctx.exports.CustomGatekeeper({});
  }

  async getSupportedResources(): Promise<SupportedResource[]> {
    return [];
  }

  getGatekeeperClassFor(_url: string): never {
    throw new Error("The PayPal gatekeeper has no URL-addressed resources.");
  }

  startResourceConfigurator(_resourceUrlPattern: string): Promise<ResourceConfiguratorFrame> {
    throw new Error("The PayPal gatekeeper has no URL-addressed resources.");
  }

  async ensureResources(_resourceUrlPatterns: string[]): Promise<{ url?: string }> {
    return {};
  }

  async revoke(): Promise<void> {}

  reconnect(): Promise<{ url: string }> {
    throw new Error("The PayPal gatekeeper uses the deployment's credentials; there is nothing to reconnect.");
  }

  commitReconnect(_stageId: string): Promise<void> {
    throw new Error("The PayPal gatekeeper is auto-provisioned and has no connect flow.");
  }

  async getAuthenticatedEmail(): Promise<string | null> {
    return null;
  }

  @skipRpcValidation()
  async getVerifier(): Promise<Fetcher<GatekeeperUserVerifier>> {
    return this.ctx.exports.CustomVerifier({});
  }
}

@validateRpc()
export class CustomVerifier extends WorkerEntrypoint<Cloudflare.Env> implements GatekeeperUserVerifier {
  verify(): void {}

  /** Asked by addObserver(): a verifier from this vendor belongs to a PayPal account holder. */
  holdsPayPalSandboxAccount(): boolean {
    return true;
  }
}

@validateRpc()
export class GatekeeperVendor extends WorkerEntrypoint<Cloudflare.Env> {
  async describe(): Promise<VendorDescription> {
    return describeCustomVendor();
  }

  @skipRpcValidation()
  async createAccount(): Promise<Fetcher<GatekeeperUser>> {
    return this.ctx.exports.CustomAccount({});
  }

  connectAccount(
    _callback: Fetcher<GatekeeperConnectCallback>,
    _options?: GatekeeperConnectOptions,
  ): Promise<{ url: string }> {
    throw new Error("The PayPal gatekeeper is auto-provisioned and has no connect flow.");
  }

  async getSupportedResources(_options?: { userId?: string }): Promise<SupportedResource[]> {
    return [];
  }

  async getTypeScriptTypes(): Promise<string> {
    return TYPES_CODE;
  }
}
