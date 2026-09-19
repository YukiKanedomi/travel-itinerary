/* ============ en.js — 旅の英語（読むタブの独立ページ・2026-09-20 新設） ============ */
/* 書式: 行 = { en, k（通じるカナ。<b>が強く読む所）, ja, note（解説）, alt:[[英文, カナ, 意味], ...] }
 *       「聞かれる」の行 = { q, qk, a, ak, ja, note, alt }（店員のセリフ q と自分の答え a を吹き出しで）
 * 一覧は英文＋カナ＋日本語の1行。タップで解説・言い換え・ボタン（見せる／コピー／翻訳／聞く）が開く。 */

var EN_INTRO = {
  title: '乗り切る3原則 — これだけ守れば足りる',
  lead: '①指さして This one ②分からなければ Sorry? ③最後に Thanks',
  body: '文を組み立てなくていい。<b>単語＋please</b> で全部通じる（Water, please. / Two, please.）。' +
    '語尾を上げると質問、下げると返事。<b>声は少し大きめ</b>に——小声だと聞き返される回数が増える。' +
    '店員の挨拶（How are you?）は返事を求めていない。Good, thanks. の一言で十分。' +
    '相手の英語が速いのは普通のこと。<b>Sorry? を何度言っても失礼ではない</b>。' +
    'それでも無理なら<b>アクションボタン長押し</b>で Google 翻訳の会話モード。最後は Thanks か Cheers。笑顔で終われば全部うまくいく。'
};
var EN_PHONE = {
  title: 'スマホで補う — 設定いらずの3つ',
  body: '<b>①英文を見せる</b>：フレーズをタップ → 「見せる」で画面いっぱいの英文になる。店員に向けるだけ。' +
    '<b>②長押しで翻訳</b>：この手帳や Safari の英文を長押しして「翻訳」を選ぶと Apple 翻訳が出る（音声も出せる）。' +
    '<b>③メニューはカメラ</b>：Google 翻訳アプリのカメラを向けると、その場で日本語に置き換わる。看板・成分表示・レシートも同じ。' +
    'カナ表記は「通じるカナ」——<b>太字を強く</b>、他は弱く速く読む。慣れたら上の「カナ」ボタンで消せる。'
};

