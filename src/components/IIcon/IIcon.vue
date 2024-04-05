<script lang="ts">
import { h, computed, defineComponent, onMounted, inject } from 'vue';
import { toCamelCase } from '@grozav/utils';
import { renderSvg } from '@inkline/inkline/utils';
import { useComponentSize } from '@inkline/inkline/composables';
import { InklineIconsKey } from '@inkline/inkline/constants';

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
         * @type xs | sm | md | lg | xl | xxl
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const icons = inject(InklineIconsKey, {});
        const iconName = computed(() => toCamelCase(props.name));
        const icon = computed(() => icons[iconName.value]);

        const currentSize = computed(() => props.size);
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            'inkline-icon': true,
            icon: true,
            [`-${size.value}`]: true
        }));

        onMounted(() => {
            if (iconName.value && !icons[iconName.value]) {
                console.error(`The icon ${iconName.value} is not registered.`);
            }
        });

        return () =>
            h(
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
