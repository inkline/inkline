---
title: Sass Variables
description: Make Inkline your own using hundreds of configurable Sass variables. 
---

# Sass Variables
## Make Inkline your own using hundreds of configurable Sass variables. 

This page lists the common Sass Variables that are used throughout the framework. Each component has its own specific Sass variables documented.

<i-alert variant="info">
    <template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    <p>To be able to override the Sass variables, please follow the Customization part of your <nuxt-link :to="{ name: 'docs-introduction-getting-started' }">installation</nuxt-link>.</p>
</i-alert>

### Core

<i-code scss title="Core" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$body-background</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$body-color</template>
                <template slot="default"><code>$color-gray-80</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$body-background-light</template>
                <template slot="default"><code>$body-background</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$body-color-light</template>
                <template slot="default"><code>$body-color</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$body-background-dark</template>
                <template slot="default"><code>$color-gray-90</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$body-color-dark</template>
                <template slot="default"><code>$color-gray-10</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$body-variants</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Border

<i-code scss title="Border" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$border-width</template>
                <template slot="default"><code>1px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-color</template>
                <template slot="default"><code>$color-gray-20</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-color-light</template>
                <template slot="default"><code>$border-color</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-color-dark</template>
                <template slot="default"><code>$color-gray-70</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius-enabled</template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius-base</template>
                <template slot="default"><code>0.25rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius-xs</template>
                <template slot="default"><code>$border-radius-base * $size-multiplier-xs</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius-sm</template>
                <template slot="default"><code>$border-radius-base * $size-multiplier-sm</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius-md</template>
                <template slot="default"><code>$border-radius-base * $size-multiplier-md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius-lg</template>
                <template slot="default"><code>$border-radius-base * $size-multiplier-lg</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius-xl</template>
                <template slot="default"><code>$border-radius-base * $size-multiplier-xl</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$border-radius</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Breakpoints

<i-code scss title="Breakpoints" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$breakpoints-xs</template>
                <template slot="default"><code>0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breakpoints-sm</template>
                <template slot="default"><code>576px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breakpoints-md</template>
                <template slot="default"><code>768px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breakpoints-lg</template>
                <template slot="default"><code>992px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breakpoints-xl</template>
                <template slot="default"><code>1200px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breakpoints</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Colors

<i-code scss title="Colors" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$color-red</template>
                <template slot="default"><code>#f25f5c</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-orange</template>
                <template slot="default"><code>#f1ac53</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-yellow</template>
                <template slot="default"><code>#ffe066</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-green</template>
                <template slot="default"><code>#5fb072</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-teal</template>
                <template slot="default"><code>#62bec1</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-blue</template>
                <template slot="default"><code>#178bb2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-purple</template>
                <template slot="default"><code>#5d65b9</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-pink</template>
                <template slot="default"><code>#ff6f80</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-group-basic</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-transparent</template>
                <template slot="default"><code>transparent</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-white</template>
                <template slot="default"><code>#ffffff</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-10</template>
                <template slot="default"><code>#f8f9fa</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-20</template>
                <template slot="default"><code>#e9ecef</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-30</template>
                <template slot="default"><code>#dee2e6</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-40</template>
                <template slot="default"><code>#ced4da</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-50</template>
                <template slot="default"><code>#adb5bd</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-60</template>
                <template slot="default"><code>#868e96</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-70</template>
                <template slot="default"><code>#495057</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-80</template>
                <template slot="default"><code>#343a40</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-gray-90</template>
                <template slot="default"><code>#202229</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-black</template>
                <template slot="default"><code>#000000</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-group-neutral</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-primary</template>
                <template slot="default"><code>$color-blue</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-secondary</template>
                <template slot="default"><code>$color-purple</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-group-brand</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-light</template>
                <template slot="default"><code>$color-gray-20</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-dark</template>
                <template slot="default"><code>$color-gray-80</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-group-monochrome</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-group-monochrome-white</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-success</template>
                <template slot="default"><code>$color-green</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-danger</template>
                <template slot="default"><code>$color-red</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-warning</template>
                <template slot="default"><code>$color-orange</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-info</template>
                <template slot="default"><code>$color-teal</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-group-state</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-facebook</template>
                <template slot="default"><code>#3b5998</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-twitter</template>
                <template slot="default"><code>#1da1f2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-google</template>
                <template slot="default"><code>#dd4b39</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-instagram</template>
                <template slot="default"><code>#fd1d1d</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-dribbble</template>
                <template slot="default"><code>#ea4c89</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-behance</template>
                <template slot="default"><code>#1769ff</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-flickr</template>
                <template slot="default"><code>#ff0084</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-linkedin</template>
                <template slot="default"><code>#0077b5</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-youtube</template>
                <template slot="default"><code>#b31217</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-pinterest</template>
                <template slot="default"><code>#bd081c</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-github</template>
                <template slot="default"><code>#333333</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-tumblr</template>
                <template slot="default"><code>#35465c</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-twitch</template>
                <template slot="default"><code>#6441a5</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-envato</template>
                <template slot="default"><code>#82b541</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-vine</template>
                <template slot="default"><code>#00bf8f</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-group-social</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$variant-color-light <small class="_text-muted">(deprecated)</small></template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$variant-color-dark <small class="_text-muted">(deprecated)</small></template>
                <template slot="default"><code>$color-gray-80</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-for-light-variant</template>
                <template slot="default"><code>$variant-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$color-for-light-variant</template>
                <template slot="default"><code>$variant-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$colors</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Gutter

