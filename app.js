// 接続先バックエンドを実行環境で自動切替（本番ドメイン=本番GAS / Vercelプレビュー・ローカル=テストGAS）
const GAS_PROD    = 'https://script.google.com/macros/s/AKfycbzMqsT8BLQvl8C1-VORWTyv1cPjRZtN0UIFh-NiAIZv1eqApo0Np_vrCW5PknLnGWLD/exec';
const GAS_STAGING = 'https://script.google.com/macros/s/AKfycbyo6KmMkvvZx4C-sfL90SSADdqh2c4M-fggdH0BddSbNODyd0K--nfRrpZn2OTUEfcq/exec';
// 本番: 独自ドメイン(kizai-kanri-virid) と main別名(-git-main-) は本番GAS。
// テスト: dev等のブランチプレビュー(-git-xxx-) と ローカル は テストGAS。
const _host = location.hostname;
const _isLocal = _host === 'localhost' || _host === '127.0.0.1';
const _isBranchPreview = _host.includes('-git-') && !_host.includes('-git-main-');
const GAS_API_URL = (_isLocal || _isBranchPreview) ? GAS_STAGING : GAS_PROD;

// ★アプリの版番号（画面表示用）。デプロイのたびに service-worker.js の CACHE_NAME と揃えて上げる
const APP_VERSION = 'v53';

const SC = {
  'IN':        {cls:'s-in',    icon:'ti-circle-check'},
  'PARTIAL':   {cls:'s-partial',icon:'ti-circle-half'},
  'OUT':       {cls:'s-out',   icon:'ti-circle-x'},
  '修理中':    {cls:'s-repair', icon:'ti-tool'},
  'レンタル中':{cls:'s-rental', icon:'ti-building-store'},
  '長期不在':  {cls:'s-absent', icon:'ti-clock-off'},
};

const RAW = [
  ['SP','CODA','LA-8',16,''],['SP','CODA','SC-4',4,''],
  ['SP','JBL','VRX932',8,''],['SP','JBL','VRX918S',4,''],
  ['SP','EV','SX300(XLR)',7,''],['SP','EV','SX300(NL4)',6,''],
  ['SP','EV','SX300PI',10,'ヨドコウ:2/倉庫:8'],['SP','EV','SX80',2,''],
  ['SP','turbosound','TFM122M',6,''],['SP','EAW','155',4,''],
  ['SP','BOSE','101',11,''],['SP','BOSE','302',5,'白'],
  ['SP','YAMAHA','MS101',2,''],['SP','YAMAHA','MS101-4',8,''],
  ['SP','octorocks','石スピーカー',4,''],
  ['SP','TANNOY','DVS6',6,''],['SP','TANNOY','AMS6',4,'白'],
  ['SP','TOA','トランペットSP',4,''],
  ['SPスタンド','K&M','21450(SXスタンド)',6,''],['SPスタンド','K&M','21302',2,''],
  ['SPスタンド','K&M','21339(ディスタンスロッド)',4,''],['SPスタンド','ULTIMATE','TS-80S',17,''],
  ['SP付属品','EV','フライング',12,''],['SP付属品','EV','スイング',10,''],
  ['SP付属品','EV','F200コロガシ',8,''],['SP付属品','BOSE','GMA-3',10,''],['SP付属品','BOSE','GMK-4',5,''],
  ['POWRACK','CODA','RC20',2,''],['POWRACK','CODA','LINUS14D',2,''],
  ['POWAMP','QSC','PL230',3,''],['POWAMP','QSC','PL224',2,''],['POWAMP','QSC','PLD4.2',6,''],
  ['POWAMP','LAB.GRUPPEN','PLM10000Q',1,''],['POWAMP','Powersoft','T604',2,''],
  ['POWAMP','Powersoft','T904',2,''],['POWAMP','Powersoft','fP2400Q',2,''],
  ['POWAMP','BEHRINGER','NX4',2,''],['POWAMP','AMCRON','IT4000',2,''],
  ['Mixer','YAMAHA','DM7＋DM7CTL',1,''],['Mixer','YAMAHA','DM7 Compact',1,''],
  ['Mixer','YAMAHA','DM3',2,''],['Mixer','YAMAHA','M7CL-32',1,''],
  ['Mixer','YAMAHA','TF-3',1,''],['Mixer','YAMAHA','TF-1',2,''],
  ['Mixer','YAMAHA','MG16',2,''],['Mixer','YAMAHA','MG10',2,''],['Mixer','YAMAHA','MG06',6,''],
  ['STAGERACK','YAMAHA','Rio3224-D2 RACK',1,''],['STAGERACK','YAMAHA','Rio1608-D2 RACK',1,''],
  ['switchHUB','YAMAHA','SWP1-8',2,''],
  ['Cat5eケーブル','Belden','80m',2,''],['Cat5eケーブル','Belden','50m',2,''],
  ['Cat5eケーブル','Belden','30m',1,''],['Cat5eケーブル','Belden','1m',8,''],
  ['Player','TASCAM','SSCDR200',3,''],['Player','TASCAM','SSCDR250N',2,''],
  ['Player','TASCAM','DR680',1,''],['Player','TASCAM','SSR-100',3,''],
  ['Player','ROLAND','SP404',1,''],['Player','ROLAND','SP404 MK Ⅱ',1,''],
  ['Player','ROLAND','AR200',6,''],['Player','ROLAND','R-09',3,''],
  ['DISTRIB','FURMAN','M-8S',1,''],['DISTRIB','FURMAN','M-8Lx',4,''],
  ['DISTRIB','FURMAN','PL-8C',4,''],['DISTRIB','TOA','PD-15',1,''],
  ['プレスBOX','TASCOM','LA-40 Mk-Ⅱ',2,''],['プレスBOX','DRAWMER','DA-6',3,''],
  ['WL','SHURE','UR4D M6 RACK',1,'WS帯'],['WL','SHURE','UR4D L3 RACK',1,'WS帯'],
  ['WL','SHURE','UR4D J5 RACK',1,'WS帯'],['WL','SHURE','UR4D H4 RACK',1,'WS帯'],
  ['WL','SHURE','UR4D MW RACK',1,'B帯'],['WL','SHURE','ULXD4Q Z16',1,'1.2G帯'],
  ['WL','SHURE','ULXD2 Z16',4,'1.2G帯'],['WL','SHURE','UA845UWB',2,'分配器'],
  ['WL','SHURE','UA874WB セット',2,'アンテナ'],['WL','SHURE','UA874Z16',2,'アンテナ'],
  ['WL','Belden','同軸20m',4,''],['WL','Belden','同軸10m',2,''],
  ['WL','TOMOKA','BNC-JJ',7,'同軸ジョイント'],
  ['Microphone','SHURE','SM58',32,''],['Microphone','SHURE','SM58S',20,''],
  ['Microphone','SHURE','SM57',8,''],['Microphone','SHURE','SM86',3,''],
  ['Microphone','SHURE','BETA57',4,''],['Microphone','SHURE','565SD',1,''],
  ['Microphone','SHURE','BETA91A',1,''],['Microphone','SHURE','BETA52A',1,''],
  ['Microphone','SHURE','SM35',6,''],['Microphone','SENNHEISER','MD421',6,''],
  ['Microphone','SENNHEISER','e904',4,''],['Microphone','AKG','C414',2,''],
  ['Microphone','AKG','C451',5,''],['Microphone','DPA','d-fine',2,''],
  ['Microphone','DPA','4088',4,''],['Microphone','DPA','4080',6,''],
  ['Microphone','audio-technica','AT857QMLa',2,''],
  ['ウインドスクリーン','SHURE','SM58用',16,''],['ウインドスクリーン','SHURE','SM57用',9,''],
  ['ウインドスクリーン','SHURE','C451用',5,''],
  ['DI','BOSS','DI-1',8,''],['DI','COUNTRYMAN','TYPE85',3,''],
  ['DI','Radial','J48',2,''],['DI','Radial','J48s',2,''],['Isolator','Radial','ISO',2,''],
  ['MICスタンド','K&M','ST210',38,''],['MICスタンド','K&M','ST259',15,''],
  ['MICスタンド','K&M','小物置き',2,''],['MICスタンド','Panasonic','WN-FS140',3,''],
  ['MICスタンド','Pearl','小物置き',2,''],
  ['卓上スタンド','高砂','MS20',5,''],['卓上スタンド','K&M','23220 円形ベース',10,''],
  ['卓上スタンド','TOMOCA','DS40K',10,''],
  ['カフBOX','TOMOCA','TCC100',4,''],['カフBOX','TOMOCA','TCC60',4,''],
  ['マルチケーブル','CANARE','32P-50m',1,''],['マルチケーブル','CANARE','32P-BOX',2,''],
  ['マルチケーブル','CANARE','16P-50m',2,''],['マルチケーブル','CANARE','16P-30m',2,''],
  ['マルチケーブル','CANARE','16P-10m',2,''],['マルチケーブル','CANARE','16P-BOX',10,''],
  ['マルチケーブル','CANARE','12P-50m',1,''],['マルチケーブル','CANARE','12P-BOX',2,''],
  ['マルチケーブル','CANARE','8P-10m',1,''],
  ['マルチケーブル','CANARE','16ch-先バラ12C',2,''],['マルチケーブル','CANARE','16ch-先バラ11C',2,''],
  ['Clear-Com','Clear-Com','MS702（親機）',1,''],['Clear-Com','Clear-Com','PS20（親機）',2,''],
  ['Clear-Com','Clear-Com','RS701（ベルトパック）',5,''],['Clear-Com','Clear-Com','RS601（ベルトパック）',1,''],
  ['Clear-Com','Clear-Com','RS501（ベルトパック）',7,''],['Clear-Com','Clear-Com','CC-100（ヘッドセット）',13,''],
  ['Clear-Com','Clear-Com','KB-111A（ステーション）',2,''],['Clear-Com','Clear-Com','KB-702（盤）',3,''],
  ['インカム','Hollyland','Solidcom C1 Pro HUB',2,''],
  ['トランシーバー','アイコム','IC-DRP7S PLUS',6,''],['トランシーバー','アイコム','HM 163A',6,''],
  ['トランシーバー','アイコム','充電器',6,''],['トランシーバー','アルインコ','DJ-P221',6,''],
  ['タブレット','Apple','IPAD セット',3,''],['機器','—','ルーター',3,''],
  ['機器','SONY','MDR-CD900（ヘッドホン）',4,''],['機器','ENCORE Light','C3S30B（手元明かり）',6,''],
  ['機器','BEHRINGER','UCA222（USB IF）',9,''],['機器','—','スライダック 2kw',2,''],
  ['機器','Panasonic','eneloop 16本セット',4,'充電池'],
  ['養生','—','シルバー 2K-3K',13,''],['養生','—','透明シート',16,''],['養生','—','黒げんたん',12,''],
  ['ラッシングベルト','—','ロング オレンジ',2,''],['ラッシングベルト','—','ロング 緑',2,''],
  ['ラッシングベルト','—','ショート 黒',2,''],['ラッシングベルト','—','ショート 白',4,''],
  ['ラッシングベルト','—','ショート 緑',2,''],
  ['マット','—','ゴムマット',13,''],['マット','—','絨毯マット 四角',15,''],['マット','—','絨毯マット 縦長',19,''],
  ['台車','—','大',12,''],['台車','—','小',10,''],['台車','—','手押し',1,''],['台車','—','天使のかご台車',1,''],
  ['脚立','—','10尺',2,''],['脚立','—','7尺',1,''],['脚立','—','6尺',1,''],['脚立','—','5尺',1,''],
  ['単管','—','4m',4,''],['単管','—','3m',1,''],
  ['その他資材','—','ショットバック 5kg',23,''],['その他資材','—','マイク置き スポンジ',17,''],
  ['その他資材','—','黒布',15,''],['その他資材','—','シルバースポンジ',4,''],
  ['その他資材','モノタロウ','作業明かり M8108-K',6,''],
  ['その他資材','—','赤コーン',18,''],['その他資材','—','紅白ポール',5,''],
  ['その他資材','—','黄黒ポール',8,''],['その他資材','—','扇風機',2,''],
  ['その他資材','—','サーキュレーター',3,''],['その他資材','—','ヘルメット',13,''],
  ['その他資材','—','安全帯',4,''],['その他資材','—','ロープ',1,''],
  ['その他資材','—','レバブル',4,''],['その他資材','—','チェーンモーター',4,''],['その他資材','—','スロープ',1,''],
  ['SPケーブル','—','NL4 40m',4,''],['SPケーブル','—','NL4 20m',9,''],
  ['SPケーブル','—','NL4 10m',19,''],['SPケーブル','—','NL4 5m',9,''],
  ['SPケーブル','—','NL4 Yパラ',10,''],['SPケーブル','—','NL4 M-M',12,''],
  ['SPケーブル','—','NL4-11c',17,''],['SPケーブル','—','NL4-12c',6,''],
  ['SPケーブル','—','XLR 15m',21,''],['SPケーブル','—','XLR 10m',18,''],
  ['SPケーブル','—','XLR 3m',17,''],['SPケーブル','—','バラ-11C',8,''],
  ['SPケーブル','—','SBNL18444',4,'ブレイクアウトBOX'],['SPケーブル','—','SBNL18442',4,'ブレイクアウトBOX'],
  ['SPケーブル','—','マルチ4P 40m',1,''],['SPケーブル','—','マルチ3P 30m',1,''],
  ['SPケーブル','—','マルチ3P 15m',4,''],['SPケーブル','—','マルチNL8 20m',1,''],['SPケーブル','—','マルチNL8 40m',2,''],
  ['MICケーブル','—','ソロ 20m',21,''],['MICケーブル','—','ソロ 10m',65,''],['MICケーブル','—','ソロ 5m',28,''],
  ['MICケーブル','—','マルチ4P 30m',3,''],['MICケーブル','—','マルチ4P 20m',3,''],['MICケーブル','—','マルチ4P 10m',3,''],
  ['変換ケーブル','—','マルチ4P 11C-12C',20,''],['変換ケーブル','—','ソロ 11C-12C',75,''],
  ['変換ケーブル','—','ソロ 11C-11C',34,''],['変換ケーブル','—','ソロ 12C-12C',36,''],
  ['変換ケーブル','—','ソロ 2P-11C',18,''],['変換ケーブル','—','ソロ 2P-12C',14,''],
  ['変換ケーブル','—','ソロ RCA-12C',26,''],['変換ケーブル','—','ソロ 2P-2P',11,''],
  ['変換ケーブル','—','ソロ 3P-12C',6,''],['変換ケーブル','—','Yパラ 11C<12C',4,''],
  ['変換ケーブル','—','Yパラ 12C<11C',2,''],['変換ケーブル','—','Yパラ 11C<RCA',4,''],
  ['変換ケーブル','—','Yパラ 12C<RCA',4,''],
  ['電源ケーブル','—','三相四線',1,''],['電源ケーブル','—','単相三線',1,''],
  ['電源ケーブル','—','三相四線BOX',1,''],['電源ケーブル','—','C型 2P 20m',1,''],
  ['電源ケーブル','—','C型 20m',4,''],['電源ケーブル','—','ソロ 10m',2,''],
  ['電源ケーブル','—','C-H',6,''],['電源ケーブル','—','H-C',5,''],
  ['電源ケーブル','—','H型ソロ 20m',15,''],['電源ケーブル','—','H型ソロ 10m',15,''],
  ['電源ケーブル','—','H型ソロ 3m',27,''],['電源ケーブル','—','電ドラ',2,''],
];

let inv = RAW.map(c => ({cat:c[0],maker:c[1],model:c[2],total:c[3],out:0,special:0,status:'IN',note:c[4]||''}));
let outItems = [], history = [];

// 日付文字列を堅牢にパース（"2026/9/23 11:00" / "2026年9月23日 11:00" 両対応）
function parseDate(str) {
  if (!str) return null;
  const s = String(str).trim();
  const m = s.match(/(\d{4})年(\d{1,2})月(\d{1,2})日(?:[\s　]*(\d{1,2}):(\d{2}))?/);
  if (m) return new Date(+m[1], +m[2]-1, +m[3], m[4]?+m[4]:0, m[5]?+m[5]:0);
  const d = new Date(s.replace(/　/g, ' '));
  return isNaN(d.getTime()) ? null : d;
}

// 搬入日から yyyyMMdd キー（持ち出しリストの現場を区別する用）
function dateKeyOf(str) {
  const d = parseDate(str);
  if (!d) return '';
  return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
}
let currentTab = 'all';
let coIdx=-1, retIdx=-1, retOutIdx=-1, spIdx=-1, noteIdx=-1;
let rentalRanking = [];
let conflicts = [];
let pdDateKey = '';
let pdProject = '';

