---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: "Inkline"
    text: "UI UX DX Vue.js Library"
    tagline: My great project tagline
    actions:
        -   theme: brand
            text: Markdown Examples
            link: /markdown-examples
        -   theme: alt
            text: API Examples
            link: /api-examples

features:
    -   title: Feature A
        details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    -   title: Feature B
        details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    -   title: Feature C
        details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

# HELLO WORLD!

[Home](/) <!-- sends the user to the root index.md -->
[foo](/foo/) <!-- sends the user to index.html of directory foo -->
[foo heading](./#heading) <!-- anchors user to a heading in the foo index file -->
[bar - three](../bar/three) <!-- you can omit extension -->
[bar - three](../bar/three.md) <!-- you can append .md -->
[bar - four](../bar/four.html) <!-- or you can append .html -->

| Tables        |      Are      |  Cool |
|---------------|:-------------:|------:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

:tada: :100:

[[toc]]

::: info Hello world
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

```vue

<template>
    <div>
        <h1>Hello World!</h1>
    </div>
</template>
```