<i-code scss title="Gutter" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$gutter-xs</template>
                <template slot="default"><code>24px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$gutter-sm</template>
                <template slot="default"><code>26px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$gutter-md</template>
                <template slot="default"><code>28px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$gutter-lg</template>
                <template slot="default"><code>30px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$gutter-xl</template>
                <template slot="default"><code>32px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$gutter</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Print

<i-code scss title="Print" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$print</template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Ratios

<i-code scss title="Ratio" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$ratio-second</template>
                <template slot="default"><code>1.067</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio-major-second</template>
                <template slot="default"><code>1.125</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio-minor-third</template>
                <template slot="default"><code>1.2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio-major-third</template>
                <template slot="default"><code>1.25</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio-perfect-fourth</template>
                <template slot="default"><code>1.333</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio-augmented-fourth</template>
                <template slot="default"><code>1.414</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio-perfect-fifth</template>
                <template slot="default"><code>1.5</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio-golden</template>
                <template slot="default"><code>1.618</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$ratio</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$scale-ratio</template>
                <template slot="default"><code>$ratio-minor-third</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$scale-ratio-secondary</template>
                <template slot="default"><code>$ratio-perfect-fourth</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Shadow

<i-code scss title="Shadow" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$box-shadow-enabled</template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$box-shadow</template>
                <template slot="default"><code>0 1rem 1rem -1rem rgba(0, 0, 0, 1)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Sizes

<i-code scss title="Sizes" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$size-percentages</template>
                <template slot="default"><code>('25': 25%, '50': 50%, '75': 75%, '100': 100%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sizes</template>
                <template slot="default"><code>('sm', 'md', 'lg')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$size-multiplier-xs</template>
                <template slot="default"><code>0.6</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$size-multiplier-sm</template>
                <template slot="default"><code>0.8</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$size-multiplier-md</template>
                <template slot="default"><code>1</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$size-multiplier-lg</template>
                <template slot="default"><code>1.2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$size-multiplier-xl</template>
                <template slot="default"><code>1.4</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$size-multipliers</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Spacing

<i-code scss title="Spacing" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$spacer</template>
                <template slot="default"><code>1rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-1-2</template>
                <template slot="default"><code>$spacer * 1 / 2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-1-3</template>
                <template slot="default"><code>$spacer * 1 / 3</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-2-3</template>
                <template slot="default"><code>$spacer * 2 / 3</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-1-4</template>
                <template slot="default"><code>$spacer * 1 / 4</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-3-4</template>
                <template slot="default"><code>$spacer * 3 / 4</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-0</template>
                <template slot="default"><code>$spacer * 0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-1</template>
                <template slot="default"><code>$spacer * 1</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-2</template>
                <template slot="default"><code>$spacer * 2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-3</template>
                <template slot="default"><code>$spacer * 3</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-4</template>
                <template slot="default"><code>$spacer * 4</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-5</template>
                <template slot="default"><code>$spacer * 5</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-6</template>
                <template slot="default"><code>$spacer * 6</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-7</template>
                <template slot="default"><code>$spacer * 7</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacer-8</template>
                <template slot="default"><code>$spacer * 8</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$spacers</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Transitions

<i-code scss title="Transitions" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$transition-enabled</template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$transition-duration</template>
                <template slot="default"><code>210ms</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$transition-easing</template>
                <template slot="default"><code>ease</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Z-index

<i-code scss title="Z-index" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$z-index-dropdown</template>
                <template slot="default"><code>1000</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$z-index-sticky</template>
                <template slot="default"><code>1020</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$z-index-fixed</template>
                <template slot="default"><code>1030</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$z-index-modal-backdrop</template>
                <template slot="default"><code>1040</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$z-index-modal</template>
                <template slot="default"><code>1050</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$z-index-popover</template>
                <template slot="default"><code>1060</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$z-index-tooltip</template>
                <template slot="default"><code>1070</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>