var EN_SECTIONS = [
  { id:'je-ten-d', title:'10語の解説 — ニュアンスと他の言い方', rows:[
    { en:'This one, please.', k:'ディス<b>ワ</b>ン、プ<b>リ</b>ーズ', ja:'これください',
      note:'指さしと組み合わせるだけ。メニュー・ショーケース・商品・写真、何にでも使える。数を言うなら Two of these, please.',
      alt:[ ['That one, please.', '<b>ザ</b>ッワン、プリーズ', '離れた物・向こうの物'], ['These two, please.', 'ディーズ<b>トゥ</b>ー、プリーズ', 'この2つ'],
            ['Same again, please.', '<b>セ</b>イマ<b>ゲ</b>ン、プリーズ', '同じものをもう一つ／おかわり'], ['The same as her.', 'ダ<b>セ</b>イマズ<b>ハ</b>ー', '連れと同じもの'] ] },
    { en:'Two, please.', k:'<b>トゥ</b>ー、プ<b>リ</b>ーズ', ja:'2つ／2人で',
      note:'個数も人数もこれ。入場券や座席で「大人2人」なら Two adults.',
      alt:[ ['A table for two.', 'ア<b>テ</b>イボー・フォー<b>トゥ</b>ー', '2人です（レストラン入店時）'], ['Two adults, please.', 'トゥー<b>ア</b>ダルツ、プリーズ', '大人2枚'], ['Just the two of us.', 'ジャス・ダ<b>トゥ</b>ーオヴァス', '2人だけです'] ] },
    { en:'Yes, please. / No, thanks.', k:'<b>イェ</b>ス、プ<b>リ</b>ーズ／<b>ノ</b>ウ、<b>サ</b>ンクス', ja:'はい、お願いします／いいえ、結構です',
      note:'Yes・No だけだと少しぶっきらぼう。please／thanks を足すだけで感じが良くなる。断るときの No, thanks. は失礼にならない。',
      alt:[ ["Yes, that'd be great.", 'イェス、ザッビー・グ<b>レ</b>イト', '喜んで（勧められて受けるとき）'], ["No, I'm fine.", 'ノウ、アイム<b>ファ</b>イン', '大丈夫です'], ['Not right now, thanks.', 'ノッ<b>ラ</b>イ<b>ナ</b>ウ、サンクス', '今はいいです'] ] },
    { en:'Sorry?', k:'<b>ソ</b>リー？（語尾を上げる）', ja:'えっ、もう一度？',
      note:'語尾を上げて言う。聞き返しはこれ一語で足りる。Pardon? は少し堅く、What? はぶっきらぼうに聞こえる。',
      alt:[ ['Sorry, once more?', 'ソリー、<b>ワ</b>ンス<b>モ</b>ア？', 'もう一回いいですか'], ['Sorry, what was that?', 'ソリー、<b>ワ</b>ッワズ<b>ザ</b>ッ？', '今なんて？'], ['Say that again?', 'セイ・ザッ・ア<b>ゲ</b>ン？', 'もう一度（カジュアル）'] ] },
    { en:"That's all, thanks.", k:'ザッ<b>ツォ</b>ール、<b>サ</b>ンクス', ja:'以上です',
      note:'注文・買い物の締め。店員の Anything else? に返す言葉。これを言うと会計に進む。',
      alt:[ ["That's it, thanks.", 'ザッ<b>ツィ</b>ッ、サンクス', '同じ意味'], ["That'll do, thanks.", 'ザッル<b>ドゥ</b>ー、サンクス', 'それで十分（オージーらしい言い方）'], ["I'm good.", 'アイム<b>グ</b>ッ', 'もういいです'] ] },
    { en:'Card, please.', k:'<b>カ</b>ード、プ<b>リ</b>ーズ', ja:'カードで',
      note:'ほぼ全店タッチ決済。端末をこちらに向けられたら、何も言わずにかざしてよい。Cash or card? と聞かれたら Card.',
      alt:[ ['By card.', 'バイ<b>カ</b>ード', 'カードで'], ['Can I tap?', 'キャナイ<b>タ</b>ップ？', 'タッチできますか'], ['Do you take Amex?', 'ドゥユー・テイク・<b>ア</b>メックス？', 'アメックス使えますか'] ] },
    { en:'Excuse me.', k:'イクス<b>キュ</b>ーズミー', ja:'すみません（呼びかけ・通してほしい）',
      note:'人を呼ぶ・通る・注意を引くとき。ぶつかった時や割り込む時は Sorry. が自然。日本語の「すみません」は場面で2語に分かれる。',
      alt:[ ['Excuse me, could I order?', 'イクスキューズミー、クダイ<b>オ</b>ーダー？', '（店員を呼んで）注文いいですか'], ['Sorry, coming through.', 'ソリー、カミング<b>スル</b>ー', '通ります'], ['After you.', '<b>ア</b>フタ<b>ユ</b>ー', 'お先にどうぞ'] ] },
    { en:'Just looking, thanks.', k:'ジャス<b>ル</b>ッキン、<b>サ</b>ンクス', ja:'見てるだけです',
      note:'店員の Can I help you? / How are you going? への定番の返し。これで放っておいてもらえる。',
      alt:[ ["I'm just browsing.", 'アイム・ジャス・ブ<b>ラ</b>ウジン', '見て回っているだけ'], ["I'm fine, thanks.", 'アイム<b>ファ</b>イン、サンクス', '大丈夫です'], ["Actually, I'm looking for a scarf.", '<b>ア</b>クチュアリ、アイム・ルッキン・フォーラ・ス<b>カ</b>ーフ', '実は〜を探しています（探し物があるとき）'] ] },
    { en:"I'm good, thanks.", k:'アイム<b>グ</b>ッ、<b>サ</b>ンクス', ja:'大丈夫です（要りません）',
      note:'「調子がいい」ではなく「間に合っています」。Would you like…? と勧められたときの断り。日本語の「いいです」にいちばん近い。',
      alt:[ ["I'm OK, thanks.", 'アイモウ<b>ケ</b>イ、サンクス', '同じ意味'], ["No, thanks. I'm full.", 'ノウサンクス、アイム<b>フ</b>ル', '（食べ物を勧められて）お腹いっぱいです'], ['Maybe next time.', 'メイビー・<b>ネ</b>クス<b>タ</b>イム', 'また今度'] ] },
    { en:'Thanks so much.', k:'サンクス・<b>ソ</b>ウ<b>マ</b>ッチ', ja:'ありがとう',
      note:'Thank you very much. は少し改まった響き。Thanks a lot. / Thanks so much. が日常の温度。オーストラリアでは Cheers や Ta もよく聞く。',
      alt:[ ['Cheers.', '<b>チ</b>アーズ', 'ありがとう（軽く）'], ['Thanks heaps.', 'サンクス<b>ヒ</b>ープス', 'めっちゃありがとう（豪州流）'], ['Thanks for your help.', 'サンクス・フォーヨー<b>ヘ</b>ルプ', '助かりました'], ["That's very kind.", 'ザッツ・<b>ヴェ</b>リ<b>カ</b>インド', 'ご親切に'] ] }
  ] },

  { id:'je-aizuchi', title:'相槌・返事 — ニュアンスの違い', rows:[
    { en:'Yeah. / Yep.', k:'<b>イェ</b>ア／<b>イェ</b>ップ', ja:'うん',
      note:'返事の8割はこれで足りる。Yes. は少しかしこまった響き。Yep. はさらにカジュアルで、店員も普通に使う。',
      alt:[ ['Yeah, sure.', 'イェア、<b>シュ</b>ア', 'うん、いいよ'], ["Yep, that's right.", 'イェップ、ザッツ<b>ラ</b>イト', 'うん、そのとおり'], ['Absolutely.', 'アブソ<b>ル</b>ートリ', 'もちろん（強い同意）'] ] },
    { en:'No worries.', k:'ノウ<b>ワ</b>リーズ', ja:'気にしないで／どういたしまして／OK',
      note:'オーストラリアの万能語。①Thanks への「どういたしまして」②Sorry への「気にしないで」③頼みごとへの「いいよ」。自分でも使える。',
      alt:[ ['No problem.', 'ノウ・プ<b>ロ</b>ブレム', '同じ意味（どこでも通じる）'], ['All good.', 'オール<b>グ</b>ッ', '大丈夫だよ'], ["That's fine.", 'ザッツ<b>ファ</b>イン', 'それで結構です'] ] },
    { en:'Sure.', k:'<b>シュ</b>ア', ja:'いいよ／もちろん',
      note:'頼まれごとに快く応じるとき。Can I sit here? → Sure. のように相手からも来る。',
      alt:[ ['Sure thing.', 'シュア<b>シ</b>ング', 'もちろん（少し親しげ）'], ['Of course.', 'オヴ<b>コ</b>ース', 'もちろん'], ['Go ahead.', 'ゴウア<b>ヘ</b>ッド', 'どうぞ'] ] },
    { en:'Sounds good.', k:'サウンズ<b>グ</b>ッ', ja:'いいね',
      note:'提案に乗るとき。「〜でいい？」と聞かれて「それでいい」の返事にも。',
      alt:[ ['Sounds great.', 'サウンズ・グ<b>レ</b>イト', 'すごくいいね'], ['Perfect.', '<b>パ</b>ーフェクト', '完璧'], ['That works.', 'ザッ<b>ワ</b>ークス', 'それで大丈夫（都合が合う）'] ] },
    { en:'Oh, nice!', k:'オウ、<b>ナ</b>イス！', ja:'へえ、いいね',
      note:'相手の話に反応する一言。感情を乗せて言うと会話が続く。',
      alt:[ ['Lovely!', '<b>ラ</b>ヴリー！', 'すてき（豪州で多用）'], ['Oh, wow.', 'オウ、<b>ワ</b>ウ', 'わあ'], ["That's great.", 'ザッツ・グ<b>レ</b>イト', 'それはいいね'], ['Beautiful.', '<b>ビュ</b>ーティフォー', '（天気や料理にも）いいね'] ] },
    { en:'Really?', k:'<b>リ</b>アリー？', ja:'ほんとに？',
      note:'語尾を上げる。驚きと関心。相槌として Right. / I see. と混ぜると自然。',
      alt:[ ['Is that right?', 'イズ・ザッ・<b>ラ</b>イト？', 'そうなんですか'], ['Oh, I see.', 'オウ、アイ<b>シ</b>ー', 'なるほど'], ['Right.', '<b>ラ</b>イト', 'ええ、はい（軽い相槌）'] ] },
    { en:'Got it.', k:'<b>ガ</b>ディッ', ja:'分かりました',
      note:'説明を受けたときの締め。I understand. より軽い。',
      alt:[ ['OK, got it.', 'オウケイ、<b>ガ</b>ディッ', 'はい、分かりました'], ['Makes sense.', 'メイクス<b>セ</b>ンス', 'なるほど、納得'], ['Understood.', 'アンダース<b>トゥ</b>ッド', '了解です（少し堅い）'] ] },
    { en:'Maybe later.', k:'メイビー・<b>レ</b>イター', ja:'また後で',
      note:'やんわり断る。勧誘・追加注文・試食などに。断り切れないときの逃げ道。',
      alt:[ ["I'll think about it.", 'アイル・<b>シ</b>ンカバウティッ', '考えておきます'], ['Not today, thanks.', 'ノッ・トゥ<b>デ</b>イ、サンクス', '今日はいいです'], ["We're just having a look.", 'ウィア・ジャス・ハヴィンガ<b>ル</b>ック', '見ているだけなので'] ] },
    { en:'Cheers.', k:'<b>チ</b>アーズ', ja:'ありがとう／じゃあね',
      note:'①ありがとう ②さようなら ③乾杯。会計の後やタクシーを降りるときに一言。言われたら Cheers. と返してよい。',
      alt:[ ['Cheers, mate.', 'チアーズ、<b>メ</b>イト', 'ありがとう（親しげ）'], ['Ta.', '<b>タ</b>ー', 'ありがと（超カジュアル）'], ['Have a good one.', 'ハヴァ<b>グ</b>ッ<b>ワ</b>ン', 'よい一日を'] ] },
    { en:'You too.', k:'ユー<b>トゥ</b>ー', ja:'あなたもね',
      note:'Have a good day / Enjoy your meal / Have a good one と言われたときの返し。これだけで会話が丸く閉じる。',
      alt:[ ['Same to you.', 'セイム・トゥ<b>ユ</b>ー', 'あなたもね'], ['You have a good one too.', 'ユー・ハヴァ・グッワン<b>トゥ</b>ー', 'そちらもよい一日を'], ['Thanks, you too!', 'サンクス、ユー<b>トゥ</b>ー！', 'ありがとう、あなたも'] ] }
  ] },

  { id:'je-qa', title:'こう聞かれる — こう答える', chat:true, rows:[
    { q:'How are you? / How are you going?', qk:'ハウ<b>ア</b>ーユー？／ハウアーユー<b>ゴ</b>ーイン？', a:'Good, thanks. And you?', ak:'<b>グ</b>ッ、サンクス。アン<b>ジュ</b>ー？',
      ja:'挨拶であって質問ではない。体調を答えなくてよい。How are you going? は豪州特有で「どこへ行くの」ではない。And you? を付けると自然。',
      alt:[ ['Good, how are you?', 'グッ、ハウ<b>ア</b>ーユー？', 'いいよ、そちらは？'], ['Not bad.', 'ノッ<b>バ</b>ッド', 'まあまあ'], ['Pretty good, thanks.', 'プリティ<b>グ</b>ッ、サンクス', 'かなり調子いいよ'] ] },
    { q:'Have here or takeaway?', qk:'ハヴ<b>ヒ</b>ア・オア・<b>テ</b>イカウェイ？', a:'Have here. / Takeaway.', ak:'ハヴ<b>ヒ</b>ア／<b>テ</b>イカウェイ',
      ja:'店内か持ち帰りか。カフェで必ず聞かれる。米国式の For here or to go? でも通じる。',
      alt:[ ['Eat in or take away?', 'イー<b>ティ</b>ン・オア・テイカウェイ？', '同じ質問の別形'], ['To have here, please.', 'トゥ・ハヴ<b>ヒ</b>ア、プリーズ', '店内で'], ['To take away.', 'トゥ・<b>テ</b>イカウェイ', '持ち帰りで'] ] },
    { q:'Anything else?', qk:'<b>エ</b>ニシン<b>エ</b>ルス？', a:"That's all, thanks.", ak:'ザッ<b>ツォ</b>ール、サンクス',
      ja:'「ほかには？」。追加があるならここで言う。Is that everything? / Was there anything else? も同じ。',
      alt:[ ['Could I also get a water?', 'クダイ・<b>オ</b>ールソウ・ゲッタ・<b>ウォ</b>ーダ？', '水も追加で'], ['And a flat white, please.', 'アンダ・フラッ<b>ワ</b>イト、プリーズ', 'あとフラットホワイトを'], ["No, that's it.", 'ノウ、ザッ<b>ツィ</b>ッ', 'いえ、以上で'] ] },
    { q:'Do you want a bag?', qk:'ドゥユー・<b>ウォ</b>ンタ<b>バ</b>ッグ？', a:'No, thanks. / Yes, please.', ak:'ノウ<b>サ</b>ンクス／イェス・プ<b>リ</b>ーズ',
      ja:'レジ袋は有料（15〜25セント）。エコバッグがあれば No。Would you like a bag? / Need a bag? も同じ。',
      alt:[ ["I've got my own bag.", 'アイヴ・ガッ・マイ<b>オ</b>ウン<b>バ</b>ッグ', '自分の袋があります'], ['One bag, please.', 'ワン<b>バ</b>ッグ、プリーズ', '袋を1つ'], ['No bag, thanks.', 'ノウ<b>バ</b>ッグ、サンクス', '袋は要りません'] ] },
    { q:'Do you have Flybuys?', qk:'ドゥユー・ハヴ・フ<b>ラ</b>イバイズ？', a:'No.', ak:'<b>ノ</b>ウ',
      ja:'ポイントカードの有無。Coles は Flybuys、Woolworths は Everyday Rewards。毎回聞かれるが No の一言でよい。',
      alt:[ ["No, I don't.", 'ノウ、アイ<b>ド</b>ウント', '持っていません'], ['No, just visiting.', 'ノウ、ジャス・<b>ヴィ</b>ジティン', '旅行者なので'], ['No rewards card.', 'ノウ・リ<b>ウォ</b>ーズ・カード', 'カードはありません'] ] },
    { q:"Tap when you're ready.", qk:'<b>タ</b>ップ・ウェンユア<b>レ</b>ディ', a:'（無言でカードをかざす）', ak:'',
      ja:'「準備できたらタッチして」＝金額が出たので払ってOK。Just tap there. / Tap or insert? も同じ。',
      alt:[ ['Cash or card? — Card.', 'キャッシュ・オア・<b>カ</b>ード？ <b>カ</b>ード', '現金かカードか'], ['Do you want a receipt? — No, thanks.', 'ドゥユー・ウォンタ・リ<b>シ</b>ート？ ノウサンクス', 'レシートは？（免税TRS用の店では Yes, please.）'] ] },
    { q:'Do you have a booking?', qk:'ドゥユー・ハヴァ・<b>ブ</b>ッキン？', a:'No, just two.', ak:'ノウ、ジャス<b>トゥ</b>ー',
      ja:'予約の有無。Have you booked? / Under what name? も同じ流れ。待ち時間を聞くなら How long is the wait?',
      alt:[ ['No, walk-in. Two people.', 'ノウ、<b>ウォ</b>ーキン。トゥー<b>ピ</b>ーポー', '予約なし、2人です'], ['Is there a wait?', 'イズ・ゼアラ・<b>ウェ</b>イト？', '待ちますか'], ['Can we sit at the bar?', 'キャンウィ・シッ・アッダ<b>バ</b>ー？', 'カウンター席でもいい？（待ちが短い）'] ] },
    { q:'Is everything OK?', qk:'イズ・<b>エ</b>ヴリシン・オウ<b>ケ</b>イ？', a:'Lovely, thanks.', ak:'<b>ラ</b>ヴリー、サンクス',
      ja:'食事中に店員が様子を見に来る合図。How is everything? / How are we going here? も同じ。感想を一言返せば十分。',
      alt:[ ['Really good, thanks.', 'リアリー<b>グ</b>ッ、サンクス', 'とてもおいしいです'], ['Delicious.', 'ディ<b>リ</b>シャス', 'おいしい'], ['All good, thanks.', 'オール<b>グ</b>ッ、サンクス', '大丈夫です'] ] },
    { q:'Still working on that?', qk:'スティル・<b>ワ</b>ーキン・オン<b>ザ</b>ッ？', a:"Still going. / I'm done.", ak:'スティル・<b>ゴ</b>ーイン／アイム<b>ダ</b>ン',
      ja:'「まだ食べていますか」＝皿を下げていいか。work に驚かない。Can I take this? / Are you finished? も同じ。',
      alt:[ ['Yes, still going, thanks.', 'イェス、スティル<b>ゴ</b>ーイン、サンクス', 'まだ食べています'], ["No, I'm done. Thanks.", 'ノウ、アイム<b>ダ</b>ン。サンクス', '終わりました'], ['You can take that.', 'ユーキャン・<b>テ</b>イク・ザッ', '下げていいですよ'] ] },
    { q:'Which milk?', qk:'<b>ウィ</b>ッチ<b>ミ</b>ルク？', a:'Regular, please.', ak:'<b>レ</b>ギュラー、プリーズ',
      ja:'ミルクの種類。オーツ・アーモンド・ソイが定番で追加料金あり。普通の牛乳は regular か full cream。What milk? / Any milk preference? も同じ。',
      alt:[ ['Full cream, please.', 'フル・ク<b>リ</b>ーム、プリーズ', '普通の牛乳で'], ['Skim, please.', 'ス<b>キ</b>ム、プリーズ', '低脂肪で'], ['Oat milk, please.', '<b>オ</b>ウト・ミルク、プリーズ', 'オーツミルクで'] ] },
    { q:'Together or separate?', qk:'トゥ<b>ゲ</b>ザー・オア・<b>セ</b>パレット？', a:'Together, please.', ak:'トゥ<b>ゲ</b>ザー、プリーズ',
      ja:'会計を一緒にするか別々にするか。2人連れだと聞かれる。One bill? / Splitting? も同じ。',
      alt:[ ['All together.', 'オール・トゥ<b>ゲ</b>ザー', '全部一緒で'], ['Separately, please.', '<b>セ</b>パレットリ、プリーズ', '別々で'], ["I'll get this.", 'アイル・<b>ゲ</b>ッ・ディス', 'ここは私が払います'] ] },
    { q:'Any allergies?', qk:'エニ・<b>ア</b>ラジーズ？', a:'No.', ak:'<b>ノ</b>ウ',
      ja:'アレルギーの有無。Any dietaries? は「食事制限は？」で同じ意味。なければ No で終わる。',
      alt:[ ['No allergies.', 'ノウ・<b>ア</b>ラジーズ', 'ありません'], ['Not too spicy, please.', 'ノッ・トゥー・ス<b>パ</b>イシー、プリーズ', '辛くしすぎないで（制限ではなく好み）'] ] },
    { q:'Where are you from?', qk:'<b>ウェ</b>アラユー・フ<b>ロ</b>ム？', a:'Japan.', ak:'ジャ<b>パ</b>ン',
      ja:'雑談の入口。都市名まで言うと会話が続く。近くの人は Yokohama, near Tokyo. でよい。',
      alt:[ ['From Tokyo, Japan.', 'フロム・<b>トウ</b>キョウ、ジャ<b>パ</b>ン', '日本の東京から'], ['First time in Australia.', '<b>ファ</b>ースタイム・イン・オス<b>トレ</b>イリア', '初めて来ました'], ['We love it so far.', 'ウィ<b>ラ</b>ヴィッ・ソウ<b>ファ</b>ー', 'とても気に入っています'] ] },
    { q:'How long are you here for?', qk:'ハウ<b>ロ</b>ング・アーユー・<b>ヒ</b>ア・フォー？', a:'Six days.', ak:'<b>シ</b>ックス<b>デ</b>イズ',
      ja:'滞在期間。Just a week. でも十分。',
      alt:[ ['Three days in Melbourne, then Sydney.', 'スリー<b>デ</b>イズ・イン・<b>メ</b>ルバン、ゼン・<b>シ</b>ドニー', 'メルボルン3日、それからシドニー（Melbourne は「メルバン」）'], ['We leave on Saturday.', 'ウィ・<b>リ</b>ーヴ・オン・<b>サ</b>タデイ', '土曜に発ちます'] ] },
    { q:'What are you up to today?', qk:'<b>ワ</b>ラユー・<b>ア</b>ップトゥ・トゥ<b>デ</b>イ？', a:'Just walking around.', ak:'ジャス・<b>ウォ</b>ーキン・ア<b>ラ</b>ウンド',
      ja:'「今日は何を？」の雑談。Any plans? も同じ。予定を一つ言えば十分。',
      alt:[ ['Blue Mountains tomorrow.', 'ブルー<b>マ</b>ウンテンズ・トゥ<b>モ</b>ロウ', '明日はブルーマウンテンズ'], ['Going to the market.', 'ゴーイン・トゥダ<b>マ</b>ーケット', 'マーケットへ'], ['Just exploring the city.', 'ジャス・イクスプ<b>ロ</b>ーリン・ダ<b>シ</b>ティ', '街を見て回ります'] ] },
    { q:'Anything to declare?', qk:'エニシン・トゥ・ディク<b>レ</b>ア？', a:'Yes, snacks and medicine.', ak:'イェス、ス<b>ナ</b>ックス・アン・<b>メ</b>ディスン',
      ja:'検疫。「申告するものは？」。食品・薬は Yes と言って見せるだけ。Are you carrying any food? も同じ。',
      alt:[ ['Just some Japanese snacks.', 'ジャス・サム・ジャパ<b>ニ</b>ーズ・ス<b>ナ</b>ックス', '日本のお菓子だけです'], ['And some medicine.', 'アン・サム・<b>メ</b>ディスン', 'それと薬が少し'], ['This is all.', 'ディス・イズ・<b>オ</b>ール', 'これで全部です'] ] }
  ] },

  { id:'je-lost', title:'聞き取れなかったとき — 恥ずかしくない言い方', rows:[
    { en:'Sorry?', k:'<b>ソ</b>リー？', ja:'もう一度？',
      note:'まずこれ。2回目も同じで構わない。相手は言い方を変えて繰り返してくれる。',
      alt:[ ['Sorry, once more?', 'ソリー、<b>ワ</b>ンス<b>モ</b>ア？', 'もう一回いいですか'], ['Could you say that again?', 'クジュー・セイ・ザッ・ア<b>ゲ</b>ン？', 'もう一度言ってもらえますか'] ] },
    { en:'Slowly, please.', k:'ス<b>ロ</b>ウリ、プ<b>リ</b>ーズ', ja:'ゆっくりお願いします',
      note:'速さが原因ならこれ。相手は気を悪くしない。',
      alt:[ ['Could you speak a bit slower?', 'クジュー・スピーカ・ビッ・ス<b>ロ</b>ウワー？', '少しゆっくり話してもらえますか'], ['A bit slower, please.', 'ア・ビッ・ス<b>ロ</b>ウワー、プリーズ', 'もう少しゆっくり'] ] },
    { en:'Sorry, my English is not great.', k:'ソリー、マイ・<b>イ</b>ングリッシュ・イズ・ノッ・グ<b>レ</b>イト', ja:'英語があまり得意でなくて',
      note:'先に言っておくと相手が合わせてくれる。恥ずかしがらずに使う。not great は not good より柔らかい。',
      alt:[ ["I'm still learning English.", 'アイム・スティル・<b>ラ</b>ーニン・イングリッシュ', '英語は勉強中です'], ['Simple words, please.', '<b>シ</b>ンポー・<b>ワ</b>ーズ、プリーズ', '簡単な言葉でお願いします'] ] },
    { en:'Can you show me?', k:'キャニュー・<b>ショ</b>ウミー？', ja:'見せて／指さして教えて',
      note:'場所・商品・画面。言葉より指さしで解決することが多い。',
      alt:[ ['Could you point to it?', 'クジュー・<b>ポ</b>イン・トゥイッ？', '指さしてもらえますか'], ['Which one?', '<b>ウィ</b>ッチ<b>ワ</b>ン？', 'どれですか'], ['Where exactly?', 'ウェア・イグ<b>ザ</b>クトリ？', '正確にはどこ？'] ] },
    { en:'Is it this one?', k:'イズィッ・<b>ディ</b>ス<b>ワ</b>ン？', ja:'これですか？',
      note:'自分が指さして確認する。Yes/No で答えが返るので楽。',
      alt:[ ['Do you mean this?', 'ドゥユー・<b>ミ</b>ーン・ディス？', 'これのことですか'], ['This way?', 'ディス<b>ウェ</b>イ？', 'こっち？（道を指して）'] ] },
    { en:'Could you write it down?', k:'クジュー・<b>ラ</b>イティッ・<b>ダ</b>ウン？', ja:'書いてもらえますか',
      note:'数字・地名・時間は書いてもらうのが確実。スマホを差し出して Could you type it? でもよい。',
      alt:[ ['Could you type it here?', 'クジュー・<b>タ</b>イピッ・<b>ヒ</b>ア？', 'ここに打ってもらえますか（スマホを渡す）'], ['One second, let me use my phone.', 'ワン<b>セ</b>カンド、レッミー・ユーズ・マイ<b>フォ</b>ウン', 'ちょっと待って、スマホ（翻訳）を使います'] ] }
  ] },

  { id:'je-aussie', title:'オージー語ミニ辞典 — 聞こえたらこれ', rows:[
    { en:'No worries', k:'ノウ<b>ワ</b>リーズ', ja:'大丈夫・どういたしまして・気にしないで', note:'一日に何度も聞く。相槌の項も参照。' },
    { en:'Ta', k:'<b>タ</b>ー', ja:'ありがとう', note:'Thanks のさらに軽い版。店員が小さく Ta. と言う。' },
    { en:'Mate', k:'<b>メ</b>イト', ja:'（呼びかけ）', note:'友達・お客・誰にでも。言われても親しみの印で、返す必要はない。' },
    { en:'How ya going?', k:'ハウヤ<b>ゴ</b>ーイン？', ja:'調子どう？（挨拶）', note:'How are you going? の縮まった形。Good, thanks. で返す。' },
    { en:'Too easy', k:'トゥー<b>イ</b>ージー', ja:'お安い御用', note:'頼みごとに「はいよ」。No worries と同じ温度。' },
    { en:'Good on ya', k:'グッ<b>ド</b>ンヤ', ja:'よくやった・いいね', note:'Good on you. 褒め言葉。' },
    { en:'Brekkie / Arvo', k:'ブ<b>レ</b>ッキー／<b>ア</b>ーヴォ', ja:'朝食／午後', note:'語尾を -ie / -o に縮めるのが豪州流。看板やメニューにも出る。' },
    { en:'Heaps', k:'<b>ヒ</b>ープス', ja:'たくさん', note:'Heaps good = めっちゃいい。Thanks heaps = ほんとにありがとう。' },
    { en:'Reckon', k:'<b>レ</b>コン', ja:'思う', note:'I reckon = 〜だと思う。You reckon? = そう思う？' },
    { en:'Maccas', k:'<b>マ</b>ッカーズ', ja:'マクドナルド', note:'看板もこの表記のことがある。' },
    { en:'Bottle-o', k:'<b>ボ</b>トロウ', ja:'酒屋', note:'スーパーでは酒を売っていない。BWS・Liquorland がそれ。' },
    { en:'Sunnies / Thongs', k:'<b>サ</b>ニーズ／<b>ソ</b>ングズ', ja:'サングラス／ビーチサンダル', note:'thongs は下着ではない。' },
    { en:'Cuppa / Bikkie', k:'<b>カ</b>パ／<b>ビ</b>ッキー', ja:'お茶一杯／ビスケット', note:'Fancy a cuppa? = お茶どう？' },
    { en:'Lovely / Gorgeous', k:'<b>ラ</b>ヴリー／<b>ゴ</b>ージャス', ja:'すてき・おいしい・いい天気', note:'人にも物にも天気にも。褒め言葉の万能語。自分でも使ってよい。' }
  ] }
];

