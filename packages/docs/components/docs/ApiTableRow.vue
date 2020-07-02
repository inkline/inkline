<template>
    <div class="api-table-row">
        <div class="tr info">
            <div v-if="$slots.property" class="td -property">
                <span class="label">Property</span>
                <slot name="property" />
            </div>
            <div v-if="$slots.function" class="td -property">
                <span class="label">Function</span>
                <slot name="function" />
            </div>
            <div v-if="$slots.mixin" class="td -property">
                <span class="label">Mixin</span>
                <slot name="mixin" />
            </div>
            <div v-if="$slots.event" class="td -event">
                <span class="label">Event</span>
                <slot name="event" />
            </div>
            <div v-if="$slots.slot" class="td -slot">
                <span class="label">Slot</span>
                <slot name="slot" />
            </div>
            <div v-if="$slots.type" class="td -type">
                <span class="label">Type</span>
                <slot name="type" />
            </div>
            <div v-if="$slots.values" class="td -values">
                <span class="label">Accepted</span>
                <slot name="values" />
            </div>
            <div v-if="$slots.default" class="td -default">
                <span class="label">Default</span>
                <slot name="default" />
            </div>
        </div>
        <div v-if="$slots['default-row']" class="tr">
            <div class="td -default-row">
                <span class="label">Default</span>
                <slot name="default-row" />
            </div>
        </div>
        <div v-if="$slots['values-row']" class="tr">
            <div class="td -values-row">
                <span class="label">Accepted</span>
                <slot name="values-row" />
            </div>
        </div>
        <div v-if="$slots['description']" class="tr">
            <div class="td -description">
                <span class="label">Description</span>
                <slot name="description" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ApiTableRow'
};
</script>

<style lang="scss" scoped>
@import '~@inkline/inkline/src/css/config/index';
@import '~@inkline/inkline/src/css/mixins/index';

.api-table-row {
    display: flex;
    flex-direction: column;
    padding: $spacer / 2;
    border-width: 1px;
    border-style: solid;
    border-color: $border-color-light;
    transition-property: border-color;
    transition-duration: $transition-duration;
    transition-timing-function: $transition-easing;

    .tr {
        display: flex;
        flex-direction: row;

        .td {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 25%;
            padding: $spacer / 2;
            max-width: 100%;

            .label {
                font-weight: $font-weight-semibold;
                font-size: font-size('sm');
                display: block;
                margin-bottom: -3px;
                color: $text-muted;
            }

            &.-property,
            &.-event,
            &.-slot {
                font-weight: $font-weight-semibold;
            }
        }

        pre {
            max-width: 100%;
            overflow: auto;
        }
    }

    + .api-table-row {
        border-top: 0;
    }
}

.inkline {
    &.-light {
        .api-table-row {
            border-color: $border-color-light;
        }
    }

    &.-dark {
        .api-table-row {
            border-color: $border-color-dark;
        }
    }
}
</style>
