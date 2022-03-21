<script lang="ts">
import { ILayout } from '@inkline/inkline/components';

export default {
    components: {
        ILayout
    }
};
</script>
<template>
    <i-layout vertical>
        <i-layout>
            <i-layout-header>
                Header
            </i-layout-header>
    
            <i-layout-content>
                Content
            </i-layout-content>
    
            <i-layout-footer>
                Footer
            </i-layout-footer>
        </i-layout>
    
        <i-layout-aside>
            Right Aside
        </i-layout-aside>
    </i-layout>
</template>
<style src="./with-aside.scss" lang="scss" scoped />
