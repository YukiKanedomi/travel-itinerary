# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドです。

---

## プロジェクト概要

夫婦2人のオーストラリア旅行（メルボルン→シドニー、2026年9月20日〜26日）用の旅行しおりWebアプリ。

- **ファイル構成**：`index.html`（表示・構造）＋ `travel-data.md`（旅行内容）＋ `assets/`（地図画像）
- **動かし方**：`index.html` をブラウザで直接開くだけ
- **公開方法**：Netlify Drop。**`assets/` を使う場合はフォルダごと**ドラッグ＆ドロップ（`index.html` 単体ではなく `index.html` ＋ `assets/` を含む親フォルダを投下）。画像を使っていない間は `index.html` 単体でも可

---

## コンテンツ管理の仕組み

| ファイル | 役割 | 編集方法 |
|---------|------|---------|
| `travel-data.md` | 旅行内容のソース（スケジュール・ホテル・フライト等） | 別のAIやテキストエディタで自由に編集 |
| `index.html` | 表示・デザイン・インタラクション | Claudeが `travel-data.md` を元に更新 |

### 反映の依頼方法
`travel-data.md` を別のAIで更新した後、Claudeに以下のように依頼してください：

> 「travel-data.md の〔DAY 3のスケジュール〕を index.html に反映してください」

Claudeは `travel-data.md` を読んで、`index.html` の対応するセクションを更新します。

### travel-data.md の書式ルール
- **スケジュール項目**：`#### HH:MM タイトル` の見出し＋`説明:` `MAP:` `公式:` の行
- **MAP/公式リンク**：省略するとボタンが表示されない。不要な場合は行ごと削除
- **ポイント項目**：`- 内容` の箇条書き形式
- **ホテル・フライト**：`キー: 値` 形式のフラットなテキスト

---

## ファイル構造（index.html 内の順序）

```
<style>          ← CSSをすべてここに書く
<body>
  <header>       ← ヒーロー画像（シドニースカイラインSVG）
  <div.tabs-wrap>← スクロールに追従するタブバー
  <main>         ← 全タブのコンテンツ（pane）
  #toast         ← 通知（保存完了など）
<script>         ← JavaScriptをすべてここに書く（bodyの末尾）
```

---

## タブとページ（pane）の対応

タブは `<script>` 内の **`TABS` 配列**から `renderTabs()` が自動生成します（番号は配列順）。`show(id, idx)` で切替。

| 順 | タブ | pane の id | 中身 |
|----|------|-----------|------|
| 0 | 🗓️ 概要 | `overview` | 旅程まるごと俯瞰（`renderOverview` 生成） |
| 1〜7 | DAY 1〜7 | `day1`〜`day7` | 各日のスケジュール |
| 8 | 🎒 準備 | `prep` | ToDo・予約トラッカー・持ち物（`renderPrep` 生成） |
| 9 | 📋 基本情報 | `info` | |
| 10 | 🗺️ MAP | `map` | エリアマップ |

**タブを追加するときは**：`TABS` 配列に1行足し、対応する `<div id="..." class="pane">` を `<main>` に追加するだけ（番号は自動）。

### 各タブの動的生成・補助
- **概要**（`DAY_OVERVIEW` ＋ `renderOverview`）：各日カード（テーマ・気温・概要）。タップでその日へ。**出発前は起動時に概要を自動表示**（`autoSelectTab`）
- **タイムバー**（`renderTimebars`）：各DAYタブ上部に、その日の `.tl-item` の時刻を解析して時間帯バーを挿入
- **準備**（`PREP_TODO` ＝出発前ToDo / `PREP_BOOK` ＝予約 ＋ `renderPrep`）：チェック状態は localStorage（`prep_todo_v1` / `prep_book_v1`）、予約メモは `prep_booknote_v1`。持ち物チェックリスト（`#packing-card`・`checklist_v1`）は基本情報から準備タブへ移設

---

## カードの種類と色

カードは `<div class="card c-種別">` で作ります。左端の色が種別によって変わります。

| クラス名 | 色 | 用途 |
|---------|-----|-----|
| `c-flight` | 青 | フライト情報 |
| `c-hotel` | 緑 | ホテル情報 |
| `c-spot` | 紫 | 観光スポット |
| `c-restaurant` | オレンジ | レストラン |
| `c-tip` | ゴールド | 注意点・ポイント |
| `c-transport` | ローズ | 交通手段 |
| `c-schedule` | 紫 | タイムライン |

### カード内でよく使うパーツ

```html
<!-- ラベル＋値の行 -->
<div class="row">
  <span class="rl">📍 住所</span>
  <span class="rv">ここに値</span>
</div>

<!-- タイムラインの1項目 -->
<div class="tl-item">
  <div class="tl-time">09:00</div>
  <div class="tl-box">
    <div class="tl-head">タイトル</div>
    <div class="tl-desc">説明文</div>
  </div>
</div>

<!-- ポイントリストの1項目 -->
<div class="tip-item">
  <span class="tip-text">内容</span>
</div>
```

