# Icon
## Inkline provides you with a set of commonly used icons.{.lead}

Here’s an example of the basic icons included with the `<i-icon>` component.

<i-code-preview title="Icon Example" link="https://github.com/inkline/inkline/tree/master/src/components/Icon">

<div class="icon-box"><i-icon icon="check" /></div>
<div class="icon-box"><i-icon icon="info" /></div>
<div class="icon-box"><i-icon icon="warning" /></div>
<div class="icon-box"><i-icon icon="danger" /></div>
<div class="icon-box"><i-icon icon="home" /></div>
<div class="icon-box"><i-icon icon="calendar" /></div>
<div class="icon-box"><i-icon icon="chevron-down" /></div>
<div class="icon-box"><i-icon icon="caret-down" /></div>
<div class="icon-box"><i-icon icon="plus" /></div>
<div class="icon-box"><i-icon icon="minus" /></div>
<div class="icon-box"><i-icon icon="times" /></div>
<div class="icon-box"><i-icon icon="circle" /></div>

<template slot="html">

~~~html
<i-icon icon="check" />
<i-icon icon="info" />
<i-icon icon="warning" />
<i-icon icon="danger" />
<i-icon icon="home" />
<i-icon icon="calendar" />
<i-icon icon="chevron-down" />
<i-icon icon="caret-down" />
<i-icon icon="plus" />
<i-icon icon="minus" />
<i-icon icon="times" />
<i-icon icon="circle" />
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your icon, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Icon Size" link="https://github.com/inkline/inkline/tree/master/src/components/Icon">

<div class="icon-box"><i-icon icon="home" size="sm" /></div>
<div class="icon-box"><i-icon icon="home" size="md" /></div>
<div class="icon-box"><i-icon icon="home" size="lg" /></div>

<template slot="html">

~~~html
<i-icon icon="home" size="sm" />
<i-icon icon="home" size="md" />
<i-icon icon="home" size="lg" />
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Icon API" expanded markup="i-icon" link="https://github.com/inkline/inkline/tree/master/src/components/Icon">
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
                    <td>icon</td>
                    <td>Sets the icon to be displayed.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the icon component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
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
                    <td>Slot for header default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
