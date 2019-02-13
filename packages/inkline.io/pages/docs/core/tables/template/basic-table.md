### Basic Table
Using the most basic table markup, here’s how tables look in Inkline. All table styles are inherited in Inkline, meaning any nested tables will be styled in the same manner as the parent.

<i-code-preview title="Basic Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<table class="table">
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
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>1az    <z>`azxzz</z>
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
