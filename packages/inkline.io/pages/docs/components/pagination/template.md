# Pagination
Pagination provides navigation for large series of related content.{.lead}

### Example
Pagination items are automatically generated based on the total item count `items` and how many items will be displayed on the page, configured using `items-per-page`, with the default value being `20`. The currently selected page is kept synchronised using `v-model`.

<i-code-preview title="Pagination Example" link="https://github.com/inkline/inkline/tree/master/src/components/Pagination">

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

<i-code-preview title="Pagination Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Pagination">

<i-pagination v-model="currentPageLight" variant="light" :items="100" :items-per-page="10"></i-pagination>

<i-pagination v-model="currentPageDark" variant="dark" :items="100" :items-per-page="10"></i-pagination>

<template slot="html">

~~~html
<i-pagination v-model="currentPage" variant="light" :items="100" :items-per-page="10"></i-pagination>

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

<i-code-preview title="Pagination Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Pagination">

<div>
<i-pagination v-model="currentPageSm" size="sm" :items="100" :items-per-page="10"></i-pagination>

<i-pagination v-model="currentPageMd" size="md" :items="100" :items-per-page="10"></i-pagination>

<i-pagination v-model="currentPageLg" size="lg" :items="100" :items-per-page="10"></i-pagination>
</div>

<template slot="html">

~~~html
<i-pagination v-model="currentPage" size="sm" :items="100" :items-per-page="10"></i-pagination>

<i-pagination v-model="currentPage" size="md" :items="100" :items-per-page="10"></i-pagination>

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


### API

<i-api-preview title="Pagination API" markup="i-pagination" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Pagination">
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
                    <td>items</td>
                    <td>Sets the total number of items to paginate.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td><code>0</code></td>
                </tr>
                <tr>
                    <td>itemsPerPage</td>
                    <td>Sets the number of items per pagination entry.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td><code>20</code></td>
                </tr>
                <tr>
                    <td>limit</td>
                    <td>Sets the maximum number of pagination elements to display at a time.</td>
                    <td><code>Number</code></td>
                    <td>n % 2 === 1</td>
                    <td><code>5</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the pagination component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the currently selected pagination entry.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td><code>1</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the pagination component.</td>
                    <td><code>String</code></td>
                    <td><code>light</code>, <code>dark</code></td>
                    <td><code>light</code></td>
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
                    <td>Slot for pagination component default content.</td>
                </tr>
                <tr>
                    <td>next</td>
                    <td>Slot for pagination component next button content.</td>
                </tr>
                <tr>
                    <td>previous</td>
                    <td>Slot for pagination component previous button content.</td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="events">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>change</td>
                    <td>Emitted when active item changes.</td>
                    <td><code>(item: Number) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when active item changes. Used together with <code>v-model</code>.</td>
                    <td><code>(item: Number) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
