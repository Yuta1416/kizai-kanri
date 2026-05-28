const SC = {
  'IN':       { cls:'s-in',     icon:'ti-circle-check' },
  'PARTIAL':  { cls:'s-partial',icon:'ti-circle-half' },
  'OUT':      { cls:'s-out',    icon:'ti-circle-x' },
  '修理中':   { cls:'s-repair', icon:'ti-tool' },
  'レンタル中':{ cls:'s-rental', icon:'ti-building-store' },
  '長期不在': { cls:'s-absent', icon:'ti-clock-off' },
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
  ['SPスタンド','K&M','21450(SXスタンド)',6,''],
  ['SPスタンド','K&M','21302',2,''],
  ['SPスタンド','K&M','21339(ディスタンスロッド)',4,''],
  ['SPスタンド','ULTIMATE','TS-80S',17,''],
  ['SP付属品','EV','フライング',12,''],['SP付属品','EV','スイング',10,''],
  ['SP付属品','EV','F200コロガシ',8,''],
  ['SP付属品','BOSE','GMA-3',10,''],['SP付属品','BOSE','GMK-4',5,''],
  ['POWRACK','CODA','RC20',2,''],['POWRACK','CODA','LINUS14D',2,''],
  ['POWAMP','QSC','PL230',3,''],['POWAMP','QSC','PL224',2,''],
  ['POWAMP','QSC','PLD4.2',6,''],['POWAMP','LAB.GRUPPEN','PLM10000Q',1,''],
  ['POWAMP','Powersoft','T604',2,''],['POWAMP','Powersoft','T904',2,''],
  ['POWAMP','Powersoft','fP2400Q',2,''],
  ['POWAMP','BEHRINGER','NX4',2,''],['POWAMP','AMCRON','IT4000',2,''],
  ['Mixer','YAMAHA','DM7＋DM7CTL',1,''],['Mixer','YAMAHA','DM7 Compact',1,''],
  ['Mixer','YAMAHA','DM3',2,''],['Mixer','YAMAHA','M7CL-32',1,''],
  ['Mixer','YAMAHA','TF-3',1,''],['Mixer','YAMAHA','TF-1',2,''],
  ['Mixer','YAMAHA','MG16',2,''],['Mixer','YAMAHA','MG10',2,''],
  ['Mixer','YAMAHA','MG06',6,''],
  ['STAGERACK','YAMAHA','Rio3224-D2 RACK',1,''],
  ['STAGERACK','YAMAHA','Rio1608-D2 RACK',1,''],
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
  ['WL','SHURE','UR4D MW RACK',1,'B帯'],
  ['WL','SHURE','ULXD4Q Z16',1,'1.2G帯'],['WL','SHURE','ULXD2 Z16',4,'1.2G帯'],
  ['WL','SHURE','UA845UWB',2,'分配器'],
  ['WL','SHURE','UA874WB セット',2,'アンテナ'],['WL','SHURE','UA874Z16',2,'アンテナ'],
  ['WL','Belden','同軸20m',4,''],['WL','Belden','同軸10m',2,''],
  ['WL','TOMOKA','BNC-JJ',7,'同軸ジョイント'],
  ['Microphone','SHURE','SM58',32,''],['Microphone','SHURE','SM58S',20,''],
  ['Microphone','SHURE','SM57',8,''],['Microphone','SHURE','SM86',3,''],
  ['Microphone','SHURE','BETA57',4,''],['Microphone','SHURE','565SD',1,''],
  ['Microphone','SHURE','BETA91A',1,''],['Microphone','SHURE','BETA52A',1,''],
  ['Microphone','SHURE','SM35',6,''],
  ['Microphone','SENNHEISER','MD421',6,''],['Microphone','SENNHEISER','e904',4,''],
  ['Microphone','AKG','C414',2,''],['Microphone','AKG','C451',5,''],
  ['Microphone','DPA','d-fine',2,''],['Microphone','DPA','4088',4,''],
  ['Microphone','DPA','4080',6,''],['Microphone','audio-technica','AT857QMLa',2,''],
  ['ウインドスクリーン','SHURE','SM58用',16,''],
  ['ウインドスクリーン','SHURE','SM57用',9,''],
  ['ウインドスクリーン','SHURE','C451用',5,''],
  ['DI','BOSS','DI-1',8,''],['DI','COUNTRYMAN','TYPE85',3,''],
  ['DI','Radial','J48',2,''],['DI','Radial','J48s',2,''],
  ['Isolator','Radial','ISO',2,''],
  ['MICスタンド','K&M','ST210',38,''],['MICスタンド','K&M','ST259',15,''],
  ['MICスタンド','K&M','小物置き',2,''],
  ['MICスタンド','Panasonic','WN-FS140',3,''],['MICスタンド','Pearl','小物置き',2,''],
  ['卓上スタンド','高砂','MS20',5,''],
  ['卓上スタンド','K&M','23220 円形ベース',10,''],
  ['卓上スタンド','TOMOCA','DS40K',10,''],
  ['カフBOX','TOMOCA','TCC100',4,''],['カフBOX','TOMOCA','TCC60',4,''],
  ['マルチケーブル','CANARE','32P-50m',1,''],['マルチケーブル','CANARE','32P-BOX',2,''],
  ['マルチケーブル','CANARE','16P-50m',2,''],['マルチケーブル','CANARE','16P-30m',2,''],
  ['マルチケーブル','CANARE','16P-10m',2,''],['マルチケーブル','CANARE','16P-BOX',10,''],
  ['マルチケーブル','CANARE','12P-50m',1,''],['マルチケーブル','CANARE','12P-BOX',2,''],
  ['マルチケーブル','CANARE','8P-10m',1,''],
  ['マルチケーブル','CANARE','16ch-先バラ12C',2,''],
  ['マルチケーブル','CANARE','16ch-先バラ11C',2,''],
  ['Clear-Com','Clear-Com','MS702（親機）',1,''],
  ['Clear-Com','Clear-Com','PS20（親機）',2,''],
  ['Clear-Com','Clear-Com','RS701（ベルトパック）',5,''],
  ['Clear-Com','Clear-Com','RS601（ベルトパック）',1,''],
  ['Clear-Com','Clear-Com','RS501（ベルトパック）',7,''],
  ['Clear-Com','Clear-Com','CC-100（ヘッドセット）',13,''],
  ['Clear-Com','Clear-Com','KB-111A（ステーション）',2,''],
  ['Clear-Com','Clear-Com','KB-702（盤）',3,''],
  ['インカム','Hollyland','Solidcom C1 Pro HUB',2,''],
  ['トランシーバー','アイコム','IC-DRP7S PLUS',6,''],
  ['トランシーバー','アイコム','HM 163A',6,''],
  ['トランシーバー','アイコム','充電器',6,''],
  ['トランシーバー','アルインコ','DJ-P221',6,''],
  ['タブレット','Apple','IPAD セット',3,''],
  ['機器','—','ルーター',3,''],
  ['機器','SONY','MDR-CD900（ヘッドホン）',4,''],
  ['機器','ENCORE Light','C3S30B（手元明かり）',6,''],
  ['機器','BEHRINGER','UCA222（USB IF）',9,''],
  ['機器','—','スライダック 2kw',2,''],
  ['機器','Panasonic','eneloop 16本セット',4,'充電池'],
  ['養生','—','シルバー 2K-3K',13,''],
  ['養生','—','透明シート',16,''],['養生','—','黒げんたん',12,''],
  ['ラッシングベルト','—','ロング オレンジ',2,''],
  ['ラッシングベルト','—','ロング 緑',2,''],
  ['ラッシングベルト','—','ショート 黒',2,''],
  ['ラッシングベルト','—','ショート 白',4,''],
  ['ラッシングベルト','—','ショート 緑',2,''],
  ['マット','—','ゴムマット',13,''],
  ['マット','—','絨毯マット 四角',15,''],
  ['マット','—','絨毯マット 縦長',19,''],
  ['台車','—','大',12,''],['台車','—','小',10,''],
  ['台車','—','手押し',1,''],['台車','—','天使のかご台車',1,''],
  ['脚立','—','10尺',2,''],['脚立','—','7尺',1,''],
  ['脚立','—','6尺',1,''],['脚立','—','5尺',1,''],
  ['単管','—','4m',4,''],['単管','—','3m',1,''],
  ['その他資材','—','ショットバック 5kg',23,''],
  ['その他資材','—','マイク置き スポンジ',17,''],
  ['その他資材','—','黒布',15,''],['その他資材','—','シルバースポンジ',4,''],
  ['その他資材','モノタロウ','作業明かり M8108-K',6,''],
  ['その他資材','—','赤コーン',18,''],['その他資材','—','紅白ポール',5,''],
  ['その他資材','—','黄黒ポール',8,''],
  ['その他資材','—','扇風機',2,''],['その他資材','—','サーキュレーター',3,''],
  ['その他資材','—','ヘルメット',13,''],['その他資材','—','安全帯',4,''],
  ['その他資材','—','ロープ',1,''],['その他資材','—','レバブル',4,''],
  ['その他資材','—','チェーンモーター',4,''],['その他資材','—','スロープ',1,''],
  ['SPケーブル','—','NL4 40m',4,''],['SPケーブル','—','NL4 20m',9,''],
  ['SPケーブル','—','NL4 10m',19,''],['SPケーブル','—','NL4 5m',9,''],
  ['SPケーブル','—','NL4 Yパラ',10,''],['SPケーブル','—','NL4 M-M',12,''],
  ['SPケーブル','—','NL4-11c',17,''],['SPケーブル','—','NL4-12c',6,''],
  ['SPケーブル','—','XLR 15m',21,''],['SPケーブル','—','XLR 10m',18,''],
  ['SPケーブル','—','XLR 3m',17,''],['SPケーブル','—','バラ-11C',8,''],
  ['SPケーブル','—','SBNL18444',4,'ブレイクアウトBOX'],
  ['SPケーブル','—','SBNL18442',4,'ブレイクアウトBOX'],
  ['SPケーブル','—','マルチ4P 40m',1,''],['SPケーブル','—','マルチ3P 30m',1,''],
  ['SPケーブル','—','マルチ3P 15m',4,''],['SPケーブル','—','マルチNL8 20m',1,''],
  ['SPケーブル','—','マルチNL8 40m',2,''],
  ['MICケーブル','—','ソロ 20m',21,''],['MICケーブル','—','ソロ 10m',65,''],
  ['MICケーブル','—','ソロ 5m',28,''],
  ['MICケーブル','—','マルチ4P 30m',3,''],['MICケーブル','—','マルチ4P 20m',3,''],
  ['MICケーブル','—','マルチ4P 10m',3,''],
  ['変換ケーブル','—','マルチ4P 11C-12C',20,''],
  ['変換ケーブル','—','ソロ 11C-12C',75,''],['変換ケーブル','—','ソロ 11C-11C',34,''],
  ['変換ケーブル','—','ソロ 12C-12C',36,''],['変換ケーブル','—','ソロ 2P-11C',18,''],
  ['変換ケーブル','—','ソロ 2P-12C',14,''],['変換ケーブル','—','ソロ RCA-12C',26,''],
  ['変換ケーブル','—','ソロ 2P-2P',11,''],['変換ケーブル','—','ソロ 3P-12C',6,''],
  ['変換ケーブル','—','Yパラ 11C<12C',4,''],['変換ケーブル','—','Yパラ 12C<11C',2,''],
  ['変換ケーブル','—','Yパラ 11C<RCA',4,''],['変換ケーブル','—','Yパラ 12C<RCA',4,''],
  ['電源ケーブル','—','三相四線',1,''],['電源ケーブル','—','単相三線',1,''],
  ['電源ケーブル','—','三相四線BOX',1,''],
  ['電源ケーブル','—','C型 2P 20m',1,''],['電源ケーブル','—','C型 20m',4,''],
  ['電源ケーブル','—','ソロ 10m',2,''],['電源ケーブル','—','C-H',6,''],
  ['電源ケーブル','—','H-C',5,''],
  ['電源ケーブル','—','H型ソロ 20m',15,''],['電源ケーブル','—','H型ソロ 10m',15,''],
  ['電源ケーブル','—','H型ソロ 3m',27,''],['電源ケーブル','—','電ドラ',2,''],
];

