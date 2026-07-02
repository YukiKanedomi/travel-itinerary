/* ============ v2 info.js — 情報タブ（為替・緊急連絡先・交通・リンク・予算） ============ */
/* localStorage キーは現行と互換: fx_rate_v1 / emer_note_emer-jtb / emer_note_emer-ins */

var FX_KEY = 'fx_rate_v1', FX_DEFAULT = 97, FX_API = 'https://open.er-api.com/v6/latest/AUD';
var convDir = 'AUD_JPY', convRate = FX_DEFAULT;

function fxRound(r){ return Math.round(r*10)/10; }
function fxFmtTime(ts){ var d = new Date(ts); return (d.getMonth()+1)+'/'+d.getDate()+' '+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2); }
function fxRender(rate, ts, state){
  convRate = rate;
  var rv = document.getElementById('v2-rate'); if (rv) rv.textContent = fxRound(rate);
  var tile = document.getElementById('v2-rate-tile'); if (tile) tile.textContent = '1AUD = 約' + fxRound(rate) + '円';
  var st = document.getElementById('v2-fx-st');
  if (st) {
    st.className = 'fx-st ' + (state==='live' ? 'live' : state==='cache' ? 'cache' : 'ref');
    st.textContent = state==='live' ? 'ライブ ' + fxFmtTime(ts) : state==='cache' ? '前回値 ' + fxFmtTime(ts) : '参考値';
  }
  calcConv();
}
function fxFetch(manual){
  fetch(FX_API, { cache:'no-store' })
    .then(function(r){ return r.json(); })
    .then(function(d){
      var rate = d && d.rates && d.rates.JPY;
      if (!rate || rate <= 0) throw new Error('no rate');
      var ts = Date.now();
      try { localStorage.setItem(FX_KEY, JSON.stringify({ rate:rate, ts:ts })); } catch(_){}
      fxRender(rate, ts, 'live');
      if (manual) toast('レートを更新しました');
    })
    .catch(function(){ if (manual) toast('オフラインのため更新できませんでした'); });
}
function refreshFx(){ fxFetch(true); }
function initFx(){
  var c = null;
  try { c = JSON.parse(localStorage.getItem(FX_KEY)); } catch(_){}
  if (c && c.rate > 0) fxRender(c.rate, c.ts, 'cache'); else fxRender(FX_DEFAULT, null, 'ref');
  fxFetch(false);
}
function swapConv(){
  convDir = convDir === 'AUD_JPY' ? 'JPY_AUD' : 'AUD_JPY';
  var f = document.getElementById('v2-conv-flbl'), t = document.getElementById('v2-conv-tlbl');
  if (f) f.textContent = convDir === 'AUD_JPY' ? 'AUD（豪ドル）' : 'JPY（円）';
  if (t) t.textContent = convDir === 'AUD_JPY' ? 'JPY（円）' : 'AUD（豪ドル）';
  calcConv();
}
function calcConv(){
  var inp = document.getElementById('v2-conv-in'), res = document.getElementById('v2-conv-out');
  if (!inp || !res) return;
  var val = parseFloat(inp.value);
  if (isNaN(val) || val < 0) { res.textContent = '—'; return; }
  res.textContent = convDir === 'AUD_JPY'
    ? '¥' + Math.round(val * convRate).toLocaleString('ja-JP')
    : 'A$' + (val / convRate).toFixed(2);
}
function toast(msg){
  var t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2200);
}

