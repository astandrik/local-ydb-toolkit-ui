import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  LOCAL_YDB_PRODUCT,
  MCP_REGISTRY_LINKS,
  PROJECTS_USING_LOCAL_YDB,
  PUBLIC_LINKS,
} from "@/lib/product-data";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(
    {
      product: LOCAL_YDB_PRODUCT,
      boundaries: AGENT_BOUNDARIES,
      guideLinks: GUIDE_LINKS,
      projectsUsingLocalYdb: PROJECTS_USING_LOCAL_YDB,
      mcpRegistryLinks: MCP_REGISTRY_LINKS,
      links: PUBLIC_LINKS,
    },
    {
      headers: discoveryHeaders("application/json"),
    },
  );
}
