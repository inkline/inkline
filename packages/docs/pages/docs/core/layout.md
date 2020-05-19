# Layout
## Build basic layouts using Inkline's built-in layout components. { .lead }

The layout components are used for scaffolding the basic structure of the page:
- `<i-layout>` is the main layout wrapper in which `i-layout-header`, `i-layout-aside`, `i-layout-content`, `i-layout-footer`, or `i-layout` itself can be nested, and can be placed in any parent container.
- `<i-layout-header>` is the header area that can also serve as navigation
- `<i-layout-aside>` is a container for side sections (usually a side nav).
- `<i-layout-content>` is the main content container
- `<i-layout-footer>` is a container for footer elements

### Common Layouts

The previewed layouts are styled for documentation purposes only. When using the components, they will only 
provide the correct element positioning without colors and paddings.

Layouts are based on flexbox, so please make sure your browser fully supports it. 

<i-code-preview title="Content With Header">

<i-layout class="-preview">
    <i-layout-header>
        Header
    </i-layout-header>
    <i-layout-content>
        Content
    </i-layout-content>
</i-layout>

<template slot="html">

~~~html
<i-layout>
    <i-layout-header>
        Header
    </i-layout-header>
    
    <i-layout-content>
        Content
    </i-layout-content>
</i-layout>
~~~

</template>
</i-code-preview>
   
<i-code-preview title="Content With Header and Footer">

<i-layout class="-preview">
    <i-layout-header>
        Header
    </i-layout-header>
    <i-layout-content>
        Content
    </i-layout-content>
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>

<template slot="html">

~~~html
<i-layout>
    <i-layout-header>
        Header
    </i-layout-header>
    
    <i-layout-content>
        Content
    </i-layout-content>
    
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>
~~~

</template>
</i-code-preview>

<i-code-preview title="Content With Left Aside">

<i-layout class="-preview">
    <i-layout-header>
        Header
    </i-layout-header>
    <i-layout vertical>
        <i-layout-aside>
            <div class="layout-aside-preview-text">Left Aside</div>
        </i-layout-aside>
        <i-layout-content>
            Content
        </i-layout-content>
    </i-layout>
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>

<template slot="html">

~~~html
<i-layout>
    <i-layout-header>
        Header
    </i-layout-header>
    
    <i-layout vertical>
        <i-layout-aside>
            Left Aside
        </i-layout-aside>
        
        <i-layout-content>
            Content
        </i-layout-content>
    </i-layout>
    
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>
~~~   

</template>
<template slot="css">

~~~css
.layout-aside {
    width: 16rem;
}
~~~

</template>
</i-code-preview>

<i-code-preview title="Content With Right Aside">

<i-layout class="-preview">
    <i-layout-header>
        Header
    </i-layout-header>
    <i-layout vertical>
        <i-layout-content>
            Content
        </i-layout-content>
        <i-layout-aside>
            <div class="layout-aside-preview-text">Right Aside</div>
        </i-layout-aside>
    </i-layout>
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>

<template slot="html">

~~~html
<i-layout>
    <i-layout-header>
        Header
    </i-layout-header>
    
    <i-layout vertical>
        <i-layout-content>
            Content
        </i-layout-content>
        
        <i-layout-aside>
            Right Aside
        </i-layout-aside>
    </i-layout>
    
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>
~~~

</template>
<template slot="css">

~~~css
.layout-aside {
    width: 16rem;
}
~~~

</template>
</i-code-preview>

<i-code-preview title="Content With Left and Right Asides">

<i-layout class="-preview">
    <i-layout-header>
        Header
    </i-layout-header>
    <i-layout vertical>
        <i-layout-aside>
            <div class="layout-aside-preview-text">Left Aside</div>
        </i-layout-aside>
        <i-layout-content>
            Content
        </i-layout-content>
        <i-layout-aside>
            <div class="layout-aside-preview-text">Right Aside</div>
        </i-layout-aside>
    </i-layout>
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>

<template slot="html">

~~~html
<i-layout>
    <i-layout-header>
        Header
    </i-layout-header>
    
    <i-layout vertical>
        <i-layout-aside>
            Left Aside
        </i-layout-aside>
        
        <i-layout-content>
            Content
        </i-layout-content>
        
        <i-layout-aside>
            Right Aside
        </i-layout-aside>
    </i-layout>
    
    <i-layout-footer>
        Footer
    </i-layout-footer>
</i-layout>
~~~

</template>
<template slot="css">

