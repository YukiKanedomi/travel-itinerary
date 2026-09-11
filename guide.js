/* ============ guide.js — 手引きタブ（当日ガイド・現地の作法・誌面ライブラリ） ============ */
/* 2026-08-17 新設。調査の出典・詳細版は Drive の「渡航当日ガイド」「保険まとめ」を参照 */

/* ---- 出発日（9/20-21）タイムライン ---- */
var GUIDE_GO = [
  { t:'12:14', h:'橋本駅発 — 京王線 新宿行き', d:'橋本始発なので座れる。新宿まで44分・409円',
    tips:[ 'N\'EXの指定席は購入済み（チケットレス・4号車1番C/D）', '京王が止まったら控え：JR横浜線で横浜へ → N\'EX横浜発' ] },
  { t:'13:38', h:'N\'EX 31号 新宿発 → 空港第2ビル', d:'約81分・14:59着。乗り遅れても14:08発がある',
    tips:[ '新宿での40分は昼食とトイレに使う。N\'EXは5・6番線' ] },
  { t:'14:54', h:'成田T2着 → まず3階でWi-Fi受取', d:'「J WiFi & Mobile」カウンター（07:00-21:00）。予約メール提示・約5分',
    steps:[ '混んでいたら「法人会員優先レーン」のメールを係員に見せる',
      'ルーターとモバイルバッテリーは手荷物のカバンへ（預け入れ禁止）' ] },
  { t:'15:15', h:'JALカウンターで荷物を預ける', d:'パスポートを出すだけ。搭乗券はWalletのQRでOK', sv:{ lat:35.77325, lng:140.38759, label:'成田空港 第2ターミナル（出発階の車寄せ）' },
    tips:[ 'オンラインチェックイン済なら「荷物預けのみ」の列が速い',
      '聞かれるのはほぼ一つ「モバイルバッテリーは預け入れに入っていませんか？」→「入っていません」' ] },
  { t:'15:40', h:'身軽になったら自由時間（17:00まで）', d:'4階展望デッキ（無料）→ IASSラウンジ（保安検査前のエリア）。最後の日本食は検査後の制限エリアで',
    steps:[ '展望デッキは4階の北と南。9月は6:30-21:00・搭乗券不要',
      'IASS EXECUTIVE LOUNGE 2：ゴールドカードの現物＋当日の搭乗券で2人とも無料（家族カード可）',
      '3階にユニクロあり。買い忘れの最終チャンス' ],
    tips:[ '注意｜ラウンジはカードの現物が必要。アプリ画面では入れない' ] },
  { t:'17:00', h:'保安検査 → 出国審査', d:'この順。出国審査は顔認証で約10秒・会話なし。スタンプは押されないのが正常。ゲート集合は18:10',
    steps:[ '成田はスマートレーン＝PC・液体は出さずカバンごと1トレーでOK',
      'ジャケット・コート類は脱いでトレーへ（これは必須のまま）',
      '列に並んでいる間にベルト・時計・ポケットを空にしておく' ],
    tips:[ '注意｜未開封のペットボトルもその場で放棄になる。水は検査後に買う' ] },
  { t:'18:40', h:'JL773 離陸 — ここから寝るのが仕事', d:'約10時間。この夜の睡眠が7日間の体力を決める',
    steps:[ '離陸後すぐ時計をメルボルン時間（日本+1時間）に',
      '最初の機内食のときにアイマスクと耳栓をもらう',
      '食後に歯を磨いてすぐ就寝。目標5〜6時間',
      '着陸1.5時間前に起床 → 入国カード記入（滞在先は下の作法カード参照）' ],
    tips:[ 'ブランケットは1人1枚あるが薄手。フリースを膝に', '足元が冷える。スリッパと着圧ソックスを離陸後すぐ出す' ] },
  { t:'5:45', h:'メルボルン着 — 入国は4ステップ', d:'スマートゲート → 荷物受取 → 税関・検疫 → 到着ホール',
    steps:[ 'スマートゲート：パスポートを入れると日本語表示。出てきた紙のチケットを持って顔認証',
      '荷物はその場で破損チェック。古い紙タグは剥がす',
      '食べ物があれば迷わず赤「Goods to Declare」へ。物を見せるだけ・罰金なし',
      '待ち時間に通信切替：eSIM（Webbing）のローミングON → データ通信を副回線へ' ],
    tips:[ '早朝は検疫が1時間超えることも。7:00に出られれば順調', '検疫犬が来たら立ち止まって待つだけ', '図解：入国カードは誌面24・25頁、スマートゲートは26頁' ] },
  { t:'7:00', h:'SkyBusで市内へ', d:'T2正面の赤い看板から乗車。全便サザンクロス駅行き・約30分・$25.90/人',
    steps:[ 'チケットはT2外の赤い券売機（タッチ決済）か公式アプリ',
      '乗車時にQRをスキャン。スーツケースは車内ラックへ',
      '駅からホテルは徒歩5分：Collins Stを東へ1ブロック、King St先の右側' ],
    tips:[ '控え：Uber $60〜75（Rideshareの案内板へ）／タクシー $90〜', '図解：券売機とタッチ改札は誌面27頁' ] },
  { t:'7:45', h:'ホテル着 — 荷物を預けて街へ', d:'チェックインは15時。"Can I leave my luggage until check-in?"',
    tips:[ '言えなくてもスーツケースを指させば伝わる', 'ホテルの目の前がもう無料トラムゾーン', '図解：チェックインとデポジットは誌面28頁' ] }
];

