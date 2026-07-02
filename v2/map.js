/* ============ v2 map.js — 地図タブ（貼り込み地図＋番号ピン＋一覧） ============ */
/* データ・模式図・ズーム機構は現行アプリから移植。ピンは絵文字でなく訪問順の番号。 */

var SPOTS = [
  // MELBOURNE
  { area:'mel', name:'IC メルボルン ザ リアルト', en:['InterContinental Melbourne The Rialto','495 Collins Street, Melbourne'], day:'DAY 2・3 ホテル', map:'https://maps.google.com/?q=495+Collins+Street+Melbourne', web:'https://www.ihg.com/intercontinental/hotels/gb/en/melbourne/melha/hoteldetail', x:90, y:246, order:1, hot:true, tip:'Collins St西端の歴史的建築ホテル' },
  { area:'mel', name:'Lune Croissanterie CBD', en:['Flinders Lane, Melbourne'], day:'DAY 2 朝食', map:'https://maps.google.com/?q=Lune+Croissanterie+CBD+Melbourne', web:'https://www.lunecroissanterie.com/', x:208, y:243, order:2, move:'walk', legMin:10, tip:'世界一とも称されるクロワッサン。開店直後が狙い目' },
  { area:'mel', name:'ホージア・レーン', en:['Hosier Lane, Melbourne'], day:'DAY 2 観光（無料）', map:'https://maps.google.com/?q=Hosier+Lane+Melbourne', x:192, y:283, order:3, move:'walk', legMin:5, tip:'ストリートアートの路地。絵柄は日々変化' },
  { area:'mel', name:'ブロック・アーケード', en:['282 Collins Street, Melbourne'], day:'DAY 2 観光', map:'https://maps.google.com/?q=Block+Arcade+Melbourne', web:'https://www.theblockarcade.com.au/', x:172, y:246, order:4, move:'walk', legMin:4, tip:'1890年代のアーケード。床モザイクとHopetoun Tea Rooms' },
  { area:'mel', name:'Il Solito Posto', en:['113 Collins Street（地下）, Melbourne'], day:'DAY 2 ランチ', map:'https://maps.google.com/?q=Il+Solito+Posto+Melbourne', web:'https://ilsolitoposto.com.au/', x:258, y:245, order:5, move:'walk', legMin:9, tip:'老舗イタリアン。地下の隠れ家ビストロ' },
  { area:'mel', name:'Chin Chin', en:['125 Flinders Lane, Melbourne'], day:'DAY 2 ディナー（予約不可）', map:'https://maps.google.com/?q=Chin+Chin+Flinders+Lane+Melbourne', web:'https://chinchin.melbourne/', x:218, y:267, order:6, move:'walk', legMin:6, tip:'モダンタイ。行列制だが回転が早い。辛さ調整可' },
  { area:'mel', name:'クイーンビクトリアマーケット', en:['Queen St & Victoria St, Melbourne'], day:'DAY 3 観光（火曜営業）', map:'https://maps.google.com/?q=Queen+Victoria+Market+Melbourne', web:'https://qvm.com.au/', x:139, y:91, order:7, move:'tram', legMin:12, tip:'南半球最大級の市場。月・水休み' },
  { area:'mel', name:'カールトン庭園・王立展示館', en:['Carlton Gardens, Carlton'], day:'DAY 3 観光（世界遺産）', map:'https://maps.google.com/?q=Carlton+Gardens+Melbourne', web:'https://museumsvictoria.com.au/reb/', x:250, y:86, order:8, move:'walk', legMin:13, tip:'世界遺産の王立展示館と庭園' },
  { area:'mel', name:'ビクトリア州立図書館', en:['328 Swanston St, Melbourne'], day:'DAY 3 観光（無料）', map:'https://maps.google.com/?q=State+Library+Victoria+Melbourne', web:'https://www.slv.vic.gov.au/', x:175, y:172, order:9, move:'tram', legMin:10, tip:'荘厳なドーム閲覧室。上階ギャラリーも必見' },
  // SYDNEY CBD
  { area:'syd', name:'リッジス ワールド スクエア', en:['Rydges World Square — 389 Pitt Street'], day:'DAY 4〜6 ホテル', map:'https://maps.google.com/?q=389+Pitt+Street+Sydney', web:'https://www.rydges.com/accommodation/sydney-nsw/world-square/', x:152, y:212, order:1, hot:true, tip:'CBD中心の好立地。Coles直結' },
  { area:'syd', name:'Ume Burger', en:['Darling Square — 35 Tumbalong Blvd'], day:'DAY 4 ディナー（気軽）', map:'https://maps.google.com/?q=Ume+Burger+Darling+Square+Sydney', web:'https://umeburger.com/', x:88, y:178, order:2, move:'walk', legMin:12, tip:'和風グルメバーガー。貝なしでOK' },
  { area:'syd', name:'ヒルトン シドニー（ツアー集合）', en:['Hilton Sydney — 488 George Street'], day:'DAY 5 集合 8:25（5分前厳守）', map:'https://maps.google.com/?q=Hilton+Sydney+488+George+Street', x:150, y:166, order:3, move:'walk', legMin:9, hot:true, tip:'DAY5集合場所。8:25・5分前厳守！' },
  { area:'syd', name:'The Grounds of the City', en:['500 George Street, Sydney'], day:'DAY 6 朝食', map:'https://maps.google.com/?q=The+Grounds+of+the+City+Sydney', web:'https://thegrounds.com.au/', x:126, y:156, order:4, move:'walk', legMin:2, tip:'緑あふれる人気カフェ' },
  { area:'syd', name:'ロイヤルボタニカルガーデン', en:['Mrs Macquaries Rd, Sydney'], day:'DAY 6 観光（無料）', map:'https://maps.google.com/?q=Royal+Botanic+Garden+Sydney', web:'https://www.rbgsyd.nsw.gov.au/', x:228, y:104, order:5, move:'walk', legMin:15, tip:'湾沿いの広大な植物園。入園無料' },
  { area:'syd', name:'ミセス・マッコリーズ・ポイント', en:['Mrs Macquaries Point, Sydney'], day:'DAY 6 絶景フォト（無料）', map:'https://maps.google.com/?q=Mrs+Macquaries+Point+Sydney', x:252, y:62, order:6, move:'walk', legMin:10, tip:'オペラハウス＋橋を一望の定番フォトスポット' },
  { area:'syd', name:'ロックス地区', en:['The Rocks, Sydney'], day:'DAY 6 観光', map:'https://maps.google.com/?q=The+Rocks+Sydney', web:'https://www.therocks.com/', x:122, y:76, order:7, move:'walk', legMin:22, tip:'石畳の歴史地区。金曜はマーケット' },
  { area:'syd', name:'The Glenmore Hotel', en:['96 Cumberland Street, The Rocks'], day:'DAY 6 ランチ', map:'https://maps.google.com/?q=The+Glenmore+Hotel+The+Rocks+Sydney', web:'https://www.theglenmore.com.au/', x:100, y:58, order:8, move:'walk', legMin:3, tip:'ルーフトップから港とオペラハウス' },
  { area:'syd', name:'クイーンビクトリアビルディング', en:['455 George Street, Sydney'], day:'DAY 6 ショッピング', map:'https://maps.google.com/?q=Queen+Victoria+Building+Sydney', web:'https://www.qvb.com.au/', x:124, y:182, order:9, move:'walk', legMin:16, tip:'壮麗な歴史的アーケード。土産の本気買いはここ' },
  { area:'syd', name:'Opera Bar', en:['Lower Concourse, Sydney Opera House'], day:'DAY 6 ディナー（予約不要）', map:'https://maps.google.com/?q=Opera+Bar+Sydney', web:'https://operabar.com.au/', x:188, y:54, order:10, move:'walk', legMin:16, tip:'オペラハウス直下の絶景テラス。最後の夜に' },
  { area:'syd', name:'シドニー空港 T1', en:['Sydney Airport T1 International'], day:'DAY 7 出発', map:'https://maps.google.com/?q=Sydney+Airport+Terminal+1+International', web:'https://www.sydneyairport.com.au/', x:150, y:372, order:11, move:'tram', legMin:20, tip:'T1国際線。市内から約20分' },
  // BLUE MOUNTAINS
  { area:'blue', name:'フェザーデール動物園', en:['217 Kildare Rd, Doonside'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Featherdale+Wildlife+Park+Doonside', web:'https://www.featherdale.com.au/', x:205, y:150, order:1, tip:'コアラ・カンガルーと触れ合える' },
  { area:'blue', name:'シーニックワールド', en:['Cliff Drive, Katoomba'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Scenic+World+Katoomba', web:'https://www.scenicworld.com.au/', x:66, y:156, order:2, move:'car', legMin:70, tip:'世界一急勾配のトロッコと渓谷ロープウェイ' },
  { area:'blue', name:'エコーポイント展望台', en:['Echo Point Lookout, Katoomba'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Echo+Point+Lookout+Katoomba', x:82, y:176, order:3, move:'car', legMin:8, tip:'スリーシスターズを望む大展望台' },
  { area:'blue', name:'ルーラ', en:['Leura Mall, Leura'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Leura+Mall+NSW', x:122, y:160, order:4, move:'car', legMin:10, tip:'山あいの可愛い街。カフェと雑貨' }
];

var AREA_ORDER = ['mel','syd','blue'];
var AREA_LABEL = { mel:'メルボルン', syd:'シドニー', blue:'ブルマン' };
var currentArea = 'mel';

/* 模式図（現行から移植） */
var MEL_BG =
  '<rect class="mp-park" x="222" y="58" width="64" height="56" rx="6"/>' +
  '<rect class="mp-park" x="54" y="124" width="42" height="24" rx="5"/>' +
  '<rect class="mp-park" x="252" y="198" width="40" height="66" rx="5"/>' +
  '<rect x="118" y="76" width="42" height="30" rx="3" fill="#e7d7af" stroke="#cdb985" stroke-width="0.6"/>' +
  '<path class="mp-river" d="M0,300 C70,294 130,312 192,304 C242,298 276,300 300,306 L300,344 L0,344 Z"/>' +
  '<line class="mp-street-main" x1="45" y1="245" x2="272" y2="245"/>' +
  '<line class="mp-street-main" x1="45" y1="290" x2="272" y2="290"/>' +
  '<line class="mp-street-main" x1="192" y1="120" x2="192" y2="298"/>' +
  '<line class="mp-street-main" x1="162" y1="120" x2="162" y2="290"/>' +
  '<line class="mp-street" x1="45" y1="148" x2="272" y2="148"/>' +
  '<line class="mp-street" x1="45" y1="178" x2="272" y2="178"/>' +
  '<line class="mp-street" x1="45" y1="210" x2="272" y2="210"/>' +
  '<line class="mp-street" x1="45" y1="270" x2="272" y2="270"/>' +
  '<line class="mp-street" x1="45" y1="163" x2="272" y2="163" stroke-opacity="0.45"/>' +
  '<line class="mp-street" x1="45" y1="194" x2="272" y2="194" stroke-opacity="0.45"/>' +
  '<line class="mp-street" x1="45" y1="228" x2="272" y2="228" stroke-opacity="0.45"/>' +
  '<line class="mp-street" x1="45"  y1="148" x2="45"  y2="290"/>' +
  '<line class="mp-street" x1="78"  y1="148" x2="78"  y2="290"/>' +
  '<line class="mp-street" x1="108" y1="148" x2="108" y2="290"/>' +
  '<line class="mp-street" x1="135" y1="120" x2="135" y2="290"/>' +
  '<line class="mp-street" x1="218" y1="148" x2="218" y2="290"/>' +
  '<line class="mp-street" x1="245" y1="120" x2="245" y2="290"/>' +
  '<line class="mp-street" x1="272" y1="148" x2="272" y2="290"/>' +
  '<line class="mp-street" x1="100" y1="120" x2="286" y2="120"/>' +
  '<rect x="172" y="290" width="28" height="9" rx="2" fill="#d9c8a0" stroke="#b8a575" stroke-width="0.5"/>' +
  '<rect x="205" y="293" width="20" height="9" rx="1" fill="#cfc4ad"/>' +
  '<text class="mp-label" x="47" y="243">Collins St</text>' +
  '<text class="mp-label" x="47" y="288">Flinders St</text>' +
  '<text class="mp-label" x="47" y="176">Bourke St</text>' +
  '<text class="mp-label" x="47" y="146">La Trobe St</text>' +
  '<text class="mp-label" x="164" y="156" transform="rotate(90 164 156)">Elizabeth St</text>' +
  '<text class="mp-label" x="194" y="156" transform="rotate(90 194 156)">Swanston St</text>' +
  '<text class="mp-label" x="103" y="116">Victoria St</text>' +
  '<text class="mp-label" x="206" y="52">Carlton Gdns</text>' +
  '<text class="mp-label" x="120" y="72">QV Market</text>' +
  '<text class="mp-label" x="54" y="121">Flagstaff</text>' +
  '<text class="mp-label" x="250" y="194">Treasury</text>' +
  '<text class="mp-label-water" x="118" y="322">Yarra River</text>' +
  '<text class="mp-label" x="120" y="337">Southbank</text>' +
  '<text class="mp-label" x="14" y="30" font-weight="700">N↑</text>';

var SYD_BG =
  '<path class="mp-river" d="M0,0 L300,0 L300,40 C262,50 222,42 190,48 C150,56 110,44 70,50 C40,55 18,48 0,52 Z"/>' +
  '<path class="mp-river" d="M232,50 C264,58 272,90 256,120 L300,120 L300,48 Z"/>' +
  '<path class="mp-river" d="M0,150 L70,156 C84,170 86,198 80,224 C50,228 22,226 0,226 Z"/>' +
  '<rect class="mp-park" x="198" y="70" width="74" height="72" rx="8"/>' +
  '<rect class="mp-park" x="200" y="144" width="56" height="32" rx="6"/>' +
  '<rect class="mp-park" x="188" y="158" width="34" height="78" rx="5"/>' +
  '<line class="mp-street-main" x1="138" y1="66" x2="138" y2="258"/>' +
  '<line class="mp-street" x1="108" y1="122" x2="108" y2="232"/>' +
  '<line class="mp-street" x1="122" y1="100" x2="122" y2="246"/>' +
  '<line class="mp-street" x1="158" y1="92" x2="158" y2="250"/>' +
  '<line class="mp-street" x1="172" y1="118" x2="172" y2="234"/>' +
  '<line class="mp-street" x1="186" y1="100" x2="186" y2="238"/>' +
  '<line class="mp-street" x1="196" y1="90"  x2="196" y2="150"/>' +
  '<line class="mp-street" x1="118" y1="92"  x2="202" y2="92"/>' +
  '<line class="mp-street" x1="110" y1="118" x2="202" y2="118"/>' +
  '<line class="mp-street" x1="110" y1="134" x2="186" y2="134"/>' +
  '<line class="mp-street" x1="102" y1="148" x2="186" y2="148"/>' +
  '<line class="mp-street" x1="102" y1="162" x2="186" y2="162"/>' +
  '<line class="mp-street" x1="102" y1="176" x2="224" y2="176"/>' +
  '<line class="mp-street" x1="106" y1="188" x2="186" y2="188"/>' +
  '<line class="mp-street" x1="108" y1="200" x2="186" y2="200"/>' +
  '<line class="mp-street" x1="110" y1="212" x2="186" y2="212"/>' +
  '<line class="mp-street" x1="118" y1="230" x2="180" y2="230"/>' +
  '<path d="M86,40 Q120,16 154,40" fill="none" stroke="#9aa6a0" stroke-width="2.5"/>' +
  '<rect x="130" y="250" width="36" height="12" rx="2" fill="#d9c8a0" stroke="#b8a575" stroke-width="0.5"/>' +
  '<line class="mp-street" x1="150" y1="262" x2="150" y2="360" stroke-dasharray="2 5"/>' +
  '<text class="mp-label-water" x="120" y="26">Sydney Harbour</text>' +
  '<text class="mp-label-water" x="8" y="170" transform="rotate(90 8 170)">Darling Hbr</text>' +
  '<text class="mp-label" x="140" y="100" transform="rotate(90 140 100)">George St</text>' +
  '<text class="mp-label" x="160" y="100" transform="rotate(90 160 100)">Pitt St</text>' +
  '<text class="mp-label" x="188" y="150" transform="rotate(90 188 150)">Elizabeth St</text>' +
  '<text class="mp-label" x="198" y="96" transform="rotate(90 198 96)">Macquarie St</text>' +
  '<text class="mp-label" x="200" y="84">Botanic Gdn</text>' +
  '<text class="mp-label" x="192" y="205">Hyde Park</text>' +
  '<text class="mp-label" x="84" y="100">The Rocks</text>' +
  '<text class="mp-label" x="150" y="86">Circular Quay</text>' +
  '<text class="mp-label" x="126" y="246">Central Stn</text>' +
  '<text class="mp-label" x="92" y="360">South: Airport 8km</text>' +
  '<text class="mp-label" x="14" y="30" font-weight="700">N↑</text>';

var BLUE_BG =
  '<path class="mp-park" d="M18,160 L52,98 L92,160 Z"/>' +
  '<path class="mp-park" d="M62,160 L104,80 L150,160 Z"/>' +
  '<path class="mp-park" d="M40,160 L78,116 L120,160 Z"/>' +
  '<line class="mp-street-main" x1="20" y1="160" x2="288" y2="160"/>' +
  '<line x1="288" y1="160" x2="205" y2="150" stroke="#C7402D" stroke-width="2" stroke-dasharray="2 5" opacity="0.5"/>' +
  '<text class="mp-label" x="40" y="206">Katoomba</text>' +
  '<text class="mp-label" x="110" y="182">Leura</text>' +
  '<text class="mp-label" x="186" y="176">Doonside</text>' +
  '<text class="mp-label" x="234" y="142">to Sydney</text>' +
  '<text class="mp-label" x="74" y="58">Blue Mountains NP</text>' +
  '<text class="mp-label" x="78" y="220">Three Sisters</text>';

var MAP_GEO = {
  mel:  { viewBox:'0 0 300 360', bg:MEL_BG },
  syd:  { viewBox:'0 0 300 400', bg:SYD_BG },
  blue: { viewBox:'0 0 300 240', bg:BLUE_BG }
};

/* 営業時間（0=日〜6=土 / all:共通 / 24h:終日 / 値なし=休み）※目安 */
var SPOT_HOURS = {
  'クイーンビクトリアマーケット': { 2:'6:00-15:00', 4:'6:00-15:00', 5:'6:00-17:00', 6:'6:00-15:00', 0:'9:00-16:00', note:'月・水は定休' },
  'ビクトリア州立図書館': { all:'10:00-18:00' },
  'ブロック・アーケード': { 1:'9:00-18:00',2:'9:00-18:00',3:'9:00-18:00',4:'9:00-18:00',5:'9:00-18:00',6:'9:00-17:00',0:'10:00-17:00' },
  'Lune Croissanterie CBD': { all:'7:30-15:00' },
  'Chin Chin': { all:'11:00-23:00' },
  'Il Solito Posto': { 1:'12:00-22:00',2:'12:00-22:00',3:'12:00-22:00',4:'12:00-22:00',5:'12:00-22:00',6:'17:30-22:00', note:'日曜休のことあり' },
  'カールトン庭園・王立展示館': { all:'24h', note:'庭園は終日（館内見学は別）' },
  'ホージア・レーン': { all:'24h' },
  'The Grounds of the City': { all:'7:00-16:00' },
  'ロイヤルボタニカルガーデン': { all:'7:00-18:30', note:'門は季節で変動' },
  'ミセス・マッコリーズ・ポイント': { all:'24h' },
  'ロックス地区': { all:'24h', note:'各店舗の時間は別' },
  'The Glenmore Hotel': { all:'11:00-24:00' },
  'クイーンビクトリアビルディング': { 1:'9:00-18:00',2:'9:00-18:00',3:'9:00-18:00',4:'9:00-21:00',5:'9:00-18:00',6:'9:00-18:00',0:'11:00-17:00' },
  'Opera Bar': { all:'11:00-24:00' },
  'Ume Burger': { all:'11:00-21:00' },
  'フェザーデール動物園': { all:'9:00-16:00' },
  'シーニックワールド': { all:'9:00-17:00' },
  'エコーポイント展望台': { all:'24h' }
};
function hmMin(s){ var p=s.split(':'); return parseInt(p[0],10)*60+parseInt(p[1],10); }
function auNowDay(){
  var p={}; new Intl.DateTimeFormat('en-US',{timeZone:'Australia/Sydney',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});
  var wm={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}; var hh=parseInt(p.hour,10); if(hh>=24)hh-=24;
  return { day:wm[p.weekday], min:hh*60+parseInt(p.minute,10) };
}
function openStatus(name){
  try {
    var h=SPOT_HOURS[name]; if(!h) return '';
    var now=auNowDay(); var today=(h.all!==undefined)?h.all:h[now.day]; var cls,badge,txt='';
    if(today===undefined||today===null){ cls='closed'; badge='本日休み'; }
    else if(today==='24h'){ cls='open'; badge='終日開放'; }
    else { var m=today.split('-'),o=hmMin(m[0]),c=hmMin(m[1]); txt=today;
      if(now.min>=o&&now.min<c){ cls=(c-now.min<=30)?'soon':'open'; badge=(c-now.min<=30)?'まもなく閉店':'営業中'; }
      else { cls='closed'; badge='時間外'; } }
    return '<span class="oh oh-'+cls+'">'+badge+'</span>'+(txt?'<span class="oh-txt">'+txt+'</span>':'')+(h.note?'<span class="oh-txt">'+h.note+'</span>':'');
  } catch(e){ return ''; }
}

var mapDragging = false;
var MAP_MAXZOOM = 4;
function setupMapZoom(svg, viewBox) {
  if (!svg) return;
  var p = viewBox.split(/\s+/).map(Number);
  var base = { x:p[0], y:p[1], w:p[2], h:p[3] };
  var view = { x:p[0], y:p[1], w:p[2], h:p[3] };
  var pointers = {}, lastPan = null, pinchPrev = null, moved = false, lastTap = 0;
  var pinEls = svg.querySelectorAll('.mp-pin');
  function zoomedIn(){ return view.w < base.w - 0.5; }
  function applyPinScale(){
    var s = view.w / base.w;
    pinEls.forEach(function(pe){
      var cx = +pe.getAttribute('data-cx'), cy = +pe.getAttribute('data-cy');
      pe.setAttribute('transform','translate('+cx+' '+cy+') scale('+s+') translate('+(-cx)+' '+(-cy)+')');
    });
  }
  function apply(){
    svg.setAttribute('viewBox', view.x+' '+view.y+' '+view.w+' '+view.h);
    svg.style.touchAction = zoomedIn() ? 'none' : 'pan-y';
    applyPinScale();
  }
  function clamp(){
    var minW = base.w / MAP_MAXZOOM;
    if (view.w > base.w) view.w = base.w;
    if (view.w < minW) view.w = minW;
    view.h = view.w * (base.h / base.w);
    if (view.x < base.x) view.x = base.x;
    if (view.y < base.y) view.y = base.y;
    if (view.x + view.w > base.x + base.w) view.x = base.x + base.w - view.w;
    if (view.y + view.h > base.y + base.h) view.y = base.y + base.h - view.h;
  }
  function rect(){ return svg.getBoundingClientRect(); }
  function zoomAt(cx, cy, factor){
    var rc = rect(); if (!rc.width) return;
    var px = (cx - rc.left) / rc.width, py = (cy - rc.top) / rc.height;
    var vx = view.x + px * view.w, vy = view.y + py * view.h;
    view.w = view.w / factor; clamp();
    view.x = vx - px * view.w; view.y = vy - py * view.h; clamp();
    apply();
  }
  function reset(){ view.x=base.x; view.y=base.y; view.w=base.w; view.h=base.h; apply(); }
  svg.addEventListener('wheel', function(e){ e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY<0?1.15:1/1.15); }, {passive:false});
  svg.addEventListener('dblclick', function(e){ e.preventDefault(); reset(); });
  ['gesturestart','gesturechange','gestureend'].forEach(function(ev){
    svg.addEventListener(ev, function(e){ e.preventDefault(); }, {passive:false});
  });
  svg.addEventListener('touchmove', function(e){ if (e.touches && e.touches.length>=2) e.preventDefault(); }, {passive:false});
  svg.addEventListener('pointerdown', function(e){
    pointers[e.pointerId] = { x:e.clientX, y:e.clientY };
    moved = false;
    var n = Object.keys(pointers).length;
    if (n===1) lastPan = { x:e.clientX, y:e.clientY };
    if (n===2) { pinchPrev = null; try { svg.setPointerCapture(e.pointerId); } catch(_){} }
  });
  svg.addEventListener('pointermove', function(e){
    if (!pointers[e.pointerId]) return;
    pointers[e.pointerId] = { x:e.clientX, y:e.clientY };
    var ids = Object.keys(pointers);
    if (ids.length >= 2) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      var dist = Math.hypot(a.x-b.x, a.y-b.y);
      if (pinchPrev) { zoomAt((a.x+b.x)/2, (a.y+b.y)/2, dist/pinchPrev); moved = true; mapDragging = true; }
      pinchPrev = dist;
    } else if (ids.length===1 && lastPan && zoomedIn()) {
      var dx = e.clientX-lastPan.x, dy = e.clientY-lastPan.y;
      if (!moved && (Math.abs(dx)>3 || Math.abs(dy)>3)) { moved = true; mapDragging = true; try { svg.setPointerCapture(e.pointerId); } catch(_){} }
      if (moved) {
        var rc = rect();
        view.x -= dx * (view.w / rc.width);
        view.y -= dy * (view.h / rc.height);
        clamp(); apply();
        lastPan = { x:e.clientX, y:e.clientY };
      }
    }
  });
  function endPointer(e){
    delete pointers[e.pointerId];
    var ids = Object.keys(pointers);
    if (ids.length < 2) pinchPrev = null;
    if (ids.length === 1) lastPan = { x:pointers[ids[0]].x, y:pointers[ids[0]].y };
    if (ids.length === 0) {
      lastPan = null;
      if (!moved) {
        var now = Date.now();
        if (now - lastTap < 300) { reset(); lastTap = 0; }
        else lastTap = now;
      }
      setTimeout(function(){ mapDragging = false; }, 50);
    }
  }
  svg.addEventListener('pointerup', endPointer);
  svg.addEventListener('pointercancel', endPointer);
  apply();
}

var MOVE_LBL = { walk:'徒歩', tram:'電車・トラム', car:'バス・車' };

function renderMapPage() {
  var host = document.getElementById('pane-map');
  var h = '<div class="ch-head"><div class="ch-eyebrow">AREA MAPS</div><div class="ch-h1">地図</div>' +
          '<div class="ch-sub">番号は訪問順。ピンをタップで詳細。ピンチで拡大・ダブルタップで戻る</div></div>';
  h += '<div class="area-tabs">' + AREA_ORDER.map(function(a){
    return '<button class="' + (a===currentArea?'on':'') + '" onclick="switchArea(\'' + a + '\')">' + AREA_LABEL[a] + '</button>';
  }).join('') + '</div>';
  var geo = MAP_GEO[currentArea];
  var spots = SPOTS.filter(function(s){ return s.area===currentArea; }).sort(function(a,b){ return a.order-b.order; });
  var pins = '';
  spots.forEach(function(s){
    var gi = SPOTS.indexOf(s);
    pins += '<g class="mp-pin' + (s.hot?' hot':'') + '" data-i="' + gi + '" data-cx="' + s.x + '" data-cy="' + s.y + '">' +
      '<circle class="mp-pin-bg" cx="' + s.x + '" cy="' + s.y + '" r="11"/>' +
      '<text class="mp-pin-num2" x="' + s.x + '" y="' + (s.y+0.5) + '">' + s.order + '</text></g>';
  });
  var defs = '<defs><linearGradient id="mpWater" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#c3e2ee"/><stop offset="1" stop-color="#a1cee0"/></linearGradient>' +
    '<linearGradient id="mpPark" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#d7ecca"/><stop offset="1" stop-color="#bfdcb0"/></linearGradient></defs>';
  h += '<div class="mapframe-wrap"><div class="mapframe"><div class="tape"></div>' +
       '<svg viewBox="' + geo.viewBox + '" xmlns="http://www.w3.org/2000/svg">' + defs + geo.bg + pins + '</svg></div></div>';
  h += '<div id="v2-map-note"></div>';
  h += '<div class="hours-note">営業時間は目安（現地時間で自動判定）。最新は公式で確認を</div>';
  h += '<div class="mlist">';
  spots.forEach(function(s){
    if (s.legMin) h += '<div class="ml-leg">↓ ' + (MOVE_LBL[s.move]||'徒歩') + ' 約' + s.legMin + '分</div>';
    h += '<div class="ml-row"><span class="ml-num">' + s.order + '</span><div class="ml-body">' +
      '<div class="ml-name">' + s.name + '</div>' +
      '<div class="ml-en">' + s.en[0] + '</div>' +
      '<div style="margin-top:3px"><span class="ml-day">' + s.day + '</span></div>' +
      '<div style="margin-top:3px">' + openStatus(s.name) + '</div>' +
      (s.tip ? '<div class="ml-tip">' + s.tip + '</div>' : '') + '</div>' +
      '<a class="ml-go" href="' + s.map + '" target="_blank" rel="noopener">MAP</a></div>';
  });
  h += '</div>';
  host.innerHTML = h;
  host.querySelectorAll('.mp-pin').forEach(function(g){
    g.addEventListener('click', function(e){
      e.stopPropagation();
      if (mapDragging) return;
      showMapNote(parseInt(g.getAttribute('data-i'), 10));
    });
  });
  var svg = host.querySelector('.mapframe svg');
  setupMapZoom(svg, geo.viewBox);
}
function switchArea(a){ currentArea = a; renderMapPage(); }
function showMapNote(i){
  var s = SPOTS[i]; var host = document.getElementById('v2-map-note');
  if (!s || !host) return;
  var acts = '<a href="' + s.map + '" target="_blank" rel="noopener">Google マップ</a>';
  if (s.web) acts += '<a class="web" href="' + s.web + '" target="_blank" rel="noopener">公式サイト</a>';
  host.innerHTML = '<div class="map-note"><button class="mn-close" onclick="closeMapNote()">×</button>' +
    '<div class="mn-name">' + s.order + '. ' + s.name + '</div>' +
    s.en.map(function(e){ return '<div class="mn-en">' + e + '</div>'; }).join('') +
    '<div><span class="mn-day">' + s.day + '</span></div>' +
    '<div style="margin-top:5px">' + openStatus(s.name) + '</div>' +
    (s.tip ? '<div class="mn-tip">' + s.tip + '</div>' : '') +
    '<div class="mn-actions">' + acts + '</div></div>';
}
function closeMapNote(){ var h = document.getElementById('v2-map-note'); if (h) h.innerHTML = ''; }