let inv = RAW.map(c => ({ cat:c[0], maker:c[1], model:c[2], total:c[3], out:0, special:0, status:'IN', note:c[4]||'' }));
let outItems = [], history = [];
let coIdx = -1, retIdx = -1, spIdx = -1, noteIdx = -1;

function calcSt(item) {
  if (['修理中','レンタル中','長期不在'].includes(item.status) && item.special > 0) return item.status;
  const a = item.total - item.out - item.special;
  if (item.out === 0 && item.special === 0) return 'IN';
  if (a <= 0) return 'OUT';
  return 'PARTIAL';
}
function avail(item) { return Math.max(0, item.total - item.out - item.special); }

function renderStats() {
  const t = inv.length;
  const inC  = inv.filter(i => calcSt(i) === 'IN').length;
  const outC = inv.filter(i => ['OUT','PARTIAL'].includes(calcSt(i))).length;
  const repC = inv.filter(i => calcSt(i) === '修理中').length;
  const renC = inv.filter(i => calcSt(i) === 'レンタル中').length;
  const absC = inv.filter(i => calcSt(i) === '長期不在').length;
  document.getElementById('stats').innerHTML = `
    <div class="stat"><div class="stat-label">総品目数</div><div class="stat-val">${t}</div></div>
    <div class="stat"><div class="stat-label">在庫中（IN）</div><div class="stat-val" style="color:var(--success-text)">${inC}</div></div>
    <div class="stat"><div class="stat-label">持ち出し中</div><div class="stat-val" style="color:var(--danger-text)">${outC}</div></div>
    <div class="stat"><div class="stat-label">修理・レンタル</div><div class="stat-val" style="color:var(--purple-text)">${repC+renC}</div></div>
    <div class="stat"><div class="stat-label">長期不在</div><div class="stat-val" style="color:var(--gray-text)">${absC}</div></div>`;
}

