import { DOCS_URL, GITHUB_URL } from "~/data/site";

/** The docs header's links, with the one the reader is in highlighted. */
export function useHeaderLinks() {
  const route = useRoute();
  const isIn = (base: string) => route.path === base || route.path.startsWith(`${base}/`);

  return computed(() => [
    // The introduction, rather than /docs, which only redirects to it.
    { label: "Documentation", to: DOCS_URL, active: isIn("/docs") },
    { label: "GitHub", to: GITHUB_URL, target: "_blank" },
  ]);
}
