### Bordered Table
Add `.-bordered` for borders on all sides of the table and table cells.

<i-code-preview title="Bordered Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<table class="table -bordered">
  <thead>
    <tr>
      <th># </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Alice</td>
      <td>Cooper</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</table>

<template slot="html">

~~~html
<table class="table -bordered">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">#</th>
      <td>Alex</td>
      <td>Grozav</td>
      <td>@alexgrozav</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>John</td>
      <td>Doe</td>
      <td>@johndoe</td>
    </tr>
    <tr>
      <th scope="row">#</th>
      <td>Alice</td>
      <td>Doe</td>
      <td>@alicecooper</td>
    </tr>
  </tbody>
</table>
~~~

</template>
</i-code-preview>
