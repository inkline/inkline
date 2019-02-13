# Cards
Cards provide you with a flexible and extensible content container with multiple color variants and options.{.lead}

A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, 
contextual background colors, and powerful display options. 

### Example
Cards are customizable content holders built with as little markup and styles as possible. 
They are based on flexbox, offering easy alignment and mixing well with other components. 

By default, cards are set to have `width: 100%`, fully spanning the width of the parent container. 

<i-code-preview title="Card Example" link="https://github.com/inkline/inkline/tree/master/src/components/Card">

<i-row>
    <i-column md="6">
        <i-card>
            <img slot="image" src="http://placehold.it/400x200" alt="Card Image" />
            <h4 class="title">Card Title</h4>
            <p class="subtitle">Card Subtitle</p>
            <p>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <a class="link" href="http://inkline.io">Example Link</a>
        </i-card>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-card>
    <img slot="image" src="image.jpg" alt="Card Image" />
    <h4 class="title">Card Title</h4>
    <p class="subtitle">Card Subtitle</p>
    <p>
        Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <a class="link" href="http://inkline.io">Example Link</a>
</i-card>
~~~

</template>
</i-code-preview>

### Body
The building block of a card is the card body. All the content placed in the default component slot will be placed inside the body.

<i-code-preview title="Card Body" link="https://github.com/inkline/inkline/tree/master/src/components/Card">

<i-row>
    <i-column md="6">
        <i-card>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-card>
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~

</template>
</i-code-preview>

### Header and Footer
Optionally, you can provide a header or a footer for your cards.

<i-code-preview title="Card Header and Footer" link="https://github.com/inkline/inkline/tree/master/src/components/Card">

<i-row>
    <i-column md="6">
        <i-card>
            <template slot="header">Card Header</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
            <template slot="footer">Card Footer</template>
        </i-card>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-card>
    <template slot="header">Card Header</template>
    Some quick example text to build on the card title and make up the bulk of the card's content.
    <template slot="footer">Card Footer</template>
</i-card>
~~~

</template>
</i-code-preview>

### Card Images
You can provide an image at the top of the card, using the `image` slot.

<i-code-preview title="Card Image" link="https://github.com/inkline/inkline/tree/master/src/components/Card">

<i-row>
    <i-column md="6">
        <i-card>
            <img slot="image" src="http://placehold.it/400x200" alt="Card Image" />
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-card>
    <img slot="image" src="image.jpg" alt="Card Image" />
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~

</template>
</i-code-preview>

### Background Image
You can provide an image at the top of the card, using the `image` slot.

<i-code-preview title="Card Background Image" link="https://github.com/inkline/inkline/tree/master/src/components/Card">

<i-row>
    <i-column md="6">
        <i-card>
            <img slot="image" src="http://placehold.it/400x200" alt="Card Image" />
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-card>
    <img slot="image" src="image.jpg" alt="Card Image" />
    Some quick example text to build on the card title and make up the bulk of the card's content.
</i-card>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the text and spacing size of your cards, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Card Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Card">

<i-row>
    <i-column md="6">
        <i-card size="sm">
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
    <i-column md="6">
        <i-card size="md">
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
    <i-column md="6">
        <i-card size="lg">
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<template slot="html">

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

</template>
</i-code-preview>

### Variants
Inkline includes several predefined card styles that you can use within your application. You can apply a style using the `variant` property.

<i-code-preview title="Card Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Card">

<i-row class="_margin-bottom-1">
    <i-column md="6">
        <i-card variant="light">
            <template slot="header">Light Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
    <i-column md="6">
        <i-card variant="dark">
            <template slot="header">Dark Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<i-row class="_margin-bottom-1">
    <i-column md="6">
        <i-card variant="primary">
            <template slot="header">Primary Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
    <i-column md="6">
        <i-card variant="secondary">
            <template slot="header">Secondary Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<i-row class="_margin-bottom-1">
    <i-column md="6">
        <i-card variant="success">
            <template slot="header">Success Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
    <i-column md="6">
        <i-card variant="danger">
            <template slot="header">Danger Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<i-row>
    <i-column md="6">
        <i-card variant="warning">
            <template slot="header">Warning Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
    <i-column md="6">
        <i-card variant="info">
            <template slot="header">Info Card</template>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
    </i-column>
</i-row>

<template slot="html">

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

</template>
</i-code-preview>


### API

<i-api-preview markup="i-card" title="Card API" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Card">
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the card component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the card component.</td>
                    <td><code>String</code></td>
                    <td><code>primary</code>, <code>secondary</code>, <code>light</code>, <code>dark</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></td>
                    <td><code>primary</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for card default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
