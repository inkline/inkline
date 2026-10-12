import { describe, expect, it } from "vitest";
import {
  buildStorybookEmbedUrl,
  DOCS_EMBED_HEIGHT_MESSAGE,
  readDocsEmbedHeight,
  resolveStorybookBaseUrl,
  storybookEmbedCssHeight,
} from "../app/lib/storybookEmbed.ts";

const TEMPLATE = "https://{framework}.storybook.example.com";
const STORY = "components-actions-button--default";

describe("resolveStorybookBaseUrl", () => {
  it("substitutes every occurrence of the framework placeholder", () => {
    expect(resolveStorybookBaseUrl("https://{framework}.example.com/{framework}", "vue")).toBe(
      "https://vue.example.com/vue",
    );
  });

  it("trims trailing slashes so the built URL never doubles them", () => {
    expect(resolveStorybookBaseUrl("https://storybook.example.com//")).toBe(
      "https://storybook.example.com",
    );
  });
});

describe("buildStorybookEmbedUrl", () => {
  it("addresses the preview surface by default and marks itself as a direct embed", () => {
    expect(buildStorybookEmbedUrl({ template: TEMPLATE, story: STORY, framework: "vue" })).toBe(
      `https://vue.storybook.example.com/iframe.html?id=${STORY}&viewMode=story&docsEmbed=1`,
    );
  });

  it("addresses the manager in full mode", () => {
    expect(
      buildStorybookEmbedUrl({ template: TEMPLATE, story: STORY, framework: "vue", mode: "full" }),
    ).toBe(
      `https://vue.storybook.example.com/?path=/story/${STORY}&full=1&shortcuts=false&singleStory=true`,
    );
  });

  it("encodes the story id rather than splicing it into the query raw", () => {
    expect(
      buildStorybookEmbedUrl({ template: "https://sb.example.com", story: "a&b=c" }),
    ).toContain("id=a%26b%3Dc&");
  });

  it("degrades to a same-origin URL when no host is configured", () => {
    expect(buildStorybookEmbedUrl({ template: "", story: STORY })).toBe(
      `/iframe.html?id=${STORY}&viewMode=story&docsEmbed=1`,
    );
  });
});

describe("storybookEmbedCssHeight", () => {
  it("reads a bare number as pixels, in either type markdown may deliver", () => {
    expect(storybookEmbedCssHeight(420)).toBe("420px");
    expect(storybookEmbedCssHeight(" 420 ")).toBe("420px");
  });

  it("passes a CSS length through untouched", () => {
    expect(storybookEmbedCssHeight("min(80vh, 600px)")).toBe("min(80vh, 600px)");
  });
});

describe("readDocsEmbedHeight", () => {
  it("reads a height message", () => {
    expect(readDocsEmbedHeight({ type: DOCS_EMBED_HEIGHT_MESSAGE, height: 420 })).toBe(420);
  });

  it("ignores other messages", () => {
    expect(readDocsEmbedHeight({ type: "something-else", height: 420 })).toBeNull();
    expect(readDocsEmbedHeight("420")).toBeNull();
  });

  // These reach a style attribute, so a bad one is a collapsed or absurd frame
  // rather than an exception.
  it.each([0, -10, Number.NaN, Number.POSITIVE_INFINITY, "420", null])(
    "rejects %o as a height",
    (height) => {
      expect(readDocsEmbedHeight({ type: DOCS_EMBED_HEIGHT_MESSAGE, height })).toBeNull();
    },
  );
});