/* ---- 帰国日（9/26）タイムライン ---- */
var GUIDE_BACK = [
  { t:'5:00', h:'起床・最終チェック', d:'忘れ物は枕元とバスルーム。TRSレシートと品物は手荷物へ' },
  { t:'5:40', h:'チェックアウト → Uber', d:'朝食（6:30〜）は諦める。空港まで約20分。配車は前夜に予約',
    tips:[ '前夜に地下のColesでパンを買っておくと機内前に食べられる' ] },
  { t:'6:00', h:'T1 JALカウンター', d:'チェックイン・荷物預け。空港の推奨は国際線3時間前' },
  { t:'7:25', h:'保安検査 → 出国審査 → TRS', d:'TRSカウンターは検査の「あと」・ゲート8/9付近',
    steps:[ 'TRSアプリのQR・パスポート・搭乗券・レシート原本・品物を提示',
      '90分前（7:25）までに列へ。30分前で受付終了' ],
    tips:[ '注意｜TRS対象品は預け入れ荷物に入れない', '図解：TRSの場所と流れは誌面31頁' ] },
  { t:'8:55', h:'JL52 羽田へ', d:'プレミアムエコノミー。機内でVisit Japan Webの税関QRを準備' },
  { t:'17:45', h:'羽田T3着', d:'入国 → 荷物受取 → 税関QR → 2階到着ロビーの返却BOXへWi-Fiルーターを返す',
    tips:[ '注意｜返却BOXは税関を出た先。疲れて素通りしがち。ルーターは取り出しやすい位置に' ] }
];

