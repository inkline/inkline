import { addons } from "storybook/manager-api";
import { STORY_RENDERED } from "storybook/internal/core-events";

// Workaround for a Storybook race in composition (seen in 10.4.4): the refs
// API's `updateRef` writes the whole refs map from an `api.getRefs()` snapshot
// (`storybook/dist/manager/globals-runtime.js:58345`), which is stale while
// another ref update is pending. The open ref's `previewInitialized` can be
// lost that way, so "Content is loading..." stays over a rendered story.
// Re-assert it once the ref's story has rendered. Remove this file once
// `updateRef` uses `setState((state) => …)` upstream.
addons.register("inkline/ref-preview-initialized", (api) => {
  api.on(STORY_RENDERED, function (this: { refId?: string }) {
    const ref = this.refId ? api.getRefs()[this.refId] : undefined;
    if (ref && !ref.previewInitialized) void api.setPreviewInitialized(ref);
  });
});
