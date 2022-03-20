<script lang="ts">
import { IButtonGroup } from '@inkline/inkline/components';

export default {
    components: {
        IButtonGroup
    }
};
</script>
<template>
    <i-button-group block>
        <i-button>Button 1</i-button>
        <i-button-group block>
            <i-button>Button 2</i-button>
            <i-button>Button 3</i-button>
        </i-button-group>
    </i-button-group>
</template>
