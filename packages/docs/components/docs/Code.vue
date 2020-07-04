<template>
    <i-tabs
        :class="{ '-expanded': expanded }"
        class="code-tabs"
        custom>
        <template v-slot:header="{ tabs, active, setActive }">
            <strong class="title">
                {{ title }}
            </strong>
            <i-button-group>
                <i-button
                    v-for="tab in tabs"
                    :key="tab.id"
                    :active="tab.id === active"
                    :variant="active === tab.id ? 'primary' : null"
                    :class="{ '-with-icon': info[tab.$attrs.type].icon }"
                    size="sm"
                    @click="setActive(tab)">
                    <span class="title">
                        {{ info[tab.$attrs.type].title }}
                    </span>
                </i-button>
            </i-button-group>
        </template>
        <slot />
    </i-tabs>
</template>

<style lang="scss">
@import '~@inkline/inkline/src/css/config';
@import '~@inkline/inkline/src/css/mixins';

.code-tabs {
    > .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: $spacer;
        border: 1px solid $border-color-light;
        transition: border $transition-duration $transition-easing;

        .list {
            margin-bottom: 0;
        }

        @include breakpoint-down('sm') {
            flex-direction: column;

            .button-group {
                margin-top: $spacer;
            }
        }
    }

    > .tab {
        border-top: 0 !important;
        border-top-right-radius: 0 !important;
        border-top-left-radius: 0 !important;
        background: transparent !important;
    }

    + .code-tabs {
        margin-top: $spacer;
    }

    &.-expanded {
        > .tab {
            border: 0;

            > .body {
                padding: 0;
            }
        }
    }

    > .tab > .body {
        .layout-aside {
            @include breakpoint-down('lg') {
                width: 140px;
            }

            @include breakpoint-down('sm') {
                width: 120px;
            }

            @include breakpoint-down('xs') {
                width: 100px;
            }
        }

        &,
        > div {
            > .popover-wrapper,
            > .tooltip-wrapper,
            > .dropdown,
            > .badge,
            > .button {
                margin-top: $spacer / 2;
                margin-bottom: $spacer / 2;
            }
        }

        .popover-wrapper > .button,
        .tooltip-wrapper > .button,
        .dropdown > .button,
        .button-group > .button {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
}

.inkline.-dark .code-tabs {
    > .header {
        border: 1px solid $border-color-dark;
    }
}
</style>

<script>
export default {
    name: 'CodeTabs',
    props: {
        title: {
            type: String,
            default: ''
        },
        expanded: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            info: {
                preview: { title: 'Preview', icon: 'eye' },
                html: { title: 'HTML', icon: ['fab', 'html5'] },
                css: { title: 'CSS', icon: ['fab', 'css3'] },
                js: { title: 'JS', icon: ['fab', 'js'] },
                output: { title: 'Output', icon: 'terminal' },
                scss: { title: 'Sass Variables', icon: ['fab', 'sass'] },
                props: { title: 'Props' },
                slots: { title: 'Slots' },
                events: { title: 'Events' }
            }
        };
    }
};
</script>
