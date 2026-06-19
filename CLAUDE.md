# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドです。

---

## プロジェクト概要

夫婦2人のオーストラリア旅行（メルボルン→シドニー、2026年9月20日〜26日）用の旅行しおりWebアプリ。

- **ファイル構成**：`index.html`（表示・構造）＋ `travel-data.md`（旅行内容）の2ファイル
- **動かし方**：`index.html` をブラウザで直接開くだけ
- **公開方法**：Netlify Drop（ドラッグ＆ドロップで `index.html` のみアップロード）

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
  #edit-fab      ← 右下の ✏️ ボタン
  #edit-bar      ← 画面下部の「保存/キャンセル/リセット」バー
  #toast         ← 保存完了などの通知
<script>         ← JavaScriptをすべてここに書く（bodyの末尾）
```

---

## タブとページ（pane）の対応

タブボタンは `show('pane名', インデックス番号)` で切り替えます。

| インデックス | タブ表示 | pane の id |
|------------|---------|-----------|
| 0 | DAY 1（出発日） | `day1` |
| 1 | DAY 2（MEL①） | `day2` |
| 2 | DAY 3（MEL②） | `day3` |
| 3 | DAY 4（移動日） | `day4` |
| 4 | DAY 5（ブルーM） | `day5` |
| 5 | DAY 6（SYD） | `day6` |
| 6 | DAY 7（帰国日） | `day7` |
| 7 | 📋 基本情報 | `info` |
| 8 | 🗺️ MAP | `map` |

**タブを追加するときは**：HTMLにボタンとpaneを追加し、インデックス番号を連番で振るだけでOK。

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
  <span class="rv editable">ここに値</span>
</div>

<!-- タイムラインの1項目 -->
<div class="tl-item">
  <div class="tl-time editable">09:00</div>
  <div class="tl-box">
    <div class="tl-head editable">タイトル</div>
    <div class="tl-desc editable">説明文</div>
  </div>
</div>

<!-- ポイントリストの1項目 -->
<div class="tip-item">
  <span class="tip-ico">💡</span>
  <span class="tip-text editable">内容</span>
</div>
```

---

## 編集モードの仕組み

右下の ✏️ ボタンをタップすると編集モードになります。

- **黄色い破線**が表示されているフィールドはタップして直接編集できる（`.editable` クラスがついている要素）
- タイムライン・ポイントリストは **＋ボタンで項目追加**、**×ボタンで項目削除** ができる
- 「💾 保存」ボタンで `localStorage`（キー名：`itinerary_v2`）に保存される
- 「✕ キャンセル」で編集前の状態に戻る
- 「🔄 リセット」でlocalStorageを消去して初期状態に戻る

**重要**：保存データはページのHTML（各paneの `innerHTML`）をまるごと保存する方式。項目の追加・削除もそのまま保存される。

---

## MAPタブのスポット追加方法

`#map` pane内に以下の形式で追加します。

```html
<div class="map-item">
  <span class="map-ico">🍽️</span>       ← 種別を表す絵文字
  <div class="map-body">
    <div class="map-name">日本語の店名</div>
    <div class="map-en">English Name / 住所</div>
    <span class="map-day-tag">DAY X 用途</span>
  </div>
  <div class="map-actions">
    <a href="https://maps.google.com/?q=住所" class="map-go" target="_blank" rel="noopener">🗺️</a>
    <a href="https://公式サイトURL" class="web-go" target="_blank" rel="noopener">🌐</a>
    <!-- 公式サイトがない場合は web-go の行を省略 -->
  </div>
</div>
```

- 🗺️ ボタン（青）= Google マップ
- 🌐 ボタン（緑）= 公式サイト（ない場合は省略）

---

## 旅行固有の絶対ルール

AIが変更・削除してはいけない重要な制約です。

| ルール | 理由 |
|--------|------|
| **DAY 5 ヒルトン集合 8:25 は「5分前厳守」** | JTBツアーの集合時刻。遅刻するとツアーに乗れない |
| **検疫申告（食品YES）は複数箇所に記載** | オーストラリア入国時の義務。削除・軽視しない |
