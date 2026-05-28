# local-ydb-toolkit-ui

Promo and agent-readable site for `local-ydb-toolkit`.

Public URL: <https://local-ydb-toolkit.ydb-qdrant.tech>

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm test
npx tsc --noEmit --incremental false
npm run build
```

## Notes

- `NEXT_PUBLIC_APP_URL` controls canonical public URLs.
- `NEXT_PUBLIC_BASE_PATH` can be used for subpath deployments.