function calcSt(item) {
  if (['修理中','レンタル中','長期不在'].includes(item.status) && item.special > 0) return item.status;
  const a = item.total - item.out - item.special;
  if (item.out === 0 && item.special === 0) return 'IN';
  if (a <= 0) return 'OUT';
  return 'PARTIAL';
}
function avail(item) { return Math.max(0, item.total - item.out - item.special); }
function badge(st) {
  const c = SC[st] || SC['IN'];
  return `<span class="badge ${c.cls}"><i class="ti ${c.icon}"></i>${st}</span>`;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// 車種→カレンダー色クラス（複数車両対応）
const VEHICLE_COLORS = {
  caravan: { bg: '#dbeafe', fg: '#1e40af' },
  truck:   { bg: '#fef3c7', fg: '#92400e' },
  rental:  { bg: '#dcfce7', fg: '#166534' },
  other:   { bg: '#e5e7eb', fg: '#4b5563' },
};
function vehicleKinds(v) {
  const s = String(v || '');
  const kinds = [];
  if (/キャラバン|caravan/i.test(s)) kinds.push('caravan');
  if (/トラック|truck/i.test(s)) kinds.push('truck');
  if (/レンタカー|レンタル|rental/i.test(s)) kinds.push('rental');
  return kinds.length ? kinds : ['other'];
}
function vehicleClass(v) {
  const k = vehicleKinds(v)[0];
  return 'veh-' + k;
}
// カレンダーチップHTML生成（複数=2色以上のグラデーション、1つ=単色）
function vehicleChipStyle(v) {
  const kinds = vehicleKinds(v);
  if (kinds.length === 1) return '';
  const n = kinds.length;
  const stops = kinds.map((k, i) => {
    const from = Math.round(i * 100 / n);
    const to   = Math.round((i + 1) * 100 / n);
    return `${VEHICLE_COLORS[k].bg} ${from}% ${to}%`;
  }).join(', ');
  return `background:linear-gradient(90deg, ${stops});color:${VEHICLE_COLORS[kinds[0]].fg};`;
}

// 貸出機能は一旦停止：バッジは表示しない
function loanBadge(projectName) {
  return '';
}

// 日本の祝日を算出（ハッピーマンデー・春分/秋分・振替休日・国民の休日に対応）。年ごとにキャッシュ。
const _jpHolCache = {};
function jpHolidaySet(year) {
  if (_jpHolCache[year]) return _jpHolCache[year];
  const H = new Set();
  const key = (m,d) => m + '-' + d;
  const add = (m,d) => H.add(key(m,d));
  add(1,1); add(2,11); add(2,23); add(4,29); add(5,3); add(5,4); add(5,5);
  add(8,11); add(11,3); add(11,23);
  const nthMon = (month, n) => {
    const first = new Date(year, month-1, 1).getDay(); // 0=日
    const firstMon = 1 + ((8 - first) % 7);            // その月の第1月曜の日
    return firstMon + (n-1)*7;
  };
  add(1, nthMon(1,2));   // 成人の日
  add(7, nthMon(7,3));   // 海の日
  add(9, nthMon(9,3));   // 敬老の日
  add(10, nthMon(10,2)); // スポーツの日
  const shunbun = Math.floor(20.8431 + 0.242194*(year-1980) - Math.floor((year-1980)/4)); // 春分の日
  const shubun  = Math.floor(23.2488 + 0.242194*(year-1980) - Math.floor((year-1980)/4)); // 秋分の日
  add(3, shunbun); add(9, shubun);
  const keiro = nthMon(9,3);
  if (shubun - keiro === 2) add(9, keiro+1); // 国民の休日（敬老の日と秋分の日に挟まれた日）
  // 振替休日：日曜が祝日ならその後の非祝日を振替休日に
  Array.from(H).forEach(k => {
    const [m,d] = k.split('-').map(Number);
    if (new Date(year, m-1, d).getDay() === 0) {
      let nx = new Date(year, m-1, d+1);
      while (H.has(key(nx.getMonth()+1, nx.getDate()))) nx.setDate(nx.getDate()+1);
      H.add(key(nx.getMonth()+1, nx.getDate()));
    }
  });
  _jpHolCache[year] = H;
  return H;
}
function isJpHoliday(year, month1, day) { // month1 は 1始まり
  return jpHolidaySet(year).has(month1 + '-' + day);
}

function render() {
  renderStats();
  renderCats();
  if (currentTab === 'all')       renderTopPage();
  if (currentTab === 'inventory') renderInventory();
  if (currentTab === 'out')       renderOut();
  if (currentTab === 'special')   renderSpecial();
  if (currentTab === 'reserve')   renderReservations();
  if (currentTab === 'history')   renderHistory();
  if (currentTab === 'dashboard') renderDashboard();
}

function renderStats() {
  const t=inv.length, inC=inv.filter(i=>calcSt(i)==='IN').length,
    outC=inv.filter(i=>['OUT','PARTIAL'].includes(calcSt(i))).length,
    repC=inv.filter(i=>calcSt(i)==='修理中').length,
    renC=inv.filter(i=>calcSt(i)==='レンタル中').length,
    absC=inv.filter(i=>calcSt(i)==='長期不在').length;
  const cards = [
    { label:'総品目数',      val:t,         icon:'ti-package',        accent:'primary' },
    { label:'在庫中（IN）',  val:inC,       icon:'ti-circle-check',   accent:'success' },
    { label:'持ち出し中',    val:outC,      icon:'ti-arrow-up-right', accent:'danger' },
    { label:'修理・レンタル', val:repC+renC, icon:'ti-tool',           accent:'purple' },
    { label:'長期不在',      val:absC,      icon:'ti-clock-off',      accent:'gray' },
  ];
  document.getElementById('stats').innerHTML = cards.map(c => `
    <div class="stat stat-${c.accent}">
      <div class="stat-icon"><i class="ti ${c.icon}"></i></div>
      <div class="stat-body">
        <div class="stat-label">${c.label}</div>
        <div class="stat-val">${c.val}</div>
      </div>
    </div>`).join('');
}

let currentCat = '';

function renderCats() {
  const sidebar = document.getElementById('cat-sidebar');
  if (!sidebar) return;
  const cats = [...new Set(inv.map(i => i.cat))];
  const counts = {};
  cats.forEach(c => counts[c] = inv.filter(i => i.cat === c).length);
  // モバイル用ドロップダウン + デスクトップ用サイドバー（CSSで切替）
  const selectHTML =
    `<select class="cat-select" onchange="selectCat(this.value)">` +
    `<option value=""${currentCat===''?' selected':''}>すべてのカテゴリ (${inv.length})</option>` +
    cats.map(c => `<option value="${escHtml(c)}"${currentCat===c?' selected':''}>${escHtml(c)} (${counts[c]})</option>`).join('') +
    `</select>`;
  const listHTML =
    `<div class="cat-sidebar-list">` +
    `<div class="cat-sidebar-item${currentCat===''?' on':''}" onclick="selectCat('')">すべて <span class="cat-sidebar-count">${inv.length}</span></div>` +
    cats.map(c => `<div class="cat-sidebar-item${currentCat===c?' on':''}" onclick="selectCat('${escHtml(c)}')">${escHtml(c)} <span class="cat-sidebar-count">${counts[c]}</span></div>`).join('') +
    `</div>`;
  sidebar.innerHTML = selectHTML + listHTML;
}

function selectCat(cat) {
  currentCat = cat;
  render();
}

const CAT_ICONS = {
  'SP':'ti-speakerphone','SPスタンド':'ti-line-height','SP付属品':'ti-puzzle',
  'POWRACK':'ti-server','POWAMP':'ti-bolt','Mixer':'ti-adjustments-horizontal',
  'STAGERACK':'ti-box','switchHUB':'ti-network','Player':'ti-player-play',
  'DISTRIB':'ti-share','プレスBOX':'ti-broadcast','WL':'ti-wifi',
  'Microphone':'ti-microphone','ウインドスクリーン':'ti-wind','DI':'ti-plug',
  'MICスタンド':'ti-line-dashed','卓上スタンド':'ti-table','カフBOX':'ti-toggle-left',
  'マルチケーブル':'ti-cable','Clear-Com':'ti-headset','インカム':'ti-headset',
  'トランシーバー':'ti-radio','タブレット':'ti-device-tablet','機器':'ti-device-desktop',
  'SPケーブル':'ti-cable','MICケーブル':'ti-cable','変換ケーブル':'ti-transfer',
  '電源ケーブル':'ti-plug','Cat5eケーブル':'ti-network',
  '養生':'ti-barrier-block','ラッシングベルト':'ti-link','マット':'ti-square',
  '台車':'ti-forklift','脚立':'ti-stairs','単管':'ti-line','その他資材':'ti-package',
};

function renderInventory() {
  const srch = document.getElementById('srch').value.toLowerCase();
  const stF  = document.getElementById('stF').value;

  const filtered = inv.filter(item => {
    const st = calcSt(item);
    const m = !srch || [item.cat,item.maker,item.model,item.note].some(v=>String(v).toLowerCase().includes(srch));
    return m && (!currentCat || item.cat===currentCat) && (!stF || st===stF);
  });

  const main = document.getElementById('card-main');
  if (!filtered.length) { main.innerHTML=`<div class="empty">該当なし</div>`; return; }

  const groups = {};
  filtered.forEach(item => {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push(item);
  });

  main.innerHTML = Object.entries(groups).map(([cat, items]) => {
    const icon = CAT_ICONS[cat] || 'ti-package';
    const cards = items.map(item => {
      const idx = inv.indexOf(item), st = calcSt(item), av = avail(item);
      const canOut = av>0 && !['修理中','レンタル中','長期不在'].includes(st);
      const cls = st==='OUT'?'card-out':st==='PARTIAL'?'card-partial':'';
      const cntCls = st==='OUT'||av===0?'c-red':st==='PARTIAL'?'c-amber':'c-green';
      return `
        <div class="item-card ${cls}" onclick="openItemDetail(${idx})">
          <div class="item-card-icon"><i class="ti ${icon}" aria-hidden="true"></i></div>
          <div class="item-card-info">
            <div class="item-card-name">${escHtml(item.model)}</div>
            <div class="item-card-maker">${escHtml(item.maker)}</div>
            ${badge(st)}
          </div>
          <div class="item-card-right">
            <div class="item-card-count ${cntCls}">${av}</div>
            <div class="item-card-total">/ ${item.total}</div>
          </div>
        </div>`;
    }).join('');
    return `<div class="card-section-label">${cat}</div><div class="card-grid">${cards}</div>`;
  }).join('');
}

function openItemDetail(idx) {
  const item = inv[idx];
  const st = calcSt(item);
  const av = avail(item);
  const canOut = av>0 && !['修理中','レンタル中','長期不在'].includes(st);
  document.getElementById('detail-name').textContent = item.model;
  document.getElementById('detail-maker').textContent = item.maker + ' / ' + item.cat;
  document.getElementById('detail-badge').innerHTML = badge(st);
  document.getElementById('detail-counts').innerHTML =
    `残数: <strong>${av}</strong> / 総数: ${item.total}` + (item.out>0?` / 持ち出し中: ${item.out}`:'');
  document.getElementById('detail-note').textContent = item.note || '—';
  const acts = document.getElementById('detail-actions');
  acts.innerHTML =
    (canOut?`<button class="btn btn-primary" onclick="closeModal('modal-detail');openCheckout(${idx})"><i class="ti ti-arrow-up-right"></i> 持ち出し</button>`:'') +
    (item.out>0?`<button class="btn" onclick="closeModal('modal-detail');openReturn(${idx})"><i class="ti ti-arrow-down-left"></i> 返却</button>`:'') +
    (av>0?`<button class="btn" onclick="closeModal('modal-detail');openSpecial(${idx})"><i class="ti ti-tool"></i> 特殊</button>`:'') +
    `<button class="btn" onclick="closeModal('modal-detail');openNoteModal(${idx})"><i class="ti ti-pencil"></i> 備考</button>` +
    `<button class="btn" onclick="closeModal('modal-detail');openEditItem(${idx})"><i class="ti ti-edit"></i> 編集</button>` +
    `<button class="btn act d" onclick="closeModal('modal-detail');deleteItem(${idx})"><i class="ti ti-trash"></i></button>`;
  openModal('modal-detail');
}

function renderOut() {
  const container = document.getElementById('out-container');
  if (!outItems.length) {
    container.innerHTML = `<div class="empty">持ち出し中の機材はありません</div>`;
    return;
  }
  const groups = {};
  outItems.forEach((o,i) => {
    const proj = o.project || '（案件名未入力）';
    const dk = dateKeyOf(o.dateOut);
    const key = proj + '｜' + dk;  // 同名現場でも搬入日で分ける
    if (!groups[key]) groups[key] = {items:[], project:proj, dateKey:dk, staff:o.staff, returnDate:o.returnDate, dateOut:o.dateOut};
    groups[key].items.push({...o, outIdx:i});
  });
  container.innerHTML = Object.values(groups).map(g => {
    const project = g.project;
    const _d = parseDate(g.dateOut);
    const _md = _d ? `（${_d.getMonth()+1}/${_d.getDate()}）` : '';
    const autoLabel = g.returnDate
      ? `<span class="badge s-info" style="font-size:10px"><i class="ti ti-clock"></i> 自動 ${g.returnDate}</span>`
      : `<span class="badge s-absent" style="font-size:10px">手動返却</span>`;
    const ownItems    = g.items.filter(o => o.note !== '[レンタル]' && o.note !== '(在庫管理外)');
    const rentalItems = g.items.filter(o => o.note === '[レンタル]');
    const freeItems   = g.items.filter(o => o.note === '(在庫管理外)');
    const makeRow = o => {
      const mkLabel = (o.note === '[レンタル]' && o.maker) ? `<span style="font-size:10px;color:var(--info-text);margin-left:6px">（${escHtml(o.maker)}）</span>` : '';
      return `
      <div class="proj-item-row">
        <span class="proj-item-name">${escHtml(String(o.model||''))}${mkLabel}</span>
        <span class="proj-item-qty">${(o.qty|0) > 0 ? '×'+(o.qty|0) : ''}</span>
        <button class="act" style="padding:3px 8px;font-size:11px" onclick="openReturnFromOut(${o.outIdx})">
          <i class="ti ti-arrow-down-left"></i> 返却
        </button>
      </div>`;
    };
    // カテゴリでまとめて縦に表示
    const groupByCat = list => {
      let html = '', last = null;
      list.forEach(o => { const c = o.category || 'その他'; if (c !== last) { html += `<div class="pd-cat-head">${escHtml(c)}</div>`; last = c; } html += makeRow(o); });
      return html;
    };
    const itemRows = groupByCat(ownItems) +
      (rentalItems.length ? `<div class="pd-cat-head pd-cat-rental">レンタル品</div>` + rentalItems.map(makeRow).join('') : '') +
      (freeItems.length ? `<div class="pd-cat-head pd-cat-free">備考（フリー機材）</div>` + freeItems.map(makeRow).join('') : '');
    return `
      <div class="proj-group">
        <div class="proj-group-head" onclick="toggleGroup(this)">
          <div class="proj-group-left">
            <i class="ti ti-chevron-down proj-chevron"></i>
            <span class="proj-group-name">${project}${_md}${loanBadge(project)}</span>
            <span class="proj-group-meta">${g.staff||'担当未入力'}</span>
            ${autoLabel}
          </div>
          <div class="proj-group-right">
            <span class="proj-count">${g.items.length}品目</span>
            <button class="act" onclick="downloadPickupList('${project}','${g.dateKey}',event)" style="font-size:11px">
              <i class="ti ti-file-download"></i> DL
            </button>
            <button class="act btn-bulk-return" onclick="bulkReturn('${project}','${g.dateKey}',event)">
              <i class="ti ti-rotate"></i> 一括返却
            </button>
          </div>
        </div>
        <div class="proj-group-body">${itemRows}</div>
      </div>`;
  }).join('');
}

function renderSpecial() {
  const tb = document.getElementById('tbl-special');
  const sp = inv.filter(i => ['修理中','レンタル中','長期不在'].includes(calcSt(i)));
  if (!sp.length) { tb.innerHTML = `<tr><td colspan="7" class="empty">修理・レンタル・長期不在の機材はありません</td></tr>`; return; }
  tb.innerHTML = sp.map(item => {
    const idx = inv.indexOf(item);
    return `<tr>
      <td style="font-size:11px;color:var(--text2)">${item.cat}</td>
      <td style="font-size:11px">${item.maker}</td>
      <td style="font-weight:700">${item.model}</td>
      <td style="text-align:center">${item.special}</td>
      <td>${badge(calcSt(item))}</td>
      <td style="font-size:11px;color:var(--warn-text)">${item.note||'—'}</td>
      <td><button class="act" onclick="resolveSpecial(${idx})"><i class="ti ti-rotate"></i> 復帰</button></td>
    </tr>`;
  }).join('');
}

function renderHistory() {
  const container = document.getElementById('hist-container');
  try {
    _renderHistoryInner(container);
  } catch(e) {
    container.innerHTML = `<div class="empty" style="color:#f99;padding:1rem;text-align:left;white-space:pre-wrap;font-family:monospace;font-size:11px">renderHistoryエラー: ${e.message}\n\nstack:\n${e.stack||''}</div>`;
  }
}

function _renderHistoryInner(container) {
  if (!history.length) {
    container.innerHTML = `<div class="empty">履歴がありません</div>`;
    return;
  }

  const q = (document.getElementById('hist-srch')?.value || '').toLowerCase();

  // 修理・レンタル・復帰は非表示
  const SPECIAL_ACTIONS = new Set(['修理中','レンタル中','長期不在','復帰']);

  // 年月でグループ化
  const monthGroups = {};
  [...history].reverse().forEach(h => {
    if (SPECIAL_ACTIONS.has(h.action)) return;
    if (!h.project) return;
    if (q) {
      const hit = [h.project, h.staff, h.model, h.note].some(v => String(v||'').toLowerCase().includes(q));
      if (!hit) return;
    }
    // 日付から年月を取得
    let ym = '日付不明';
    try {
      const d = new Date(h.date);
      if (!isNaN(d)) {
        ym = d.getFullYear() + '年' + (d.getMonth()+1) + '月';
      } else {
        // 日本語形式の日付を変換
        const m = String(h.date).match(/(\d+)年(\d+)月/);
        if (m) ym = m[1] + '年' + parseInt(m[2]) + '月';
      }
    } catch(e) {}

    if (!monthGroups[ym]) monthGroups[ym] = {};
    const project = h.project || '（案件名未入力）';
    if (!monthGroups[ym][project]) monthGroups[ym][project] = {items:[], staff:h.staff};
    monthGroups[ym][project].items.push(h);
  });

  // 機材名→カテゴリの逆引き（在庫マスター inv から）
  const lookupCategory = (modelName) => {
    const mn = String(modelName || '');
    if (!mn) return null;
    // 完全一致（maker+model または model 単独）
    for (const it of inv) {
      const im = String(it.model || '');
      const imk = String(it.maker || '');
      if (im === mn) return it.cat;
      if ((imk + ' ' + im) === mn) return it.cat;
    }
    // 最長部分一致
    let bestCat = null, bestLen = 0;
    for (const it of inv) {
      const im = String(it.model || '');
      if (!im) continue;
      if (mn.includes(im) && im.length > bestLen) {
        bestCat = it.cat; bestLen = im.length;
      }
    }
    return bestCat;
  };
  // 在庫マスターでのカテゴリ出現順
  const catOrder = [...new Set(inv.map(i => i.cat))];

  container.innerHTML = Object.entries(monthGroups).map(([ym, projects]) => {
    const projectRows = Object.entries(projects).map(([project, g]) => {
      const makeRow = h => {
        const cls = h.action==='OUT'?'s-out':
          h.action==='自動返却'||h.action==='一括返却'?'s-info':
          h.action==='持ち出し中'?'s-out':'s-in';
        const actionLabel = h.action==='持ち出し中' ? 'OUT' : h.action;
        const makerLabel = (h.kind === '[レンタル]' && h.maker) ? `<span style="font-size:10px;color:var(--info-text);margin-left:6px">（${escHtml(h.maker)}）</span>` : '';
        // 日付・返却予定は案件ヘッダーにまとめて出すので、各機材行からは省く（返却予定以外の備考は残す）
        const noteText = String(h.note||'').replace(/返却予定[:：].*/s, '').trim();
        return `
          <div class="proj-item-row">
            <span class="proj-item-name">${escHtml(String(h.model||''))}${makerLabel}</span>
            <span class="proj-item-qty">${(h.qty|0) > 0 ? '×'+(h.qty|0) : ''}</span>
            <span class="badge ${cls}" style="font-size:10px">${actionLabel}</span>
            ${noteText ? `<span style="font-size:11px;color:var(--text2)">${escHtml(noteText)}</span>` : ''}
          </div>`;
      };
      // 種別で先に振り分け（履歴シートのkind列を優先、無ければ在庫マスター逆引き）
      const byCat = {};
      const rentals = [];
      const frees = [];
      const others = [];
      g.items.forEach(h => {
        if (h.kind === '[レンタル]') { rentals.push(h); return; }
        if (h.kind === '(在庫管理外)') { frees.push(h); return; }
        // 履歴シートにカテゴリがあればそれを使う、無ければ逆引き
        const cat = h.category || lookupCategory(h.model);
        if (cat) {
          if (!byCat[cat]) byCat[cat] = [];
          byCat[cat].push(h);
        } else {
          others.push(h);
        }
      });
      let itemRows = '';
      // 在庫マスター出現順に並べ、その後に履歴のみに存在するカテゴリを追加
      const seenCats = new Set();
      catOrder.forEach(cat => {
        if (!byCat[cat] || !byCat[cat].length) return;
        itemRows += `<div class="pd-cat-head">${escHtml(cat)}</div>`;
        byCat[cat].forEach(h => itemRows += makeRow(h));
        seenCats.add(cat);
      });
      Object.keys(byCat).forEach(cat => {
        if (seenCats.has(cat)) return;
        itemRows += `<div class="pd-cat-head">${escHtml(cat)}</div>`;
        byCat[cat].forEach(h => itemRows += makeRow(h));
      });
      if (rentals.length) {
        itemRows += `<div class="pd-cat-head pd-cat-rental">レンタル品</div>`;
        rentals.forEach(h => itemRows += makeRow(h));
      }
      if (frees.length) {
        itemRows += `<div class="pd-cat-head pd-cat-free">備考（フリー機材）</div>`;
        frees.forEach(h => itemRows += makeRow(h));
      }
      if (others.length) {
        itemRows += `<div class="pd-cat-head">その他</div>`;
        others.forEach(h => itemRows += makeRow(h));
      }
      // 案件の日付（持ち出し日〜返却予定）を算出してヘッダーに表示（全機材共通なので1回だけ）
      let outD = null, retD = null, anyD = null;
      g.items.forEach(h => {
        const d = new Date(h.date);
        if (!isNaN(d)) {
          if (!anyD || d < anyD) anyD = d;
          if ((h.action==='OUT' || h.action==='持ち出し中') && (!outD || d < outD)) outD = d;
        }
        const mm = String(h.note||'').match(/返却予定[:：]\s*(.+)/);
        if (mm) { const rd = new Date(mm[1]); if (!isNaN(rd) && (!retD || rd > retD)) retD = rd; }
      });
      const startD = outD || anyD;
      const _wd = '日月火水木金土';
      const fmtD = d => d ? `${d.getMonth()+1}/${d.getDate()}(${_wd[d.getDay()]})` : '';
      let dateLabel = '';
      if (startD && retD && retD > startD) dateLabel = `${fmtD(startD)}〜${fmtD(retD)}`;
      else if (startD) dateLabel = fmtD(startD);
      const dateChip = dateLabel ? `<span class="proj-group-date">${dateLabel}</span>` : '';
      return `
        <div class="proj-group" style="margin:6px 0 0 0">
          <div class="proj-group-head" onclick="toggleGroup(this)" style="background:var(--bg)">
            <div class="proj-group-left">
              <i class="ti ti-chevron-down proj-chevron" style="transform:rotate(-90deg)"></i>
              <span class="proj-group-name" style="font-size:13px">${project}${loanBadge(project)}</span>
              ${dateChip}
              <span class="proj-group-meta">${g.staff||''}</span>
            </div>
            <div class="proj-group-right" style="display:flex;align-items:center;gap:8px">
              <button class="btn" style="padding:3px 8px;font-size:11px" onclick="event.stopPropagation();downloadHistoryPickupList('${project.replace(/'/g,"\\'")}')"><i class="ti ti-file-download"></i> リストDL</button>
              <button class="btn" style="padding:3px 8px;font-size:11px" onclick="event.stopPropagation();triggerReingest('${project.replace(/'/g,"\\'")}')" title="修正版の荷だし表を投げ直してこの案件を上書き更新"><i class="ti ti-refresh"></i> 投げ直し</button>
            </div>
          </div>
          <div class="proj-group-body" style="display:none">${itemRows}</div>
        </div>`;
    }).join('');

    return `
      <div class="proj-group" style="margin-bottom:10px">
        <div class="proj-group-head" onclick="toggleGroup(this)">
          <div class="proj-group-left">
            <i class="ti ti-chevron-down proj-chevron" style="transform:rotate(-90deg)"></i>
            <span class="proj-group-name"><i class="ti ti-calendar" style="font-size:14px;margin-right:4px"></i>${ym}</span>
          </div>
          <div class="proj-group-right">
            <span class="proj-count">${Object.keys(projects).length}案件</span>
          </div>
        </div>
        <div class="proj-group-body" style="padding:6px 8px;display:none">${projectRows}</div>
      </div>`;
  }).join('');
}

function downloadHistoryPickupList(project, dateKey) {
  // Dropboxの持ち出しリスト現物（受注書コピー＋転記済み）をダウンロード
  downloadPickupList(project, dateKey || '');
}

// 履歴からの「修正版の荷だし表 投げ直し」：この案件を上書き更新
let _reingestProject = '';
function triggerReingest(project) {
  _reingestProject = project || '';
  const inp = document.getElementById('reingest-file-input');
  if (inp) { inp.value = ''; inp.click(); }
}
function reingestUploadFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const project = _reingestProject;
  if (!project) { alert('対象の案件が不明です。もう一度お試しください。'); return; }
  if (!/\.(xlsx|xls)$/i.test(file.name)) { alert('xlsx / xls ファイルを選んでください'); return; }
  if (!confirm(`「${project}」を、選んだ荷だし表「${file.name}」の内容で上書き更新します。\n\n・この案件の現在の持ち出し/予約はいったん解除（在庫を戻し）\n・荷だし表の内容で登録し直し\n・持ち出しリストも作り直します\n※搬入日は変えずに使ってください（変えると別案件になります）。\n\nよろしいですか？`)) return;
  const reader = new FileReader();
  reader.onload = () => {
    const b64 = String(reader.result).split(',')[1] || '';
    const payload = { filename: file.name, contentB64: b64, origProject: project };
    const body = JSON.stringify({ action: 'reingest_edit', data: JSON.stringify(payload) });
    fetch(GAS_API_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: body
    }).catch(err => console.warn('[reingest_edit]送信警告:', err));
    alert('投げ直しました。30〜60秒ほどで反映され、LINE/Slackに結果が通知されます。画面は自動で更新されます。\n※在庫不足などで失敗した場合も通知で分かります。');
    setTimeout(() => { try { reloadData(); } catch(_){} }, 40000);
    setTimeout(() => { try { reloadData(); } catch(_){} }, 75000);
  };
  reader.onerror = () => alert('ファイルの読み込みに失敗しました');
  reader.readAsDataURL(file);
}

