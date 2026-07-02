/* =========================================================
 * trip.js — 旅のデータ（唯一のソース）
 * 内容の変更はこのファイルだけを編集する。見た目は index.html。
 * 書式:
 *   DAYS[n].sched  … 確定スケジュール（帳面の台帳に並ぶ）
 *   DAYS[n].picks  … 寄り道候補のキー（PICKSから引く。付箋で表示）
 *   hard:true      … 時間厳守（朱スタンプ表示）
 * ========================================================= */

var TRIP = {
  title: 'オーストラリアの七日間',
  range: '2026.9.20 SUN — 9.26 SAT',
  depart: '2026-09-20T18:40:00+09:00',

  flights: [
    { id:'JL773', kicker:'JAL INTERNATIONAL — OUTBOUND',
      name:'成田 → メルボルン', route:'NRT T2 18:40 → MEL T2 05:45(+1)',
      meta:'9/20（日）・約10時間05分・機中泊<br>エコノミー JAL Sky Wider・座席 51A / 51C',
      cut:{ label:'BOARD', big:'18:40', sub:'NRT T2' } },
    { id:'VA859', kicker:'VIRGIN AUSTRALIA — DOMESTIC',
      name:'メルボルン → シドニー', route:'MEL T3 16:00 → SYD T2 17:25',
      meta:'9/23（水）・1時間25分・直行<br>2名隣同士 座席確定・T3はヴァージン専用',
      cut:{ label:'BOARD', big:'16:00', sub:'MEL T3' } },
    { id:'JL52', kicker:'JAL INTERNATIONAL — INBOUND',
      name:'シドニー → 羽田', route:'SYD T1 08:55 → HND T3 17:45',
      meta:'9/26（土）・約9時間50分<br>プレミアムエコノミー・座席 17A / 17C',
      cut:{ label:'BOARD', big:'08:55', sub:'SYD T1' } }
  ],

  hotels: [
    { name:'InterContinental Melbourne The Rialto', jp:'インターコンチネンタル メルボルン ザ リアルト',
      addr:'495 Collins Street, Melbourne VIC 3000', tel:'+61 3 8627 1400',
      stay:'9/21（月）15:00 IN — 9/23（水）11:00 OUT・2泊',
      note:'クラシックルーム（キング1台）・朝食なし。19世紀ゴシック建築' },
    { name:'Rydges World Square', jp:'リッジス ワールド スクエア',
      addr:'389 Pitt Street, Sydney NSW 2000', tel:'+61 2 8268 1888',
      stay:'9/23（水）15:00 IN — 9/26（土）11:00 OUT・3泊',
      note:'エグゼクティブルーム（キング1台）・朝食付き。スーパーColes直結' }
  ],

  days: [
    { n:1, date:'9/20', wd:'日', title:'成田を発って、南半球へ',
      wx:{ t:'日本 20°C前後', note:'機内は冷える。羽織りを' },
      photo:'../assets/day1.jpg', cap:'いってきます — NRT 18:40発',
      voucher:null,
      sched:[
        { t:'15:30', h:'成田空港 第2ターミナル着', d:'JALカウンターでチェックイン・荷物預け・Wi-Fi受取' },
        { t:'18:40', h:'JL773 メルボルンへ出発', d:'約10時間。離陸後の機内食を終えたら睡眠モードへ' },
        { t:'夜', h:'機中泊', d:'アイマスク＋ノイキャンで睡眠確保。翌朝からの体力がここで決まる' }
      ],
      memo:'ETA（電子渡航許可）の申請は済んでいますか？ 機内に食品を持ち込むなら入国カードは申告「YES」——申告すれば没収だけで罰金なし。',
      picks:[] },

    { n:2, date:'9/21', wd:'月', title:'メルボルン到着、カフェの街へ',
      wx:{ t:'メルボルン 9–18°C', note:'天気が変わりやすい。羽織り＋折りたたみ傘' },
      photo:'../assets/day2.jpg', cap:'Hosier Lane — 日々変わる壁画の路地',
      voucher:null,
      sched:[
        { t:'5:45', h:'メルボルン空港 T2着・入国', d:'スマートゲート → 税関検疫。食品があれば申告レーン（YES）へ', hard:false },
        { t:'7:00', h:'Uberで市内へ', d:'約30分・$60〜70。荷物があるのでUberが楽' },
        { t:'7:45', h:'インターコンチに荷物預け', d:'チェックインは15時。身軽になって街へ' },
        { t:'8:15', h:'朝食 — Lune Croissanterie', d:'世界最高峰のクロワッサン。早朝到着の今だけ行列前に入れる' },
        { t:'10:00', h:'ブロック＆ロイヤル・アーケード', d:'19世紀の優雅なアーケードと床モザイク' },
        { t:'11:30', h:'ホージア・レーン', d:'壁一面のストリートアート路地。写真をたくさん' },
        { t:'13:00', h:'ランチ — Il Solito Posto', d:'Collins St東端・地下の隠れ家イタリアン' },
        { t:'15:00', h:'チェックイン＆仮眠（最重要）', d:'欲張って観光を続けないこと。1〜2時間眠る。明日からの体力はここで決まる' },
        { t:'18:00', h:'ディナー — Chin Chin', d:'モダンタイの人気店。予約不可の行列制だが回転は早い' },
        { t:'21:00', h:'ホテル帰着', d:'長旅の最初の夜。ゆっくり休んで' }
      ],
      memo:'検疫は「持っているか分からなければYES」が鉄則。フラットホワイト発祥の地——初日の一杯をぜひ。',
      picks:['ngv','hutong','patricia','brunetti','hardware','degraves'] },

    { n:3, date:'9/22', wd:'火', title:'マーケットと世界遺産と図書館',
      wx:{ t:'メルボルン 9–18°C', note:'朝晩冷える。重ね着で調整' },
      photo:'../assets/day3.jpg', cap:'State Library Victoria — ドームの閲覧室',
      voucher:null,
      sched:[
        { t:'8:30', h:'路地裏カフェでコーヒー', d:'Collins St沿いをぶらぶら。テイクアウトで街歩き' },
        { t:'9:30', h:'無料トラムで北へ', d:'City Circle Tram。CBD内は運賃無料' },
        { t:'10:00', h:'クイーンビクトリアマーケット', d:'南半球最大級の市場。名物ホット・ジャム・ドーナツ（火曜は6:00–15:00営業）' },
        { t:'11:30', h:'カールトン庭園・王立展示館', d:'世界遺産のドーム建築と春の並木道で記念写真' },
        { t:'12:30', h:'ビクトリア州立図書館', d:'荘厳なドーム閲覧室（無料）。上階ギャラリーからの見下ろしも必見' },
        { t:'13:00', h:'ランチ — フィッツロイ or CBD', d:'オープンエアのカフェか、CBDのビストロで' },
        { t:'15:00', h:'5つ星ホテルを満喫', d:'ラウンジ・プール・バスタブ。完全自由日の醍醐味' },
        { t:'18:00', h:'ディナー — Cumulus Inc.', d:'モダンオージーの人気店。ウォークインは早めの時間が狙い目' },
        { t:'21:00', h:'ホテル帰着', d:'明日は移動日。早めに就寝' }
      ],
      memo:'メルボルンは「1日で四季」の街。ウインドブレーカーをバッグに。',
      picks:['ngv','stkilda','brighton','cumulus','udon','lord','rolld','patricia','brunetti'] },

    { n:4, date:'9/23', wd:'水', title:'メルボルンの朝、シドニーの夜',
      wx:{ t:'シドニー 12–21°C', note:'日中は過ごしやすい陽気' },
      photo:'../assets/day4.jpg', cap:'Darling Harbour — シドニー最初の夜',
      voucher:null,
      sched:[
        { t:'9:00', h:'サウスメルボルンマーケット', d:'QVよりローカルでおしゃれ。デリと雑貨（水曜営業）' },
        { t:'11:00', h:'チェックアウト', d:'荷物を受け取ってUberのトランクへ' },
        { t:'11:30', h:'メルボルン最後のランチ', d:'フリンダーズ・レーンで締めの一皿' },
        { t:'13:30', h:'Uberで空港へ', d:'約35〜40分。余裕をもって' },
        { t:'14:15', h:'T3でチェックイン', d:'ヴァージン専用ターミナル。T4はJetstarなので注意', hard:false },
        { t:'16:00', h:'VA859 シドニーへ', d:'1時間25分のショートホップ' },
        { t:'17:25', h:'シドニー T2着 → 市内へ', d:'Uber約30分・$50〜65。電車ならAirport Link' },
        { t:'18:15', h:'リッジスにチェックイン', d:'直結のColesで水とTimTamを調達' },
        { t:'20:00', h:'ディナー — Ume Burger', d:'和風グルメバーガー。到着夜は気軽に（〜21:00）' },
        { t:'21:30', h:'サーキュラー・キーの夜景', d:'ライトアップされたオペラハウスとハーバーブリッジに初対面' }
      ],
      memo:'VA859が遅れたら夕食はColes調達で部屋ごはんに切替もOK。夜景は明日以降でも見られる——無理をしない。',
      picks:['chatthai','spice','chinatown','messina'] },

    { n:5, date:'9/24', wd:'木', title:'ブルーマウンテンズと動物たちの日',
      wx:{ t:'カトゥーンバ 5–14°C', note:'山は市内より5〜8°C低い。しっかり防寒' },
      photo:'../assets/day5.jpg', cap:'Three Sisters, Blue Mountains',
      voucher:{ kicker:'JTB DAY TOUR — VOUCHER', name:'世界遺産ブルーマウンテンズ＆動物園（日本語ガイド）',
        meta:'集合 <b>Hilton Sydney ロビー</b>（488 George St）<br>正面入って右手・フロント近くのソファーで待機',
        cut:{ label:'MEET', big:'8:25', sub:'AM SHARP' } },
      sched:[
        { t:'7:15', h:'起床・朝食', d:'ホテルの朝食を早めに' },
        { t:'8:10', h:'ホテル出発（徒歩10分）', d:'Pitt St北進 → Park St左折 → George St。QVBの斜向かい' },
        { t:'8:25', h:'ヒルトン ロビー集合', d:'8:30出発。遅刻するとツアーに乗れません', hard:true },
        { t:'9:15', h:'フェザーデール動物園', d:'コアラと記念撮影・カンガルーに餌やり（抱っこはNSW州で禁止）' },
        { t:'11:15', h:'カヒルズ ルックアウト', d:'断崖からジャミソン渓谷のパノラマ' },
        { t:'12:10', h:'シーニックワールド＋ランチ', d:'最大斜度52度のトロッコとガラス底ロープウェイ' },
        { t:'14:20', h:'エコーポイント展望台', d:'スリーシスターズの大展望' },
        { t:'15:00', h:'ルーラの街を散策', d:'標高985m。キャンディ店・雑貨・コーヒーブレイク' },
        { t:'17:30', h:'ホテル前で解散', d:'リッジスの目の前で降車。最高の移動効率' },
        { t:'19:00', h:'夕食はシンプルに', d:'疲れているのでワールドスクエア周辺でさくっと' }
      ],
      memo:'アラームは2つセット。薄手ダウンかウインドブレーカー必須。ランチはスパイスを避けてシンプルなものを。',
      picks:[] },

    { n:6, date:'9/25', wd:'金', title:'ハーバーの街を歩き尽くす最終日',
      wx:{ t:'シドニー 13–21°C', note:'散策日和。帽子と日焼け止めを' },
      photo:'../assets/day6.jpg', cap:'The Rocks — 金曜はマーケットの日',
      voucher:null,
      sched:[
        { t:'8:30', h:'朝食 — The Grounds of the City', d:'レトロで緑あふれる人気カフェ' },
        { t:'10:00', h:'植物園 → ミセス・マッコリーズ・ポイント', d:'オペラハウスと橋が重なるシドニー最高の一枚を' },
        { t:'11:30', h:'ロックス地区', d:'石畳の歴史地区。金曜はフーディー・マーケット開催' },
        { t:'13:00', h:'ランチ — The Glenmore ルーフトップ', d:'港を見下ろすシドニー最古級のパブ' },
        { t:'15:00', h:'QVBで本気のお土産', d:'T2の紅茶・Aesop・TimTam以外の一段上の土産をここで' },
        { t:'17:00', h:'ホテルに一時帰還', d:'荷物を置いて手ぶらで夜へ' },
        { t:'18:30', h:'ディナー — Opera Bar', d:'オペラハウス直下の絶景テラス。予約不要。最後の夜に乾杯' },
        { t:'22:00', h:'完全パッキング', d:'明日は早朝発。今夜のうちにスーツケースを仕上げる' }
      ],
      memo:'$300以上買った店のレシートは捨てない——空港でTRS（10%還付）に使う。品物はスーツケースの取り出しやすい位置へ。',
      picks:['manly','bondi','watsons','barangaroo','operatour','bourke','messina','singleo','grounds_alex','harrys','pancakes'] },

    { n:7, date:'9/26', wd:'土', title:'南十字星に手を振って、帰国',
      wx:{ t:'シドニー 13–21°C', note:'朝は冷える。一枚羽織って' },
      photo:'../assets/day7.jpg', cap:'また来るね、オーストラリア',
      voucher:null,
      sched:[
        { t:'5:30', h:'起床・最終チェック', d:'パスポート・財布・スマホ・充電器。忘れ物は枕元とバスルーム' },
        { t:'6:15', h:'チェックアウト → Uber', d:'空港まで約20分。早朝は道が空いている' },
        { t:'6:45', h:'T1 JALカウンター', d:'チェックイン後、TRS対象があれば保安検査後のカウンターへ' },
        { t:'8:55', h:'JL52 羽田へ', d:'約9時間50分。プレエコでゆったり' },
        { t:'17:45', h:'羽田 T3着', d:'Visit Japan Webで税関申告 → 荷物受取。おかえりなさい！' }
      ],
      memo:'余った豪ドルは日本の市中銀行の方がレート良し。空港両替は最小限に。',
      picks:[] }
  ]
};

