# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドです。

---

## プロジェクト概要

夫婦2人のオーストラリア旅行（メルボルン→シドニー、2026年9月20日〜26日）用の旅行しおりWebアプリ **「旅の手帳」**。

- **公開URL**: https://yukikanedomi.github.io/travel-itinerary/ （GitHub Pages・main push で自動デプロイ）
- **デザイン**: 案A「旅の手帳」（トラベラーズノート風。紙質感・チケット半券・帳面台帳・付箋・朱スタンプ）。3案儀式（design-dojo）で選定
- **動かし方**: `index.html` をブラウザで直接開くだけ（ビルド不要・ライブラリ不要）
- **旧版**: 刷新前のアプリは `/v1/` に退避（参照用に残置）。`/v2/` は開発時のURLでルートへのリダイレクトのみ

## ファイル構成（ルート＝本番）

| ファイル | 役割 |
|---------|------|
| `trip.js` | **旅データの唯一のソース**（7日分の旅程・寄り道PICKS・フライト・ホテル・準備抜粋）。内容変更はここだけ |
| `index.html` | シェル＋手帳デザインシステム＋いま/旅程タブ（データは持たない） |
| `map.js` | 地図タブ（SPOTS・模式図SVG・ズーム・営業時間 SPOT_HOURS） |
| `prep.js` | 準備タブ（リマインダー・ToDo・予約トラッカー・持ち物 PACKING） |
| `info.js` | 情報タブ（為替・緊急連絡先・交通ガイド・参考リンク・予算） |
| `pages.css` | 地図・準備・情報タブの装丁 |
| `sw.js` | オフライン対応（写真込みプリキャッシュ。更新時は CACHE を上げる） |
| `validate.mjs` | データ検証。**データ変更後は `node validate.mjs` を必ず実行** |
| `travel-data.md` | 人間可読の旅行内容ソース（ユーザーが他AIで編集→Claudeが trip.js に反映） |
| `assets/` | 写真・アイコン（v1/ルートで共用） |
| `参考資料/` | **個人情報（.gitignore対象・公開禁止）**。予約番号・パスポート情報はここのみ |

## 編集ワークフロー

1. ユーザーが `travel-data.md`（または直接指示）で内容変更を依頼
2. Claude が `trip.js`（旅程・付箋）や `map.js`（スポット・営業時間）を編集
3. `node validate.mjs` で検証（曜日照合・時刻昇順・付箋キー・営業時間書式・DAY5厳守）
4. `sw.js` の CACHE バージョンを上げる（資産はcache-firstのため必須）
5. headless Chrome でレンダリング確認 → ユーザー確認 → 明示指示があったら push

※ push は必ずユーザーの明示指示を待つ。デザインプレビューはGoogleドライブ（Claude成果物/travel-itinerary/デザイン比較/）にも保存。

## trip.js の書式（スケジュール行）

```js
{ t:'8:25', h:'見出し', d:'短い説明',
  hard:true,                 // 時間厳守（朱スタンプ）
  map:'https://maps...',     // 展開時にGoogleマップボタン
  web:'https://...',         // 展開時に公式サイトボタン
  steps:['手順1','手順2'],    // タップ展開の手順ガイド
  tips:['補足','注意｜赤字警告'] }  // 「注意｜」で始めると赤字
```

- 寄り道は `PICKS`（genre: sight/cafe/food/view）＋各日の `picks:[キー]`。**確定＝帳面／寄り道＝付箋**の2層を崩さない
- 「いま」タブは時期適応：旅行前=カウントダウン＋準備、旅行中=当日ページ（豪州時間で判定・現在行にマーカー）

## 設計上の決まりごと

- **絵文字をアイコンとして使わない**（テキストラベル・SVG・番号ピンで表現）
- **電話番号に tel: リンクを付けない**（誤タップ防止。ユーザー明示要望）
- スマホファースト（375px幅で成立）。日本語はシステムゴシック代替、Google FontsはSWが初回キャッシュ
- localStorage キー（v1互換を維持）: `prep_todo_v1` `prep_book_v1` `prep_booknote_v1` `checklist_v1` `fx_rate_v1` `emer_note_emer-jtb` `emer_note_emer-ins`
- headless Chrome 撮影時の注意: このPCはOSスケールでCSS幅478pxになる。`--window-size=800,H`・スケール指定なしで撮る

## 旅行固有の絶対ルール

| ルール | 理由 |
|--------|------|
| **DAY 5 ヒルトン集合 8:25 は「5分前厳守」**（hard:true を消さない） | JTBツアーの集合時刻。遅刻するとツアーに乗れない |
| **検疫申告（食品YES）は複数箇所に記載** | オーストラリア入国時の義務。削除・軽視しない |
| **個人情報（予約番号・パスポート等）は 参考資料/ のみ** | 公開リポジトリのため。座席番号・便名はOK、予約番号はNG |

## デプロイのトラブル

GitHub Pages が「Deployment failed, try again later」で詰まることがある。対処：
`gh api repos/YukiKanedomi/travel-itinerary/pages/deployments/<sha>/cancel -X POST` → 空コミットpushで新しいデプロイを発火（deploy-pages スキル参照）。