function switchTab(tab, el) {
  currentTab = tab;
  // 上部タブ＋スマホ下部ボトムナビの両方を data-tab で同期
  document.querySelectorAll('[data-tab]').forEach(t => t.classList.toggle('on', t.dataset.tab === tab));
  ['all','inventory','out','special','reserve','history','dashboard'].forEach(t => {
    const v = document.getElementById('view-'+t);
    if (v) v.style.display = t===tab ? 'block' : 'none';
  });
  render();
  if (tab === 'dashboard') { renderDashboard(); fetchShiftFile(); }
  if (tab === 'all') { renderTopPage(); fetchStaffShiftFile(); }
  // ビュー切替時は最上部へスクロール（スマホで見やすく）
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function toggleGroup(head) {
  const body = head.nextElementSibling;
  const chevron = head.querySelector('.proj-chevron');
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  chevron.style.transform = isOpen ? 'rotate(-90deg)' : '';
}

function bulkReturn(project, dateKey, e) {
  if (e) e.stopPropagation();
  if (dateKey && typeof dateKey === 'object') { e = dateKey; dateKey = ''; }
  if (!confirm(`「${project}」の機材を全て返却しますか？`)) return;
  const now = new Date().toLocaleString('ja-JP');
  const match = o => (o.project||'（案件名未入力）') === project && (!dateKey || dateKeyOf(o.dateOut) === dateKey);
  outItems.filter(match).forEach(o => {
    if (o.invIdx >= 0 && o.invIdx < inv.length) {
      inv[o.invIdx].out = Math.max(0, inv[o.invIdx].out - o.qty);
    }
    history.push({date:now, project:o.project, staff:o.staff, model:o.model, qty:o.qty, action:'一括返却', note:''});
  });
  for (let i = outItems.length-1; i >= 0; i--) {
    if (match(outItems[i])) outItems.splice(i,1);
  }
  render();

  // スプレッドシートにも反映（JSONP）、完了後にデータ再取得
  if (GAS_API_URL && GAS_API_URL !== 'ここにGASのURLを貼り付け') {
    const cbName2 = 'cb_' + Date.now();
    window[cbName2] = function(json) {
      delete window[cbName2];
      const el2 = document.getElementById('jsonp_' + cbName2);
      if (el2) el2.remove();
      if (json.status === 'ok') {
        if (json.updated === 0) {
          alert('⚠️ スプレッドシートで該当案件が見つかりませんでした。\n案件名: ' + json.project);
        }
        fetchFromSpreadsheet();
      } else {
        alert('返却の保存に失敗しました。再度お試しください。');
      }
    };
    const script2 = document.createElement('script');
    script2.id = 'jsonp_' + cbName2;
    script2.onerror = function() {
      delete window[cbName2]; script2.remove();
      alert('返却の保存に失敗しました。再度お試しください。');
    };
    script2.src = GAS_API_URL + '?action=return&project=' + encodeURIComponent(project) + (dateKey ? '&dateKey=' + dateKey : '') + '&callback=' + cbName2;
    document.body.appendChild(script2);
  }
}

function openCheckout(idx) {
  coIdx=idx; const item=inv[idx];
  document.getElementById('co-item').value=`${item.maker} ${item.model}`;
  document.getElementById('co-avail').textContent=avail(item);
  document.getElementById('co-qty').value=1;
  document.getElementById('co-qty').max=avail(item);
  ['co-proj','co-staff','co-ret'].forEach(id=>document.getElementById(id).value='');
  openModal('modal-checkout');
}
function doCheckout() {
  const item=inv[coIdx], qty=parseInt(document.getElementById('co-qty').value)||0;
  const proj=document.getElementById('co-proj').value;
  const staff=document.getElementById('co-staff').value;
  const ret=document.getElementById('co-ret').value;
  if(qty<1||qty>avail(item)){alert('数量が無効です');return;}
  item.out+=qty;
  const now=new Date().toLocaleString('ja-JP');
  outItems.push({id:Date.now(),invIdx:coIdx,model:`${item.maker} ${item.model}`,qty,project:proj,staff,returnDate:ret,date:now});
  history.push({date:now,project:proj,staff,model:`${item.maker} ${item.model}`,qty,action:'OUT',note:ret?`返却予定:${ret}`:''});
  closeModal('modal-checkout'); render();

  // スプレッドシートにも反映（JSONP）
  if (GAS_API_URL && GAS_API_URL !== 'ここにGASのURLを貼り付け') {
    const cbName = 'cb_' + Date.now();
    const params = new URLSearchParams({
      action:     'checkout',
      model:      item.maker + ' ' + item.model,
      qty:        qty,
      project:    proj || '',
      staff:      staff || '',
      dateOut:    '',
      dateReturn: ret || '',
      callback:   cbName,
    });
    window[cbName] = function(json) {
      delete window[cbName];
      const el = document.getElementById('jsonp_' + cbName);
      if (el) el.remove();
      if (json.status === 'error') alert('⚠️ ' + json.message);
    };
    const script = document.createElement('script');
    script.id = 'jsonp_' + cbName;
    script.src = GAS_API_URL + '?' + params.toString();
    document.body.appendChild(script);
  }
}

// 拠点間貸出のin-app機能は撤去（受注書の[貸出][東京]タグ方式に統一）

function openReturn(idx) {
  retIdx=idx; const item=inv[idx];
  document.getElementById('ret-item').value=`${item.maker} ${item.model}`;
  document.getElementById('ret-qty').value=item.out;
  document.getElementById('ret-qty').max=item.out;
  document.getElementById('ret-note').value='';
  openModal('modal-return');
}
function openReturnFromOut(oi) {
  const o=outItems[oi]; retIdx=o.invIdx; retOutIdx=oi;
  document.getElementById('ret-item').value=o.model;
  document.getElementById('ret-qty').value=o.qty;
  document.getElementById('ret-qty').max=o.qty;
  document.getElementById('ret-note').value='';
  openModal('modal-return');
}
function doReturn() {
  const item=inv[retIdx], qty=parseInt(document.getElementById('ret-qty').value)||0;
  const note=document.getElementById('ret-note').value;
  if(qty<1||qty>item.out){alert('数量が無効です');return;}
  item.out=Math.max(0,item.out-qty);
  const now=new Date().toLocaleString('ja-JP');
  // retOutIdxがあればそのoutItemsのプロジェクトを使う
  const oi = (typeof retOutIdx !== 'undefined' && retOutIdx >= 0 && retOutIdx < outItems.length)
    ? retOutIdx
    : outItems.findLastIndex(o=>o.invIdx===retIdx);
  const project = oi>=0 ? (outItems[oi].project || '') : '';
  if(oi>=0) outItems.splice(oi,1);
  retOutIdx = -1;
  history.push({date:now,project:project,staff:'',model:`${item.maker} ${item.model}`,qty,action:'返却',note});
  closeModal('modal-return'); render();

  // スプレッドシートにも反映（JSONP）
  if (GAS_API_URL && GAS_API_URL !== 'ここにGASのURLを貼り付け') {
    const cbName3 = 'cb_' + Date.now();
    window[cbName3] = function(json) {
      delete window[cbName3];
      const el3 = document.getElementById('jsonp_' + cbName3);
      if (el3) el3.remove();
      console.log('返却API結果:', json.status);
    };
    const script3 = document.createElement('script');
    script3.id = 'jsonp_' + cbName3;
    script3.src = GAS_API_URL + '?action=return&project=' + encodeURIComponent(project) + '&callback=' + cbName3;
    document.body.appendChild(script3);
  }
}

function openSpecial(idx) {
  spIdx=idx; const item=inv[idx];
  document.getElementById('sp-item').value=`${item.maker} ${item.model}`;
  document.getElementById('sp-qty').value=1;
  document.getElementById('sp-qty').max=avail(item);
  document.getElementById('sp-note').value=item.note||'';
  openModal('modal-special');
}
function doSpecial() {
  const item=inv[spIdx], status=document.getElementById('sp-status').value;
  const qty=parseInt(document.getElementById('sp-qty').value)||0;
  const note=document.getElementById('sp-note').value;
  if(qty<1||qty>avail(item)){alert('数量が無効です');return;}
  item.special+=qty; item.status=status; item.note=note;
  const now=new Date().toLocaleString('ja-JP');
  history.push({date:now,project:'',staff:'',model:`${item.maker} ${item.model}`,qty,action:status,note});
  closeModal('modal-special'); render();

  // スプレッドシートにも反映（JSONP）
  if (GAS_API_URL && GAS_API_URL !== 'ここにGASのURLを貼り付け') {
    const cbSp = 'cb_' + Date.now();
    const params = new URLSearchParams({
      action: 'special',
      model:  item.maker + ' ' + item.model,
      status: status,
      qty:    qty,
      note:   note || '',
      callback: cbSp,
    });
    window[cbSp] = function(json) {
      delete window[cbSp];
      const el = document.getElementById('jsonp_' + cbSp);
      if (el) el.remove();
    };
    const script = document.createElement('script');
    script.id = 'jsonp_' + cbSp;
    script.src = GAS_API_URL + '?' + params.toString();
    document.body.appendChild(script);
  }
}
function resolveSpecial(idx) {
  const item=inv[idx], now=new Date().toLocaleString('ja-JP');
  history.push({date:now,project:'',staff:'',model:`${item.maker} ${item.model}`,qty:item.special,action:'復帰',note:item.note});
  item.special=0; item.status='IN'; render();

  // スプレッドシートにも反映（JSONP）
  if (GAS_API_URL && GAS_API_URL !== 'ここにGASのURLを貼り付け') {
    const cbRes = 'cb_' + Date.now();
    const params = new URLSearchParams({
      action:   'resolve',
      model:    item.maker + ' ' + item.model,
      callback: cbRes,
    });
    window[cbRes] = function(json) {
      delete window[cbRes];
      const el = document.getElementById('jsonp_' + cbRes);
      if (el) el.remove();
    };
    const script = document.createElement('script');
    script.id = 'jsonp_' + cbRes;
    script.src = GAS_API_URL + '?' + params.toString();
    document.body.appendChild(script);
  }
}

function openNoteModal(idx) {
  noteIdx=idx; const item=inv[idx];
  document.getElementById('note-item').value=`${item.maker} ${item.model}`;
  document.getElementById('note-text').value=item.note||'';
  openModal('modal-note');
}
function doEditNote() {
  inv[noteIdx].note=document.getElementById('note-text').value;
  closeModal('modal-note'); render();
}

// GASへJSONPで送信（レスポンスのstatusを受け取れる）
function gasJsonp(params, onDone) {
  if (!GAS_API_URL || GAS_API_URL === 'ここにGASのURLを貼り付け') { if(onDone) onDone({status:'error',message:'API未設定'}); return; }
  const cbName = 'cb_' + Date.now() + '_' + Math.floor(Math.random()*1000);
  params.callback = cbName;
  window[cbName] = function(json){
    delete window[cbName];
    const el = document.getElementById('jsonp_' + cbName); if (el) el.remove();
    if (onDone) onDone(json||{});
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?' + new URLSearchParams(params).toString();
  script.onerror = function(){ if(window[cbName]) window[cbName]({status:'error',message:'通信エラー'}); };
  document.body.appendChild(script);
}

let addEditRow = null;      // 編集対象の在庫マスター行番号（nullなら新規追加）
let addEditOrigModel = '';  // 誤更新防止用の元型番
function openAddModal() {
  addEditRow = null; addEditOrigModel = '';
  const h3=document.querySelector('#modal-add h3'); if(h3) h3.innerHTML='<i class="ti ti-plus"></i> 機材追加';
  const sb=document.querySelector('#modal-add .btn-primary'); if(sb) sb.innerHTML='追加';
  const cats=[...new Set(inv.map(i=>i.cat))].sort();
  const catSel=document.getElementById('add-cat-sel');
  catSel.innerHTML='<option value="">— 新規入力 —</option>'+cats.map(c=>`<option value="${c}">${c}</option>`).join('');
  const makers=[...new Set(inv.map(i=>i.maker))].filter(m=>m!=='—').sort();
  const makerSel=document.getElementById('add-maker-sel');
  makerSel.innerHTML='<option value="">— 新規入力 —</option>'+makers.map(m=>`<option value="${m}">${m}</option>`).join('');
  ['add-cat','add-maker','add-model','add-note'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('add-qty').value=1;
  catSel.value=''; makerSel.value='';
  openModal('modal-add');
}
// 在庫一覧から既存機材を編集（追加モーダルを流用）
function openEditItem(idx) {
  const item = inv[idx];
  if (!item) return;
  openAddModal();
  addEditRow = item.row || null;
  addEditOrigModel = item.model || '';
  const h3=document.querySelector('#modal-add h3'); if(h3) h3.innerHTML='<i class="ti ti-edit"></i> 機材を編集';
  const sb=document.querySelector('#modal-add .btn-primary'); if(sb) sb.innerHTML='保存';
  document.getElementById('add-cat').value = item.cat||'';
  document.getElementById('add-maker').value = item.maker && item.maker!=='—' ? item.maker : '';
  document.getElementById('add-model').value = item.model||'';
  document.getElementById('add-qty').value = item.total||0;
  document.getElementById('add-note').value = item.note||'';
}
function syncCombo(selId, inputId) {
  const val=document.getElementById(selId).value;
  if(val) document.getElementById(inputId).value=val;
}
function doAdd() {
  const cat=document.getElementById('add-cat').value.trim();
  const maker=document.getElementById('add-maker').value.trim();
  const model=document.getElementById('add-model').value.trim();
  const total=parseInt(document.getElementById('add-qty').value);
  const note=document.getElementById('add-note').value.trim();
  if(!model||isNaN(total)||total<0){alert('型番と総在庫数（0以上）は必須です');return;}

  // ===== 編集モード：既存行を更新してスプレッドシートに保存 =====
  if (addEditRow) {
    const data = { row: addEditRow, cat: cat||'その他', maker: maker||'—', model, note, total, origModel: addEditOrigModel };
    const item = inv.find(i => i.row === addEditRow);
    if (item) { item.cat=cat||'その他'; item.maker=maker||'—'; item.model=model; item.note=note; item.total=total; item.stock=Math.max(0,total-(item.out||0)); }
    closeModal('modal-add'); render();
    gasJsonp({ action:'edit_inventory_item', data: JSON.stringify(data) }, json => {
      if (json.status==='error') { alert('⚠️ 保存できませんでした: ' + (json.message||'')); }
      setTimeout(()=>{ try{ reloadData(); }catch(_){} }, 1200);
    });
    return;
  }

  // ===== 追加モード：同じ型番があれば総数を増やす（既存行の編集）=====
  const existing = inv.find(i => i.model === model);
  if (existing) {
    const newTotal = (existing.total||0) + total;
    if (!confirm(`「${model}」は既に登録済みです。\n在庫数を${existing.total}→${newTotal}に増やしますか？`)) return;
    const data = { row: existing.row, cat: existing.cat, maker: existing.maker, model, note: existing.note||'', total: newTotal, origModel: model };
    existing.total = newTotal; existing.stock = Math.max(0, newTotal-(existing.out||0));
    closeModal('modal-add'); render();
    gasJsonp({ action:'edit_inventory_item', data: JSON.stringify(data) }, json => {
      if (json.status==='error') alert('⚠️ 保存できませんでした: ' + (json.message||''));
      setTimeout(()=>{ try{ reloadData(); }catch(_){} }, 1200);
    });
    return;
  }

  // ===== 追加モード：新規行を作成 =====
  inv.push({row:null,cat:cat||'その他',maker:maker||'—',model,total,stock:total,out:0,special:0,status:'IN',note});
  closeModal('modal-add'); render();
  gasJsonp({ action:'add_inventory_item', data: JSON.stringify({cat:cat||'その他',maker:maker||'—',model,note,total}) }, json => {
    if (json.status==='error') alert('⚠️ 追加できませんでした: ' + (json.message||''));
    setTimeout(()=>{ try{ reloadData(); }catch(_){} }, 1200);  // 実際の行番号を取り込む
  });
}
function deleteItem(idx) {
  const item = inv[idx];
  if(!item) return;
  if(!confirm(`「${item.model}」を在庫マスターから削除しますか？\n（この操作はスプレッドシートに保存されます）`))return;
  const row = item.row, origModel = item.model;
  inv.splice(idx,1); render();
  gasJsonp({ action:'delete_inventory_item', data: JSON.stringify({row, origModel}) }, json => {
    if (json.status==='error') alert('⚠️ 削除できませんでした: ' + (json.message||''));
    setTimeout(()=>{ try{ reloadData(); }catch(_){} }, 1200);
  });
}



function fmtDateDisp(str) {
  if (!str) return '—';
  const d = parseDate(str);
  if (!d) return String(str).replace(/　/g, ' ');
  let s = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
  if (d.getHours() || d.getMinutes()) s += ` ${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
  return s;
}

function showProjectDetail(project, dateKey, ev) {
  if (ev) ev.stopPropagation();
  if (dateKey && typeof dateKey === 'object') { ev = dateKey; dateKey = ''; } // 旧呼び出し互換
  const matchKey = p => (p || '（案件名未入力）') === project;
  // クリックした日(dateKey)が「搬入〜返却」の期間内に入るレコードを一致とみなす。
  // マルチデイ案件で搬入日以外の日を選んでも同じ案件の機材が出るようにし、
  // 履歴フォールバック（処理時刻や履歴明細が誤表示される原因）を防ぐ。
  const inSpan = (dOut, dRet) => {
    if (!dateKey) return true;
    const kOut = dateKeyOf(dOut);
    if (!kOut) return false;
    const kRet = dateKeyOf(dRet) || kOut;
    return kOut <= dateKey && dateKey <= kRet;
  };
  const projectItems = outItems.filter(o => matchKey(o.project) && inSpan(o.dateOut || o.date, o.returnDate || o.dateReturn));
  // 予約中の機材（itemName→model, dateReturn→returnDate に正規化）
  const resItems = (reservations || []).filter(r => matchKey(r.project) && inSpan(r.dateOut, r.dateReturn)).map(r => ({
    model: r.itemName, qty: r.qty, category: r.category, note: r.note,
    dateOut: r.dateOut, returnDate: r.dateReturn, staff: r.staff, vehicle: r.vehicle, date: r.dateOut
  }));
  const histItems = history.filter(h => matchKey(h.project)); // 履歴は搬入日が無いので案件名のみ
  const items = projectItems.length > 0 ? projectItems : (resItems.length > 0 ? resItems : histItems);
  if (!items.length) return;

  const dateOut = fmtDateDisp(items[0].dateOut || items[0].date);
  const dateRet = fmtDateDisp(items[0].returnDate || items[0].dateReturn);
  const staff   = items[0].staff || '—';
  const vehicle = items[0].vehicle || '';
  pdProject = project;
  // 編集/DLは搬入日を正とする（クリックした日が搬入日以外でも案件を正しく特定）
  pdDateKey = dateKeyOf(items[0].dateOut || items[0].date) || dateKey;
  // タイトルに搬入日を付けて同名現場を区別
  const _d = parseDate(items[0].dateOut || items[0].date);
  const _md = _d ? `（${_d.getMonth()+1}/${_d.getDate()}）` : '';

  const ownItems    = items.filter(function(o) { return o.note !== '[レンタル]' && o.note !== '(在庫管理外)'; });
  const rentalItems = items.filter(function(o) { return o.note === '[レンタル]'; });
  const freeItems   = items.filter(function(o) { return o.note === '(在庫管理外)'; });
  const makeItemRow = function(o) {
    return '<div class="proj-item-row"><span class="proj-item-name">' + escHtml(o.model||'') + '</span><span class="proj-item-qty">×' + o.qty + '</span></div>';
  };
  // エクセルの読み込み順（セクション→A-D→G-J→M-P）を保ち、カテゴリが変わったら見出しを出す
  const groupByCat = function(list) {
    let html = '', last = null;
    list.forEach(function(o) {
      const c = o.category || 'その他';
      if (c !== last) { html += '<div class="pd-cat-head">' + escHtml(c) + '</div>'; last = c; }
      html += makeItemRow(o);
    });
    return html;
  };
  const itemRows = groupByCat(ownItems) +
    (rentalItems.length ? '<div class="pd-cat-head pd-cat-rental">レンタル品</div>' + rentalItems.map(makeItemRow).join('') : '') +
    (freeItems.length ? '<div class="pd-cat-head pd-cat-free">備考（フリー機材）</div>' + freeItems.map(makeItemRow).join('') : '');

  document.getElementById('pd-project').textContent = project + _md;
  document.getElementById('pd-staff').textContent   = staff;
  document.getElementById('pd-dateout').textContent = dateOut;
  document.getElementById('pd-dateret').textContent = dateRet;
  document.getElementById('pd-items').innerHTML     = itemRows;
  const pdVehicle = document.getElementById('pd-vehicle');
  if (pdVehicle) {
    pdVehicle.textContent = vehicle || '—';
    pdVehicle.closest('.pd-vehicle-row').style.display = vehicle ? '' : 'none';
  }
  document.getElementById('modal-project-detail').classList.add('open');
}


function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ==================== 案件編集モーダル ====================
let epItemsState = [];
let epCreateMode = false;
// ヘッダー「エクセル投入」：記入済みの荷出しエクセルをアプリからアップロード＝Dropbox投入と同じ処理
function triggerIngestUpload() {
  const inp = document.getElementById('ingest-file-input');
  if (inp) { inp.value = ''; inp.click(); }
}
function ingestUploadFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  if (!/\.(xlsx|xls)$/i.test(file.name)) { alert('xlsx / xls ファイルを選んでください'); return; }
  if (!confirm(`「${file.name}」を投入します。\n記入済みの荷出しエクセルとして処理され、予約/持ち出し登録・荷出しリスト作成・通知まで自動で行われます。よろしいですか？`)) return;
  const btn = document.getElementById('ingest-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader"></i> 投入中...'; }
  const reader = new FileReader();
  reader.onload = () => {
    // dataURL の "base64," 以降を取り出す
    const b64 = String(reader.result).split(',')[1] || '';
    const payload = { filename: file.name, contentB64: b64 };
    const body = JSON.stringify({ action: 'ingest_upload', data: JSON.stringify(payload) });
    console.log('[ingest_upload] POST body size:', body.length, 'file:', file.name);
    fetch(GAS_API_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: body
    }).catch(err => console.warn('[ingest_upload]送信警告:', err));
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-file-upload"></i> エクセル投入'; }
    alert('投入しました。30〜60秒ほどで処理が完了し、LINE/Slackに結果が通知されます。画面は自動で更新されます。\n※在庫不足やエラーの場合も通知で分かります。');
    setTimeout(() => { try { reloadData(); } catch(_){} }, 40000);
    setTimeout(() => { try { reloadData(); } catch(_){} }, 75000);
  };
  reader.onerror = () => { alert('ファイルの読み込みに失敗しました'); if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-file-upload"></i> エクセル投入'; } };
  reader.readAsDataURL(file);
}
// ヘッダー「…」その他メニュー
function toggleMoreMenu(e) {
  if (e) e.stopPropagation();
  const m = document.getElementById('more-menu');
  if (!m) return;
  m.style.display = (m.style.display === 'none' || !m.style.display) ? 'block' : 'none';
}
function closeMoreMenu() {
  const m = document.getElementById('more-menu');
  if (m) m.style.display = 'none';
}
// メニュー外クリックで閉じる
document.addEventListener('click', (e) => {
  const m = document.getElementById('more-menu');
  const b = document.getElementById('more-btn');
  if (m && m.style.display === 'block' && !m.contains(e.target) && b && !b.contains(e.target)) m.style.display = 'none';
});
// 現在の荷だし表テンプレをアプリからダウンロード
function downloadTemplate() {
  const btn = document.getElementById('template-dl-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader"></i> 取得中...'; }
  const restore = () => { if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-file-download"></i> 荷だし表DL'; } };
  const cbName = 'tplDl_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    const el = document.getElementById('jsonp_' + cbName); if (el) el.remove();
    restore();
    if (!json || json.status !== 'ok') { alert('取得失敗: ' + ((json && json.message) || 'エラー')); return; }
    const bytes = Uint8Array.from(atob(json.data), c => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = json.filename || '荷だし表.xlsx';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=template_download&callback=' + cbName;
  script.onerror = function() { delete window[cbName]; script.remove(); restore(); alert('取得に失敗しました'); };
  document.body.appendChild(script);
}
// 荷だし表テンプレを更新（アップロード→テンプレ差し替え＋直下アーカイブ＋Slack通知）
function triggerTemplateUpload() {
  const inp = document.getElementById('template-file-input');
  if (inp) { inp.value = ''; inp.click(); }
}
function templateUploadFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  if (!/\.(xlsx|xls)$/i.test(file.name)) { alert('xlsx / xls ファイルを選んでください'); return; }
  if (!confirm(`「${file.name}」で荷だし表テンプレを更新します。\n荷出しリスト生成に使うテンプレが差し替わり、Slack/LINEに更新通知が届きます。よろしいですか？`)) return;
  const btn = document.getElementById('template-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader"></i> 更新中...'; }
  const restore = () => { if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-file-spreadsheet"></i> 荷だし表更新'; } };
  const reader = new FileReader();
  reader.onload = () => {
    // テンプレのbase64は大きいので POST(no-cors)。レスポンスはopaqueだが完了はSlack/LINE通知で分かる
    const b64 = String(reader.result).split(',')[1] || '';
    const body = JSON.stringify({ action: 'update_template', data: JSON.stringify({ filename: file.name, contentB64: b64 }) });
    fetch(GAS_API_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: body
    }).catch(err => console.warn('[update_template]送信警告:', err));
    restore();
    alert('荷だし表を更新しました。数秒後にSlack/LINEへ更新通知が届きます。');
  };
  reader.onerror = () => { alert('ファイルの読み込みに失敗しました'); restore(); };
  reader.readAsDataURL(file);
}
// 担当者・車両の入力候補を既存データから生成
function populateEpCandidates() {
  const src = [].concat(outItems||[], reservations||[], history||[]);
  const staffs = [...new Set(src.map(x => x.staff).filter(s => s && s !== '未入力'))];
  const vehicles = [...new Set(src.map(x => x.vehicle).filter(Boolean))];
  const sEl = document.getElementById('ep-staff-datalist');
  const vEl = document.getElementById('ep-vehicle-datalist');
  if (sEl) sEl.innerHTML = staffs.map(s => `<option value="${escHtml(s)}"></option>`).join('');
  if (vEl) vEl.innerHTML = vehicles.map(v => `<option value="${escHtml(v)}"></option>`).join('');
}
// ヘッダー「＋新規案件」：編集モーダルを空の作成モードで開く（UI/オートコンプリートを流用）
function openCreateProject() {
  epCreateMode = true;
  pdProject = '';
  pdDateKey = '';
  epItemsState = [];
  document.getElementById('ep-title').textContent = '（新規）';
  const h3 = document.querySelector('#modal-edit-project h3');
  if (h3) h3.innerHTML = '<i class="ti ti-plus" aria-hidden="true"></i> 案件を新規作成 <span id="ep-title" style="color:var(--text2);font-size:13px;margin-left:8px">（新規）</span>';
  ['ep-project','ep-staff','ep-vehicle','ep-dateout','ep-dateret'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  populateEpCandidates();
  renderEpItems();
  openModal('modal-edit-project');
}
function openEditProject() {
  if (!pdProject) return;
  epCreateMode = false;
  populateEpCandidates();
  const h3 = document.querySelector('#modal-edit-project h3');
  if (h3) h3.innerHTML = '<i class="ti ti-edit" aria-hidden="true"></i> 案件を編集 <span id="ep-title" style="color:var(--text2);font-size:13px;margin-left:8px"></span>';
  const projectItems = outItems.filter(o => (o.project||'（案件名未入力）') === pdProject && (!pdDateKey || dateKeyOf(o.dateOut||o.date) === pdDateKey));
  const resItems = (reservations||[]).filter(r => r.project === pdProject && (!pdDateKey || dateKeyOf(r.dateOut) === pdDateKey));
  const rows = projectItems.length ? projectItems.map(o => ({
    kind: o.note === '[レンタル]' ? 'rental' : (o.note === '(在庫管理外)' ? 'free' : 'own'),
    category: o.category||'', maker: o.maker||'', itemName: o.model||'', qty: o.qty||0, note: o.note||''
  })) : resItems.map(r => ({
    kind: r.note === '[レンタル]' ? 'rental' : (r.note === '(在庫管理外)' ? 'free' : 'own'),
    category: r.category||'', maker: r.maker||'', itemName: r.itemName||'', qty: r.qty||0, note: r.note||''
  }));
  // 人員のみプレースホルダは編集画面から除外
  epItemsState = rows.filter(r => !(r.category === '人員のみ' && r.itemName === '人員のみ'));
  const src = projectItems[0] || resItems[0] || {};
  document.getElementById('ep-title').textContent = '';
  document.getElementById('ep-project').value = pdProject;
  document.getElementById('ep-staff').value = src.staff || '';
  document.getElementById('ep-vehicle').value = src.vehicle || '';
  document.getElementById('ep-dateout').value = src.dateOut || src.date || '';
  document.getElementById('ep-dateret').value = src.dateReturn || src.returnDate || '';
  renderEpItems();
  openModal('modal-edit-project');
}
// 自社(own)機材が在庫マスターに存在するか（バックエンド findMasterIndex と同じ照合＝完全一致→部分一致）
function epOwnInInventory(name) {
  name = String(name || '').trim();
  if (!name) return false;
  const list = inv || [];
  if (list.some(x => String(x.model || '').trim() === name)) return true;   // 完全一致
  return list.some(x => {                                                   // 部分一致（どちらかが含む）
    const kw = String(x.model || '').trim();
    return kw && (kw.indexOf(name) !== -1 || name.indexOf(kw) !== -1);
  });
}
// 型番入力欄を、自社在庫に無い場合だけ赤枠に（入力の都度・再描画なしで反映）
function epMarkNameValidity(el, i) {
  const it = epItemsState[i];
  const bad = it && it.kind === 'own' && el.value.trim() && !epOwnInInventory(el.value);
  el.style.borderColor = bad ? 'var(--danger, #dc2626)' : '';
  el.style.background  = bad ? 'color-mix(in srgb, var(--danger, #dc2626) 8%, transparent)' : '';
  el.title = bad ? '自社在庫にない機材です。候補から選ぶか、レンタル/フリーで追加してください' : '';
}
function renderEpItems() {
  const kindLabel = { own:'自社', rental:'レンタル', free:'フリー' };
  const invList = inv || [];
  // メーカー候補（在庫マスターの会社/メーカー一覧・重複除去）
  const makers = [...new Set(invList.map(x => x.maker).filter(Boolean))];
  const makerDatalist = `<datalist id="ep-maker-datalist">${makers.map(m => `<option value="${escHtml(m)}"></option>`).join('')}</datalist>`;
  // 全型番候補
  const allModels = [...new Set(invList.map(x => x.model).filter(Boolean))];
  const html = epItemsState.map((it, i) => {
    const showMaker = it.kind !== 'free';
    // 自社行：メーカーが入っていればそのメーカーの型番に絞った候補、無ければ全型番
    let rowModels = allModels;
    if (it.kind === 'own' && it.maker && it.maker.trim()) {
      const mk = it.maker.trim();
      const filtered = [...new Set(invList.filter(x => String(x.maker) === mk).map(x => x.model).filter(Boolean))];
      if (filtered.length) rowModels = filtered;
    }
    const modelListId = `ep-model-dl-${i}`;
    const modelDatalist = it.kind === 'own'
      ? `<datalist id="${modelListId}">${rowModels.map(m => `<option value="${escHtml(m)}"></option>`).join('')}</datalist>` : '';
    const nameListAttr  = it.kind === 'own' ? `list="${modelListId}"` : '';
    const makerListAttr = (showMaker && it.kind === 'own') ? 'list="ep-maker-datalist"' : '';
    const ownInvalid = it.kind === 'own' && it.itemName && it.itemName.trim() && !epOwnInInventory(it.itemName);
    const invalidStyle = ownInvalid ? ' style="border-color:var(--danger,#dc2626);background:color-mix(in srgb,var(--danger,#dc2626) 8%,transparent)" title="自社在庫にない機材です。候補から選ぶか、レンタル/フリーで追加してください"' : '';
    return `<div class="ep-item-row" data-i="${i}">
      ${modelDatalist}
      <span class="ep-badge ep-${it.kind}">${kindLabel[it.kind]||it.kind}</span>
      ${showMaker ? `<input class="ep-in-maker" ${makerListAttr} placeholder="会社/メーカー" value="${escHtml(it.maker||'')}" oninput="epItemsState[${i}].maker=this.value" onchange="epOnMakerChange(${i},this.value)">` : ''}
      <input class="ep-in-name" ${nameListAttr}${invalidStyle} placeholder="型番/機材名" value="${escHtml(it.itemName||'')}" oninput="epItemsState[${i}].itemName=this.value;epMarkNameValidity(this,${i})" onchange="epOnNameChange(${i},this.value)">
      <input class="ep-in-qty" type="number" min="0" value="${it.qty}" oninput="epItemsState[${i}].qty=parseInt(this.value)||0">
      <button class="btn ep-del" onclick="epDeleteItem(${i})"><i class="ti ti-trash"></i></button>
    </div>`;
  }).join('');
  document.getElementById('ep-items').innerHTML = makerDatalist + (html || '<div style="color:var(--text2);font-size:12px;padding:8px 0">（機材なし＝人員のみ現場として登録されます）</div>');
}
// メーカーを入れ/選んだら、その行の型番候補をそのメーカーの機材に絞り直す
function epOnMakerChange(i, val) {
  const it = epItemsState[i];
  if (!it) return;
  it.maker = val;
  if (it.kind === 'own') renderEpItems();
}
// 候補から型番を選んだら、自社機材はメーカーを在庫マスターから自動補完
function epOnNameChange(i, val) {
  const it = epItemsState[i];
  if (!it) return;
  it.itemName = val;
  if (it.kind === 'own' && (!it.maker || it.maker.trim() === '')) {
    const hit = (inv || []).find(x => String(x.model) === String(val));
    if (hit && hit.maker) { it.maker = hit.maker; renderEpItems(); }
  }
}
function epAddItem(kind) {
  epItemsState.push({ kind, category:'', maker:'', itemName:'', qty:1, note:'' });
  renderEpItems();
}
function epDeleteItem(i) {
  epItemsState.splice(i, 1);
  renderEpItems();
}
function saveEditProject() {
  const btn = document.getElementById('ep-save-btn');
  const meta = {
    project:    document.getElementById('ep-project').value.trim(),
    staff:      document.getElementById('ep-staff').value.trim(),
    vehicle:    document.getElementById('ep-vehicle').value.trim(),
    dateOut:    document.getElementById('ep-dateout').value.trim(),
    dateReturn: document.getElementById('ep-dateret').value.trim(),
  };
  const items = epItemsState.filter(it => it.itemName && it.itemName.trim() !== '' && ((it.qty|0) > 0 || it.kind === 'rental' || it.kind === 'free'));
  if (!meta.project) { alert('案件名は必須です'); return; }
  // 自社(own)機材で在庫マスターに無いものはブロック（在庫外はレンタル/フリーで追加してもらう）
  const badOwn = items.filter(it => it.kind === 'own' && !epOwnInInventory(it.itemName));
  if (badOwn.length) {
    alert('次の機材は自社在庫にありません。候補から選ぶか、レンタル／フリーに変更してください：\n\n・' + badOwn.map(it => it.itemName.trim()).join('\n・'));
    return;
  }
  const action = epCreateMode ? 'create_project' : 'edit_project';
  const payload = epCreateMode
    ? { meta, items }
    : { origProject: pdProject, origDateKey: pdDateKey || '', meta, items };
  const confirmMsg = epCreateMode
    ? 'この内容で新規案件を登録します。搬入日が未来なら予約、当日以降なら持ち出しとして登録され、荷出しリストも作成されます。よろしいですか？'
    : 'この内容で反映します。マスターの残在庫も差分だけ調整されます。よろしいですか？';
  if (!confirm(confirmMsg)) return;
  const body = JSON.stringify({ action, data: JSON.stringify(payload) });
  console.log('[' + action + '] POST body size:', body.length, 'items:', items.length);
  // 送信（no-cors・レスポンスは opaque だが GAS 側は処理される）。完了は LINE/Slack 通知で分かる
  fetch(GAS_API_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: body
  }).catch(err => console.warn('[edit_project]送信警告:', err));
  // モーダルは即閉じてユーザーを待たせない。反映はバックグラウンドで進み、自動更新で取り込む
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-check"></i> 保存'; }
  closeModal('modal-edit-project');
  closeModal('modal-project-detail');
  alert('反映を開始しました。20〜40秒ほどで完了し、LINE/Slackに通知が届きます。画面は自動で更新されます。');
  // 反映結果を取り込むため段階的に自動リロード（機材が多い案件は時間がかかるため2回）
  setTimeout(() => { try { reloadData(); } catch(_){} }, 30000);
  setTimeout(() => { try { reloadData(); } catch(_){} }, 60000);
}

// エラーフォルダ一覧を取得して表示
function openErrorList() {
  openModal('modal-error');
  const body = document.getElementById('error-list-body');
  body.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2)">読み込み中...</div>';
  const cb = 'cbErrList' + Date.now();
  window[cb] = (json) => {
    delete window[cb]; s.remove();
    if (json.status !== 'ok') { body.innerHTML = '<div class="empty">取得に失敗しました：' + escHtml(json.message||'') + '</div>'; return; }
    if (!json.files.length) { body.innerHTML = '<div class="empty">エラーフォルダにファイルはありません</div>'; return; }
    body.innerHTML = json.files.map(f => `
      <div style="display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid var(--border)">
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(f.name)}</div>
          <div style="font-size:11px;color:var(--text2)">${escHtml(f.modified.slice(0,10))}</div>
        </div>
        <button class="btn btn-primary" style="padding:6px 12px;font-size:12px" onclick="reingestError('${f.name.replace(/'/g,"\\'")}',this)"><i class="ti ti-rotate"></i> 再投入</button>
      </div>`).join('');
  };
  const s = document.createElement('script');
  s.src = GAS_API_URL + '?action=error_list&callback=' + cb;
  document.body.appendChild(s);
}

function reingestError(name, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '処理中...'; }
  const cb = 'cbReingest' + Date.now();
  window[cb] = (json) => {
    delete window[cb]; s.remove();
    if (json.status === 'ok') {
      if (btn) { btn.textContent = '✓ 完了'; btn.classList.remove('btn-primary'); }
      setTimeout(openErrorList, 800);
    } else {
      alert('再投入に失敗：' + (json.message||''));
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-rotate"></i> 再投入'; }
    }
  };
  const s = document.createElement('script');
  s.src = GAS_API_URL + '?action=error_reingest&name=' + encodeURIComponent(name) + '&callback=' + cb;
  document.body.appendChild(s);
}
document.querySelectorAll('.modal-backdrop').forEach(b => {
  b.addEventListener('click', e => { if(e.target===b) b.classList.remove('open'); });
});

function exportCSV() {
  const rows=[['カテゴリ','メーカー','型番・品名','総在庫','残在庫','ステータス','備考']];
  inv.forEach(i=>rows.push([i.cat,i.maker,i.model,i.total,avail(i),calcSt(i),i.note]));
  const csv=rows.map(r=>r.map(c=>`"${c}"`).join(',')).join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));
  a.download='機材在庫.csv'; a.click();
}

function handleFile(e) {
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    try {
      const wb=XLSX.read(ev.target.result,{type:'binary'});
      const wsName=wb.SheetNames.includes('受注書_A4横')?'受注書_A4横':wb.SheetNames[0];
      const ws=wb.Sheets[wsName];
      const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});

      const projectName=String(rows[2]?.[2]||'').trim();
      const staff=String(rows[3]?.[14]||'').trim();
      const dateOut=String(rows[4]?.[2]||'').trim();
      const dateReturn=String(rows[4]?.[8]||'').trim();

      const equipmentList=[];
      for(let i=6;i<rows.length;i++){
        const row=rows[i];
        const itemName=String(row[4]||'').trim();
        const qtyRaw=row[10]!==''?row[10]:row[11];
        const qty=parseInt(qtyRaw)||0;
        const category=String(row[0]||'').trim();
        const note=String(row[12]||'').trim();
        if(!itemName||qty<=0) continue;
        equipmentList.push({category,itemName,qty,note});
      }

      if(!equipmentList.length){
        alert('数量が入力された機材が見つかりませんでした。');
        return;
      }

      const now=new Date().toLocaleString('ja-JP');
      const notFound=[];
      let appliedCount=0;

      equipmentList.forEach(eq=>{
        const masterIdx=inv.findIndex(item=>
          item.model.includes(eq.itemName)||eq.itemName.includes(item.model)
        );
        if(masterIdx===-1){notFound.push(eq.itemName);return;}
        const item=inv[masterIdx];
        const av=avail(item);
        const applyQty=Math.min(eq.qty,av);
        if(applyQty<=0){notFound.push(`${eq.itemName}（在庫不足）`);return;}
        item.out+=applyQty;
        outItems.push({
          id:Date.now()+masterIdx, invIdx:masterIdx,
          model:`${item.maker} ${item.model}`,
          qty:applyQty, project:projectName||'（未入力）',
          staff:staff||'（未入力）', returnDate:dateReturn||'', date:now,
        });
        history.push({
          date:now, project:projectName||'（未入力）', staff:staff||'（未入力）',
          model:`${item.maker} ${item.model}`, qty:applyQty, action:'OUT',
          note:dateReturn?`返却予定:${dateReturn}`:'',
        });
        appliedCount++;
      });

      render();

      let msg=`✅ 受注書を読み込みました\n\n`;
      msg+=`案件名: ${projectName||'（未入力）'}\n`;
      msg+=`担当者: ${staff||'（未入力）'}\n`;
      msg+=`持出予定: ${dateOut||'（未入力）'}\n`;
      msg+=`返却予定: ${dateReturn||'（未入力）'}\n\n`;
      msg+=`反映した機材: ${appliedCount}件`;
      if(notFound.length>0) msg+=`\n\n⚠️ マスターで見つからなかった機材:\n${notFound.join('\n')}`;
      alert(msg);

    } catch(err){ alert('ファイルの読み込みに失敗しました。\nエラー: '+err.message); }
  };
  reader.readAsBinaryString(file);
  e.target.value='';
}

// ============================================================
// スプレッドシートから在庫データを取得（JSONP）
// ============================================================
let _loadingStart = Date.now();
function showLoading(on) {
  const el = document.getElementById('loading-screen');
  if (!el) return;
  if (on) {
    _loadingStart = Date.now();
    el.classList.remove('hidden');
  } else {
    const elapsed = Date.now() - _loadingStart;
    const delay = Math.max(0, 800 - elapsed);
    setTimeout(() => el.classList.add('hidden'), delay);
  }
}

// キャッシュ廃止（常にGASから最新データを取得）
try { localStorage.removeItem('kizai_data_cache'); } catch(e) {}

function applyData(json) {
  if (json.inventory && json.inventory.length > 0) {
    inv = json.inventory.map(function(r) {
      const total  = parseInt(r.total) || 0;
      const stock  = parseInt(r.stock) || 0;
      const out    = parseInt(r.out)   || 0;
      const status = String(r.status || 'IN');
      const isSpecial = ['修理中','レンタル中','長期不在'].includes(status);
      const special = isSpecial ? Math.max(0, total - stock - out) : 0;
      return {
        row:     r.row || null,
        cat:     String(r.cat   || ''),
        maker:   String(r.maker || ''),
        model:   String(r.model || ''),
        note:    String(r.note  || ''),
        total:   total,
        out:     out,
        special: special,
        status:  status,
      };
    });
  }

  if (json.out && json.out.length > 0) {
    outItems = json.out
      .filter(function(r) { return r.model && String(r.model) !== ''; })
      .map(function(r, i) {
        const rModel = String(r.model || '');
        const invIdx = inv.findIndex(function(item) {
          const iModel = String(item.model || '');
          return rModel.includes(iModel) || iModel.includes(rModel);
        });
        return {
          id:         i,
          invIdx:     invIdx >= 0 ? invIdx : 0,
          model:      rModel,
          qty:        parseInt(r.qty) || 0,
          project:    String(r.project    || ''),
          staff:      String(r.staff      || ''),
          category:   String(r.category   || ''),
          dateOut:    String(r.dateOut    || ''),
          returnDate: String(r.dateReturn || ''),
          date:       String(r.date       || ''),
          vehicle:    String(r.vehicle    || ''),
          note:       String(r.note       || ''),
          maker:      String(r.maker      || ''),
        };
      });

    history = outItems.map(function(o) {
      return {
        date:    o.date,
        project: o.project,
        staff:   o.staff,
        model:   o.model,
        qty:     o.qty,
        action:  'OUT',
        note:    o.returnDate ? '返却予定:' + o.returnDate : '',
      };
    });
  }

  if (json.reservations) {
    reservations = json.reservations;
    if (currentTab === 'reserve') renderReservations();
  }

  if (currentTab === 'out') renderOut();

  rentalRanking = json.rentalRanking || [];
  conflicts = json.conflicts || [];
  renderConflictBanner();
  if (currentTab === 'dashboard') renderDashboard();

  if (json.history && json.history.length > 0) {
    const gasHistory = json.history.map(function(h) {
      return {
        date:     h.date     || '',
        project:  h.project  || '',
        staff:    h.staff    || '',
        model:    h.model    || '',
        qty:      parseInt(h.qty) || 0,
        action:   h.action   || 'OUT',
        note:     h.note     || '',
        category: h.category || '',
        kind:     h.kind     || '',
        maker:    h.maker    || '',
      };
    });
    const existingModels = new Set(gasHistory.map(function(h) { return h.date + h.model; }));
    const localOnly = history.filter(function(h) {
      return !existingModels.has(h.date + h.model);
    });
    history = gasHistory.concat(localOnly);
  }
}

function fetchFromSpreadsheet() {
  if (!GAS_API_URL || GAS_API_URL === 'ここにGASのURLを貼り付け') {
    render();
    showLoading(false);
    return;
  }

  fetchShiftFile();
  fetchStaffShiftFile();

  const cbName = 'gasCallback_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    const el = document.getElementById('jsonp_' + cbName);
    if (el) el.remove();

    applyData(json);
    render();
    if (currentTab === 'dashboard') renderDashboard();
    showLoading(false);
  };

  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=all&callback=' + cbName;
  script.onerror = function() {
    console.error('GAS接続エラー');
    delete window[cbName];
    script.remove();
    render();
    showLoading(false);
  };
  document.body.appendChild(script);
}


// ============================================================
// ダッシュボード（カレンダー＋レポート）
// ============================================================
let calOffset = 0; // 今月からの月オフセット

function changeCalMonth(delta) {
  calOffset = Math.max(-6, Math.min(6, calOffset + delta));
  if (currentTab === 'all') renderTopPage();
  else renderDashboard();
}

function renderConflictBanner() {
  const el = document.getElementById('conflict-banner');
  if (!el) return;
  if (!conflicts || !conflicts.length) { el.innerHTML = ''; return; }
  const items = conflicts.map(c => `${escHtml(c.model)}（${c.shortage}不足）`).join('、');
  el.innerHTML = `<div class="conflict-alert" onclick="openConflictModal()"><i class="ti ti-alert-triangle"></i> <strong>予約重複で在庫超過：</strong>${items}<span style="opacity:.75"> — タップで詳細</span></div>`;
}

// 在庫超過（予約重複）の詳細をモーダルで表示（旧ダッシュボードの代替）
function openConflictModal() {
  const body = document.getElementById('conflict-detail-body');
  if (!body) return;
  if (!conflicts || !conflicts.length) {
    body.innerHTML = '<div style="color:var(--text2);padding:8px 0">現在、在庫超過はありません。</div>';
  } else {
    body.innerHTML = conflicts.map(c => `
      <div style="padding:10px 2px;border-bottom:0.5px solid var(--border)">
        <div style="font-weight:700;font-size:14px">${escHtml(c.model)} <span style="color:var(--danger-text)">必要${c.peak} / 総数${c.total}（${c.shortage}個不足）</span></div>
        ${(c.bookings||[]).map(b => `<div style="font-size:12px;color:var(--text2);margin-top:3px">・${escHtml(b.project||'（未入力）')} ×${b.qty}　${escHtml(fmtDateDisp(b.dateOut))} 〜 ${escHtml(fmtDateDisp(b.dateReturn))}</div>`).join('')}
      </div>`).join('');
  }
  openModal('modal-conflict');
}

// カレンダーの「+N件」タップ：その日の予定を一覧表示。項目タップで個別詳細へ
function openCalDayModal(dateKey, e) {
  if (e) e.stopPropagation();
  const y = parseInt(dateKey.slice(0,4)), m = parseInt(dateKey.slice(4,6))-1, d = parseInt(dateKey.slice(6,8));
  const day = new Date(y, m, d); day.setHours(0,0,0,0);
  const nextDay = new Date(y, m, d+1); nextDay.setHours(0,0,0,0);
  const parse = (v) => { const dd = parseDate(v); return dd ? dd : null; };
  const inSpan = (src) => {
    const s = parse(src.dateOut || src.date); if (!s) return false;
    const e2 = parse(src.dateReturn || src.returnDate) || s;
    const sd = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    const ed = new Date(e2.getFullYear(), e2.getMonth(), e2.getDate());
    return sd <= day && day <= ed;
  };
  // 案件単位で集約（機材が複数行あっても1件）
  const byKey = new Map();
  const push = (src, kind) => {
    if (!inSpan(src)) return;
    const proj = (src.project || '（案件名未入力）');
    const dOutRaw = src.dateOut || src.date || '';
    const dOutKey = dateKeyOf(dOutRaw) || '';
    const key = proj + '|' + dOutKey;
    if (byKey.has(key)) return;
    byKey.set(key, {
      project: proj,
      dateOut: dOutRaw, dateReturn: src.dateReturn || src.returnDate || '',
      dateOutKey: dOutKey, staff: src.staff || '', vehicle: src.vehicle || '', kind,
    });
  };
  (outItems || []).forEach(o => push(o, 'out'));
  (reservations || []).forEach(r => push(r, 'res'));
  const items = [...byKey.values()].sort((a,b) => {
    const ka = a.dateOutKey || '', kb = b.dateOutKey || '';
    return ka.localeCompare(kb);
  });
  document.getElementById('cal-day-title').textContent = `${y}年${m+1}月${d}日 の予定（${items.length}件）`;
  const body = document.getElementById('cal-day-body');
  if (!items.length) {
    body.innerHTML = '<div style="color:var(--text2);padding:12px 0">この日に予定はありません。</div>';
  } else {
    body.innerHTML = items.map(it => {
      const kindBadge = it.kind === 'out'
        ? '<span class="badge s-danger" style="font-size:10px">持ち出し中</span>'
        : '<span class="badge s-info" style="font-size:10px">予約</span>';
      const vc = vehicleClass(it.vehicle);
      const vs = vehicleChipStyle(it.vehicle);
      const veh = it.vehicle ? `<span class="cal-event ${vc}" style="font-size:10px;padding:1px 6px;height:auto;line-height:1.2;${vs}">${escHtml(it.vehicle)}</span>` : '';
      const dateRange = `${escHtml(fmtDateDisp(it.dateOut))} 〜 ${escHtml(fmtDateDisp(it.dateReturn))}`;
      return `
        <div style="padding:10px 4px;border-bottom:0.5px solid var(--border);cursor:pointer" onclick="closeModal('modal-cal-day');showProjectDetail('${it.project.replace(/'/g,"\\'")}','${it.dateOutKey}')">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">${kindBadge}${veh}</div>
          <div style="font-weight:700;font-size:14px">${escHtml(it.project)}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">${dateRange}${it.staff ? ' ・ 担当: ' + escHtml(it.staff) : ''}</div>
        </div>`;
    }).join('');
  }
  openModal('modal-cal-day');
}

function renderDashboard() {
  const container = document.getElementById('dashboard-container');
  if (!container) return;

  // カレンダーデータ作成
  const now = new Date();
  const base = new Date(now.getFullYear(), now.getMonth() + calOffset, 1);
  const year = base.getFullYear();
  const month = base.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  // 案件を日付マップに（持ち出し中＋履歴）
  const dateMap = {};
  const pushEntry = (key, proj, vehicle, category, span, sortKey) => {
    if (!dateMap[key]) dateMap[key] = [];
    let existing = dateMap[key].find(e => e.proj === proj);
    if (!existing) {
      existing = { proj, vehicle: vehicle || '', cats: new Set(), span: span || 'single', sortKey: sortKey || 0 };
      dateMap[key].push(existing);
    } else if (span) {
      existing.span = span;
    }
    if (category) existing.cats.add(category);
  };
  // 期間を日ごとに分割して pushEntry する（開始日=start, 終了日=end, 中間=mid）
  const spanDays = (dOut, dRet, proj, vehicle, category) => {
    const start = new Date(dOut.getFullYear(), dOut.getMonth(), dOut.getDate());
    const end = dRet ? new Date(dRet.getFullYear(), dRet.getMonth(), dRet.getDate()) : start;
    if (end < start) return spanDays(dOut, null, proj, vehicle, category);
    const sortKey = start.getTime();  // 開始日でソートすると帯が同じ高さで並ぶ
    let first = true;
    for (let cur = new Date(start); cur <= end; cur.setDate(cur.getDate()+1)) {
      const isLast = (cur.getTime() === end.getTime());
      const span = (first && isLast) ? 'single' : (first ? 'start' : (isLast ? 'end' : 'mid'));
      const key = cur.getFullYear() + '-' + (cur.getMonth()+1) + '-' + cur.getDate();
      pushEntry(key, proj, vehicle, category, span, sortKey);
      first = false;
    }
  };
  history.forEach(h => {
    if (!h.project) return;
    const d = parseDate(h.date);
    if (!d) return;
    const key = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    pushEntry(key, h.project, h.vehicle || '', h.category || '', 'single', d.getTime());
  });
  outItems.forEach(o => {
    const dOut = parseDate(o.dateOut || o.date);
    if (!dOut) return;
    const dRet = parseDate(o.returnDate || o.dateReturn) || dOut;
    spanDays(dOut, dRet, o.project || '（案件名未入力）', o.vehicle || '', o.category || '');
  });
  // 各日のイベントを開始日順にソート（複数日案件が上に来る／同じ高さで揃う）
  Object.values(dateMap).forEach(arr => arr.sort((a, b) => (a.sortKey||0) - (b.sortKey||0)));

  // 在庫不足ランキング（shortageDataから）
  const top10 = Object.entries(shortageData)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 10);
  const maxFreq = top10.length ? top10[0][1] : 1;

  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const dayNames = ['日','月','火','水','木','金','土'];

  // カレンダーHTML
  let calCells = '';
  dayNames.forEach(d => {
    calCells += `<div class="cal-head">${d}</div>`;
  });
  // 日曜始まりカレンダー：firstDay(0=日..6=土)ぶんの空セルを詰める
  for (let i = 0; i < firstDay; i++) {
    calCells += `<div class="cal-cell empty"></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key = year + '-' + (month+1) + '-' + d;
    const events = dateMap[key] || [];
    const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    const maxShow = 3;
    const eventDots = events.slice(0, maxShow).map(function(ev) {
      const proj = ev.proj;
      const isPersonOnly = ev.cats && ev.cats.size > 0 && [...ev.cats].every(c => c === '人員のみ');
      const rawLabel = proj.length > 8 ? proj.slice(0,8)+'…' : proj;
      // 複数日案件は先頭日と末尾日にラベル表示、中間だけ空白（帯感を保ちつつ視認性UP）
      const showLabel = (ev.span !== 'mid');
      const label = showLabel ? (isPersonOnly ? '👤 ' + rawLabel : rawLabel) : '';
      const spanClass = ev.span ? 'cal-span-' + ev.span : '';
      const _dk = year + String(month+1).padStart(2,'0') + String(d).padStart(2,'0');
      const vc = vehicleClass(ev.vehicle);
      const vs = vehicleChipStyle(ev.vehicle);
      return '<div class="cal-event ' + vc + ' ' + spanClass + '" data-project="' + proj.replace(/"/g,'&quot;') + '" data-datekey="' + _dk + '" onclick="showProjectDetail(this.dataset.project,this.dataset.datekey,event)" style="cursor:pointer;' + vs + '">' + label + '</div>';
    }).join('');
    const overflow = events.length > maxShow ? `<div class="cal-more">+${events.length - maxShow}</div>` : '';
    const dowIdx = new Date(year, month, d).getDay();
    const isHol = isJpHoliday(year, month+1, d);
    const dowCls = (isHol || dowIdx === 0) ? ' sun' : (dowIdx === 6 ? ' sat' : '');
    calCells += `<div class="cal-cell${isToday ? ' today' : ''}${events.length ? ' has-event' : ''}${dowCls}${isHol?' holiday':''}">
      <span class="cal-day"><span class="cal-day-num">${d}</span></span>
      ${eventDots}${overflow}
    </div>`;
  }

  // レポートHTML
  const reportRows = top10.length ? top10.map(([model, count], i) => {
    const pct = Math.round(count / maxFreq * 100);
    return `<div class="rep-row">
      <span class="rep-rank">${i+1}</span>
      <span class="rep-name">${model}</span>
      <div class="rep-bar-wrap">
        <div class="rep-bar" style="width:${pct}%"></div>
      </div>
      <span class="rep-count">${count}回</span>
    </div>`;
  }).join('') : `<div style="text-align:center;padding:2rem;color:var(--text2);font-size:13px">在庫不足の記録がありません</div>`;

  // レンタル品ランキング（自社以外から借りた機材。拠点間貸出は除外）
  const rentTop = (rentalRanking || []).slice(0, 10);
  const rentMax = rentTop.length ? rentTop[0].count : 1;
  const rentRows = rentTop.length ? rentTop.map((r, i) => {
    const pct = Math.round(r.count / rentMax * 100);
    return `<div class="rep-row">
      <span class="rep-rank">${i+1}</span>
      <span class="rep-name">${escHtml(r.model)}${r.companies?`<span style="color:var(--text2);font-size:10px"> / ${escHtml(r.companies)}</span>`:''}</span>
      <div class="rep-bar-wrap"><div class="rep-bar" style="width:${pct}%;background:var(--warn-text)"></div></div>
      <span class="rep-count">${r.count}回</span>
    </div>`;
  }).join('') : `<div style="text-align:center;padding:2rem;color:var(--text2);font-size:13px">レンタルの記録がありません</div>`;

  // 予約重複（在庫超過）アラート
  const conflictCard = (conflicts && conflicts.length) ? `
    <div class="dash-card" style="margin-bottom:14px;border:1px solid var(--danger-text)">
      <div class="dash-card-head" style="color:var(--danger-text)">
        <i class="ti ti-alert-triangle" aria-hidden="true"></i>
        <span>予約重複で在庫超過（${conflicts.length}件）</span>
      </div>
      <div style="font-size:11px;color:var(--text2);padding:0 4px 6px">同じ機材を期間（日時）が重なって予約/持ち出ししています</div>
      ${conflicts.map(c => `
        <div style="padding:8px 4px;border-bottom:0.5px solid var(--border)">
          <div style="font-weight:700;font-size:13px">${escHtml(c.model)} <span style="color:var(--danger-text)">必要${c.peak} / 総数${c.total}（${c.shortage}個不足）</span></div>
          ${c.bookings.map(b => `<div style="font-size:11px;color:var(--text2);margin-top:2px">・${escHtml(b.project||'（未入力）')} ×${b.qty}　${escHtml(fmtDateDisp(b.dateOut))} 〜 ${escHtml(fmtDateDisp(b.dateReturn))}</div>`).join('')}
        </div>`).join('')}
    </div>` : '';

  container.innerHTML = conflictCard + `
    <div class="dash-card">
      <div class="dash-card-head">
        <i class="ti ti-building-store" aria-hidden="true"></i>
        <span>レンタル品 TOP${rentTop.length}（購入検討の参考）</span>
      </div>
      <div style="font-size:11px;color:var(--text2);padding:0 4px 6px">自社以外から借りた回数が多い機材（拠点間貸出は除く）</div>
      <div class="rep-list">${rentRows}</div>
    </div>
  `;
}

