/* ============ v2 prep.js — 準備タブ（リマインダー・ToDo・予約・知識・持ち物） ============ */
/* localStorage キーは現行アプリと互換: prep_todo_v1 / prep_book_v1 / prep_booknote_v1 / checklist_v1 */

var PREP_REMIND = [
  { date:'20260801', title:'ETA申請（豪州 電子渡航許可）', note:'AustralianETAアプリで申請。ICパスポート＋クレカ。約A$20。' },
  { date:'20260801', title:'パスポート残存確認＆JTBへ旅券情報を連絡', note:'残存6ヶ月以上を確認（出発時点）。' },
  { date:'20260801', title:'海外旅行保険を確認・加入', note:'クレカ付帯の有無と補償範囲もチェック。' },
  { date:'20260913', title:'MyJTBで最終日程表・eチケット・ホテル予約確認書を入手', note:'出発7日前目安。MyJTB／コンタクトボードから。' },
  { date:'20260913', title:'eSIM購入・設定', note:'日本で準備し、到着後に有効化。' },
  { date:'20260913', title:'クレカ2枚 海外利用ON＋少額AUD用意', note:'ブランド違いで。支払いは現地通貨(AUD)で（DCC回避）。' },
  { date:'20260913', title:'外務省たびレジ登録', note:'https://www.ezairyu.mofa.go.jp/tabireg/' },
  { date:'20260918', title:'荷造り・持ち物最終チェック', note:'変換プラグ(Type I)・防水上着・常用薬を忘れずに。' },
  { date:'20260919', title:'JALオンラインチェックイン＋目覚まし・空港交通の確認', note:'出発24時間前から可能。' },
  { date:'20260920', title:'【出発当日】パスポート/ETA/予約確認・検疫申告(食品YES)を再確認', note:'NRT 18:40発（JL773）。' }
];

var PREP_TODO = [
  { grp:'2〜3ヶ月前', text:'パスポートの残存期間を確認（入国時に有効。推奨：滞在＋6ヶ月）' },
  { grp:'2〜3ヶ月前', text:'航空券・ホテル・現地ツアーの予約を確定' },
  { grp:'2〜3ヶ月前', text:'人気店の混雑対策を確認（Chin Chin・Cumulus 等は予約不可・行列制／早め来店が◎）' },
  { grp:'2〜3ヶ月前', text:'休暇・旅程・空港までの交通を調整' },
  { grp:'1ヶ月前', text:'ETA（subclass 601）を AustralianETAアプリで申請（AUD$20・12ヶ月有効）' },
  { grp:'1ヶ月前', text:'海外旅行保険に加入（クレカ付帯の補償・上限も確認）' },
  { grp:'1ヶ月前', text:'eSIM／SIM／Wi-Fiルーターを手配' },
  { grp:'1ヶ月前', text:'外務省「たびレジ」に登録（緊急時の情報配信）' },
  { grp:'1ヶ月前', text:'タッチ決済対応のクレカを複数枚用意（VISA／Master推奨）' },
  { grp:'1ヶ月前', text:'常備薬・処方薬を準備（処方薬は英文の説明があると安心）' },
  { grp:'2週間前', text:'現地通貨(AUD)を少額用意（基本はカード決済でOK）' },
  { grp:'2週間前', text:'クレカの海外利用設定・利用枠・紛失時の連絡先を控える' },
  { grp:'2週間前', text:'変換プラグ（Iタイプ・230V対応）を用意' },
  { grp:'2週間前', text:'ブルーマウンテンズ用の防寒着を準備（DAY5は冷える）' },
  { grp:'2週間前', text:'JTBツアー最終確認（DAY5 ヒルトン 8:25集合・5分前厳守）' },
  { grp:'2週間前', text:'スマホの海外設定（データローミングOFF・必要アプリDL）' },
  { grp:'1週間前', text:'各予約確認書を印刷＋スマホにオフライン保存' },
  { grp:'1週間前', text:'パスポート・eチケットのコピー（紙＋クラウド）' },
  { grp:'1週間前', text:'緊急連絡先メモ（保険・カード紛失窓口・日本国総領事館）→ 情報タブの赤枠に記入' },
  { grp:'1週間前', text:'天気の最終確認と服装の最終調整' },
  { grp:'1週間前', text:'自宅の段取り（郵便・宅配の停止、ゴミ、戸締り）' },
  { grp:'前日', text:'オンラインチェックイン・座席を確認' },
  { grp:'前日', text:'荷造り最終（液体は100ml以内・モバイルバッテリーは機内持込）' },
  { grp:'前日', text:'検疫申告の準備（食品・薬・木製品は申告。迷ったら申告）' },
  { grp:'前日', text:'スマホ・モバイルバッテリー・カメラを充電' },
  { grp:'前日', text:'目覚まし・空港までの交通を最終確認' },
  { grp:'当日・道中', text:'入国カード(Incoming Passenger Card)で食品等を必ず申告' },
  { grp:'当日・道中', text:'機内ではこまめに水分補給・足を動かす（エコノミー症候群対策）' },
  { grp:'当日・道中', text:'到着後 eSIM/SIMを有効化、時計を現地時間に（日本＋1時間）' }
];

