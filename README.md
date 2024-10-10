# TypeScript Express サーバー & PostgreSQL 自動テストの設定方法

このリポジトリでは、TypeScriptで作成されたExpressサーバーが、Docker上のPostgreSQLデータベースに接続し、自動テストをGitHub Actionsを使って行う方法について説明します。自動テストは、Postmanのテストスクリプト（Newman CLIを使用）を実行し、HTTPリクエストに対して正しいレスポンスが返ってくるかどうかを確認します。

## 使われている技術

- TypeScript: Node.js環境で型安全な開発を行うための言語。
- Express: 軽量なWebフレームワーク。
- PostgreSQL: オープンソースのリレーショナルデータベース。
- Docker: コンテナ化技術を使ってPostgreSQLを簡単にセットアップ。
- GitHub Actions: 継続的インテグレーション（CI）をサポートするためのGitHubの自動化ツール。
- Postman / Newman: APIテストを自動化するためのツール。

## 機能

- PostgreSQLに接続してデータを取得・登録を行うExpress製のWeb API
- 自動的にデータベーステーブルの初期化
- GitHub Actionsを使った自動テストの実行
- PostmanによるHTTPレスポンスのテスト

## セットアップ手順

### 1.ローカル環境でのセットアップ

1.リポジトリをクローンします。

2.必要な依存パッケージをインストールします。

```bash
npm install
```

3.Docker ComposeでPostgreSQLデータベースを起動します。

```bash
docker-compose up -d
```

4.必要な環境変数を .env ファイルに設定します。例:

```.env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

5.アプリケーションを起動します。

```bash
npx ts-node src/index.ts
```

6.アプリケーションには以下のエンドポイントが用意されています。

- GET: http://localhost:3000/data  -> DBのデータを取得してJSONで返却
- POST: http://localhost:3000/data -> DBにデータの登録を行う

### 2.GitHub Actionsを使った自動テスト

GitHub Actionsを使って、mainブランチにpushした際に自動でテストが実行されるように設定されています。設定ファイルは .github/workflows/auto_test.yml にあります。

## Postmanのテストについて
Postmanのテストスクリプトは、APIが正しく動作しているかを確認するために使用されます。リポジトリ内に**auto_test_collection.json**としてPostmanのコレクションが含まれており、Newmanを通じてこれを実行します。

```bash
newman run auto_test_collection.json
```

テスト結果はGitHub Actionsのログに表示されます。

