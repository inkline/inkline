# Data Table API
The Data Table has a very intuitive and comprehensive component API for all your customization needs. {.lead}

### Configuring i18n
You can provide an object with already translated internationalization strings using the `i18n` property. 

The strings contain interpolated values under the form of `{value}`.

~~~js
export default {
    ...
    data() {
        return {
            i18n: {
                pagination: {
                    rowsPerPage: 'Show {rowsPerPage} entries',
                    rowsRange: 'Showing {rowsFrom} to {rowsTo} of {rowsCount} entries'
                },
                filtering: {
                    inputPlaceholder: 'Search',
                    noResultsFound: 'No matching records found',
                }
            }
        };
    }
}       
~~~

~~~html
<i-datatable :columns="columns" :rows="rows" :i18n="i18n" />
~~~

### API

<i-api-preview title="Data Table API" markup="i-datatable" expanded>
    <template slot="props">
        <i-table bordered responsive>
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
                    <td>async</td>
                    <td>Sets the pagination and filtering to be handled asynchronously.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>columns</td>
                    <td>An array of column definition objects. See the <nuxt-link :to="{ name: 'docs-components-dashboard-datatable-introduction' }">DataTable Introduction</nuxt-link> page.</td>
                    <td><code>Array&lt;Object&gt;</code></td>
                    <td></td>
                    <td><code>[]</code></td>
                </tr>
                <tr>
                    <td>countColumn</td>
                    <td>Column definition override for the count column. You can set the value tp `false` to disable the count column.</td>
                    <td><code>Object</code>, <code>Boolean</code></td>
                    <td></td>
                    <td><code>{...}</code></td>
                </tr>
                <tr>
                    <td>expandColumn</td>
                    <td>Column definition override for the expand column. You can set the value tp `false` to disable the expand column.</td>
                    <td><code>Object</code>, <code>Boolean</code></td>
                    <td></td>
                    <td><code>{...}</code></td>
                </tr>
                <tr>
                    <td>rows</td>
                    <td>An array of row definition objects. See the <nuxt-link :to="{ name: 'docs-components-dashboard-datatable-introduction' }">DataTable Introduction</nuxt-link> page.</td>
                    <td><code>Array&lt;Object&gt;</code></td>
                    <td></td>
                    <td><code>[]</code></td>
                </tr>
                <tr>
                    <td>rowsCount</td>
                    <td>Sets the number of rows to be displayed when <code>async</code> is enabled.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td><code>null</code></td>
                </tr>
                <tr>
                    <td>defaultSortKey</td>
                    <td>Sets the key to use for sorting by default. The `#` refers to the count column.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>#</code></td>
                </tr>
                <tr>
                    <td>filtering</td>
                    <td>Used to enable, disable and configure filtering. See the <nuxt-link :to="{ name: 'docs-components-dashboard-datatable-filtering' }">DataTable Filtering</nuxt-link> page.</td>
                    <td><code>Boolean</code>, <code>Object</code></td>
                    <td><code>true</code>, <code>false</code>, <code>Object</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>pagination</td>
                    <td>Used to enable, disable and configure pagination. See the <nuxt-link :to="{ name: 'docs-components-dashboard-datatable-pagination' }">DataTable Pagination</nuxt-link> page.</td>
                    <td><code>Boolean</code>, <code>Object</code></td>
                    <td><code>true</code>, <code>false</code>, <code>Object</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>footer</td>
                    <td>Used to enable or disable the table footer.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>singleExpand</td>
                    <td>Used to determine whether to set row expansion in accordion mode (having only one item active at a time). To be used together with the <code>expand</code> slot.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>i18n</td>
                    <td>Provide an object with already translated strings.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td><code>{...}</code></td>
                </tr>
                <tr>
                    <td>bordered</td>
                    <td>Sets the table as bordered.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>hover</td>
                    <td>Sets the table as hoverable.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>responsive</td>
                    <td>Sets the table as responsive. When the table width reaches an overflow threshold, it will start scrolling horizontally.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>striped</td>
                    <td>Sets the table as striped.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the table component.</td>
                    <td><code>String</code></td>
                    <td><code>light</code>, <code>dark</code>, <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></td>
                    <td><code>light</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="events">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>update</td>
                    <td>Emitted when pagination or filtering changes.</td>
                    <td><code>({ page: Number, rowsPerPage: Number, filter: String }) => {}</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="slots">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>header</td>
                    <td>Slot for table header. Used for replacing table <code>&lt;th&gt;</code> elements.</td>
                </tr>
                <tr>
                    <td>row</td>
                    <td>Slot for table row. Used for replacing table <code>&lt;td&gt;</code> elements for each row.</td>
                </tr>
                <tr>
                    <td>footer</td>
                    <td>Slot for table footer. Used for replacing table <code>&lt;th&gt;</code> elements.</td>
                </tr>
                <tr>
                    <td>expand</td>
                    <td>Slot for row expansion.</td>
                </tr>
                <tr>
                    <td>filtering-no-results</td>
                    <td>Slot for replacing filtering message when there are no results.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>