~~~css
.layout-aside {
    width: 16rem;
}
~~~

</template>
</i-code-preview>

<i-code-preview title="Layout with Left Aside">

<i-layout vertical class="-preview">
    <i-layout-aside>
        <div class="layout-aside-preview-text">Left Aside</div>
    </i-layout-aside>
    <i-layout>
        <i-layout-header>
            Header
        </i-layout-header>
        <i-layout-content>
            Content
        </i-layout-content>
        <i-layout-footer>
            Footer
        </i-layout-footer>
    </i-layout>
</i-layout>

<template slot="html">

~~~html
<i-layout vertical>
    <i-layout-aside>
        Left Aside
    </i-layout-aside>
    
    <i-layout>
        <i-layout-header>
            Header
        </i-layout-header>
        
        <i-layout-content>
            Content
        </i-layout-content>
        
        <i-layout-footer>
            Footer
        </i-layout-footer>
    </i-layout>
</i-layout>
~~~

</template>
<template slot="css">

~~~css
.layout-aside {
    width: 16rem;
}
~~~

</template>
</i-code-preview>

<i-code-preview title="Layout with Right Aside">

<i-layout vertical class="-preview">
    <i-layout>
        <i-layout-header>
            Header
        </i-layout-header>
        <i-layout-content>
            Content
        </i-layout-content>
        <i-layout-footer>
            Footer
        </i-layout-footer>
    </i-layout>
    <i-layout-aside>
        <div class="layout-aside-preview-text">Right Aside</div>
    </i-layout-aside>
</i-layout>

<template slot="html">

~~~html
<i-layout vertical>
    <i-layout>
        <i-layout-header>
            Header
        </i-layout-header>
        
        <i-layout-content>
            Content
        </i-layout-content>
        
        <i-layout-footer>
            Footer
        </i-layout-footer>
    </i-layout>
    
    <i-layout-aside>
        Right Aside
    </i-layout-aside>
</i-layout>
~~~

</template>
<template slot="css">

~~~css
.layout-aside {
    width: 16rem;
}
~~~
</template>

</i-code-preview>

<i-code-preview title="Layout with Left and Right Asides">

<i-layout vertical class="-preview">
    <i-layout-aside>
        <div class="layout-aside-preview-text">Left Aside</div>
    </i-layout-aside>
    <i-layout>
        <i-layout-header>
            Header
        </i-layout-header>
        <i-layout-content>
            Content
        </i-layout-content>
        <i-layout-footer>
            Footer
        </i-layout-footer>
    </i-layout>
    <i-layout-aside>
        <div class="layout-aside-preview-text">Right Aside</div>
    </i-layout-aside>
</i-layout>

<template slot="html">

~~~html
<i-layout vertical>
    <i-layout-aside>
        Left Aside
    </i-layout-aside>
    
    <i-layout>
        <i-layout-header>
            Header
        </i-layout-header>
        
        <i-layout-content>
            Content
        </i-layout-content>
        
        <i-layout-footer>
            Footer
        </i-layout-footer>
    </i-layout>
    
    <i-layout-aside>
        Right Aside
    </i-layout-aside>
</i-layout>
~~~

</template>
<template slot="css">

~~~css
.layout-aside {
    width: 16rem;
}
~~~

</template>
</i-code-preview>


### Components API
Here you can find a list of the various customization options you can use for the layout components as props, as well as available slots.

<i-api-preview title="Layout API" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Layout">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">vertical</template>
                <template slot="description">Sets the orientation of the layout to vertical. Used for achieving layout columns.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for layout default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Layout Header API" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/LayoutHeader" default-active='slots'>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for layout header default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Layout Content API" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/LayoutContent" default-active='slots'>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for layout content default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Layout Footer API" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/LayoutFooter" default-active='slots'>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for layout footer default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Layout Aside API" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/LayoutAside" default-active='slots'>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for layout aside default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>


### Sass Variables
Here you can find a list of the Sass variables you can use for the layout components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Layout Aside" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$layout-aside-background</template>
                <template slot="default"><code>$color-transparent</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$layout-aside-width</template>
                <template slot="default"><code>auto</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview>

<i-scss-preview title="Layout Header" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$layout-header-background</template>
                <template slot="default"><code>$color-transparent</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$layout-header-padding</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview>

<i-scss-preview title="Layout Footer" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$layout-footer-background</template>
                <template slot="default"><code>$color-gray-10</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$layout-footer-padding</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview>