---

## 編集について

ブラウザ内の編集モード（✏️ボタン）は**廃止**しました。すべての内容変更は `travel-data.md` を編集 → Claudeが `index.html` に反映、という流れに一本化されています。

- `.editable` クラスは過去の名残で、現在は機能しません（害もないため残置）
- チェックリストのチェック状態は `localStorage`（キー名：`checklist_v1`）に保存され、編集モードとは無関係に動作します

---

## MAPタブ（エリアマップ ＋ SPOTS配列）

MAPタブは `<script>` 内の **`SPOTS` 配列**を唯一のソースとして、次の3つを自動生成します。

| 生成物 | 関数 | 描画先 |
|--------|------|--------|
| エリア切替ボタン | `renderAreaSwitch()` | `#area-switch` |
| スキーマティック地図（ピン・ポップアップ・ズーム） | `renderAreaMap()` | `#area-map` |
| 折りたたみリスト（現在エリアのみ） | `renderMapList()` | `#map-list` |

- `currentArea`（`'mel'` メルボルン / `'syd'` シドニーCBD / `'blue'` ブルーマウンテンズ）が現在表示中のエリア。`switchArea(area)` で切替
- 地図はSVGスキーマティック（オフライン・1ファイル維持）。ピンをタップすると `#map-popup` に詳細が出る
- **ピン**＝絵文字（種別）＋右上の番号バッジ（訪問順）。**順路線・凡例は廃止**（`move` データは将来用に温存）
- **ズーム/パン**：`setupMapZoom()` が `viewBox` 操作でピンチ/ホイール拡大・ドラッグ移動・ダブルタップ/ダブルクリックでリセット。`mapDragging` フラグでドラッグ後の誤タップを抑止
- 3エリアとも実装済み（`MAP_GEO` の各 `ready:true`）。ブルーマウンテンズはDAY5ツアー（バス移動・東＝シドニー側の広域図）

### 背景画像（アセット）への差し替え
地図背景は「手描き模式図（`MAP_GEO[area].bg`）」がデフォルト。`assets/` に画像を置き `MAP_GEO[area].img` にパスを設定すると、画像背景に切り替わる（`bg` より優先）。

- 画像の置き場・命名・Gemini生成プロンプトは [`assets/README.md`](assets/README.md) を参照
- 画像（特にAIイラスト）は地理が不正確なため、**ピンの `x`/`y` は画像を見て手動で合わせる**。`viewBox` も画像のアスペクト比に合わせて調整する
- 画像未設定のエリアは模式図のまま動く（壊れない）

### スポットの追加・編集
`SPOTS` 配列にオブジェクトを追加・修正します。

```js
{ area:'mel', icon:'🍽️', name:'日本語の店名',
  en:['English Name','住所'],          // 配列。1行でも複数行でも可
  day:'DAY X 用途',
  map:'https://maps.google.com/?q=住所',
  web:'https://公式サイトURL',          // web は省略可（🌐ボタンが出ない）
  x:160, y:250, order:4, move:'walk' } // 地図用（下記参照）
```

- **`area`**：`'mel'`（メルボルン）/ `'syd'`（シドニーCBD）/ `'blue'`（ブルーマウンテンズ）
- **`icon`**：種別を表す絵文字（ポップアップとリストに表示）
- **`map`/`web`**：🗺️＝Google マップ（青）/ 🌐＝公式サイト（緑、省略時は非表示）
- **地図用フィールド**（3エリアとも設定済み）：
  - `x`/`y`：地図上の座標（`MAP_GEO[area].viewBox` の座標系。x＝西→東、y＝北→南）
  - `order`：訪問順（ピンの番号バッジ＆一覧の並び順）
  - `move`：直前スポットからの移動手段。`'start'`（起点）/ `'walk'`（徒歩）/ `'tram'`（電車・トラム）/ `'car'`（車・バス）
  - `legMin`：直前スポットからの所要時間（分）。一覧で「↓ 🚶 徒歩 約N分」と表示
  - `tip`：見どころ・おすすめの一言。一覧（💡ボックス）と地図ポップアップに表示
- 地図の背景（通り・川・公園・ラベル）はエリアごとに `MAP_GEO[area].bg`（SVG文字列）で定義

### その他のUI
- **日別の服装・気温ガイド**：`DAY_WEATHER`（day1〜7）を `renderDayWeather()` が各DAYタブ上部に挿入。9月下旬の目安（編集可）
- **スワイプでタブ切替**：`setupSwipe()` が左右フリックで前後タブへ。地図タブ（index 8）はピンチ/ドラッグ優先のため除外

---

## 旅行固有の絶対ルール

AIが変更・削除してはいけない重要な制約です。

| ルール | 理由 |
|--------|------|
| **DAY 5 ヒルトン集合 8:25 は「5分前厳守」** | JTBツアーの集合時刻。遅刻するとツアーに乗れない |
| **検疫申告（食品YES）は複数箇所に記載** | オーストラリア入国時の義務。削除・軽視しない |