var INFO_LINKS = [
  { cat:'入国・申請・安全（公式系）', rows:[
    { t:'外務省 海外安全ホームページ', n:'渡航前に最新の安全・治安情報を必ず確認', u:'https://www.anzen.mofa.go.jp/' },
    { t:'在日オーストラリア大使館 ETA（日本語）', n:'電子渡航許可ETAの公式説明', u:'https://japan.embassy.gov.au/tkyojapanese/ETA601.html' },
    { t:'地球の歩き方 入国・ETA申請ガイド', n:'ETAアプリの手順・入国の流れ', u:'https://www.arukikata.co.jp/areainfo/au-immigration/' } ] },
  { cat:'空港アクセス（行き方レポ）', rows:[
    { t:'メルボルン空港→市内 アクセス比較', n:'SkyBus・タクシー等の料金/所要時間', u:'https://www.arukikata.co.jp/areainfo/au-mel-access/' },
    { t:'SkyBus 乗り方・チケット購入【体験レポ】', n:'写真付きで実際の流れがわかる', u:'https://ameblo.jp/doppe-coach/entry-12884462769.html' },
    { t:'シドニー空港→市内 電車の乗り方【体験】', n:'Airport Link の使い方', u:'https://blossa.org/blog/Sydney-Airport' },
    { t:'シドニー空港→市内 行き方まとめ（2026）', n:'手段別の比較', u:'https://www.traveldonkey.jp/blog/australia/sydney/6872/' } ] },
  { cat:'交通機関の使い方', rows:[
    { t:'Opalカード 使い方 徹底解説', n:'チャージ・タッチ決済・割引のコツ', u:'https://aqua-tourdesk.com/sydney-opal-card/' },
    { t:'シドニーの電車の乗り方・路線のコツ', n:'乗り換え・運賃の実用情報', u:'https://www.australianstudies.jp/archives/184' } ] },
  { cat:'旅行記・観光モデル', rows:[
    { t:'メルボルン＆シドニー 旅行記（2025）', n:'実際の周遊レポート', u:'https://aya-littlefish.com/australia-melbourne-2025-1/' },
    { t:'初の海外一人旅 シドニー&メルボルン', n:'初心者目線の体験談（フォートラベル）', u:'https://4travel.jp/travelogue/11829671' },
    { t:'メルボルン観光スポット28選（2026）', n:'定番の見どころ一覧', u:'https://www.traveldonkey.jp/blog/australia/melbourne/12253/' } ] }
];

