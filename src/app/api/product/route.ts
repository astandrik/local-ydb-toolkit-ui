import {
  AGENT_BOUNDARIES,
  LOCAL_YDB_PRODUCT,
  PROJECTS_USING_LOCAL_YDB,
  PUBLIC_LINKS,
} from "@/lib/product-data";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(
    {
      product: LOCAL_YDB_PRODUCT,
      boundaries: AGENT_BOUNDARIES,
      projectsUsingLocalYdb: PROJECTS_USING_LOCAL_YDB,
      links: PUBLIC_LINKS,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    },
  );
}
