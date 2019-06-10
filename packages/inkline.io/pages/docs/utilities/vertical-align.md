# Vertical Align Utilities
## Change the vertical alignment of inline, inline block, inline table, and table cell elements. { .lead }

### Text Alignment
You can use vertical align utilities to change the alignment of elements. Please note that vertical-align only affects `inline`, `inline-block`, `inline-table`, and `table-cell` elements.

<i-code-preview title="Vertical Alignment Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<span class="_align-baseline">baseline</span>
<span class="_align-top">top</span>
<span class="_align-middle">middle</span>
<span class="_align-bottom">bottom</span>
<span class="_align-text-top">text-top</span>
<span class="_align-text-bottom">text-bottom</span>

<template slot="html">

~~~html
<span class="_align-baseline">baseline</span>
~~~
~~~html
<span class="_align-top">top</span>
~~~
~~~html
<span class="_align-middle">middle</span>
~~~
~~~html
<span class="_align-bottom">bottom</span>
~~~
~~~html
<span class="_align-text-top">text-top</span>
~~~
~~~html
<span class="_align-text-bottom">text-bottom</span>
~~~

</template>
</i-code-preview>

### Table Cell Alignment
You can use vertical align utilities to change the alignment of table cells.

<i-code-preview title="Vertical Alignment Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<table class="table -bordered" style="height: 100px;">
  <tbody>
    <tr>
      <td class="_align-baseline">baseline</td>
      <td class="_align-top">top</td>
      <td class="_align-middle">middle</td>
      <td class="_align-bottom">bottom</td>
      <td class="_align-text-top">text-top</td>
      <td class="_align-text-bottom">text-bottom</td>
    </tr>
  </tbody>
</table>

<template slot="html">

~~~html
<table class="table" style="height: 100px;">
  <tbody>
    <tr>
      <td class="_align-baseline">baseline</td>
      <td class="_align-top">top</td>
      <td class="_align-middle">middle</td>
      <td class="_align-bottom">bottom</td>
      <td class="_align-text-top">text-top</td>
      <td class="_align-text-bottom">text-bottom</td>
    </tr>
  </tbody>
</table>
~~~

</template>
</i-code-preview>
