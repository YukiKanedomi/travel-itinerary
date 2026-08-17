/* ============ v2 prep.js — 準備タブ（ToDo・予約・知識・持ち物） ============ */
/* localStorage キーは現行アプリと互換: prep_todo_v1 / prep_book_v1 / prep_booknote_v1 / checklist_v1 */
/* 出発前リマインダー（Googleカレンダー登録）は 2026-08-15 に廃止。ToDo に一本化した */

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
  { grp:'当日・道中', text:'到着後 eSIM/SIMを有効化、時計を現地時間に（日本＋1時間）' },
  /* 以下は 2026-08-15 追記。既存のチェック位置を保つため末尾に足す（表示は grp で振り分けられる） */
  { grp:'1ヶ月前', text:'スーツケース・ベルト・ネームタグを用意（夫婦で色違いにすると識別が速い）' },
  { grp:'2週間前', text:'メルボルン→シドニー国内線の受託手荷物を確認（1人1個23kgが標準）' },
  { grp:'2週間前', text:'トレッキングで履く靴の靴底を洗って乾かす（土は検疫の対象）' },
  { grp:'1週間前', text:'ネームタグに氏名（ローマ字）と国際形式の電話番号を記入（自宅住所は書かない）' },
  { grp:'前日', text:'全機器をフル充電（モバイルバッテリー・イヤホン・カメラ）' },
  { grp:'前日', text:'オフライン地図と機内で見る動画をダウンロード' },
  { grp:'前日', text:'夫婦で服を半分ずつ相手のスーツケースへ入れる（ロストバゲージ対策）' },
  { grp:'当日・道中', text:'預けた荷物は受け取り時にその場で破損を確認（持ち帰ると申告できない）' },
  { grp:'当日・道中', text:'到着ごとに古い紙タグとバーコードシールを剥がす（誤搭載の原因になる）' },
  /* 以下は 2026-08-17 追記。通信の手配が確定したので段取りを足す */
  { grp:'2週間前', text:'World eSIM を2人分インストール（メール内のQRを長押し→「eSIMを追加」）' },
  { grp:'2週間前', text:'妻のauはデータローミングをOFFにする（eSIM利用中の誤課金を防ぐ）' },
  { grp:'2週間前', text:'出発まではモバイルデータ通信を「主回線」に・「切替を許可」はオフ' },
  { grp:'当日・道中', text:'到着後：副回線のデータローミングをオン → モバイルデータ通信を「副回線」へ' },
  { grp:'前日', text:'Wi-Fi受取メール（法人会員優先レーン）をすぐ出せる場所に保存' },
  { grp:'当日・道中', text:'成田T2 3階のカウンターでWi-Fiルーターを受取（07:00-21:00・チェックイン前に）' },
  { grp:'当日・道中', text:'ルーターとモバイルバッテリーは機内持込（預け入れ不可・国内線も同じ）' },
  { grp:'当日・道中', text:'羽田T3 2階到着ロビーの返却BOXにルーターを返す（24時間可・素通り注意）' },
  { grp:'1ヶ月前', text:'N\'EXの指定席を2人分購入（えきねっと・8/20から可・新宿13:38発の隣席）' }
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
  { title:'電源プラグ・電圧', body:'プラグは<b>Iタイプ（ハの字）</b>、電圧 <b>230V・50Hz</b>。日本(100V)と違うので、機器の対応電圧(100-240V表記)を確認。スマホ・カメラの充電器はほぼ対応済み。<b>ケトルやドライヤーなど熱を出す機器は100V専用が多く、そのまま挿すと故障・発火の恐れ</b>があるので「100-240V」表記を必ず確認する。<b>変換プラグ自体の定格アンペア数</b>も見ておく（ケトルは1000W級で電流が大きい）。' },
  { title:'水・気候', body:'<b>水道水は飲用可</b>。9月は南半球の春で朝晩冷える＆寒暖差大。<b>UVが非常に強い</b>ので日焼け止め・帽子・サングラスを。' },
  { title:'服装の目安', body:'体感は<b>日本の11月上旬</b>。メルボルン 9–18℃／シドニー 13–21℃／<b>カトゥーンバ（DAY5）5–14℃</b>。<b>重ね着の三枚方式</b>＝外にウインドブレーカー（風を通さない）／中に薄手のニットかフリース（脱いでカバンに入る厚さ）／下に長袖。これで9〜21℃を全部カバーできる。<b>DAY5だけ中の一枚をウルトラライトダウンに替える</b>。展望台は断崖の上で風がまともに当たるので、市内で暑くても持っていく。メルボルンは<b>年間で最も雨が多い月</b>（月10日）なので折りたたみ傘は必須。半ズボンが要る気温にはならない。' },
  { title:'通信 ①3系統の構成', body:'①<b>World eSIM 無制限</b>（2人分・利用期間 <b>9/20〜9/26</b>の日付固定）＝主力。事業者名は「<b>Webbing</b>」と表示される。②<b>ahamo</b>（夫）＝申込不要・追加料金なし。ドコモ系＝Telstra網なので山で強い。③<b>グローバルWiFi 無制限</b>＝主にiPad用。<b>受取＝成田T2 3階 JWiFi&Mobileカウンター（07:00-21:00）／返却＝羽田T3 2階到着ロビー 到着出口付近の返却BOX（24時間可）</b>。<b>ルーターとモバイルバッテリーは機内持込のみ</b>（預け入れ不可・国内線も同じ）。' },
  { title:'通信 ②eSIMの入れ方と設定', body:'<b>入れ方</b>：メール内のQRコードを<b>長押し</b>して「eSIMを追加」。QRアプリでは読めず、スクショを撮って読ませても失敗する。日本でインストールすると「<b>アクティベートできません</b>」と表示されるが<b>正常</b>（追加は完了している）。<b>QRは1回きり</b>なのでメールを消さない。<br><b>出発までの状態</b>：モバイルデータ通信＝<b>主回線</b>／「モバイルデータ通信の切替を許可」＝<b>オフ</b>／副回線のデータローミング＝<b>オフ</b>／<b>妻のauもデータローミングOFF</b>（オンだと1日1,000〜1,200円）。副回線自体はオンのままでよい。<br><b>現地でやること（9/21朝）</b>：設定 → モバイル通信 → 副回線（Webbing）→ <b>データローミングをオン</b> → 一つ戻って<b>モバイルデータ通信を「副回線」に切り替え</b>。帰国後は「主回線」に戻すだけ。<br>※ネットワーク選択は「自動」のままに（手動固定だと現地で掴めない）。' },
  { title:'ホテルの備品', body:'<b>ドライヤーは両ホテルとも全室にあり</b>（持参不要。日本の100V専用機は230Vで故障・発火の恐れ）。<b>IC メルボルン</b>＝バスローブ・スリッパ・アメニティが無料で付く。<b>リッジス</b>＝<b>スリッパ・バスローブ・無料の水はなし</b>（スリッパは有料リクエスト）。ローブは頼めば借りられる。<b>歯ブラシと髭剃りは両ホテルとも非常備</b>なので必ず持参。リッジスの水は前夜に地下のColesで買っておくと、翌朝そのまま持ち出せる。' },
  { title:'緊急時', body:'緊急通報は <b>000</b>（警察・消防・救急 共通）。パスポート紛失・トラブルは<b>在シドニー日本国総領事館</b>へ。保険・カード会社の緊急窓口は情報タブの赤枠にメモ。' },
  { title:'薬の持ち込み ※重要', body:'入国カードで<b>医薬品は申告</b>する。<b>元の箱・PTPシートのまま</b>持参し、ピルケースへの詰め替えは避ける（説明できなくなる）。持込は原則3か月分まで。<b>市販の風邪薬・咳止めはコデイン含有だと規制対象になり得る</b>ので成分を確認し、処方薬は英文の説明があると安全。漢方・サプリも植物/動物由来のため申告対象。<b>申告すれば没収でも罰金はゼロ、隠すのが最悪手</b>。' },
  { title:'お土産メモ', body:'<b>買えないもの</b>＝カンガルー／エミューのジャーキー、ビーフジャーキー、肉エキス入り食品。日本は肉・肉製品の持ち込みが原則禁止で、<b>真空パックでも空港の免税店で買ったものでも没収</b>。種・植物もNG（ネイティブスパイスは粉になっているものを選ぶ）。蜂蜜は問題なし。<br><b>おもしろい定番</b>＝チキンソルト（鶏は入っていないポテト用の調味料）／ドロップベア（架空の凶暴コアラ）のグッズ／ビンチキン（ゴミを漁る白いトキ。植物園やハイドパークに実物がいる）のグッズ／ベジマイト味のShapes／ネイティブスパイス（レモンマートル・ワトルシード）／ティータオル／Bosisto\'sのユーカリオイル（薬局）／ポリマー紙幣の余り。<br><b>どこで買うか</b>＝DAY2ブロックアーケードの<b>Haigh\'s</b>（1915年創業・豪州最古の家族経営チョコレート店）／DAY3 QVマーケットでスパイスとマカダミア／<b>リッジス地下のColes</b>がスーパー系は最安／DAY6 QVBでT2・Aesop・R.M.Williams・Oroton。<b>TRSは同一店$300以上</b>なのでQVBの一店にまとめる。<br><b>アボリジナルアート</b>は模造品が多い。<b>Indigenous Art Codeのロゴ</b>がある店で買い、$250超なら真贋証明書が付くのが正常。大幅な値引きを持ちかける店は避ける。' },
  { title:'受託手荷物とロストバゲージ対策', body:'JAL国際線はエコノミー23kg×2個。<b>豪州国内線（ヴァージン）はエコノミー1個23kgが標準</b>で別枠なので、最終日程表で運賃タイプを確認。対策は<b>夫婦で服を半分ずつ交換して詰める</b>ことと、AirTagの携行。<b>受け取り時にその場で破損を確認</b>（持ち帰ってからでは申告できない）。到着ごとに古い紙タグを剥がすと誤搭載を防げる。' }
];