function renderCats() {
  const sel = document.getElementById('catF'), cur = sel.value;
  const cats = [...new Set(inv.map(i => i.cat))].sort();
  sel.innerHTML = '<option value="">すべてのカテゴリ</option>' +
    cats.map(c => `<option value="${c}"${c===cur?' selected':''}>${c}</option>`).join('');
}

function badge(st) {
  const c = SC[st] || SC['IN'];
  return `<span class="badge ${c.cls}"><i class="ti ${c.icon}"></i>${st}</span>`;
}

function render() {
  renderStats();
  renderCats();
  // 現在表示中のタブだけ再描画
  const activeTab = document.querySelector('.tab.on');
  if (!activeTab) { renderTable(); return; }
  const tabText = activeTab.textContent.trim();
  if (tabText.startsWith('すべて'))           renderTable();
  else if (tabText.startsWith('持ち出し中'))   renderOut();
  else if (tabText.startsWith('修理'))         renderSpecial();
  else if (tabText.startsWith('履歴'))         renderHistory();
  else renderTable();
}


function renderOut() {
  const container = document.getElementById('out-container');
  if (!container) return; // タブが非表示の場合はスキップ
  if (!outItems.length) {
    container.innerHTML = `<div class="empty">持ち出し中の機材はありません</div>`;
    return;
  }

  // 案件名でグループ化
  const groups = {};
  outItems.forEach((o, i) => {
    const key = o.project || '（案件名未入力）';
    if (!groups[key]) groups[key] = { items:[], staff:o.staff, returnDate:o.returnDate, date:o.date };
    groups[key].items.push({ ...o, outIdx: i });
  });

  container.innerHTML = Object.entries(groups).map(([project, g]) => {
    const autoLabel = g.returnDate
      ? `<span class="badge s-info" style="font-size:10px"><i class="ti ti-clock"></i>自動 ${g.returnDate}</span>`
      : `<span class="badge s-absent" style="font-size:10px">手動返却</span>`;
    const itemRows = g.items.map(o => `
      <div class="proj-item-row">
        <span class="proj-item-name">${o.model}</span>
        <span class="proj-item-qty">×${o.qty}</span>
        <button class="act" style="padding:2px 7px;font-size:11px" onclick="openReturnFromOut(${o.outIdx})">
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
            <button class="act btn-bulk-return" onclick="bulkReturn('${project}', event)">
              <i class="ti ti-rotate"></i> 一括返却
            </button>
          </div>
        </div>
        <div class="proj-group-body">${itemRows}</div>
      </div>`;
  }).join('');
}

function toggleGroup(head) {
  const body = head.nextElementSibling;
  const chevron = head.querySelector('.proj-chevron');
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  chevron.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
}

function bulkReturn(project, e) {
  e.stopPropagation();
  if (!confirm(`「${project}」の機材を全て返却しますか？`)) return;
  const now = new Date().toLocaleString('ja-JP');
  const targets = outItems.filter(o => (o.project || '（案件名未入力）') === project);
  targets.forEach(o => {
    const item = inv[o.invIdx];
    item.out = Math.max(0, item.out - o.qty);
    history.push({ date:now, project:o.project, staff:o.staff, model:o.model, qty:o.qty, action:'一括返却', note:`案件:${project}` });
  });
  // 対象を一括削除
  for (let i = outItems.length - 1; i >= 0; i--) {
    if ((outItems[i].project || '（案件名未入力）') === project) outItems.splice(i, 1);
  }
  render();
}

function renderSpecial() {
  const tb = document.getElementById('tbl-special');
  if (!tb) return; // タブが非表示の場合はスキップ
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
  if (!container) return; // タブが非表示の場合はスキップ
  if (!history.length) {
    container.innerHTML = `<div class="empty">履歴がありません</div>`;
    return;
  }

  // 案件名でグループ化（日付降順）
  const groups = {};
  [...history].reverse().forEach(h => {
    const key = h.project || '（案件名未入力）';
    if (!groups[key]) groups[key] = { items:[], staff:h.staff, lastDate:h.date };
    groups[key].items.push(h);
  });

  container.innerHTML = Object.entries(groups).map(([project, g]) => {
    const itemRows = g.items.map(h => {
      const cls = h.action==='OUT'?'s-out':h.action==='自動返却'||h.action==='一括返却'?'s-info':'s-in';
      return `
        <div class="proj-item-row">
          <span style="font-size:11px;color:var(--text2);width:120px;flex-shrink:0">${h.date}</span>
          <span class="proj-item-name">${h.model}</span>
          <span class="proj-item-qty">×${h.qty}</span>
          <span class="badge ${cls}" style="font-size:10px">${h.action}</span>
          <span style="font-size:11px;color:var(--text2)">${h.note||''}</span>
        </div>`;
    }).join('');

    return `
      <div class="proj-group">
        <div class="proj-group-head" onclick="toggleGroup(this)">
          <div class="proj-group-left">
            <i class="ti ti-chevron-down proj-chevron"></i>
            <span class="proj-group-name">${project}</span>
            <span class="proj-group-meta">${g.staff||''}</span>
          </div>
          <div class="proj-group-right">
            <span class="proj-count">${g.items.length}件</span>
          </div>
        </div>
        <div class="proj-group-body">${itemRows}</div>
      </div>`;
  }).join('');
}

function switchTab(tab, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  ['all','out','special','history'].forEach(t => {
    document.getElementById('view-'+t).style.display = t===tab ? 'block' : 'none';
  });
  // タブに合わせて描画
  if (tab === 'all')     { renderStats(); renderCats(); renderTable(); }
  if (tab === 'out')     renderOut();
  if (tab === 'special') renderSpecial();
  if (tab === 'history') renderHistory();
}

function openCheckout(idx) {
  coIdx = idx; const item = inv[idx];
  document.getElementById('co-item').value = `${item.maker} ${item.model}`;
  document.getElementById('co-avail').textContent = avail(item);
  document.getElementById('co-qty').value = 1;
  document.getElementById('co-qty').max = avail(item);
  ['co-proj','co-staff','co-ret'].forEach(id => document.getElementById(id).value = '');
  openModal('modal-checkout');
}
function doCheckout() {
  const item = inv[coIdx], qty = parseInt(document.getElementById('co-qty').value)||0;
  const proj  = document.getElementById('co-proj').value;
  const staff = document.getElementById('co-staff').value;
  const ret   = document.getElementById('co-ret').value;
  if (qty < 1 || qty > avail(item)) { alert('数量が無効です'); return; }
  item.out += qty;
  const now = new Date().toLocaleString('ja-JP');
  outItems.push({ id:Date.now(), invIdx:coIdx, model:`${item.maker} ${item.model}`, qty, project:proj, staff, returnDate:ret, date:now });
  history.push({ date:now, project:proj, staff, model:`${item.maker} ${item.model}`, qty, action:'OUT', note:ret?`返却予定:${ret}`:'' });
  closeModal('modal-checkout'); render();
}

function openReturn(idx) {
  retIdx = idx; const item = inv[idx];
  document.getElementById('ret-item').value = `${item.maker} ${item.model}`;
  document.getElementById('ret-qty').value  = item.out;
  document.getElementById('ret-qty').max    = item.out;
  document.getElementById('ret-note').value = '';
  openModal('modal-return');
}
function openReturnFromOut(oi) {
  const o = outItems[oi]; retIdx = o.invIdx;
  document.getElementById('ret-item').value = o.model;
  document.getElementById('ret-qty').value  = o.qty;
  document.getElementById('ret-qty').max    = o.qty;
  document.getElementById('ret-note').value = '';
  openModal('modal-return');
}
function doReturn() {
  const item = inv[retIdx], qty = parseInt(document.getElementById('ret-qty').value)||0;
  const note = document.getElementById('ret-note').value;
  if (qty < 1 || qty > item.out) { alert('数量が無効です'); return; }
  item.out = Math.max(0, item.out - qty);
  const now = new Date().toLocaleString('ja-JP');
  const oi = outItems.findLastIndex(o => o.invIdx === retIdx);
  if (oi >= 0) outItems.splice(oi, 1);
  history.push({ date:now, project:'', staff:'', model:`${item.maker} ${item.model}`, qty, action:'返却', note });
  closeModal('modal-return'); render();
}

function openSpecial(idx) {
  spIdx = idx; const item = inv[idx];
  document.getElementById('sp-item').value = `${item.maker} ${item.model}`;
  document.getElementById('sp-qty').value  = 1;
  document.getElementById('sp-qty').max    = avail(item);
  document.getElementById('sp-note').value = item.note || '';
  openModal('modal-special');
}
function doSpecial() {
  const item   = inv[spIdx];
  const status = document.getElementById('sp-status').value;
  const qty    = parseInt(document.getElementById('sp-qty').value)||0;
  const note   = document.getElementById('sp-note').value;
  if (qty < 1 || qty > avail(item)) { alert('数量が無効です'); return; }
  item.special += qty; item.status = status; item.note = note;
  const now = new Date().toLocaleString('ja-JP');
  history.push({ date:now, project:'', staff:'', model:`${item.maker} ${item.model}`, qty, action:status, note });
  closeModal('modal-special'); render();
}
function resolveSpecial(idx) {
  const item = inv[idx], now = new Date().toLocaleString('ja-JP');
  history.push({ date:now, project:'', staff:'', model:`${item.maker} ${item.model}`, qty:item.special, action:'復帰', note:item.note });
  item.special = 0; item.status = 'IN'; render();
}

function openNoteModal(idx) {
  noteIdx = idx; const item = inv[idx];
  document.getElementById('note-item').value = `${item.maker} ${item.model}`;
  document.getElementById('note-text').value = item.note || '';
  openModal('modal-note');
}
function doEditNote() {
  inv[noteIdx].note = document.getElementById('note-text').value;
  closeModal('modal-note'); render();
}

function doAdd() {
  const cat   = document.getElementById('add-cat').value.trim();
  const maker = document.getElementById('add-maker').value.trim();
  const model = document.getElementById('add-model').value.trim();
  const qty   = parseInt(document.getElementById('add-qty').value)||0;
  const note  = document.getElementById('add-note').value.trim();
  if (!model || qty < 1) { alert('型番と数量は必須です'); return; }
  inv.push({ cat:cat||'その他', maker:maker||'—', model, total:qty, out:0, special:0, status:'IN', note });
  closeModal('modal-add'); render();
}
function deleteItem(idx) {
  if (!confirm(`「${inv[idx].model}」を削除しますか？`)) return;
  inv.splice(idx, 1); render();
}

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open'); });
});

