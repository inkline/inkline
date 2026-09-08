import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATALOG_PATH,
  REPO_ROOT,
  extractCatalog,
  findCollisions,
  formatCollisions,
  suggestFreeCode,
  type Catalog,
} from "../../../scripts/check-diagnostic-collisions.ts";
import { DIAGNOSTICS } from "./codes.ts";

/**
 * `scripts/check-diagnostic-collisions.ts` runs in CI against three git revisions. These tests cover
 * the two halves that decide whether it bites: the parse (which `INKxxxx` in the file is a *claim*)
 * and the set logic (which claim is a *collision*). The git plumbing is left to CI, which is the
 * only place three revisions exist.
 */

function catalog(entries: Record<string, string>): Catalog {
  return new Map(
    Object.entries(entries).map(([code, title]) => [code, { severity: "error", title }]),
  );
}

describe("diagnostic catalog parse", () => {
  /**
   * The anti-vacuity gate. If the parser and the runtime module ever disagree, every other
   * assertion here is testing a fiction — and the CI check would go quietly blind on the real file.
   */
  it("reads the same codes from codes.ts that the module exports", () => {
    const parsed = extractCatalog(readFileSync(resolve(REPO_ROOT, CATALOG_PATH), "utf8"));
    expect([...parsed.keys()].sort()).toEqual(Object.keys(DIAGNOSTICS).sort());
  });

  it("carries the severity and title that identify the rule behind a code", () => {
    const parsed = extractCatalog(readFileSync(resolve(REPO_ROOT, CATALOG_PATH), "utf8"));
    expect(parsed.get("INK0001")).toEqual({
      severity: DIAGNOSTICS.INK0001.severity,
      title: DIAGNOSTICS.INK0001.title,
    });
  });

  /**
   * The distinction the whole check rests on: a code is claimed by being a *key*. Referencing one is
   * what every call site, doc row and URL does, and none of it may register as a claim.
   */
  it("counts only object keys as claims, never a code named in a value, call or comment", () => {
    const parsed = extractCatalog(`
      // INK0075 is documented in docs/adding-a-diagnostic.md.
      export const DIAGNOSTICS = {
        INK0001: {
          severity: "error" as const,
          title: "Supersedes INK0075" as const,
          help: "See INK0076" as const,
          url: "https://docs.inkline.dev/diagnostics/INK0077" as const,
        },
      } as const;

      export function report(ctx: Ctx) {
        ctx.diagnostics.push("INK0078", node.loc);
      }

      const EXPECTED = ["INK0079"];
    `);
    expect([...parsed.keys()]).toEqual(["INK0001"]);
  });

  it("ignores an INKxxxx key on any object other than the catalog", () => {
    const parsed = extractCatalog(`
      export const PHASES = { INK0060: "analyze" };
      export const DIAGNOSTICS = {
        INK0061: { severity: "warning" as const, title: "Real" as const },
      } as const;
    `);
    expect([...parsed.keys()]).toEqual(["INK0061"]);
  });

  it("returns an empty catalog for a revision that predates the file", () => {
    expect(extractCatalog("").size).toBe(0);
  });
});

describe("diagnostic code collisions", () => {
  const base = catalog({ INK0074: "Existing rule" });

  it("fires when the branch and main independently claim the same code", () => {
    const collisions = findCollisions(
      base,
      catalog({ INK0074: "Existing rule", INK0075: "Whole-object read of props" }),
      catalog({ INK0074: "Existing rule", INK0075: "Unbound macro" }),
    );
    expect(collisions).toHaveLength(1);
    expect(collisions[0]).toMatchObject({
      code: "INK0075",
      branchTitle: "Whole-object read of props",
      mainTitle: "Unbound macro",
      suggestion: "INK0076",
    });
  });

  /**
   * The failure mode this check exists for. A branch whose merge base predates main's claim is
   * exactly the branch that collides, so the "already taken" answer must come from the main tip.
   * Reading it from `base` here would return no collision.
   */
  it("fires even though the merge base predates main's claim", () => {
    expect(
      findCollisions(base, catalog({ INK0075: "Branch rule" }), catalog({ INK0075: "Main rule" })),
    ).toHaveLength(1);
  });

  it("names every colliding code when a branch adds more than one", () => {
    const collisions = findCollisions(
      base,
      catalog({ INK0075: "Branch A", INK0076: "Branch B" }),
      catalog({ INK0075: "Main A", INK0076: "Main B" }),
    );
    expect(collisions.map((collision) => collision.code)).toEqual(["INK0075", "INK0076"]);
  });

  it("stays silent when the branch's new code is free on main", () => {
    expect(
      findCollisions(
        base,
        catalog({ INK0075: "Branch rule" }),
        catalog({ INK0074: "Existing rule" }),
      ),
    ).toEqual([]);
  });

  // An edit is not a claim: the code was already in the merge base, so both sides own the same one.
  it("stays silent when the branch edits a code that already existed", () => {
    const head = new Map([["INK0074", { severity: "error", title: "Existing rule" }]]);
    expect(findCollisions(base, head, catalog({ INK0074: "Existing rule" }))).toEqual([]);
    expect(
      findCollisions(
        base,
        catalog({ INK0074: "Reworded rule" }),
        catalog({ INK0074: "Existing rule" }),
      ),
    ).toEqual([]);
  });

  // After a squash merge the branch keeps its pre-merge base, so its own merged code reappears as
  // "introduced" while main holds the identical entry. That is the branch meeting itself.
  it("stays silent when main already holds the identical entry", () => {
    expect(
      findCollisions(
        base,
        catalog({ INK0075: "Branch rule" }),
        catalog({ INK0075: "Branch rule" }),
      ),
    ).toEqual([]);
  });

  it("stays silent when the branch touches no catalog entry at all", () => {
    expect(
      findCollisions(base, base, catalog({ INK0074: "Existing rule", INK0075: "Main rule" })),
    ).toEqual([]);
  });

  it("suggests the lowest code free on both sides", () => {
    expect(suggestFreeCode("INK0075", ["INK0075", "INK0076", "INK0078"])).toBe("INK0077");
  });

  it("names the code, the rule on main and the renumber target", () => {
    const [message] = formatCollisions(
      findCollisions(base, catalog({ INK0075: "Branch rule" }), catalog({ INK0075: "Main rule" })),
    );
    expect(message).toContain("INK0075 is already defined on origin/main");
    expect(message).toContain('"Main rule" (error)');
    expect(message).toContain('"Branch rule"');
    expect(message).toContain("Renumber this branch to INK0076");
  });
});
