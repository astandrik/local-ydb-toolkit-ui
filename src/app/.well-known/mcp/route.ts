import { handlePromoMcpRequest } from "@/lib/mcp-http";
import { discoveryHeaders } from "@/lib/discovery-links";
import { buildMcpRegistryServerMetadata } from "@/lib/mcp-registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(buildMcpRegistryServerMetadata(), {
    headers: discoveryHeaders("application/json"),
  });
}

export async function POST(req: Request): Promise<Response> {
  return handlePromoMcpRequest(req);
}
