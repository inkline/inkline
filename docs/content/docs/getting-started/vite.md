---
title: Vite Installation - Inkline
description: Install Inkline for any Vite + Vue.js 3 application, as recommended by the community.
---

# Vite Installation

Install Inkline for any Vite + Vue.js 3 application, as recommended by the community.

Vite offers lightning-fast development and optimized production builds, making it the perfect environment for Inkline. This integration gives you the best developer experience with instant HMR (Hot Module Replacement) and optimized performance.

## Installation

::DocsInstallStep{:number="1" title="Create a project"}

Start by creating a new Vue.js application through Vite's interactive CLI by running the command below in your terminal:

~~~bash
npm init vue my-vue-app

cd my-vue-app

npm install
~~~

This creates a new Vue project with Vite's blazing-fast build tooling already configured.

For more information about Vite, you can read the [Getting Started](https://vitejs.dev/guide/){target="_blank"} guide.

::
::DocsInstallStep{:number="2" title="Install Inkline"}

Next, we'll use Inkline's CLI tool to automatically configure your project. Inkline will automatically detect your Vite.js development environment and generate a configuration file.

~~~bash
npx inkline@latest init
~~~

**What just happened?** The Inkline CLI:
1. Detected your Vite.js environment automatically
2. Added Inkline packages to your dependencies
3. Created an `inkline.config.ts` file with default theme settings
4. Updated your `vite.config.ts` to include Inkline's Vite plugin
5. Updated your `src/main.ts` file to register Inkline's Vue plugin

If you prefer manual control over the integration, check out our [Manual Installation guide](/docs/getting-started/other).

::
::DocsInstallStep{:number="3" title="Verify Your Installation"}

Let's make sure everything is working correctly:

1. Start your development server:
   ```bash
   npm run dev
   ```
   
2. Create a test component to verify that Inkline is working:

   ```html
   <ICard>🎉 Inkline is working!</ICard>
   ```

::

## What's Next?

Now that you have Inkline installed, here are some recommended next steps:

1. **Explore Components**: Check out our [component library](/docs/components) to see what's available
2. **See Available Design Tokens**: Start [using Inkline's design tokens](/docs/customization/design-tokens) to create custom components
3. **Customize Your Theme**: Learn how to [customize Inkline's theme](/docs/customization/theming) configuration

## Troubleshooting

Having issues with your installation? Here are solutions to common problems:

- **Components not found**: Make sure Inkline is properly imported in your `main.ts` file
- **Styling issues**: Check that the Inkline plugin is correctly added to your Vite configuration and that the output `index.css` file is imported
- **TypeScript errors**: Ensure you have the latest `inkline` package installed

Still having trouble? Join our [GitHub Discussions](https://github.com/inkline/inkline/discussions){target="_blank"} for community support.