var PREP_BOOK = [
  { text:'往路 JAL JL773（9/20 成田→メルボルン）' },
  { text:'国内線 メルボルン→シドニー（9/23）' },
  { text:'復路フライト（9/26 シドニー→羽田）' },
  { text:'IC メルボルン ザ リアルト（9/21–23・2泊）' },
  { text:'リッジス ワールドスクエア（9/23–26・3泊）' },
  { text:'JTB ブルーマウンテンズ ツアー（9/24）' },
  { text:'海外旅行保険' },
  { text:'eSIM／SIM／Wi-Fi' }
];

var PREP_KB = [
  { title:'ETA（電子渡航認証）', body:'観光は subclass 601。<b>AustralianETA アプリ</b>で申請（手数料 AUD$20）。発給は数分〜、12ヶ月有効・1回最大3ヶ月滞在。パスポートに電子的に紐付くので印刷不要。' },
  { title:'検疫（バイオセキュリティ）※重要', body:'<b>食品・植物・動物製品・木製品は全て申告</b>。未申告で見つかると罰金 AUD$313〜最大6,260、悪質だとビザ取消・入国拒否も。日本のお菓子等も「申告」が安全。<b>迷ったら必ず YES で申告</b>。' },
  { title:'TRS（免税還付）', body:'同一店(同一ABN)で <b>合計AUD$300以上</b>・出発60日以内の購入が対象。GST(10%)が戻る。タックスインボイス原本＋商品を手荷物で。<b>出発空港のTRSカウンターで出発30分前まで</b>。TRSアプリで事前入力→QRで時短。' },
  { title:'市内交通', body:'<b>シドニー：Opalカード不要</b>。タッチ決済(クレカ/Apple Pay等)で電車・バス・フェリー・ライトレール全部OK（降車タップ忘れ＝最大運賃に注意）。<b>メルボルン：CBDは無料トラムゾーン</b>（カード不要）。ゾーン外・電車は Myki。<b>旅行中は州の運賃半額キャンペーン中</b>（詳細は情報タブ）。' },
  { title:'支払い・チップ', body:'カード社会で少額もタッチ決済が主流。現金は少しで十分。<b>チップは基本不要</b>（任意）。レストランは週末/祝日サーチャージがつくことも。' },
  { title:'電源プラグ・電圧', body:'プラグは<b>Iタイプ（ハの字）</b>、電圧 <b>230V・50Hz</b>。日本(100V)と違うので、機器の対応電圧(100-240V表記)を確認。非対応なら変圧器が必要。' },
  { title:'水・気候', body:'<b>水道水は飲用可</b>。9月は南半球の春で朝晩冷える＆寒暖差大。<b>UVが非常に強い</b>ので日焼け止め・帽子・サングラスを。' },
  { title:'緊急時', body:'緊急通報は <b>000</b>（警察・消防・救急 共通）。パスポート紛失・トラブルは<b>在シドニー日本国総領事館</b>へ。保険・カード会社の緊急窓口は情報タブの赤枠にメモ。' }
];

