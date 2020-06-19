---
title: Media
description: Media objects provide you with a flexible component that can be easily nested and repeated, such as blog comments and tweets.
---

# Media
## Media objects provide you with a flexible component that can be easily nested and repeated, such as blog comments and tweets.

### Example
Media objects are useful for repetitive components that have a media element positioned alongside them, such as an user image or blog post image.

<i-code title="Media Example">
<i-tab type="preview">
    <i-media>
        <img slot="image" src="/images/placeholder-100x100.jpg" alt="Media Image" />
        <h3>Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </i-media>
</i-tab>
<i-tab type="html">

~~~html
<i-media>
    <img slot="image" src=".." alt="Media Image" />
    <h3>Media Title</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et...
    </p>
</i-media>
~~~

</i-tab>
</i-code>

### Nesting
Media components can be nested inside one another to create a parent-child relationship between related components.

<i-code title="Media Nesting">
<i-tab type="preview">
    <i-media>
        <img slot="image" src="/images/placeholder-100x100.jpg" alt="Media Image" />
        <h3>Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <i-media>
            <img slot="image" src="/images/placeholder-100x100.jpg" height="60" width="60" alt="Media Image" />
            <h3>Nested Media Titlte</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </i-media>
    </i-media>
</i-tab>
<i-tab type="html">

~~~html
<i-media>
    <img slot="image" src=".." alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    
    <i-media>
        <img slot="image" src=".." alt="Media Image" />
        <h3>Nested Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </i-media>
</i-media>
~~~

</i-tab>
</i-code>

### Alignment
The media element in a media component can be aligned with flexbox helper classes to the top (default), middle, or end of the `.body` content.

<i-code title="Media Alignment Start">
<i-tab type="preview">
    <i-media>
        <img class="_align-self-start" slot="image" height="80" width="80" src="/images/placeholder-100x100.jpg" alt="Media Image" />
        <h3>Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </i-media>
</i-tab>
<i-tab type="html">

~~~html
<i-media>
    <img class="_align-self-start" slot="image" src=".." alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>
~~~

</i-tab>
</i-code>

<i-code title="Media Alignment Center">
<i-tab type="preview">
    <i-media>
        <img class="_align-self-center" slot="image" height="80" width="80" src="/images/placeholder-100x100.jpg" alt="Media Image" />
        <h3>Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </i-media>
</i-tab>
<i-tab type="html">

~~~html
<i-media>
    <img class="_align-self-center" slot="image" src=".." alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>
~~~

</i-tab>
</i-code>

<i-code title="Media Alignment End">
<i-tab type="preview">
    <i-media>
        <img class="_align-self-end" slot="image" height="80" width="80" src="/images/placeholder-100x100.jpg" alt="Media Image" />
        <h3>Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </i-media>
</i-tab>
<i-tab type="html">

~~~html
<i-media>
    <img class="_align-self-end" slot="image" src=".." alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>
~~~

</i-tab>
</i-code>


### Component API
Here you can find the slot options for the media component.

<i-code title="Media API" default-active="slots" markup="i-media" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IMedia">
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for media default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the media components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Media" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$media-image-margin-right</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
