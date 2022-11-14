<script lang="ts">
import { h, computed, defineComponent, onMounted, inject } from 'vue';
import { computedSizeValue } from '@inkline/inkline/mixins';
import { toCamelCase } from '@grozav/utils';
import { renderSvg } from '@inkline/inkline/utils';
import { SvgNode } from '@inkline/inkline/types';

/**
 * The icon to be displayed
 * @type String
 * @default
 * @name name
 */

const componentName = 'IIcon';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * @description The icon to be displayed
         * @type String
         * @default
         * @name name
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the icon
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const icons = inject('inklineIcons') as Record<string, SvgNode>;
        const iconName = computed(() => toCamelCase(props.name));
        const icon = computed(() => icons[iconName.value]);
        const size = computed(() => computedSizeValue(componentName, props.size));

        const classes = computed(() => ({
            'inkline-icon': true,
            [`-${size.value}`]: Boolean(size.value)
        }));

        onMounted(() => {
            if (iconName.value && !icons[iconName.value]) {
                console.error(`The icon ${iconName.value} is not registered.`);
            }
        });

        return () => h(
            'svg',
            {
                class: classes.value,
                ...icon.value?.attributes
            },
            renderSvg(icon.value?.children || [])
        );
    }
});
</script>
