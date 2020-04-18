# Pagination
## Pagination provides navigation for large series of related content.{.lead}

### Example
Pagination items are automatically generated based on the total item count `items` and how many items will be displayed on the page, configured using `items-per-page`, with the default value being `20`. The currently selected page is kept synchronised using `v-model`.

<i-code-preview title="Pagination Example">
<i-pagination v-model="currentPage" :items="300" :items-per-page="20"></i-pagination>
<template slot="html">

~~~html
<i-pagination v-model="currentPage" :items="300" :items-per-page="20"></i-pagination>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      currentPage: 1
    };
  }
}
~~~

</template>
</i-code-preview>


### Variants
Inkline includes two predefined pagination styles. You can set the style of a `<i-pagination>` using the `variant` property, which can have a value of `light` or `dark`. By default, pagination uses the `light` variant.

<i-code-preview title="Pagination Variants">
<i-pagination v-model="currentPageLight" variant="light" :items="100" :items-per-page="10" class="_margin-bottom-1"></i-pagination>
<i-pagination v-model="currentPageDark" variant="dark" :items="100" :items-per-page="10"></i-pagination>
<template slot="html">

~~~html
<i-pagination v-model="currentPage" variant="light" :items="100" :items-per-page="10"></i-pagination>
~~~
~~~html
<i-pagination v-model="currentPage" variant="dark" :items="100" :items-per-page="10"></i-pagination>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      currentPage: 1
    };
  }
}
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your pagination items, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="Pagination Sizes">
<div>
<i-pagination v-model="currentPageSm" size="sm" :items="100" :items-per-page="10" class="_margin-bottom-1"></i-pagination>
<i-pagination v-model="currentPageMd" size="md" :items="100" :items-per-page="10" class="_margin-bottom-1"></i-pagination>
<i-pagination v-model="currentPageLg" size="lg" :items="100" :items-per-page="10"></i-pagination>
</div>
<template slot="html">

~~~html
<i-pagination v-model="currentPage" size="sm" :items="100" :items-per-page="10"></i-pagination>
~~~
~~~html
<i-pagination v-model="currentPage" size="md" :items="100" :items-per-page="10"></i-pagination>
~~~
~~~html
<i-pagination v-model="currentPage" size="lg" :items="100" :items-per-page="10"></i-pagination>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      currentPage: 1
    };
  }
}
~~~

</template>
</i-code-preview>

### Limit
You're able to use the `limit` modifier to control how many items to show besides the first and last items, including the two ellipsis pagination items. 

Make sure this value is an `odd number` for best results.

<i-code-preview title="Pagination Limit">
<div>
<i-pagination v-model="currentPagePageLimit" :limit="3" :items="100" :items-per-page="10"></i-pagination>
</div>
<template slot="html">

~~~html
<i-pagination v-model="currentPage" :limit="3" :items="100" :items-per-page="10"></i-pagination>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      currentPage: 1
    };
  }
}
~~~

</template>
</i-code-preview>

To make things even better, you can responsively control the number of items at each breakpoint, to make sure your design always looks great.

<i-code-preview title="Pagination Responsive Limit">
<div>
<i-pagination v-model="currentPagePageLimitResponsive" :limit="pageLimit" :items="100" :items-per-page="10"></i-pagination>
</div>
<template slot="html">

~~~html
<i-pagination v-model="currentPage" :limit="pageLimit" :items="100" :items-per-page="10"></i-pagination>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      currentPage: 1,
      pageLimit: {
          xs: 3,
          sm: 5,
          md: 7
      }
    };
  }
}
~~~

</template>
</i-code-preview>


### Quick Links
You're able to use the `quickLink` modifier to allow the user to click the `…` item to quickly jump through pages, a number of items equal to `limit` at a time. 

<i-code-preview title="Pagination Quick Link">
<div>
<i-pagination v-model="currentPageQuickLink" quick-link :items="100" :items-per-page="10"></i-pagination>
</div>
<template slot="html">

~~~html
<i-pagination v-model="currentPage" quick-link :items="100" :items-per-page="10"></i-pagination>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      currentPage: 1
    };
  }
}
~~~

</template>
</i-code-preview>


### Component API
Here you can find a list of the various customization options you can use for the pagination component as props, as well as available slots and events.

<i-api-preview title="Pagination API" markup="i-pagination" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Pagination">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">items</template>
                <template slot="description">Sets the total number of items to paginate.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">items-per-page</template>
                <template slot="description">Sets the number of items per pagination entry.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>20</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">limit</template>
                <template slot="description">Sets the maximum number of pagination elements to display at a time.</template>
                <template slot="type"><code>Number</code>, <code>Object</code></template>
                <template slot="values"><code>n % 2 === 1</code></template>
                <template slot="default"><code>{ xs: 3, sm: 5 }</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">quick-link</template>
                <template slot="description">Enables pagination quick links.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the pagination component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the currently selected pagination entry.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>1</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the pagination component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for pagination component default content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">next</template>
                <template slot="description">Slot for pagination component next button content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">previous</template>
                <template slot="description">Slot for pagination component previous button content.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when active item changes.</template>
                <template slot="type"><code>(item: Number) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when active item changes. Used together with <code>v-model</code>.</template>
                <template slot="type"><code>(item: Number) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

### Sass Variables
Here you can find a list of the Sass variables you can use for the pagination components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-introduction-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Pagination" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$pagination-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-disabled-color</template>
                <template slot="default"><code>$text-muted</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-padding-base</template>
                <template slot="default"><code>$spacer-1-2 $spacer-1-3</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-padding</template>
                <template slot="default"><code>size-map($pagination-item-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-min-width-base</template>
                <template slot="default"><code>40px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-min-width</template>
                <template slot="default"><code>size-map($pagination-item-min-width-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-spacing</template>
                <template slot="default"><code>0.25rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-background-active</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-item-color-active</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-variants</template>
                <template slot="default"><code>('monochrome')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-variant-color-light</template>
                <template slot="default"><code>$variant-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$pagination-variant-color-dark</template>
                <template slot="default"><code>$variant-color-dark</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview> 
