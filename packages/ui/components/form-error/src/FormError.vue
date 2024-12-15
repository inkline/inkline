<script lang="ts">
import { computed, defineComponent, type PropType, toRef } from 'vue';
import { useFormElementSchema } from '@inkline/composables';
import { FormStateKeys } from '@inkline/types';

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
         * @type FormStateKeys[] | boolean
         * @default ['touched', 'dirty', 'invalid']
         * @name visible
         */
        errorCondition: {
            type: [Boolean, Array] as PropType<FormStateKeys[] | boolean>,
            default(): FormStateKeys[] {
                return ['touched', 'dirty', 'invalid'];
            }
        }
    },
    setup(props) {
        const name = toRef(props, 'for');
        const { schema } = useFormElementSchema({
            name
        });

        const errors = computed(() => {
            return schema.value?.errors || [];
        });

        const isVisible = computed(() => {
            if (typeof props.errorCondition === 'boolean') {
                return props.errorCondition;
            }

            return props.errorCondition.reduce((acc, key) => {
                return Boolean(acc && schema.value?.[key]);
            }, true);
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
