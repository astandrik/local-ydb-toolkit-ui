import {readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";

const QUALITY_WORKFLOW = readFileSync(
  new URL("../.github/workflows/quality.yml", import.meta.url),
  "utf8",
);

const EXPECTED_ACTIONS = new Map([
  [
    "actions/checkout",
    {
      ref: "d23441a48e516b6c34aea4fa41551a30e30af803",
      versionComment: "v6",
    },
  ],
  [
    "actions/setup-node",
    {
      ref: "249970729cb0ef3589644e2896645e5dc5ba9c38",
      versionComment: "v6",
    },
  ],
]);

function readActionUses(source: string) {
  return source.split("\n").flatMap((line) => {
    const match = line.match(
      /^\s*uses:\s*([^@\s]+)@([^\s#]+)(?:\s+#\s*(.+))?\s*$/,
    );

    if (!match) {
      return [];
    }

    return [
      {
        action: match[1],
        ref: match[2],
        versionComment: match[3]?.trim() ?? null,
      },
    ];
  });
}

describe("quality workflow", () => {
  it("pins every action to its approved full SHA with a readable version", () => {
    const actionUses = readActionUses(QUALITY_WORKFLOW);

    expect.soft(actionUses.map(({action}) => action)).toEqual([
      ...EXPECTED_ACTIONS.keys(),
    ]);

    for (const [action, expected] of EXPECTED_ACTIONS) {
      const matchingUses = actionUses.filter((candidate) => candidate.action === action);

      expect.soft(matchingUses).toHaveLength(1);
      expect.soft(matchingUses[0]).toEqual({action, ...expected});
    }
  });
});
