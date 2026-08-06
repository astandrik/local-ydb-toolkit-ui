import {
  ArrowRight,
  CloudCheck,
  Code,
  Database,
  DatabaseMagnifier,
  Gear,
  GearBranches,
  Lock,
  NodesRight,
  ShieldCheck,
  Terminal,
} from "@gravity-ui/icons";
import Image from "next/image";

import { AskAIPanel } from "@/components/AskAI/AskAIPanel";
import {
  ASK_AI_HOME,
  ASK_AI_PRODUCT_NAME,
} from "@/components/AskAI/ask-ai-content";
import { CopyableCode } from "@/components/CopyableCode/CopyableCode";
import { Button, Card, Container, Text } from "@/components/GravityUI/GravityUI";
import { withBasePath } from "@/lib/base-path";
import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  INSTALL_OPTIONS,
  LOCAL_YDB_PRODUCT,
  MCP_DIRECTORY_SNAPSHOT_WARNING,
  MCP_REGISTRY_LINKS,
  PROJECTS_USING_LOCAL_YDB,
  PUBLIC_LINKS,
  TOOLKIT_RELEASE,
  WORKFLOWS,
  getAgentRoutingGuidance,
  type Workflow,
} from "@/lib/product-data";

import "./PromoPage.scss";

const PROOF_POINTS = [
  {
    label: "MCP release",
    value: `${TOOLKIT_RELEASE.version} · ${TOOLKIT_RELEASE.toolCount} tools`,
  },
  {
    label: "Execution model",
    value: "plan first, confirm later",
  },
  {
    label: "CI path",
    value: "setup-local-ydb@v1",
  },
] as const;

const WORKFLOW_ICONS: Record<Workflow["id"], typeof Database> = {
  diagnostics: DatabaseMagnifier,
  query: Code,
  schema: Gear,
  auth: Lock,
  bootstrap: Database,
  "dynamic-nodes": NodesRight,
  storage: ShieldCheck,
  backup: CloudCheck,
  upgrade: GearBranches,
};

