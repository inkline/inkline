---
title: Select Pagination
description: Pagination is handled using a simple and efficient infinite scrolling algorithm. The select component is used for selecting a value from a large list of options, with autocomplete support. 
---

<script setup>
import * as examples from '../../examples';
</script>


# Select Pagination
## Pagination is handled using a simple and efficient infinite scrolling algorithm

### Basic Example
Select pagination functionality is handled externally, by the user, using the `@pagination` event. The pagination event is triggered every time the scroll position gets close to the end of the scrollable area.

There are some considerations to be made when using infinite scrolling pagination:
- Pagination functionality is handled externally, using the `@pagination` event
- You must provide a total number of options using the `total` property
- You must provide a loading state using the `loading` property
- You must update the available `options` array manually

<example :component="examples.ISelectPaginationExample" :html="examples.ISelectPaginationExampleHTML" :js="examples.ISelectPaginationExampleJS"></example>





