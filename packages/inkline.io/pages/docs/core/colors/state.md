### State
When displaying state information such as info, success, warning, or error messages, you will need to color your message accordingly. The state colors are:

<i-code-preview title="State Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<i-row>
    <i-column xs="12" sm="6" md="3">
        <color-box type="info" title="Info" description="#62bec1"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="success" title="Success" description="#5fb072"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="warning" title="Warning" description="#f1ac53"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="danger" title="Danger" description="#f25f5c"></color-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<div class="_background-info"></div>
<div class="_background-success"></div>
<div class="_background-warning"></div>
<div class="_background-danger"></div>
~~~

</template>
</i-code-preview>

You can also add state text colors using text-specific helper classes:

<i-code-preview title="State Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<ul class="-inline">
    <li class="_text-info">Info</li>
    <li class="_text-success">Success</li>
    <li class="_text-warning">Warning</li>
    <li class="_text-danger">Danger</li>
</ul>

<template slot="html">

~~~html
<p class="_text-info"></p>
<p class="_text-success"></p>
<p class="_text-warning"></p>
<p class="_text-danger"></p>
~~~

</template>
</i-code-preview>
