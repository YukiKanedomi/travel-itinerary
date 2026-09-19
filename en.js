/* ============ en.js — 旅の英語（読むタブの独立ページ・2026-09-20 新設） ============ */
/* 書式: EN_SECTIONS[n].rows[m] = { en, ja, note（解説・ニュアンス）, alt:[[言い換え, 意味], ...] }
 * 指差しで見せるのは en。note と alt は読み物として。 */

var EN_INTRO = {
  title: '乗り切る3原則 — これだけ守れば足りる',
  lead: '①指さして This one ②分からなければ Sorry? ③最後に Thanks',
  body: '文を組み立てなくていい。<b>単語＋please</b> で全部通じる（Water, please. / Two, please.）。' +
    '語尾を上げると質問、下げると返事。<b>声は少し大きめ</b>に——小声だと聞き返される回数が増える。' +
    '店員の挨拶（How are you?）は返事を求めていない。Good, thanks. の一言で十分。' +
    '相手の英語が速いのは普通のこと。<b>Sorry? を何度言っても失礼ではない</b>。' +
    '最後は Thanks か Cheers。笑顔で終われば全部うまくいく。'
};

var EN_SECTIONS = [
  { id:'je-ten', title:'まずこれだけ — 10語で乗り切る', rows:[
    { en:'This one, please.', ja:'これください',
      note:'指さしと組み合わせるだけ。メニュー・ショーケース・商品・写真、何にでも使える。数を言うなら Two of these, please.',
      alt:[ ['That one, please.', '離れた物・向こうの物'], ['These two, please.', 'この2つ'],
            ['Same again, please.', '同じものをもう一つ／おかわり'], ['The same as her.', '連れと同じもの'] ] },
    { en:'Two, please.', ja:'2つ／2人で',
      note:'個数も人数もこれ。入場券や座席で「大人2人」なら Two adults.',
      alt:[ ['A table for two.', '2人です（レストラン入店時）'], ['Two adults, please.', '大人2枚'], ['Just the two of us.', '2人だけです'] ] },
    { en:'Yes, please. / No, thanks.', ja:'はい、お願いします／いいえ、結構です',
      note:'Yes・No だけだと少しぶっきらぼう。please／thanks を足すだけで感じが良くなる。断るときの No, thanks. は失礼にならない。',
      alt:[ ["Yes, that'd be great.", '喜んで（勧められて受けるとき）'], ["No, I'm fine.", '大丈夫です'], ['Not right now, thanks.', '今はいいです'] ] },
    { en:'Sorry?', ja:'えっ、もう一度？',
      note:'語尾を上げて言う。聞き返しはこれ一語で足りる。Pardon? は少し堅く、What? はぶっきらぼうに聞こえる。',
      alt:[ ['Sorry, once more?', 'もう一回いいですか'], ['Sorry, what was that?', '今なんて？'], ['Say that again?', 'もう一度（カジュアル）'] ] },
    { en:"That's all, thanks.", ja:'以上です',
      note:'注文・買い物の締め。店員の Anything else? に返す言葉。これを言うと会計に進む。',
      alt:[ ["That's it, thanks.", '同じ意味'], ["That'll do, thanks.", 'それで十分（オージーらしい言い方）'], ["I'm good.", 'もういいです'] ] },
    { en:'Card, please.', ja:'カードで',
      note:'ほぼ全店タッチ決済。端末をこちらに向けられたら、何も言わずにかざしてよい。Cash or card? と聞かれたら Card.',
      alt:[ ['By card.', 'カードで'], ['Can I tap?', 'タッチできますか'], ['Do you take Amex?', 'アメックス使えますか'] ] },
    { en:'Excuse me.', ja:'すみません（呼びかけ・通してほしい）',
      note:'人を呼ぶ・通る・注意を引くとき。ぶつかった時や割り込む時は Sorry. が自然。日本語の「すみません」は場面で2語に分かれる。',
      alt:[ ['Excuse me, could I order?', '（店員を呼んで）注文いいですか'], ['Sorry, coming through.', '通ります'], ['After you.', 'お先にどうぞ'] ] },
    { en:'Just looking, thanks.', ja:'見てるだけです',
      note:'店員の Can I help you? / How are you going? への定番の返し。これで放っておいてもらえる。',
      alt:[ ["I'm just browsing.", '見て回っているだけ'], ["I'm fine, thanks.", '大丈夫です'], ["Actually, I'm looking for a scarf.", '実は〜を探しています（探し物があるとき）'] ] },
    { en:"I'm good, thanks.", ja:'大丈夫です（要りません）',
      note:'「調子がいい」ではなく「間に合っています」。Would you like…? と勧められたときの断り。日本語の「いいです」にいちばん近い。',
      alt:[ ["I'm OK, thanks.", '同じ意味'], ["No, thanks. I'm full.", '（食べ物を勧められて）お腹いっぱいです'], ['Maybe next time.', 'また今度'] ] },
    { en:'Thanks so much.', ja:'ありがとう',
      note:'Thank you very much. は少し改まった響き。Thanks a lot. / Thanks so much. が日常の温度。オーストラリアでは Cheers や Ta もよく聞く。',
      alt:[ ['Cheers.', 'ありがとう（軽く）'], ['Thanks heaps.', 'めっちゃありがとう（豪州流）'], ['Thanks for your help.', '助かりました'], ["That's very kind.", 'ご親切に'] ] }
  ] },

  { id:'je-aizuchi', title:'相槌・返事 — ニュアンスの違い', rows:[
    { en:'Yeah. / Yep.', ja:'うん',
      note:'返事の8割はこれで足りる。Yes. は少しかしこまった響き。Yep. はさらにカジュアルで、店員も普通に使う。',
      alt:[ ['Yeah, sure.', 'うん、いいよ'], ["Yep, that's right.", 'うん、そのとおり'], ['Absolutely.', 'もちろん（強い同意）'] ] },
    { en:'No worries.', ja:'気にしないで／どういたしまして／OK',
      note:'オーストラリアの万能語。①Thanks への「どういたしまして」②Sorry への「気にしないで」③頼みごとへの「いいよ」。自分でも使える。',
      alt:[ ['No problem.', '同じ意味（どこでも通じる）'], ['All good.', '大丈夫だよ'], ["That's fine.", 'それで結構です'] ] },
    { en:'Sure.', ja:'いいよ／もちろん',
      note:'頼まれごとに快く応じるとき。Can I sit here? → Sure. のように相手からも来る。',
      alt:[ ['Sure thing.', 'もちろん（少し親しげ）'], ['Of course.', 'もちろん'], ['Go ahead.', 'どうぞ'] ] },
    { en:'Sounds good.', ja:'いいね',
      note:'提案に乗るとき。「〜でいい？」と聞かれて「それでいい」の返事にも。',
      alt:[ ['Sounds great.', 'すごくいいね'], ['Perfect.', '完璧'], ['That works.', 'それで大丈夫（都合が合う）'] ] },
    { en:'Oh, nice!', ja:'へえ、いいね',
      note:'相手の話に反応する一言。感情を乗せて言うと会話が続く。',
      alt:[ ['Lovely!', 'すてき（豪州で多用）'], ['Oh, wow.', 'わあ'], ["That's great.", 'それはいいね'], ['Beautiful.', '（天気や料理にも）いいね'] ] },
    { en:'Really?', ja:'ほんとに？',
      note:'語尾を上げる。驚きと関心。相槌として Right. / I see. と混ぜると自然。',
      alt:[ ['Is that right?', 'そうなんですか'], ['Oh, I see.', 'なるほど'], ['Right.', 'ええ、はい（軽い相槌）'] ] },
    { en:'Got it.', ja:'分かりました',
      note:'説明を受けたときの締め。I understand. より軽い。',
      alt:[ ['OK, got it.', 'はい、分かりました'], ['Makes sense.', 'なるほど、納得'], ['Understood.', '了解です（少し堅い）'] ] },
    { en:'Maybe later.', ja:'また後で',
      note:'やんわり断る。勧誘・追加注文・試食などに。断り切れないときの逃げ道。',
      alt:[ ["I'll think about it.", '考えておきます'], ['Not today, thanks.', '今日はいいです'], ["We're just having a look.", '見ているだけなので'] ] },
    { en:'Cheers.', ja:'ありがとう／じゃあね',
      note:'①ありがとう ②さようなら ③乾杯。会計の後やタクシーを降りるときに一言。言われたら Cheers. と返してよい。',
      alt:[ ['Cheers, mate.', 'ありがとう（男性同士で親しげ）'], ['Ta.', 'ありがと（超カジュアル）'], ['Have a good one.', 'よい一日を'] ] },
    { en:'You too.', ja:'あなたもね',
      note:'Have a good day / Enjoy your meal / Have a good one と言われたときの返し。これだけで会話が丸く閉じる。',
      alt:[ ['Same to you.', 'あなたもね'], ['You have a good one too.', 'そちらもよい一日を'], ['Thanks, you too!', 'ありがとう、あなたも'] ] }
  ] },

  { id:'je-qa', title:'こう聞かれる — 答えと解説', rows:[
    { en:'How are you? / How are you going?', ja:'→ Good, thanks. And you?',
      note:'挨拶であって質問ではない。体調を答えなくてよい。How are you going? は豪州特有で「どこへ行くの」ではない。And you? を付けると自然。',
      alt:[ ['Good, how are you?', 'いいよ、そちらは？'], ['Not bad.', 'まあまあ'], ['Pretty good, thanks.', 'かなり調子いいよ'] ] },
    { en:'Have here or takeaway?', ja:'→ Have here. / Takeaway.',
      note:'店内か持ち帰りか。カフェで必ず聞かれる。米国式の For here or to go? でも通じる。',
      alt:[ ['Eat in or take away?', '同じ質問の別形'], ['To have here, please.', '店内で'], ['To take away.', '持ち帰りで'] ] },
    { en:'Anything else?', ja:"→ That's all, thanks.",
      note:'「ほかには？」。追加があるならここで言う。Is that everything? / Was there anything else? も同じ。',
      alt:[ ['Could I also get a water?', '水も追加で'], ['And a flat white, please.', 'あとフラットホワイトを'], ["No, that's it.", 'いえ、以上で'] ] },
    { en:'Do you want a bag?', ja:'→ No, thanks. / Yes, please.',
      note:'レジ袋は有料（15〜25セント）。エコバッグがあれば No。Would you like a bag? / Need a bag? も同じ。',
      alt:[ ["I've got my own bag.", '自分の袋があります'], ['One bag, please.', '袋を1つ'], ['No bag, thanks.', '袋は要りません'] ] },
    { en:'Do you have Flybuys?', ja:'→ No.',
      note:'ポイントカードの有無。Coles は Flybuys、Woolworths は Everyday Rewards。毎回聞かれるが No の一言でよい。',
      alt:[ ["No, I don't.", '持っていません'], ['No, just visiting.', '旅行者なので'], ['No rewards card.', 'カードはありません'] ] },
    { en:"Tap when you're ready.", ja:'→（無言でカードをかざす）',
      note:'「準備できたらタッチして」＝金額が出たので払ってOK。Just tap there. / Tap or insert? も同じ。',
      alt:[ ['Cash or card? — Card.', '現金かカードか'], ['Do you want a receipt? — No, thanks.', 'レシートは？（免税TRS用の店では Yes, please.）'] ] },
    { en:'Do you have a booking?', ja:'→ No, just two.',
      note:'予約の有無。Have you booked? / Under what name? も同じ流れ。待ち時間を聞くなら How long is the wait?',
      alt:[ ['No, walk-in. Two people.', '予約なし、2人です'], ['Is there a wait?', '待ちますか'], ['Can we sit at the bar?', 'カウンター席でもいい？（待ちが短い）'] ] },
    { en:'Is everything OK?', ja:'→ Lovely, thanks.',
      note:'食事中に店員が様子を見に来る合図。How is everything? / How are we going here? も同じ。感想を一言返せば十分。',
      alt:[ ['Really good, thanks.', 'とてもおいしいです'], ['Delicious.', 'おいしい'], ['All good, thanks.', '大丈夫です'] ] },
    { en:'Still working on that?', ja:"→ Still going. / I'm done.",
      note:'「まだ食べていますか」＝皿を下げていいか。work に驚かない。Can I take this? / Are you finished? も同じ。',
      alt:[ ['Yes, still going, thanks.', 'まだ食べています'], ["No, I'm done. Thanks.", '終わりました'], ['You can take that.', '下げていいですよ'] ] },
    { en:'Which milk?', ja:'→ Regular, please.',
      note:'ミルクの種類。オーツ・アーモンド・ソイが定番で追加料金あり。普通の牛乳は regular か full cream。What milk? / Any milk preference? も同じ。',
      alt:[ ['Full cream, please.', '普通の牛乳で'], ['Skim, please.', '低脂肪で'], ['Oat milk, please.', 'オーツミルクで'] ] },
    { en:'Together or separate?', ja:'→ Together, please.',
      note:'会計を一緒にするか別々にするか。2人連れだと聞かれる。One bill? / Splitting? も同じ。',
      alt:[ ['All together.', '全部一緒で'], ['Separately, please.', '別々で'], ["I'll get this.", 'ここは私が払います'] ] },
    { en:'Any allergies?', ja:'→ No.',
      note:'アレルギーの有無。Any dietaries? は「食事制限は？」で同じ意味。なければ No で終わる。',
      alt:[ ['No allergies.', 'ありません'], ['Not too spicy, please.', '辛くしすぎないで（制限ではなく好み）'] ] },
    { en:'Where are you from?', ja:'→ Japan.',
      note:'雑談の入口。都市名まで言うと会話が続く。近くの人は Yokohama, near Tokyo. でよい。',
      alt:[ ['From Tokyo, Japan.', '日本の東京から'], ['First time in Australia.', '初めて来ました'], ['We love it so far.', 'とても気に入っています'] ] },
    { en:'How long are you here for?', ja:'→ Six days.',
      note:'滞在期間。Just a week. でも十分。',
      alt:[ ['Three days in Melbourne, then Sydney.', 'メルボルン3日、それからシドニー'], ['We leave on Saturday.', '土曜に発ちます'] ] },
    { en:'What are you up to today?', ja:'→ Just walking around.',
      note:'「今日は何を？」の雑談。Any plans? も同じ。予定を一つ言えば十分。',
      alt:[ ['Blue Mountains tomorrow.', '明日はブルーマウンテンズ'], ['Going to the market.', 'マーケットへ'], ['Just exploring the city.', '街を見て回ります'] ] },
    { en:'Anything to declare?', ja:'→ Yes, snacks and medicine.',
      note:'検疫。「申告するものは？」。食品・薬は Yes と言って見せるだけ。Are you carrying any food? も同じ。',
      alt:[ ['Just some Japanese snacks.', '日本のお菓子だけです'], ['And some medicine.', 'それと薬が少し'], ['This is all.', 'これで全部です'] ] }
  ] },

  { id:'je-lost', title:'聞き取れなかったとき — 恥ずかしくない言い方', rows:[
    { en:'Sorry?', ja:'もう一度？',
      note:'まずこれ。2回目も同じで構わない。相手は言い方を変えて繰り返してくれる。',
      alt:[ ['Sorry, once more?', 'もう一回いいですか'], ['Could you say that again?', 'もう一度言ってもらえますか'] ] },
    { en:'Slowly, please.', ja:'ゆっくりお願いします',
      note:'速さが原因ならこれ。相手は気を悪くしない。',
      alt:[ ['Could you speak a bit slower?', '少しゆっくり話してもらえますか'], ['A bit slower, please.', 'もう少しゆっくり'] ] },
    { en:'Sorry, my English is not great.', ja:'英語があまり得意でなくて',
      note:'先に言っておくと相手が合わせてくれる。恥ずかしがらずに使う。not great は not good より柔らかい。',
      alt:[ ["I'm still learning English.", '英語は勉強中です'], ['Simple words, please.', '簡単な言葉でお願いします'] ] },
    { en:'Can you show me?', ja:'見せて／指さして教えて',
      note:'場所・商品・画面。言葉より指さしで解決することが多い。',
      alt:[ ['Could you point to it?', '指さしてもらえますか'], ['Which one?', 'どれですか'], ['Where exactly?', '正確にはどこ？'] ] },
    { en:'Is it this one?', ja:'これですか？',
      note:'自分が指さして確認する。Yes/No で答えが返るので楽。',
      alt:[ ['Do you mean this?', 'これのことですか'], ['This way?', 'こっち？（道を指して）'] ] },
    { en:'Could you write it down?', ja:'書いてもらえますか',
      note:'数字・地名・時間は書いてもらうのが確実。スマホを差し出して Could you type it? でもよい。',
      alt:[ ['Could you type it here?', 'ここに打ってもらえますか（スマホを渡す）'], ['One second, let me use my phone.', 'ちょっと待って、スマホ（翻訳）を使います'] ] }
  ] },

  { id:'je-aussie', title:'オージー語ミニ辞典 — 聞こえたらこれ', rows:[
    { en:'No worries', ja:'大丈夫・どういたしまして・気にしないで', note:'一日に何度も聞く。相槌の項も参照。' },
    { en:'Ta', ja:'ありがとう', note:'Thanks のさらに軽い版。店員が小さく Ta. と言う。' },
    { en:'Mate', ja:'（呼びかけ）', note:'友達・お客・誰にでも。言われても親しみの印で、返す必要はない。' },
    { en:'How ya going?', ja:'調子どう？（挨拶）', note:'How are you going? の縮まった形。Good, thanks. で返す。' },
    { en:'Too easy', ja:'お安い御用', note:'頼みごとに「はいよ」。No worries と同じ温度。' },
    { en:'Good on ya', ja:'よくやった・いいね', note:'Good on you. 褒め言葉。' },
    { en:'Brekkie / Arvo', ja:'朝食／午後', note:'語尾を -ie / -o に縮めるのが豪州流。看板やメニューにも出る。' },
    { en:'Heaps', ja:'たくさん', note:'Heaps good = めっちゃいい。Thanks heaps = ほんとにありがとう。' },
    { en:'Reckon', ja:'思う', note:'I reckon = 〜だと思う。You reckon? = そう思う？' },
    { en:'Maccas', ja:'マクドナルド', note:'看板もこの表記のことがある。' },
    { en:'Bottle-o', ja:'酒屋', note:'スーパーでは酒を売っていない。BWS・Liquorland がそれ。' },
    { en:'Sunnies / Thongs', ja:'サングラス／ビーチサンダル', note:'thongs は下着ではない。' },
    { en:'Cuppa / Bikkie', ja:'お茶一杯／ビスケット', note:'Fancy a cuppa? = お茶どう？' },
    { en:'Lovely / Gorgeous', ja:'すてき・おいしい・いい天気', note:'人にも物にも天気にも。褒め言葉の万能語。自分でも使ってよい。' }
  ] }
];

