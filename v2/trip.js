/* =========================================================
 * trip.js — 旅のデータ（唯一のソース）
 * 内容の変更はこのファイルだけを編集する。見た目は index.html。
 * 書式:
 *   DAYS[n].sched  … 確定スケジュール（帳面の台帳に並ぶ）
 *   DAYS[n].picks  … 寄り道候補のキー（PICKSから引く。付箋で表示）
 *   行のオプション:
 *     hard:true    … 時間厳守（朱スタンプ）
 *     map/web      … Googleマップ/公式リンク（展開時にボタン表示）
 *     steps:[...]  … 手順ガイド（タップで展開）
 *     tips:[...]   … 補足。「注意｜」で始めると赤字
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
        { t:'15:30', h:'成田空港 第2ターミナル着', d:'JALカウンターでチェックイン・荷物預け・Wi-Fi受取',
          map:'https://maps.google.com/?q=Narita+International+Airport+Terminal+2', web:'https://www.narita-airport.jp/',
          steps:[
            '第2ターミナル出発ロビー（2F）の「JAL国際線チェックインカウンター」へ。中央エリアに大きな表示あり',
            'パスポートと予約確認メール（QRコード）を提示してチェックイン・荷物預け',
            'Wi-Fiルーター等の受取があれば同フロアの受取カウンターへ',
            '出国審査 → 保安検査の順で通過',
            '搭乗開始30分前を目安にゲートへ' ],
          tips:[
            '液体物は100ml以下の容器＋透明袋1枚に。取り出しやすい場所へ',
            'PC・タブレットは保安検査でカバンから出す',
            '機内に食品を持ち込むなら入国カードの「食品あり（YES）」に記入' ] },
        { t:'18:40', h:'JL773 メルボルンへ出発', d:'約10時間。いよいよオーストラリアへ！' },
        { t:'夜', h:'機中泊 — 睡眠が翌日の体力を決める', d:'アイマスク＋ノイキャンで5〜6時間の睡眠を確保',
          steps:[
            '離陸後すぐスマホ・時計をメルボルン時間（日本+1時間）に変更',
            '機内食のあと歯を磨いてすぐ睡眠モードへ',
            'アイマスク・耳栓・ネックピローで5〜6時間の睡眠を確保',
            '到着1.5時間前に起床して軽食',
            '着陸前に入国カード（機内配布）を記入' ],
          tips:[
            'シートはJAL Sky Wider。エコノミーでも広め',
            '注意｜食品を持ち込む場合は必ず入国カードに申告。申告すれば没収のみで罰金なし' ] }
      ],
      memo:'ETA（電子渡航許可）の申請は済んでいますか？ 検疫は「迷ったらYES申告」が鉄則です。',
      picks:[] },

    { n:2, date:'9/21', wd:'月', title:'メルボルン到着、カフェの街へ',
      wx:{ t:'メルボルン 9–18°C', note:'天気が変わりやすい。羽織り＋折りたたみ傘' },
      photo:'../assets/day2.jpg', cap:'Hosier Lane — 日々変わる壁画の路地',
      voucher:null,
      sched:[
        { t:'5:45', h:'メルボルン空港 T2着・入国／検疫', d:'スマートゲート → 荷物受取 → 食品があれば申告レーン（YES）へ',
          map:'https://maps.google.com/?q=Melbourne+Airport+Terminal+2', web:'https://www.melbourneairport.com.au/',
          steps:[
            '「Arrivals」の表示に沿って入国審査エリアへ',
            'スマートゲートでパスポートをスキャン → 顔認証 → 通過',
            '手荷物受取エリアでスーツケースを受け取る',
            '税関・検疫へ。食品等があれば「DECLARE（申告）」レーンへ',
            '入国カードを提示し荷物のX線検査（申告すれば罰金なし）' ],
          tips:[
            'スマートゲートは日本のパスポートでOK。画面の指示どおりで簡単',
            '注意｜申告漏れは高額罰金。「少量だから大丈夫」は通用しない。迷ったら申告レーンへ' ] },
        { t:'7:00', h:'Uberで市内へ', d:'約30分・$60〜70。荷物があるのでUberが楽',
          steps:[
            'T2を出て1F（到着フロア）の屋外「Rideshare」案内板に従う',
            'アプリで「Melbourne Airport T2 Rideshare」付近にピンを設定',
            '車種・ナンバー・運転手名を確認してから乗車',
            '目的地「InterContinental Melbourne – 495 Collins St」を確認して出発' ],
          tips:[
            '料金目安 $60〜75。タクシー（$90〜）より安い',
            'アプリ内クレカで自動決済。現金・チップ不要',
            '荷物が多ければ「Uber XL」で大型ワゴンに' ] },
        { t:'7:45', h:'インターコンチに荷物預け', d:'チェックインは15時。フロントに荷物を預けて身軽に',
          map:'https://maps.google.com/?q=495+Collins+Street+Melbourne', web:'https://www.ihg.com/intercontinental/hotels/gb/en/melbourne/melha/hoteldetail' },
        { t:'8:15', h:'朝食 — Lune Croissanterie', d:'世界最高峰のクロワッサンとフラットホワイト。早朝到着の今だけ行列前に入れる',
          map:'https://maps.google.com/?q=Lune+Croissanterie+CBD+Flinders+Lane+Melbourne', web:'https://www.lunecroissanterie.com/' },
        { t:'10:00', h:'ブロック＆ロイヤル・アーケード', d:'19世紀の優雅なアーケード。床のモザイクとHopetoun Tea Rooms',
          map:'https://maps.google.com/?q=Block+Arcade+282+Collins+Street+Melbourne', web:'https://www.theblockarcade.com.au/' },
        { t:'11:30', h:'ホージア・レーン', d:'壁一面のストリートアート路地。写真をたくさん',
          map:'https://maps.google.com/?q=Hosier+Lane+Melbourne' },
        { t:'13:00', h:'ランチ — Il Solito Posto', d:'Collins St東端・地下の隠れ家イタリアン。パスタ・リゾット・モクテル',
          map:'https://maps.google.com/?q=Il+Solito+Posto+113+Collins+Street+Melbourne', web:'https://ilsolitoposto.com.au/' },
        { t:'15:00', h:'チェックイン＆仮眠（最重要）', d:'欲張って観光を続けないこと。バスタブ＋1〜2時間の仮眠。明日からの体力はここで決まる' },
        { t:'18:00', h:'ディナー — Chin Chin', d:'モダンタイの人気店。予約不可の行列制だが回転は早い。辛さ調整可',
          map:'https://maps.google.com/?q=Chin+Chin+Flinders+Lane+Melbourne', web:'https://chinchin.melbourne/' },
        { t:'21:00', h:'ホテル帰着', d:'長旅の最初の夜。ゆっくり休んで' }
      ],
      memo:'フラットホワイト発祥の地。初日の一杯をぜひ。',
      picks:['ngv','hutong','patricia','brunetti','hardware','degraves'] },

    { n:3, date:'9/22', wd:'火', title:'マーケットと世界遺産と図書館',
      wx:{ t:'メルボルン 9–18°C', note:'朝晩冷える。重ね着で調整' },
      photo:'../assets/day3.jpg', cap:'State Library Victoria — ドームの閲覧室',
      voucher:null,
      sched:[
        { t:'8:30', h:'路地裏カフェでコーヒー', d:'Collins St沿いをぶらぶら。テイクアウトで街歩き' },
        { t:'9:30', h:'無料トラムで北へ', d:'City Circle Tram。CBD内は運賃無料・カード不要' },
        { t:'10:00', h:'クイーンビクトリアマーケット', d:'南半球最大級の市場。名物ホット・ジャム・ドーナツ（火曜 6:00–15:00営業）',
          map:'https://maps.google.com/?q=Queen+Victoria+Market+Melbourne', web:'https://qvm.com.au/' },
        { t:'11:30', h:'カールトン庭園・王立展示館', d:'世界遺産のドーム建築と春の並木道で記念写真',
          map:'https://maps.google.com/?q=Carlton+Gardens+Melbourne', web:'https://museumsvictoria.com.au/reb/' },
        { t:'12:30', h:'ビクトリア州立図書館', d:'荘厳なドーム閲覧室（無料）。上階ギャラリーからの見下ろしも必見',
          map:'https://maps.google.com/?q=State+Library+Victoria+Melbourne', web:'https://www.slv.vic.gov.au/' },
        { t:'13:00', h:'ランチ — フィッツロイ or CBD', d:'オープンエアのカフェか、CBDのビストロで' },
        { t:'15:00', h:'5つ星ホテルを満喫', d:'ラウンジ・プール・バスタブ。完全自由日の醍醐味' },
        { t:'18:00', h:'ディナー — Cumulus Inc.', d:'モダンオージーの人気店。ウォークインは早めの時間が狙い目',
          map:'https://maps.google.com/?q=Cumulus+Inc+45+Flinders+Lane+Melbourne', web:'https://www.cumulusinc.com.au/' },
        { t:'21:00', h:'ホテル帰着', d:'明日は移動日。早めに就寝' }
      ],
      memo:'メルボルンは「1日で四季」の街。ウインドブレーカーをバッグに。',
      picks:['ngv','stkilda','brighton','cumulus','udon','lord','rolld','patricia','brunetti'] },

    { n:4, date:'9/23', wd:'水', title:'メルボルンの朝、シドニーの夜',
      wx:{ t:'シドニー 12–21°C', note:'日中は過ごしやすい陽気' },
      photo:'../assets/day4.jpg', cap:'Darling Harbour — シドニー最初の夜',
      voucher:null,
      sched:[
        { t:'9:00', h:'サウスメルボルンマーケット', d:'QVよりローカルでおしゃれ。デリと雑貨（水曜営業）。Uberで約10分',
          map:'https://maps.google.com/?q=South+Melbourne+Market', web:'https://www.southmelbournemarket.com.au/' },
        { t:'11:00', h:'チェックアウト', d:'荷物を受け取ってUberのトランクへ' },
        { t:'11:30', h:'メルボルン最後のランチ', d:'フリンダーズ・レーンで締めの一皿' },
        { t:'13:30', h:'Uberで空港へ', d:'約35〜40分。余裕をもって出発' },
        { t:'14:15', h:'T3でチェックイン（ヴァージン専用）', d:'T4はJetstar等なので注意',
          map:'https://maps.google.com/?q=Melbourne+Airport+Terminal+3', web:'https://www.virginaustralia.com/',
          steps:[
            'メルボルン空港 国内線T3（ヴァージン専用）のカウンターへ',
            'パスポートと予約確認書を提示してチェックイン',
            '受託荷物を預ける（Choiceプランなら1人1個無料）',
            '保安検査を通過してゲートで待機（出発30分前目安）' ],
          tips:[
            'オンラインチェックインは公式アプリ/Webで24時間前から。並ばずに済む',
            'Uberの運転手には「T3, Virgin Australia」と伝える',
            '機内持ち込みは7kg以内（1個）が目安' ] },
        { t:'16:00', h:'VA859 シドニーへ', d:'1時間25分のショートホップ' },
        { t:'17:25', h:'シドニー T2着 → 市内へ', d:'Uber約30分・$50〜65。電車ならAirport Link',
          map:'https://maps.google.com/?q=Sydney+Airport+Domestic+Terminal+2',
          steps:[
            'T2到着後、手荷物受取エリアでスーツケースを受け取る',
            '【Uber】T2出口を出て1Fの「Rideshare」エリアへ。「Sydney Domestic Airport T2」にピン',
            '【電車】T2地下のAirport Linkへ。タッチ決済でそのまま乗車可',
            '目的地「Rydges World Square（389 Pitt St）」へ' ],
          tips:[
            'Uber：約25〜30分・$50〜65。スーツケースが多ければこちら',
            '電車：Central駅まで約13分・$19.44/人（空港駅利用料込み）。駅からホテルは徒歩10分ほど' ] },
        { t:'18:15', h:'リッジスにチェックイン', d:'直結のColesで滞在中の水とTimTamを調達',
          map:'https://maps.google.com/?q=Rydges+World+Square+389+Pitt+Street+Sydney', web:'https://www.rydges.com/accommodation/sydney-nsw/world-square/' },
        { t:'19:30', h:'ライトレールでダーリングハーバーへ', d:'クレカタッチで乗車OK。夜景が映える時間帯',
          map:'https://maps.google.com/?q=Darling+Harbour+Sydney' },
        { t:'20:00', h:'ディナー — Ume Burger', d:'和風グルメバーガー。到着夜は気軽に（〜21:00）',
          map:'https://maps.google.com/?q=Ume+Burger+Darling+Square+Sydney', web:'https://umeburger.com/' },
        { t:'21:30', h:'サーキュラー・キーの夜景', d:'ライトアップされたオペラハウスとハーバーブリッジに初対面',
          map:'https://maps.google.com/?q=Circular+Quay+Sydney' }
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
        { t:'8:10', h:'ホテル出発（徒歩10分）', d:'Pitt St北進 → Park St左折 → George St。QVBの斜向かい',
          map:'https://maps.google.com/?q=Hilton+Sydney+488+George+Street',
          steps:[
            'リッジス（389 Pitt St）を出て北方向へPitt Stを直進（約600m）',
            'Park St（ハイドパーク方面から延びる大通り）を左折し、1ブロック先のGeorge Stへ',
            'George Stを右折してすぐ右手が「Hilton Sydney」（488 George St・QVBの斜向かい）',
            '正面入って右手・フロント近くのソファーで待機。日本語ガイドが看板を持って案内' ],
          tips:[
            '8:10発なら8:20頃着＝集合の5分前。不安なら8:05に出発を',
            'Googleマップで「Hilton Sydney」徒歩ナビを使えば迷わない' ] },
        { t:'8:25', h:'ヒルトン ロビー集合', d:'8:30出発。遅刻するとツアーに乗れません', hard:true,
          tips:[ '注意｜アラームは2つセット。バウチャー「SYDODOAOPT87」を提示' ] },
        { t:'9:15', h:'フェザーデール動物園', d:'コアラと記念撮影・カンガルーに餌やり（抱っこはNSW州で禁止）',
          map:'https://maps.google.com/?q=Featherdale+Wildlife+Park+Doonside+NSW', web:'https://www.featherdale.com.au/' },
        { t:'11:15', h:'カヒルズ ルックアウト', d:'断崖からジャミソン渓谷のパノラマ。プロ撮影データのプレゼントあり' },
        { t:'12:10', h:'シーニックワールド＋ランチ', d:'最大斜度52度のトロッコとガラス底ロープウェイ。昼食はバウチャーで（スパイスを避けシンプルに）',
          map:'https://maps.google.com/?q=Scenic+World+Katoomba+NSW', web:'https://www.scenicworld.com.au/' },
        { t:'14:20', h:'エコーポイント展望台', d:'スリーシスターズの大展望',
          map:'https://maps.google.com/?q=Echo+Point+Lookout+Katoomba+NSW' },
        { t:'15:00', h:'ルーラの街を散策', d:'標高985m。キャンディ店・雑貨・コーヒーブレイク',
          map:'https://maps.google.com/?q=Leura+Mall+NSW+Blue+Mountains' },
        { t:'17:30', h:'ホテル前で解散', d:'リッジスの目の前で降車。最高の移動効率' },
        { t:'19:00', h:'夕食はシンプルに', d:'疲れているのでワールドスクエア周辺でさくっと' }
      ],
      memo:'薄手ダウンかウインドブレーカー必須。山の紫外線も強いので日焼け止めを。',
      picks:[] },

    { n:6, date:'9/25', wd:'金', title:'ハーバーの街を歩き尽くす最終日',
      wx:{ t:'シドニー 13–21°C', note:'散策日和。帽子と日焼け止めを' },
      photo:'../assets/day6.jpg', cap:'The Rocks — 金曜はマーケットの日',
      voucher:null,
      sched:[
        { t:'8:30', h:'朝食 — The Grounds of the City', d:'レトロで緑あふれる人気カフェ',
          map:'https://maps.google.com/?q=The+Grounds+of+the+City+Sydney', web:'https://thegrounds.com.au/' },
        { t:'10:00', h:'植物園 → ミセス・マッコリーズ・ポイント', d:'オペラハウスと橋が重なるシドニー最高の一枚を。午前は順光',
          map:'https://maps.google.com/?q=Royal+Botanic+Garden+Sydney', web:'https://www.rbgsyd.nsw.gov.au/' },
        { t:'11:30', h:'ロックス地区', d:'石畳の歴史地区。金曜はフーディー・マーケットで屋台つまみ食い',
          map:'https://maps.google.com/?q=The+Rocks+Sydney', web:'https://www.therocks.com/' },
        { t:'13:00', h:'ランチ — The Glenmore ルーフトップ', d:'港を見下ろすシドニー最古級のパブ。バーガーとノンアルビール',
          map:'https://maps.google.com/?q=The+Glenmore+Hotel+96+Cumberland+Street+The+Rocks+Sydney', web:'https://www.theglenmore.com.au/' },
        { t:'15:00', h:'QVBで本気のお土産', d:'T2の紅茶・Aesop・カンガルーグッズ。一段上の土産をここで',
          map:'https://maps.google.com/?q=Queen+Victoria+Building+455+George+Street+Sydney', web:'https://www.qvb.com.au/' },
        { t:'17:00', h:'ホテルに一時帰還', d:'荷物を置いて手ぶらで夜へ（神立地）' },
        { t:'18:30', h:'ディナー — Opera Bar', d:'オペラハウス直下の絶景テラス。予約不要。ピザ＋モクテルで最後の夜に乾杯',
          map:'https://maps.google.com/?q=Opera+Bar+Sydney', web:'https://operabar.com.au/' },
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
        { t:'6:45', h:'T1 JALカウンター＆TRS', d:'チェックイン後、TRS対象があれば保安検査後のカウンターへ',
          map:'https://maps.google.com/?q=Sydney+Airport+International+Terminal+1', web:'https://www.sydneyairport.com.au/',
          steps:[
            'T1のJALカウンターでチェックイン・荷物預け（朝は混むのでテキパキと）',
            'TRS対象がある場合：保安検査を通過してからTRSカウンターへ',
            'TRS：レシート（$300以上・同一店）＋パスポート＋品物を提示 → GST10%還付',
            '出国審査 → 搭乗ゲートへ' ],
          tips:[
            'TRSアプリで事前入力しておくとQR提示で時短',
            '免税品はスーツケースに詰めず、すぐ出せる状態で',
            '注意｜TRSは保安検査通過後のみ。検査前には申請できない' ] },
        { t:'8:55', h:'JL52 羽田へ', d:'約9時間50分。プレエコでゆったり。素敵な思い出とともに' },
        { t:'17:45', h:'羽田 T3着', d:'Visit Japan Webで税関申告 → 荷物受取。おかえりなさい！',
          steps:[
            '「入国審査（Arrivals）」の表示に沿って進む',
            'Visit Japan Webの税関申告QRコードをスマホで開いておく（機内で済ませると楽）',
            '日本人レーンで入国審査 → 手荷物受取',
            '税関でQRコードを係員端末にかざして完了' ],
          tips:[
            '豪州土産の食品は日本の税関でも申告が必要なケースあり',
            'T3から都内はリムジンバスか京急線で30〜40分' ] }
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
  spice:    { g:'food', name:'Spice Alley', tip:'屋台風アジアン横丁。気軽に食べ歩き', map:'https://maps.google.com/?q=Spice+Alley+Chippendale' },
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