// ============================================================
// 自動返却チェック（1分ごと）
// ============================================================
function checkAutoReturn() {
  const now=new Date();
  for(let i=outItems.length-1;i>=0;i--){
    const o=outItems[i];
    if(!o.returnDate) continue;
    const dt=new Date(o.returnDate);
    if(isNaN(dt)||now<dt) continue;
    if(o.invIdx >= 0 && o.invIdx < inv.length){
      inv[o.invIdx].out=Math.max(0,inv[o.invIdx].out-o.qty);
    }
    history.push({date:now.toLocaleString('ja-JP'),project:o.project,staff:o.staff,
      model:o.model,qty:o.qty,action:'自動返却',note:`返却予定:${o.returnDate}`});
    outItems.splice(i,1);
  }
  render();
}

function downloadPickupList(project, dateKey, event) {
  if (event) event.stopPropagation();
  if (!project) { alert('案件を選択してください'); return; }
  const cbName = 'pickupCallback_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    const el = document.getElementById('jsonp_' + cbName);
    if (el) el.remove();
    if (json.status !== 'ok') { alert('取得失敗: ' + (json.message || 'エラー')); return; }
    // Dropboxの持ち出しリスト現物（受注書コピー＋転記済み）をそのままダウンロード
    const bytes = Uint8Array.from(atob(json.data), c => c.charCodeAt(0));
    const blob = new Blob([bytes], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = json.filename || ('持ち出しリスト_' + project + '.xlsx');
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=pickupfile&callback=' + cbName + '&project=' + encodeURIComponent(project) + (dateKey ? '&dateKey=' + encodeURIComponent(dateKey) : '');
  script.onerror = function() {
    delete window[cbName]; script.remove();
    alert('取得に失敗しました');
  };
  document.body.appendChild(script);
}

let reservations = [];
let shortageData = {};

// ============================================================
// シフトExcel取得・表示
// ============================================================
function fetchShiftFile() {
  if (!GAS_API_URL || GAS_API_URL === 'ここにGASのURLを貼り付け') return;
  const cbName = 'shiftCb_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    document.getElementById('jsonp_'+cbName)?.remove();
    const content = document.getElementById('shift-content');
    if (!content) return;
    if (json.status !== 'ok') {
      content.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text2);font-size:13px">ファイルが見つかりません: ' + escHtml(json.message||'エラー') + '</div>';
      return;
    }
    const fname = document.getElementById('shift-filename');
    if (fname) fname.textContent = json.filename || 'シフト';
    const bytes = Uint8Array.from(atob(json.data), c => c.charCodeAt(0));
    const wb = XLSX.read(bytes, {type:'array'});
    window._shiftWb = wb;
    renderShiftSheet(0);
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=shift_file&callback=' + cbName;
  script.onerror = function() {
    delete window[cbName]; script.remove();
    const content = document.getElementById('shift-content');
    if (content) content.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text2)">読み込み失敗</div>';
  };
  document.body.appendChild(script);
}

