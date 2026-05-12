export type TargetName = "react" | "solid" | "vue" | "svelte" | "angular" | "qwik" | "astro";

export const ALL_TARGETS: readonly TargetName[] = Object.freeze([
  "react",
  "solid",
  "vue",
  "svelte",
  "angular",
  "qwik",
  "astro",
]);

export interface Target {
  readonly name: TargetName;
}

export interface TargetRegistry {
  get(name: TargetName): Target | undefined;
  has(name: TargetName): boolean;
  list(): readonly TargetName[];
}
