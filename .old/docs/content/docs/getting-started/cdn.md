---
title: CDN Installation - Inkline
description: Install Inkline using one of the official CDNs. The content delivery network (CDN) provides super fast asset delivery from a server that is closest to you.
---

# CDN Installation 🚧 (WIP)

Install Inkline using one of the official CDNs. The content delivery network (CDN) provides super fast asset delivery from a server that is closest to you.

CDN offers lightning-fast development and optimized production builds, making it the perfect environment for Inkline. This integration gives you the best developer experience with instant HMR (Hot Module Replacement) and optimized performance.

Probably the quickest way to get started, with minimal setup, is to add the files directly from a CDN.

If you're not using using package managers or build systems, and you want to add Inkline to your project, you can import the compiled files from:

**jsDelivr**
~~~html
<link href="https://cdn.jsdelivr.net/npm/inkline/dist/inkline.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/inkline/dist/inkline.js"></script>
~~~

**unpkg**
~~~html
<link href="https://unpkg.com/inkline@latest/dist/inkline.css" rel="stylesheet">
<script src="https://unpkg.com/inkline@latest/dist/inkline.js"></script>
~~~

### Starter Template

To quickly test Inkline, copy the code below into your `index.html` or try it out live on [StackBlitz](https://stackblitz.com/edit/inkline?file=src/App.vue){rel="nofollow" target="_blank"}. This will pull the latest version of Vue and Inkline, allowing you to start playing around with Vue and Inkline's components.

Be sure to have your pages set up with the latest design and development standards, using an HTML5 doctype and including a viewport meta tag for proper responsive behavior.

The files can be browsed and downloaded from a CDN such as [unpkg](https://unpkg.com/browse/inkline@latest/){rel="nofollow" target="_blank"} or [jsDelivr](https://www.jsdelivr.com/package/npm/inkline){rel="nofollow" target="_blank"}. The various different files are explained later but you would typically want to download both a development build and a production build.

::ContentAlert
Component names need to be written as **`kebab-case`** (e.g. **`i-container`** instead of **`IContainer`**) when loading Vue 3 directly from a CDN.
::

~~~html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link href="https://unpkg.com/inkline@latest/dist/inkline.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
<div id="app">
    <i-container>
        <i-row>
            <i-column>
                <h1>
                    Welcome to Inkline!
                </h1>
                <p>
                    This is your starter page. Make sure to read the documentation to learn about what Inkline has to offer.
                </p>
                <i-button color="primary" href="https://inkline.io/docs">
                    Read Documentation
                </i-button>
            </i-column>
        </i-row>
    </i-container>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/inkline@latest"></script>
<script>
    const { createApp } = Vue;

    const components = {};
    Object.keys(Inkline).forEach((key) => {
        if (/I[A-Z]/.test(key)) {
            components[key] = Inkline[key];
        }
    });

    const app = createApp()
        .use(Inkline.Inkline, { components })
        .mount('#app')
</script>
</body>
</html>
~~~

::ContentLinkCard{ to="https://stackblitz.com/edit/inkline?file=src/App.vue" title="Try on StackBlitz" src="/assets/images/environments/cdn.svg" }
::

## What's Next?

Now that you have Inkline installed, here are some recommended next steps:

1. **Explore Components**: Check out our [component library](/docs/components) to see what's available
2. **See Available Design Tokens**: Start [using Inkline's design tokens](/docs/customization/design-tokens) to create custom components
3. **Customize Your Theme**: Learn how to [customize Inkline's theme](/docs/customization/theming) configuration

## Troubleshooting

Having issues with your installation? Here are solutions to common problems:

- **Components or Styling issues**: Make sure Inkline is properly referenced in your `nuxt.config.ts` file
- **TypeScript errors**: Ensure you have the latest `inkline` package installed

Still having trouble? Join our [GitHub Discussions](https://github.com/inkline/inkline/discussions){target="_blank"} for community support.
