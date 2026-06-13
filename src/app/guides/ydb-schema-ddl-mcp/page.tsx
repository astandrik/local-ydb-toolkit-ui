import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

const SCHEMA_SPEC = `{
  "validate": true,
  "statements": [
    {
      "kind": "createTable",
      "tableName": "schema_apply_smoke",
      "columns": [
        { "name": "id", "type": "Uint64", "notNull": true },
        { "name": "value", "type": "Utf8" }
      ],
      "primaryKey": ["id"],
      "indexes": [
        {
          "name": "schema_apply_smoke_by_value",
          "columns": ["value"],
          "global": true
        }
      ]
    }
  ]
}`;

export const metadata = {
  title: "Generate and apply YDB table schema DDL safely",
  description:
    "Generate, validate, plan, apply, inspect, and clean up YDB table DDL through @astandrik/local-ydb-mcp.",
};

export default function YdbSchemaDdlMcpPage() {
  return (
    <ContentPage
      eyebrow="Schema DDL"
      title="Generate and apply YDB table schema DDL safely"
      lead="local_ydb_generate_schema is read-only. local_ydb_apply_schema validates first and applies only when action is apply and confirm: true is supplied."
      sections={[
        {
          title: "Safe schema workflow",
          items: [
            "Inspect the target tenant with local_ydb_status_report and local_ydb_scheme.",
            "Call local_ydb_generate_schema with a strict JSON table spec and validate: true.",
            "Review generated DDL, script SHA-256, warnings, risk, and SDK validation status.",
            "Call local_ydb_apply_schema with action: validate.",
            "Call local_ydb_apply_schema with action: apply and confirm: false to return the plan.",
            "Execute only after approval with the exact same apply call plus confirm: true.",
            "Verify with local_ydb_scheme using action: describe.",
          ],
        },
        {
          title: "Example generator spec",
          code: SCHEMA_SPEC,
        },
        {
          title: "Important constraints",
          items: [
            "Use notNull only for primary key columns in generated CREATE TABLE specs.",
            "Use the top-level store field instead of with.STORE.",
            "Keep secondary and vector indexes on row-oriented tables.",
            "Do not add an index on a column added or dropped in the same ALTER TABLE spec.",
            "Prefer adding vector indexes after representative data is loaded.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/guides/ydb-schema-ddl-mcp.md"), label: "Markdown version" },
        { href: withBasePath("/guides/diagnose-local-ydb-mcp"), label: "Diagnostics guide" },
        { href: withBasePath("/docs/api"), label: "API docs" },
      ]}
    />
  );
}