/* ---- 現地の作法ハンドブック ---- */
var GUIDE_HB = [
  { art:'coffee', title:'カフェの注文 — 「コーヒーください」は通じない', lead:'迷ったらフラットホワイト。カウンターで先払い。',
    body:'種類を言うのが必須。迷ったら<b>Flat White</b>（エスプレッソ＋スチームミルク・豪州発祥）。' +
      'ミルクなしは<b>Long Black</b>（アメリカーノに近い）。注文は「A flat white, please.」だけ。' +
      '持ち帰りは<b>takeaway</b>（to goではない）。濃いめは strong、薄めは weak。' +
      '<b>カウンターで注文して先払い</b>が基本。席で待っていても誰も来ない。端末のチップ画面の図解は誌面29頁。' },
  { art:'pie', title:'食べ歩き — ミートパイが国民食', lead:'数ドルのミートパイが、この国のソウルフード。',
    body:'手のひらサイズ・数ドル・街中のベーカリーで買える。相棒は<b>ソーセージロール</b>。' +
      'シドニーの老舗は<b>Harry\'s Cafe de Wheels</b>（70年超）。チェーンなら Pie Face。' +
      '<b>DAY3のクイーンビクトリア・マーケット</b>はデリエリアのホットドッグが名物' +
      '（マイルド/スパイシーを選んでトッピング）。Mörk Chocolate のホットチョコも評判。火曜は営業日。' },
  { art:null, title:'レストランの会計 — チップは不要', lead:'席で待たない。端末のチップ欄は0%でいい。',
    body:'カフェ・パブ・フードコートは<b>カウンター注文・先払い</b>。Opera Barは<b>QRコードで席から注文</b>。' +
      '支払い端末にチップの選択肢が出ることがあるが<b>0%でよい</b>。失礼にならない。' +
      '日曜・祝日は10〜20%のサーチャージがつく店あり（今回の旅程では非該当）。' +
      'カード決済手数料1〜2%は普通のこと。水道水は無料で頼める（tap water）。' },
  { art:null, title:'スーパー攻略 — コンビニは当てにしない', lead:'水も朝食も土産も、リッジス地下のColesで足りる。',
    body:'セブンイレブンはサンドイッチや温かい軽食もあるが、<b>高くて品揃えが小さい</b>ので夜遅い非常食用。主役は<b>Coles / Woolworths</b>。' +
      '<b>リッジス地下がColes直結</b>＝水・朝食・土産（チキンソルト・Tim Tam・Shapes）は全部ここで。' +
      '<b>レジ袋はない</b>のでエコバッグ持参（Colesのエコバッグ自体が土産になる）。' +
      'セルフレジは日本と同じ。<b>スキャンした商品は必ず台に置く</b>（重量センサー）。酒はスーパーでは買えない（BWS/Liquorlandへ）。セルフレジの図解は誌面30頁。' },
  { art:'suitcase', title:'ホテルの過ごし方', lead:'デポジットは戻る。チップは要らない。',
    body:'チェックイン時に<b>デポジット</b>（カード仮押さえ・チェックアウトで戻る）。チップは基本不要。' +
      'ハウスキーピングに渡すなら枕元かThank youメモ添え（テーブル置きは置き忘れ扱い）。' +
      '<b>水道水は飲める</b>。リッジスは無料の水・スリッパ・歯ブラシなし（前夜にColesで水を買う）。' +
      'ドライヤーは両ホテルあり。下着は洗面台で手洗いが現実的（ランドリーは高い）。' },
  { art:null, title:'トイレ — 「困ったらコンビニ」が使えない国', lead:'探す順は、モール → デパート → 図書館。',
    body:'探す順は<b>ショッピングセンター → デパート → 図書館・美術館</b>。QVB・Melbourne Central・World Squareはきれいで無料。' +
      '政府公式アプリ<b>National Public Toilet Map</b>（toiletmap.gov.au）に全国25,000か所・営業時間つき。入れておく。' +
      '<b>メルボルンCBDの実地リスト</b>：Swanston×Collins角の公衆トイレ（広い・きれい）／州立図書館（Swanston St側の正面から。La Trobe St側入口は改装で閉鎖中）／' +
      'MYER地下（Bourke St Mall）。<b>注意｜ブロックアーケードはコード式</b>。先にMYERで済ませてから行く。' },
  { art:null, title:'治安 — 気をつけるのはメルボルン', lead:'スマホを席に置かない。それだけで大半は防げる。',
    body:'近年は<b>メルボルンのほうが要注意</b>。無料トラム内のスリ・スマホひったくり・貼り替えQR詐欺。' +
      '対策は3つ：<b>①スマホを席に置かない</b>（場所取りに置くのは日本だけ）<b>②ショルダーストラップを使う</b>' +
      '<b>③貼り紙のQRは店員に確認してから読む</b>。シドニーは夜のキングス・クロスとセントラル駅周辺を避けるだけでよい（旅程は非該当）。' },
  { art:'skybus', title:'フェリー・トラムの細部', lead:'乗る時も降りる時も、柱のセンサーにタッチ。',
    body:'シドニーのフェリーは<b>サーキュラー・キーの2〜6番埠頭</b>から。電光掲示板で行き先とWharf番号を確認 → ' +
      'センサーにクレカをタッチ。<b>改札のない埠頭でも柱のセンサーに必ずタッチ</b>（降車時も）。忘れると最大運賃。' +
      '金土日は1日上限$9.65なので乗り放題感覚でよい。メルボルンのトラムは<b>無料ゾーン内なら本当に無料</b>・カードすら不要。ゾーンを出る時は<b>クレカのタッチ決済でも乗れる</b>（大人運賃・乗る時と降りる時に同じカードで）。Mykiを買う必要はない。' +
      '<b>注意｜2026年9月はシドニー・フェリーの労働争議（9/4〜10/6）</b>で欠航・遅延の可能性。乗る当日に transportnsw.info で運行を確認。タッチは引き続き必須。' },
  { art:'magpie', title:'マグパイ — 9月だけ空から来る', lead:'帽子と眼鏡で目を守り、看板のある区間は迂回。走らない。',
    body:'カササギフエガラス。普段は美声で愛される鳥だが、<b>9月は繁殖期で一部のオスが後頭部めがけて急降下</b>してくる。' +
      '対策：<b>「Swooping」の注意看板がある区間は迂回／帽子とサングラスで目を守る／走らず早足で通過</b>。DAY6の植物園が該当エリア。' +
      '襲うのは全体の1割のオスだけ。見かけたら鳴き声を聞いてみて——日本では聞けないフルートのような歌をうたう。' },
  { art:'binchicken', title:'ビンチキン — シドニーの愛される嫌われ者', lead:'危険はゼロ。ただし食べ物は死守。',
    body:'公園でゴミ箱を漁る白い大きな鳥（オーストラリアクロトキ）。あだ名は<b>Bin Chicken（ゴミ箱チキン）</b>。' +
      '危険はまったくないが、<b>食べ物を出しっぱなしにすると狙われる</b>。ハイドパークや植物園に普通にいる。' +
      'ネタグッズ（Tシャツ・ぬいぐるみ）が土産物屋にあり、実物を見てから買うと土産話がセットになる。' },
  { art:'koala', title:'DAY5の動物たち', lead:'抱っこは違法。隣に座るのは合法。',
    body:'フェザーデール動物園でコアラと記念撮影・カンガルーに餌やり。<b>コアラの抱っこはNSW州では法律で禁止</b>' +
      '（できるのはQLD州など）。抱っこがなくても隣で撮れる。' +
      'カンガルーの餌は園内で買える。手のひらを平らにして差し出すのがコツ。' },
  { art:'smartgate', title:'通信の当日手順（要点だけ）', lead:'副回線のローミングをON。やることはこれだけ。',
    body:'<b>到着したら</b>：夫=ahamoのローミングON。2人とも=設定→モバイル通信→副回線（Webbing）→' +
      '<b>ローミングON→データ通信を副回線へ</b>。妻のau主回線はOFFのまま触らない。' +
      '<b>ルーターはiPadを使うときだけ電源ON</b>（バッテリー節約）。帰国したらデータ通信を主回線に戻す。' },
  { art:null, title:'万一のとき — 保険の電話番号', lead:'病院より先に、まず電話。',
    body:'<b>けが・病気・盗難はまず電話</b>（24時間・日本語）：' +
      '<b>三井住友海上ライン</b> コレクトコール +81-3-3497-0915／<b>東京海上日動</b>（JALカード分）+81-3-6758-2460。' +
      '<b>キャッシュレス診療は不可＝全額立て替え</b>なので、病院に行く前にまず電話して案内を受ける。' +
      '領収書・診断書の原本は必ず保管。緊急通報（警察・消防・救急）は<b>000</b>。' }
];

