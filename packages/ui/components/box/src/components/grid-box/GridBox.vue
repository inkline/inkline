<script lang="ts">
import { h, defineComponent } from 'vue';
import { useBox } from '../../composables';
import { props } from '../box/Box.vue';
import { Grid } from '@inkline/component-grid';

const componentName = 'GridBox';

export default defineComponent({
    name: componentName,
    props,
    setup(props, { slots }) {
        const { classes } = useBox(componentName, props);

        // <!-- @slot default The default slot of the grid box component -->
        return () => h(Grid, { tag: props.tag, class: classes.value }, slots.default?.());
    }
});
</script>
