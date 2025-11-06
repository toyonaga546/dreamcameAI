# DreakcameAI (夢記録アプリ)

ローカルで動く Next.js (TypeScript) の最小構成サンプルです。
機能:
- 簡易ログイン（クライアントローカルストレージ）
- 夢の記入フォームと確定ボタン

セットアップと実行:

```bash
# 依存をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開くとアプリが見えます。

次のステップの提案:
- サーバーサイド認証（NextAuth など）
- 永続化用のバックエンド（Supabase / Firebase / Next.js API routes + DB）
- 夢の一覧表示や編集機能
