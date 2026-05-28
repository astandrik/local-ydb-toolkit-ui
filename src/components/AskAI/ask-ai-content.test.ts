import { describe, expect, it } from "vitest";

import {
  ASK_AI_HOME,
  ASK_AI_PRODUCT_NAME,
} from "@/components/AskAI/ask-ai-content";

describe("Ask AI content", () => {
  it("keeps the homepage prompt focused on local-ydb-toolkit", () => {
    expect(ASK_AI_PRODUCT_NAME).toBe("local-ydb-toolkit");
    expect(ASK_AI_HOME).toEqual({
      label: "Ask AI about local-ydb-toolkit",
      helperText:
        "Open an AI assistant with product, install, MCP, and project context.",
      page: "home",
      promptVariant: "homepage",
      prompt:
        "Act as an AI agent or developer evaluating local-ydb-toolkit. Using current information from https://local-ydb-toolkit.ydb-qdrant.tech/, explain what local-ydb-toolkit is, when to use the local stdio MCP server versus the hosted read-only promo MCP, how to install @astandrik/local-ydb-mcp, how the Codex skill and setup-local-ydb GitHub Action fit, what the confirm: true safety model means, and which public projects use local-ydb.",
    });
  });
});
