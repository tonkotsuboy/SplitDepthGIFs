# PentatonicParticles

ICS LAB「[オーディオスプライトを使った音声ファイルの最適化―CreateJS勉強会/鹿野発表資料](http://ics-web.jp/lab/?p=8868)」で使用しているデモのソースコードです。TypeScript 1.5.3、CreateJSを使って作られています。

## フォルダー構成

```
info_html/
├── README.md ----------- このドキュメントが書いているファイル
├── src ----------------- デモのソースコード
|     ├── css
|     ├── js--------- TypeScriptコンパイル後のJSファイル
|     ├── sounds------ 各音声ファイル。オーディオスプライトはYYMMDD.ogg,YYMMDD.mp3
|     ├── ts----TypeScriptファイル。ver1.5.3で記述
|     └── typings----TypeScript 型定義用ファイル
├── testCode ---------------- オーディオスプライト単体テスト用のソースコード。構成はsrcと同じ
├── gulpfile.js ------------- 自動タスク（Gulp）用定義ファイル
└── package.json -------- Node モジュールバージョン管理ファイル（npm 用）
```

# LICENSE
[LICENSE](https://github.com/ics-creative/150908_pentatonic_particles/blob/master/LICENSE)