import { buildMcpServerCard } from "@/lib/mcp-registry";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(buildMcpServerCard(), {
    headers: discoveryHeaders("application/json"),
  });
}
