export const ASK_AI_PRODUCT_NAME = "local-ydb-toolkit";

export const ASK_AI_HOME = {
  label: "Ask AI about local-ydb-toolkit",
  helperText:
    "Open an AI assistant with product, install, MCP, and project context.",
  page: "home",
  promptVariant: "homepage",
  prompt:
    "Act as an AI agent or developer evaluating local-ydb-toolkit. Using current information from https://local-ydb-toolkit.ydb-qdrant.tech/, explain what local-ydb-toolkit is, when to use local_ydb_sql for a configured local-ydb profile versus ydb/ydb-mcp for arbitrary YDB endpoints, when to use the local stdio MCP server versus the hosted read-only promo MCP, how to install @astandrik/local-ydb-mcp, how the Codex skill and setup-local-ydb GitHub Action fit, what the confirm: true safety model means, and which public projects use local-ydb.",
} as const;