function renderShiftSheet(idx) {
  const wb = window._shiftWb;
  if (!wb) return;
  const content = document.getElementById('shift-content');
  if (!content) return;
  const sheetNames = wb.SheetNames.slice(0, 6);
  const tabs = sheetNames.map((name, i) =>
    `<button onclick="renderShiftSheet(${i})" style="padding:4px 10px;font-size:11px;border:1px solid var(--border2);border-radius:4px;cursor:pointer;background:${i===idx?'var(--accent)':'var(--bg2)'};color:${i===idx?'#fff':'var(--text1)'}">${escHtml(name)}</button>`
  ).join('');
  const ws = wb.Sheets[sheetNames[idx] || wb.SheetNames[0]];
  if (ws['!ref']) {
    const range = XLSX.utils.decode_range(ws['!ref']);
    range.e.c = Math.min(range.e.c, 9);  // J列(index 9)まで
    range.e.r = Math.min(range.e.r, 199); // 200行まで
    ws['!ref'] = XLSX.utils.encode_range(range);
  }
  const html = XLSX.utils.sheet_to_html(ws, {editable: false});
  content.innerHTML = `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">${tabs}</div><div class="shift-table-wrap">${html}</div>`;
}

function fetchStaffShiftFile() {
  if (!GAS_API_URL || GAS_API_URL === 'ここにGASのURLを貼り付け') return;
  const cbName = 'staffShiftCb_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    document.getElementById('jsonp_'+cbName)?.remove();
    const content = document.getElementById('staff-shift-content');
    if (!content) return;
    if (json.status !== 'ok') {
      content.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text2);font-size:13px">ファイルが見つかりません: ' + escHtml(json.message||'エラー') + '</div>';
      return;
    }
    const fname = document.getElementById('staff-shift-filename');
    if (fname) fname.textContent = json.filename || 'スタッフシフト';
    const bytes = Uint8Array.from(atob(json.data), c => c.charCodeAt(0));
    const wb = XLSX.read(bytes, {type:'array'});
    window._staffShiftWb = wb;
    renderStaffShiftSheet(0);
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=staff_shift_file&callback=' + cbName;
  script.onerror = function() {
    delete window[cbName]; script.remove();
    const content = document.getElementById('staff-shift-content');
    if (content) content.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text2)">読み込み失敗</div>';
  };
  document.body.appendChild(script);
}

