// @ts-nocheck
const DEV = process.env.NODE_ENV !== "production";

// The seven composed framework Storybooks. `port` is the dev-server port each
// framework listens on; `path` is the default production location (a relative
// path the deploy hosts under, preserving today's behavior).
const frameworks = [
  { key: "react", title: "React", port: 6006, path: "./react" },
  { key: "vue", title: "Vue", port: 6007, path: "./vue" },
  { key: "svelte", title: "Svelte", port: 6008, path: "./svelte" },
  { key: "solid", title: "Solid", port: 6009, path: "./solid" },
  { key: "angular", title: "Angular", port: 6010, path: "./angular" },
  { key: "qwik", title: "Qwik", port: 6011, path: "./qwik" },
  { key: "astro", title: "Astro", port: 6012, path: "./astro" },
];

// Production ref URL resolution, in precedence order:
//   1. STORYBOOK_REF_<KEY> — a full per-framework override (e.g. STORYBOOK_REF_VUE).
//   2. STORYBOOK_REF_BASE_URL — a template with a `{framework}` placeholder
//      (e.g. "https://{framework}.storybook.inkline.io").
//   3. The framework's default relative `path` (today's behavior).
const template = process.env.STORYBOOK_REF_BASE_URL;
const prodUrl = ({ key, path }) => {
  const override = process.env[`STORYBOOK_REF_${key.toUpperCase()}`];
  if (override) return override;
  if (template) return template.replace(/\{framework\}/g, key);
  return path;
};

const refs = Object.fromEntries(
  frameworks.map((framework) => [
    framework.key,
    {
      title: framework.title,
      url: DEV ? `http://localhost:${framework.port}` : prodUrl(framework),
    },
  ]),
);

export default {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.ts"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  refs,
};