/* 持ち物（チェック状態は品名をキーに保存するので、項目を足しても既存のチェックがずれない） */
var PACKING = [
  { cat:'貴重品・書類', items:[
    'パスポート（有効期限：帰国後6ヶ月以上）','パスポートケース','ETA承認の控え（メールのスクショで可）',
    '海外旅行保険の証券（紙＋スマホ）','保険会社の24時間デスク番号（紙で持つ）',
    'クレジットカード（タッチ決済対応・複数枚）','現金（AUD 少額）＋日本円5,000〜10,000円（帰国後の交通費）',
    '予約確認書（フライト・ホテル・ツアー）印刷＋スマホ保存','パスポートのカラーコピー（原本と別に保管）',
    '証明写真 45×35mm 2〜4枚（紛失時の再発給用）' ] },
  { cat:'電子機器', items:[
    'スマホ＋充電器（ケーブル）','スマホショルダーストラップ（落下・置き引き防止）',
    'モバイルバッテリー（機内持込のみ・預け入れ不可）',
    '多口USB充電器（1個で2台まとめて）','長いケーブル 1.5〜2m（ホテルのコンセントは遠い）',
    '変換プラグ（Iタイプ・230V対応）','eSIM／SIM（日本で設定・到着後に有効化）',
    'Wi-Fiルーター＋充電器（機内持込のみ・預け入れ不可）',
    'AirTag（預け荷物に。国内線乗り継ぎ対策）','ガジェットポーチ（充電器類を1つに集約）',
    'カメラ（＋予備バッテリー・SDカード）' ] },
  { cat:'衣類（9月＝春・寒暖差大）', items:[
    'ウインドブレーカー（メルボルンは風が強い）','ウルトラライトダウン（山の朝は6℃）',
    '歩きやすいスニーカー（履き慣らしたもの・新品はNG）','重ね着できる服（3〜4日分）',
    '折りたたみ傘・軽い雨具','下着・靴下（日数分＋予備1〜2）','パジャマ・部屋着（海外ホテルに備えなし）',
    '折りたたみスリッパ（機内・室内用）' ] },
  { cat:'衛生・健康', items:[
    '常備薬（外箱・PTPシートのまま持参）','靴擦れ用パッド・絆創膏（朝に先貼りで予防）',
    '日焼け止め SPF50+ ＋ 塗り直し用','帽子（UVが非常に強い）','リップ・保湿クリーム（乾燥対策）',
    '歯ブラシ・洗面具（豪州ホテルは非常備）','髭剃り（豪州ホテルは非常備）','スキンケア・メイク道具',
    'メガネ・コンタクト予備＋保存液','経口補水パウダー（粉末なので液体規制の対象外）',
    '着圧ソックス（機内用・就寝用は別物）','英語メモ：貝・甲殻類が苦手（No shellfish/crustaceans）' ] },
  { cat:'あると便利', items:[
    'エコバッグ（レジ袋は有料／少ない）','ネックピロー・蒸気アイマスク・耳栓（機内用）',
    'ウェットティッシュ・ポケットティッシュ','折り畳みサブバッグ（帰りの増量用）',
    '荷物用スケール（超過料金を防ぐ）','汚れ物袋（清潔な衣類への匂い移りを防ぐ）',
    'ジップロック（液体小分け・液漏れ防止）','イヤホン（機内・移動用）',
    'ボールペン2本（入国カードは紙で機内配布）','吊るせる洗面用具ケース（洗面台が狭い）',
    'トラベルケトル（必ず100-240V対応。日本用100V専用は豪州で使えない）' ] }
];

