# nuxt-ts

全体の説明については、[アーキテクチャ設計図](https://github.com/kikuchi-s-lvgs/nuxt-ts-sample-app/blob/main/doc/%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.md)を参照。

ログイン機能はFirebaseで実装しているので、`.env.example`を`.env`にリネームして使ってください。
まだアカウントを持っていない人はFirebaseのアカウントを作成してください。

```bash
# 依存モジュールをインストール
$ npm install

# ローカルで動かすとき
$ npm run dev

# SSGで静的リソースを生成するとき
$ npm run generate
```

generateコマンドで生成したあとは、dist配下すべてをホスティングツールにのせればOKです。

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
