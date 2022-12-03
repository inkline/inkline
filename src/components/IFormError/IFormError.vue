<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getValueByPath } from '@grozav/utils';

const componentName = 'IFormError';

export default defineComponent({
    name: componentName,
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
        const parent = computed(() => {
            // if (formGroup.$) {
            //     return formGroup;
            // }
            // return form;
        });

        const schema = computed(() => {
            // if (props.for !== '') {
            //     return getValueByPath(parent.value.schema || {}, `${props.for}`);
            // }
            // return parent.value.schema || {};
        });

        const errors = computed(() => {
            // return schema.value.errors || [];
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
    <transition v-if="schema" v-show="isVisible" name="fade-in-transition">
        <ul v-if="errors.length > 0" class="form-error" aria-live="polite">
            <!-- <li v-for="error in errors">{{ error.message }}</li> -->
        </ul>
    </transition>
</template>
