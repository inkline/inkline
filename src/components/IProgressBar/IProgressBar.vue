<script lang="ts">
import { inject, computed, defineComponent } from 'vue';
import { ProgressKey } from '@inkline/inkline/components/IProgressBar/mixin';

const componentName = 'IProgressBar';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the progress bar
         * @type light | dark | primary | secondary | info | success | warning | danger
         * @default primary
         * @name color
         */
        color: {
            type: String,
            default: 'primary'
        },
        /**
         * The value of the progress bar
         * @type Number
         * @default 0
         * @name value
         */
        value: {
            type: [String, Number],
            default: 0
        }
    },
    setup(props) {
        const progress = inject(ProgressKey, null);

        const min = computed(() =>
            progress
                ? typeof progress.min.value === 'string'
                    ? parseFloat(progress.min.value)
                    : progress.min.value
                : 0
        );

        const max = computed(() =>
            progress
                ? typeof progress.max.value === 'string'
                    ? parseFloat(progress.max.value)
                    : progress.max.value
                : 100
        );

        const computedValue = computed(() => {
            const value =
                typeof props.value === 'string'
                    ? parseFloat(props.value.replace('%', ''))
                    : props.value;

            if (!progress) {
                return value;
            }

            return ((value - min.value) * 100) / (max.value - min.value);
        });

        const style = computed(() => ({
            width: `${computedValue.value}%`
        }));

        const classes = computed(() => ({
            [`-${props.color}`]: true
        }));

        return {
            min,
            max,
            computedValue,
            style,
            classes
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        class="progress-bar"
        :class="classes"
        :style="style"
        role="progressbar"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="computedValue"
    >
        <!-- @slot default Slot for default progress bar content -->
        <slot />
    </div>
</template>
