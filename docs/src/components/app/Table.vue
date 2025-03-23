<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType, VNode } from 'vue';
import type { AppTableColumn } from '~/types';
import { isFunction } from '@inkline/utils';

export default defineComponent({
    props: {
        columns: {
            type: Array as PropType<AppTableColumn[]>,
            default: () => []
        },
        rows: {
            type: Array as PropType<Record<string, any>[]>,
            default: () => []
        }
    },
    setup(props) {
        function renderTdValue(row: Record<string, any>, column: AppTableColumn) {
            const value = row[column.key];

            if (column.render) {
                return column.render(row, column);
            } else if (typeof value === 'string') {
                return value;
            } else if (typeof value === 'boolean') {
                return value ? 'true' : 'false';
            } else if (typeof value === 'number') {
                return value;
            } else if (Array.isArray(value)) {
                return value.join(', ');
            } else if (typeof value === 'object') {
                return JSON.stringify(value);
            }

            return value;
        }

        const prerenderedTdValues = computed(() => {
            const prerendered: Record<string, Record<string, string | VNode>> = {};

            props.rows.forEach((row) => {
                prerendered[row.name] = {};
                props.columns.forEach((column) => {
                    prerendered[row.name][column.key] = renderTdValue(row, column);
                });
            });

            return prerendered;
        });

        const tdWidthValues = computed(() => {
            const widths: Record<string, Record<string, number>> = {};

            props.rows.forEach((row) => {
                widths[row.name] = {};
                props.columns.forEach((column) => {
                    widths[row.name][column.key] = isFunction(column.width)
                        ? column.width(row, column)
                        : column.width || 12;
                });
            });

            return widths;
        });

        const tdVisibleValues = computed(() => {
            const visible: Record<string, Record<string, boolean>> = {};

            props.rows.forEach((row) => {
                visible[row.name] = {};
                props.columns.forEach((column) => {
                    visible[row.name][column.key] = column.visible
                        ? column.visible(row, column)
                        : true;
                });
            });

            return visible;
        });

        return {
            prerenderedTdValues,
            tdWidthValues,
            tdVisibleValues
        };
    }
});
</script>

<template>
    <ul class="app-table">
        <Grid v-for="row in rows" :key="row.name" class="tr" direction="row">
            <template v-for="column in columns">
                <Grid
                    v-if="tdVisibleValues[row.name][column.key]"
                    :key="column.key"
                    :md="tdWidthValues[row.name][column.key]"
                    class="td"
                    direction="column"
                >
                    <div v-if="column.label" class="label">{{ column.label }}</div>
                    <code v-if="column.type === 'code'">
                        {{ prerenderedTdValues[row.name][column.key] }}
                    </code>
                    <component
                        :is="prerenderedTdValues[row.name][column.key]"
                        v-else-if="typeof prerenderedTdValues[row.name][column.key] === 'object'"
                    />
                    <span v-else>{{ prerenderedTdValues[row.name][column.key] }}</span>
                </Grid>
            </template>
        </Grid>
    </ul>
</template>

<style lang="scss">
.app-table {
    list-style: none;
    padding: 0;
    margin: var(--spacing) 0;
    border-top-width: var(--border-top-width);
    border-bottom-width: var(--border-bottom-width);
    border-top-style: var(--border-top-style);
    border-bottom-style: var(--border-bottom-style);
    border-top-color: var(--border-top-color);
    border-bottom-color: var(--border-bottom-color);
    transition-property: border;
    transition-timing-function: var(--transition-timing-function);
    transition-duration: var(--transition-duration);

    .tr {
        margin: 0;
        padding-top: var(--spacing);
        padding-bottom: var(--spacing);
        border-bottom: var(--border-bottom-width) var(--border-bottom-style)
            var(--border-bottom-color);
        transition-property: border;
        transition-timing-function: var(--transition-timing-function);
        transition-duration: var(--transition-duration);

        &:last-child {
            border-bottom: 0;
        }

        .td {
            gap: var(--spacing-1-2);

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        color: var(--text-color-weak);
    }

    code {
        font-size: var(--font-size-sm);
    }
}
</style>
