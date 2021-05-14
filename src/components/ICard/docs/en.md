---
title: Card
description: Cards provide you with a flexible and extensible content container with multiple color variants and options.
---

<script setup>
import * as examples from '../examples';
</script>

# Card

## Cards provide you with a flexible and extensible content container with multiple color variants and options.

A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options. 

### Basic Example
Cards are customizable content holders built with as little markup and styles as possible. They are based on flexbox, offering easy alignment and they mix well with other components. 

By default, cards are set to have `width: 100%`, fully spanning the width of the parent container. 

<example type="card" :component="examples.ICardBasicExample" :html="examples.ICardBasicExampleHTML"></example>

### Body
The building block of a card is the card body. All the content placed in the default component slot will be placed inside the body.

<example type="card" :component="examples.ICardBodyExample" :html="examples.ICardBodyExampleHTML"></example>

### Header and Footer
Optionally, you can provide a header or a footer for your cards.

<example type="card" :component="examples.ICardHeaderFooterExample" :html="examples.ICardHeaderFooterExampleHTML"></example>

### Image Header
You can provide an image at the top of the card, using the `image` slot.

<example type="card" :component="examples.ICardImageExample" :html="examples.ICardImageExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the text and spacing size of your cards, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example type="card" :component="examples.ICardSizeVariantsExample" :html="examples.ICardSizeVariantsExampleHTML"></example>

### Color Variants
Inkline includes several predefined card colors that you can use within your application. You can apply a style using the `color` property.

<example type="card" :component="examples.ICardColorVariantsExample" :html="examples.ICardColorVariantsExampleHTML"></example>

