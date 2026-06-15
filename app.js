const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbzh_M5zjNeD9GXynBAXUlBhpc_EI011To1ytf6ta-7UDNuP5h3-YMVyflK5Vm_8NeUS/exec';

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
let currentTab = 'all';
let coIdx=-1, retIdx=-1, retOutIdx=-1, spIdx=-1, noteIdx=-1;

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
  document.getElementById('stats').innerHTML=`
    <div class="stat"><div class="stat-label">総品目数</div><div class="stat-val">${t}</div></div>
    <div class="stat"><div class="stat-label">在庫中（IN）</div><div class="stat-val" style="color:var(--success-text)">${inC}</div></div>
    <div class="stat"><div class="stat-label">持ち出し中</div><div class="stat-val" style="color:var(--danger-text)">${outC}</div></div>
    <div class="stat"><div class="stat-label">修理・レンタル</div><div class="stat-val" style="color:var(--purple-text)">${repC+renC}</div></div>
    <div class="stat"><div class="stat-label">長期不在</div><div class="stat-val" style="color:var(--gray-text)">${absC}</div></div>`;
}

let currentCat = '';

function renderCats() {
  const sidebar = document.getElementById('cat-sidebar');
  if (!sidebar) return;
  const cats = [...new Set(inv.map(i => i.cat))];
  const counts = {};
  cats.forEach(c => counts[c] = inv.filter(i => i.cat === c).length);
  sidebar.innerHTML =
    `<div class="cat-sidebar-item${currentCat===''?' on':''}" onclick="selectCat('')">すべて <span class="cat-sidebar-count">${inv.length}</span></div>` +
    cats.map(c => `<div class="cat-sidebar-item${currentCat===c?' on':''}" onclick="selectCat('${c}')">${c} <span class="cat-sidebar-count">${counts[c]}</span></div>`).join('');
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
    const key = o.project || '（案件名未入力）';
    if (!groups[key]) groups[key] = {items:[], staff:o.staff, returnDate:o.returnDate};
    groups[key].items.push({...o, outIdx:i});
  });
  container.innerHTML = Object.entries(groups).map(([project, g]) => {
    const autoLabel = g.returnDate
      ? `<span class="badge s-info" style="font-size:10px"><i class="ti ti-clock"></i> 自動 ${g.returnDate}</span>`
      : `<span class="badge s-absent" style="font-size:10px">手動返却</span>`;
    const itemRows = g.items.map(o => `
      <div class="proj-item-row">
        <span class="proj-item-name">${o.model}</span>
        <span class="proj-item-qty">×${o.qty}</span>
        <button class="act" style="padding:3px 8px;font-size:11px" onclick="openReturnFromOut(${o.outIdx})">
          <i class="ti ti-arrow-down-left"></i> 返却
        </button>
      </div>`).join('');
    return `
      <div class="proj-group">
        <div class="proj-group-head" onclick="toggleGroup(this)">
          <div class="proj-group-left">
            <i class="ti ti-chevron-down proj-chevron"></i>
            <span class="proj-group-name">${project}</span>
            <span class="proj-group-meta">${g.staff||'担当未入力'}</span>
            ${autoLabel}
          </div>
          <div class="proj-group-right">
            <span class="proj-count">${g.items.length}品目</span>
            <button class="act" onclick="downloadPickupList('${project}',event)" style="font-size:11px">
              <i class="ti ti-file-download"></i> DL
            </button>
            <button class="act btn-bulk-return" onclick="bulkReturn('${project}',event)">
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
  if (!history.length) {
    container.innerHTML = `<div class="empty">履歴がありません</div>`;
    return;
  }

  const q = (document.getElementById('hist-srch')?.value || '').toLowerCase();

  // 年月でグループ化
  const monthGroups = {};
  [...history].reverse().forEach(h => {
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

  container.innerHTML = Object.entries(monthGroups).map(([ym, projects]) => {
    const projectRows = Object.entries(projects).map(([project, g]) => {
      const itemRows = g.items.map(h => {
        const cls = h.action==='OUT'?'s-out':
          h.action==='自動返却'||h.action==='一括返却'?'s-info':
          h.action==='持ち出し中'?'s-out':'s-in';
        const actionLabel = h.action==='持ち出し中' ? 'OUT' : h.action;
        return `
          <div class="proj-item-row">
            <span style="font-size:11px;color:var(--text2);min-width:120px">${h.date}</span>
            <span class="proj-item-name">${h.model}</span>
            <span class="proj-item-qty">×${h.qty}</span>
            <span class="badge ${cls}" style="font-size:10px">${actionLabel}</span>
            <span style="font-size:11px;color:var(--text2)">${h.note||''}</span>
          </div>`;
      }).join('');
      return `
        <div class="proj-group" style="margin:6px 0 0 0">
          <div class="proj-group-head" onclick="toggleGroup(this)" style="background:var(--bg)">
            <div class="proj-group-left">
              <i class="ti ti-chevron-down proj-chevron"></i>
              <span class="proj-group-name" style="font-size:13px">${project}</span>
              <span class="proj-group-meta">${g.staff||''}</span>
            </div>
            <div class="proj-group-right">
              <span class="proj-count">${g.items.length}件</span>
            </div>
          </div>
          <div class="proj-group-body">${itemRows}</div>
        </div>`;
    }).join('');

    const totalItems = Object.values(projects).reduce((s,g)=>s+g.items.length,0);
    return `
      <div class="proj-group" style="margin-bottom:10px">
        <div class="proj-group-head" onclick="toggleGroup(this)">
          <div class="proj-group-left">
            <i class="ti ti-chevron-down proj-chevron"></i>
            <span class="proj-group-name"><i class="ti ti-calendar" style="font-size:14px;margin-right:4px"></i>${ym}</span>
          </div>
          <div class="proj-group-right">
            <span class="proj-count">${Object.keys(projects).length}案件 / ${totalItems}件</span>
          </div>
        </div>
        <div class="proj-group-body" style="padding:6px 8px">${projectRows}</div>
      </div>`;
  }).join('');
}

function switchTab(tab, el) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  ['all','inventory','out','special','reserve','history','dashboard'].forEach(t => {
    const v = document.getElementById('view-'+t);
    if (v) v.style.display = t===tab ? 'block' : 'none';
  });
  render();
  if (tab === 'dashboard') renderDashboard();
  if (tab === 'all') renderTopPage();
}

function toggleGroup(head) {
  const body = head.nextElementSibling;
  const chevron = head.querySelector('.proj-chevron');
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  chevron.style.transform = isOpen ? 'rotate(-90deg)' : '';
}

function bulkReturn(project, e) {
  e.stopPropagation();
  if (!confirm(`「${project}」の機材を全て返却しますか？`)) return;
  const now = new Date().toLocaleString('ja-JP');
  outItems.filter(o => (o.project||'（案件名未入力）') === project).forEach(o => {
    if (o.invIdx >= 0 && o.invIdx < inv.length) {
      inv[o.invIdx].out = Math.max(0, inv[o.invIdx].out - o.qty);
    }
    history.push({date:now, project:o.project, staff:o.staff, model:o.model, qty:o.qty, action:'一括返却', note:''});
  });
  for (let i = outItems.length-1; i >= 0; i--) {
    if ((outItems[i].project||'（案件名未入力）') === project) outItems.splice(i,1);
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
        localStorage.removeItem(CACHE_KEY);
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
    script2.src = GAS_API_URL + '?action=return&project=' + encodeURIComponent(project) + '&callback=' + cbName2;
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

function openAddModal() {
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
function syncCombo(selId, inputId) {
  const val=document.getElementById(selId).value;
  if(val) document.getElementById(inputId).value=val;
}
function doAdd() {
  const cat=document.getElementById('add-cat').value.trim();
  const maker=document.getElementById('add-maker').value.trim();
  const model=document.getElementById('add-model').value.trim();
  const qty=parseInt(document.getElementById('add-qty').value)||0;
  const note=document.getElementById('add-note').value.trim();
  if(!model||qty<1){alert('型番と数量は必須です');return;}

  // 同じ型番が既にあれば在庫数を増やす
  const existing = inv.find(i => i.model === model);
  if (existing) {
    if (!confirm(`「${model}」は既に登録済みです。\n在庫数を${existing.total}→${existing.total+qty}に増やしますか？`)) return;
    existing.total += qty;
    existing.status = existing.out >= existing.total ? 'OUT' : existing.out > 0 ? 'PARTIAL' : 'IN';
    closeModal('modal-add'); render();
    return;
  }

  inv.push({cat:cat||'その他',maker:maker||'—',model,total:qty,out:0,special:0,status:'IN',note});
  closeModal('modal-add'); render();
}
function deleteItem(idx) {
  if(!confirm(`「${inv[idx].model}」を削除しますか？`))return;
  inv.splice(idx,1); render();
}


function showProjectDetail(project, e) {
  e.stopPropagation();

  // 該当案件の機材を取得
  const projectItems = outItems.filter(o =>
    (o.project || '（案件名未入力）') === project
  );

  // 履歴からも取得（返却済み含む）
  const histItems = history.filter(h =>
    (h.project || '（案件名未入力）') === project
  );

  const items = projectItems.length > 0 ? projectItems : histItems;
  if (!items.length) return;

  const dateOut   = items[0].dateOut || items[0].date || '—';
  const dateRet   = items[0].returnDate || items[0].dateReturn || '—';
  const staff     = items[0].staff || '—';

  const itemRows = items.map(o =>
    `<div class="proj-item-row">
      <span class="proj-item-name">${o.model}</span>
      <span class="proj-item-qty">×${o.qty}</span>
    </div>`
  ).join('');

  const modal = document.getElementById('modal-project-detail');
  document.getElementById('pd-project').textContent = project;
  document.getElementById('pd-staff').textContent   = staff;
  document.getElementById('pd-dateout').textContent = dateOut;
  document.getElementById('pd-dateret').textContent = dateRet;
  document.getElementById('pd-items').innerHTML     = itemRows;
  modal.classList.add('open');
}

function showProjectDetail(project, ev) {
  if (ev) ev.stopPropagation();
  const projectItems = outItems.filter(function(o) {
    return (o.project || '（案件名未入力）') === project;
  });
  const histItems = history.filter(function(h) {
    return (h.project || '（案件名未入力）') === project;
  });
  const items = projectItems.length > 0 ? projectItems : histItems;
  if (!items.length) return;

  const dateOut = items[0].dateOut || items[0].date || '—';
  const dateRet = items[0].returnDate || items[0].dateReturn || '—';
  const staff   = items[0].staff || '—';

  const itemRows = items.map(function(o) {
    return '<div class="proj-item-row"><span class="proj-item-name">' + o.model + '</span><span class="proj-item-qty">×' + o.qty + '</span></div>';
  }).join('');

  document.getElementById('pd-project').textContent = project;
  document.getElementById('pd-staff').textContent   = staff;
  document.getElementById('pd-dateout').textContent = dateOut;
  document.getElementById('pd-dateret').textContent = dateRet;
  document.getElementById('pd-items').innerHTML     = itemRows;
  document.getElementById('modal-project-detail').classList.add('open');
}


function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
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

const CACHE_KEY = 'kizai_data_cache';
function saveCache(json) { try { localStorage.setItem(CACHE_KEY, JSON.stringify(json)); } catch(e) {} }
function loadCache()     { try { return JSON.parse(localStorage.getItem(CACHE_KEY)); } catch(e) { return null; } }

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
          returnDate: String(r.dateReturn || ''),
          date:       String(r.date       || ''),
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

  if (json.history && json.history.length > 0) {
    const gasHistory = json.history.map(function(h) {
      return {
        date:    h.date    || '',
        project: h.project || '',
        staff:   h.staff   || '',
        model:   h.model   || '',
        qty:     parseInt(h.qty) || 0,
        action:  h.action  || 'OUT',
        note:    h.note    || '',
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

  // キャッシュがあれば即表示してローディングを隠す
  const cached = loadCache();
  if (cached) {
    applyData(cached);
    render();
    if (currentTab === 'dashboard') renderDashboard();
    showLoading(false);
    document.getElementById('cache-banner').classList.add('show');
  }
  fetchShiftFile();

  const cbName = 'gasCallback_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    const el = document.getElementById('jsonp_' + cbName);
    if (el) el.remove();

    applyData(json);
    saveCache(json);

    render();
    if (currentTab === 'dashboard') renderDashboard();
    showLoading(false);
    document.getElementById('cache-banner').classList.remove('show');
  };

  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  script.src = GAS_API_URL + '?action=all&callback=' + cbName;
  script.onerror = function() {
    console.error('GAS接続エラー');
    delete window[cbName];
    script.remove();
    if (!cached) render();
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
  const addToMap = (dateStr, label, isRet) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d)) return;
      const key = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      if (!dateMap[key]) dateMap[key] = [];
      const entry = isRet ? '返却: ' + label : label;
      if (!dateMap[key].includes(entry)) dateMap[key].push(entry);
    } catch(e) {}
  };
  history.forEach(h => {
    if (!h.project) return;
    addToMap(h.date, h.project, false);
  });
  outItems.forEach(o => {
    if (!o.dateOut && !o.date) return;
    try {
      const d = new Date(o.date || o.dateOut);
      if (!isNaN(d)) {
        const key = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
        if (!dateMap[key]) dateMap[key] = [];
        const proj = o.project || '（案件名未入力）';
        // 同じ案件名は1回だけ追加
        if (!dateMap[key].includes(proj)) {
          dateMap[key].push(proj);
        }
      }
    } catch(e) {}
    // 返却予定日も表示
    if (o.returnDate) {
      try {
        const rd = new Date(o.returnDate);
        if (!isNaN(rd)) {
          const rkey = rd.getFullYear() + '-' + (rd.getMonth()+1) + '-' + rd.getDate();
          if (!dateMap[rkey]) dateMap[rkey] = [];
          const retLabel = '返却: ' + (o.project || '未入力');
          if (!dateMap[rkey].includes(retLabel)) {
            dateMap[rkey].push(retLabel);
          }
        }
      } catch(e) {}
    }
  });

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
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay-1); i++) {
    calCells += `<div class="cal-cell empty"></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key = year + '-' + (month+1) + '-' + d;
    const events = dateMap[key] || [];
    const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    const eventDots = events.slice(0,5).map(function(e) {
      const isRet = e.startsWith('返却');
      const proj = isRet ? e.replace('返却: ','') : e;
      const label = e.length > 8 ? e.slice(0,8)+'…' : e;
      return '<div class="cal-event' + (isRet?' ret':'') + '" data-project="' + proj.replace(/"/g,'&quot;') + '" onclick="showProjectDetail(this.dataset.project,event)" style="cursor:pointer">' + label + '</div>';
    }).join('');
    calCells += `<div class="cal-cell${isToday ? ' today' : ''}${events.length ? ' has-event' : ''}">
      <span class="cal-day">${d}</span>
      ${eventDots}
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

  container.innerHTML = `
    <div class="dash-card">
      <div class="dash-card-head">
        <i class="ti ti-chart-bar" aria-hidden="true"></i>
        <span>在庫不足 TOP${top10.length}</span>
      </div>
      <div class="rep-list">${reportRows}</div>
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

function downloadPickupList(project, event) {
  if (event) event.stopPropagation();
  const cbName = 'pickupCallback_' + Date.now();
  window[cbName] = function(json) {
    delete window[cbName];
    const el = document.getElementById('jsonp_' + cbName);
    if (el) el.remove();
    if (json.status !== 'ok') { alert('取得失敗: ' + (json.message || 'エラー')); return; }
    const bytes = Uint8Array.from(atob(json.data), c => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = json.filename || '持ち出しリスト.xlsx';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const script = document.createElement('script');
  script.id = 'jsonp_' + cbName;
  const projectParam = project ? '&project=' + encodeURIComponent(project) : '';
  script.src = GAS_API_URL + '?action=pickuplist&callback=' + cbName + projectParam;
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
  const tabs = wb.SheetNames.map((name, i) =>
    `<button onclick="renderShiftSheet(${i})" style="padding:4px 10px;font-size:11px;border:1px solid var(--border2);border-radius:4px;cursor:pointer;background:${i===idx?'var(--accent)':'var(--bg2)'};color:${i===idx?'#fff':'var(--text1)'}">${escHtml(name)}</button>`
  ).join('');
  const ws = wb.Sheets[wb.SheetNames[idx]];
  if (ws['!ref']) {
    const range = XLSX.utils.decode_range(ws['!ref']);
    range.e.c = Math.min(range.e.c, 9);  // J列(index 9)まで
    range.e.r = Math.min(range.e.r, 31); // 32行まで
    ws['!ref'] = XLSX.utils.encode_range(range);
  }
  const html = XLSX.utils.sheet_to_html(ws, {editable: false});
  content.innerHTML = `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">${tabs}</div><div class="shift-table-wrap">${html}</div>`;
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
  const addToMap = (dateStr, label, isRet) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d)) return;
      const key = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      if (!dateMap[key]) dateMap[key] = [];
      const entry = isRet ? '返却: ' + label : label;
      if (!dateMap[key].includes(entry)) dateMap[key].push(entry);
    } catch(e) {}
  };
  history.forEach(h => { if (h.project) addToMap(h.date, h.project, false); });
  outItems.forEach(o => {
    if (o.date || o.dateOut) {
      try {
        const d = new Date(o.date || o.dateOut);
        if (!isNaN(d)) {
          const key = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
          if (!dateMap[key]) dateMap[key] = [];
          const proj = o.project || '（案件名未入力）';
          if (!dateMap[key].includes(proj)) dateMap[key].push(proj);
        }
      } catch(e) {}
    }
    if (o.returnDate) {
      try {
        const rd = new Date(o.returnDate);
        if (!isNaN(rd)) {
          const rkey = rd.getFullYear() + '-' + (rd.getMonth()+1) + '-' + rd.getDate();
          if (!dateMap[rkey]) dateMap[rkey] = [];
          const retLabel = '返却: ' + (o.project || '未入力');
          if (!dateMap[rkey].includes(retLabel)) dateMap[rkey].push(retLabel);
        }
      } catch(e) {}
    }
  });

  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const dayNames = ['日','月','火','水','木','金','土'];
  let calCells = '';
  dayNames.forEach(d => { calCells += `<div class="cal-head">${d}</div>`; });
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay-1); i++) calCells += `<div class="cal-cell empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = year + '-' + (month+1) + '-' + d;
    const events = dateMap[key] || [];
    const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    const eventDots = events.slice(0,5).map(function(e) {
      const isRet = e.startsWith('返却');
      const proj = isRet ? e.replace('返却: ','') : e;
      const label = e.length > 8 ? e.slice(0,8)+'…' : e;
      return '<div class="cal-event' + (isRet?' ret':'') + '" data-project="' + proj.replace(/"/g,'&quot;') + '" onclick="showProjectDetail(this.dataset.project,event)" style="cursor:pointer">' + label + '</div>';
    }).join('');
    calCells += `<div class="cal-cell${isToday?' today':''}${events.length?' has-event':''}"><span class="cal-day">${d}</span>${eventDots}</div>`;
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
        <span class="cal-event">持ち出し</span>
        <span class="cal-event ret">返却予定</span>
      </div>
    </div>
  `;
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
    const key = r.project || '（案件名未入力）';
    if (!groups[key]) groups[key] = { items: [], staff: r.staff, dateOut: r.dateOut, dateReturn: r.dateReturn };
    groups[key].items.push(r);
  });
  container.innerHTML = Object.entries(groups).map(([project, g]) => {
    const rows = g.items.map(r => `
      <div class="proj-item-row">
        <span class="proj-item-name">${escHtml(r.model)}</span>
        <span class="proj-item-qty">×${r.qty}</span>
      </div>`).join('');
    return `
      <div class="proj-group">
        <div class="proj-group-head" onclick="toggleGroup(this)">
          <div class="proj-group-left">
            <i class="ti ti-chevron-down proj-chevron"></i>
            <span class="proj-group-name">${escHtml(project)}</span>
            <span class="proj-group-meta">${escHtml(g.staff||'担当未入力')}</span>
            <span class="badge s-info" style="font-size:10px"><i class="ti ti-calendar"></i> 搬入 ${escHtml(g.dateOut)}</span>
          </div>
          <div class="proj-group-right">
            <span class="proj-count">${g.items.length}品目</span>
            <button class="act" style="color:var(--danger-text)" onclick="cancelReservation('${project.replace(/'/g,"\\'")}',event)">
              <i class="ti ti-x"></i> キャンセル
            </button>
          </div>
        </div>
        <div class="proj-group-body">${rows}</div>
      </div>`;
  }).join('');
}

function cancelReservation(project, e) {
  e.stopPropagation();
  if (!confirm(`「${project}」の予約をキャンセルしますか？`)) return;
  reservations = reservations.filter(r => (r.project || '（案件名未入力）') !== project);
  renderReservations();
  if (GAS_API_URL && GAS_API_URL !== 'ここにGASのURLを貼り付け') {
    const cbName = 'cancelCb_' + Date.now();
    window[cbName] = function(json) { delete window[cbName]; document.getElementById('jsonp_'+cbName)?.remove(); };
    const script = document.createElement('script');
    script.id = 'jsonp_' + cbName;
    script.src = GAS_API_URL + '?action=cancel_reservation&project=' + encodeURIComponent(project) + '&callback=' + cbName;
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


// Service Worker 登録
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(err => console.warn('SW registration failed:', err));
  });
}
