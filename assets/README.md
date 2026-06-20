# assets フォルダ

エリアマップの背景画像を置く場所です。ここに画像を置くと、自動でその画像が地図背景に使われます（置かなければ手描きの模式図のまま）。

## ファイル名のルール

| エリア | ファイル名 | 状態 |
|--------|-----------|------|
| メルボルンCBD | `map-mel.png` | ← まずこれを用意 |
| シドニーCBD | `map-syd.png` | 後で |
| ブルーマウンテンズ | `map-blue.png` | 後で |

`.png` / `.jpg` どちらでも可。用意したら Claude に「assets に map-mel.png を置きました。地図に反映してピンを合わせてください」と伝えてください。Claude が画像を見てピンの座標を調整します。

## 画像の仕様

- **向き**：縦長（スマホ表示向け）。3:4 〜 4:5 くらい。横長でも可（その場合は Claude 側で表示比率を合わせます）
- **解像度**：長辺 1024〜1536px 程度（大きすぎると重い）
- **構図**：真上から見た俯瞰（top-down）。**北を上**に
- **ピンは描かない**：番号ピン・順路線はアプリ側で重ねるので、画像にはマーカーを入れない
- **文字は控えめ**：通り名やランドマーク名は少しならOK（多いとピンと干渉）

## Gemini 生成プロンプト例（メルボルンCBD）

```
A cute top-down illustrated tourist map of Melbourne CBD, Australia, north up.
Flat vector illustration style, soft warm colors, clean and not too busy.
Show the Yarra River along the bottom, the grid streets (Collins Street,
Flinders Street, Swanston Street, Elizabeth Street), Queen Victoria Market
in the north-west, and Carlton Gardens with the Royal Exhibition Building
in the north-east. Small charming building and tree illustrations.
No location pins, no markers, minimal text labels. Portrait 3:4 aspect ratio.
```

生成後、上記ファイル名で保存してこのフォルダに置いてください。