/* 持ち物（checklist_v1 と互換のため項目順は現行アプリと同一） */
var PACKING = [
  { cat:'貴重品・書類', items:[
    'パスポート（有効期限：帰国後6ヶ月以上）','ETA申請完了の確認（AustralianETAアプリ）','海外旅行保険の証券（紙＋スマホ）',
    'クレジットカード（タッチ決済対応・複数枚）','現金（AUD 少額）＋予備','予約確認書（フライト・ホテル・ツアー）印刷＋スマホ保存' ] },
  { cat:'電子機器', items:[
    'スマホ＋充電器（ケーブル）','モバイルバッテリー（機内は手荷物へ）','変換プラグ（Iタイプ・230V対応）',
    'eSIM／SIM（到着後に有効化）','カメラ（＋予備バッテリー・SDカード）' ] },
  { cat:'衣類（9月＝春・寒暖差大）', items:[
    'ウインドブレーカー・ストール（朝晩の冷え対策）','ブルーマウンテンズ用の暖かい上着（DAY5）','歩きやすいスニーカー（1日1万歩超）',
    '着替え（重ね着できるもの）','折りたたみ傘・軽い雨具（メルボルンは変わりやすい）','きれいめの服（任意・ディナーや写真用に1着）',
    '下着・靴下（日数分＋予備1〜2）','パジャマ・部屋着','サンダル（機内・室内・近場用）' ] },
  { cat:'衛生・健康', items:[
    '常備薬（胃腸薬・頭痛薬・整腸剤・酔い止め）','日焼け止め SPF50+（UVが非常に強い）','サングラス・帽子',
    'リップ・保湿クリーム（乾燥対策）','歯ブラシ・洗面具・コンタクト予備','スキンケア・化粧品（基礎化粧品）',
    '英語メモ：貝・甲殻類が苦手（No shellfish/crustaceans）' ] },
  { cat:'あると便利', items:[
    'エコバッグ（レジ袋は有料／少ない）','機内用ネックピロー・アイマスク','ウェットティッシュ・常備のマスク',
    '着圧ソックス・耳栓（夜行便のむくみ・睡眠対策）','折り畳みサブバッグ・圧縮袋（お土産用）','ジップロック（液体小分け・荷物整理）',
    'イヤホン（機内・移動用）' ] }
];

function lsGet(key){ try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch(e){ return {}; } }
function lsSet(key, obj){ try { localStorage.setItem(key, JSON.stringify(obj)); } catch(e){} }

function rmNextDay(s){ var dt=new Date(+s.slice(0,4),+s.slice(4,6)-1,+s.slice(6,8)+1); return ''+dt.getFullYear()+('0'+(dt.getMonth()+1)).slice(-2)+('0'+dt.getDate()).slice(-2); }
function rmFmt(s){ return (+s.slice(4,6))+'/'+(+s.slice(6,8)); }
function gcalUrl(title,date,details){
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(title)
       + '&dates=' + date + '/' + rmNextDay(date) + '&details=' + encodeURIComponent(details||'');
}

