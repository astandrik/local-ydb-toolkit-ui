import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  LOCAL_YDB_PRODUCT,
  MCP_DIRECTORY_SNAPSHOT_WARNING,
  MCP_LISTING_CONTEXT,
  MCP_REGISTRY_LINKS,
  PROJECTS_USING_LOCAL_YDB,
  PUBLIC_LINKS,
  TOOLKIT_RELEASE,
} from "@/lib/product-data";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(
    {
      product: LOCAL_YDB_PRODUCT,
      toolkitRelease: TOOLKIT_RELEASE,
      boundaries: AGENT_BOUNDARIES,
      guideLinks: GUIDE_LINKS,
      projectsUsingLocalYdb: PROJECTS_USING_LOCAL_YDB,
      mcpDirectorySnapshotWarning: MCP_DIRECTORY_SNAPSHOT_WARNING,
      mcpListingContext: MCP_LISTING_CONTEXT,
      mcpRegistryLinks: MCP_REGISTRY_LINKS,
      links: PUBLIC_LINKS,
    },
    {
      headers: discoveryHeaders("application/json"),
    },
  );
}
