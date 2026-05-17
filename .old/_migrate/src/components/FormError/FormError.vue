<script lang="ts">
import { computed, defineComponent, ref, toRef } from 'vue';
import { useValidation } from '@inkline/inkline/composables';

const componentName = 'FormError';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The schema path of the target input to show the errors for.
         * @type String
         * @default
         * @name for
         */
        for: {
            type: String,
            default: ''
        },
        /**
         * Set the validation statuses for which the form error should be visible.
         * @type Array | String
         * @default ['touched', 'dirty', 'invalid']
         * @name visible
         */
        visible: {
            type: [Array, String],
            default: (): string[] => ['touched', 'dirty', 'invalid']
        }
    },
    setup(props) {
        const name = toRef(props, 'for');
        const validate = ref(true);
        const { schema } = useValidation({
            name,
            validate
        });

        const errors = computed(() => {
            return schema.value.errors || [];
        });

        const isVisible = computed(() => {
            let visible = true;

            if (schema.value && props.visible) {
                ([] as string[]).concat(props.visible as string[]).forEach((status) => {
                    visible = visible && schema.value[status];
                });
            }

            return visible;
        });

        return {
            errors,
            isVisible,
            schema
        };
    }
});
</script>

<template>
    <transition v-if="schema" name="fade-in-transition">
        <ul
            v-if="errors.length > 0"
            v-show="isVisible"
            v-bind="$attrs"
            class="form-error"
            aria-live="polite"
        >
            <li v-for="(error, index) in errors" :key="`${index}-${error.name}`">
                {{ error.message }}
            </li>
        </ul>
    </transition>
</template>
