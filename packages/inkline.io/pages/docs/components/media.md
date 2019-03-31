# Media
Media objects provide you with a flexible component that can be easily nested and repeated, such as blog comments and tweets.{.lead}

### Example
Media objects are useful for repetitive components that have a media element positioned alongside them, such as an user image or blog post image.

<i-code-preview title="Media Example" link="https://github.com/inkline/inkline/tree/master/src/components/Media">

<i-media>
    <img slot="image" src="http://placehold.it/120x120" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>

<template slot="html">

~~~html
<i-media>
    <img slot="image" src="http://placehold.it/120x120" alt="Media Image" />
    <h3>Media Title</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et...
    </p>
</i-media>
~~~

</template>
</i-code-preview>

### Nesting
Media components can be nested inside one another to create a parent-child relationship between related components.

<i-code-preview title="Media Nesting" link="https://github.com/inkline/inkline/tree/master/src/components/Media">

<i-media>
    <img slot="image" src="http://placehold.it/120x120" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <i-media>
        <img slot="image" src="http://placehold.it/80x80" alt="Media Image" />
        <h3>Nested Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </i-media>
</i-media>

<template slot="html">

~~~html
<i-media>
    <img slot="image" src="http://placehold.it/120x120" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    
    <i-media>
        <img slot="image" src="http://placehold.it/80x80" alt="Media Image" />
        <h3>Nested Media Titlte</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </i-media>
</i-media>
~~~

</template>
</i-code-preview>

### Alignment
The media element in a media component can be aligned with flexbox helper classes to the top (default), middle, or end of the `.body` content.

<i-code-preview title="Media Alignment Start" link="https://github.com/inkline/inkline/tree/master/src/components/Media">

<i-media>
    <img class="_align-self-start" slot="image" src="http://placehold.it/60x60" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>

<template slot="html">

~~~html
<i-media>
    <img class="_align-self-start" slot="image" src="http://placehold.it/60x60" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>
~~~

</template>
</i-code-preview>

<i-code-preview title="Media Alignment Center" link="https://github.com/inkline/inkline/tree/master/src/components/Media">

<i-media>
    <img class="_align-self-center" slot="image" src="http://placehold.it/60x60" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>

<template slot="html">

~~~html
<i-media>
    <img class="_align-self-center" slot="image" src="http://placehold.it/60x60" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>
~~~

</template>
</i-code-preview>

<i-code-preview title="Media Alignment End" link="https://github.com/inkline/inkline/tree/master/src/components/Media">

<i-media>
    <img class="_align-self-end" slot="image" src="http://placehold.it/60x60" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>

<template slot="html">

~~~html
<i-media>
    <img class="_align-self-end" slot="image" src="http://placehold.it/60x60" alt="Media Image" />
    <h3>Media Titlte</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</i-media>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Media API" default-active="slots" markup="i-media" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Media">
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
                    <td>Slot for media default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>