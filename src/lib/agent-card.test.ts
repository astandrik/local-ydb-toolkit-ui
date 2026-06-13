import { describe, expect, it, vi } from "vitest";

import { buildA2aAgentCard } from "@/lib/agent-card";

describe("A2A agent card", () => {
  it("describes the hosted read-only discovery agent without implying remote operations", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const card = buildA2aAgentCard();

    expect(card.name).toBe("local-ydb-toolkit Promo Agent");
    expect(card.url).toBe("https://local-ydb-toolkit.ydb-qdrant.tech/mcp");
    expect(card.documentationUrl).toBe(
      "https://local-ydb-toolkit.ydb-qdrant.tech/agents.md",
    );
    expect(card.capabilities.streaming).toBe(false);
    expect(card.capabilities.pushNotifications).toBe(false);
    expect(card.security).toEqual([]);
    expect(card.defaultInputModes).toContain("application/json");
    expect(card.defaultOutputModes).toContain("application/json");
    expect(card.skills.map((skill) => skill.id)).toEqual([
      "product-discovery",
      "install-guidance",
      "workflow-routing",
    ]);
    expect(card.resources.map((resource) => resource.title)).toContain(
      "Directory and trust listings",
    );
    expect(JSON.stringify(card)).toContain("read-only");
    expect(JSON.stringify(card)).not.toContain("remote bootstrap");

    vi.unstubAllEnvs();
  });
});