/* 場面別（旧・指差し英語。見せるだけで通じる短文） */
var EN_SCENES = [
  { title:'カフェ', rows:[
    { en:'A flat white, please.', ja:'フラットホワイトを1つ', note:'サイズを聞かれたら Regular. 種類を言わない「コーヒーください」は通じない。' },
    { en:'Two flat whites, have here.', ja:'フラットホワイト2つ、店内で' },
    { en:'Takeaway, please.', ja:'持ち帰りで', note:'to go でも通じるが、豪州では takeaway が普通。' },
    { en:'Tap water, please.', ja:'水道水をください（無料）', note:'Water だけだとボトル（有料）が出ることがある。' },
    { en:'Can we sit here?', ja:'ここ座っていい？' } ] },
  { title:'レストラン', rows:[
    { en:'A table for two, please.', ja:'2人です' },
    { en:'Is this spicy? Mild, please.', ja:'これ辛い？ 辛くしないで' },
    { en:'Could we have the bill, please?', ja:'お会計をお願いします', note:'カジュアルな店はカウンターで払う。席で待たずに Can I pay here? と聞く。' },
    { en:'Can I pay here?', ja:'ここで払えますか' },
    { en:'No tip, thanks.', ja:'チップはなしで', note:'端末にチップ画面が出たら 0% か No tip を押せばよい。言わなくても失礼ではない。' } ] },
  { title:'ホテル', rows:[
    { en:'Check in, please.', ja:'チェックインお願いします', note:'続けて予約の姓を言う。パスポートを出せば伝わる。' },
    { en:'Can I leave my luggage until check-in?', ja:'チェックインまで荷物を預かってもらえますか' },
    { en:'What time is breakfast?', ja:'朝食は何時から？' },
    { en:'Wi-Fi password, please.', ja:'Wi-Fiのパスワードを' },
    { en:'Check out, please.', ja:'チェックアウトお願いします', note:'デポジットの解除は Is the deposit released? で確認できる。' },
    { en:'Could you call a taxi?', ja:'タクシーを呼んでもらえますか' } ] },
  { title:'交通', rows:[
    { en:'Does this go to Southern Cross?', ja:'これサザンクロス行き？' },
    { en:'Two to the city, please.', ja:'市内まで2人分' },
    { en:'Where do I tap on?', ja:'タッチはどこで？', note:'tap on = 乗車タッチ、tap off = 降車タッチ。フェリーも同じ。' },
    { en:'To this address, please.', ja:'この住所までお願いします（情報タブの宿泊先を見せる）' },
    { en:'Terminal 3, Virgin Australia.', ja:'T3、ヴァージンオーストラリアへ' } ] },
  { title:'空港・入国', rows:[
    { en:'Holiday. Six days.', ja:'観光です。6日間', note:'入国審査で聞かれる2点。Purpose? → Holiday. How long? → Six days.' },
    { en:'I have snacks and medicine to declare.', ja:'お菓子と薬を申告します' },
    { en:'Nothing else.', ja:'ほかにはありません' },
    { en:'Where is the TRS counter?', ja:'TRSのカウンターはどこ？' },
    { en:'My bag has not come out.', ja:'荷物が出てきません' } ] },
  { title:'買い物', rows:[
    { en:'Just looking, thanks.', ja:'見てるだけです' },
    { en:'Do you have this in another colour?', ja:'色違いはありますか' },
    { en:'One tax invoice, please.', ja:'領収書を1枚にまとめて（TRS用）', note:'TRS は同一店 $300 以上。1枚の tax invoice にまとめてもらう。' },
    { en:'No bag, thanks.', ja:'袋は要りません' },
    { en:'Card, please.', ja:'カードで' } ] },
  { title:'困った時', rows:[
    { en:'Where is the toilet?', ja:'トイレはどこですか', note:'bathroom / restroom でも通じるが、豪州は toilet が普通で失礼ではない。' },
    { en:"I don't understand. Could you write it down?", ja:'分かりません。書いてもらえますか' },
    { en:"I've lost my passport.", ja:'パスポートをなくしました' },
    { en:'Could you call an ambulance? / the police?', ja:'救急車を／警察を呼んでください' },
    { en:'I feel sick. Where is a pharmacy?', ja:'気分が悪い。薬局はどこ？', note:'薬局は chemist とも言う。Chemist Warehouse が大手。' },
    { en:'Sorry, it stopped.', ja:'すみません、止まりました（セルフレジ）' } ] }
];

