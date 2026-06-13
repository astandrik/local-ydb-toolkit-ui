import { buildOpenApiSpec } from "@/lib/openapi";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(buildOpenApiSpec(), {
    headers: discoveryHeaders("application/json"),
  });
}