function renderStaffShiftSheet(idx) {
  const wb = window._staffShiftWb;
  if (!wb) return;
  const content = document.getElementById('staff-shift-content');
  if (!content) return;
  const sheetNames = wb.SheetNames.slice(0, 6);
  const tabs = sheetNames.map((name, i) =>
    `<button onclick="renderStaffShiftSheet(${i})" style="padding:4px 10px;font-size:11px;border:1px solid var(--border2);border-radius:4px;cursor:pointer;background:${i===idx?'var(--accent)':'var(--bg2)'};color:${i===idx?'#fff':'var(--text1)'}">${escHtml(name)}</button>`
  ).join('');
  const ws = wb.Sheets[sheetNames[idx] || wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, {header:1, defval:'', range:0});

  const blueCols = new Set([3,5,7,9]);

  let html = '<table style="border-collapse:collapse;table-layout:fixed;width:100%">';
  html += '<colgroup><col style="width:26px"><col style="width:24px">';
  for (let c = 2; c < 10; c++) html += '<col>';
  html += '</colgroup>';

  data.slice(0, 35).forEach((row, r) => {
    const youbi = String(row[1] || '');
    const isSat = youbi === '土';
    const isSun = youbi === '日';
    const rowCls = isSat ? 'sft-sat' : isSun ? 'sft-sun' : '';

    if (r === 0) {
      html += '<tr>';
      html += `<td colspan="2" class="sft-cell sft-hd" style="font-size:11px">${escHtml(String(row[0]||''))}</td>`;
      for (let c = 2; c < 10; c++) {
        const cls = blueCols.has(c) ? 'sft-cell sft-hd sft-hd-blue' : 'sft-cell sft-hd';
        html += `<td class="${cls}">${escHtml(String(row[c]||''))}</td>`;
      }
      html += '</tr>';
    } else {
      html += '<tr>';
      const txtCls = isSat ? ' sft-sat-txt' : isSun ? ' sft-sun-txt' : '';
      // 日付
      html += `<td class="sft-cell sft-dt ${rowCls}${txtCls}" style="font-size:14px">${escHtml(String(row[0]||''))}</td>`;
      // 曜日
      html += `<td class="sft-cell sft-dt ${rowCls}${txtCls}" style="font-size:13px">${escHtml(youbi)}</td>`;
      // スタッフ列
      for (let c = 2; c < 10; c++) {
        const val = String(row[c] !== undefined ? row[c] : '');
        const cls = rowCls ? `sft-cell ${rowCls}` : blueCols.has(c) ? 'sft-cell sft-blue' : 'sft-cell';
        html += `<td class="${cls}">${escHtml(val)}</td>`;
      }
      html += '</tr>';
    }
  });

  html += '</table>';
  content.innerHTML = `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">${tabs}</div><div style="overflow-x:auto">${html}</div>`;
}

