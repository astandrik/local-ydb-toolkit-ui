import {
  AGENT_BOUNDARIES,
  TOOLKIT_RELEASE,
  WORKFLOWS,
  getAgentRoutingGuidance,
  getInstallOption,
} from "@/lib/product-data";

import "./AgentModeView.scss";

export function AgentModeView() {
  const mcpNpxInstall = getInstallOption("mcp-npx");

  return (
    <main>
      <article>
        <h1>local-ydb-toolkit agent mode</h1>
        <p>
          Structured discovery view for AI agents. Use this page to find public
          endpoints, authentication boundaries, install snippets, and supported
          local-ydb workflows without parsing the marketing layout.
        </p>
        <p>
          Reviewed toolkit snapshot: {TOOLKIT_RELEASE.package}{" "}
          {TOOLKIT_RELEASE.version}, {TOOLKIT_RELEASE.toolCount} tools, checked{" "}
          {TOOLKIT_RELEASE.checkedAt}.
        </p>

        <h2>Capabilities</h2>
        <ul>
          {WORKFLOWS.map((workflow) => (
            <li key={workflow.id}>
              <strong>{workflow.title}</strong>: {workflow.description}
            </li>
          ))}
        </ul>

        <h2>Endpoints</h2>
        <ul>
          <li>GET /index.md</li>
          <li>GET /llms.txt</li>
          <li>GET /llms-full.txt</li>
          <li>GET /agents.md</li>
          <li>GET /auth.md</li>
          <li>GET /docs/api</li>
          <li>GET /docs/webhooks</li>
          <li>GET /guides/local-ydb-sql</li>
          <li>GET /guides/local-ydb-sql.md</li>
          <li>GET /api/product</li>
          <li>GET /api/install-options</li>
          <li>GET /api/workflows</li>
          <li>GET /openapi.json</li>
          <li>GET /.well-known/agent-card.json</li>
          <li>POST /mcp</li>
        </ul>

        <h2>Authentication</h2>
        <p>
          Public discovery endpoints and the hosted promo MCP require no
          authentication. Local operations use the local stdio MCP server and
          local config files. Set <code>LOCAL_YDB_TOOLKIT_CONFIG</code> or pass
          {" "}
          <code>configPath</code> where supported. Keep{" "}
          <code>rootPasswordFile</code>, <code>authConfigPath</code>, and{" "}
          <code>dynamicNodeAuthTokenFile</code> on the local machine, CI runner,
          or SSH target.
        </p>

        <h2>Install</h2>
        <pre className="agent-mode__install">
          {mcpNpxInstall.configSnippet}
        </pre>

        <h2>Safety</h2>
        <p>{AGENT_BOUNDARIES.remotePromoMcp}</p>
        <p>{AGENT_BOUNDARIES.localOperations}</p>
        <p>{AGENT_BOUNDARIES.credentials}</p>

        <h2>Routing</h2>
        {getAgentRoutingGuidance()
          .split("\n\n")
          .map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
      </article>
    </main>
  );
}
