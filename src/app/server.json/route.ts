import { buildMcpRegistryServerMetadata } from "@/lib/mcp-registry";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(buildMcpRegistryServerMetadata(), {
    headers: discoveryHeaders("application/json"),
  });
}