function renderInfoPage(){
  var host = document.getElementById('pane-info');
  var h = '<div class="ch-head"><div class="ch-eyebrow">REFERENCE</div><div class="ch-h1">情報</div>' +
    '<div class="ch-sub">お金・緊急連絡先・交通・参考リンク</div></div>';

  /* 基本タイル */
  h += '<div class="tiles">' +
    '<div class="tile"><div class="tk">通貨</div><div class="tv">豪ドル AUD</div></div>' +
    '<div class="tile"><div class="tk">レート</div><div class="tv" id="v2-rate-tile">1AUD = 約97円</div></div>' +
    '<div class="tile"><div class="tk">9月の気温</div><div class="tv">13〜20°C（春）</div></div>' +
    '<div class="tile"><div class="tk">時差</div><div class="tv">日本 +1時間</div></div>' +
    '<div class="tile"><div class="tk">電源</div><div class="tv">230V・Iタイプ</div></div>' +
    '<div class="tile"><div class="tk">日本への電話</div><div class="tv">+81を付ける</div></div></div>';

  /* 換算機 */
  h += '<div class="sec-h">— AUD ⇄ 円 かんたん換算 —</div>' +
    '<div class="conv"><div class="conv-row">' +
      '<div class="conv-col"><div class="conv-lbl" id="v2-conv-flbl">AUD（豪ドル）</div>' +
        '<input class="conv-in" id="v2-conv-in" type="number" inputmode="decimal" placeholder="0"></div>' +
      '<button class="conv-swap2" onclick="swapConv()" title="入れ替え">⇄</button>' +
      '<div class="conv-col"><div class="conv-lbl" id="v2-conv-tlbl">JPY（円）</div>' +
        '<div class="conv-out" id="v2-conv-out">—</div></div></div>' +
    '<div class="conv-foot"><span>1 AUD = <b id="v2-rate">97</b> 円</span>' +
      '<span class="fx-st ref" id="v2-fx-st">参考値</span>' +
      '<button class="fx-btn" onclick="refreshFx()">更新</button></div></div>';

  /* 緊急連絡先（赤枠） */
  h += '<div class="sec-h">— 緊急連絡先（発信リンクなし・番号は目で確認） —</div>' +
    '<div class="emer-frame"><div class="ef-t">EMERGENCY</div>' +
    '<div class="irow"><span class="k">警察・救急・消防</span><span class="v"><b>000</b>（豪州統合緊急番号）</span></div>' +
    '<div class="irow"><span class="k">在シドニー日本領事館</span><span class="v">+61-2-9250-1000</span></div>' +
    '<div class="irow"><span class="k">在メルボルン日本領事館</span><span class="v">+61-3-9639-3244</span></div>' +
    '<div class="irow"><span class="k">VISA紛失</span><span class="v">+1-800-847-2911（フリーダイヤル）</span></div>' +
    '<div class="irow"><span class="k">JAL国際線</span><span class="v">0120-255-931（日本語）</span></div>' +
    '<div class="irow"><span class="k">IC メルボルン</span><span class="v">+61 3 8627 1400（フロント24h）</span></div>' +
    '<div class="irow"><span class="k">リッジスWS シドニー</span><span class="v">+61 2 8268 1888（フロント24h）</span></div>' +
    '<div class="irow"><span class="k">JTB当日連絡先</span><span class="v"><input class="emer-in" id="emer-jtb" placeholder="最終日程表の現地緊急番号をメモ"></span></div>' +
    '<div class="irow"><span class="k">海外旅行保険</span><span class="v"><input class="emer-in" id="emer-ins" placeholder="保険会社の緊急窓口をメモ"></span></div></div>';

  /* タクシーカード */
  h += '<div class="sec-h">— タクシー／Uberで見せる宿泊先（長押しでコピー可） —</div>' +
    '<div class="taxi"><div class="tx-k">MELBOURNE — 9/21–23</div>' +
    '<div class="tx-n">InterContinental Melbourne The Rialto</div>' +
    '<div class="tx-a">495 Collins Street, Melbourne VIC 3000</div>' +
    '<div class="tx-k">SYDNEY — 9/23–26</div>' +
    '<div class="tx-n">Rydges World Square</div>' +
    '<div class="tx-a" style="margin-bottom:2px">389 Pitt Street, Sydney NSW 2000</div></div>';

  /* 困った時・日の出 */
  h += '<div class="sec-h">— 困った時の備え —</div><div class="ledger" style="margin-top:0">' +
    '<div class="lrow"><div class="t">雨</div><div class="body"><div class="d">メルボルンの雨は屋内退避：州立図書館・アーケード・NGV（無料）。折り畳み傘を常携</div></div></div>' +
    '<div class="lrow"><div class="t">遅延</div><div class="body"><div class="d">VA859が遅れても夜の予定は時間をずらせばOK（Ume Burgerは予約不要）</div></div></div>' +
    '<div class="lrow"><div class="t">迷子</div><div class="body"><div class="d">はぐれたら合流先を決めておく（ホテルロビー）。上の宿泊先カードを運転手に見せれば戻れる</div></div></div>' +
    '<div class="lrow"><div class="t">電池</div><div class="body"><div class="d">モバイルバッテリー携行。このしおりはオフラインでも見られる</div></div></div></div>';

  h += '<div class="sec-h">— 日の出・日の入り（撮影の目安・現地時間） —</div><div class="ledger" style="margin-top:0">' +
    '<div class="lrow"><div class="t">MEL</div><div class="body"><div class="h">9/21–23　日の出 約6:10 ／ 日の入り 約18:15</div></div></div>' +
    '<div class="lrow"><div class="t">SYD</div><div class="body"><div class="h">9/24–26　日の出 約5:40 ／ 日の入り 約17:55</div>' +
    '<div class="d">ミセス・マッコリーズ・ポイントは朝の順光。Opera Bar（9/25）は日没17:53頃が夕景の狙い目</div></div></div></div>';

  /* 交通ガイド */
  h += '<div class="sec-h">— 交通スマートガイド —</div>' +
    '<div class="kb-card"><div class="kb-title">旅行中ずっと運賃半額（メルボルン）</div><div class="kb-body">ビクトリア州は<b>2026/6/1〜2027/1/1</b>の間、公共交通が<b>すべて半額</b>。旅行期間はまるごと対象。※SkyBusは対象外</div></div>' +
    '<div class="kb-card"><div class="kb-title">メルボルン：無料トラム＆Myki</div><div class="kb-body"><b>CBD内の無料トラムゾーンは料金もカードも不要</b>。DAY2・3の市内散策はほぼ無料で回れる。ゾーン外・電車は<b>Myki</b>（駅・コンビニで購入）。半額期間中の上限：2時間 約$2.85／1日 平日約$5.70・週末約$4.00。空港はSkyBus（約$22）かUber（$60〜70、荷物多なら推奨）</div></div>' +
    '<div class="kb-card"><div class="kb-title">シドニー：タッチ決済でOK</div><div class="kb-body">クレカ／Apple Pay／Google Payをかざすだけで電車・バス・フェリー・ライトレール全部OK。<b>降車時もタップ必須</b>（忘れると最大運賃）。1日上限 月〜木$19.30／<b>金〜日・祝$9.65</b>（週末おトク）。Airport Linkは<b>空港駅利用料 約$18が別途</b>——2人＋荷物ならUber（$40〜60）と比較を</div></div>';

  /* 予算 */
  h += '<div class="sec-h">— 旅行予算目安（2人合計） —</div><div class="ledger bud" style="margin-top:0">' +
    '<div class="irow"><span class="k">国際線（JAL往復）</span><span class="v">約¥680,000</span></div>' +
    '<div class="irow"><span class="k">国内線（MEL→SYD）</span><span class="v">約¥37,000</span></div>' +
    '<div class="irow"><span class="k">ホテル（5泊）</span><span class="v">約¥190,000</span></div>' +
    '<div class="irow"><span class="k">ツアー（ブルマン）</span><span class="v">約¥67,000</span></div>' +
    '<div class="irow"><span class="k">食事（7日間）</span><span class="v">約¥120,000</span></div>' +
    '<div class="irow"><span class="k">現地交通</span><span class="v">約¥30,000</span></div>' +
    '<div class="irow"><span class="k">お土産・買い物</span><span class="v">約¥50,000</span></div>' +
    '<div class="irow total"><span class="k"><b>合計目安</b></span><span class="v"><b>約¥1,174,000</b></span></div></div>';

  /* 参考リンク */
  h += '<div class="sec-h">— 役立つ参考サイト（日本語） —</div>';
  INFO_LINKS.forEach(function(c){
    h += '<div class="kb-card"><div class="kb-title">' + c.cat + '</div>';
    c.rows.forEach(function(r){
      h += '<a class="link-row2" href="' + r.u + '" target="_blank" rel="noopener"><span class="lt">' + r.t + '</span><span class="ln">' + r.n + '</span></a>';
    });
    h += '</div>';
  });

  /* 旅の心得 */
  h += '<div class="kokoro">9月のオーストラリアは南半球の「春の始まり」。日中は過ごしやすくても朝晩は10°Cを下回ることも。重ね着を常に意識して。<br><br>メルボルンはコーヒーとアートの街、シドニーは海と建築の街。まったく違う顔を持つ2都市を、ふたりのペースで。<br><br>Have a great trip!</div>';

  host.innerHTML = h;

  /* 緊急メモ欄（現行と同じキーで保存） */
  ['emer-jtb','emer-ins'].forEach(function(id){
    var el = document.getElementById(id);
    if (!el) return;
    try { el.value = localStorage.getItem('emer_note_' + id) || ''; } catch(e){}
    el.addEventListener('input', function(){ try { localStorage.setItem('emer_note_' + id, el.value); } catch(e){} });
  });
  var ci = document.getElementById('v2-conv-in');
  if (ci) ci.addEventListener('input', calcConv);
  initFx();
}
