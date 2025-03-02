## 概要

チーム開発メンバー募集プラットフォームです。

チーム開発経験を積みたいけど、自分のまわりに開発をしている友人が少なかったり、Xなどで声をかけるのは少し気が引ける方が、
気軽にチーム開発経験を積めることを目的としています。

[公開先URL1 https://tech-unity-dev.com](https://tech-unity-dev.com)

[公開先URL2 https://tech-unity.vercel.app](https://tech-unity.vercel.app/)

公開先URL2ではNextAuthでのGitHubのキー作成の都合上、GitHubログインが使えないかと思われますので
よければ公開先URL1をご覧ください。

## 技術一覧・機能一覧

ログインテストユーザー

メールアドレス: testuser@test.com

パスワード: testuser

- Nextjs 14.2.21
- React 18.3.1
- TypeScript ^5.7.2
- Docker
- DB(Supabase(postgresql))
- ORM(Prisma)
- CI/CDパイプライン (GitHub Actions)
- ホスティング(Vercel, AWS ECS on Fargate)
- テスト(vitest, testing-library, msw)
- UIライブラリ・フレームワーク(tailwindcss, shadcn/ui)
- 認証(NextAuth.js v4(4.24.11))
- ソーシャルログイン(GitHub, Google)
- フォームバリデーション(zod)
- 募集一覧
- 募集詳細
- 募集作成(react-hook-form, react-md-editor, Cloudinary)
- 募集編集(react-hook-form, react-md-editor, Cloudinary)
- 募集削除
- 募集へのいいね
- 募集への応募
- 応募してきたユーザーの採用
- いいねした募集一覧
- 応募した募集一覧
- プロフィール編集
- 自分が作成した募集管理
- 検索結果ページでのページネーション

その他の使用技術はpackage.jsonなどをご覧ください。

## デモ動画
なぜかカーソルが消えていますがご容赦ください💦
<video src="https://github.com/user-attachments/assets/ad60108b-65f0-45d9-b230-8008ecf7999e"></video>

## AWS構成図
現在準備中です。

## 追加予定の機能

- DM機能
- コメント機能
- 応募してきたユーザーの却下機能
- 募集の締め切り機能
- 募集の人数制限
- 利用規約・利用ガイドの作成
- トピック機能
- ソート機能

## 開発フロー
Gitフロー

## こだわった点

- ユーザー視点で考える
  - いきなりログイン画面だとユーザーの離脱率が上がってしまうと思ったので、一部の機能はログイン不要で利用可能にしました。また、新規作成などが成功した際にトースト表示をしたり、画面遷移時にプログレスバーを表示してUXを高める努力をしました。
  
- 保守運用しやすくする
  - 無駄な依存関係を増やさない
  - むやみに最新技術を使わない
  - できる限りpageファイルからビジネスロジックを取り除く
  - コンポーネント分離する(アトミックデザインのorganism, molecules, atomsのみ採用)

　
　依存関係を不必要に増やさない・むやみに最新技術は使わないという点については、
具体的にはshadcn/uiとNextAuth v4の採用についてお話します。
　まずshadcn/uiはMUIなどの他のUIライブラリと違って依存関係に追加されない（tailwind, radix uiのことだけ気にすればよい）、
　NextAuthについてはbeta版でv5があるものの、v5が出て約1年たつのにいまだにbeta版なので、
今後安定板になるとは思うものの、まだ安定性に欠けると判断してv4を採用しました。
Next.js15とReact19についても同様です。

