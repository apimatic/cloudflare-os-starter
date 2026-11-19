import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The carrier for the shipment. Some carriers have a global version as well as local subsidiaries.
 * The subsidiaries are repeated over many countries and might also have an entry in the global
 * list. Choose the carrier for your country. If the carrier is not available for your country,
 * choose the global version of the carrier. If your carrier name is not in the list, set `carrier`
 * to `OTHER` and set carrier name in `carrier_name_other`. For allowed values, see Carriers.
 */
export declare const ShipmentCarrier: {
    /** DPD Russia. */
    readonly DpdRu: "DPD_RU";
    /** Bulgarian Posts. */
    readonly BgBulgarianPost: "BG_BULGARIAN_POST";
    /** Koreapost (www.koreapost.go.kr). */
    readonly KrKoreaPost: "KR_KOREA_POST";
    /** Courier IT. */
    readonly ZaCourierit: "ZA_COURIERIT";
    /** DPD France (formerly exapaq). */
    readonly FrExapaq: "FR_EXAPAQ";
    /** Emirates Post. */
    readonly AreEmiratesPost: "ARE_EMIRATES_POST";
    /** GAC. */
    readonly Gac: "GAC";
    /** Geis CZ. */
    readonly Geis: "GEIS";
    /** SF Express. */
    readonly SfEx: "SF_EX";
    /** Pago Logistics. */
    readonly Pago: "PAGO";
    /** MyHermes UK. */
    readonly Myhermes: "MYHERMES";
    /** Diamond Eurogistics Limited. */
    readonly DiamondEurogistics: "DIAMOND_EUROGISTICS";
    /** Corporate Couriers. */
    readonly CorporatecouriersWebhook: "CORPORATECOURIERS_WEBHOOK";
    /** Bond courier. */
    readonly Bond: "BOND";
    /** Omni Parcel. */
    readonly Omniparcel: "OMNIPARCEL";
    /** Slovenska pošta. */
    readonly SkPosta: "SK_POSTA";
    /** purolator. */
    readonly Purolator: "PUROLATOR";
    /** Mena 360 (Fetchr). */
    readonly FetchrWebhook: "FETCHR_WEBHOOK";
    /** TDG – The Delivery Group. */
    readonly Thedeliverygroup: "THEDELIVERYGROUP";
    /** Cello Square. */
    readonly CelloSquare: "CELLO_SQUARE";
    /** TONDA GLOBAL. */
    readonly Tarrive: "TARRIVE";
    /** MDS Collivery Pty (Ltd). */
    readonly Collivery: "COLLIVERY";
    /** Mainfreight. */
    readonly Mainfreight: "MAINFREIGHT";
    /** First Flight Couriers. */
    readonly IndFirstflight: "IND_FIRSTFLIGHT";
    /** ACS Worldwide Express. */
    readonly Acsworldwide: "ACSWORLDWIDE";
    /** Amstan Logistics. */
    readonly Amstan: "AMSTAN";
    /** OkayParcel. */
    readonly Okayparcel: "OKAYPARCEL";
    /** Envialia Reference. */
    readonly EnvialiaReference: "ENVIALIA_REFERENCE";
    /** Seur Spain. */
    readonly SeurEs: "SEUR_ES";
    /** Continental. */
    readonly Continental: "CONTINENTAL";
    /** FDSEXPRESS. */
    readonly Fdsexpress: "FDSEXPRESS";
    /** Swiship UK. */
    readonly AmazonFbaSwiship: "AMAZON_FBA_SWISHIP";
    /** Wyngs. */
    readonly Wyngs: "WYNGS";
    /** DHL Active Tracing. */
    readonly DhlActiveTracing: "DHL_ACTIVE_TRACING";
    /** Zyllem. */
    readonly Zyllem: "ZYLLEM";
    /** Ruston. */
    readonly Ruston: "RUSTON";
    /** Xpost.ph. */
    readonly Xpost: "XPOST";
    /** correos Express (www.correos.es). */
    readonly CorreosEs: "CORREOS_ES";
    /** DHL France (www.dhl.com). */
    readonly DhlFr: "DHL_FR";
    /** Pan-Asia International. */
    readonly PanAsia: "PAN_ASIA";
    /** BRT couriers Italy (www.brt.it). */
    readonly BrtIt: "BRT_IT";
    /** SRE Korea (www.srekorea.co.kr). */
    readonly SreKorea: "SRE_KOREA";
    /** Spee-Dee Delivery. */
    readonly Speedee: "SPEEDEE";
    /** TNT UK Limited (www.tnt.com). */
    readonly TntUk: "TNT_UK";
    /** Venipak. */
    readonly Venipak: "VENIPAK";
    /** SHREE NANDAN COURIER. */
    readonly Shreenandancourier: "SHREENANDANCOURIER";
    /** Croshot. */
    readonly Croshot: "CROSHOT";
    /** NIpost (www.nipost.gov.ng). */
    readonly NipostNg: "NIPOST_NG";
    /** ePost Global. */
    readonly EpstGlbl: "EPST_GLBL";
    /** Newgistics. */
    readonly Newgistics: "NEWGISTICS";
    /** Post of Slovenia. */
    readonly PostSlovenia: "POST_SLOVENIA";
    /** Jersey Post. */
    readonly JerseyPost: "JERSEY_POST";
    /** Bombino Express Pvt. */
    readonly Bombinoexp: "BOMBINOEXP";
    /** WMG Delivery. */
    readonly Wmg: "WMG";
    /** XQ Express. */
    readonly XqExpress: "XQ_EXPRESS";
    /** Furdeco. */
    readonly Furdeco: "FURDECO";
    /** LHT Express. */
    readonly LhtExpress: "LHT_EXPRESS";
    /** South African Post Office. */
    readonly SouthAfricanPostOffice: "SOUTH_AFRICAN_POST_OFFICE";
    /** SPOTON Logistics Pvt Ltd. */
    readonly Spoton: "SPOTON";
    /** Dimerco Express Group. */
    readonly Dimerco: "DIMERCO";
    /** cyprus post. */
    readonly CyprusPostCyp: "CYPRUS_POST_CYP";
    /** AB Custom Group. */
    readonly Abcustom: "ABCUSTOM";
    /** deliverE. */
    readonly IndDelivree: "IND_DELIVREE";
    /** Best Express. */
    readonly CnBestexpress: "CN_BESTEXPRESS";
    /** DX (SFTP). */
    readonly DxSftp: "DX_SFTP";
    /** PICK UPP. */
    readonly PickuppMys: "PICKUPP_MYS";
    /** FMX. */
    readonly Fmx: "FMX";
    /** Hellmann Worldwide Logistics. */
    readonly Hellmann: "HELLMANN";
    /** Ship It Asia. */
    readonly ShipItAsia: "SHIP_IT_ASIA";
    /** Kerry eCommerce. */
    readonly KerryEcommerce: "KERRY_ECOMMERCE";
    /** Frete Rapido. */
    readonly Freterapido: "FRETERAPIDO";
    /** Pitney Bowes. */
    readonly PitneyBowes: "PITNEY_BOWES";
    /** Xpressen courier. */
    readonly XpressenDk: "XPRESSEN_DK";
    /** Spanish Seur API. */
    readonly SeurSpApi: "SEUR_SP_API";
    /** DELIVERYONTIME LOGISTICS PVT LTD. */
    readonly Deliveryontime: "DELIVERYONTIME";
    /** JINSUNG TRADING. */
    readonly Jinsung: "JINSUNG";
    /** Trans Kargo Internasional. */
    readonly TransKargo: "TRANS_KARGO";
    /** Swiship DE. */
    readonly SwishipDe: "SWISHIP_DE";
    /** Ivoy courier. */
    readonly IvoyWebhook: "IVOY_WEBHOOK";
    /** Airmee couriers. */
    readonly AirmeeWebhook: "AIRMEE_WEBHOOK";
    /** dhl benelux. */
    readonly DhlBenelux: "DHL_BENELUX";
    /** FirstMile. */
    readonly Firstmile: "FIRSTMILE";
    /** Fastway Ireland. */
    readonly FastwayIr: "FASTWAY_IR";
    /** Hua Han Logistics. */
    readonly HhExp: "HH_EXP";
    /** Mypostonline. */
    readonly MysMypostOnline: "MYS_MYPOST_ONLINE";
    /** THT Netherland. */
    readonly TntNl: "TNT_NL";
    /** TIPSA courier. */
    readonly Tipsa: "TIPSA";
    /** TAQBIN Malaysia. */
    readonly TaqbinMy: "TAQBIN_MY";
    /** KGM Hub. */
    readonly Kgmhub: "KGMHUB";
    /** Internet Express. */
    readonly Intexpress: "INTEXPRESS";
    /** Overseas Express. */
    readonly OverseExp: "OVERSE_EXP";
    /** One click delivery services. */
    readonly Oneclick: "ONECLICK";
    /** Roadbull Logistics. */
    readonly RoadrunnerFreight: "ROADRUNNER_FREIGHT";
    /** GLS Croatia. */
    readonly GlsCrotia: "GLS_CROTIA";
    /** MRW courier. */
    readonly MrwFtp: "MRW_FTP";
    /** Blue Express. */
    readonly Bluex: "BLUEX";
    /** Daylight Transport. */
    readonly Dylt: "DYLT";
    /** DPD Ireland. */
    readonly DpdIr: "DPD_IR";
    /** Sin Global Express. */
    readonly SinGlbl: "SIN_GLBL";
    /** Tuffnells Parcels Express- Reference. */
    readonly TuffnellsReference: "TUFFNELLS_REFERENCE";
    /** CJ Packet. */
    readonly Cjpacket: "CJPACKET";
    /** Milkman courier. */
    readonly Milkman: "MILKMAN";
    /** ASIGNA courier. */
    readonly Asigna: "ASIGNA";
    /** One World Express. */
    readonly Oneworldexpress: "ONEWORLDEXPRESS";
    /** RoyalShipments. */
    readonly RoyalMail: "ROYAL_MAIL";
    /** Viaxpress. */
    readonly ViaExpress: "VIA_EXPRESS";
    /** TIG Freight. */
    readonly Tigfreight: "TIGFREIGHT";
    /** ZTO Express. */
    readonly ZtoExpress: "ZTO_EXPRESS";
    /** 2GO Courier. */
    readonly TwoGo: "TWO_GO";
    /** IML courier. */
    readonly Iml: "IML";
    /** Intel-Valley Supply chain (ShenZhen) Co. Ltd. */
    readonly IntelValley: "INTEL_VALLEY";
    /** EFS (E-commerce Fulfillment Service). */
    readonly Efs: "EFS";
    /** UK mail (ukmail.com). */
    readonly UkUkMail: "UK_UK_MAIL";
    /** RAM courier. */
    readonly Ram: "RAM";
    /** Allied Express. */
    readonly Alliedexpress: "ALLIEDEXPRESS";
    /** APC overnight (apc-overnight.com). */
    readonly ApcOvernight: "APC_OVERNIGHT";
    /** Shippit. */
    readonly Shippit: "SHIPPIT";
    /** TFM Xpress. */
    readonly Tfm: "TFM";
    /** M Xpress Sdn Bhd. */
    readonly MXpress: "M_XPRESS";
    /** Haidaibao (BOX). */
    readonly HdbBox: "HDB_BOX";
    /** Clevy Links. */
    readonly ClevyLinks: "CLEVY_LINKS";
    /** Beone Logistics. */
    readonly Ibeone: "IBEONE";
    /** Fiege Netherlands. */
    readonly FiegeNl: "FIEGE_NL";
    /** KWE Global. */
    readonly KweGlobal: "KWE_GLOBAL";
    /** CTC Express. */
    readonly CtcExpress: "CTC_EXPRESS";
    /** Amazon Shipping. */
    readonly Amazon: "AMAZON";
    /** Morelink. */
    readonly MoreLink: "MORE_LINK";
    /** JX courier. */
    readonly Jx: "JX";
    /** Easy Mail. */
    readonly EasyMail: "EASY_MAIL";
    /** A Duie Pyle. */
    readonly Aduiepyle: "ADUIEPYLE";
    /** Panther. */
    readonly GbPanther: "GB_PANTHER";
    /** Expresssale. */
    readonly Expresssale: "EXPRESSSALE";
    /** Detrack. */
    readonly SgDetrack: "SG_DETRACK";
    /** Trunkrs courier. */
    readonly TrunkrsWebhook: "TRUNKRS_WEBHOOK";
    /** Matdespatch. */
    readonly Matdespatch: "MATDESPATCH";
    /** GLS Logistic Systems Canada Ltd./Dicom. */
    readonly Dicom: "DICOM";
    /** MBW Courier Inc.. */
    readonly Mbw: "MBW";
    /** Cambodia Post. */
    readonly KhmCambodiaPost: "KHM_CAMBODIA_POST";
    /** Sinotrans. */
    readonly Sinotrans: "SINOTRANS";
    /** BRT Bartolini(Parcel ID). */
    readonly BrtItParcelid: "BRT_IT_PARCELID";
    /** DHL Supply Chain APAC. */
    readonly DhlSupplyChain: "DHL_SUPPLY_CHAIN";
    /** DHL Poland. */
    readonly DhlPl: "DHL_PL";
    /** TopYou. */
    readonly Topyou: "TOPYOU";
    /** PAL Express Limited. */
    readonly Palexpress: "PALEXPRESS";
    /** dhl Singapore. */
    readonly DhlSg: "DHL_SG";
    /** WeDo Logistics. */
    readonly CnWedo: "CN_WEDO";
    /** Fulfillme. */
    readonly Fulfillme: "FULFILLME";
    /** DPD delistrack. */
    readonly DpdDelistrack: "DPD_DELISTRACK";
    /** UPS Reference. */
    readonly UpsReference: "UPS_REFERENCE";
    /** Caribou. */
    readonly Caribou: "CARIBOU";
    /** Locus courier. */
    readonly LocusWebhook: "LOCUS_WEBHOOK";
    /** DSV courier. */
    readonly Dsv: "DSV";
    /** P2P TrakPak. */
    readonly P2PTrc: "P2P_TRC";
    /** Direct Parcels. */
    readonly Directparcels: "DIRECTPARCELS";
    /** Nova Poshta (International). */
    readonly NovaPoshtaInt: "NOVA_POSHTA_INT";
    /** FedEx® Poland Domestic. */
    readonly FedexPoland: "FEDEX_POLAND";
    /** JCEX courier. */
    readonly CnJcex: "CN_JCEX";
    /** FAR international. */
    readonly FarInternational: "FAR_INTERNATIONAL";
    /** IDEX courier. */
    readonly Idexpress: "IDEXPRESS";
    /** GANGBAO Supplychain. */
    readonly Gangbao: "GANGBAO";
    /** Neway Transport. */
    readonly Neway: "NEWAY";
    /** PostNL International. */
    readonly PostnlInt3S: "POSTNL_INT_3_S";
    /** RPX Indonesia. */
    readonly RpxId: "RPX_ID";
    /** Designer Transport. */
    readonly DesignertransportWebhook: "DESIGNERTRANSPORT_WEBHOOK";
    /** GLS Slovenia. */
    readonly GlsSloven: "GLS_SLOVEN";
    /** Parcelled.in. */
    readonly ParcelledIn: "PARCELLED_IN";
    /** GSI EXPRESS. */
    readonly GsiExpress: "GSI_EXPRESS";
    /** Con-way Freight. */
    readonly ConWay: "CON_WAY";
    /** Brouwer Transport en Logistiek. */
    readonly BrouwerTransport: "BROUWER_TRANSPORT";
    /** Captain Express International. */
    readonly Cpex: "CPEX";
    /** Israel Post. */
    readonly IsraelPost: "ISRAEL_POST";
    /** DTDC India. */
    readonly DtdcIn: "DTDC_IN";
    /** PTT Post. */
    readonly PttPost: "PTT_POST";
    /** Ximex Delivery Express. */
    readonly XdeWebhook: "XDE_WEBHOOK";
    /** Tolos courier. */
    readonly Tolos: "TOLOS";
    /** Giao hàng nhanh. */
    readonly GiaoHang: "GIAO_HANG";
    /** Geodis E-space. */
    readonly GeodisEspace: "GEODIS_ESPACE";
    /** Magyar Post. */
    readonly MagyarHu: "MAGYAR_HU";
    /** DoorDash. */
    readonly DoordashWebhook: "DOORDASH_WEBHOOK";
    /** Tiki shipment. */
    readonly TikiId: "TIKI_ID";
    /** CJ Logistics International(Hong Kong). */
    readonly CjHkInternational: "CJ_HK_INTERNATIONAL";
    /** Star Track Express. */
    readonly StarTrackExpress: "STAR_TRACK_EXPRESS";
    /** Helthjem. */
    readonly Helthjem: "HELTHJEM";
    /** SF International. */
    readonly Sfb2C: "SFB2C";
    /** Freightquote by C.H. Robinson. */
    readonly Freightquote: "FREIGHTQUOTE";
    /** Landmark Global Reference. */
    readonly LandmarkGlobalReference: "LANDMARK_GLOBAL_REFERENCE";
    /** Parcel2Go. */
    readonly Parcel2Go: "PARCEL2GO";
    /** Delnext. */
    readonly Delnext: "DELNEXT";
    /** Red Carpet Logistics. */
    readonly Rcl: "RCL";
    /** CGS Express. */
    readonly CgsExpress: "CGS_EXPRESS";
    /** Hongkong Post (www.hongkongpost.hk). */
    readonly HkPost: "HK_POST";
    /** SAP EXPRESS. */
    readonly SapExpress: "SAP_EXPRESS";
    /** Parcel Post Singapore. */
    readonly ParcelpostSg: "PARCELPOST_SG";
    /** HermesWorld UK. */
    readonly Hermes: "HERMES";
    /** Safexpress. */
    readonly IndSafeexpress: "IND_SAFEEXPRESS";
    /** Tophatter Express. */
    readonly Tophatterexpress: "TOPHATTEREXPRESS";
    /** PT MGLOBAL LOGISTICS INDONESIA. */
    readonly Mglobal: "MGLOBAL";
    /** Averitt Express. */
    readonly Averitt: "AVERITT";
    /** leader. */
    readonly Leader: "LEADER";
    /** 2ebox courier. */
    readonly _2Ebox: "_2EBOX";
    /** Singapore Speedpost. */
    readonly SgSpeedpost: "SG_SPEEDPOST";
    /** DB Schenker (www.dbschenker.com). */
    readonly DbschenkerSe: "DBSCHENKER_SE";
    /** Israel Post Domestic. */
    readonly IsrPostDomestic: "ISR_POST_DOMESTIC";
    /** Best Way Parcel. */
    readonly Bestwayparcel: "BESTWAYPARCEL";
    /** asendia_de. */
    readonly AsendiaDe: "ASENDIA_DE";
    /** nightline_uk. */
    readonly NightlineUk: "NIGHTLINE_UK";
    /** taqbin_sg. */
    readonly TaqbinSg: "TAQBIN_SG";
    /** TCK Express. */
    readonly TckExpress: "TCK_EXPRESS";
    /** Endeavour Delivery. */
    readonly EndeavourDelivery: "ENDEAVOUR_DELIVERY";
    /** Nanjing Woyuan. */
    readonly Nanjingwoyuan: "NANJINGWOYUAN";
    /** Heppner France. */
    readonly HeppnerFr: "HEPPNER_FR";
    /** EMPS Express. */
    readonly EmpsCn: "EMPS_CN";
    /** Fonsen Logistics. */
    readonly Fonsen: "FONSEN";
    /** Pickrr. */
    readonly Pickrr: "PICKRR";
    /** APC Overnight Consignment. */
    readonly ApcOvernightConnum: "APC_OVERNIGHT_CONNUM";
    /** Star Track Next Flight. */
    readonly StarTrackNextFlight: "STAR_TRACK_NEXT_FLIGHT";
    /** Shanghai Aqrum Chemical Logistics Co.Ltd. */
    readonly Dajin: "DAJIN";
    /** UPS Freight. */
    readonly UpsFreight: "UPS_FREIGHT";
    /** Posta Plus. */
    readonly PostaPlus: "POSTA_PLUS";
    /** CEVA LOGISTICS. */
    readonly Ceva: "CEVA";
    /** ANSERX courier. */
    readonly Anserx: "ANSERX";
    /** JS EXPRESS. */
    readonly JsExpress: "JS_EXPRESS";
    /** padtf.com. */
    readonly Padtf: "PADTF";
    /** UPS Mail Innovations. */
    readonly UpsMailInnovations: "UPS_MAIL_INNOVATIONS";
    /** Sunyou Post. */
    readonly Sypost: "SYPOST";
    /** Amazon Shipping + Amazon MCF. */
    readonly AmazonShipMcf: "AMAZON_SHIP_MCF";
    /** Yusen Logistics. */
    readonly Yusen: "YUSEN";
    /** Bring. */
    readonly Bring: "BRING";
    /** SDA Italy. */
    readonly SdaIt: "SDA_IT";
    /** GBA Services Ltd. */
    readonly Gba: "GBA";
    /** Newegg Express. */
    readonly Neweggexpress: "NEWEGGEXPRESS";
    /** Speed Couriers. */
    readonly SpeedcouriersGr: "SPEEDCOURIERS_GR";
    /** forrun Pvt Ltd (Arpatech Venture). */
    readonly Forrun: "FORRUN";
    /** Pickupp. */
    readonly Pickup: "PICKUP";
    /** ECMS International Logistics Co.. */
    readonly Ecms: "ECMS";
    /** Intelipost (TMS for LATAM). */
    readonly Intelipost: "INTELIPOST";
    /** Flash Express. */
    readonly Flashexpress: "FLASHEXPRESS";
    /** STO Express. */
    readonly CnSto: "CN_STO";
    /** SEKO Worldwide. */
    readonly SekoSftp: "SEKO_SFTP";
    /** Home Delivery Solutions Ltd. */
    readonly HomeDeliverySolutions: "HOME_DELIVERY_SOLUTIONS";
    /** DPD Hungary. */
    readonly DpdHgry: "DPD_HGRY";
    /** Kerry Express (Vietnam) Co Ltd. */
    readonly KerryttcVn: "KERRYTTC_VN";
    /** Joying Box. */
    readonly JoyingBox: "JOYING_BOX";
    /** Total Express. */
    readonly TotalExpress: "TOTAL_EXPRESS";
    /** ZJS International. */
    readonly ZjsExpress: "ZJS_EXPRESS";
    /** STARKEN couriers. */
    readonly Starken: "STARKEN";
    /** DemandShip. */
    readonly Demandship: "DEMANDSHIP";
    /** DPEX. */
    readonly CnDpex: "CN_DPEX";
    /** AuPost China. */
    readonly AupostCn: "AUPOST_CN";
    /** Logisters. */
    readonly Logisters: "LOGISTERS";
    /** Global Post. */
    readonly Goglobalpost: "GOGLOBALPOST";
    /** GLS Czech Republic. */
    readonly GlsCz: "GLS_CZ";
    /** Paack courier. */
    readonly PaackWebhook: "PAACK_WEBHOOK";
    /** Grab courier. */
    readonly GrabWebhook: "GRAB_WEBHOOK";
    /** Parcelpoint. */
    readonly Parcelpoint: "PARCELPOINT";
    /** iCumulus. */
    readonly Icumulus: "ICUMULUS";
    /** DAI Post. */
    readonly Daiglobaltrack: "DAIGLOBALTRACK";
    /** i-parcel. */
    readonly GlobalIparcel: "GLOBAL_IPARCEL";
    /** Yurtici Kargo. */
    readonly YurticiKargo: "YURTICI_KARGO";
    /** PayPal Package. */
    readonly CnPaypalPackage: "CN_PAYPAL_PACKAGE";
    /** Parcel To Post. */
    readonly Parcel2Post: "PARCEL_2_POST";
    /** GLS Italy. */
    readonly GlsIt: "GLS_IT";
    /** PIL Logistics (China) Co.. */
    readonly PilLogistics: "PIL_LOGISTICS";
    /** Heppner Internationale Spedition GmbH & Co.. */
    readonly Heppner: "HEPPNER";
    /** Go!Express and logistics. */
    readonly GeneralOvernight: "GENERAL_OVERNIGHT";
    /** Happy 2ThePoint. */
    readonly Happy2Point: "HAPPY2POINT";
    /** Chit Chats. */
    readonly Chitchats: "CHITCHATS";
    /** Smooth Couriers. */
    readonly Smooth: "SMOOTH";
    /** CL E-Logistics Solutions Limited. */
    readonly CleLogistics: "CLE_LOGISTICS";
    /** Fiege Logistics. */
    readonly Fiege: "FIEGE";
    /** M&X cargo. */
    readonly MxCargo: "MX_CARGO";
    /** Ziing Final Mile Inc. */
    readonly Ziingfinalmile: "ZIINGFINALMILE";
    /** Dayton Freight. */
    readonly DaytonFreight: "DAYTON_FREIGHT";
    /** TCS courier. */
    readonly Tcs: "TCS";
    /** AEX Group. */
    readonly Aex: "AEX";
    /** Hermes Germany. */
    readonly HermesDe: "HERMES_DE";
    /** Routific. */
    readonly RoutificWebhook: "ROUTIFIC_WEBHOOK";
    /** Globavend. */
    readonly Globavend: "GLOBAVEND";
    /** CJ Logistics International. */
    readonly CjLogistics: "CJ_LOGISTICS";
    /** The Pallet Network. */
    readonly PalletNetwork: "PALLET_NETWORK";
    /** RAF Philippines. */
    readonly RafPh: "RAF_PH";
    /** XDP Express. */
    readonly UkXdp: "UK_XDP";
    /** Paper Express. */
    readonly PaperExpress: "PAPER_EXPRESS";
    /** La Poste. */
    readonly LaPosteSuivi: "LA_POSTE_SUIVI";
    /** Paquetexpress. */
    readonly Paquetexpress: "PAQUETEXPRESS";
    /** liefery. */
    readonly Liefery: "LIEFERY";
    /** Streck Transport. */
    readonly StreckTransport: "STRECK_TRANSPORT";
    /** Pony express. */
    readonly PonyExpress: "PONY_EXPRESS";
    /** Always Express. */
    readonly AlwaysExpress: "ALWAYS_EXPRESS";
    /** GBS-Broker. */
    readonly GbsBroker: "GBS_BROKER";
    /** City-Link Express. */
    readonly CitylinkMy: "CITYLINK_MY";
    /** ALLJOY SUPPLY CHAIN. */
    readonly Alljoy: "ALLJOY";
    /** yodel. */
    readonly Yodel: "YODEL";
    /** Yodel Direct. */
    readonly YodelDir: "YODEL_DIR";
    /** STONE3PL. */
    readonly Stone3Pl: "STONE3PL";
    /** ParcelPal. */
    readonly ParcelpalWebhook: "PARCELPAL_WEBHOOK";
    /** DHL eCommerce Asia (API). */
    readonly DhlEcomerceAsa: "DHL_ECOMERCE_ASA";
    /** J&T Express Singapore. */
    readonly Simplypost: "SIMPLYPOST";
    /** Kua Yue Express. */
    readonly KyExpress: "KY_EXPRESS";
    /** shenzhen 1st International Logistics(Group)Co. */
    readonly Shenzhen: "SHENZHEN";
    /** LaserShip. */
    readonly UsLasership: "US_LASERSHIP";
    /** ucexpress. */
    readonly UcExpre: "UC_EXPRE";
    /** DIDADI Logistics tech. */
    readonly Didadi: "DIDADI";
    /** CJ Korea Express. */
    readonly CjKr: "CJ_KR";
    /** DB Schenker B2B. */
    readonly DbschenkerB2B: "DBSCHENKER_B2B";
    /** MXE Express. */
    readonly Mxe: "MXE";
    /** CAE Delivers. */
    readonly CaeDelivers: "CAE_DELIVERS";
    /** PFC Express. */
    readonly Pfcexpress: "PFCEXPRESS";
    /** Whistl. */
    readonly Whistl: "WHISTL";
    /** WePost Sdn Bhd. */
    readonly Wepost: "WEPOST";
    /** DHL parcel Spain(www.dhl.com). */
    readonly DhlParcelEs: "DHL_PARCEL_ES";
    /** DD Express Courier. */
    readonly Ddexpress: "DDEXPRESS";
    /** Aramex Australia (formerly Fastway AU). */
    readonly AramexAu: "ARAMEX_AU";
    /** Bneed courier. */
    readonly Bneed: "BNEED";
    /** Kerry Express Hong Kong. */
    readonly HkTgx: "HK_TGX";
    /** Latvijas Pasts. */
    readonly LatvijasPasts: "LATVIJAS_PASTS";
    /** ViaEurope. */
    readonly Viaeurope: "VIAEUROPE";
    /** Correo Uruguayo. */
    readonly CorreoUy: "CORREO_UY";
    /** Chronopost france (www.chronopost.fr). */
    readonly ChronopostFr: "CHRONOPOST_FR";
    /** J-Net. */
    readonly JNet: "J_NET";
    /** 6ls.com. */
    readonly _6Ls: "_6LS";
    /** Belpost. */
    readonly BlrBelpost: "BLR_BELPOST";
    /** BirdSystem. */
    readonly Birdsystem: "BIRDSYSTEM";
    /** DobroPost. */
    readonly Dobropost: "DOBROPOST";
    /** Wahana express (www.wahana.com). */
    readonly WahanaId: "WAHANA_ID";
    /** Weaship. */
    readonly Weaship: "WEASHIP";
    /** Sonic Transportation & Logistics. */
    readonly Sonictl: "SONICTL";
    /** Shenzhen Jinghuada Logistics Co.. */
    readonly Kwt: "KWT";
    /** AFL LOGISTICS. */
    readonly AfllogFtp: "AFLLOG_FTP";
    /** SkyNet Worldwide Express. */
    readonly SkynetWorldwide: "SKYNET_WORLDWIDE";
    /** Nova Poshta (novaposhta.ua). */
    readonly NovaPoshta: "NOVA_POSHTA";
    /** Seino. */
    readonly Seino: "SEINO";
    /** SZENDEX. */
    readonly Szendex: "SZENDEX";
    /** Bpost international. */
    readonly BpostInt: "BPOST_INT";
    /** DB Schenker Sweden. */
    readonly DbschenkerSv: "DBSCHENKER_SV";
    /** AO Deutschland. */
    readonly AoDeutschland: "AO_DEUTSCHLAND";
    /** EU Fleet Solutions. */
    readonly EuFleetSolutions: "EU_FLEET_SOLUTIONS";
    /** PCF Final Mile. */
    readonly Pcfcorp: "PCFCORP";
    /** Link Bridge(BeiJing)international logistics co.. */
    readonly Linkbridge: "LINKBRIDGE";
    /** PT Prima Multi Cipta. */
    readonly Primamulticipta: "PRIMAMULTICIPTA";
    /** Urbanfox. */
    readonly Courex: "COUREX";
    /** Zajil Express Company. */
    readonly ZajilExpress: "ZAJIL_EXPRESS";
    /** CollectCo. */
    readonly Collectco: "COLLECTCO";
    /** J&T EXPRESS MALAYSIA. */
    readonly Jtexpress: "JTEXPRESS";
    /** FedEx® UK. */
    readonly FedexUk: "FEDEX_UK";
    /** uShip courier. */
    readonly Uship: "USHIP";
    /** PIXSELL LOGISTICS. */
    readonly Pixsell: "PIXSELL";
    /** Shiptor. */
    readonly Shiptor: "SHIPTOR";
    /** CDEK courier. */
    readonly Cdek: "CDEK";
    /** ViettelPost. */
    readonly VnmViettelpost: "VNM_VIETTELPOST";
    /** CJ Century. */
    readonly CjCentury: "CJ_CENTURY";
    /** GSO(GLS-USA). */
    readonly Gso: "GSO";
    /** VIWO IoT. */
    readonly Viwo: "VIWO";
    /** SKYBOX. */
    readonly Skybox: "SKYBOX";
    /** Kerry TJ Logistics. */
    readonly Kerrytj: "KERRYTJ";
    /** Nhat Tin Logistics. */
    readonly NtlogisticsVn: "NTLOGISTICS_VN";
    /** lightning monkey. */
    readonly SdhScm: "SDH_SCM";
    /** Zinc courier. */
    readonly Zinc: "ZINC";
    /** DPE South Africa. */
    readonly DpeSouthAfrc: "DPE_SOUTH_AFRC";
    /** Czech Post. */
    readonly CeskaCz: "CESKA_CZ";
    /** ACS Courier. */
    readonly AcsGr: "ACS_GR";
    /** DealerSend. */
    readonly Dealersend: "DEALERSEND";
    /** Jocom. */
    readonly Jocom: "JOCOM";
    /** CSE courier. */
    readonly Cse: "CSE";
    /** TForce Final Mile. */
    readonly TforceFinalmile: "TFORCE_FINALMILE";
    /** ShipGate. */
    readonly ShipGate: "SHIP_GATE";
    /** SHIPTER. */
    readonly Shipter: "SHIPTER";
    /** National Sameday. */
    readonly NationalSameday: "NATIONAL_SAMEDAY";
    /** YunExpress. */
    readonly Yunexpress: "YUNEXPRESS";
    /** AliExpress Standard Shipping. */
    readonly Cainiao: "CAINIAO";
    /** DMSMatrix. */
    readonly DmsMatrix: "DMS_MATRIX";
    /** Directlog (www.directlog.com.br). */
    readonly Directlog: "DIRECTLOG";
    /** Asendia USA. */
    readonly AsendiaUs: "ASENDIA_US";
    /** 3JMS Logistics. */
    readonly _3Jmslogistics: "_3JMSLOGISTICS";
    /** LICCARDI EXPRESS COURIER. */
    readonly LiccardiExpress: "LICCARDI_EXPRESS";
    /** SkyPostal. */
    readonly SkyPostal: "SKY_POSTAL";
    /** cnwangtong. */
    readonly Cnwangtong: "CNWANGTONG";
    /** ostnord denmark. */
    readonly PostnordLogisticsDk: "POSTNORD_LOGISTICS_DK";
    /** Logistika. */
    readonly Logistika: "LOGISTIKA";
    /** Celeritas Transporte. */
    readonly Celeritas: "CELERITAS";
    /** Pressio. */
    readonly Pressiode: "PRESSIODE";
    /** Shree Maruti Courier Services Pvt Ltd. */
    readonly ShreeMaruti: "SHREE_MARUTI";
    /** Logistic Worldwide Express (LWE Honkong). */
    readonly LogisticsworldwideHk: "LOGISTICSWORLDWIDE_HK";
    /** eFEx (E-Commerce Fulfillment & Express). */
    readonly Efex: "EFEX";
    /** Lotte Global Logistics. */
    readonly Lotte: "LOTTE";
    /** Lone Star Overnight. */
    readonly Lonestar: "LONESTAR";
    /** Aprisa Express. */
    readonly Aprisaexpress: "APRISAEXPRESS";
    /** BEL North Russia. */
    readonly BelRs: "BEL_RS";
    /** OSM Worldwide. */
    readonly OsmWorldwide: "OSM_WORLDWIDE";
    /** Westgate Global. */
    readonly WestgateGl: "WESTGATE_GL";
    /** Fasttrack. */
    readonly Fastrack: "FASTRACK";
    /** DTD Express. */
    readonly DtdExpr: "DTD_EXPR";
    /** AlfaTrex. */
    readonly Alfatrex: "ALFATREX";
    /** ProMed Delivery. */
    readonly Promeddelivery: "PROMEDDELIVERY";
    /** Thabit Logistics. */
    readonly ThabitLogistics: "THABIT_LOGISTICS";
    /** HCT LOGISTICS CO.LTD.. */
    readonly HctLogistics: "HCT_LOGISTICS";
    /** Carry-Flap Co.. */
    readonly CarryFlap: "CARRY_FLAP";
    /** Old Dominion Freight Line. */
    readonly UsOldDominion: "US_OLD_DOMINION";
    /** ANICAM BOX EXPRESS. */
    readonly AnicamBox: "ANICAM_BOX";
    /** WanbExpress. */
    readonly Wanbexpress: "WANBEXPRESS";
    /** An Post. */
    readonly AnPost: "AN_POST";
    /** DPD Local. */
    readonly DpdLocal: "DPD_LOCAL";
    /** Stallion Express. */
    readonly Stallionexpress: "STALLIONEXPRESS";
    /** RaidereX. */
    readonly Raiderex: "RAIDEREX";
    /** ShopfansRU LLC. */
    readonly Shopfans: "SHOPFANS";
    /** Kyungdong Parcel. */
    readonly KyungdongParcel: "KYUNGDONG_PARCEL";
    /** Champion Logistics. */
    readonly ChampionLogistics: "CHAMPION_LOGISTICS";
    /** PICK UPP (Singapore). */
    readonly PickuppSgp: "PICKUPP_SGP";
    /** Morning Express. */
    readonly MorningExpress: "MORNING_EXPRESS";
    /** NACEX. */
    readonly Nacex: "NACEX";
    /** SortHub courier. */
    readonly ThenileWebhook: "THENILE_WEBHOOK";
    /** Holisol. */
    readonly Holisol: "HOLISOL";
    /** LBC EXPRESS INC.. */
    readonly LbcexpressFtp: "LBCEXPRESS_FTP";
    /** KURASI. */
    readonly Kurasi: "KURASI";
    /** USF Reddaway. */
    readonly UsfReddaway: "USF_REDDAWAY";
    /** APG eCommerce Solutions. */
    readonly Apg: "APG";
    /** BoxC courier. */
    readonly CnBoxc: "CN_BOXC";
    /** ECOSCOOTING. */
    readonly Ecoscooting: "ECOSCOOTING";
    /** Mainway. */
    readonly Mainway: "MAINWAY";
    /** Paperfly Private Limited. */
    readonly Paperfly: "PAPERFLY";
    /** Hound Express. */
    readonly Houndexpress: "HOUNDEXPRESS";
    /** Boxberry courier. */
    readonly BoxBerry: "BOX_BERRY";
    /** EP-Box courier. */
    readonly EpBox: "EP_BOX";
    /** Plus UK Logistics. */
    readonly PlusLogUk: "PLUS_LOG_UK";
    /** Fulfilla. */
    readonly Fulfilla: "FULFILLA";
    /** ASE KARGO. */
    readonly Ase: "ASE";
    /** MailPlus. */
    readonly MailPlus: "MAIL_PLUS";
    /** XPO logistics. */
    readonly XpoLogistics: "XPO_LOGISTICS";
    /** wnDirect. */
    readonly Wndirect: "WNDIRECT";
    /** Cloudwish Asia. */
    readonly CloudwishAsia: "CLOUDWISH_ASIA";
    /** Zeleris. */
    readonly Zeleris: "ZELERIS";
    /** Gio Express. */
    readonly GioExpress: "GIO_EXPRESS";
    /** OCS WORLDWIDE. */
    readonly OcsWorldwide: "OCS_WORLDWIDE";
    /** ARK Logistics. */
    readonly ArkLogistics: "ARK_LOGISTICS";
    /** Aquiline. */
    readonly Aquiline: "AQUILINE";
    /** Pilot Freight Services. */
    readonly PilotFreight: "PILOT_FREIGHT";
    /** Qwintry Logistics. */
    readonly Qwintry: "QWINTRY";
    /** Danske Fragtaend. */
    readonly DanskeFragt: "DANSKE_FRAGT";
    /** Carriers courier. */
    readonly Carriers: "CARRIERS";
    /** Rivo (Air canada). */
    readonly AirCanadaGlobal: "AIR_CANADA_GLOBAL";
    /** PRESIDENT TRANSNET CORP. */
    readonly PresidentTrans: "PRESIDENT_TRANS";
    /** STEP FORWARD FREIGHT SERVICE CO LTD. */
    readonly Stepforwardfs: "STEPFORWARDFS";
    /** Skynet UK. */
    readonly SkynetUk: "SKYNET_UK";
    /** PITT OHIO. */
    readonly Pittohio: "PITTOHIO";
    /** Correos Express. */
    readonly CorreosExpress: "CORREOS_EXPRESS";
    /** RL Carriers. */
    readonly RlUs: "RL_US";
    /** Destiny Transportation. */
    readonly Destiny: "DESTINY";
    /** Yodel (www.yodel.co.uk). */
    readonly UkYodel: "UK_YODEL";
    /** CometTech. */
    readonly CometTech: "COMET_TECH";
    /** DHL Parcel Russia. */
    readonly DhlParcelRu: "DHL_PARCEL_RU";
    /** TNT Reference. */
    readonly TntRefr: "TNT_REFR";
    /** Shree Anjani Courier. */
    readonly ShreeAnjaniCourier: "SHREE_ANJANI_COURIER";
    /** Mikropakket Belgium. */
    readonly MikropakketBe: "MIKROPAKKET_BE";
    /** RETS express. */
    readonly EtsExpress: "ETS_EXPRESS";
    /** Colis Privé. */
    readonly ColisPrive: "COLIS_PRIVE";
    /** Yunda Express. */
    readonly CnYunda: "CN_YUNDA";
    /** AAA Cooper. */
    readonly AaaCooper: "AAA_COOPER";
    /** Rocket Parcel International. */
    readonly RocketParcel: "ROCKET_PARCEL";
    /** 360 Lion Express. */
    readonly _360Lion: "_360LION";
    /** PANDU. */
    readonly Pandu: "PANDU";
    /** PROFESSIONAL COURIERS. */
    readonly ProfessionalCouriers: "PROFESSIONAL_COURIERS";
    /** FLYTEXPRESS. */
    readonly Flytexpress: "FLYTEXPRESS";
    /** LOGISTICSWORLDWIDE MY. */
    readonly LogisticsworldwideMy: "LOGISTICSWORLDWIDE_MY";
    /** CORREOS DE ESPANA. */
    readonly CorreosDeEspana: "CORREOS_DE_ESPANA";
    /** IMX. */
    readonly Imx: "IMX";
    /** FOUR PX EXPRESS. */
    readonly FourPxExpress: "FOUR_PX_EXPRESS";
    /** XPRESSBEES. */
    readonly Xpressbees: "XPRESSBEES";
    /** pickupp_vnm. */
    readonly PickuppVnm: "PICKUPP_VNM";
    /** startrack_express. */
    readonly StartrackExpress: "STARTRACK_EXPRESS";
    /** fr_colissimo. */
    readonly FrColissimo: "FR_COLISSIMO";
    /** nacex_spain_reference. */
    readonly NacexSpainReference: "NACEX_SPAIN_REFERENCE";
    /** dhl_supply_chain_au. */
    readonly DhlSupplyChainAu: "DHL_SUPPLY_CHAIN_AU";
    /** Eshipping. */
    readonly Eshipping: "ESHIPPING";
    /** SHREE TIRUPATI COURIER SERVICES PVT. LTD.. */
    readonly Shreetirupati: "SHREETIRUPATI";
    /** HX Express. */
    readonly HxExpress: "HX_EXPRESS";
    /** INDOPAKET. */
    readonly Indopaket: "INDOPAKET";
    /** 17 Post Service. */
    readonly Cn17Post: "CN_17POST";
    /** K1 Express. */
    readonly K1Express: "K1_EXPRESS";
    /** CJ GLS. */
    readonly CjGls: "CJ_GLS";
    /** GDEX courier. */
    readonly MysGdex: "MYS_GDEX";
    /** Nationex courier. */
    readonly Nationex: "NATIONEX";
    /** Anjun couriers. */
    readonly Anjun: "ANJUN";
    /** FarGood. */
    readonly Fargood: "FARGOOD";
    /** SMG Direct. */
    readonly SmgExpress: "SMG_EXPRESS";
    /** RZY Express. */
    readonly Rzyexpress: "RZYEXPRESS";
    /** Southeastern Freight Lines. */
    readonly Sefl: "SEFL";
    /** TNT-Click Italy. */
    readonly TntClickIt: "TNT_CLICK_IT";
    /** Haidaibao. */
    readonly Hdb: "HDB";
    /** Hipshipper. */
    readonly Hipshipper: "HIPSHIPPER";
    /** RPX Logistics. */
    readonly Rpxlogistics: "RPXLOGISTICS";
    /** Kuehne + Nagel. */
    readonly Kuehne: "KUEHNE";
    /** Nexive (TNT Post Italy). */
    readonly ItNexive: "IT_NEXIVE";
    /** PTS courier. */
    readonly Pts: "PTS";
    /** Swiss Post FTP. */
    readonly SwissPostFtp: "SWISS_POST_FTP";
    /** Fastrak Services. */
    readonly FastrkServ: "FASTRK_SERV";
    /** 4-72 Entregando. */
    readonly _472: "_4_72";
    /** YRC courier. */
    readonly UsYrc: "US_YRC";
    /** PostNL International 3S. */
    readonly PostnlIntl3S: "POSTNL_INTL_3S";
    /** Yilian (Elian) Supply Chain. */
    readonly ElianPost: "ELIAN_POST";
    /** Cubyn. */
    readonly Cubyn: "CUBYN";
    /** Saudi Post. */
    readonly SauSaudiPost: "SAU_SAUDI_POST";
    /** ABX Express. */
    readonly AbxexpressMy: "ABXEXPRESS_MY";
    /** HUAHANG EXPRESS. */
    readonly HuahanExpress: "HUAHAN_EXPRESS";
    /** Eshun international Logistic. */
    readonly ZesExpress: "ZES_EXPRESS";
    /** ZeptoExpress. */
    readonly ZeptoExpress: "ZEPTO_EXPRESS";
    /** Skynet World Wide Express South Africa. */
    readonly SkynetZa: "SKYNET_ZA";
    /** Zeek2Door. */
    readonly Zeek2Door: "ZEEK_2_DOOR";
    /** Blink. */
    readonly Blinklastmile: "BLINKLASTMILE";
    /** UkrPoshta. */
    readonly PostaUkr: "POSTA_UKR";
    /** C.H. Robinson Worldwide. */
    readonly Chrobinson: "CHROBINSON";
    /** Post56. */
    readonly CnPost56: "CN_POST56";
    /** Courant Plus. */
    readonly CourantPlus: "COURANT_PLUS";
    /** Scudex Express. */
    readonly ScudexExpress: "SCUDEX_EXPRESS";
    /** ShipEntegra. */
    readonly Shipentegra: "SHIPENTEGRA";
    /** B2C courier Europe. */
    readonly BTwoCEurope: "B_TWO_C_EUROPE";
    /** Cope Sensitive Freight. */
    readonly Cope: "COPE";
    /** Gati-KWE. */
    readonly IndGati: "IND_GATI";
    /** WishPost. */
    readonly CnWishpost: "CN_WISHPOST";
    /** NACEX Spain. */
    readonly NacexEs: "NACEX_ES";
    /** TAQBIN Hong Kong. */
    readonly TaqbinHk: "TAQBIN_HK";
    /** GlobalTranz. */
    readonly Globaltranz: "GLOBALTRANZ";
    /** Qingdao HKD International Logistics. */
    readonly Hkd: "HKD";
    /** BJS Distribution courier. */
    readonly Bjshomedelivery: "BJSHOMEDELIVERY";
    /** Omniva. */
    readonly Omniva: "OMNIVA";
    /** Sutton Transport. */
    readonly Sutton: "SUTTON";
    /** Panther Reference. */
    readonly PantherReference: "PANTHER_REFERENCE";
    /** SFC Service. */
    readonly Sfcservice: "SFCSERVICE";
    /** LTL COURIER. */
    readonly Ltl: "LTL";
    /** Park N Parcel. */
    readonly Parknparcel: "PARKNPARCEL";
    /** Spring GDS. */
    readonly SpringGds: "SPRING_GDS";
    /** ECexpress. */
    readonly Ecexpress: "ECEXPRESS";
    /** Interparcel Australia. */
    readonly InterparcelAu: "INTERPARCEL_AU";
    /** Agility. */
    readonly Agility: "AGILITY";
    /** XL Express. */
    readonly XlExpress: "XL_EXPRESS";
    /** Ader couriers. */
    readonly Aderonline: "ADERONLINE";
    /** Direct Couriers. */
    readonly Directcouriers: "DIRECTCOURIERS";
    /** Planzer Group. */
    readonly Planzer: "PLANZER";
    /** Sending Transporte Urgente y Comunicacion. */
    readonly Sending: "SENDING";
    /** Ninjavan Webhook. */
    readonly NinjavanWb: "NINJAVAN_WB";
    /** Nationwide Express Courier Services Bhd (www.nationwide.com.my). */
    readonly NationwideMy: "NATIONWIDE_MY";
    /** Sendit. */
    readonly Sendit: "SENDIT";
    /** Arrow XL. */
    readonly GbArrow: "GB_ARROW";
    /** GoJavas. */
    readonly IndGojavas: "IND_GOJAVAS";
    /** Korea Post. */
    readonly Kpost: "KPOST";
    /** DHL Freight. */
    readonly DhlFreight: "DHL_FREIGHT";
    /** Bluecare Express Ltd. */
    readonly Bluecare: "BLUECARE";
    /** jindouyun courier. */
    readonly Jindouyun: "JINDOUYUN";
    /** Trackon Couriers Pvt. Ltd. */
    readonly Trackon: "TRACKON";
    /** Tuffnells Parcels Express. */
    readonly GbTuffnells: "GB_TUFFNELLS";
    /** TRUMPCARD LLC. */
    readonly Trumpcard: "TRUMPCARD";
    /** eTotal Solution Limited. */
    readonly Etotal: "ETOTAL";
    /** Zeek courier. */
    readonly SfplusWebhook: "SFPLUS_WEBHOOK";
    /** SEKO Logistics. */
    readonly Sekologistics: "SEKOLOGISTICS";
    /** Hermes Einrichtungs Service GmbH & Co. KG. */
    readonly Hermes2MannHandling: "HERMES_2MANN_HANDLING";
    /** DPD Local reference. */
    readonly DpdLocalRef: "DPD_LOCAL_REF";
    /** United Delivery Service. */
    readonly Uds: "UDS";
    /** Specialised Freight. */
    readonly ZaSpecialisedFreight: "ZA_SPECIALISED_FREIGHT";
    /** Kerry Express Thailand. */
    readonly ThaKerry: "THA_KERRY";
    /** SEUR International. */
    readonly PrtIntSeur: "PRT_INT_SEUR";
    /** Correios Brazil. */
    readonly BraCorreios: "BRA_CORREIOS";
    /** New Zealand Post. */
    readonly NzNzPost: "NZ_NZ_POST";
    /** Equick China. */
    readonly CnEquick: "CN_EQUICK";
    /** Malaysia Post EMS / Pos Laju. */
    readonly MysEms: "MYS_EMS";
    /** Norsk Global. */
    readonly GbNorsk: "GB_NORSK";
    /** MRW spain. */
    readonly EspMrw: "ESP_MRW";
    /** Packlink. */
    readonly EspPacklink: "ESP_PACKLINK";
    /** Kangaroo Worldwide Express. */
    readonly KangarooMy: "KANGAROO_MY";
    /** RPX Online. */
    readonly Rpx: "RPX";
    /** XDP Express Reference. */
    readonly XdpUkReference: "XDP_UK_REFERENCE";
    /** ninja van (www.ninjavan.co). */
    readonly NinjavanMy: "NINJAVAN_MY";
    /** Adicional Logistics. */
    readonly Adicional: "ADICIONAL";
    /** Red Carpet Logistics. */
    readonly Roadbull: "ROADBULL";
    /** Yakit courier. */
    readonly Yakit: "YAKIT";
    /** MailAmericas. */
    readonly Mailamericas: "MAILAMERICAS";
    /** Mikropakket. */
    readonly Mikropakket: "MIKROPAKKET";
    /** Dynamic Logistics. */
    readonly Dynalogic: "DYNALOGIC";
    /** DHL Spain(www.dhl.com). */
    readonly DhlEs: "DHL_ES";
    /** DHL Parcel NL. */
    readonly DhlParcelNl: "DHL_PARCEL_NL";
    /** DHL Global Mail Asia (www.dhl.com). */
    readonly DhlGlobalMailAsia: "DHL_GLOBAL_MAIL_ASIA";
    /** Dawn Wing. */
    readonly DawnWing: "DAWN_WING";
    /** Geniki Taxydromiki. */
    readonly GenikiGr: "GENIKI_GR";
    /** hermesworld_uk. */
    readonly HermesworldUk: "HERMESWORLD_UK";
    /** Alphafast (www.alphafast.com). */
    readonly Alphafast: "ALPHAFAST";
    /** buylogic. */
    readonly Buylogic: "BUYLOGIC";
    /** Ekart logistics (ekartlogistics.com). */
    readonly Ekart: "EKART";
    /** mexico senda express. */
    readonly MexSenda: "MEX_SENDA";
    /** SFC. */
    readonly SfcLogistics: "SFC_LOGISTICS";
    /** Posta Serbia. */
    readonly PostSerbia: "POST_SERBIA";
    /** Delhivery India. */
    readonly IndDelhivery: "IND_DELHIVERY";
    /** DPD Germany. */
    readonly DeDpdDelistrack: "DE_DPD_DELISTRACK";
    /** RPD2man Deliveries. */
    readonly Rpd2Man: "RPD2MAN";
    /** SF Express (www.sf-express.com). */
    readonly CnSfExpress: "CN_SF_EXPRESS";
    /** Yanwen Logistics. */
    readonly Yanwen: "YANWEN";
    /** Skynet Malaysia. */
    readonly MysSkynet: "MYS_SKYNET";
    /** correos mexico. */
    readonly CorreosDeMexico: "CORREOS_DE_MEXICO";
    /** CBL Logistica. */
    readonly CblLogistica: "CBL_LOGISTICA";
    /** Estafeta (www.estafeta.com). */
    readonly MexEstafeta: "MEX_ESTAFETA";
    /** Austrian Post (Registered). */
    readonly AuAustrianPost: "AU_AUSTRIAN_POST";
    /** Rincos. */
    readonly Rincos: "RINCOS";
    /** DHL Netherland. */
    readonly NldDhl: "NLD_DHL";
    /** Russian post. */
    readonly RussianPost: "RUSSIAN_POST";
    /** CouriersPlease (couriersplease.com.au). */
    readonly CouriersPlease: "COURIERS_PLEASE";
    /** PostNord Logistics. */
    readonly PostnordLogistics: "POSTNORD_LOGISTICS";
    /** Fedex. */
    readonly Fedex: "FEDEX";
    /** DPE Express. */
    readonly DpeExpress: "DPE_EXPRESS";
    /** DPD. */
    readonly Dpd: "DPD";
    /** ADSone. */
    readonly Adsone: "ADSONE";
    /** JNE Express (Jalur Nugraha Ekakurir). */
    readonly IdnJne: "IDN_JNE";
    /** The Courier Guy. */
    readonly Thecourierguy: "THECOURIERGUY";
    /** CNE Express. */
    readonly Cnexps: "CNEXPS";
    /** Chronopost Portugal. */
    readonly PrtChronopost: "PRT_CHRONOPOST";
    /** Landmark Global. */
    readonly LandmarkGlobal: "LANDMARK_GLOBAL";
    /** DHL International. */
    readonly ItDhlEcommerce: "IT_DHL_ECOMMERCE";
    /** NACEX Spain. */
    readonly EspNacex: "ESP_NACEX";
    /** CTT Portugal. */
    readonly PrtCtt: "PRT_CTT";
    /** Kiala. */
    readonly BeKiala: "BE_KIALA";
    /** Asendia UK. */
    readonly AsendiaUk: "ASENDIA_UK";
    /** TNT global. */
    readonly GlobalTnt: "GLOBAL_TNT";
    /** Iceland Post. */
    readonly PosturIs: "POSTUR_IS";
    /** eParcel Korea. */
    readonly EparcelKr: "EPARCEL_KR";
    /** InPost Paczkomaty. */
    readonly InpostPaczkomaty: "INPOST_PACZKOMATY";
    /** Poste italiane (www.poste.it). */
    readonly ItPosteItalia: "IT_POSTE_ITALIA";
    /** Bpost (www.bpost.be). */
    readonly BeBpost: "BE_BPOST";
    /** Poczta Polska (www.poczta-polska.pl). */
    readonly PlPocztaPolska: "PL_POCZTA_POLSKA";
    /** Malaysia Post. */
    readonly MysMysPost: "MYS_MYS_POST";
    /** Singapore Post. */
    readonly SgSgPost: "SG_SG_POST";
    /** Thailand Post (www.thailandpost.co.th). */
    readonly ThaThailandPost: "THA_THAILAND_POST";
    /** LexShip. */
    readonly Lexship: "LEXSHIP";
    /** Fastway New Zealand. */
    readonly FastwayNz: "FASTWAY_NZ";
    /** DHL Supply Chain Australia. */
    readonly DhlAu: "DHL_AU";
    /** Cosmetics Now. */
    readonly Costmeticsnow: "COSTMETICSNOW";
    /** PFL. */
    readonly Pflogistics: "PFLOGISTICS";
    /** Loomis Express. */
    readonly LoomisExpress: "LOOMIS_EXPRESS";
    /** GLS Italy. */
    readonly GlsItaly: "GLS_ITALY";
    /** Line Clear Express & Logistics Sdn Bhd. */
    readonly Line: "LINE";
    /** Gel Express Logistik. */
    readonly GelExpress: "GEL_EXPRESS";
    /** Huodull. */
    readonly Huodull: "HUODULL";
    /** Ninja van Singapore. */
    readonly NinjavanSg: "NINJAVAN_SG";
    /** Janio Asia. */
    readonly Janio: "JANIO";
    /** AO Logistics. */
    readonly AoCourier: "AO_COURIER";
    /** BRT Bartolini(Sender Reference). */
    readonly BrtItSenderRef: "BRT_IT_SENDER_REF";
    /** SAILPOST. */
    readonly Sailpost: "SAILPOST";
    /** Lalamove. */
    readonly Lalamove: "LALAMOVE";
    /** NEW ZEALAND COURIERS. */
    readonly NewzealandCouriers: "NEWZEALAND_COURIERS";
    /** Etomars. */
    readonly Etomars: "ETOMARS";
    /** VIR Transport. */
    readonly Virtransport: "VIRTRANSPORT";
    /** Wizmo. */
    readonly Wizmo: "WIZMO";
    /** Palletways. */
    readonly Palletways: "PALLETWAYS";
    /** i-dika. */
    readonly IDika: "I_DIKA";
    /** CFL Logistics. */
    readonly CflLogistics: "CFL_LOGISTICS";
    /** GEM Worldwide. */
    readonly Gemworldwide: "GEMWORLDWIDE";
    /** Tai Wan Global Business. */
    readonly GlobalExpress: "GLOBAL_EXPRESS";
    /** Transgroup courier. */
    readonly LogistyxTransgroup: "LOGISTYX_TRANSGROUP";
    /** West Bank Courier. */
    readonly WestbankCourier: "WESTBANK_COURIER";
    /** Arco Spedizioni SP. */
    readonly ArcoSpedizioni: "ARCO_SPEDIZIONI";
    /** YDH express. */
    readonly YdhExpress: "YDH_EXPRESS";
    /** Parcelink Logistics. */
    readonly Parcelinklogistics: "PARCELINKLOGISTICS";
    /** CND Express. */
    readonly Cndexpress: "CNDEXPRESS";
    /** NOX NightTimeExpress. */
    readonly NoxNightTimeExpress: "NOX_NIGHT_TIME_EXPRESS";
    /** Aeronet couriers. */
    readonly Aeronet: "AERONET";
    /** LTIAN EXP. */
    readonly Ltianexp: "LTIANEXP";
    /** Integra2. */
    readonly Integra2Ftp: "INTEGRA2_FTP";
    /** PARCEL ONE. */
    readonly Parcelone: "PARCELONE";
    /** Innight Express Germany GmbH (nox NachtExpress). */
    readonly NoxNachtexpress: "NOX_NACHTEXPRESS";
    /** China Post. */
    readonly CnChinaPostEms: "CN_CHINA_POST_EMS";
    /** Chukou1. */
    readonly Chukou1: "CHUKOU1";
    /** GLS General Logistics Systems Slovakia s.r.o.. */
    readonly GlsSlov: "GLS_SLOV";
    /** OrangeDS (Orange Distribution Solutions Inc). */
    readonly OrangeDs: "ORANGE_DS";
    /** Joom Logistics. */
    readonly JoomLogis: "JOOM_LOGIS";
    /** StarTrack (startrack.com.au). */
    readonly AusStartrack: "AUS_STARTRACK";
    /** dhl Global. */
    readonly Dhl: "DHL";
    /** APC postal logistics germany. */
    readonly GbApc: "GB_APC";
    /** Bonds Courier Service (bondscouriers.com.au). */
    readonly Bondscouriers: "BONDSCOURIERS";
    /** Japan Post. */
    readonly JpnJapanPost: "JPN_JAPAN_POST";
    /** United States Postal Service. */
    readonly Usps: "USPS";
    /** WinIt. */
    readonly Winit: "WINIT";
    /** OCA Argentina. */
    readonly ArgOca: "ARG_OCA";
    /** Taiwan Post. */
    readonly TwTaiwanPost: "TW_TAIWAN_POST";
    /** DMM Network. */
    readonly DmmNetwork: "DMM_NETWORK";
    /** TNT Express. */
    readonly Tnt: "TNT";
    /** BH Posta (www.posta.ba). */
    readonly BhPosta: "BH_POSTA";
    /** Postnord sweden. */
    readonly SwePostnord: "SWE_POSTNORD";
    /** Canada Post. */
    readonly CaCanadaPost: "CA_CANADA_POST";
    /** Wiseloads. */
    readonly Wiseloads: "WISELOADS";
    /** Asendia HonKong. */
    readonly AsendiaHk: "ASENDIA_HK";
    /** GLS Netherland. */
    readonly NldGls: "NLD_GLS";
    /** Redpack. */
    readonly MexRedpack: "MEX_REDPACK";
    /** Jet-Ship Worldwide. */
    readonly JetShip: "JET_SHIP";
    /** DHL Express. */
    readonly DeDhlExpress: "DE_DHL_EXPRESS";
    /** Ninja van Thai. */
    readonly NinjavanThai: "NINJAVAN_THAI";
    /** Raben Group. */
    readonly RabenGroup: "RABEN_GROUP";
    /** ASM(GLS Spain). */
    readonly EspAsm: "ESP_ASM";
    /** Hrvatska posta. */
    readonly HrvHrvatska: "HRV_HRVATSKA";
    /** Estes Express Lines. */
    readonly GlobalEstes: "GLOBAL_ESTES";
    /** Lietuvos pastas. */
    readonly LtuLietuvos: "LTU_LIETUVOS";
    /** DHL Benelux. */
    readonly BelDhl: "BEL_DHL";
    /** Australia Post. */
    readonly AuAuPost: "AU_AU_POST";
    /** SPEEDEX couriers. */
    readonly Speedexcourier: "SPEEDEXCOURIER";
    /** Colissimo. */
    readonly FrColis: "FR_COLIS";
    /** Aramex. */
    readonly Aramex: "ARAMEX";
    /** DPEX (www.dpex.com). */
    readonly Dpex: "DPEX";
    /** Airpak Express. */
    readonly MysAirpak: "MYS_AIRPAK";
    /** Cuckoo Express. */
    readonly Cuckooexpress: "CUCKOOEXPRESS";
    /** DPD Poland. */
    readonly DpdPoland: "DPD_POLAND";
    /** PostNL International. */
    readonly NldPostnl: "NLD_POSTNL";
    /** Nim Express. */
    readonly NimExpress: "NIM_EXPRESS";
    /** Quantium. */
    readonly Quantium: "QUANTIUM";
    /** Sendle. */
    readonly Sendle: "SENDLE";
    /** Redur Spain. */
    readonly EspRedur: "ESP_REDUR";
    /** Matkahuolto. */
    readonly Matkahuolto: "MATKAHUOLTO";
    /** Cpacket couriers. */
    readonly Cpacket: "CPACKET";
    /** Posti courier. */
    readonly Posti: "POSTI";
    /** Hunter Express. */
    readonly HunterExpress: "HUNTER_EXPRESS";
    /** Choir Express Indonesia. */
    readonly ChoirExp: "CHOIR_EXP";
    /** Legion Express. */
    readonly LegionExpress: "LEGION_EXPRESS";
    /** austrian post. */
    readonly AustrianPostExpress: "AUSTRIAN_POST_EXPRESS";
    /** Grupo ampm. */
    readonly Grupo: "GRUPO";
    /** Post Roman (www.posta-romana.ro). */
    readonly PostaRo: "POSTA_RO";
    /** Interparcel UK. */
    readonly InterparcelUk: "INTERPARCEL_UK";
    /** ABF Freight. */
    readonly GlobalAbf: "GLOBAL_ABF";
    /** Posten Norge (www.posten.no). */
    readonly PostenNorge: "POSTEN_NORGE";
    /** Xpert Delivery. */
    readonly XpertDelivery: "XPERT_DELIVERY";
    /** DHl (Reference number). */
    readonly DhlRefr: "DHL_REFR";
    /** DHL HonKong. */
    readonly DhlHk: "DHL_HK";
    /** SKYNET UAE. */
    readonly SkynetUae: "SKYNET_UAE";
    /** Gojek. */
    readonly Gojek: "GOJEK";
    /** Yodel International. */
    readonly YodelIntnl: "YODEL_INTNL";
    /** Janco Ecommerce. */
    readonly Janco: "JANCO";
    /** YTO Express. */
    readonly Yto: "YTO";
    /** Wise Express. */
    readonly WiseExpress: "WISE_EXPRESS";
    /** J&T Express Vietnam. */
    readonly JtexpressVn: "JTEXPRESS_VN";
    /** FedEx International MailService. */
    readonly FedexIntlMlserv: "FEDEX_INTL_MLSERV";
    /** VAMOX. */
    readonly Vamox: "VAMOX";
    /** AMS Group. */
    readonly AmsGrp: "AMS_GRP";
    /** DHL Japan. */
    readonly DhlJp: "DHL_JP";
    /** HR Parcel. */
    readonly Hrparcel: "HRPARCEL";
    /** GESWL Express. */
    readonly Geswl: "GESWL";
    /** Blue Star. */
    readonly Bluestar: "BLUESTAR";
    /** CDEK TR. */
    readonly CdekTr: "CDEK_TR";
    /** Innovel courier. */
    readonly Descartes: "DESCARTES";
    /** Deltec Courier. */
    readonly DeltecUk: "DELTEC_UK";
    /** DTDC express. */
    readonly DtdcExpress: "DTDC_EXPRESS";
    /** tourline. */
    readonly Tourline: "TOURLINE";
    /** B&H Worldwide. */
    readonly BhWorldwide: "BH_WORLDWIDE";
    /** OCS ANA Group. */
    readonly Ocs: "OCS";
    /** yingnuo logistics. */
    readonly YingnuoLogistics: "YINGNUO_LOGISTICS";
    /** United Parcel Service. */
    readonly Ups: "UPS";
    /** Toll IPEC. */
    readonly Toll: "TOLL";
    /** SEUR portugal. */
    readonly PrtSeur: "PRT_SEUR";
    /** DTDC Australia. */
    readonly DtdcAu: "DTDC_AU";
    /** Dynamic Logistics. */
    readonly ThaDynamicLogistics: "THA_DYNAMIC_LOGISTICS";
    /** UBI Smart Parcel. */
    readonly UbiLogistics: "UBI_LOGISTICS";
    /** FedEx Cross Border. */
    readonly FedexCrossborder: "FEDEX_CROSSBORDER";
    /** A1Post. */
    readonly A1Post: "A1POST";
    /** Tazmanian Freight Systems. */
    readonly TazmanianFreight: "TAZMANIAN_FREIGHT";
    /** CJ International malaysia. */
    readonly CjIntMy: "CJ_INT_MY";
    /** Saia LTL Freight. */
    readonly SaiaFreight: "SAIA_FREIGHT";
    /** Qxpress. */
    readonly SgQxpress: "SG_QXPRESS";
    /** Nhans Solutions. */
    readonly NhansSolutions: "NHANS_SOLUTIONS";
    /** DPD France. */
    readonly DpdFr: "DPD_FR";
    /** Coordinadora. */
    readonly Coordinadora: "COORDINADORA";
    /** Grupo logistico Andreani. */
    readonly Andreani: "ANDREANI";
    /** Doora Logistics. */
    readonly Doora: "DOORA";
    /** Interparcel New Zealand. */
    readonly InterparcelNz: "INTERPARCEL_NZ";
    /** Jam Express Philippines. */
    readonly PhlJamexpress: "PHL_JAMEXPRESS";
    /** bel_belgium_post. */
    readonly BelBelgiumPost: "BEL_BELGIUM_POST";
    /** us_apc. */
    readonly UsApc: "US_APC";
    /** idn_pos. */
    readonly IdnPos: "IDN_POS";
    /** fr_mondial. */
    readonly FrMondial: "FR_MONDIAL";
    /** DE DHL. */
    readonly DeDhl: "DE_DHL";
    /** hk_rpx. */
    readonly HkRpx: "HK_RPX";
    /** dhl_pieceid. */
    readonly DhlPieceid: "DHL_PIECEID";
    /** vnpost_ems. */
    readonly VnpostEms: "VNPOST_EMS";
    /** rrdonnelley. */
    readonly Rrdonnelley: "RRDONNELLEY";
    /** dpd_de. */
    readonly DpdDe: "DPD_DE";
    /** delcart_in. */
    readonly DelcartIn: "DELCART_IN";
    /** imexglobalsolutions. */
    readonly Imexglobalsolutions: "IMEXGLOBALSOLUTIONS";
    /** ACOMMERCE. */
    readonly Acommerce: "ACOMMERCE";
    /** eurodis. */
    readonly Eurodis: "EURODIS";
    /** CANPAR. */
    readonly Canpar: "CANPAR";
    /** GLS. */
    readonly Gls: "GLS";
    /** Ecom Express. */
    readonly IndEcom: "IND_ECOM";
    /** Envialia. */
    readonly EspEnvialia: "ESP_ENVIALIA";
    /** dhl UK. */
    readonly DhlUk: "DHL_UK";
    /** SMSA Express. */
    readonly SmsaExpress: "SMSA_EXPRESS";
    /** TNT France. */
    readonly TntFr: "TNT_FR";
    /** DEX-I courier. */
    readonly DexI: "DEX_I";
    /** Budbee courier. */
    readonly BudbeeWebhook: "BUDBEE_WEBHOOK";
    /** Copa Airlines Courier. */
    readonly CopaCourier: "COPA_COURIER";
    /** Vietnam Post. */
    readonly VnmVietnamPost: "VNM_VIETNAM_POST";
    /** DPD HongKong. */
    readonly DpdHk: "DPD_HK";
    /** Toll New Zealand. */
    readonly TollNz: "TOLL_NZ";
    /** Echo courier. */
    readonly Echo: "ECHO";
    /** FedEx® Freight. */
    readonly FedexFr: "FEDEX_FR";
    /** Border Express. */
    readonly Borderexpress: "BORDEREXPRESS";
    /** MailPlus (Japan). */
    readonly MailplusJpn: "MAILPLUS_JPN";
    /** TNT UK Reference. */
    readonly TntUkRefr: "TNT_UK_REFR";
    /** KEC courier. */
    readonly Kec: "KEC";
    /** DPD Romania. */
    readonly DpdRo: "DPD_RO";
    /** TNT_JP. */
    readonly TntJp: "TNT_JP";
    /** TH_CJ. */
    readonly ThCj: "TH_CJ";
    /** EC_CN. */
    readonly EcCn: "EC_CN";
    /** FASTWAY_UK. */
    readonly FastwayUk: "FASTWAY_UK";
    /** FASTWAY_US. */
    readonly FastwayUs: "FASTWAY_US";
    /** GLS_DE. */
    readonly GlsDe: "GLS_DE";
    /** GLS_ES. */
    readonly GlsEs: "GLS_ES";
    /** GLS_FR. */
    readonly GlsFr: "GLS_FR";
    /** MONDIAL_BE. */
    readonly MondialBe: "MONDIAL_BE";
    /** SGT_IT. */
    readonly SgtIt: "SGT_IT";
    /** TNT_CN. */
    readonly TntCn: "TNT_CN";
    /** TNT_DE. */
    readonly TntDe: "TNT_DE";
    /** TNT_ES. */
    readonly TntEs: "TNT_ES";
    /** TNT_PL. */
    readonly TntPl: "TNT_PL";
    /** PARCELFORCE. */
    readonly Parcelforce: "PARCELFORCE";
    /** SWISS POST. */
    readonly SwissPost: "SWISS_POST";
    /** TOLL IPEC. */
    readonly TollIpec: "TOLL_IPEC";
    /** AIR 21. */
    readonly Air21: "AIR_21";
    /** AIRSPEED. */
    readonly Airspeed: "AIRSPEED";
    /** BERT. */
    readonly Bert: "BERT";
    /** BLUEDART. */
    readonly Bluedart: "BLUEDART";
    /** COLLECTPLUS. */
    readonly Collectplus: "COLLECTPLUS";
    /** COURIERPLUS. */
    readonly Courierplus: "COURIERPLUS";
    /** COURIER POST. */
    readonly CourierPost: "COURIER_POST";
    /** dhl_global_mail. */
    readonly DhlGlobalMail: "DHL_GLOBAL_MAIL";
    /** dpd_uk. */
    readonly DpdUk: "DPD_UK";
    /** DELTEC DE. */
    readonly DeltecDe: "DELTEC_DE";
    /** deutsche_de. */
    readonly DeutscheDe: "DEUTSCHE_DE";
    /** DOTZOT. */
    readonly Dotzot: "DOTZOT";
    /** elta_gr. */
    readonly EltaGr: "ELTA_GR";
    /** ems_cn. */
    readonly EmsCn: "EMS_CN";
    /** ECARGO. */
    readonly Ecargo: "ECARGO";
    /** ENSENDA. */
    readonly Ensenda: "ENSENDA";
    /** fercam_it. */
    readonly FercamIt: "FERCAM_IT";
    /** fastway_za. */
    readonly FastwayZa: "FASTWAY_ZA";
    /** fastway_au. */
    readonly FastwayAu: "FASTWAY_AU";
    /** first_logisitcs. */
    readonly FirstLogisitcs: "FIRST_LOGISITCS";
    /** GEODIS. */
    readonly Geodis: "GEODIS";
    /** GLOBEGISTICS. */
    readonly Globegistics: "GLOBEGISTICS";
    /** GREYHOUND. */
    readonly Greyhound: "GREYHOUND";
    /** jetship_my. */
    readonly JetshipMy: "JETSHIP_MY";
    /** LION PARCEL. */
    readonly LionParcel: "LION_PARCEL";
    /** AEROFLASH. */
    readonly Aeroflash: "AEROFLASH";
    /** ONTRAC. */
    readonly Ontrac: "ONTRAC";
    /** SAGAWA. */
    readonly Sagawa: "SAGAWA";
    /** SIODEMKA. */
    readonly Siodemka: "SIODEMKA";
    /** startrack. */
    readonly Startrack: "STARTRACK";
    /** tnt_au. */
    readonly TntAu: "TNT_AU";
    /** tnt_it. */
    readonly TntIt: "TNT_IT";
    /** TRANSMISSION. */
    readonly Transmission: "TRANSMISSION";
    /** YAMATO. */
    readonly Yamato: "YAMATO";
    /** dhl_it. */
    readonly DhlIt: "DHL_IT";
    /** dhl_at. */
    readonly DhlAt: "DHL_AT";
    /** LOGISTICSWORLDWIDE KR. */
    readonly LogisticsworldwideKr: "LOGISTICSWORLDWIDE_KR";
    /** gls_spain. */
    readonly GlsSpain: "GLS_SPAIN";
    /** amazon_uk_api. */
    readonly AmazonUkApi: "AMAZON_UK_API";
    /** dpd_fr_reference. */
    readonly DpdFrReference: "DPD_FR_REFERENCE";
    /** dhlparcel_uk. */
    readonly DhlparcelUk: "DHLPARCEL_UK";
    /** megasave. */
    readonly Megasave: "MEGASAVE";
    /** qualitypost. */
    readonly Qualitypost: "QUALITYPOST";
    /** ids_logistics. */
    readonly IdsLogistics: "IDS_LOGISTICS";
    /** joyingbox. */
    readonly Joyingbox: "JOYINGBOX";
    /** panther_order_number. */
    readonly PantherOrderNumber: "PANTHER_ORDER_NUMBER";
    /** watkins_shepard. */
    readonly WatkinsShepard: "WATKINS_SHEPARD";
    /** fasttrack. */
    readonly Fasttrack: "FASTTRACK";
    /** up_express. */
    readonly UpExpress: "UP_EXPRESS";
    /** elogistica. */
    readonly Elogistica: "ELOGISTICA";
    /** ecourier. */
    readonly Ecourier: "ECOURIER";
    /** cj_philippines. */
    readonly CjPhilippines: "CJ_PHILIPPINES";
    /** speedex. */
    readonly Speedex: "SPEEDEX";
    /** orangeconnex. */
    readonly Orangeconnex: "ORANGECONNEX";
    /** tecor. */
    readonly Tecor: "TECOR";
    /** saee. */
    readonly Saee: "SAEE";
    /** gls_italy_ftp. */
    readonly GlsItalyFtp: "GLS_ITALY_FTP";
    /** delivere. */
    readonly Delivere: "DELIVERE";
    /** yycom. */
    readonly Yycom: "YYCOM";
    /** Adicional Logistics. */
    readonly AdicionalPt: "ADICIONAL_PT";
    /** DKSH. */
    readonly Dksh: "DKSH";
    /** Nippon Express. */
    readonly NipponExpressFtp: "NIPPON_EXPRESS_FTP";
    /** GO Logistics & Storage. */
    readonly Gols: "GOLS";
    /** FUJIE EXPRESS. */
    readonly Fujexp: "FUJEXP";
    /** QTrack. */
    readonly Qtrack: "QTRACK";
    /** OM LOGISTICS LTD. */
    readonly OmlogisticsApi: "OMLOGISTICS_API";
    /** GDPharm Logistics. */
    readonly Gdpharm: "GDPHARM";
    /** MISUMI Group Inc.. */
    readonly MisumiCn: "MISUMI_CN";
    /** Rivo. */
    readonly AirCanada: "AIR_CANADA";
    /** City Express. */
    readonly City56Webhook: "CITY56_WEBHOOK";
    /** Sagawa. */
    readonly SagawaApi: "SAGAWA_API";
    /** KedaEX. */
    readonly Kedaex: "KEDAEX";
    /** Pgeon. */
    readonly PgeonApi: "PGEON_API";
    /** We World Express. */
    readonly Weworldexpress: "WEWORLDEXPRESS";
    /** J&T International logistics. */
    readonly JtLogistics: "JT_LOGISTICS";
    /** Trusk France. */
    readonly Trusk: "TRUSK";
    /** ViaXpress. */
    readonly Viaxpress: "VIAXPRESS";
    /** DHL Supply Chain Indonesia. */
    readonly DhlSupplychainId: "DHL_SUPPLYCHAIN_ID";
    /** Zuellig Pharma Korea. */
    readonly ZuelligpharmaSftp: "ZUELLIGPHARMA_SFTP";
    /** Meest. */
    readonly Meest: "MEEST";
    /** Toll Priority. */
    readonly TollPriority: "TOLL_PRIORITY";
    /** Mothership. */
    readonly MothershipApi: "MOTHERSHIP_API";
    /** Capital Transport. */
    readonly Capital: "CAPITAL";
    /** Europacket+. */
    readonly EuropaketApi: "EUROPAKET_API";
    /** HFD. */
    readonly Hfd: "HFD";
    /** Tourline Express. */
    readonly TourlineReference: "TOURLINE_REFERENCE";
    /** GIO Express Inc. */
    readonly GioEcourier: "GIO_ECOURIER";
    /** CN Logistics. */
    readonly CnLogistics: "CN_LOGISTICS";
    /** Pandion. */
    readonly Pandion: "PANDION";
    /** Bpost API. */
    readonly BpostApi: "BPOST_API";
    /** Passport Shipping. */
    readonly Passportshipping: "PASSPORTSHIPPING";
    /** Pakajo World. */
    readonly Pakajo: "PAKAJO";
    /** DACHSER. */
    readonly Dachser: "DACHSER";
    /** Yusen Logistics. */
    readonly YusenSftp: "YUSEN_SFTP";
    /** Shypmax. */
    readonly Shyplite: "SHYPLITE";
    /** Xingyunyi Logistics. */
    readonly Xyy: "XYY";
    /** Metropolitan Warehouse & Delivery. */
    readonly Mwd: "MWD";
    /** Faxe Cargo. */
    readonly Faxecargo: "FAXECARGO";
    /** Groupe Mazet. */
    readonly Mazet: "MAZET";
    /** First Logistics. */
    readonly FirstLogisticsApi: "FIRST_LOGISTICS_API";
    /** SPRINT PACK. */
    readonly SprintPack: "SPRINT_PACK";
    /** Hermes Germany. */
    readonly HermesDeFtp: "HERMES_DE_FTP";
    /** Concise. */
    readonly Concise: "CONCISE";
    /** Kerry Express TaiWan. */
    readonly KerryExpressTwApi: "KERRY_EXPRESS_TW_API";
    /** EWE Global Express. */
    readonly Ewe: "EWE";
    /** Fast Despatch Logistics Limited. */
    readonly Fastdespatch: "FASTDESPATCH";
    /** AB Custom Group. */
    readonly AbcustomSftp: "ABCUSTOM_SFTP";
    /** Chazki. */
    readonly Chazki: "CHAZKI";
    /** Shippie. */
    readonly Shippie: "SHIPPIE";
    /** GEODIS - Distribution & Express. */
    readonly GeodisApi: "GEODIS_API";
    /** Naqel Express. */
    readonly NaqelExpress: "NAQEL_EXPRESS";
    /** Papa. */
    readonly PapaWebhook: "PAPA_WEBHOOK";
    /** Forward Air. */
    readonly Forwardair: "FORWARDAIR";
    /** Dialogo Logistica. */
    readonly DialogoLogisticaApi: "DIALOGO_LOGISTICA_API";
    /** Lalamove. */
    readonly LalamoveApi: "LALAMOVE_API";
    /** Tomydoor. */
    readonly Tomydoor: "TOMYDOOR";
    /** Kronos Express. */
    readonly KronosWebhook: "KRONOS_WEBHOOK";
    /** J&T CARGO. */
    readonly Jtcargo: "JTCARGO";
    /** T-cat. */
    readonly TCat: "T_CAT";
    /** Concise. */
    readonly ConciseWebhook: "CONCISE_WEBHOOK";
    /** Teleport. */
    readonly TeleportWebhook: "TELEPORT_WEBHOOK";
    /** The Custom Companies. */
    readonly CustomcoApi: "CUSTOMCO_API";
    /** Shopee Xpress. */
    readonly SpxTh: "SPX_TH";
    /** Bollore Logistics. */
    readonly BolloreLogistics: "BOLLORE_LOGISTICS";
    /** ClickLink. */
    readonly ClicklinkSftp: "CLICKLINK_SFTP";
    /** M3 Logistics. */
    readonly M3Logistics: "M3LOGISTICS";
    /** Vietnam Post. */
    readonly VnpostApi: "VNPOST_API";
    /** Axlehire. */
    readonly AxlehireFtp: "AXLEHIRE_FTP";
    /** Shadowfax. */
    readonly Shadowfax: "SHADOWFAX";
    /** EVRi. */
    readonly MyhermesUkApi: "MYHERMES_UK_API";
    /** Daiichi Freight System Inc. */
    readonly Daiichi: "DAIICHI";
    /** Mensajeros Urbanos. */
    readonly MensajerosurbanosApi: "MENSAJEROSURBANOS_API";
    /** PolarSpeed Inc. */
    readonly Polarspeed: "POLARSPEED";
    /** iDexpress Indonesia. */
    readonly IdexpressId: "IDEXPRESS_ID";
    /** Payo. */
    readonly Payo: "PAYO";
    /** Whistl. */
    readonly WhistlSftp: "WHISTL_SFTP";
    /** INTEX Paketdienst GmbH. */
    readonly IntexDe: "INTEX_DE";
    /** Trans2u. */
    readonly Trans2U: "TRANS2U";
    /** Product Care Services Limited. */
    readonly ProductcaregroupSftp: "PRODUCTCAREGROUP_SFTP";
    /** Big Smart. */
    readonly Bigsmart: "BIGSMART";
    /** Expeditors API Reference. */
    readonly ExpeditorsApiRef: "EXPEDITORS_API_REF";
    /** AIT. */
    readonly AitworldwideApi: "AITWORLDWIDE_API";
    /** World Courier. */
    readonly Worldcourier: "WORLDCOURIER";
    /** Quiqup. */
    readonly Quiqup: "QUIQUP";
    /** Agediss. */
    readonly AgedissSftp: "AGEDISS_SFTP";
    /** Andreani. */
    readonly AndreaniApi: "ANDREANI_API";
    /** CRL Express. */
    readonly Crlexpress: "CRLEXPRESS";
    /** SMARTCAT. */
    readonly Smartcat: "SMARTCAT";
    /** Crossflight Limited. */
    readonly Crossflight: "CROSSFLIGHT";
    /** Pro Carrier. */
    readonly Procarrier: "PROCARRIER";
    /** DHL (Reference number). */
    readonly DhlReferenceApi: "DHL_REFERENCE_API";
    /** Seino. */
    readonly SeinoApi: "SEINO_API";
    /** WSP Express. */
    readonly Wspexpress: "WSPEXPRESS";
    /** Kronos Express. */
    readonly Kronos: "KRONOS";
    /** Total Express. */
    readonly TotalExpressApi: "TOTAL_EXPRESS_API";
    /** PARCLL. */
    readonly Parcll: "PARCLL";
    /** Xpedigo. */
    readonly Xpedigo: "XPEDIGO";
    /** StarTrack. */
    readonly StarTrackWebhook: "STAR_TRACK_WEBHOOK";
    /** Georgian Post. */
    readonly Gpost: "GPOST";
    /** UCS. */
    readonly Ucs: "UCS";
    /** DMF. */
    readonly Dmfgroup: "DMFGROUP";
    /** Coordinadora. */
    readonly CoordinadoraApi: "COORDINADORA_API";
    /** Marken. */
    readonly Marken: "MARKEN";
    /** NTL logistics. */
    readonly Ntl: "NTL";
    /** Red je Pakketje. */
    readonly Redjepakketje: "REDJEPAKKETJE";
    /** Allied Express (FTP). */
    readonly AlliedExpressFtp: "ALLIED_EXPRESS_FTP";
    /** Mondial Relay Spain(Punto Pack). */
    readonly MondialrelayEs: "MONDIALRELAY_ES";
    /** Naeko Logistics. */
    readonly NaekoFtp: "NAEKO_FTP";
    /** Mhi. */
    readonly Mhi: "MHI";
    /** Shippify, Inc. */
    readonly Shippify: "SHIPPIFY";
    /** Malca Amit. */
    readonly MalcaAmitApi: "MALCA_AMIT_API";
    /** J&T Express Singapore. */
    readonly JtexpressSgApi: "JTEXPRESS_SG_API";
    /** DACHSER. */
    readonly DachserWeb: "DACHSER_WEB";
    /** Flight Logistics Group. */
    readonly Flightlg: "FLIGHTLG";
    /** Cago. */
    readonly Cago: "CAGO";
    /** ComOne Express. */
    readonly Com1Express: "COM1EXPRESS";
    /** Tonami. */
    readonly TonamiFtp: "TONAMI_FTP";
    /** PACKFLEET. */
    readonly Packfleet: "PACKFLEET";
    /** Purolator International. */
    readonly PurolatorInternational: "PUROLATOR_INTERNATIONAL";
    /** Wineshipping. */
    readonly WineshippingWebhook: "WINESHIPPING_WEBHOOK";
    /** DHL Spain Domestic. */
    readonly DhlEsSftp: "DHL_ES_SFTP";
    /** 網家速配股份有限公司. */
    readonly PchomeApi: "PCHOME_API";
    /** Czech Post. */
    readonly CeskapostaApi: "CESKAPOSTA_API";
    /** Go Rush. */
    readonly Gorush: "GORUSH";
    /** HomeRunner. */
    readonly Homerunner: "HOMERUNNER";
    /** Amazon order. */
    readonly AmazonOrder: "AMAZON_ORDER";
    /** Estes Forwarding Worldwide. */
    readonly EfwnowApi: "EFWNOW_API";
    /** CBL Logistica (API). */
    readonly CblLogisticaApi: "CBL_LOGISTICA_API";
    /** NimbusPost. */
    readonly Nimbuspost: "NIMBUSPOST";
    /** Logwin Logistics. */
    readonly LogwinLogistics: "LOGWIN_LOGISTICS";
    /** Sequoialog. */
    readonly NowlogApi: "NOWLOG_API";
    /** DPD Netherlands. */
    readonly DpdNl: "DPD_NL";
    /** Dependable Supply Chain Services. */
    readonly Godependable: "GODEPENDABLE";
    /** Top Ideal Express. */
    readonly Esdex: "ESDEX";
    /** Kiitäjät. */
    readonly LogisystemsSftp: "LOGISYSTEMS_SFTP";
    /** Expeditors. */
    readonly Expeditors: "EXPEDITORS";
    /** Snt Global Etrax. */
    readonly SntglobalApi: "SNTGLOBAL_API";
    /** ShipX. */
    readonly Shipx: "SHIPX";
    /** Quickstat Courier LLC. */
    readonly QintlApi: "QINTL_API";
    /** Packs. */
    readonly Packs: "PACKS";
    /** PostNL International. */
    readonly PostnlInternational: "POSTNL_INTERNATIONAL";
    /** Amazon. */
    readonly AmazonEmailPush: "AMAZON_EMAIL_PUSH";
    /** DHL. */
    readonly DhlApi: "DHL_API";
    /** Shopee Express. */
    readonly Spx: "SPX";
    /** AxleHire. */
    readonly Axlehire: "AXLEHIRE";
    /** ICS COURIER. */
    readonly Icscourier: "ICSCOURIER";
    /** Dialogo Logistica. */
    readonly DialogoLogistica: "DIALOGO_LOGISTICA";
    /** ShunBang Express. */
    readonly ShunbangExpress: "SHUNBANG_EXPRESS";
    /** TCS. */
    readonly TcsApi: "TCS_API";
    /** SF Express China. */
    readonly SfExpressCn: "SF_EXPRESS_CN";
    /** Packeta. */
    readonly Packeta: "PACKETA";
    /** Teliway SIC Express. */
    readonly SicTeliway: "SIC_TELIWAY";
    /** Mondial Relay France. */
    readonly MondialrelayFr: "MONDIALRELAY_FR";
    /** InTime. */
    readonly IntimeFtp: "INTIME_FTP";
    /** 京东物流. */
    readonly JdExpress: "JD_EXPRESS";
    /** Fastbox. */
    readonly Fastbox: "FASTBOX";
    /** Patheon Logistics. */
    readonly Patheon: "PATHEON";
    /** India Post Domestic. */
    readonly IndiaPost: "INDIA_POST";
    /** Tipsa Reference. */
    readonly TipsaRef: "TIPSA_REF";
    /** Eco Freight. */
    readonly Ecofreight: "ECOFREIGHT";
    /** VOX SOLUCION EMPRESARIAL SRL. */
    readonly Vox: "VOX";
    /** Direct Freight Express. */
    readonly DirectfreightAuRef: "DIRECTFREIGHT_AU_REF";
    /** Best Transport. */
    readonly BesttransportSftp: "BESTTRANSPORT_SFTP";
    /** Australia Post. */
    readonly AustraliaPostApi: "AUSTRALIA_POST_API";
    /** FragilePAK. */
    readonly FragilepakSftp: "FRAGILEPAK_SFTP";
    /** FlipXpress. */
    readonly Flipxp: "FLIPXP";
    /** Value Logistics. */
    readonly ValueWebhook: "VALUE_WEBHOOK";
    /** Daeshin. */
    readonly Daeshin: "DAESHIN";
    /** Sherpa. */
    readonly Sherpa: "SHERPA";
    /** Metropolitan Warehouse & Delivery. */
    readonly MwdApi: "MWD_API";
    /** SmartKargo. */
    readonly Smartkargo: "SMARTKARGO";
    /** DNJ Express. */
    readonly DnjExpress: "DNJ_EXPRESS";
    /** Go People. */
    readonly Gopeople: "GOPEOPLE";
    /** mySendle. */
    readonly MysendleApi: "MYSENDLE_API";
    /** Aramex. */
    readonly AramexApi: "ARAMEX_API";
    /** Pidge. */
    readonly Pidge: "PIDGE";
    /** TP Logistic. */
    readonly Thaiparcels: "THAIPARCELS";
    /** Panther Reference. */
    readonly PantherReferenceApi: "PANTHER_REFERENCE_API";
    /** Posta Plus. */
    readonly Postaplus: "POSTAPLUS";
    /** BUFFALO. */
    readonly Buffalo: "BUFFALO";
    /** U-ENVIOS. */
    readonly UEnvios: "U_ENVIOS";
    /** Elite Express. */
    readonly EliteCo: "ELITE_CO";
    /** Roche Internal Courier. */
    readonly RocheInternalSftp: "ROCHE_INTERNAL_SFTP";
    /** DB Schenker Iceland. */
    readonly DbschenkerIceland: "DBSCHENKER_ICELAND";
    /** TNT France Reference. */
    readonly TntFrReference: "TNT_FR_REFERENCE";
    /** Newgistics API. */
    readonly Newgisticsapi: "NEWGISTICSAPI";
    /** Glovo. */
    readonly Glovo: "GLOVO";
    /** G.I.G. */
    readonly GwlogisApi: "GWLOGIS_API";
    /** Spreetail. */
    readonly SpreetailApi: "SPREETAIL_API";
    /** Moova. */
    readonly Moova: "MOOVA";
    /** Plycon Transportation Group. */
    readonly Plycongroup: "PLYCONGROUP";
    /** USPS Informed Visibility - Webhook. */
    readonly UspsWebhook: "USPS_WEBHOOK";
    /** maergo. */
    readonly Reimaginedelivery: "REIMAGINEDELIVERY";
    /** Eurodifarm. */
    readonly EdfFtp: "EDF_FTP";
    /** DAO365. */
    readonly Dao365: "DAO365";
    /** BioCair. */
    readonly BiocairFtp: "BIOCAIR_FTP";
    /** Ransa. */
    readonly RansaWebhook: "RANSA_WEBHOOK";
    /** SHIPXPRESS. */
    readonly Shipxpres: "SHIPXPRES";
    /** Courant Plus. */
    readonly CourantPlusApi: "COURANT_PLUS_API";
    /** SHIPA. */
    readonly Shipa: "SHIPA";
    /** Home Logistics. */
    readonly Homelogistics: "HOMELOGISTICS";
    /** DX. */
    readonly Dx: "DX";
    /** Poste Italiane Paccocelere. */
    readonly PosteItalianePaccocelere: "POSTE_ITALIANE_PACCOCELERE";
    /** Toll Group. */
    readonly TollWebhook: "TOLL_WEBHOOK";
    /** LCT do Brasil. */
    readonly LctbrApi: "LCTBR_API";
    /** DX Freight. */
    readonly DxFreight: "DX_FREIGHT";
    /** DHL Express. */
    readonly DhlSftp: "DHL_SFTP";
    /** Shiprocket X. */
    readonly Shiprocket: "SHIPROCKET";
    /** Uber. */
    readonly UberWebhook: "UBER_WEBHOOK";
    /** Stat Overnight. */
    readonly Statovernight: "STATOVERNIGHT";
    /** Burd Delivery. */
    readonly Burd: "BURD";
    /** Fastship Express. */
    readonly Fastship: "FASTSHIP";
    /** IB Venture. */
    readonly IbventureWebhook: "IBVENTURE_WEBHOOK";
    /** Gati-KWE. */
    readonly GatiKweApi: "GATI_KWE_API";
    /** CryoPDP. */
    readonly CryopdpFtp: "CRYOPDP_FTP";
    /** HUBBED. */
    readonly Hubbed: "HUBBED";
    /** Tipsa API. */
    readonly TipsaApi: "TIPSA_API";
    /** Aras Cargo. */
    readonly Araskargo: "ARASKARGO";
    /** Thijs Logistiek. */
    readonly ThijsNl: "THIJS_NL";
    /** ATS Healthcare. */
    readonly AtshealthcareReference: "ATSHEALTHCARE_REFERENCE";
    /** 99minutos. */
    readonly _99Minutos: "99MINUTOS";
    /** Hellenic (Greece) Post. */
    readonly HellenicPost: "HELLENIC_POST";
    /** HSM Global. */
    readonly HsmGlobal: "HSM_GLOBAL";
    /** MNX. */
    readonly Mnx: "MNX";
    /** N&M Transfer Co., Inc.. */
    readonly Nmtransfer: "NMTRANSFER";
    /** Logysto. */
    readonly Logysto: "LOGYSTO";
    /** India Post International. */
    readonly IndiaPostInt: "INDIA_POST_INT";
    /** Swiship IN. */
    readonly AmazonFbaSwishipIn: "AMAZON_FBA_SWISHIP_IN";
    /** SRT Transport. */
    readonly SrtTransport: "SRT_TRANSPORT";
    /** Bomi Group. */
    readonly Bomi: "BOMI";
    /** Deliverr. */
    readonly DeliverrSftp: "DELIVERR_SFTP";
    /** HSDEXPRESS. */
    readonly Hsdexpress: "HSDEXPRESS";
    /** SimpleTire. */
    readonly SimpletireWebhook: "SIMPLETIRE_WEBHOOK";
    /** Hunter Express. */
    readonly HunterExpressSftp: "HUNTER_EXPRESS_SFTP";
    /** UPS. */
    readonly UpsApi: "UPS_API";
    /** WOO YOUNG LOGISTICS CO.,LTD.. */
    readonly WooyoungLogisticsSftp: "WOOYOUNG_LOGISTICS_SFTP";
    /** PHSE. */
    readonly PhseApi: "PHSE_API";
    /** Wish. */
    readonly WishEmailPush: "WISH_EMAIL_PUSH";
    /** Northline. */
    readonly Northline: "NORTHLINE";
    /** Med Africa Logistics. */
    readonly Medafrica: "MEDAFRICA";
    /** DPD Austria. */
    readonly DpdAtSftp: "DPD_AT_SFTP";
    /** Anteraja. */
    readonly Anteraja: "ANTERAJA";
    /** DHL Global Forwarding API. */
    readonly DhlGlobalForwardingApi: "DHL_GLOBAL_FORWARDING_API";
    /** LBC EXPRESS INC.. */
    readonly LbcexpressApi: "LBCEXPRESS_API";
    /** Sims Global. */
    readonly Simsglobal: "SIMSGLOBAL";
    /** CDL Last Mile. */
    readonly Cdldelivers: "CDLDELIVERS";
    /** TYP. */
    readonly Typ: "TYP";
    /** Testing Courier. */
    readonly TestingCourierWebhook: "TESTING_COURIER_WEBHOOK";
    /** Pandago. */
    readonly PandagoApi: "PANDAGO_API";
    /** Royal Mail. */
    readonly RoyalMailFtp: "ROYAL_MAIL_FTP";
    /** Thunder Express Australia. */
    readonly Thunderexpress: "THUNDEREXPRESS";
    /** Secretlab. */
    readonly SecretlabWebhook: "SECRETLAB_WEBHOOK";
    /** Setel Express. */
    readonly Setel: "SETEL";
    /** JD Worldwide. */
    readonly JdWorldwide: "JD_WORLDWIDE";
    /** DPD Russia. */
    readonly DpdRuApi: "DPD_RU_API";
    /** Argents Express Group. */
    readonly ArgentsWebhook: "ARGENTS_WEBHOOK";
    /** Post ONE. */
    readonly Postone: "POSTONE";
    /** Tusk Logistics. */
    readonly Tusklogistics: "TUSKLOGISTICS";
    /** Rhenus Logistics UK. */
    readonly RhenusUkApi: "RHENUS_UK_API";
    /** Yamato Singapore. */
    readonly TaqbinSgApi: "TAQBIN_SG_API";
    /** Inntralog GmbH. */
    readonly InntralogSftp: "INNTRALOG_SFTP";
    /** Day & Ross. */
    readonly Dayross: "DAYROSS";
    /** Correos Express (API). */
    readonly CorreosexpressApi: "CORREOSEXPRESS_API";
    /** International Seur API. */
    readonly InternationalSeurApi: "INTERNATIONAL_SEUR_API";
    /** Yodel API. */
    readonly YodelApi: "YODEL_API";
    /** Hero Express. */
    readonly Heroexpress: "HEROEXPRESS";
    /** DHL supply chain India. */
    readonly DhlSupplychainIn: "DHL_SUPPLYCHAIN_IN";
    /** Urgent Cargus. */
    readonly UrgentCargus: "URGENT_CARGUS";
    /** FRONTdoor Collective. */
    readonly Frontdoorcorp: "FRONTDOORCORP";
    /** J&T Express Philippines. */
    readonly JtexpressPh: "JTEXPRESS_PH";
    /** Parcelstars. */
    readonly ParcelstarsWebhook: "PARCELSTARS_WEBHOOK";
    /** DPD Slovakia. */
    readonly DpdSkSftp: "DPD_SK_SFTP";
    /** Movianto. */
    readonly Movianto: "MOVIANTO";
    /** Ozeparts Shipping. */
    readonly OzepartsShipping: "OZEPARTS_SHIPPING";
    /** KargomKolay (CargoMini). */
    readonly Kargomkolay: "KARGOMKOLAY";
    /** Trunkrs. */
    readonly Trunkrs: "TRUNKRS";
    /** Omni Returns. */
    readonly OmnirpsWebhook: "OMNIRPS_WEBHOOK";
    /** Chile Express. */
    readonly Chilexpress: "CHILEXPRESS";
    /** Testing Courier. */
    readonly TestingCourier: "TESTING_COURIER";
    /** JNE (API). */
    readonly JneApi: "JNE_API";
    /** BJS Distribution, Storage & Couriers - FTP. */
    readonly BjshomedeliveryFtp: "BJSHOMEDELIVERY_FTP";
    /** D Express. */
    readonly DexpressWebhook: "DEXPRESS_WEBHOOK";
    /** USPS API. */
    readonly UspsApi: "USPS_API";
    /** TransVirtual. */
    readonly Transvirtual: "TRANSVIRTUAL";
    /** solistica. */
    readonly SolisticaApi: "SOLISTICA_API";
    /** Chienventure. */
    readonly ChienventureWebhook: "CHIENVENTURE_WEBHOOK";
    /** DPD UK. */
    readonly DpdUkSftp: "DPD_UK_SFTP";
    /** InPost. */
    readonly InpostUk: "INPOST_UK";
    /** Javit. */
    readonly Javit: "JAVIT";
    /** ZTO Express China. */
    readonly ZtoDomestic: "ZTO_DOMESTIC";
    /** DHL Global Forwarding Guatemala. */
    readonly DhlGtApi: "DHL_GT_API";
    /** CEVA Package. */
    readonly CevaTracking: "CEVA_TRACKING";
    /** Komon Express. */
    readonly KomonExpress: "KOMON_EXPRESS";
    /** East West Courier Pte Ltd. */
    readonly EastwestcourierFtp: "EASTWESTCOURIER_FTP";
    /** Danniao. */
    readonly Danniao: "DANNIAO";
    /** Spectran. */
    readonly Spectran: "SPECTRAN";
    /** Deliver-iT. */
    readonly DeliverIt: "DELIVER_IT";
    /** Relais Colis. */
    readonly Relaiscolis: "RELAISCOLIS";
    /** GLS Spain. */
    readonly GlsSpainApi: "GLS_SPAIN_API";
    /** PostPlus. */
    readonly Postplus: "POSTPLUS";
    /** Airterra. */
    readonly Airterra: "AIRTERRA";
    /** GIO Express Ecourier. */
    readonly GioEcourierApi: "GIO_ECOURIER_API";
    /** DPD Switzerland. */
    readonly DpdChSftp: "DPD_CH_SFTP";
    /** FedEx®. */
    readonly FedexApi: "FEDEX_API";
    /** INTERSMARTTRANS & SOLUTIONS SL. */
    readonly Intersmarttrans: "INTERSMARTTRANS";
    /** Hermes UK. */
    readonly HermesUkSftp: "HERMES_UK_SFTP";
    /** Exelot Ltd.. */
    readonly ExelotFtp: "EXELOT_FTP";
    /** DHL GLOBAL FORWARDING PANAMÁ. */
    readonly DhlPaApi: "DHL_PA_API";
    /** Vir Transport. */
    readonly VirtransportSftp: "VIRTRANSPORT_SFTP";
    /** Worldnet Logistics. */
    readonly Worldnet: "WORLDNET";
    /** Instabox. */
    readonly InstaboxWebhook: "INSTABOX_WEBHOOK";
    /** Keuhne + Nagel Global. */
    readonly Kng: "KNG";
    /** Flash Express. */
    readonly FlashexpressWebhook: "FLASHEXPRESS_WEBHOOK";
    /** Magyar Posta. */
    readonly MagyarPostaApi: "MAGYAR_POSTA_API";
    /** WeShip. */
    readonly WeshipApi: "WESHIP_API";
    /** Ohi. */
    readonly OhiWebhook: "OHI_WEBHOOK";
    /** MUDITA. */
    readonly Mudita: "MUDITA";
    /** Bluedart. */
    readonly BluedartApi: "BLUEDART_API";
    /** T-cat. */
    readonly TCatApi: "T_CAT_API";
    /** ADS Express. */
    readonly Ads: "ADS";
    /** HR Parcel. */
    readonly HermesIt: "HERMES_IT";
    /** FitzMark. */
    readonly FitzmarkApi: "FITZMARK_API";
    /** Posti API. */
    readonly PostiApi: "POSTI_API";
    /** SMSA Express. */
    readonly SmsaExpressWebhook: "SMSA_EXPRESS_WEBHOOK";
    /** Tamer Logistics. */
    readonly TamergroupWebhook: "TAMERGROUP_WEBHOOK";
    /** Livrapide. */
    readonly Livrapide: "LIVRAPIDE";
    /** Nippon Express. */
    readonly NipponExpress: "NIPPON_EXPRESS";
    /** Better Trucks. */
    readonly Bettertrucks: "BETTERTRUCKS";
    /** FAN COURIER EXPRESS. */
    readonly Fan: "FAN";
    /** USPS Flats (Pitney Bowes). */
    readonly PbUspsflatsFtp: "PB_USPSFLATS_FTP";
    /** Parcel Right. */
    readonly Parcelright: "PARCELRIGHT";
    /** iThink Logistics. */
    readonly Ithinklogistics: "ITHINKLOGISTICS";
    /** Kerry Logistics. */
    readonly KerryExpressThWebhook: "KERRY_EXPRESS_TH_WEBHOOK";
    /** eCoutier. */
    readonly Ecoutier: "ECOUTIER";
    /** SENHONG INTERNATIONAL LOGISTICS. */
    readonly Showl: "SHOWL";
    /** BRT Bartolini API. */
    readonly BrtItApi: "BRT_IT_API";
    /** Rixon Logistics. */
    readonly RixonhkApi: "RIXONHK_API";
    /** DB Schenker. */
    readonly DbschenkerApi: "DBSCHENKER_API";
    /** Ilyang logistics. */
    readonly Ilyanglogis: "ILYANGLOGIS";
    /** Mail Boxes Etc.. */
    readonly MailBoxEtc: "MAIL_BOX_ETC";
    /** WeShip. */
    readonly Weship: "WESHIP";
    /** DHL eCommerce Solutions. */
    readonly DhlGlobalMailApi: "DHL_GLOBAL_MAIL_API";
    /** Activos24. */
    readonly Activos24Api: "ACTIVOS24_API";
    /** ATS Healthcare. */
    readonly Atshealthcare: "ATSHEALTHCARE";
    /** Luwjistik. */
    readonly Luwjistik: "LUWJISTIK";
    /** Gebrüder Weiss. */
    readonly GwWorld: "GW_WORLD";
    /** fairsenden. */
    readonly FairsendenApi: "FAIRSENDEN_API";
    /** SerVIP. */
    readonly ServipWebhook: "SERVIP_WEBHOOK";
    /** Swiship. */
    readonly Swiship: "SWISHIP";
    /** Transport Ambientales. */
    readonly Tanet: "TANET";
    /** SHENZHEN HOTSIN CARGO INT'L FORWARDING CO.,LTD. */
    readonly HotsinCargo: "HOTSIN_CARGO";
    /** Direx. */
    readonly Direx: "DIREX";
    /** HuanTong. */
    readonly Huantong: "HUANTONG";
    /** iMile. */
    readonly ImileApi: "IMILE_API";
    /** Au Express. */
    readonly Auexpress: "AUEXPRESS";
    /** NYT SUPPLY CHAIN LOGISTICS Co.,LTD. */
    readonly Nytlogistics: "NYTLOGISTICS";
    /** DSV Futurewave. */
    readonly DsvReference: "DSV_REFERENCE";
    /** Novofarma. */
    readonly NovofarmaWebhook: "NOVOFARMA_WEBHOOK";
    /** AIT. */
    readonly AitworldwideSftp: "AITWORLDWIDE_SFTP";
    /** Olive. */
    readonly Shopolive: "SHOPOLIVE";
    /** Fast & Furious. */
    readonly FnfZa: "FNF_ZA";
    /** DHL eCommerce Greater China. */
    readonly DhlEcommerceGc: "DHL_ECOMMERCE_GC";
    /** Fetchr. */
    readonly Fetchr: "FETCHR";
    /** Starlinks Global. */
    readonly StarlinksApi: "STARLINKS_API";
    /** YYEXPRESS. */
    readonly Yyexpress: "YYEXPRESS";
    /** Servientrega. */
    readonly Servientrega: "SERVIENTREGA";
    /** HanJin. */
    readonly Hanjin: "HANJIN";
    /** Spanish Seur. */
    readonly SpanishSeurFtp: "SPANISH_SEUR_FTP";
    /** DX (B2B). */
    readonly DxB2BConnum: "DX_B2B_CONNUM";
    /** Helthjem. */
    readonly HelthjemApi: "HELTHJEM_API";
    /** Inexpost. */
    readonly Inexpost: "INEXPOST";
    /** A2B Express Logistics. */
    readonly A2BBa: "A2B_BA";
    /** Rhenus Logistics. */
    readonly RhenusGroup: "RHENUS_GROUP";
    /** Sber Logistics. */
    readonly SberlogisticsRu: "SBERLOGISTICS_RU";
    /** Malca-Amit. */
    readonly MalcaAmit: "MALCA_AMIT";
    /** Professional Parcel Logistics. */
    readonly Ppl: "PPL";
    /** OSM Worldwide. */
    readonly OsmWorldwideSftp: "OSM_WORLDWIDE_SFTP";
    /** ACI Logistix. */
    readonly Acilogistix: "ACILOGISTIX";
    /** Optima Courier. */
    readonly Optimacourier: "OPTIMACOURIER";
    /** Nova Poshta API. */
    readonly NovaPoshtaApi: "NOVA_POSHTA_API";
    /** Loggi. */
    readonly Loggi: "LOGGI";
    /** YiFan Express. */
    readonly Yifan: "YIFAN";
    /** My DynaLogic. */
    readonly Mydynalogic: "MYDYNALOGIC";
    /** Morning Global. */
    readonly Morninglobal: "MORNINGLOBAL";
    /** Concise. */
    readonly ConciseApi: "CONCISE_API";
    /** Falcon Express. */
    readonly Fxtran: "FXTRAN";
    /** Deliver Your Parcel. */
    readonly DeliveryourparcelZa: "DELIVERYOURPARCEL_ZA";
    /** uParcel. */
    readonly Uparcel: "UPARCEL";
    /** Mobi Logistica. */
    readonly MobiBr: "MOBI_BR";
    /** T&W Delivery. */
    readonly LoginextWebhook: "LOGINEXT_WEBHOOK";
    /** EMS. */
    readonly Ems: "EMS";
    /** Speedy. */
    readonly Speedy: "SPEEDY";
    /** Zoom. */
    readonly ZoomRed: "ZOOM_RED";
    /** Navlungo. */
    readonly Navlungo: "NAVLUNGO";
    /** Castle Parcels. */
    readonly Castleparcels: "CASTLEPARCELS";
    /** Weee. */
    readonly Weee: "WEEE";
    /** Packaly. */
    readonly Packaly: "PACKALY";
    /** Yunhuipost. */
    readonly Yunhuipost: "YUNHUIPOST";
    /** YouParcel. */
    readonly Youparcel: "YOUPARCEL";
    /** Leman. */
    readonly Leman: "LEMAN";
    /** Moovin. */
    readonly Moovin: "MOOVIN";
    /** Urb-it. */
    readonly UrbIt: "URB_IT";
    /** Multientrega. */
    readonly Multientregapanama: "MULTIENTREGAPANAMA";
    /** Jusdasr. */
    readonly Jusdasr: "JUSDASR";
    /** Discount Post. */
    readonly Discountpost: "DISCOUNTPOST";
    /** Rhenus Logistics UK. */
    readonly RhenusUk: "RHENUS_UK";
    /** Swiship JP. */
    readonly SwishipJp: "SWISHIP_JP";
    /** GLS USA. */
    readonly GlsUs: "GLS_US";
    /** Southwestern Motor Transport. Inc. */
    readonly Smtl: "SMTL";
    /** Discount Post Emega. */
    readonly Emega: "EMEGA";
    /** EXPRESSONE Slovenia. */
    readonly ExpressoneSv: "EXPRESSONE_SV";
    /** hepsiJET. */
    readonly Hepsijet: "HEPSIJET";
    /** Welivery. */
    readonly Welivery: "WELIVERY";
    /** Bringer Parcel Services. */
    readonly Bringer: "BRINGER";
    /** EasyRoutes. */
    readonly Easyroutes: "EASYROUTES";
    /** MRW. */
    readonly Mrw: "MRW";
    /** RPM. */
    readonly Rpm: "RPM";
    /** DPD Portugal. */
    readonly DpdPrt: "DPD_PRT";
    /** GLS Romania. */
    readonly GlsRomania: "GLS_ROMANIA";
    /** LM Parcel. */
    readonly Lmparcel: "LMPARCEL";
    /** GTA GSM. */
    readonly Gtagsm: "GTAGSM";
    /** DOMINO. */
    readonly Domino: "DOMINO";
    /** eShipper. */
    readonly Eshipper: "ESHIPPER";
    /** Transpak Inc.. */
    readonly Transpak: "TRANSPAK";
    /** Xindus. */
    readonly Xindus: "XINDUS";
    /** Aoyue. */
    readonly Aoyue: "AOYUE";
    /** Easyparcel. */
    readonly Easyparcel: "EASYPARCEL";
    /** EXPRESSONE. */
    readonly Expressone: "EXPRESSONE";
    /** Sendeo Kargo. */
    readonly SendeoKargo: "SENDEO_KARGO";
    /** Speedaf Express. */
    readonly Speedaf: "SPEEDAF";
    /** eTower. */
    readonly Etower: "ETOWER";
    /** GC Express. */
    readonly Gcx: "GCX";
    /** Ninjavan Vietnam. */
    readonly NinjavanVn: "NINJAVAN_VN";
    /** Allegro. */
    readonly Allegro: "ALLEGRO";
    /** Jumppoint. */
    readonly Jumppoint: "JUMPPOINT";
    /** ShipGlobal. */
    readonly ShipglobalUs: "SHIPGLOBAL_US";
    /** Kinisi Transport Pty Ltd. */
    readonly Kinisi: "KINISI";
    /** Oakh Harbour Freight Lines. */
    readonly Oakh: "OAKH";
    /** American West. */
    readonly Awest: "AWEST";
    /** Barsan Global Lojistik. */
    readonly Barsan: "BARSAN";
    /** Energo Logistic. */
    readonly Energologistic: "ENERGOLOGISTIC";
    /** Madrooex. */
    readonly Madrooex: "MADROOEX";
    /** GoBolt. */
    readonly Gobolt: "GOBOLT";
    /** Swiss Universal Express. */
    readonly SwissUniversalExpress: "SWISS_UNIVERSAL_EXPRESS";
    /** IOR Direct Solutions. */
    readonly Iordirect: "IORDIRECT";
    /** xmszm. */
    readonly Xmszm: "XMSZM";
    /** GLS Hungary. */
    readonly GlsHun: "GLS_HUN";
    /** Sendy Express. */
    readonly Sendy: "SENDY";
    /** Brauns Express. */
    readonly Braunsexpress: "BRAUNSEXPRESS";
    /** Grand Slam Express. */
    readonly Grandslamexpress: "GRANDSLAMEXPRESS";
    /** XGS. */
    readonly Xgs: "XGS";
    /** OTS. */
    readonly Otschile: "OTSCHILE";
    /** Pack-Up. */
    readonly PackUp: "PACK_UP";
    /** Parcelstars. */
    readonly Parcelstars: "PARCELSTARS";
    /** Team Express Service LLC. */
    readonly Teamexpressllc: "TEAMEXPRESSLLC";
    /** Asyad Express. */
    readonly Asyadexpress: "ASYADEXPRESS";
    /** TDN. */
    readonly Tdn: "TDN";
    /** Early Bird. */
    readonly Earlybird: "EARLYBIRD";
    /** Cacesa. */
    readonly Cacesa: "CACESA";
    /** Parceljet. */
    readonly Parceljet: "PARCELJET";
    /** MNG Kargo. */
    readonly MngKargo: "MNG_KARGO";
    /** Super Pac Line. */
    readonly Superpackline: "SUPERPACKLINE";
    /** SpeedX. */
    readonly Speedx: "SPEEDX";
    /** Vesyl. */
    readonly Vesyl: "VESYL";
    /** Sky King. */
    readonly Skyking: "SKYKING";
    /** DIR. */
    readonly Dirmensajeria: "DIRMENSAJERIA";
    /** Netlogix. */
    readonly Netlogixgroup: "NETLOGIXGROUP";
    /** ZYEX. */
    readonly Zyou: "ZYOU";
    /** Jawar. */
    readonly Jawar: "JAWAR";
    /** Associate Global Systems. */
    readonly Agsystems: "AGSYSTEMS";
    /** GPS. */
    readonly Gps: "GPS";
    /** PTT Kargo. */
    readonly PttKargo: "PTT_KARGO";
    /** Maergo. */
    readonly Maergo: "MAERGO";
    /** AICS. */
    readonly Arihantcourier: "ARIHANTCOURIER";
    /** VicTas Freight Express. */
    readonly Vtfe: "VTFE";
    /** Yunant. */
    readonly Yunant: "YUNANT";
    /** Urbify. */
    readonly Urbify: "URBIFY";
    /** pack-man. */
    readonly PackMan: "PACK_MAN";
    /** LIEFERGRUN. */
    readonly Liefergrun: "LIEFERGRUN";
    /** Obibox. */
    readonly Obibox: "OBIBOX";
    /** Paikeda. */
    readonly Paikeda: "PAIKEDA";
    /** Scotty. */
    readonly Scotty: "SCOTTY";
    /** Intelcom. */
    readonly IntelcomCa: "INTELCOM_CA";
    /** swe. */
    readonly Swe: "SWE";
    /** Asendia Global. */
    readonly Asendia: "ASENDIA";
    /** DPD Austria. */
    readonly DpdAt: "DPD_AT";
    /** Relay. */
    readonly Relay: "RELAY";
    /** ATA. */
    readonly Ata: "ATA";
    /** SkyExpress Internationals. */
    readonly SkyexpressInternational: "SKYEXPRESS_INTERNATIONAL";
    /** Surat Kargo. */
    readonly SuratKargo: "SURAT_KARGO";
    /** SG LINK. */
    readonly Sglink: "SGLINK";
    /** FleetOptics. */
    readonly Fleetopticsinc: "FLEETOPTICSINC";
    /** shopline. */
    readonly Shopline: "SHOPLINE";
    /** PIGGYSHIP. */
    readonly Piggyship: "PIGGYSHIP";
    /** LogoiX. */
    readonly Logoix: "LOGOIX";
    /** Kolay Gelsin. */
    readonly KolayGelsin: "KOLAY_GELSIN";
    /** Associated Couriers. */
    readonly AssociatedCouriers: "ASSOCIATED_COURIERS";
    /** ups-checker. */
    readonly UpsChecker: "UPS_CHECKER";
    /** Wineshipping. */
    readonly Wineshipping: "WINESHIPPING";
    /** Spedisci online. */
    readonly Spedisci: "SPEDISCI";
    /** Fourkites. */
    readonly Fourkites: "FOURKITES";
    /** Etonas. */
    readonly Etonas: "ETONAS";
    /** Fin Mile. */
    readonly Finmile: "FINMILE";
    /** Uniuni. */
    readonly Uniuni: "UNIUNI";
    /** Rodonaves. */
    readonly Rodonaves: "RODONAVES";
    /** Inpost Italy. */
    readonly InpostIt: "INPOST_IT";
    /** Tforce Freight. */
    readonly TforceFreight: "TFORCE_FREIGHT";
    /** Rich Mom. */
    readonly Richmom: "RICHMOM";
    /** Corriere Franco. */
    readonly Franco: "FRANCO";
    /** Ecparcel. */
    readonly Ecparcel: "ECPARCEL";
    /** Fedex China. */
    readonly FedexChina: "FEDEX_CHINA";
    /** Gofo Express. */
    readonly GofoExpress: "GOFO_EXPRESS";
    /** Shipbob. */
    readonly Shipbob: "SHIPBOB";
    /** Jersey Post Group. */
    readonly JerseypostAtlas: "JERSEYPOST_ATLAS";
    /** Coretrails. */
    readonly Coretrails: "CORETRAILS";
    /** Rhenus Logistics Italy. */
    readonly RhenusItaly: "RHENUS_ITALY";
    /** Jadlog. */
    readonly Jadlog: "JADLOG";
    /** Jitsu. */
    readonly Jitsu: "JITSU";
    /** Yanwen Express. */
    readonly YanwenExpress: "YANWEN_EXPRESS";
    /** Dashlink. */
    readonly Dashlink: "DASHLINK";
    /** Seino Super Express. */
    readonly SeinoSuperExpress: "SEINO_SUPER_EXPRESS";
    /** Floship. */
    readonly Floship: "FLOSHIP";
    /** Metro Supply Chain. */
    readonly Metroscg: "METROSCG";
    /** Sendparcel. */
    readonly Sendparcel: "SENDPARCEL";
    /** P2p. */
    readonly P2P: "P2P";
    /** Cn Express. */
    readonly CnExpress: "CN_EXPRESS";
    /** Cirro Track. */
    readonly Cirrotrack: "CIRROTRACK";
    /** Land Logistics. */
    readonly LandLogistics: "LAND_LOGISTICS";
    /** Veho. */
    readonly Veho: "VEHO";
    /** Medline. */
    readonly Medline: "MEDLINE";
    /** Vdtrack. */
    readonly Vdtrack: "VDTRACK";
    /** Sino Scm. */
    readonly SinoScm: "SINO_SCM";
    /** 3pe Express. */
    readonly _3PeExpress: "3PE_EXPRESS";
    /** Swiftx. */
    readonly Swiftx: "SWIFTX";
    /** Sfyd Express. */
    readonly Sfydexpress: "SFYDEXPRESS";
    /** Toptrans. */
    readonly Toptrans: "TOPTRANS";
    /** Other. */
    readonly Other: "OTHER";
};
export type ShipmentCarrier = (typeof ShipmentCarrier)[keyof typeof ShipmentCarrier] | (string & {});
export declare const shipmentCarrierSchema: EnumSchema<ShipmentCarrier>;
