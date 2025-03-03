---
title: Vite Installation - Inkline
description: Install Inkline for an application created using any build tool, bundler or framework.
---

# Other Installation

description: Install Inkline for an application created using any build tool, bundler or framework.

## Installation

::DocsInstallStep{:number="1" title="Create a project"}

Create a new application using a Front End Development Tool that supports modern JavaScript (or TypeScript) such as:

- [Vite.js](https://vitejs.dev){rel="noopener nofollow"} (recommended)
- [Webpack.js](https://webpack.js.org){rel="noopener nofollow"}
- [Astro.build](https://astro.build){rel="noopener nofollow"}
- [Rollup.js](https://rollupjs.org){rel="noopener nofollow"}
- [Parcel.js](https://parceljs.org){rel="noopener nofollow"}

::
::DocsInstallStep{:number="2" title="Create configuration file"}

Next, we'll use Inkline's CLI tool to automatically configure your project. Inkline will automatically detect your Vite.js development environment and generate a configuration file.

**a. Using the Inkline CLI**

Run the following command to generate an **`inkline.config.ts`** file.

~~~bash
npx inkline@latest init --manual
~~~

**b. Manually**

Create an **`inkline.config.ts`** or  **`inkline.config.js`** file in the root of your project and add the following:

~~~typescript
import { defineConfig, useTheme, useComponentsTheme } from 'inkline';

export default defineConfig((options) => {
    useTheme(options);
    useComponentsTheme(options);
});
~~~

::DocsAlert
If you're using [Vite](/docs/installation/vite), or [Nuxt](/docs/installation/nuxt) please use the official integration. The plugin will automatically rebuild your variables when the config file changes.
::

::
::DocsInstallStep{:number="2" title="Install Inkline and dependencies"}

Install and save Inkline as a production dependency.

~~~bash
npm install --save inkline@latest
~~~

::
::DocsInstallStep{:number="3" title="Generate stylesheets"}

Run the following command to generate `.scss` files containing Sass variables from your Inkline config:

~~~bash
npx inkline@latest generate -o src/css/theme
~~~

Optionally, add the command as a script to your **`package.json`** file and re-run it every time your config changes.

::
::DocsInstallStep{:number="4" title="Generate stylesheets"}

Open your **`src/main.js`** or **`src/main.ts`** file and configure your application to use Inkline.

~~~js
import { createApp } from 'vue';
import App from './App.vue';

import { 
    Inkline, 
    components,
    globalComponentsAddon,
    colorModeAddon,
    modalAddon,
    toastAddon
} from 'inkline';
import 'inkline/dist/index.css';

const app = createApp(App);

app.use(Inkline, {
    addons: [
        colorModeAddon(), 
        globalComponentsAddon(components), 
        modalAddon(), 
        toastAddon()
    ],
});
    
app.mount('#app');
~~~

::
::DocsInstallStep{:number="5" title="Verify Your Installation"}

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

Still having trouble? Join our [GitHub Discussions](https://github.com/inkline/inkline/discussions) for community support.