/* 場面別（見せるだけで通じる短文） */
var EN_SCENES = [
  { title:'カフェ', rows:[
    { en:'A flat white, please.', k:'ア・フラッ<b>ワ</b>イト、プリーズ', ja:'フラットホワイトを1つ', note:'サイズを聞かれたら Regular. 種類を言わない「コーヒーください」は通じない。' },
    { en:'Two flat whites, have here.', k:'トゥー・フラッ<b>ワ</b>イツ、ハヴ<b>ヒ</b>ア', ja:'フラットホワイト2つ、店内で' },
    { en:'Takeaway, please.', k:'<b>テ</b>イカウェイ、プリーズ', ja:'持ち帰りで', note:'to go でも通じるが、豪州では takeaway が普通。' },
    { en:'Tap water, please.', k:'<b>タ</b>ップ・<b>ウォ</b>ーダ、プリーズ', ja:'水道水をください（無料）', note:'Water だけだとボトル（有料）が出ることがある。water は「ウォーダ」と濁ると通じやすい。' },
    { en:'Can we sit here?', k:'キャンウィ・シッ<b>ヒ</b>ア？', ja:'ここ座っていい？' } ] },
  { title:'レストラン', rows:[
    { en:'A table for two, please.', k:'ア<b>テ</b>イボー・フォー<b>トゥ</b>ー、プリーズ', ja:'2人です' },
    { en:'Is this spicy? Mild, please.', k:'イズ・ディス・ス<b>パ</b>イシー？ <b>マ</b>イルド、プリーズ', ja:'これ辛い？ 辛くしないで' },
    { en:'Could we have the bill, please?', k:'クドウィ・ハヴ・ダ<b>ビ</b>ル、プリーズ？', ja:'お会計をお願いします', note:'カジュアルな店はカウンターで払う。席で待たずに Can I pay here? と聞く。' },
    { en:'Can I pay here?', k:'キャナイ・ペイ<b>ヒ</b>ア？', ja:'ここで払えますか' },
    { en:'No tip, thanks.', k:'ノウ<b>ティ</b>ップ、サンクス', ja:'チップはなしで', note:'端末にチップ画面が出たら 0% か No tip を押せばよい。言わなくても失礼ではない。' } ] },
  { title:'ホテル', rows:[
    { en:'Check in, please.', k:'チェッ<b>キ</b>ン、プリーズ', ja:'チェックインお願いします', note:'続けて予約の姓を言う。パスポートを出せば伝わる。' },
    { en:'Can I leave my luggage until check-in?', k:'キャナイ・<b>リ</b>ーヴ・マイ・<b>ラ</b>ゲッジ・アンティル・チェッ<b>キ</b>ン？', ja:'チェックインまで荷物を預かってもらえますか' },
    { en:'What time is breakfast?', k:'ワッ<b>タ</b>イム・イズ・ブ<b>レ</b>ックファスト？', ja:'朝食は何時から？' },
    { en:'Wi-Fi password, please.', k:'<b>ワ</b>イファイ・<b>パ</b>スワード、プリーズ', ja:'Wi-Fiのパスワードを' },
    { en:'Check out, please.', k:'チェッ<b>カ</b>ウト、プリーズ', ja:'チェックアウトお願いします', note:'デポジットの解除は Is the deposit released? で確認できる。' },
    { en:'Could you call a taxi?', k:'クジュー・<b>コ</b>ーラ・<b>タ</b>クシー？', ja:'タクシーを呼んでもらえますか' } ] },
  { title:'交通', rows:[
    { en:'Does this go to Southern Cross?', k:'ダズ・ディス・ゴウ・トゥ・<b>サ</b>ザン・ク<b>ロ</b>ス？', ja:'これサザンクロス行き？' },
    { en:'Two to the city, please.', k:'トゥー・トゥダ<b>シ</b>ティ、プリーズ', ja:'市内まで2人分' },
    { en:'Where do I tap on?', k:'ウェア・ドゥアイ・<b>タ</b>ッ<b>ポ</b>ン？', ja:'タッチはどこで？', note:'tap on = 乗車タッチ、tap off = 降車タッチ。フェリーも同じ。' },
    { en:'To this address, please.', k:'トゥ・ディス・アド<b>レ</b>ス、プリーズ', ja:'この住所までお願いします（情報タブの宿泊先を見せる）' },
    { en:'Terminal 3, Virgin Australia.', k:'<b>タ</b>ーミナル・ス<b>リ</b>ー、<b>ヴァ</b>ージン・オス<b>トレ</b>イリア', ja:'T3、ヴァージンオーストラリアへ' } ] },
  { title:'空港・入国', rows:[
    { en:'Holiday. Six days.', k:'<b>ホ</b>リデイ。<b>シ</b>ックス<b>デ</b>イズ', ja:'観光です。6日間', note:'入国審査で聞かれる2点。Purpose? → Holiday. How long? → Six days.' },
    { en:'I have snacks and medicine to declare.', k:'アイ・ハヴ・ス<b>ナ</b>ックス・アン・<b>メ</b>ディスン・トゥ・ディク<b>レ</b>ア', ja:'お菓子と薬を申告します' },
    { en:'Nothing else.', k:'<b>ナ</b>シン<b>エ</b>ルス', ja:'ほかにはありません' },
    { en:'Where is the TRS counter?', k:'ウェアリズ・ダ・ティーアール<b>エ</b>ス・<b>カ</b>ウンター？', ja:'TRSのカウンターはどこ？' },
    { en:'My bag has not come out.', k:'マイ<b>バ</b>ッグ・ハズ・ノッ・カ<b>マ</b>ウト', ja:'荷物が出てきません' } ] },
  { title:'買い物', rows:[
    { en:'Just looking, thanks.', k:'ジャス<b>ル</b>ッキン、サンクス', ja:'見てるだけです' },
    { en:'Do you have this in another colour?', k:'ドゥユー・ハヴ・ディス・イン・ア<b>ナ</b>ザー・<b>カ</b>ラー？', ja:'色違いはありますか' },
    { en:'One tax invoice, please.', k:'ワン・<b>タ</b>ックス・<b>イ</b>ンヴォイス、プリーズ', ja:'領収書を1枚にまとめて（TRS用）', note:'TRS は同一店 $300 以上。1枚の tax invoice にまとめてもらう。' },
    { en:'No bag, thanks.', k:'ノウ<b>バ</b>ッグ、サンクス', ja:'袋は要りません' },
    { en:'Card, please.', k:'<b>カ</b>ード、プリーズ', ja:'カードで' } ] },
  { title:'困った時', rows:[
    { en:'Where is the toilet?', k:'ウェアリズ・ダ<b>トイ</b>レット？', ja:'トイレはどこですか', note:'bathroom / restroom でも通じるが、豪州は toilet が普通で失礼ではない。' },
    { en:"I don't understand. Could you write it down?", k:'アイ・ドウント・アンダース<b>タ</b>ンド。クジュー・<b>ラ</b>イティッ・<b>ダ</b>ウン？', ja:'分かりません。書いてもらえますか' },
    { en:"I've lost my passport.", k:'アイヴ・<b>ロ</b>スト・マイ・<b>パ</b>スポート', ja:'パスポートをなくしました' },
    { en:'Could you call an ambulance? / the police?', k:'クジュー・コーラン・<b>ア</b>ンビュランス？／ダ・ポ<b>リ</b>ース？', ja:'救急車を／警察を呼んでください' },
    { en:'I feel sick. Where is a pharmacy?', k:'アイ・フィール<b>シ</b>ック。ウェアリザ・<b>ファ</b>ーマシー？', ja:'気分が悪い。薬局はどこ？', note:'薬局は chemist とも言う。Chemist Warehouse が大手。' },
    { en:'Sorry, it stopped.', k:'ソリー、イッ・ス<b>ト</b>ップト', ja:'すみません、止まりました（セルフレジ）' } ] }
];

