import { buildA2aAgentCard } from "@/lib/agent-card";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(buildA2aAgentCard(), {
    headers: discoveryHeaders("application/json"),
  });
}