// ============================================================
// トップページ（カレンダー＋シフト）
// ============================================================
function renderTopPage() {
  const calContainer = document.getElementById('top-calendar');
  if (!calContainer) return;

  const now = new Date();
  const base = new Date(now.getFullYear(), now.getMonth() + calOffset, 1);
  const year = base.getFullYear();
  const month = base.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const dateMap = {};
  const pushEntry = (key, proj, vehicle, category, span, sortKey) => {
    if (!dateMap[key]) dateMap[key] = [];
    let existing = dateMap[key].find(e => e.proj === proj);
    if (!existing) {
      existing = { proj, vehicle: vehicle || '', cats: new Set(), span: span || 'single', sortKey: sortKey || 0 };
      dateMap[key].push(existing);
    } else if (span) {
      existing.span = span;
    }
    if (category) existing.cats.add(category);
  };
  const spanDays = (dOut, dRet, proj, vehicle, category) => {
    const start = new Date(dOut.getFullYear(), dOut.getMonth(), dOut.getDate());
    const end = dRet ? new Date(dRet.getFullYear(), dRet.getMonth(), dRet.getDate()) : start;
    if (end < start) return spanDays(dOut, null, proj, vehicle, category);
    const sortKey = start.getTime();
    let first = true;
    for (let cur = new Date(start); cur <= end; cur.setDate(cur.getDate()+1)) {
      const isLast = (cur.getTime() === end.getTime());
      const span = (first && isLast) ? 'single' : (first ? 'start' : (isLast ? 'end' : 'mid'));
      const key = cur.getFullYear() + '-' + (cur.getMonth()+1) + '-' + cur.getDate();
      pushEntry(key, proj, vehicle, category, span, sortKey);
      first = false;
    }
  };
  outItems.forEach(o => {
    const dOut = parseDate(o.dateOut || o.date);
    if (!dOut) return;
    const dRet = parseDate(o.returnDate || o.dateReturn) || dOut;
    spanDays(dOut, dRet, o.project || '（案件名未入力）', o.vehicle || '', o.category || '');
  });
  (reservations || []).forEach(r => {
    if (!r.project) return;
    const dOut = parseDate(r.dateOut);
    if (!dOut) return;
    const dRet = parseDate(r.dateReturn) || dOut;
    spanDays(dOut, dRet, r.project, r.vehicle || '', r.category || '');
  });
  Object.values(dateMap).forEach(arr => arr.sort((a, b) => (a.sortKey||0) - (b.sortKey||0)));

  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const dayNames = ['日','月','火','水','木','金','土'];
  let calCells = '';
  dayNames.forEach(d => { calCells += `<div class="cal-head">${d}</div>`; });
  // 日曜始まりカレンダー：firstDay(0=日..6=土)ぶんの空セルを詰める
  for (let i = 0; i < firstDay; i++) calCells += `<div class="cal-cell empty"></div>`;
  const maxShow = 3;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = year + '-' + (month+1) + '-' + d;
    const events = dateMap[key] || [];
    const dowIdx = new Date(year, month, d).getDay();
    const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    const _dk = year + String(month+1).padStart(2,'0') + String(d).padStart(2,'0');
    const eventDots = events.slice(0, maxShow).map(function(ev) {
      const proj = ev.proj;
      const isPersonOnly = ev.cats && ev.cats.size > 0 && [...ev.cats].every(c => c === '人員のみ');
      const rawLabel = proj.length > 10 ? proj.slice(0,10)+'…' : proj;
      const showLabel = (ev.span !== 'mid');
      const label = showLabel ? (isPersonOnly ? '👤 ' + rawLabel : rawLabel) : '';
      const spanClass = ev.span ? 'cal-span-' + ev.span : '';
      const vc = vehicleClass(ev.vehicle);
      const vs = vehicleChipStyle(ev.vehicle);
      return '<div class="cal-event ' + vc + ' ' + spanClass + '" data-project="' + proj.replace(/"/g,'&quot;') + '" data-datekey="' + _dk + '" onclick="showProjectDetail(this.dataset.project,this.dataset.datekey,event)" style="cursor:pointer;' + vs + '" title="' + proj.replace(/"/g,'&quot;') + '">' + label + '</div>';
    }).join('');
    const overflow = events.length > maxShow
      ? `<div class="cal-more" onclick="openCalDayModal('${_dk}',event)">+${events.length - maxShow}件</div>` : '';
    const isHol = isJpHoliday(year, month+1, d);
    const dowCls = (isHol || dowIdx === 0) ? ' sun' : (dowIdx === 6 ? ' sat' : '');
    calCells += `<div class="cal-cell${isToday?' today':''}${events.length?' has-event':''}${dowCls}${isHol?' holiday':''}"><span class="cal-day"><span class="cal-day-num">${d}</span></span><div class="cal-events">${eventDots}${overflow}</div></div>`;
  }

  calContainer.innerHTML = `
    <div class="dash-card">
      <div class="dash-card-head" style="justify-content:space-between">
        <div style="display:flex;align-items:center;gap:8px">
          <i class="ti ti-calendar"></i>
          <span>${year}年${monthNames[month]}</span>
        </div>
        <div style="display:flex;gap:4px">
          <button class="btn" style="padding:4px 8px" onclick="changeCalMonth(-1)"><i class="ti ti-chevron-left"></i></button>
          ${calOffset !== 0 ? `<button class="btn" style="padding:4px 8px;font-size:11px" onclick="calOffset=0;renderTopPage()">今月</button>` : ''}
          <button class="btn" style="padding:4px 8px" onclick="changeCalMonth(1)"><i class="ti ti-chevron-right"></i></button>
        </div>
      </div>
      <div class="cal-grid">${calCells}</div>
      <div class="cal-legend">
        <span class="cal-event veh-caravan">キャラバン</span>
        <span class="cal-event veh-truck">トラック</span>
        <span class="cal-event veh-rental">レンタカー</span>
        <span class="cal-event veh-other">その他</span>
        <span class="cal-event" style="background:linear-gradient(90deg,#dbeafe 0% 50%,#fef3c7 50% 100%);color:#1e40af">複数車両</span>
      </div>
    </div>
  `;

  // 本日から1週間の予定を右カラムに表示（本日時点でアクティブ or 開始が本日〜7日後の案件）
  const upcomingEl = document.getElementById('upcoming-content');
  if (upcomingEl) {
    const today = new Date(); today.setHours(0,0,0,0);
    const weekEnd = new Date(today); weekEnd.setDate(weekEnd.getDate() + 7);
    const dayNames = ['日','月','火','水','木','金','土'];
    const dayOnly = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diffDays = (a, b) => Math.round((dayOnly(a) - dayOnly(b)) / 86400000);
    const fmtMd = d => `${d.getMonth()+1}/${d.getDate()}`;
    const fmtMdWd = d => `${d.getMonth()+1}/${d.getDate()}（${dayNames[d.getDay()]}）`;

    // 案件ごとに集約
    const projMap = {};
    const addProj = (project, dateOut, dateReturn, staff, vehicle, type) => {
      if (!project) return;
      const dOut = parseDate(dateOut);
      if (!dOut) return;
      const dRet = parseDate(dateReturn) || dOut;
      const startInRange = (dOut >= today && dOut <= weekEnd);
      const activeNow    = (dOut < today && dRet >= today);
      if (!startInRange && !activeNow) return;
      const key = project + '|' + dateKeyOf(dateOut);
      if (!projMap[key]) {
        projMap[key] = { dOut, dRet, project, staff: staff || '', vehicle: vehicle || '', type, dateKey: dateKeyOf(dateOut) };
      }
    };
    (reservations || []).forEach(r => addProj(r.project, r.dateOut, r.dateReturn, r.staff, r.vehicle, 'reserve'));
    (outItems || []).forEach(o => addProj(o.project, o.dateOut, o.returnDate || o.dateReturn, o.staff, o.vehicle, 'out'));

    const rows = Object.values(projMap).sort((a,b) => a.dOut - b.dOut);
    if (rows.length === 0) {
      upcomingEl.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text2);font-size:13px">本日から1週間の予定はありません</div>';
    } else {
      upcomingEl.innerHTML = rows.map(r => {
        const totalDays = diffDays(r.dRet, r.dOut) + 1;
        const isMultiDay = totalDays > 1;
        // 日付範囲
        const dateRange = isMultiDay
          ? `${fmtMdWd(r.dOut)}<span style="color:var(--text2);margin:0 4px">〜</span>${fmtMd(r.dRet)}（${dayNames[r.dRet.getDay()]}）`
          : fmtMdWd(r.dOut);
        // ステータスバッジ
        const startDiff = diffDays(r.dOut, today);
        let statusText, statusBg, statusColor;
        if (startDiff < 0) {
          // 進行中：何日目/何日中
          const dayIdx = diffDays(today, r.dOut) + 1;
          statusText = `進行中 ${dayIdx}/${totalDays}日目`;
          statusBg = 'var(--warn-bg)'; statusColor = 'var(--warn-text)';
        } else if (startDiff === 0) {
          statusText = '今日'; statusBg = 'var(--primary)'; statusColor = '#fff';
        } else if (startDiff === 1) {
          statusText = '明日'; statusBg = 'var(--info-bg)'; statusColor = 'var(--info-text)';
        } else {
          statusText = `${startDiff}日後`; statusBg = 'var(--bg3)'; statusColor = 'var(--text2)';
        }
        // 車両カラーチップ
        const vc = vehicleClass(r.vehicle);
        const vs = vehicleChipStyle(r.vehicle);
        const vehBadge = r.vehicle
          ? `<span class="cal-event ${vc}" style="font-size:10px;padding:1px 6px;height:auto;line-height:1.2;${vs}">${escHtml(r.vehicle)}</span>`
          : '';
        return `
          <div class="upc-row" data-project="${escHtml(r.project)}" data-datekey="${r.dateKey||''}" onclick="showProjectDetail(this.dataset.project,this.dataset.datekey,event)">
            <div class="upc-left">
              <div class="upc-date">${dateRange}</div>
              <div class="upc-project">${escHtml(r.project)}</div>
              <div class="upc-meta">
                <span class="upc-status" style="background:${statusBg};color:${statusColor}">${statusText}</span>
                ${r.staff ? `<span class="upc-staff"><i class="ti ti-user"></i> ${escHtml(r.staff)}</span>` : ''}
                ${vehBadge}
              </div>
            </div>
            <i class="ti ti-chevron-right upc-chev"></i>
          </div>`;
      }).join('');
    }
  }
}