function renderPrepPage() {
  var host = document.getElementById('pane-prep');
  var todoDone = lsGet('prep_todo_v1'), bookDone = lsGet('prep_book_v1'), bookNote = lsGet('prep_booknote_v1');
  var h = '<div class="ch-head"><div class="ch-eyebrow">PREPARATION</div><div class="ch-h1">準備</div>' +
    '<div class="ch-sub">チェックはこの端末に自動保存されます</div></div>';

  /* リマインダー */
  h += '<div class="sec-h">— 出発前リマインダー（タップでGoogleカレンダーに登録） —</div><div class="ledger" style="margin-top:0">';
  PREP_REMIND.forEach(function(r){
    h += '<a class="remind-row" href="' + gcalUrl(r.title, r.date, r.note) + '" target="_blank" rel="noopener">' +
      '<span class="rd">' + rmFmt(r.date) + '</span><span class="rb"><span class="rt">' + r.title + '</span>' +
      (r.note ? '<span class="rn">' + r.note + '</span>' : '') + '</span><span class="cal">＋カレンダー</span></a>';
  });
  h += '</div>';

  /* ToDo */
  h += '<div class="sec-h">— 出発前 ToDo —</div>';
  var groups = [];
  PREP_TODO.forEach(function(t){ if (groups.indexOf(t.grp) < 0) groups.push(t.grp); });
  groups.forEach(function(g){
    h += '<div class="ledger" style="margin-top:8px"><div class="ledger-title">' + g + '</div>';
    PREP_TODO.forEach(function(t, i){
      if (t.grp !== g) return;
      h += '<div class="check-row' + (todoDone[i] ? ' done' : '') + '" data-todo="' + i + '">' +
           '<span class="cbox"></span><span class="ct">' + t.text + '</span></div>';
    });
    h += '</div>';
  });

  /* 予約トラッカー */
  h += '<div class="sec-h">— 予約・手配トラッカー —</div><div class="ledger" style="margin-top:0">';
  PREP_BOOK.forEach(function(b, i){
    h += '<div class="check-row' + (bookDone[i] ? ' done' : '') + '" data-book="' + i + '" style="border-bottom:none;padding-bottom:2px">' +
         '<span class="cbox"></span><span class="ct">' + b.text + '</span></div>' +
         '<input class="bk-note2" data-note="' + i + '" placeholder="予約番号・メモをここに" value="' + String(bookNote[i]||'').replace(/"/g,'&quot;') + '">';
  });
  h += '</div>';

  /* 持ち物 */
  h += '<div class="sec-h">— 持ち物チェックリスト —</div>' +
       '<div class="prog"><span class="pt"><span id="pk-done">0</span>/<span id="pk-total">0</span></span><div class="bar"><div class="fill" id="pk-fill" style="width:0%"></div></div></div>';
  var pkIndex = 0;
  var pkState = lsGet('checklist_v1');
  PACKING.forEach(function(cat){
    h += '<div class="ledger" style="margin-top:8px"><div class="ledger-title">' + cat.cat + '</div>';
    cat.items.forEach(function(item){
      h += '<div class="check-row' + (pkState[pkIndex] ? ' done' : '') + '" data-pk="' + pkIndex + '">' +
           '<span class="cbox"></span><span class="ct">' + item + '</span></div>';
      pkIndex++;
    });
    h += '</div>';
  });

  /* 基礎知識 */
  h += '<div class="sec-h">— 入国・現地の基礎知識 —</div>';
  PREP_KB.forEach(function(k){
    h += '<div class="kb-card"><div class="kb-title">' + k.title + '</div><div class="kb-body">' + k.body + '</div></div>';
  });

  host.innerHTML = h;
  updatePackProgress();

  /* イベント（委任） */
  host.addEventListener('click', function(e){
    var row = e.target.closest ? e.target.closest('.check-row') : null;
    if (!row) return;
    if (row.hasAttribute('data-todo')) {
      var d = lsGet('prep_todo_v1'); var k = row.getAttribute('data-todo');
      d[k] = !d[k]; lsSet('prep_todo_v1', d); row.classList.toggle('done', !!d[k]);
    } else if (row.hasAttribute('data-book')) {
      var b = lsGet('prep_book_v1'); var k2 = row.getAttribute('data-book');
      b[k2] = !b[k2]; lsSet('prep_book_v1', b); row.classList.toggle('done', !!b[k2]);
    } else if (row.hasAttribute('data-pk')) {
      var p = lsGet('checklist_v1'); var k3 = row.getAttribute('data-pk');
      p[k3] = !p[k3]; lsSet('checklist_v1', p); row.classList.toggle('done', !!p[k3]);
      updatePackProgress();
    }
  });
  host.addEventListener('input', function(e){
    if (!e.target.classList || !e.target.classList.contains('bk-note2')) return;
    var n = lsGet('prep_booknote_v1');
    n[e.target.getAttribute('data-note')] = e.target.value;
    lsSet('prep_booknote_v1', n);
  });
}
function updatePackProgress(){
  var rows = document.querySelectorAll('#pane-prep [data-pk]');
  var done = document.querySelectorAll('#pane-prep [data-pk].done').length;
  var dEl = document.getElementById('pk-done'), tEl = document.getElementById('pk-total'), fEl = document.getElementById('pk-fill');
  if (dEl) dEl.textContent = done;
  if (tEl) tEl.textContent = rows.length;
  if (fEl) fEl.style.width = (rows.length ? Math.round(done/rows.length*100) : 0) + '%';
}
