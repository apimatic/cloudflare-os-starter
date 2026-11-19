// The writes this connection has submitted, in the gatekeeper's own SQLite storage: a write waits
// here between `submitAction()` and its approval (or rejection), and its outcome stays for
// `getActionResult()`.
//
// A pending write's request holds whatever the caller sent, card details included, because applying
// it needs them. The request is erased the moment the write is applied or declined; only the
// outcome, which PayPal reports with the last four digits at most, is kept.

import type { OperationName } from "./paypal-operations.js";
import type { PayPalResult } from "./types.js";

export type ActionState = "pending" | "applying" | "applied" | "declined";

export type StoredAction = {
  id: number;
  op: OperationName;
  /** The caller's idempotency key (or, for a write without one, a key derived from its target). */
  key: string;
  /** The request with card details reduced to their last four digits, to tell a repeat from a reuse. */
  fingerprint: string;
  state: ActionState;
  /** Present until the action is applied or declined. */
  request?: unknown;
  /** Present once applied. */
  result?: PayPalResult<unknown>;
};

type Row = {
  id: number;
  op: string;
  key: string;
  fingerprint: string;
  state: string;
  request: string | null;
  result: string | null;
};

export class ActionStore {
  readonly #sql: SqlStorage;
  readonly #waiters = new Map<number, Set<() => void>>();

  constructor(sql: SqlStorage) {
    this.#sql = sql;
    sql.exec(`
      CREATE TABLE IF NOT EXISTS paypal_actions (
        id INTEGER PRIMARY KEY,
        op TEXT NOT NULL,
        key TEXT NOT NULL,
        fingerprint TEXT NOT NULL,
        state TEXT NOT NULL CHECK (state IN ('pending', 'applying', 'applied', 'declined')),
        request TEXT,
        result TEXT,
        submitted_at INTEGER NOT NULL
      );
      CREATE UNIQUE INDEX IF NOT EXISTS paypal_actions_key ON paypal_actions (op, key);
    `);
  }

  /** The earlier write of `op` under `key`, if any. */
  findByKey(op: OperationName, key: string): StoredAction | undefined {
    const row = this.#sql
      .exec<Row>("SELECT id, op, key, fingerprint, state, request, result FROM paypal_actions WHERE op = ? AND key = ?", op, key)
      .toArray()[0];
    return row && toAction(row);
  }

  get(id: number): StoredAction | undefined {
    const row = this.#sql
      .exec<Row>("SELECT id, op, key, fingerprint, state, request, result FROM paypal_actions WHERE id = ?", id)
      .toArray()[0];
    return row && toAction(row);
  }

  /** Records a new pending write and returns its action id (sequential within this connection). */
  insert(op: OperationName, key: string, fingerprint: string, request: unknown): number {
    const row = this.#sql
      .exec<{ id: number }>(
        "INSERT INTO paypal_actions (op, key, fingerprint, state, request, submitted_at) VALUES (?, ?, ?, 'pending', ?, ?) RETURNING id",
        op, key, fingerprint, JSON.stringify(request), Date.now(),
      )
      .one();
    return row.id;
  }

  /**
   * Frees the key of a finished write whose outcome a retry may change (it never reached PayPal, or
   * nobody knows whether it did), so the same key can be submitted again. The record stays, under
   * a key no caller can send, for `getActionResult()`.
   */
  retire(id: number): void {
    this.#sql.exec("UPDATE paypal_actions SET key = key || ' #' || id WHERE id = ?", id);
  }

  /** Forgets a write whose submission failed, so the same key can be submitted again. */
  remove(id: number): void {
    this.#sql.exec("DELETE FROM paypal_actions WHERE id = ? AND state = 'pending'", id);
  }

  /** Marks a pending write as being applied; false when it is not pending. */
  markApplying(id: number): boolean {
    const changed = this.#sql
      .exec("UPDATE paypal_actions SET state = 'applying' WHERE id = ? AND state = 'pending'", id)
      .rowsWritten;
    return changed > 0;
  }

  /** Puts an interrupted apply back to pending, so a retried `applyAction()` can run it. */
  markPending(id: number): void {
    this.#sql.exec("UPDATE paypal_actions SET state = 'pending' WHERE id = ? AND state = 'applying'", id);
  }

  /** Records the outcome and erases the request. */
  markApplied(id: number, result: PayPalResult<unknown>): void {
    this.#sql.exec(
      "UPDATE paypal_actions SET state = 'applied', result = ?, request = NULL WHERE id = ?",
      JSON.stringify(result), id,
    );
    this.#wake(id);
  }

  /** Records a rejection and erases the request. */
  markDeclined(id: number): void {
    this.#sql.exec(
      "UPDATE paypal_actions SET state = 'declined', request = NULL WHERE id = ? AND state IN ('pending', 'applying')",
      id,
    );
    this.#wake(id);
  }

  /** Resolves once `id` is applied or declined, or after `timeoutMs`, whichever is first. */
  async waitForDecision(id: number, timeoutMs: number): Promise<void> {
    const settled = (): boolean => {
      const state = this.get(id)?.state;
      return state === "applied" || state === "declined" || state === undefined;
    };
    if (settled()) return;
    let wake!: () => void;
    const woken = new Promise<void>(resolve => { wake = resolve; });
    const waiters = this.#waiters.get(id) ?? new Set();
    waiters.add(wake);
    this.#waiters.set(id, waiters);
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([woken, new Promise<void>(resolve => { timer = setTimeout(resolve, timeoutMs); })]);
    } finally {
      if (timer !== undefined) clearTimeout(timer);
      waiters.delete(wake);
      if (waiters.size === 0) this.#waiters.delete(id);
    }
  }

  #wake(id: number): void {
    for (const wake of this.#waiters.get(id) ?? []) wake();
  }
}

function toAction(row: Row): StoredAction {
  const action: StoredAction = {
    id: row.id,
    op: row.op as OperationName,
    key: row.key,
    fingerprint: row.fingerprint,
    state: row.state as ActionState,
  };
  if (row.request !== null) action.request = JSON.parse(row.request);
  if (row.result !== null) action.result = JSON.parse(row.result);
  return action;
}