/* ---- もしもの時の手順（トラブル別。上から順にやれば戻れる） ---- */
var GUIDE_SOS = [
  { title:'パスポートをなくした', lead:'再発行ではなく「帰国のための渡航書」。証明写真と警察の届出番号があれば数日で出る。',
    steps:[ 'まず落ち着いて、最後に出した場所（ホテルの金庫・カウンター）を確認',
      '最寄りの警察署で紛失届（Police report）。受理番号をもらう',
      '在シドニー日本国総領事館 +61-2-9250-1000（メルボルンなら在メルボルン総領事館 +61-3-9639-3244）に電話して指示を受ける',
      '持っていく物：証明写真2枚・パスポートのコピー（書類ポケット）・警察の受理番号・航空券の控え',
      '帰国便の変更が要ればJTB海外デスク +81-50-3362-0660 へ' ],
    tips:[ 'パスポートのコピーと証明写真は原本と別の場所に。これがあるだけで手続きが半日短くなる' ] },
  { title:'スーツケースが出てこない（ロストバゲージ）', lead:'到着ロビーを出る前に申告する。出てしまうと補償が難しい。',
    steps:[ 'ターンテーブルが止まっても出てこなければ、同じフロアの航空会社「Baggage Service」カウンターへ（JALならJAL、VA859ならVirgin）',
      '預け札（バゲージタグの半券）とパスポートを提示。AirTagの位置を見せると話が早い',
      'PIR（紛失報告書）の控えをもらう。番号は写真に撮る',
      '届け先はホテルの住所（情報タブ「タクシーで見せる宿泊先」をそのまま見せる）',
      '当座の着替えは夫婦で半分ずつ交換して詰めてあるので、相手のスーツケースで数日しのげる',
      '保険会社（携行品）にも連絡。買い足した下着・洗面具の領収書は保管' ] },
  { title:'体調が悪い・けがをした', lead:'病院より先に、まず保険会社に電話。日本語で病院を案内してくれる。',
    steps:[ '三井住友海上 コレクトコール +81-3-3497-0915／東京海上日動（JALカード分）+81-3-6758-2460（24時間・日本語）',
      '案内された病院へ。キャッシュレス診療は不可なので、その場で立て替える（クレカ）',
      '領収書・診断書の原本は必ず受け取って保管。帰国後に請求',
      '軽い症状なら薬局（Chemist Warehouse・Priceline）の薬剤師に相談。頭痛はPanadol、腹痛はGastro-Stop',
      '意識がない・出血が止まらないなど緊急は 000（警察・消防・救急共通）。英語で "Ambulance, please." と住所' ],
    tips:[ '注意｜救急車は有料（数百ドル）。保険の対象になるので躊躇しない' ] },
  { title:'クレジットカードをなくした', lead:'止めて、もう1枚で続ける。現地で再発行はしない。',
    steps:[ 'まずカード裏面の発行会社の番号へ。VISA共通は豪州内フリーダイヤル 1800 125 440、つながらなければコレクトコール +1 303 967 1096／JALカード 0120-255-931（日本語）',
      'Apple Payに入れていた分はiPhoneの「探す」→ デバイス → 紛失としてマーク、で止まる',
      '残りのカードで旅を続ける。夫婦で別のカードを持っているので必ず1枚は残る',
      '現金が要る時はもう1枚のカードでATMキャッシング（銀行系ATM・Credit選択）' ] },
  { title:'スマホをなくした・壊れた', lead:'相手のスマホがあれば旅は続く。しおりはオフラインで相手の端末に入っている。',
    steps:[ '相手のiPhoneで「探す」→ 位置確認 → 紛失モード（画面に連絡先を表示・ロック）',
      '見つからなければ通信会社に連絡して回線停止（eSIMはWorld eSIMのサポートへ）',
      '連絡手段はiPad＋Wi-Fiルーター、またはホテルのWi-Fi',
      '航空券（Wallet）はJALアプリに相手の端末でログインし直せば出せる。パスポートがあれば空港カウンターでも発券できる' ] },
  { title:'飛行機が遅れた・欠航した', lead:'国内線VA859が遅れても、シドニーの夜は「部屋ごはん」に切り替えれば困らない。',
    steps:[ 'VA859遅延：Virginアプリの通知を待つ。1〜2時間なら夕食をColes調達に切り替え、夜景は翌日以降へ',
      'VA859欠航：Virginアプリ or カウンターで振替（当日便は本数が多い）。JTB海外デスク +81-50-3362-0660 に一報',
      'JL52（帰国便）遅延：JALアプリで確認。羽田のWi-Fiルーター返却は当日中でなくても翌日返却でよい（延滞分は後日精算）',
      'JL773（往路）遅延：メルボルン到着後の予定はすべて「ずれてよい」設計。ホテルの荷物預けは何時でも可' ] },
  { title:'二人ではぐれた', lead:'決めておくのは1つだけ：「最後に一緒にいた場所の入口」で待つ。',
    steps:[ 'その場で動かない。LINE通話（eSIMで通じる）',
      '通じなければ「最後に一緒にいた場所の入口」に戻って15分待つ',
      'それでも会えなければホテルのロビーへ。フロントに伝言を頼める',
      '観光地では先に「はぐれたらここ」を指差してから別行動する（QVM＝時計塔、ロックス＝La Renaissanceの前、など）' ] },
  { title:'ツアーの集合に遅れそう・場所が分からない', lead:'8:30出発は待ってくれない。電話が先。',
    steps:[ 'マイバスデスク (02) 9510-0139（平日9-17時・日本語）／時間外は +61 438 424 021',
      'ヒルトンは George St 488。QVBの斜向かい。リッジスから徒歩10分（Pitt St北→Park St左→George St右）',
      '間に合わなかった場合の取消料は全額。翌日の同ツアーへの振替可否をマイバスに聞く' ] },
  { title:'現金が足りない・ATMの使い方', lead:'現金はほぼ使わない国。要る時は銀行系ATMでクレカのキャッシング。',
    steps:[ 'ATMは銀行（Commonwealth・ANZ・NAB・Westpac）のものを使う。コンビニのATMは手数料が高い',
      'カードを入れて「Credit」を選ぶ → 暗証番号 → 金額（$100〜200で十分）',
      '「手数料$2〜3を承諾しますか」と出たら Yes。帰国後に一括返済すれば利息は数十円',
      '現金が要る場面：チップ不要、屋台もカード可。要るとすれば公衆トイレの有料機くらい' ] },
  { title:'盗難・被害にあった', lead:'まず安全。次に警察の届出。保険はその紙がないと出ない。',
    steps:[ '身の安全を確保。追いかけない',
      '警察へ届出：緊急は 000、緊急でなければ Police Assistance Line 131 444。Police reportの番号をもらう',
      'パスポートが含まれていれば「パスポートをなくした」の手順へ',
      'カードが含まれていれば「クレジットカードをなくした」の手順へ',
      '保険会社に連絡（携行品損害）。被害品の購入時期・金額をメモ' ] }
];

