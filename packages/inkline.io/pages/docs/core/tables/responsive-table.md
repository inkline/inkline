### Responsive Table
Enabled responsiveness by wrapping your table inside a `.table-responsive` class. Responsive tables scroll horizontally on small devices. When viewing on anything larger, you will not see any difference in these tables.

You can target specific responsive breakpoints using `.table-responsive-*`.

<i-code-preview title="Responsive Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
        </tr>
      </tbody>
    </table>
</div>

<template slot="html">

~~~html
<div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
          <th>Table Heading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
          <td>Table Cell</td>
        </tr>
      </tbody>
    </table>
</div>
~~~

</template>
</i-code-preview>
