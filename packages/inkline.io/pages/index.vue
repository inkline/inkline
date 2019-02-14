<template>
  <i-row>
    <i-column xs="12">
      <h1>Inkline</h1>
      <p>
        Inkline is a UI/UX framework designed for creating flawless responsive websites, using Gradient Design.
        This awesome VueJS components framework is being developed by <a href="https://twitter.com/alexgrozav">@alexgrozav</a>.
      </p>
    </i-column>

    <i-column xs="12">
      <site-navigation></site-navigation>
    </i-column>
  </i-row>
</template>

<script>
import View from '@components/View';
import SiteNavigation from '@components/SiteNavigation';

export default {
    name: 'IndexView',
    layout: 'Default',
    extends: View,
    head: {
        title: 'Vue.js UI/UX Framework'
    },
    components: {
        SiteNavigation
    }
};
</script>
