# そぽたん展の展示用web

## Dockerデプロイ

1. `.env.example` を `.env` にコピーして値を設定
2. `letsencrypt` ディレクトリを作成し、`acme.json` を準備
3. `docker compose up -d --build`

```bash
cp .env.example .env
mkdir -p letsencrypt
touch letsencrypt/acme.json
chmod 600 letsencrypt/acme.json
docker compose up -d --build
```
