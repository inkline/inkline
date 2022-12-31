<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useInkline } from "@inkline/inkline";

export default defineComponent({
  setup() {
    const inkline = useInkline();
    const colorMode = computed(() => inkline.options.colorMode);

    function toggleColorMode () {
      inkline.options.colorMode = colorMode.value === 'light' ? 'dark' : 'light';
    }

    return { colorMode, toggleColorMode };
  },
});
</script>
<template>
    <div id="app">
        <h1>Hello world</h1>
        <div>
            <i-navbar>
                <i-navbar-brand to="/">
                    Navbar
                </i-navbar-brand>
                <i-navbar-collapsible>
                    <i-nav>
                        <i-nav-item to="/">
                            Home
                        </i-nav-item>
                        <i-nav-item to="/about">
                            About
                        </i-nav-item>
                        <i-nav-item to="/contact">
                            Contact
                        </i-nav-item>
                    </i-nav>
                    <i-input placeholder="Type something..">
                        <template #append>
                            <i-button color="primary">
                                <i-icon name="ink-search" />
                            </i-button>
                        </template>
                    </i-input>
                </i-navbar-collapsible>
            </i-navbar>
        </div>
        <i-button class="_margin-top:1" @click="toggleColorMode">
            Switch to {{ colorMode === 'dark' ? 'light' : 'dark' }} mode
        </i-button>
    </div>
</template>

<style lang="scss">
@import './css';
@import '../css';

#__nuxt {
    height: 100%;
}
</style>
