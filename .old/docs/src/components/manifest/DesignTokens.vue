<script lang="ts">
import { computed, defineComponent, h, ref } from 'vue';
import { parseDesignTokenValue } from '~/utils';
import type { AppTableColumn } from '~/types';
import type { ComponentManifest, ComponentManifestCssVariable } from 'inkline';
import type { PropType } from 'vue';

function getAggregatedVariants(row: ComponentManifestCssVariable) {
    let variants = Array.isArray(row.variants) ? row.variants : [];

    if (Array.isArray(row.value)) {
        for (const value of row.value) {
            if (Array.isArray(value.variants)) {
                variants = variants.concat(value.variants);
            }
        }
    }

    return variants;
}

const sortPriority = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'danger',
    'light',
    'dark',
    'sm',
    'md',
    'lg'
];

export default defineComponent({
    props: {
        manifest: {
            type: Object as PropType<ComponentManifest>,
            required: true
        }
    },
    setup(props) {
        const cssVariables = computed(() => props.manifest.css?.variables || []);

        // Record containing row name and aggregated variants
        const aggregatedCssVariableVariants = computed(() => {
            const variants: Record<string, ComponentManifestCssVariable[]> = {};

            for (const row of cssVariables.value) {
                if (row.name) {
                    variants[row.name] = getAggregatedVariants(row);
                    variants[row.name].sort((a, b) => {
                        const aIndex = sortPriority.findIndex((keyword) =>
                            a.name?.includes(keyword)
                        );
                        const bIndex = sortPriority.findIndex((keyword) =>
                            b.name?.includes(keyword)
                        );

                        if (a.name && b.name && aIndex === -1 && bIndex === -1) {
                            return a.name.localeCompare(b.name);
                        }

                        if (aIndex === -1) {
                            return 1;
                        }

                        if (bIndex === -1) {
                            return -1;
                        }

                        return aIndex - bIndex;
                    });
                }
            }

            return variants;
        });

        const columns = ref<AppTableColumn[]>([
            {
                label: 'Token',
                key: 'name',
                type: 'code',
                width: (row: ComponentManifestCssVariable) => (row.value ? 4 : 12)
            },
            {
                label: 'Value',
                key: 'value',
                type: 'vnode',
                width: 8,
                visible: (row: ComponentManifestCssVariable) => Boolean(row.value),
                render: (row: ComponentManifestCssVariable) => {
                    return row.value && Array.isArray(row.value)
                        ? h(
                              'pre',
                              { class: 'pre' },
                              h(
                                  'code',
                                  row.value.map((value) => h('div', parseDesignTokenValue(value)))
                              )
                          )
                        : h('code', row.value);
                }
            },
            {
                label: 'Variants',
                key: 'variants',
                type: 'vnode',
                width: 12,
                visible: (row: ComponentManifestCssVariable) =>
                    getAggregatedVariants(row).length > 0,
                render: (row: ComponentManifestCssVariable) => {
                    return row.name && aggregatedCssVariableVariants.value[row.name].length > 0
                        ? h(
                              'pre',
                              { class: 'pre' },
                              h(
                                  'code',
                                  aggregatedCssVariableVariants.value[row.name].map((variant) =>
                                      h(
                                          'div',
                                          `${variant.name}: ${
                                              variant.value && Array.isArray(variant.value)
                                                  ? variant.value
                                                        .map((value) =>
                                                            parseDesignTokenValue(value)
                                                        )
                                                        .join(' ') + ';'
                                                  : variant.value
                                          }`
                                      )
                                  )
                              )
                          )
                        : h('code');
                }
            }
        ]);

        return {
            cssVariables,
            columns
        };
    }
});
</script>

<template>
    <AppTable :rows="cssVariables" :columns="columns" />
</template>