/* ---------- 描画 ---------- */
function enAttr(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function enPlain(s){ return String(s == null ? '' : s).replace(/<[^>]+>/g, ''); }

function enActHTML(en, k, ja) {
  var url = 'https://translate.google.com/?sl=en&tl=ja&op=translate&text=' + encodeURIComponent(enPlain(en));
  return '<div class="en-act" data-en="' + enAttr(en) + '" data-k="' + enAttr(k) + '" data-ja="' + enAttr(enPlain(ja)) + '">' +
    '<button type="button" onclick="enShowFrom(event,this)">見せる</button>' +
    '<button type="button" onclick="enCopyFrom(event,this)">コピー</button>' +
    '<button type="button" onclick="enSpeakFrom(event,this)">聞く</button>' +
    '<a href="' + url + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">翻訳で開く</a></div>';
}
function enAltsHTML(alt) {
  if (!alt || !alt.length) return '';
  var h = '<div class="en-alts"><div class="en-alts-k">他の言い方</div>';
  alt.forEach(function(a){
    h += '<div class="en-alt" data-en="' + enAttr(a[0]) + '" data-k="' + enAttr(a[1]) + '" data-ja="' + enAttr(a[2]) + '" onclick="enShowFrom(event,this)">' +
      '<div class="a">' + a[0] + '</div><div class="ak en-k">' + a[1] + '</div><div class="m">' + a[2] + '</div></div>';
  });
  return h + '</div>';
}
function enSearchKey(parts) {
  return enAttr(parts.map(function(p){ return enPlain(p || ''); }).join(' ').toLowerCase());
}
function enRowHTML(r) {
  var key = enSearchKey([r.en, r.ja, r.note, r.k].concat((r.alt || []).map(function(a){ return a[0] + ' ' + a[2]; })));
  var h = '<div class="en-row" data-s="' + key + '" onclick="enRowTap(event,this)">' +
    '<div class="en-main"><div class="en">' + r.en + '</div>' + (r.k ? '<div class="en-k">' + r.k + '</div>' : '') + '<div class="ja">' + r.ja + '</div></div>' +
    '<div class="en-more">' + (r.note ? '<div class="en-note">' + r.note + '</div>' : '') + enAltsHTML(r.alt) + enActHTML(r.en, r.k, r.ja) + '</div></div>';
  return h;
}
function enChatHTML(r) {
  var key = enSearchKey([r.q, r.a, r.ja, r.qk, r.ak].concat((r.alt || []).map(function(a){ return a[0] + ' ' + a[2]; })));
  return '<div class="en-row en-chat" data-s="' + key + '" onclick="enRowTap(event,this)">' +
    '<div class="en-main">' +
      '<div class="bub l"><div class="who">店員</div><div class="en">' + r.q + '</div>' + (r.qk ? '<div class="en-k">' + r.qk + '</div>' : '') + '</div>' +
      '<div class="bub r"><div class="who">自分</div><div class="en">' + r.a + '</div>' + (r.ak ? '<div class="en-k">' + r.ak + '</div>' : '') + '</div>' +
    '</div>' +
    '<div class="en-more"><div class="en-note">' + r.ja + '</div>' + enAltsHTML(r.alt) + enActHTML(r.a, r.ak, r.q) + '</div></div>';
}
function enGridHTML(rows) {
  return '<div class="en-grid">' + rows.map(function(r){
    return '<button type="button" class="en-cell" data-en="' + enAttr(r.en) + '" data-k="' + enAttr(r.k) + '" data-ja="' + enAttr(r.ja) + '" onclick="enShowFrom(event,this)">' +
      '<span class="en">' + r.en + '</span><span class="en-k">' + r.k + '</span><span class="ja">' + r.ja + '</span></button>';
  }).join('') + '</div>';
}

function renderEnPage() {
  var host = document.getElementById('pane-en');
  if (!host) return;
  var kanaOff = false;
  try { kanaOff = localStorage.getItem('en_kana_v1') === 'off'; } catch(e) {}
  host.classList.toggle('kana-off', kanaOff);

  var h = '<div class="toc-head"><div class="toc-eyebrow">TRAVEL ENGLISH</div>' +
    '<div class="toc-h1">旅の英語</div></div>';
  h += '<div class="sec-hint">太字の一行が「言う／見せる」言葉。行をタップすると解説・他の言い方・ボタン（見せる／コピー／聞く／翻訳）が開く。</div>';
  h += '<div class="en-tools"><input type="search" id="en-q" placeholder="日本語で探す（袋・会計・辛い・トイレ）" oninput="enFilter(this.value)" autocomplete="off">' +
    '<button type="button" class="en-kana-btn" id="en-kana-btn" onclick="enKanaToggle()">' + (kanaOff ? 'カナ オフ' : 'カナ オン') + '</button></div>';
  h += jmpHTML([['je-first','3原則'],['je-ten','お守り'],['je-ten-d','10語'],['je-aizuchi','相槌'],['je-qa','聞かれる'],['je-lost','聞き取れない'],['je-aussie','オージー語'],['je-scene','場面別']]);

  h += '<div class="en-static"><div class="sec-h jmp-t" id="je-first">— はじめに —</div>';
  h += '<div class="kb-card gd-card"><div class="kb-title">' + EN_INTRO.title + '</div>' +
    '<div class="gd-lead">' + EN_INTRO.lead + '</div><div class="kb-body">' + EN_INTRO.body + '</div></div>';
  h += '<div class="kb-card gd-card gd-fold" onclick="gdFold(this)"><div class="kb-title">' + EN_PHONE.title + '</div><div class="kb-body">' + EN_PHONE.body + '</div></div>';

  h += '<div class="sec-h jmp-t" id="je-ten">— お守り — 10語（タップで大きく見せる） —</div>';
  h += enGridHTML(EN_SECTIONS[0].rows) + '</div>';

  EN_SECTIONS.forEach(function(sec){
    h += '<div class="sec-h jmp-t en-sh" id="' + sec.id + '">— ' + sec.title + ' —</div>';
    h += '<div class="kb-card en-card">' + sec.rows.map(sec.chat ? enChatHTML : enRowHTML).join('') + '</div>';
  });

  h += '<div class="sec-h jmp-t en-sh" id="je-scene">— 場面別 —</div>';
  h += '<div class="sec-hint en-sh">場面ごとの短文。タップで開く。</div>';
  EN_SCENES.forEach(function(k){
    h += '<div class="kb-card gd-card gd-fold en-scene" onclick="gdFold(this)">' +
      '<div class="kb-title">' + k.title + '</div><div class="kb-body">' + k.rows.map(enRowHTML).join('') + '</div></div>';
  });
  h += '<div class="en-none" id="en-none" hidden>見つかりませんでした。別の言葉で（例：袋・会計・辛い・水）</div>';

  host.innerHTML = h;
  enEnsureShow();
}

/* ---------- 操作 ---------- */
function enRowTap(e, row) {
  if (e.target.closest && e.target.closest('.en-act, .en-alt, a, button')) return;
  e.stopPropagation();
  row.classList.toggle('open');
}
function enKanaToggle() {
  var host = document.getElementById('pane-en');
  var off = !host.classList.contains('kana-off');
  host.classList.toggle('kana-off', off);
  try { localStorage.setItem('en_kana_v1', off ? 'off' : 'on'); } catch(e) {}
  var b = document.getElementById('en-kana-btn'); if (b) b.textContent = off ? 'カナ オフ' : 'カナ オン';
}
function enFilter(q) {
  var host = document.getElementById('pane-en');
  q = String(q || '').trim().toLowerCase();
  host.classList.toggle('searching', !!q);
  var any = false;
  host.querySelectorAll('.en-row').forEach(function(r){
    var hit = !q || (r.getAttribute('data-s') || '').indexOf(q) >= 0;
    r.hidden = !hit; if (hit) any = true;
    if (q && hit) r.classList.add('open'); else if (!q) r.classList.remove('open');
  });
  /* 行が全部消えたカードとその見出しは隠す */
  host.querySelectorAll('.en-card, .en-scene').forEach(function(card){
    var alive = !q || card.querySelector('.en-row:not([hidden])');
    card.hidden = !alive;
    if (card.classList.contains('en-scene')) card.classList.toggle('open', !!q && !!alive);
  });
  host.querySelectorAll('.en-sh').forEach(function(sh){ sh.hidden = !!q; });
  var none = document.getElementById('en-none'); if (none) none.hidden = !q || any;
}
function enDataOf(el) {
  var d = el.closest('[data-en]') || el;
  return { en:d.getAttribute('data-en') || '', k:d.getAttribute('data-k') || '', ja:d.getAttribute('data-ja') || '' };
}
function enEnsureShow() {
  if (document.getElementById('en-show')) return;
  var v = document.createElement('div');
  v.id = 'en-show'; v.className = 'en-show';
  v.innerHTML = '<div class="en-show-in"><div class="en-show-en" id="en-show-en"></div><div class="en-show-k" id="en-show-k"></div>' +
    '<div class="en-show-ja" id="en-show-ja"></div></div>' +
    '<div class="en-show-bar"><button type="button" onclick="enCopyShown()">コピー</button><button type="button" onclick="enSpeakShown()">聞く</button>' +
    '<button type="button" class="x" onclick="enHide()">閉じる</button></div>';
  v.addEventListener('click', function(e){ if (e.target === v) enHide(); });
  document.body.appendChild(v);
}
var _enShown = null;
function enShow(d) {
  enEnsureShow();
  _enShown = d;
  var kanaOff = document.getElementById('pane-en').classList.contains('kana-off');
  document.getElementById('en-show-en').innerHTML = d.en;
  document.getElementById('en-show-k').innerHTML = kanaOff ? '' : d.k;
  document.getElementById('en-show-ja').textContent = d.ja;
  var v = document.getElementById('en-show');
  v.classList.toggle('long', enPlain(d.en).length > 28);
  v.classList.add('on');
}
function enHide() { var v = document.getElementById('en-show'); if (v) v.classList.remove('on'); }
function enShowFrom(e, el) { e.stopPropagation(); enShow(enDataOf(el)); }
function enCopyText(t) {
  var done = function(){ if (typeof toast === 'function') toast('コピーしました'); };
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t).then(done, function(){}); return; }
  } catch(err) {}
  try {
    var ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done();
  } catch(err2) {}
}
function enCopyFrom(e, el) { e.stopPropagation(); enCopyText(enPlain(enDataOf(el).en)); }
function enCopyShown() { if (_enShown) enCopyText(enPlain(_enShown.en)); }
function enSpeakText(t) {
  try {
    if (!window.speechSynthesis) { if (typeof toast === 'function') toast('この端末では読み上げできません'); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(enPlain(t).replace(/\s*\/\s*/g, '. ').replace(/（[^）]*）/g, ''));
    u.lang = 'en-AU'; u.rate = 0.85;
    var vs = speechSynthesis.getVoices() || [];
    var pick = vs.filter(function(v){ return /^en[-_]AU/i.test(v.lang); })[0] || vs.filter(function(v){ return /^en[-_]GB/i.test(v.lang); })[0] || vs.filter(function(v){ return /^en/i.test(v.lang); })[0];
    if (pick) u.voice = pick;
    speechSynthesis.speak(u);
  } catch(err) {}
}
function enSpeakFrom(e, el) { e.stopPropagation(); enSpeakText(enDataOf(el).en); }
function enSpeakShown() { if (_enShown) enSpeakText(_enShown.en); }