export function PromoPage() {
  return (
    <main>
      <section className="hero-band">
        <Container maxWidth="xl" gutters={5} className="hero">
          <div className="hero__copy">
            <p className="eyebrow">Agent-ready local YDB operations</p>
            <Text as="h1" variant="display-4" className="hero__title">
              local-ydb-toolkit
            </Text>
            <p className="hero__lead">{LOCAL_YDB_PRODUCT.summary}</p>
            <div className="hero__actions">
              <Button
                view="action"
                size="xl"
                href={PUBLIC_LINKS.npm}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal />
                Use MCP server
              </Button>
              <Button
                view="outlined"
                size="xl"
                href={withBasePath("/agents.md")}
              >
                Agent guide
                <ArrowRight />
              </Button>
            </div>
            <CopyableCode
              className="hero__command"
              value={LOCAL_YDB_PRODUCT.primaryCta.command}
            />
            <div className="hero__proof" aria-label="Product highlights">
              {PROOF_POINTS.map((point) => (
                <div key={point.label} className="proof-item">
                  <span>{point.label}</span>
                  <strong>{point.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual" aria-label="local-ydb-toolkit flow">
            <div className="terminal-card">
              <div className="terminal-card__bar">
                <span />
                <span />
                <span />
              </div>
              <div className="terminal-card__body">
                <div className="terminal-line">
                  <span className="terminal-line__prompt">$</span>
                  <span>local_ydb_status_report</span>
                </div>
                <div className="terminal-output">
                  <span>inventory</span>
                  <strong>read-only</strong>
                </div>
                <div className="terminal-output">
                  <span>healthcheck</span>
                  <strong>selfCheckResult</strong>
                </div>
                <div className="terminal-output terminal-output--warn">
                  <span>mutation</span>
                  <strong>plan returned</strong>
                </div>
                <div className="terminal-gate">
                  <ShieldCheck />
                  <span>confirm: true required for execution</span>
                </div>
              </div>
            </div>
            <div className="hero__logo-strip">
              <Image
                src={withBasePath("/assets/ydb-icon.svg")}
                alt="YDB"
                width={104}
                height={32}
                unoptimized
              />
              <span>Docker local-ydb target stays on your machine</span>
            </div>
          </div>
        </Container>
      </section>

      <Container maxWidth="xl" gutters={5} className="page-content">
        <section className="ask-ai-section">
          <AskAIPanel
            productName={ASK_AI_PRODUCT_NAME}
            label={ASK_AI_HOME.label}
            helperText={ASK_AI_HOME.helperText}
            prompt={ASK_AI_HOME.prompt}
            page={ASK_AI_HOME.page}
            promptVariant={ASK_AI_HOME.promptVariant}
          />
        </section>

        <section className="quickstart-band" aria-labelledby="quickstart-title">
          <div>
            <p className="eyebrow">Quickstart</p>
            <h2 id="quickstart-title">Install the local MCP server where YDB runs</h2>
            <p>
              Use the hosted site for discovery and the local stdio MCP server
              for Docker, SSH, config files, password files, and actual
              local-ydb operations.
            </p>
            <CopyableCode
              className="quickstart-band__command"
              value={INSTALL_OPTIONS[0]?.command ?? ""}
            />
          </div>
          <div className="quickstart-band__links">
            <Button view="outlined" size="l" href={withBasePath("/docs/api")}>
              API docs
              <ArrowRight />
            </Button>
            <Button view="outlined" size="l" href={withBasePath("/auth.md")}>
              Auth guide
              <ArrowRight />
            </Button>
            <Button view="outlined" size="l" href={withBasePath("/compare")}>
              Compare
              <ArrowRight />
            </Button>
            <Button
              view="outlined"
              size="l"
              href={withBasePath("/guides/local-ydb-ci")}
            >
              CI guide
              <ArrowRight />
            </Button>
          </div>
        </section>

        <section className="section-grid" aria-labelledby="safety-title">
          <div className="section-heading">
            <p className="eyebrow">Safety model</p>
            <h2 id="safety-title">Hosted discovery, local execution</h2>
          </div>
          <div className="boundary-grid">
            <Card view="outlined" className="boundary-card">
              <ShieldCheck className="boundary-card__icon" />
              <h3>Remote promo MCP</h3>
              <p>{AGENT_BOUNDARIES.remotePromoMcp}</p>
            </Card>
            <Card view="outlined" className="boundary-card">
              <Terminal className="boundary-card__icon" />
              <h3>Local stdio MCP</h3>
              <p>{AGENT_BOUNDARIES.localOperations}</p>
            </Card>
            <Card view="outlined" className="boundary-card">
              <Lock className="boundary-card__icon" />
              <h3>Credentials stay local</h3>
              <p>{AGENT_BOUNDARIES.credentials}</p>
            </Card>
          </div>
        </section>

        <section id="agent-access" className="section-grid">
          <div className="section-heading">
            <p className="eyebrow">Agent access</p>
            <h2>Install paths for different jobs</h2>
          </div>
          <div className="install-grid">
            {INSTALL_OPTIONS.map((option) => (
              <Card key={option.id} view="outlined" className="install-card">
                <div>
                  <h3>{option.label}</h3>
                  <p>{option.description}</p>
                </div>
                <CopyableCode
                  className="install-card__command"
                  value={option.command}
                />
              </Card>
            ))}
          </div>
        </section>

        <section id="mcp-registries" className="section-grid">
          <div className="section-heading">
            <p className="eyebrow">Directory and trust listings</p>
            <h2>Public pages agents can cross-check</h2>
            <p className="registry-disclaimer">
              {MCP_DIRECTORY_SNAPSHOT_WARNING}
            </p>
          </div>
          <div className="registry-grid">
            {MCP_REGISTRY_LINKS.map((registry) => (
              <a
                key={registry.id}
                href={registry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="registry-card"
              >
                <span
                  className={`registry-card__tag registry-card__tag--${registry.category}`}
                >
                  {registry.category}
                </span>
                <span className="registry-card__copy">
                  <strong>{registry.label}</strong>
                  <span>{registry.description}</span>
                  <em>{registry.status}</em>
                  <small className="registry-card__metadata">
                    {registry.sourceType} source · {registry.accuracy} accuracy ·
                    {" "}
                    checked {registry.lastChecked ?? "not recorded"}
                  </small>
                  <small className="registry-card__note">{registry.note}</small>
                </span>
                <ArrowRight className="registry-card__arrow" />
              </a>
            ))}
          </div>
        </section>

        <section id="guides" className="section-grid">
          <div className="section-heading">
            <p className="eyebrow">Guides</p>
            <h2>Answer-first pages for agents and developers</h2>
          </div>
          <div className="guide-grid">
            {GUIDE_LINKS.map((guide) => (
              <a
                key={guide.id}
                href={withBasePath(guide.href)}
                className="guide-card"
              >
                <span className="guide-card__copy">
                  <strong>{guide.label}</strong>
                  <span>{guide.description}</span>
                </span>
                <ArrowRight className="guide-card__arrow" />
              </a>
            ))}
          </div>
        </section>

        <section id="projects" className="section-grid">
          <div className="section-heading">
            <p className="eyebrow">Examples</p>
            <h2>Projects using local-ydb</h2>
          </div>
          <Card view="outlined" className="project-links-card">
            <ul className="project-links">
              {PROJECTS_USING_LOCAL_YDB.map((project) => (
                <li key={project.href}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <span>{project.label}</span>
                    <ArrowRight />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section id="workflows" className="section-grid">
          <div className="section-heading">
            <p className="eyebrow">Coverage</p>
            <h2>Workflow summaries agents can route to tools</h2>
          </div>
          <div className="workflow-grid">
            {WORKFLOWS.map((workflow) => {
              const Icon = WORKFLOW_ICONS[workflow.id];
              return (
                <Card key={workflow.id} view="outlined" className="workflow-card">
                  <Icon className="workflow-card__icon" />
                  <h3>{workflow.title}</h3>
                  <p>{workflow.description}</p>
                  <ul>
                    {workflow.tools.slice(0, 3).map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="routing-band" aria-labelledby="routing-title">
          <div>
            <p className="eyebrow">Routing</p>
            <h2 id="routing-title">Complementary to ydb/ydb-mcp</h2>
            {getAgentRoutingGuidance()
              .split("\n\n")
              .slice(0, 3)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
          <div className="routing-band__links">
            <Button
              view="outlined"
              size="l"
              href={PUBLIC_LINKS.officialYdbMcp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official ydb/ydb-mcp
              <ArrowRight />
            </Button>
            <Button view="outlined" size="l" href={withBasePath("/mcp.md")}>
              MCP boundary
              <ArrowRight />
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