function enRowHTML(r) {
  var h = '<div class="en-row"><div class="en">' + r.en + '</div><div class="ja">' + r.ja + '</div>';
  if (r.note) h += '<div class="en-note">' + r.note + '</div>';
  if (r.alt && r.alt.length) {
    h += '<div class="en-alts"><div class="en-alts-k">他の言い方</div>';
    r.alt.forEach(function(a){ h += '<div class="en-alt"><span class="a">' + a[0] + '</span><span class="m">' + a[1] + '</span></div>'; });
    h += '</div>';
  }
  return h + '</div>';
}

function renderEnPage() {
  var host = document.getElementById('pane-en');
  if (!host) return;
  var h = '<div class="toc-head"><div class="toc-eyebrow">TRAVEL ENGLISH</div>' +
    '<div class="toc-h1">旅の英語</div></div>';
  h += '<div class="sec-hint">読み上げなくても、この画面を見せれば通じる。太字の一行が「言う／見せる」言葉。下の解説と「他の言い方」は移動中の読み物に。</div>';
  h += jmpHTML([['je-first','3原則'],['je-ten','10語'],['je-aizuchi','相槌'],['je-qa','聞かれる'],['je-lost','聞き取れない'],['je-aussie','オージー語'],['je-scene','場面別']]);

  h += '<div class="sec-h jmp-t" id="je-first">— はじめに —</div>';
  h += '<div class="kb-card gd-card"><div class="kb-title">' + EN_INTRO.title + '</div>' +
    '<div class="gd-lead">' + EN_INTRO.lead + '</div><div class="kb-body">' + EN_INTRO.body + '</div></div>';

  EN_SECTIONS.forEach(function(sec){
    h += '<div class="sec-h jmp-t" id="' + sec.id + '">— ' + sec.title + ' —</div>';
    h += '<div class="kb-card en-card">' + sec.rows.map(enRowHTML).join('') + '</div>';
  });

  h += '<div class="sec-h jmp-t" id="je-scene">— 場面別 —</div>';
  h += '<div class="sec-hint">場面ごとの短文。タップで開く。</div>';
  EN_SCENES.forEach(function(k){
    h += '<div class="kb-card gd-card gd-fold" onclick="gdFold(this)">' +
      '<div class="kb-title">' + k.title + '</div><div class="kb-body">' + k.rows.map(enRowHTML).join('') + '</div></div>';
  });

  host.innerHTML = h;
}
