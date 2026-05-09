# そぽたん展の展示用web

## Dockerデプロイ

- `/` : GIF表示 + ダウンロード
- `/display` : 展示表示（カーソルお試しエリア付き、ダウンロードなし）

前提: 既存の Traefik が `traefik-network`（または `.env` の `TRAEFIK_DOCKER_NETWORK`）に参加していること。

1. `.env.example` を `.env` にコピーして値を設定
2. ネットワークが無ければ作成
3. `docker compose up -d --build`

```bash
cp .env.example .env
docker network create traefik-network
docker compose up -d --build
```
