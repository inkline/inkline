# Tables
## Documentation and examples for opt-in styling of tables with Inkline. { .lead }

### Basic Table
Using the most basic table markup, here’s how tables look in Inkline. All table styles are inherited in Inkline, meaning any nested tables will be styled in the same manner as the parent.

<i-code-preview title="Basic Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<i-table>
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
</i-table>

<template slot="html">

~~~html
<i-table>
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
</i-table>
~~~

</template>
</i-code-preview>

### Bordered Table
Add the `bordered` property for borders on all sides of the table and table cells.

<i-code-preview title="Bordered Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<i-table bordered>
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
</i-table>

<template slot="html">

~~~html
<i-table bordered>
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
</i-table>
~~~

</template>
</i-code-preview>

### Striped Table
Add the `striped` property to add zebra-striping to any table row within the table body.

<i-code-preview title="Striped Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<i-table striped>
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
</i-table>

<template slot="html">

~~~html
<i-table striped>
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
</i-table>
~~~

</template>
</i-code-preview>

### Hoverable Table
Add the `hover` property to enable a hover state on table rows within a `<tbody>`.

<i-code-preview title="Hoverable Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<i-table hover>
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
</i-table>

<template slot="html">

~~~html
<i-table hover>
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
</i-table>
~~~

</template>
</i-code-preview>

### Responsive Table
Enable responsiveness by adding the `responsive` property. Responsive tables scroll horizontally on small devices. When viewing on anything larger, you will not see any difference in these tables.

You can target specific responsive breakpoints by setting a value to the `responsive` property: `responsive="<breakpoint>"`, where breakpoint is one of `xs`, `sm`, `md`, `lg` or `xl`.

<i-code-preview title="Responsive Table" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<i-table responsive>
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
</i-table>

<template slot="html">

~~~html
<i-table responsive>
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
</i-table>
~~~

</template>
</i-code-preview>

### Variants
Tables can be themed using the `variant` property. You can use colors such as `light`, `dark`, `primary`, `secondary`, `info`, `success`, `warning`, and `danger`. You can set a variant for the table as a whole or individual table elements. By default, tables have the `light` variant. You can use a variation of any of the above classes to create the table design you need.

<i-code-preview title="Table Variants" link="https://github.com/inkline/inkline/blob/master/src/css/core/_tables.styl">

<i-table variant="light" bordered striped hover class="_margin-bottom-1">
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
</i-table>
<i-table variant="dark" bordered striped hover class="_margin-bottom-1">
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
</i-table>
<i-table variant="primary" bordered striped hover class="_margin-bottom-1">
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
</i-table>
<i-table variant="secondary" bordered striped hover class="_margin-bottom-1">
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
</i-table>
<i-table variant="info" bordered striped hover class="_margin-bottom-1">
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
</i-table>
<i-table variant="success" bordered striped hover class="_margin-bottom-1">
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
</i-table>
<i-table variant="warning" bordered striped hover class="_margin-bottom-1">
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
</i-table>
<i-table variant="danger" bordered striped hover class="_margin-bottom-1">
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
</i-table>

<template slot="html">

~~~html
<i-table variant="light"> .. </i-table>
<i-table variant="dark"> .. </i-table>
<i-table variant="primary"> .. </i-table>
<i-table variant="secondary"> .. </i-table>
<i-table variant="info"> .. </i-table>
<i-table variant="success"> .. </i-table>
<i-table variant="warning"> .. </i-table>
<i-table variant="danger"> .. </i-table>
~~~

</template>
</i-code-preview>
