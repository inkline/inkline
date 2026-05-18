// @ts-nocheck
const DEV = process.env.NODE_ENV !== "production";
const ref = (port: number, path: string) => (DEV ? `http://localhost:${port}` : path);

export default {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.ts"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  refs: {
    react: { title: "React", url: ref(6006, "./react") },
    vue: { title: "Vue", url: ref(6007, "./vue") },
    svelte: { title: "Svelte", url: ref(6008, "./svelte") },
    solid: { title: "Solid", url: ref(6009, "./solid") },
    angular: { title: "Angular", url: ref(6010, "./angular") },
    qwik: { title: "Qwik", url: ref(6011, "./qwik") },
    astro: { title: "Astro", url: ref(6012, "./astro") },
  },
};
