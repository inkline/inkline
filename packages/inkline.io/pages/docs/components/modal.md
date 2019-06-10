# Modal
## Modals are dialogs that can be used for lightboxes, user notifications, or completely custom content.{.lead}

### Example
To create a modal, create an element (such as an `<i-button>`) as a trigger and the `v-model` on an `<i-modal>` component to control its visibility. Everything inside the `<i-modal>` is rendered as the modal body. Optionally, you can provide a modal header and footer using `slot="header"` and `slot="footer"`.

<i-code-preview title="Modal Example" link="https://github.com/inkline/inkline/tree/master/src/components/Modal" class="_padding-bottom-0">

<div>
    <i-button @click="showModal=true">Modal</i-button>
    <i-modal v-model="showModal">
        <template slot="header">Modal Header</template>
        This is the modal body. Useful information goes here.
        <template slot="footer">Modal Footer</template>
    </i-modal>
</div>

<template slot="html">

~~~html
<i-button @click="visible = true">Modal</i-button>
<i-modal v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      visible: false
    };
  }
}
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your modals, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Modal Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Modal" class="_padding-bottom-0">

<div>
    <i-button @click="showModalSm = true">Small Modal</i-button>&nbsp;
    <i-button @click="showModalMd = true">Medium Modal</i-button>&nbsp;
    <i-button @click="showModalLg = true">Large Modal</i-button>
</div>

<i-modal v-model="showModalSm" size="sm">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal v-model="showModalMd" size="md">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal v-model="showModalLg" size="lg">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<template slot="html">

~~~html
<i-button @click="visible = true">Small Modal</i-button>
<i-modal v-model="visible" size="sm">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button @click="visible = true">Medium Modal</i-button>
<i-modal v-model="visible" size="md">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button @click="visible = true">Large Modal</i-button>
<i-modal v-model="visible" size="lg">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      visible: false
    };
  }
}
~~~

</template>
</i-code-preview>

### Variants
Inkline includes two predefined modal styles, each serving its own semantic purpose. You can set the style of a `<i-modal>` using the `variant` property. By default, modals use the `light` variant.

<i-code-preview title="Modal Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Modal" class="_padding-bottom-0">

<div>
    <i-button variant="primary" @click="showModalPrimary = true">Primary Modal</i-button>&nbsp;
    <i-button variant="secondary" @click="showModalSecondary = true">Secondary Modal</i-button>&nbsp;
    <i-button variant="light" @click="showModalLight = true">Light Modal</i-button>&nbsp;
    <i-button variant="dark" @click="showModalDark = true">Dark Modal</i-button>&nbsp;
    <i-button variant="info" @click="showModalInfo = true">Info Modal</i-button>&nbsp;
    <i-button variant="success" @click="showModalSuccess = true">Success Modal</i-button>&nbsp;
    <i-button variant="warning" @click="showModalWarning = true">Warning Modal</i-button>&nbsp;
    <i-button variant="danger" @click="showModalDanger = true">Danger Modal</i-button>
</div>

<i-modal variant="primary" v-model="showModalPrimary">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="secondary" v-model="showModalSecondary">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="light" v-model="showModalLight">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="dark" v-model="showModalDark">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="info" v-model="showModalInfo">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="success" v-model="showModalSuccess">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="warning" v-model="showModalWarning">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="danger" v-model="showModalDanger">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<template slot="html">

~~~html
<i-button variant="primary" @click="visible = true">Primary Modal</i-button>
<i-modal variant="primary" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="secondary" @click="visible = true">Secondary Modal</i-button>
<i-modal variant="secondary" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="light" @click="visible = true">Light Modal</i-button>
<i-modal variant="light" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="dark" @click="visible = true">Dark Modal</i-button>
<i-modal variant="dark" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="info" @click="visible = true">Info Modal</i-button>
<i-modal variant="info" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="success" @click="visible = true">Success Modal</i-button>
<i-modal variant="success" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="warning" @click="visible = true">Warning Modal</i-button>
<i-modal variant="warning" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="danger" @click="visible = true">Danger Modal</i-button>
<i-modal variant="danger" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      visible: false
    };
  }
}
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Modal API" markup="i-modal" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Modal">
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
                    <td>closeOnPressEscape</td>
                    <td>Sets whether to hide the modal component when pressing escape.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the visibility of the modal component.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>transition</td>
                    <td>Sets the transition of the modal component.</td>
                    <td><code>String</code></td>
                    <td>
                        <code>fade-in-transition</code>, 
                        <code>fade-in-linear-transition</code>, 
                        <code>zoom-in-top-transition</code>, 
                        <code>zoom-in-bottom-transition</code>, 
                        <code>zoom-in-center-transition</code>, 
                        <code>zoom-in-left-transition</code>,
                        <code>zoom-in-right-transition</code>
                    </td>
                    <td><code>zoom-in-center-transition</code></td>
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
                    <td>Slot for modal default content.</td>
                </tr>
                <tr>
                    <td>header</td>
                    <td>Slot for modal header content.</td>
                </tr>
                <tr>
                    <td>footer</td>
                    <td>Slot for modal footer content.</td>
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
                    <td>input</td>
                    <td>Emitted when visibility changes.</td>
                    <td><code>(visible: Boolean) => {}</code></td>
                </tr>
                <tr>
                    <td>show</td>
                    <td>Emitted when modal is shown.</td>
                    <td><code>(instance: VueComponent) => {}</code></td>
                </tr>
                <tr>
                    <td>hide</td>
                    <td>Emitted when modal is hidden.</td>
                    <td><code>(instance: VueComponent) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