/* 寄り道候補（付箋）。genre: sight=観光 / cafe=カフェ / food=たべる / view=絶景 */
var PICKS = {
  ngv:      { g:'sight', name:'NGV（ビクトリア国立美術館）', tip:'入場無料の大型美術館。雨天・時間調整の切り札', map:'https://maps.google.com/?q=National+Gallery+of+Victoria' },
  stkilda:  { g:'view', name:'セント・キルダ桟橋', tip:'日没後に野生のリトルペンギン。トラム96で30分', map:'https://maps.google.com/?q=St+Kilda+Pier+Melbourne' },
  brighton: { g:'view', name:'ブライトンのバスボックス', tip:'カラフルな海の家。晴れた午前が順光', map:'https://maps.google.com/?q=Brighton+Bathing+Boxes' },
  cumulus:  { g:'food', name:'Cumulus Inc.', tip:'朝〜夜まで使えるモダンオージー', map:'https://maps.google.com/?q=Cumulus+Inc+Melbourne' },
  hutong:   { g:'food', name:'HuTong Dumpling Bar', tip:'チャイナタウンの小籠包。サクッと点心', map:'https://maps.google.com/?q=HuTong+Dumpling+Bar+Melbourne' },
  udon:     { g:'food', name:'Udon Yasan', tip:'セルフ式讃岐うどん。手頃で早い', map:'https://maps.google.com/?q=Udon+Yasan+Melbourne' },
  lord:     { g:'food', name:'Lord of the Fries', tip:'プラントベースのバーガー＆フライ', map:'https://maps.google.com/?q=Lord+of+the+Fries+Melbourne' },
  rolld:    { g:'food', name:"Roll'd", tip:'バインミーとフォーを気軽に', map:"https://maps.google.com/?q=Roll'd+Melbourne+CBD" },
  patricia: { g:'cafe', name:'Patricia Coffee Brewers', tip:'立ち飲みの伝説的エスプレッソバー', map:'https://maps.google.com/?q=Patricia+Coffee+Brewers+Melbourne' },
  brunetti: { g:'cafe', name:'Brunetti', tip:'イタリアンカフェ。ケーキで休憩', map:'https://maps.google.com/?q=Brunetti+Melbourne' },
  hardware: { g:'cafe', name:'The Hardware Société', tip:'人気ブランチカフェ（Hardware Lane）', map:'https://maps.google.com/?q=The+Hardware+Societe+Melbourne' },
  degraves: { g:'cafe', name:'Degraves Street', tip:'路地カフェ街。トースティとコーヒー', map:'https://maps.google.com/?q=Degraves+Street+Melbourne' },
  manly:    { g:'view', name:'マンリー行きフェリー', tip:'乗船自体が絶景。往復だけでも価値あり', map:'https://maps.google.com/?q=Circular+Quay+Ferry+Wharf+Sydney' },
  bondi:    { g:'view', name:'ボンダイ→ブロンテ海岸ウォーク', tip:'2.5kmの絶景遊歩道。午前スタートで半日', map:'https://maps.google.com/?q=Bondi+Beach+Sydney' },
  watsons:  { g:'view', name:'ワトソンズベイ＆The Gap', tip:'フェリーで行ける断崖。夕日が見事', map:'https://maps.google.com/?q=The+Gap+Watsons+Bay+Sydney' },
  barangaroo:{ g:'sight', name:'バランガルー・リザーブ', tip:'ロックス隣の水辺エリア。散歩に', map:'https://maps.google.com/?q=Barangaroo+Reserve+Sydney' },
  operatour:{ g:'sight', name:'オペラハウス内部ツアー', tip:'建築の内側へ。要事前予約', map:'https://maps.google.com/?q=Sydney+Opera+House' },
  chatthai: { g:'food', name:'Chat Thai（ヘイマーケット）', tip:'賑わうタイ料理の定番', map:'https://maps.google.com/?q=Chat+Thai+Haymarket+Sydney' },
  harrys:   { g:'food', name:"Harry's Cafe de Wheels", tip:'名物ミートパイの屋台', map:'https://maps.google.com/?q=Harrys+Cafe+de+Wheels+Woolloomooloo' },
  pancakes: { g:'food', name:'Pancakes on the Rocks', tip:'甘い/食事系パンケーキ。入りやすい', map:'https://maps.google.com/?q=Pancakes+on+the+Rocks+Sydney' },
  spice:    { g:'food', name:'Spice Alley', tip:'屋台風アジアン横丁。食べ歩き', map:'https://maps.google.com/?q=Spice+Alley+Chippendale' },
  chinatown:{ g:'food', name:'チャイナタウン（Dixon St）', tip:'餃子・麺・BBQ。遅くまで営業', map:'https://maps.google.com/?q=Dixon+Street+Chinatown+Sydney' },
  bourke:   { g:'cafe', name:'Bourke Street Bakery', tip:'定番ベーカリー。ソーセージロール', map:'https://maps.google.com/?q=Bourke+Street+Bakery+Sydney' },
  messina:  { g:'cafe', name:'Gelato Messina', tip:'行列必至のジェラート。食後に', map:'https://maps.google.com/?q=Gelato+Messina+Sydney' },
  singleo:  { g:'cafe', name:'Single O（Surry Hills）', tip:'シドニー代表のスペシャルティコーヒー', map:'https://maps.google.com/?q=Single+O+Surry+Hills' },
  grounds_alex:{ g:'cafe', name:'The Grounds of Alexandria', tip:'庭園カフェの名店。CBDから15分', map:'https://maps.google.com/?q=The+Grounds+of+Alexandria+Sydney' }
};

/* 旅行前の準備（「いま」ページ用の抜粋。詳細は準備タブへ） */
var PREP_SOON = [
  { h:'ETA（電子渡航許可）を申請', d:'スマホアプリから。なければ入国不可' },
  { h:'たびレジ登録', d:'外務省の海外安全情報登録' },
  { h:'JTB最終日程表の受取', d:'出発7日前までにMyJTBへ届く → 現地緊急番号をしおりにメモ' },
  { h:'Uberアプリ＋クレカ登録', d:'日本で済ませておく' },
  { h:'Visit Japan Web登録', d:'帰国時の税関申告をスムーズに' }
];

var GENRE = {
  sight: { label:'観光',  cls:'g-sight' },
  cafe:  { label:'カフェ', cls:'g-cafe' },
  food:  { label:'たべる', cls:'g-food' },
  view:  { label:'絶景',  cls:'g-view' }
};