/* ---- 指差し英語（読み上げなくてよい。見せるだけで通じる短文） ---- */
var GUIDE_PHRASES = [
  { title:'カフェ', rows:[
    ['A flat white, please.', 'フラットホワイトを1つ'],
    ['Two flat whites, have here.', 'フラットホワイト2つ、店内で'],
    ['Takeaway, please.', '持ち帰りで'],
    ['Tap water, please.', '水道水をください（無料）'],
    ['Can we sit here?', 'ここ座っていい？'] ] },
  { title:'レストラン', rows:[
    ['A table for two, please.', '2人です'],
    ["No shellfish or crustaceans, please. I don't eat them.", '貝・甲殻類は抜いてください（苦手なので）'],
    ['(If allergic) I have a shellfish allergy.', '本当にアレルギーの場合だけこちら'],
    ['Is this spicy? Mild, please.', 'これ辛い？ 辛くしないで'],
    ['Could we have the bill, please?', 'お会計をお願いします'],
    ['Can I pay here?', 'ここで払えますか？'],
    ['No tip, thanks.', 'チップはなしで'] ] },
  { title:'ホテル', rows:[
    ['Check in, please. Under TABINO.', 'チェックインお願いします。タビノで予約'],
    ['Can I leave my luggage until check-in?', 'チェックインまで荷物を預かってもらえますか'],
    ['What time is breakfast?', '朝食は何時から？'],
    ['Wi-Fi password, please.', 'Wi-Fiのパスワードを'],
    ['Check out, please.', 'チェックアウトお願いします'],
    ['Could you call a taxi?', 'タクシーを呼んでもらえますか'] ] },
  { title:'交通', rows:[
    ['Does this go to Southern Cross?', 'これサザンクロス行き？'],
    ['Two to the city, please.', '市内まで2人分'],
    ['Where do I tap on?', 'タッチはどこで？'],
    ['To this address, please.', 'この住所までお願いします（情報タブの宿泊先を見せる）'],
    ['Terminal 3, Virgin Australia.', 'T3、ヴァージンオーストラリアへ'] ] },
  { title:'空港・入国', rows:[
    ['Holiday. Six days.', '観光です。6日間'],
    ['I have snacks and medicine to declare.', 'お菓子と薬を申告します'],
    ['Nothing else.', 'ほかにはありません'],
    ['Where is the TRS counter?', 'TRSのカウンターはどこ？'],
    ['My bag has not come out.', '荷物が出てきません'] ] },
  { title:'買い物', rows:[
    ['Just looking, thanks.', '見てるだけです'],
    ['Do you have this in another colour?', '色違いはありますか'],
    ['One tax invoice, please.', '領収書を1枚にまとめて（TRS用）'],
    ['No bag, thanks.', '袋は要りません'],
    ['Card, please.', 'カードで'] ] },
  { title:'困った時', rows:[
    ['Where is the toilet?', 'トイレはどこですか'],
    ["I don't understand. Could you write it down?", '分かりません。書いてもらえますか'],
    ["I've lost my passport.", 'パスポートをなくしました'],
    ['Could you call an ambulance? / the police?', '救急車を／警察を呼んでください'],
    ['I feel sick. Where is a pharmacy?', '気分が悪い。薬局はどこ？'],
    ['Sorry, it stopped.', 'すみません、止まりました（セルフレジ）'] ] }
];