function exportCSV() {
  const rows = [['カテゴリ','メーカー','型番・品名','総在庫','残在庫','ステータス','備考']];
  inv.forEach(i => rows.push([i.cat, i.maker, i.model, i.total, avail(i), calcSt(i), i.note]));
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'}));
  a.download = '機材在庫.csv'; a.click();
}

// ============================================================
// Excel読み込み: 受注書_A4横フォーマット対応
// ============================================================
function handleFile(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const wb   = XLSX.read(ev.target.result, {type:'binary'});

      // シート名「受注書_A4横」を優先、なければ最初のシート
      const wsName = wb.SheetNames.includes('受注書_A4横')
        ? '受注書_A4横' : wb.SheetNames[0];
      const ws   = wb.Sheets[wsName];
      const rows = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});

      // --- ヘッダー情報を取得 ---
      // 行インデックスは0始まり（Excel行-1）
      const projectName = String(rows[2]?.[2] || '').trim();  // C3
      const staff       = String(rows[3]?.[14]|| '').trim();  // O4
      const dateOut     = String(rows[4]?.[2] || '').trim();  // C5
      const dateReturn  = String(rows[4]?.[8] || '').trim();  // I5

      // --- 7行目以降（index 6〜）の機材データを読み取る ---
      const equipmentList = [];
      for (let i = 6; i < rows.length; i++) {
        const row      = rows[i];
        const category = String(row[0] || '').trim();  // A列
        const itemName = String(row[4] || '').trim();  // E列: 機材名
        // K列(index10)とL列(index11)のマージセル → どちらかに値がある
        const qtyRaw   = row[10] !== '' ? row[10] : row[11];
        const qty      = parseInt(qtyRaw) || 0;
        const note     = String(row[12] || '').trim(); // M列: 備考

        // 数量が入っていて機材名がある行のみ処理
        if (!itemName || qty <= 0) continue;
        // セクションヘッダー行をスキップ（機材名がカテゴリ名と同じケース等）
        if (qty <= 0) continue;

        equipmentList.push({ category, itemName, qty, note });
      }

      if (equipmentList.length === 0) {
        alert('数量が入力された機材が見つかりませんでした。\nK〜L列に数量が入力されているか確認してください。');
        return;
      }

      // --- 在庫マスターに反映（持ち出し処理）---
      const now = new Date().toLocaleString('ja-JP');
      const notFound = [];
      let appliedCount = 0;

      equipmentList.forEach(eq => {
        // マスターから機材名で部分一致検索
        const masterIdx = inv.findIndex(item =>
          item.model.includes(eq.itemName) || eq.itemName.includes(item.model)
        );

        if (masterIdx === -1) {
          notFound.push(eq.itemName);
          return;
        }

        const item = inv[masterIdx];
        const av   = avail(item);
        const applyQty = Math.min(eq.qty, av); // 在庫を超えないように
        if (applyQty <= 0) {
          notFound.push(`${eq.itemName}（在庫不足）`);
          return;
        }

        item.out += applyQty;
        outItems.push({
          id: Date.now() + masterIdx,
          invIdx: masterIdx,
          model: `${item.maker} ${item.model}`,
          qty: applyQty,
          project: projectName || '（未入力）',
          staff:   staff       || '（未入力）',
          returnDate: dateReturn || '',
          date: now,
        });
        history.push({
          date: now,
          project: projectName || '（未入力）',
          staff:   staff       || '（未入力）',
          model:   `${item.maker} ${item.model}`,
          qty:     applyQty,
          action:  'OUT',
          note:    dateReturn ? `返却予定:${dateReturn}` : '',
        });
        appliedCount++;
      });

      render();

      // 結果メッセージ
      let msg = `✅ 受注書を読み込みました\n\n`;
      msg += `案件名: ${projectName || '（未入力）'}\n`;
      msg += `担当者: ${staff      || '（未入力）'}\n`;
      msg += `持出予定: ${dateOut  || '（未入力）'}\n`;
      msg += `返却予定: ${dateReturn|| '（未入力）'}\n\n`;
      msg += `反映した機材: ${appliedCount}件`;
      if (notFound.length > 0) {
        msg += `\n\n⚠️ マスターで見つからなかった機材:\n${notFound.join('\n')}`;
      }
      alert(msg);

    } catch(err) {
      alert('ファイルの読み込みに失敗しました。\nエラー: ' + err.message);
    }
  };
  reader.readAsBinaryString(file);
  e.target.value = '';
}

