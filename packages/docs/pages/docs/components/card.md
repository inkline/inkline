---
title: Card
description: Cards provide you with a flexible and extensible content container with multiple color variants and options.
---

# Card
## Cards provide you with a flexible and extensible content container with multiple color variants and options.

A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, 
contextual background colors, and powerful display options. 

### Example
Cards are customizable content holders built with as little markup and styles as possible. 
They are based on flexbox, offering easy alignment and mixing well with other components. 

By default, cards are set to have `width: 100%`, fully spanning the width of the parent container. 

<i-code title="Card Example">
<i-tab type="preview">
    <i-row>
        <i-column lg="8" xl="6">
            <i-card>
                <img slot="image" src="/images/placeholder-500x250.jpg" alt="Card Image" />
                <h4 class="title">Card Title</h4>
                <p class="subtitle">Card Subtitle</p>
                <p>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a class="link" href="https://inkline.io" onclick="return false;">Example Link</a>
            </i-card>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-card>
    <img slot="image" src=".." alt="Card Image" />
    <h4 class="title">Card Title</h4>
    <p class="subtitle">Card Subtitle</p>
    <p>
        Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <a class="link" href="https://inkline.io">Example Link</a>
</i-card>
~~~

</i-tab>
</i-code>

### Body
The building block of a card is the card body. All the content placed in the default component slot will be placed inside the body.

<i-code title="Card Body">
<i-tab type="preview">
    <i-row>
        <i-column lg="8" xl="6">
            <i-card>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-card>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~

</i-tab>
</i-code>

### Header and Footer
Optionally, you can provide a header or a footer for your cards.

<i-code title="Card Header and Footer">
<i-tab type="preview">
    <i-row>
        <i-column lg="8" xl="6">
            <i-card>
                <template slot="header">Card Header</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                <template slot="footer">Card Footer</template>
            </i-card>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-card>
    <template slot="header">Card Header</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
    <template slot="footer">Card Footer</template>
</i-card>
~~~

</i-tab>
</i-code>

### Card Images
You can provide an image at the top of the card, using the `image` slot.

<i-code title="Card Image">
<i-tab type="preview">
    <i-row>
        <i-column lg="8" xl="6">
            <i-card>
                <img slot="image" src="/images/placeholder-500x250.jpg" alt="Card Image" />
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-card>
    <img slot="image" src=".." alt="Card Image" />
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the text and spacing size of your cards, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Card Sizes">
<i-tab type="preview">
    <i-row class="_margin-bottom-1">
        <i-column lg="8" xl="6">
            <i-card size="sm">
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
    <i-row class="_margin-bottom-1">
        <i-column lg="8" xl="6">
            <i-card size="md">
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
    <i-row>
        <i-column lg="8" xl="6">
            <i-card size="lg">
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-card size="sm">
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card size="md">
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card size="lg">
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~

</i-tab>
</i-code>

### Variants
Inkline includes several predefined card styles that you can use within your application. You can apply a style using the `variant` property.

<i-code title="Card Variants">
<i-tab type="preview">
    <i-row>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="light">
                <template slot="header">Light Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="dark">
                <template slot="header">Dark Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
    <i-row>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="primary">
                <template slot="header">Primary Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="secondary">
                <template slot="header">Secondary Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
    <i-row>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="success">
                <template slot="header">Success Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="danger">
                <template slot="header">Danger Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
    <i-row>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="warning">
                <template slot="header">Warning Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
        <i-column lg="8" xl="6" class="_margin-bottom-1">
            <i-card variant="info">
                <template slot="header">Info Card</template>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </i-card>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-card variant="light">
    <template slot="header">Light Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card variant="dark">
    <template slot="header">Dark Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card variant="primary">
    <template slot="header">Primary Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card variant="secondary">
    <template slot="header">Secondary Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card variant="success">
    <template slot="header">Success Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card variant="danger">
    <template slot="header">Danger Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card variant="warning">
    <template slot="header">Warning Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~
~~~html
<i-card variant="info">
    <template slot="header">Info Card</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the card component as props, as well as available slots.

<i-code markup="i-card" title="Card API" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ICard">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the card component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the card component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>primary</code>, <code>secondary</code>, <code>light</code>, <code>dark</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></template>
                <template slot="default"><code>primary</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for card default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the card components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Card" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$card-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-font-weight</template>
                <template slot="default"><code>$font-weight-normal</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-padding-base</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-padding</template>
                <template slot="default"><code>size-map($card-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-variant-{variant}</template>
                <template slot="default"><code>card-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$card-variants</template>
<template slot="default-row">
                
~~~scss
(
    primary: $card-variant-primary,
    secondary: $card-variant-secondary,
    light: $card-variant-light,
    dark: $card-variant-dark,
    info: $card-variant-info,
    success: $card-variant-success,
    warning: $card-variant-warning,
    danger: $card-variant-danger
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">card-variant</template>
<template slot="default-row">
                
~~~scss
@function card-variant($variant) {
    $card-variant-color: variant-color-by-luminance($variant, $card-color-for-light-variant, $card-color-for-dark-variant);
    $card-variant-background: $variant;
    $card-variant-border-color: darken($variant, 10%);
    $card-variant-header-background: darken($variant, 5%);
    $card-variant-header-border-color: $card-variant-border-color;
    $card-variant-footer-background: $card-variant-header-background;
    $card-variant-footer-border-color: $card-variant-header-border-color;

    $variant-map: (
        background: $card-variant-background,
        color: $card-variant-color,
        border-color: $card-variant-border-color,
        header-background: $card-variant-header-background,
        header-border-color: $card-variant-header-border-color,
        footer-background: $card-variant-footer-background,
        footer-border-color: $card-variant-footer-border-color
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
