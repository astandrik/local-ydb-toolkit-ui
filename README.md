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

## Release synchronization checklist

Future MCP release updates are reviewed manually:

- Confirm that the GitHub Release, npm package, and Official MCP Registry publish the same version and canonical repository.
- Read the release changelog and identify user-visible behavior changes.
- Compare tool and prompt names, descriptions, schemas, annotations, and other public contracts.
- Recheck every retained external listing, record the common audit date, and preserve stale or unavailable observations with explicit limitations.
- Update exact tool fixtures, workflow coverage, listing classifications, and agent-readable route assertions before running the full check chain.

## Notes

- `NEXT_PUBLIC_APP_URL` controls canonical public URLs.
- `NEXT_PUBLIC_BASE_PATH` can be used for subpath deployments.