function lsGet(key){ try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch(e){ return {}; } }
function lsSet(key, obj){ try { localStorage.setItem(key, JSON.stringify(obj)); } catch(e){} }

/* 進捗バーと「残りだけ」トグルの見出し。scope は td（ToDo）/ pk（持ち物） */
function prepSecHead(label, scope, hint){
  return '<div class="sec-h">— ' + label + ' —</div>' +
    '<div class="prog"><span class="pt"><span id="' + scope + '-done">0</span>/<span id="' + scope + '-total">0</span></span>' +
    '<div class="bar"><div class="fill" id="' + scope + '-fill" style="width:0%"></div></div>' +
    '<button type="button" class="only-left" data-scope="' + scope + '">残りだけ</button></div>' +
    (hint ? '<div class="sec-hint">' + hint + '</div>' : '');
}

function renderPrepPage() {
  var host = document.getElementById('pane-prep');
  var todoDone = lsGet('prep_todo_v1'), bookDone = lsGet('prep_book_v1'), bookNote = lsGet('prep_booknote_v1');
  var h = '<div class="ch-head"><div class="ch-eyebrow">PREPARATION</div><div class="ch-h1">準備</div>' +
    '<div class="ch-sub">チェックはこの端末に自動保存されます</div></div>';

  /* ToDo */
  h += prepSecHead('出発前 ToDo', 'td', '時期ごとの段。済んだものを隠すと残りだけが見えます');
  var groups = [];
  PREP_TODO.forEach(function(t){ if (groups.indexOf(t.grp) < 0) groups.push(t.grp); });
  h += '<div class="chk-wrap" id="wrap-td">';
  groups.forEach(function(g){
    h += '<div class="ledger" style="margin-top:8px"><div class="ledger-title">' + g +
         '<span class="grp-n"></span></div>';
    PREP_TODO.forEach(function(t, i){
      if (t.grp !== g) return;
      h += '<div class="check-row' + (todoDone[i] ? ' done' : '') + '" data-todo="' + i + '">' +
           '<span class="cbox"></span><span class="ct">' + t.text + '</span></div>';
    });
    h += '<div class="grp-empty">この段はすべて完了</div></div>';
  });
  h += '</div>';

  /* 予約トラッカー */
  h += '<div class="sec-h">— 予約・手配トラッカー —</div><div class="ledger" style="margin-top:0">';
  PREP_BOOK.forEach(function(b, i){
    h += '<div class="check-row' + (bookDone[i] ? ' done' : '') + '" data-book="' + i + '" style="border-bottom:none;padding-bottom:2px">' +
         '<span class="cbox"></span><span class="ct">' + b.text + '</span></div>' +
         '<input class="bk-note2" data-note="' + i + '" placeholder="予約番号・メモをここに" value="' + String(bookNote[i]||'').replace(/"/g,'&quot;') + '">';
  });
  h += '</div>';

  /* 持ち物 */
  h += prepSecHead('持ち物チェックリスト', 'pk', '荷造り中は「残りだけ」にすると詰め忘れが見つけやすいです');
  var pkState = lsGet('checklist_v1');
  h += '<div class="chk-wrap" id="wrap-pk">';
  PACKING.forEach(function(cat){
    h += '<div class="ledger" style="margin-top:8px"><div class="ledger-title">' + cat.cat +
         '<span class="grp-n"></span></div>';
    cat.items.forEach(function(item){
      h += '<div class="check-row' + (pkState[item] ? ' done' : '') + '" data-pk="' + item.replace(/"/g,'&quot;') + '">' +
           '<span class="cbox"></span><span class="ct">' + item + '</span></div>';
    });
    h += '<div class="grp-empty">この箱はすべて完了</div></div>';
  });
  h += '</div>';

  /* 基礎知識 */
  h += '<div class="sec-h">— 入国・現地の基礎知識 —</div>';
  PREP_KB.forEach(function(k){
    h += '<div class="kb-card"><div class="kb-title">' + k.title + '</div><div class="kb-body">' + k.body + '</div></div>';
  });

  host.innerHTML = h;
  prepUpdateCounts();

  /* イベント（委任） */
  host.addEventListener('click', function(e){
    if (!e.target.closest) return;
    /* 「残りだけ」トグル */
    var tg = e.target.closest('.only-left');
    if (tg) {
      var wrap = document.getElementById('wrap-' + tg.getAttribute('data-scope'));
      if (!wrap) return;
      var on = wrap.classList.toggle('hide-done');
      tg.classList.toggle('on', on);
      tg.textContent = on ? '全部表示' : '残りだけ';
      return;
    }
    var row = e.target.closest('.check-row');
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
    }
    prepUpdateCounts();
  });
  host.addEventListener('input', function(e){
    if (!e.target.classList || !e.target.classList.contains('bk-note2')) return;
    var n = lsGet('prep_booknote_v1');
    n[e.target.getAttribute('data-note')] = e.target.value;
    lsSet('prep_booknote_v1', n);
  });
}
/* ToDo・持ち物の進捗（全体バーと、段／箱ごとの内訳）をまとめて更新する */
function prepUpdateCounts(){
  ['td','pk'].forEach(function(scope){
    var wrap = document.getElementById('wrap-' + scope);
    if (!wrap) return;
    var total = wrap.querySelectorAll('.check-row').length;
    var done  = wrap.querySelectorAll('.check-row.done').length;
    var dEl = document.getElementById(scope + '-done'), tEl = document.getElementById(scope + '-total'),
        fEl = document.getElementById(scope + '-fill');
    if (dEl) dEl.textContent = done;
    if (tEl) tEl.textContent = total;
    if (fEl) fEl.style.width = (total ? Math.round(done/total*100) : 0) + '%';
    Array.prototype.forEach.call(wrap.querySelectorAll('.ledger'), function(led){
      var t = led.querySelectorAll('.check-row').length;
      var d = led.querySelectorAll('.check-row.done').length;
      var n = led.querySelector('.grp-n');
      if (n) n.textContent = d + '/' + t;
      led.classList.toggle('all-done', t > 0 && d === t);
    });
  });
}
