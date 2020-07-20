---
title: Tables
description: Documentation and examples for opt-in styling of tables with Inkline. 
---

# Tables
## Documentation and examples for opt-in styling of tables with Inkline. 

### Basic Table
Using the most basic table markup, here’s how tables look in Inkline. All table styles are inherited in Inkline, meaning any nested tables will be styled in the same manner as the parent.

<i-code title="Basic Table">
<i-tab type="preview">
    <i-table>
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Alex</td>
                <td>Grozav</td>
                <td>@alexgrozav</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>John</td>
                <td>Doe</td>
                <td>@johndoe</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Alice</td>
                <td>Cooper</td>
                <td>@alicecooper</td>
            </tr>
        </tbody>
    </i-table>
</i-tab>
<i-tab type="html">

~~~html
<i-table>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">#</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>Alice</td>
      <td>Doe</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
~~~

</i-tab>
</i-code>

<i-alert variant="info" class="_margin-top-1">
    <template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    <p>If your tables require more features such as sorting, filtering and rendering, you might want to take a look at the <nuxt-link :to="{ name: 'docs-components-datatable-introduction' }">Data Table</nuxt-link> component.</p>
</i-alert>


### Bordered Table
Add the `bordered` property for borders on all sides of the table and table cells.

<i-code title="Bordered Table">
<i-tab type="preview">

<i-table bordered>
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>

</i-tab>
<i-tab type="html">

~~~html
<i-table bordered>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">#</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>Alice</td>
      <td>Doe</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
~~~

</i-tab>
</i-code>

### Striped Table
Add the `striped` property to add zebra-striping to any table row within the table body.

<i-code title="Striped Table">
<i-tab type="preview">

<i-table striped>
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>

</i-tab>
<i-tab type="html">

~~~html
<i-table striped>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">#</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>Alice</td>
      <td>Doe</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
~~~

</i-tab>
</i-code>

### Hoverable Table
Add the `hover` property to enable a hover state on table rows within a `<tbody>`.

<i-code title="Hoverable Table">
<i-tab type="preview">
<i-table hover>
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>

</i-tab>
<i-tab type="html">

~~~html
<i-table hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">#</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>Alice</td>
      <td>Doe</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
~~~

</i-tab>
</i-code>

### Responsive Table
Enable responsiveness by adding the `responsive` property. Responsive tables scroll horizontally on small devices. When viewing on anything larger, you will not see any difference in these tables.

You can target specific responsive breakpoints by setting a value to the `responsive` property: `responsive="<breakpoint>"`, where breakpoint is one of `xs`, `sm`, `md`, `lg` or `xl`.

<i-code title="Responsive Table">
<i-tab type="preview">

<i-table responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
    </tr>
  </tbody>
</i-table>

</i-tab>
<i-tab type="html">

~~~html
<i-table responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
      <th>Table Heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
      <td>Table Cell</td>
    </tr>
  </tbody>
</i-table>
~~~

</i-tab>
</i-code>

### Variants
Tables can be themed using the `variant` property. You can use colors such as `light`, `dark`, `primary`, `secondary`, `info`, `success`, `warning`, and `danger`. You can set a variant for the table as a whole or individual table elements. By default, tables have the `light` variant. You can use a variation of any of the above classes to create the table design you need.

<i-code title="Table Variants">
<i-tab type="preview">

<i-table variant="light" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
<i-table variant="dark" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>

<i-table variant="primary" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
<i-table variant="secondary" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
<i-table variant="info" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
<i-table variant="success" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
<i-table variant="warning" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>
<i-table variant="danger" bordered striped hover class="_margin-bottom-1">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</i-table>

</i-tab>
<i-tab type="html">

~~~html
<i-table variant="light"> .. </i-table>
<i-table variant="dark"> .. </i-table>
<i-table variant="primary"> .. </i-table>
<i-table variant="secondary"> .. </i-table>
<i-table variant="info"> .. </i-table>
<i-table variant="success"> .. </i-table>
<i-table variant="warning"> .. </i-table>
<i-table variant="danger"> .. </i-table>
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the table components as props, as well as available slots.

<i-code api title="Table API" expanded markup="i-table">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">bordered</template>
                <template slot="description">Sets the table as bordered.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">hover</template>
                <template slot="description">Sets the table as hoverable.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">responsive</template>
                <template slot="description">Sets the table as responsive. When the table width reaches an overflow threshold, it will start scrolling horizontally.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">striped</template>
                <template slot="description">Sets the table as striped.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the table component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code>, <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="property">default</template>
                <template slot="description">Slot for table default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for the table components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code scss title="Table" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$table-margin-bottom</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-cell-padding</template>
                <template slot="default"><code>0.75rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-cell-padding-sm</template>
                <template slot="default"><code>0.3rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-border-color</template>
                <template slot="default"><code>$border-color</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-variant-{variant}</template>
                <template slot="default"><code>table-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$table-variants</template>
<template slot="default-row">
                
~~~scss
(
    primary: $table-variant-primary,
    secondary: $table-variant-secondary,
    light: $table-variant-light,
    dark: $table-variant-dark,
    info: $table-variant-info,
    success: $table-variant-success,
    warning: $table-variant-warning,
    danger: $table-variant-danger
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">table-variant</template>
<template slot="default-row">
                
~~~scss
@function table-variant($variant) {
    $table-variant-color: variant-color-by-luminance($variant, $table-color-for-light-variant, $table-color-for-dark-variant);
    $table-variant-background: $variant;
    $table-variant-background-hover: variant-color-by-luminance($variant, darken-lightness($variant, 10%), lighten-lightness($variant, 10%));
    $table-variant-background-striped: variant-color-by-luminance($variant, darken-lightness($variant, 5%), lighten-lightness($variant, 5%));
    $table-variant-border-color: darken($variant, 10%);

    $variant-map: (
        color: $table-variant-color,
        background: $table-variant-background,
        background-hover: $table-variant-background-hover,
        background-striped: $table-variant-background-striped,
        border-color: $table-variant-border-color,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>
