/* ============ v2 map.js — 地図タブ（貼り込み地図＋番号ピン＋一覧） ============ */
/* データ・模式図・ズーム機構は現行アプリから移植。ピンは絵文字でなく訪問順の番号。 */

var SPOTS = [
  // MELBOURNE
  { area:'mel', name:'IC メルボルン ザ リアルト', en:['InterContinental Melbourne The Rialto','495 Collins Street, Melbourne'], day:'DAY 2・3 ホテル', map:'https://maps.google.com/?q=495+Collins+Street+Melbourne', web:'https://www.ihg.com/intercontinental/hotels/gb/en/melbourne/melha/hoteldetail', x:90, y:246, order:1, lat:-37.81825, lng:144.95799, hot:true, tip:'Collins St西端の歴史的建築ホテル' },
  { area:'mel', name:'Lune Croissanterie CBD', en:['Flinders Lane, Melbourne'], day:'DAY 2 朝食', map:'https://maps.google.com/?q=Lune+Croissanterie+CBD+Melbourne', web:'https://www.lunecroissanterie.com/', x:208, y:243, order:2, lat:-37.81555, lng:144.96883, move:'walk', legMin:10, tip:'世界一とも称されるクロワッサン。開店直後が狙い目' },
  { area:'mel', name:'ホージア・レーン', en:['Hosier Lane, Melbourne'], day:'DAY 2 観光（無料）', map:'https://maps.google.com/?q=Hosier+Lane+Melbourne', x:192, y:283, order:3, lat:-37.81636, lng:144.96908, move:'walk', legMin:5, tip:'ストリートアートの路地。絵柄は日々変化' },
  { area:'mel', name:'ブロック・アーケード', en:['282 Collins Street, Melbourne'], day:'DAY 2 観光', map:'https://maps.google.com/?q=Block+Arcade+Melbourne', web:'https://www.theblockarcade.com.au/', x:172, y:246, order:4, lat:-37.81558, lng:144.96433, move:'walk', legMin:4, tip:'1890年代のアーケード。床モザイクとHopetoun Tea Rooms' },
  { area:'mel', name:'Il Solito Posto', en:['113 Collins Street（地下）, Melbourne'], day:'DAY 2 ランチ', map:'https://maps.google.com/?q=Il+Solito+Posto+Melbourne', web:'https://ilsolitoposto.com.au/', x:258, y:245, order:5, lat:-37.8131, lng:144.9725, move:'walk', legMin:9, tip:'老舗イタリアン。地下の隠れ家ビストロ' },
  { area:'mel', name:'Chin Chin', en:['125 Flinders Lane, Melbourne'], day:'DAY 2 ディナー（ウォークイン）', map:'https://maps.google.com/?q=Chin+Chin+Flinders+Lane+Melbourne', web:'https://chinchin.melbourne/', x:218, y:267, order:6, lat:-37.81569, lng:144.97042, move:'walk', legMin:6, tip:'モダンタイ。17:30の早め入りで待ちが短い。辛さ調整可' },
  { area:'mel', name:'クイーンビクトリアマーケット', en:['Queen St & Victoria St, Melbourne'], day:'DAY 3 観光（火曜営業）', map:'https://maps.google.com/?q=Queen+Victoria+Market+Melbourne', web:'https://qvm.com.au/', x:139, y:91, order:7, lat:-37.80739, lng:144.95739, move:'tram', legMin:12, tip:'南半球最大級の市場。月・水休み' },
  { area:'mel', name:'カールトン庭園・王立展示館', en:['Carlton Gardens, Carlton'], day:'DAY 3 観光（世界遺産）', map:'https://maps.google.com/?q=Carlton+Gardens+Melbourne', web:'https://museumsvictoria.com.au/reb/', x:250, y:86, order:8, lat:-37.80467, lng:144.97147, move:'walk', legMin:13, tip:'世界遺産の王立展示館と庭園' },
  { area:'mel', name:'ビクトリア州立図書館', en:['328 Swanston St, Melbourne'], day:'DAY 3 観光（無料）', map:'https://maps.google.com/?q=State+Library+Victoria+Melbourne', web:'https://www.slv.vic.gov.au/', x:175, y:172, order:9, lat:-37.80977, lng:144.96554, move:'tram', legMin:10, tip:'荘厳なドーム閲覧室。上階ギャラリーも必見' },
  // SYDNEY CBD
  { area:'syd', name:'リッジス ワールド スクエア', en:['Rydges World Square — 389 Pitt Street'], day:'DAY 4〜6 ホテル', map:'https://maps.google.com/?q=389+Pitt+Street+Sydney', web:'https://www.rydges.com/accommodation/sydney-nsw/world-square-sydney-cbd/', x:152, y:212, order:1, lat:-33.87715, lng:151.20755, hot:true, tip:'CBD中心の好立地。Coles直結' },
  { area:'syd', name:'Ume Burger', en:['Darling Square — 35 Tumbalong Blvd'], day:'DAY 4 ディナー（気軽）', map:'https://maps.google.com/?q=Ume+Burger+Darling+Square+Sydney', web:'https://umeburger.com/', x:88, y:178, order:2, lat:-33.87834, lng:151.20213, move:'walk', legMin:12, tip:'和風グルメバーガー。貝なしでOK' },
  { area:'syd', name:'ヒルトン シドニー（ツアー集合）', en:['Hilton Sydney — 488 George Street'], day:'DAY 5 集合 8:25（5分前厳守）', map:'https://maps.google.com/?q=Hilton+Sydney+488+George+Street', x:150, y:166, order:3, lat:-33.87182, lng:151.2076, move:'walk', legMin:9, hot:true, tip:'DAY5集合場所。8:25・5分前厳守！' },
  { area:'syd', name:'The Grounds of the City', en:['500 George Street, Sydney'], day:'DAY 6 朝食', map:'https://maps.google.com/?q=The+Grounds+of+the+City+Sydney', web:'https://thegrounds.com.au/', x:126, y:156, order:4, lat:-33.87264, lng:151.20761, move:'walk', legMin:2, tip:'緑あふれる人気カフェ' },
  { area:'syd', name:'ロイヤルボタニカルガーデン', en:['Mrs Macquaries Rd, Sydney'], day:'DAY 6 観光（無料）', map:'https://maps.google.com/?q=Royal+Botanic+Garden+Sydney', web:'https://www.rbgsyd.nsw.gov.au/', x:228, y:104, order:5, lat:-33.86277, lng:151.21571, move:'walk', legMin:15, tip:'湾沿いの広大な植物園。入園無料' },
  { area:'syd', name:'ミセス・マッコリーズ・ポイント', en:['Mrs Macquaries Point, Sydney'], day:'DAY 6 絶景フォト（無料）', map:'https://maps.google.com/?q=Mrs+Macquaries+Point+Sydney', x:252, y:62, order:6, lat:-33.85971, lng:151.22257, move:'walk', legMin:10, tip:'オペラハウス＋橋を一望の定番フォトスポット' },
  { area:'syd', name:'ロックス地区', en:['The Rocks, Sydney'], day:'DAY 6 観光', map:'https://maps.google.com/?q=The+Rocks+Sydney', web:'https://www.therocks.com/', x:122, y:76, order:7, lat:-33.85847, lng:151.2083, move:'walk', legMin:22, tip:'石畳の歴史地区。金曜はマーケット' },
  { area:'syd', name:'The Glenmore Hotel', en:['96 Cumberland Street, The Rocks'], day:'DAY 6 ランチ', map:'https://maps.google.com/?q=The+Glenmore+Hotel+The+Rocks+Sydney', web:'https://www.theglenmore.com.au/', x:100, y:58, order:8, lat:-33.85982, lng:151.20677, move:'walk', legMin:3, tip:'ルーフトップから港とオペラハウス' },
  { area:'syd', name:'クイーンビクトリアビルディング', en:['455 George Street, Sydney'], day:'DAY 6 ショッピング', map:'https://maps.google.com/?q=Queen+Victoria+Building+Sydney', web:'https://www.qvb.com.au/', x:124, y:182, order:9, lat:-33.87144, lng:151.20667, move:'walk', legMin:16, tip:'壮麗な歴史的アーケード。土産の本気買いはここ' },
  { area:'syd', name:'Opera Bar', en:['Lower Concourse, Sydney Opera House'], day:'DAY 6 ディナー（予約不要）', map:'https://maps.google.com/?q=Opera+Bar+Sydney', web:'https://operabar.com.au/', x:188, y:54, order:10, lat:-33.8578, lng:151.2142, move:'walk', legMin:16, tip:'オペラハウス直下の絶景テラス。最後の夜に' },
  { area:'syd', name:'シドニー空港 T1', en:['Sydney Airport T1 International'], day:'DAY 7 出発', map:'https://maps.google.com/?q=Sydney+Airport+Terminal+1+International', web:'https://www.sydneyairport.com.au/', x:150, y:372, order:11, lat:-33.93497, lng:151.16587, move:'tram', legMin:20, tip:'T1国際線。市内から約20分' },
  // BLUE MOUNTAINS
  { area:'blue', name:'フェザーデール動物園', en:['217 Kildare Rd, Doonside'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Featherdale+Wildlife+Park+Doonside', web:'https://www.featherdale.com.au/', x:205, y:150, order:1, lat:-33.76584, lng:150.88427, tip:'コアラ・カンガルーと触れ合える' },
  { area:'blue', name:'シーニックワールド', en:['Cliff Drive, Katoomba'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Scenic+World+Katoomba', web:'https://www.scenicworld.com.au/', x:66, y:156, order:2, lat:-33.72895, lng:150.30126, move:'car', legMin:70, tip:'世界一急勾配のトロッコと渓谷ロープウェイ' },
  { area:'blue', name:'エコーポイント展望台', en:['Echo Point Lookout, Katoomba'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Echo+Point+Lookout+Katoomba', x:82, y:176, order:3, lat:-33.7322, lng:150.312, move:'car', legMin:8, tip:'スリーシスターズを望む大展望台' },
  { area:'blue', name:'ルーラ', en:['Leura Mall, Leura'], day:'DAY 5 ツアー', map:'https://maps.google.com/?q=Leura+Mall+NSW', x:122, y:160, order:4, lat:-33.71455, lng:150.33055, move:'car', legMin:10, tip:'山あいの可愛い街。カフェと雑貨' }
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

/* ---- Googleマップ（任意）。APIキーは公開リポジトリに置かず、URLの #key= で一度渡して端末に記憶する ---- */
function gmapKey(){ try { return localStorage.getItem('gmaps_key') || ''; } catch(e){ return ''; } }
var gmapMode = 'auto';   /* 'auto' | 'svg'（利用者が模式図を選んだ）。読み込み失敗時は一時的に svg */
try { gmapMode = localStorage.getItem('map_mode_v1') || 'auto'; } catch(e){}
function gmapWanted(){ return !!gmapKey() && navigator.onLine !== false && gmapMode !== 'svg'; }
function setMapMode(m){ gmapMode = m; try { localStorage.setItem('map_mode_v1', m); } catch(e){} renderMapPage(); }
/* 貼り付け欄からキーを取り出して記憶（リンクごと貼ってもよい） */
function saveGmapKey(){
  var el = document.getElementById('gkey-in'); if (!el) return;
  var m = /([A-Za-z0-9_\-]{30,})/.exec(el.value || '');
  if (!m) { el.placeholder = 'キーが見つかりません。リンク全体を貼ってください'; el.value = ''; return; }
  try { localStorage.setItem('gmaps_key', m[1]); } catch(e){}
  gmapMode = 'auto'; try { localStorage.setItem('map_mode_v1', 'auto'); } catch(e){}
  renderMapPage();
}
var gmapLoading = null, gmapObj = null, gmapMe = null;
function loadGmaps(){
  if (window.google && google.maps) return Promise.resolve();
  if (gmapLoading) return gmapLoading;
  gmapLoading = new Promise(function(res, rej){
    window.__tabiGmapsReady = function(){ res(); };
    /* 認証エラーはスクリプト読込後に来ることがあるので、Promiseの結果に関わらず模式図へ戻す */
    window.gm_authFailure = function(){ gmapLoading = null; gmapFail('Googleマップの認証に失敗しました（キーの制限）'); rej(new Error('auth')); };
    var sc = document.createElement('script');
    sc.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(gmapKey()) + '&callback=__tabiGmapsReady&language=ja&region=AU&v=weekly&loading=async';
    sc.async = true;
    sc.onerror = function(){ gmapLoading = null; sc.remove(); rej(new Error('地図を読み込めませんでした（電波を確認）')); };
    document.head.appendChild(sc);
  });
  return gmapLoading;
}
/* 手帳の紙色に寄せた配色。店やホテルの色付きアイコンは消し、駅は残す */
var GMAP_STYLE = [
  { elementType:'geometry', stylers:[{ color:'#EFE9DC' }] },
  { elementType:'labels.text.fill', stylers:[{ color:'#3F3A33' }] },
  { elementType:'labels.text.stroke', stylers:[{ color:'#FFFDF7' }, { weight:2 }] },
  { featureType:'water', elementType:'geometry', stylers:[{ color:'#C9DDE6' }] },
  { featureType:'landscape.natural', elementType:'geometry', stylers:[{ color:'#E8E2D0' }] },
  { featureType:'poi.park', elementType:'geometry', stylers:[{ color:'#D8E3C4' }] },
  { featureType:'poi', elementType:'labels.icon', stylers:[{ visibility:'off' }] },
  { featureType:'road', elementType:'geometry', stylers:[{ color:'#FFFDF7' }] },
  { featureType:'road', elementType:'geometry.stroke', stylers:[{ color:'#D8CDB8' }] },
  { featureType:'road.arterial', elementType:'geometry', stylers:[{ color:'#F3E6C6' }] },
  { featureType:'road.highway', elementType:'geometry', stylers:[{ color:'#EAD7A8' }] },
  { featureType:'road.highway', elementType:'labels.icon', stylers:[{ visibility:'off' }] },
  { featureType:'transit.line', elementType:'geometry', stylers:[{ color:'#9AA0A6' }, { weight:1.2 }] },
  { featureType:'transit.station', elementType:'labels.icon', stylers:[{ saturation:-40 }] }
];
/* トイレ・水の地点（作法帖の実地リスト＋DAYの動線上）。Googleマップ表示時だけ重ねる */
var AMENITIES = [
  { area:'mel', kind:'wc', name:'公衆トイレ（Swanston×Collins角）', lat:-37.8159, lng:144.9666, tip:'広くてきれい。CBD歩きの基点' },
  { area:'mel', kind:'wc', name:'ビクトリア州立図書館', lat:-37.80977, lng:144.96554, tip:'Swanston St側の正面から。館内はきれい' },
  { area:'mel', kind:'wc', name:'MYER地下（Bourke St Mall）', lat:-37.81345, lng:144.96384, tip:'ブロックアーケード（コード式）の前にここで' },
  { area:'mel', kind:'wc', name:'Melbourne Central', lat:-37.81, lng:144.96257, tip:'雨の日の逃げ先にも' },
  { area:'mel', kind:'wc', name:'QVM（Queen St側）', lat:-37.80739, lng:144.95739, tip:'市場内。DAY3の最初に' },
  { area:'mel', kind:'wc', name:'サザンクロス駅', lat:-37.81919, lng:144.9534, tip:'SkyBusを降りたら' },
  { area:'mel', kind:'wc', name:'フリンダース・ストリート駅', lat:-37.81842, lng:144.96648, tip:'改札の外側にもある' },
  { area:'mel', kind:'water', name:'Coles Central（Elizabeth St）', lat:-37.8175, lng:144.9653, tip:'水・ヨーグルト・朝食。セルフレジ' },
  { area:'syd', kind:'water', name:'Coles（リッジス地下）', lat:-33.87715, lng:151.20755, tip:'ホテル直結。水は前夜にここで' },
  { area:'syd', kind:'wc', name:'World Square', lat:-33.87764, lng:151.20603, tip:'ホテル真下。Pie Faceもここ' },
  { area:'syd', kind:'wc', name:'QVB', lat:-33.87144, lng:151.20667, tip:'きれいで無料。買い物の前後に' },
  { area:'syd', kind:'wc', name:'Westfield Sydney（Pitt St Mall）', lat:-33.87029, lng:151.2076, tip:'ヒルトンの向かい' },
  { area:'syd', kind:'wc', name:'ヒルトン シドニー ロビー', lat:-33.87182, lng:151.2076, tip:'DAY5の集合前に' },
  { area:'syd', kind:'wc', name:'サーキュラー・キー駅', lat:-33.86136, lng:151.21072, tip:'フェリー乗り場の並び' },
  { area:'syd', kind:'wc', name:'オペラハウス（館内）', lat:-33.8572, lng:151.21512, tip:'無料。DAY6の散歩の途中に' },
  { area:'syd', kind:'wc', name:'王立植物園（園内）', lat:-33.86277, lng:151.21571, tip:'入口の案内板で場所を確認' },
  { area:'syd', kind:'wc', name:'ハイドパーク', lat:-33.87162, lng:151.21151, tip:'公園内の公衆トイレ' },
  { area:'syd', kind:'wc', name:'ダーリングハーバー（Tumbalong Park）', lat:-33.8756, lng:151.2015, tip:'Ume Burgerの近く' },
  { area:'syd', kind:'wc', name:'セントラル駅', lat:-33.88399, lng:151.20634, tip:'' },
  { area:'syd', kind:'wc', name:'Museum駅', lat:-33.87573, lng:151.2101, tip:'ホテルの最寄り駅' },
  { area:'blue', kind:'wc', name:'フェザーデール（入口）', lat:-33.76584, lng:150.88427, tip:'園に入ってすぐ' },
  { area:'blue', kind:'wc', name:'シーニックワールド', lat:-33.72895, lng:150.30126, tip:'山で一番きれい。昼食のついでに' },
  { area:'blue', kind:'wc', name:'エコーポイント案内所', lat:-33.7319, lng:150.3123, tip:'展望台のすぐ横' },
  { area:'blue', kind:'wc', name:'ルーラ・モール（公衆トイレ）', lat:-33.71455, lng:150.33055, tip:'モールの端' }
];
var gmapLayers = { picks:true, amen:true };
try { var _gl = JSON.parse(localStorage.getItem('map_layers_v1') || 'null'); if (_gl) gmapLayers = _gl; } catch(e){}
var gmapLayerPins = { picks:[], amen:[] };
function pickArea(p){ return p.lat < -36 ? 'mel' : (p.lng < 151 ? 'blue' : 'syd'); }
function toggleLayer(k){
  gmapLayers[k] = !gmapLayers[k];
  try { localStorage.setItem('map_layers_v1', JSON.stringify(gmapLayers)); } catch(e){}
  gmapLayerPins[k].forEach(function(pin){ pin.setMap(gmapLayers[k] ? gmapObj : null); });
  var b = document.querySelector('.glayers button[data-l="' + k + '"]'); if (b) b.classList.toggle('on', gmapLayers[k]);
}
function addLayerPins(){
  var C = gpinClass();
  gmapLayerPins = { picks:[], amen:[] };
  Object.keys(PICKS).forEach(function(k){
    var p = PICKS[k]; if (p.lat == null || pickArea(p) !== currentArea) return;
    gmapLayerPins.picks.push(new C(gmapLayers.picks ? gmapObj : null, { kind:'pick', key:k, g:p.g, lat:p.lat, lng:p.lng }, -1));
  });
  AMENITIES.forEach(function(a, i){
    if (a.area !== currentArea) return;
    gmapLayerPins.amen.push(new C(gmapLayers.amen ? gmapObj : null, { kind:a.kind, ai:i, lat:a.lat, lng:a.lng }, -1));
  });
}
function showPickNote(k){
  var p = PICKS[k]; var host = document.getElementById('v2-map-note'); if (!p || !host) return;
  var g = GENRE[p.g] || { label:'' };
  host.innerHTML = '<div class="map-note"><button class="mn-close" onclick="closeMapNote()">×</button>' +
    '<div class="mn-name">' + p.name + '</div>' +
    '<div><span class="mn-day">寄り道の付箋・' + g.label + '</span></div>' +
    (p.tip ? '<div class="mn-tip">' + p.tip + '</div>' : '') +
    '<div class="mn-actions"><a href="' + p.map + '" target="_blank" rel="noopener">Google マップ</a></div></div>';
}
function showAmenNote(i){
  var a = AMENITIES[i]; var host = document.getElementById('v2-map-note'); if (!a || !host) return;
  host.innerHTML = '<div class="map-note"><button class="mn-close" onclick="closeMapNote()">×</button>' +
    '<div class="mn-name">' + a.name + '</div>' +
    '<div><span class="mn-day">' + (a.kind === 'water' ? '水・買い出し' : 'トイレ') + '</span></div>' +
    (a.tip ? '<div class="mn-tip">' + a.tip + '</div>' : '') +
    '<div class="mn-actions"><a href="https://maps.google.com/?q=' + a.lat + ',' + a.lng + '" target="_blank" rel="noopener">Google マップ</a></div></div>';
}

/* 番号ピン（HTMLオーバーレイ）。模式図のピンと同じ見た目・同じ番号。kind: spot(既定)/pick/wc/water/me */
var GPin = null;
function gpinClass(){
  if (GPin) return GPin;
  GPin = function(map, s, idx){ this.s = s; this.idx = idx; this.setMap(map); };
  GPin.prototype = new google.maps.OverlayView();
  GPin.prototype.onAdd = function(){
    var el = document.createElement('div'), s = this.s, k = s.kind || 'spot';
    el.className = 'gpin' + (k === 'spot' ? (s.hot ? ' hot' : '') : ' gp-' + k + (s.g ? ' g-' + s.g : '')) + (s.me ? ' me' : '');
    el.textContent = s.me ? '' : (k === 'spot' ? s.order : (k === 'wc' ? 'WC' : (k === 'water' ? '水' : '')));
    var self = this;
    if (!s.me) el.addEventListener('click', function(e){
      e.stopPropagation();
      if (k === 'spot') showMapNote(self.idx); else if (k === 'pick') showPickNote(s.key); else showAmenNote(s.ai);
    });
    this.el = el;
    this.getPanes().overlayMouseTarget.appendChild(el);
  };
  GPin.prototype.draw = function(){
    var q = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.s.lat, this.s.lng));
    if (q) { this.el.style.left = q.x + 'px'; this.el.style.top = q.y + 'px'; }
  };
  GPin.prototype.onRemove = function(){ if (this.el) this.el.remove(); };
  return GPin;
}
function gmapMsg(t){ var m = document.getElementById('gmap-msg'); if (m) m.textContent = t; }
/* 読み込み・認証に失敗したら、理由を1.8秒見せてから模式図に切り替える（設定は変えない） */
var gmapFailing = false;
function gmapFail(t){
  if (gmapFailing) return; gmapFailing = true;
  var el = document.getElementById('gmap');
  if (el) { el.innerHTML = '<div class="gmap-msg" id="gmap-msg"></div>'; gmapMsg(t + '。模式図に切り替えます'); }
  setTimeout(function(){ gmapFailing = false; gmapMode = 'svg-temp'; renderMapPage(); gmapMode = 'auto'; }, 1800);
}
function initGmap(spots){
  var el = document.getElementById('gmap'); if (!el) return;
  loadGmaps().then(function(){
    var m = document.getElementById('gmap-msg'); if (m) m.remove();
    gmapObj = new google.maps.Map(el, {
      center:{ lat:spots[0].lat, lng:spots[0].lng }, zoom:14, styles:GMAP_STYLE,
      disableDefaultUI:true, zoomControl:true, fullscreenControl:true, gestureHandling:'cooperative',
      clickableIcons:false, mapTypeControl:false, keyboardShortcuts:false
    });
    var C = gpinClass();
    spots.forEach(function(s){ new C(gmapObj, s, SPOTS.indexOf(s)); });
    addLayerPins();
    /* 訪問順の線。徒歩はGoogleの経路で道なりに（取れなければ直線）、電車・車は薄い直線 */
    var dots = { path:google.maps.SymbolPath.CIRCLE, fillColor:'#5E564A', fillOpacity:.9, strokeOpacity:0, scale:2 };
    function drawDots(path){
      new google.maps.Polyline({ map:gmapObj, path:path, strokeColor:'#FFFDF7', strokeOpacity:.9, strokeWeight:6, zIndex:1 });
      new google.maps.Polyline({ map:gmapObj, path:path, strokeOpacity:0, icons:[{ icon:dots, offset:'0', repeat:'9px' }], zIndex:2 });
    }
    for (var i = 1; i < spots.length; i++) (function(a, b){
      var straight = [{ lat:a.lat, lng:a.lng }, { lat:b.lat, lng:b.lng }];
      if (b.move === 'walk' && google.maps.DirectionsService) {
        try {
          new google.maps.DirectionsService().route({ origin:straight[0], destination:straight[1], travelMode:'WALKING' }, function(r, st){
            drawDots(st === 'OK' && r.routes[0] ? r.routes[0].overview_path : straight);
          });
        } catch(e){ drawDots(straight); }
      } else if (b.move === 'walk') {
        drawDots(straight);
      } else {
        new google.maps.Polyline({ map:gmapObj, path:straight, strokeColor:'#5E564A', strokeOpacity:.35, strokeWeight:1.5, zIndex:1 });
      }
    })(spots[i-1], spots[i]);
    var bounds = new google.maps.LatLngBounds();
    spots.forEach(function(s){ bounds.extend({ lat:s.lat, lng:s.lng }); });
    gmapObj.fitBounds(bounds, { top:36, bottom:30, left:30, right:30 });
    google.maps.event.addListenerOnce(gmapObj, 'idle', function(){ if (gmapObj.getZoom() > 16) gmapObj.setZoom(16); });
  }).catch(function(e){
    if (e && e.message === 'auth') return; /* gm_authFailure 側で処理済み */
    gmapFail(e && e.message ? e.message : '地図を表示できません');
  });
}
/* 現在地：青い点を置いて寄る。許可されない時はその旨だけ */
function gmapLocate(){
  if (!gmapObj || !navigator.geolocation) return;
  var b = document.getElementById('gmap-loc'); if (b) b.textContent = '取得中…';
  navigator.geolocation.getCurrentPosition(function(pos){
    var p = { lat:pos.coords.latitude, lng:pos.coords.longitude, me:true };
    if (gmapMe) gmapMe.setMap(null);
    var C = gpinClass(); gmapMe = new C(gmapObj, p, -1);
    gmapObj.panTo(p); if (gmapObj.getZoom() < 15) gmapObj.setZoom(15);
    if (b) b.textContent = '現在地';
  }, function(){ if (b) { b.textContent = '位置情報が許可されていません'; setTimeout(function(){ b.textContent = '現在地'; }, 2500); } },
  { enableHighAccuracy:true, timeout:10000, maximumAge:30000 });
}

var MOVE_LBL = { walk:'徒歩', tram:'電車・トラム', car:'バス・車' };

function renderMapPage() {
  var host = document.getElementById('pane-map');
  var h = '<div class="ch-head"><div class="ch-eyebrow">AREA MAPS</div><div class="ch-h1">地図</div>' +
          '<div class="ch-sub">番号は訪問順。ピンをタップで詳細</div></div>';
  h += '<div class="area-tabs">' + AREA_ORDER.map(function(a){
    return '<button class="' + (a===currentArea?'on':'') + '" onclick="switchArea(\'' + a + '\')">' + AREA_LABEL[a] + '</button>';
  }).join('') + '</div>';
  var geo = MAP_GEO[currentArea];
  var spots = SPOTS.filter(function(s){ return s.area===currentArea; }).sort(function(a,b){ return a.order-b.order; });
  var useG = gmapWanted() && gmapMode !== 'svg-temp';
  if (gmapKey()) {
    h += '<div class="area-tabs gmode"><button class="' + (useG?'on':'') + '" onclick="setMapMode(\'auto\')">Googleマップ</button>' +
         '<button class="' + (useG?'':'on') + '" onclick="setMapMode(\'svg\')">模式図</button></div>';
  } else {
    h += '<div class="gkey"><div class="sec-hint">Googleマップで見るには、有効化リンクかキーを貼り付けて保存（ホーム画面版は別途一度だけ）。オフラインでは模式図。</div>' +
         '<div class="gkey-row"><input class="gkey-in" id="gkey-in" type="text" placeholder="有効化リンクかキーを貼り付け" autocapitalize="off" autocorrect="off" spellcheck="false">' +
         '<button type="button" class="only-left" onclick="saveGmapKey()">保存</button></div></div>';
  }
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
  if (useG) {
    h += '<div class="mapframe-wrap"><div class="mapframe gm"><div class="tape"></div>' +
         '<div class="gmap" id="gmap"><div class="gmap-msg" id="gmap-msg">地図を読み込み中…</div></div>' +
         '<button type="button" class="gmap-loc" id="gmap-loc" onclick="gmapLocate()">現在地</button></div></div>';
    h += '<div class="area-tabs glayers"><button type="button" class="' + (gmapLayers.picks?'on':'') + '" data-l="picks" onclick="toggleLayer(\'picks\')">寄り道の付箋</button>' +
         '<button type="button" class="' + (gmapLayers.amen?'on':'') + '" data-l="amen" onclick="toggleLayer(\'amen\')">トイレ・水</button></div>';
    h += '<div class="map-hint">小さい色ピン＝寄り道（黄:カフェ／橙:たべる／緑:観光／青:絶景）、WC＝トイレ、水＝Coles。番号は確定の予定。2本指で移動・右上で全画面</div>';
  } else {
    h += '<div class="mapframe-wrap"><div class="mapframe"><div class="tape"></div>' +
         '<svg viewBox="' + geo.viewBox + '" xmlns="http://www.w3.org/2000/svg">' + defs + geo.bg + pins + '</svg></div></div>';
    h += '<div class="map-hint">ピンチで拡大・ダブルタップで戻る</div>';
  }
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
      '<a class="ml-go" href="' + s.map + '" target="_blank" rel="noopener">地図で開く</a></div>';
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
  if (useG) { initGmap(spots); }
  else { setupMapZoom(host.querySelector('.mapframe svg'), geo.viewBox); }
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