// ============================================================
// 自動返却チェック（1分ごと）
// ============================================================
function checkAutoReturn() {
  const now = new Date();
  outItems.forEach((o, i) => {
    if (!o.returnDate) return;
    const dt = new Date(o.returnDate);
    if (isNaN(dt) || now < dt) return;
    const item = inv[o.invIdx];
    item.out = Math.max(0, item.out - o.qty);
    history.push({
      date: now.toLocaleString('ja-JP'),
      project: o.project, staff: o.staff,
      model: o.model, qty: o.qty,
      action: '自動返却',
      note: `返却予定:${o.returnDate}`,
    });
    outItems.splice(i, 1);
    render();
  });
}
setInterval(checkAutoReturn, 60000);

render();

function renderTable() {
  renderStats(); renderCats();
  const srch = document.getElementById('srch').value.toLowerCase();
  const catF = document.getElementById('catF').value;
  const stF  = document.getElementById('stF').value;
  const filtered = inv.filter(item => {
    const st = calcSt(item);
    const m = !srch || [item.cat,item.maker,item.model,item.note].some(v => v.toLowerCase().includes(srch));
    return m && (!catF || item.cat === catF) && (!stF || st === stF);
  });
  const tb = document.getElementById('tbl-all');
  if (!tb) return;
  if (!filtered.length) { tb.innerHTML = `<tr><td colspan="8" class="empty">該当なし</td></tr>`; return; }
  tb.innerHTML = filtered.map(item => {
    const idx = inv.indexOf(item), st = calcSt(item), av = avail(item);
    const noteHtml = item.note
      ? `<span class="note-cell has" title="${item.note}"><i class="ti ti-notes"></i> ${item.note}</span>`
      : `<span class="note-cell">—</span>`;
    const canOut = av > 0 && !['修理中','レンタル中','長期不在'].includes(st);
    return `<tr>
      <td style="color:var(--text2);font-size:11px">${item.cat}</td>
      <td style="font-size:11px">${item.maker}</td>
      <td style="font-weight:700">${item.model}</td>
      <td style="text-align:center">${item.total}</td>
      <td style="text-align:center;font-weight:700;color:${av===0?'var(--danger-text)':'var(--text)'}">${av}</td>
      <td>${badge(st)}</td>
      <td>${noteHtml} <button class="act" style="padding:2px 5px;font-size:10px" onclick="openNoteModal(${idx})" aria-label="備考編集"><i class="ti ti-pencil"></i></button></td>
      <td>
        ${canOut?`<button class="act" onclick="openCheckout(${idx})" aria-label="持ち出し"><i class="ti ti-arrow-up-right"></i></button>`:''}
        ${item.out>0?`<button class="act" onclick="openReturn(${idx})" aria-label="返却"><i class="ti ti-arrow-down-left"></i></button>`:''}
        ${av>0?`<button class="act" onclick="openSpecial(${idx})" title="修理・レンタル・不在"><i class="ti ti-tool"></i></button>`:''}
        <button class="act d" onclick="deleteItem(${idx})" aria-label="削除"><i class="ti ti-trash"></i></button>
      </td></tr>`;
  }).join('');
}
