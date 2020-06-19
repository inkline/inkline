---
title: Images
description: Documentation and examples for images, using lightweight styles and modifier classes. 
---

# Images
## Documentation and examples for images, using lightweight styles and modifier classes. 

### Responsive Images
Images in Inkline need to have the `.image` class applied and are made responsive using the `.-responsive` modifier. 

To achieve that, we apply `max-width: 100%;` and `height: auto;` to the image so that it scales with the parent element, without surpassing the image's maximum native width.

<i-code title="Responsive Images">
<i-tab type="preview">

<img src="/images/placeholder-1000x400.jpg" width="1000" height="400" class="image -responsive" alt="Responsive image" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/css/core/images">

</i-tab>
<i-tab type="html">

~~~html
<img src="..." width="1000" height="400" class="image -responsive" alt="Responsive image">
~~~

</i-tab>
</i-code>

#### SVG Images and IE 10
In Internet Explorer 10, SVG images with `.image.-responsive` are disproportionately sized. To fix this, Inkline adds `width: 100% \9;` where necessary. 

This fix improperly sizes other image formats, so we don’t apply it automatically unless the extension ends with `.svg`.

### Fluid Images
Images in Inkline can be made fluid using the `.-fluid` modifier. To achieve that, we apply `width: 100%;` and `height: auto;` to the image so that it scales with the parent element.

<i-code title="Fluid Images">
<i-tab type="preview">

<img src="/images/placeholder-1000x400.jpg" width="1000" height="400" class="image -fluid" alt="Fluid image">

</i-tab>
<i-tab type="html">

~~~html
<img src="..." width="1000" height="400" class="image -fluid" alt="Fluid image">
~~~

</i-tab>
</i-code>

### Image Thumbnails
You can use the `.-thumbnail` modifier to give an image a rounded 1px border appearance.

<i-code title="Image Thumbnails">
<i-tab type="preview">

<img src="/images/placeholder-400x400.jpg" width="200" height="200" class="image -thumbnail" alt="Thumbnail">

</i-tab>
<i-tab type="html">

~~~html
<img src="..." class="image -thumbnail" alt="Thumbnail">
~~~

</i-tab>
</i-code>

### Polaroid
Besides thumbnails, you can opt for a retro look having a larger bottom border using the `.-polaroid` modifier.

<i-code title="Polaroid Image">
<i-tab type="preview">
    <img src="/images/placeholder-400x400.jpg" width="200" height="200" class="image -polaroid" alt="Polaroid">
</i-tab>
<i-tab type="html">

~~~html
<img src="..." class="image -polaroid" alt="Polaroid">
~~~

</i-tab>
</i-code>

### Image Alignment
Align images with the helper classes or text alignment classes. Block-level images can be centered using the `._margin-x-auto` 
margin utility class.

<i-code title="Image Alignment - Float Left">
<i-tab type="preview">
    <div class="_clearfix">
        <img src="/images/placeholder-400x400.jpg" width="120" height="120" class="image _float-left _padding-right-1 _padding-bottom-1" alt="Left floating image">
        Inkline is making this image float on the left side of the text. Inkline provides you with useful helper classes for positioning page elements such as images. The text will flow to the right and underneath this image, something you will find useful when adding left or right aligned images to a blog article. It is common to also add a right and bottom padding to the image. 
    </div>
</i-tab>
<i-tab type="html">

~~~html
<img src="..." class="image _float-left" alt="Left floating image">
~~~

</i-tab>
</i-code>


<i-code title="Image Alignment - Float Right">
<i-tab type="preview">
    <div class="_clearfix">
        <img src="/images/placeholder-400x400.jpg" width="120" height="120" class="image _float-right _padding-left-1 _padding-bottom-1" alt="Left floating image">
        Inkline is making this image float on the right side of the text. Inkline provides you with useful helper classes for positioning page elements such as images. The text will flow to the left and underneath this image, something you will find useful when adding left or right aligned images to a blog article. It is common to also add a left and bottom padding to the image. 
    </div>
</i-tab>
<i-tab type="html">

~~~html
<img src="..." class="image _float-right" alt="Right floating image">
~~~

</i-tab>
</i-code>


<i-code title="Image Alignment - Text Center">
<i-tab type="preview">
    <div class="_text-center">
        <img src="/images/placeholder-400x400.jpg" width="200" height="200" alt="Centered image">
    </div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_text-center">
    <img src="..." alt="Centered image">
</div>
~~~

</i-tab>
</i-code>

<i-code title="Image Alignment - Margin Auto">
<i-tab type="preview">
    <img src="/images/placeholder-400x400.jpg" width="200" height="200" class="_display-block _margin-x-auto" alt="Centered image">
</i-tab>
<i-tab type="html">

~~~html
<img src="..." class="_display-block _margin-x-auto" alt="Centered image">
~~~

</i-tab>
</i-code>

### Picture
If you are using the `<picture>` element to specify multiple `<source>` elements for a specific `<img>`, make sure to add 
the `.image` classes to the `<img>` and not to the `<picture>` tag.

<i-code title="Picture">
<i-tab type="html">

~~~html
​<picture>
    <source srcset="..." type="image/svg+xml">
    <img src="..." class="image -fluid -thumbnail" alt="...">
</picture>
~~~

</i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for images. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code scss title="Images" expanded :header="false">
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$thumbnail-padding</template>
                <template slot="default"><code>$spacer / 2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$thumbnail-background</template>
                <template slot="default"><code>$body-background</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$thumbnail-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$thumbnail-border-color</template>
                <template slot="default"><code>$color-gray-40</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$thumbnail-border-radius</template>
                <template slot="default"><code>$border-radius-md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$thumbnail-box-shadow</template>
                <template slot="default"><code>0 1px 2px rgba($color-black, 0.075)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$thumbnail-transition</template>
                <template slot="default"><code>all 0.2s ease-in-out</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$polaroid-padding</template>
                <template slot="default"><code>$spacer * 3</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$figure-caption-font-size</template>
                <template slot="default"><code>90%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$figure-caption-color</template>
                <template slot="default"><code>$color-gray-60</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$figure-image-margin-bottom</template>
                <template slot="default"><code>$spacer / 2</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>