/* ---- 入口の予行演習（Street View）。旅程の行の sv に加えて、行に紐づかない地点 ---- */
var SV_EXTRA = [
  { when:'9/21', label:'サザンクロス駅 Collins St側の出口（SkyBus降車後）', lat:-37.8180, lng:144.9536 },
  { when:'9/25', label:'サーキュラー・キー 3番埠頭（マンリー行きフェリー）', lat:-33.8613, lng:151.2105 }
];
function svPoints(){
  var out = [];
  GUIDE_GO.forEach(function(r){ if (r.sv) out.push({ when:'9/20 ' + r.t, label:r.sv.label, lat:r.sv.lat, lng:r.sv.lng }); });
  TRIP.days.forEach(function(d){ d.sched.forEach(function(r){ if (r.sv) out.push({ when:d.date + ' ' + r.t, label:r.sv.label, lat:r.sv.lat, lng:r.sv.lng }); }); });
  SV_EXTRA.forEach(function(p){ out.push(p); });
  return out;
}

/* ---- 誌面ライブラリ（assets/guide/p01-p20.jpg） ---- */
var GUIDE_PAGES = [
  '宿 — インターコンチネンタル メルボルン', '宿 — リッジス ワールドスクエア',
  'メルボルンの路地とアーケード', 'メルボルンの二つの市場', 'メルボルンで食べる',
  'ブルーマウンテンズ一日', 'ハーバーを歩く最終日', 'QVBと土産',
  '到着と検疫', '交通の使い方', '帰国前の最後の朝',
  '服装 — 気温とコーデ図鑑', '服装 — ユニクロで組む七日間', '服装 — 女性版・七日間の着回し',
  '服装 — 女性版・四つの解き方', '服装 — 着回し（夕暮れトーン）',
  '当日ガイド① 成田空港', '当日ガイド② 機内と入国カード', '当日ガイド③ メルボルン到着', '当日ガイド④ SkyBusとホテル',
  '食べ歩き特集 — メルボルン編', '食べ歩き特集 — シドニー編', '付録 — 食べ歩きビンゴ',
  '入国カードの書き方 ① 表面', '入国カードの書き方 ② 裏面',
  '図解 — スマートゲートの通り方', '図解 — SkyBusとシドニーのタッチ改札', '図解 — ホテルのチェックインとデポジット',
  '図解 — 支払い端末とチップ画面', '図解 — スーパーのセルフレジ', '図解 — 免税還付TRSの場所と流れ'
];
var gdViewerIdx = 0;

