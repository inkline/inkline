### Variants
Tables can be themed using brand modifier classes such as `.-light`, `.-dark`, `.-primary`, `.-secondary`, `.-info`, `.-success`, `.-warning`, and `.-danger`. You can set a variant for the table as a whole or individual table elements. By default, tables have the `.-light` variant. You can use a variation of any of the above classes to create the table design you need.

<i-code-preview title="Table Variants" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<table class="table -light -bordered -striped -hoverable">
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
<table class="table -dark -bordered -striped -hoverable">
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
<table class="table -primary -bordered -striped -hoverable">
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
<table class="table -secondary -bordered -striped -hoverable">
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
<table class="table -info -bordered -striped -hoverable">
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
<table class="table -success -bordered -striped -hoverable">
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
<table class="table -warning -bordered -striped -hoverable">
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
<table class="table -danger -bordered -striped -hoverable">
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
<table class="table -light"> .. </table>
<table class="table -dark"> .. </table>
<table class="table -primary"> .. </table>
<table class="table -secondary"> .. </table>
<table class="table -info"> .. </table>
<table class="table -success"> .. </table>
<table class="table -warning"> .. </table>
<table class="table -danger"> .. </table>
~~~

</template>
</i-code-preview>