function fetchShortageLog() {
  if (!GAS_API_URL || GAS_API_URL === 'ここにGASのURLを貼り付け') return;
  const cbName = 'shortageCb_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    document.getElementById('jsonp_'+cbName)?.remove();
    if (json.shortage) {
      shortageData = json.shortage;
      if (currentTab === 'dashboard') renderDashboard();
    }
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=shortage_log&callback=' + cbName;
  document.body.appendChild(script);
}

function renderReservations() {
  const container = document.getElementById('reserve-container');
  if (!reservations.length) {
    container.innerHTML = '<div class="empty">予約中の機材はありません</div>';
    return;
  }
  const groups = {};
  reservations.forEach(r => {
    const proj = r.project || '（案件名未入力）';
    const dk = dateKeyOf(r.dateOut);
    const key = proj + '｜' + dk;  // 同名現場でも搬入日で分ける
    if (!groups[key]) groups[key] = { items: [], project: proj, dateKey: dk, staff: r.staff, dateOut: r.dateOut, dateReturn: r.dateReturn, vehicle: r.vehicle || '' };
    groups[key].items.push(r);
  });
  // 搬入日が早い順に並べる
  const sortedGroups = Object.values(groups).sort((a, b) => {
    const da = parseDate(a.dateOut); const db = parseDate(b.dateOut);
    const ta = da ? da.getTime() : Infinity;
    const tb = db ? db.getTime() : Infinity;
    return ta - tb;
  });
  container.innerHTML = sortedGroups.map(g => {
    const project = g.project;
    const _d = parseDate(g.dateOut);
    const _md = _d ? `（${_d.getMonth()+1}/${_d.getDate()}）` : '';
    const makeRow = r => {
      const mkLabel = (r.note === '[レンタル]' && r.maker) ? `<span style="font-size:10px;color:var(--info-text);margin-left:6px">（${escHtml(r.maker)}）</span>` : '';
      return `
      <div class="proj-item-row">
        <span class="proj-item-name">${escHtml(r.itemName || r.model || '')}${mkLabel}</span>
        <span class="proj-item-qty">${(r.qty|0) > 0 ? '×'+(r.qty|0) : ''}</span>
      </div>`;
    };
    const own    = g.items.filter(r => r.note !== '[レンタル]' && r.note !== '(在庫管理外)');
    const rental = g.items.filter(r => r.note === '[レンタル]');
    const free   = g.items.filter(r => r.note === '(在庫管理外)');
    const groupByCat = list => {
      let html = '', last = null;
      list.forEach(r => { const c = r.category || 'その他'; if (c !== last) { html += `<div class="pd-cat-head">${escHtml(c)}</div>`; last = c; } html += makeRow(r); });
      return html;
    };
    const rows = groupByCat(own) +
      (rental.length ? `<div class="pd-cat-head pd-cat-rental">レンタル品</div>` + rental.map(makeRow).join('') : '') +
      (free.length ? `<div class="pd-cat-head pd-cat-free">備考（フリー機材）</div>` + free.map(makeRow).join('') : '');
    return `
      <div class="proj-group">
        <div class="proj-group-head" onclick="toggleGroup(this)">
          <div class="proj-group-left">
            <i class="ti ti-chevron-down proj-chevron" style="transform:rotate(-90deg)"></i>
            <span class="proj-group-name">${escHtml(project)}${_md}${loanBadge(project)}</span>
            <span class="proj-group-meta">${escHtml(g.staff||'担当未入力')}</span>
            <span class="badge s-info" style="font-size:10px"><i class="ti ti-calendar"></i> 搬入 ${escHtml(g.dateOut)}</span>
            ${g.vehicle ? `<span class="badge" style="font-size:10px;background:var(--border);color:var(--text2)"><i class="ti ti-car"></i> ${escHtml(g.vehicle)}</span>` : ''}
          </div>
          <div class="proj-group-right">
            <span class="proj-count">${g.items.length}品目</span>
            <button class="act" style="font-size:11px" onclick="openEditReservation('${project.replace(/'/g,"\\'")}','${g.dateKey}',event)">
              <i class="ti ti-edit"></i> 編集
            </button>
            <button class="act" style="font-size:11px" onclick="downloadPickupList('${project.replace(/'/g,"\\'")}','${g.dateKey}',event)">
              <i class="ti ti-file-download"></i> DL
            </button>
            <button class="act" style="color:var(--danger-text)" onclick="cancelReservation('${project.replace(/'/g,"\\'")}','${g.dateKey}',event)">
              <i class="ti ti-x"></i> キャンセル
            </button>
          </div>
        </div>
        <div class="proj-group-body" style="display:none">${rows}</div>
      </div>`;
  }).join('');
}

// 予約タブから案件編集モーダルを開く（既存 openEditProject を pdProject/pdDateKey 経由で流用）
function openEditReservation(project, dateKey, e) {
  if (e) e.stopPropagation();
  pdProject = project;
  pdDateKey = dateKey;
  openEditProject();
}

function cancelReservation(project, dateKey, e) {
  if (e) e.stopPropagation();
  if (dateKey && typeof dateKey === 'object') { e = dateKey; dateKey = ''; }
  if (!confirm(`「${project}」の予約をキャンセルしますか？`)) return;
  reservations = reservations.filter(r => !((r.project || '（案件名未入力）') === project && (!dateKey || dateKeyOf(r.dateOut) === dateKey)));
  renderReservations();
  if (GAS_API_URL && GAS_API_URL !== 'ここにGASのURLを貼り付け') {
    const cbName = 'cancelCb_' + Date.now();
    window[cbName] = function(json) {
      delete window[cbName];
      document.getElementById('jsonp_'+cbName)?.remove();
      const n = (json && typeof json.deleted === 'number') ? json.deleted : null;
      if (n === 0) {
        alert(`⚠️ 「${project}」がスプレッドシート上に見つからず、キャンセル処理は0件でした。\n（既に持ち出し中に移行している可能性があります）`);
      } else if (n != null) {
        // 軽量トースト（右下に2秒）
        const t = document.createElement('div');
        t.style.cssText = 'position:fixed;right:16px;bottom:90px;background:#16a34a;color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:200';
        t.textContent = `✓ ${n}件キャンセルしました`;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2200);
      }
      // GAS の deleteRow が反映するまで300ms待ってから再取得（ラグ対策）
      setTimeout(() => fetchFromSpreadsheet(), 300);
    };
    const script = document.createElement('script');
    script.id = 'jsonp_' + cbName;
    script.src = GAS_API_URL + '?action=cancel_reservation&project=' + encodeURIComponent(project) + (dateKey ? '&dateKey=' + dateKey : '') + '&callback=' + cbName;
    document.body.appendChild(script);
  }
}

function fetchReservations() {
  if (!GAS_API_URL || GAS_API_URL === 'ここにGASのURLを貼り付け') return;
  const cbName = 'resCb_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    document.getElementById('jsonp_'+cbName)?.remove();
    if (json.reservations) {
      reservations = json.reservations;
      if (currentTab === 'reserve') renderReservations();
    }
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=reservations&callback=' + cbName;
  document.body.appendChild(script);
}

function reloadData() {
  const btn = document.getElementById('reload-btn');
  if (btn) { btn.disabled = true; btn.querySelector('i').classList.add('spin-icon'); }
  showLoading(true);
  fetchFromSpreadsheet();
  setTimeout(() => {
    if (btn) { btn.disabled = false; btn.querySelector('i').classList.remove('spin-icon'); }
  }, 1500);
}

// 起動時
showLoading(true);
fetchFromSpreadsheet();
fetchReservations();
fetchShortageLog();
// 5分ごとに自動更新
setInterval(fetchFromSpreadsheet, 300000);
setInterval(checkAutoReturn, 60000);


// Service Worker 登録＋自動更新チェック
if ('serviceWorker' in navigator) {
  let _swReloading = false;
  // 新SWが制御を握ったら一度だけリロード（最新アプリに切替）
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (_swReloading) return;
    _swReloading = true;
    location.reload();
  });
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', { updateViaCache: 'none' });
      const checkUpdate = () => { reg.update().catch(() => {}); };
      // アプリを前面に戻した時＋1分ごとに更新チェック（インストール済みPWAでも最新を検知）
      document.addEventListener('visibilitychange', () => { if (!document.hidden) checkUpdate(); });
      setInterval(checkUpdate, 60 * 1000);
      // 既に待機中の新SWがあればバナー表示
      if (reg.waiting && navigator.serviceWorker.controller) showUpdateBanner(reg.waiting);
      // 新SW検知→インストール完了でバナー
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdateBanner(nw);
        });
      });
    } catch (err) { console.warn('SW registration failed:', err); }
  });
}
function showUpdateBanner(worker) {
  // 自動更新方式に変更：新SWはinstallで即skipWaiting→activate→controllerchangeで自動リロードするため
  // バナーは表示しない（待機状態が残らずループしない）。互換のため関数自体は残す。
  window._pendingSW = worker;
}
function applyUpdate() {
  const w = window._pendingSW;
  if (w) w.postMessage({ type: 'SKIP_WAITING' }); // 新SWを有効化→controllerchange→自動リロード
  setTimeout(() => location.reload(), 1500);       // 念のためのフォールバック
}
// 版番号を画面に表示（フッターはこの<script>より後に解析されるためDOM構築後にセット）
function _setAppVersion(){ const v = document.getElementById('app-version'); if (v) v.textContent = APP_VERSION; }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _setAppVersion); else _setAppVersion();

// 在庫を持ち出し中レコードから再計算（ズレの手動訂正）
function resyncStock() {
  if (!confirm('持ち出し中の記録をもとに在庫数を再計算します。よろしいですか？')) return;
  const btn = document.getElementById('resync-btn');
  if (btn) { btn.disabled = true; }
  const cb = 'resyncCb_' + Date.now();
  window[cb] = function(json) {
    delete window[cb];
    const s = document.getElementById('jsonp_' + cb); if (s) s.remove();
    if (btn) btn.disabled = false;
    if (json && json.status === 'ok') {
      alert(`在庫を再計算しました（${json.fixed}件を修正）`);
      reloadData();
    } else {
      alert('再計算に失敗しました: ' + ((json && json.message) || '不明なエラー'));
    }
  };
  const s = document.createElement('script');
  s.id = 'jsonp_' + cb;
  s.src = GAS_API_URL + '?action=debug_resync_master&callback=' + cb;
  s.onerror = function() { delete window[cb]; s.remove(); if (btn) btn.disabled = false; alert('接続エラー'); };
  document.body.appendChild(s);
}