function gdFold(el) { el.classList.toggle('open'); }

function gdArt(name) {
  return name ? '<img class="gd-art" src="assets/art/' + name + '.png" alt="" loading="lazy">' : '';
}

function renderGuidePage() {
  var host = document.getElementById('pane-guide');
  if (!host) return;
  var h = '<div class="toc-head"><div class="toc-eyebrow">FIELD GUIDE</div>' +
    '<div class="toc-h1">旅の手引き</div></div>';
  h += '<div class="sec-hint">当日の動きかたと、現地の細かい作法。じっくり読む詳細版はGoogleドライブの「渡航当日ガイド」に。</div>';
  h += jmpHTML([['jg-go','出発日'],['jg-back','帰国日'],['jg-hb','作法帖'],['jg-sos','もしも'],['jg-en','指差し英語'],['jg-sv','予行演習'],['jg-lib','誌面']]);

  h += '<div class="sec-h jmp-t" id="jg-go">— 出発日の動きかた（9/20 家 → 9/21 ホテル） —</div>';
  h += ledgerHTML(GUIDE_GO, null);

  h += '<div class="sec-h jmp-t" id="jg-back">— 帰国日の動きかた（9/26） —</div>';
  h += ledgerHTML(GUIDE_BACK, null);

  h += '<div class="sec-h jmp-t" id="jg-hb">— 現地の作法ハンドブック —</div>';
  GUIDE_HB.forEach(function(k){
    h += '<div class="kb-card gd-card gd-fold" onclick="gdFold(this)">' + gdArt(k.art) +
      '<div class="kb-title">' + k.title + '</div>' +
      (k.lead ? '<div class="gd-lead">' + k.lead + '</div>' : '') +
      '<div class="kb-body">' + k.body + '</div></div>';
  });

  h += '<div class="sec-h jmp-t" id="jg-sos">— もしもの時の手順 —</div>';
  h += '<div class="sec-hint">起きてほしくないことを、起きた順に。上から順にやれば旅に戻れます。番号は情報タブの緊急連絡先と同じ。</div>';
  GUIDE_SOS.forEach(function(k){
    var m = '<div class="lmore" style="margin-left:0;display:block">';
    k.steps.forEach(function(st, i){ m += '<div class="lstep"><span class="n">' + (i+1) + '</span><span>' + st + '</span></div>'; });
    (k.tips || []).forEach(function(tp){ var w = tp.indexOf('注意｜') === 0; m += '<div class="ltip' + (w ? ' warn' : '') + '">' + (w ? tp : '・' + tp) + '</div>'; });
    m += '</div>';
    h += '<div class="kb-card gd-card gd-fold" onclick="gdFold(this)">' +
      '<div class="kb-title">' + k.title + '</div><div class="gd-lead">' + k.lead + '</div>' +
      '<div class="kb-body">' + m + '</div></div>';
  });

  h += '<div class="sec-h jmp-t" id="jg-en">— 指差し英語 —</div>';
  h += '<div class="sec-hint">読み上げなくても、この画面を見せれば通じる短文。タップで開く。</div>';
  GUIDE_PHRASES.forEach(function(k){
    var m = '';
    k.rows.forEach(function(r){ m += '<div class="gd-ph"><div class="en">' + r[0] + '</div><div class="ja">' + r[1] + '</div></div>'; });
    h += '<div class="kb-card gd-card gd-fold" onclick="gdFold(this)">' +
      '<div class="kb-title">' + k.title + '</div><div class="kb-body">' + m + '</div></div>';
  });

  h += '<div class="sec-h jmp-t" id="jg-sv">— 入口の予行演習（360°） —</div>';
  h += '<div class="sec-hint">迷いやすい場所の「見た目」を出発前に歩いておく。Googleマップの有効化が必要（オンライン時のみ）。景色は季節や工事で変わることがあります。</div>';
  h += '<div class="ledger" style="margin-top:8px">';
  svPoints().forEach(function(p){
    h += '<div class="lrow"><div class="lmain"><div class="t">' + p.when.replace(' ', '<br>') + '</div><div class="body"><div class="h">' + p.label + '</div>' +
      '<div class="lbtns"><button class="lbtn sv" onclick="openSV(' + p.lat + ',' + p.lng + ',\'' + p.label + '\')">入口を見る 360°</button></div></div></div></div>';
  });
  h += '</div>';

  h += '<div class="sec-h jmp-t" id="jg-lib">— 誌面ライブラリ（全31頁） —</div>';
  h += '<div class="sec-hint">この旅のために編んだ特集。タップで拡大、左右で前後の頁へ。機内でも読めます。</div>';
  h += '<div class="gd-grid">';
  GUIDE_PAGES.forEach(function(cap, i){
    var n = ('0' + (i + 1)).slice(-2);
    h += '<div class="gd-thumb" onclick="gdOpen(' + i + ')">' +
      '<img src="assets/guide/p' + n + '.jpg" alt="" loading="lazy"><div class="gd-cap">' + cap + '</div></div>';
  });
  h += '</div>';

  h += '<div class="gd-viewer" id="gd-viewer" onclick="gdClose(event)">' +
    '<img id="gd-vimg" src="" alt="">' +
    '<div class="gd-vcap" id="gd-vcap"></div>' +
    '<button class="gd-nav prev" onclick="gdStep(event,-1)">‹</button>' +
    '<button class="gd-nav next" onclick="gdStep(event,1)">›</button>' +
    '<button class="gd-close" onclick="gdClose(event,true)">×</button></div>';

  host.innerHTML = h;
}

function gdOpen(i) {
  gdViewerIdx = i;
  var n = ('0' + (i + 1)).slice(-2);
  document.getElementById('gd-vimg').src = 'assets/guide/p' + n + '.jpg';
  document.getElementById('gd-vcap').textContent = (i + 1) + ' / ' + GUIDE_PAGES.length + '　' + GUIDE_PAGES[i];
  document.getElementById('gd-viewer').classList.add('on');
}
function gdStep(e, d) {
  e.stopPropagation();
  gdOpen((gdViewerIdx + d + GUIDE_PAGES.length) % GUIDE_PAGES.length);
}
function gdClose(e, force) {
  if (!force && e.target.id === 'gd-vimg') return; /* 画像タップでは閉じない（ピンチ操作用） */
  document.getElementById('gd-viewer').classList.remove('on');
}
