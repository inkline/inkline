<template>
    <section class="example" :class="classes">
        <div class="body">
            <slot>
                <component :is="component" v-if="component" />
            </slot>

            <pre v-if="html">{{ html }}</pre>
            <pre v-if="css">{{ css }}</pre>
            <pre v-if="js">{{ js }}</pre>
        </div>
    </section>
</template>

<script>
import { colorVariantClass } from "@inkline/inkline/src/mixins";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Example',
    props: {
        color: {
            type: String,
            default: ''
        },
        component: {
            type: Object,
            default: null
        },
        html: {
            type: String,
            default: ''
        },
        css: {
            type: String,
            default: ''
        },
        js: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.type}`]: Boolean(this.type)
            }
        }
    }
});
</script>

<style lang="scss">
@import '../../css/variables';

.example {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: border-radius();
    box-sizing: border-box;

    &.-light {
        border: 1px solid var(--border-color-light);
    }

    &.-dark {
        border: 1px solid var(--border-color-dark);
    }

    > .body {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: spacer('1-2');

        > * {
            margin: spacer('1-2');
        }
    }

    + .example {
        margin-top: spacer();
    }

    &.-no-margin {
        padding: spacer('1');

        > .body {
            > * {
                margin: 0;
            }
        }
    }

    &.-color-utilities > .body {
        > div {
            display: inline-block;
            width: 120px;
            text-align: center;
            border-radius: 4px;
            padding: spacer('1') 0;
        }

        > p {
            display: inline-block;
        }
    }

    &.-border-utilities {
        > .body {
            > div {
                display: inline-block;
                width: 64px;
                height: 64px;
                background: color('gray-10');
                border-color: var(--border-color);

                .inkline.-dark & {
                    background: color('dark');
                    border-color: var(--border-color-dark);
                }
            }
        }

        &.-with-border > .body {
            > div {
                border-width: 1px;
                border-style: solid;
            }
        }
    }

    &.-flex {
        > .body {
            [class*="_flex-direction-column"],
            [class*="_align-items"] {
                min-height: 180px;
            }

            div {
                padding: spacer('1-2');
                background: color('gray-10');
                border: 1px solid color('gray-30');

                .inkline.-dark & {
                    background: color('gray-85');
                    border: 1px solid color('gray-75');
                }
            }
        }

        &.-tall > .body {
            > div {
                min-height: 150px;
            }
        }
    }

    &.-overflow > .body {
        > div {
            background: color('light');
            padding: spacer('1-2');
            border-radius: border-radius();

            + div {
                margin-top: spacer();
            }

            .inkline.-dark & {
                background: color('dark');
            }
        }
    }

    &.-card > .body {
        .card {
            max-width: 360px;
        }
    }

    &.-icon > .body {
        .inkline-icon {
            height: 60px;
            width: 60px;
            border-radius: border-radius();
            border-width: 1px;
            border-style: solid;
            border-color: var(--border-color-light);
            display: inline-flex;
            justify-content: center;
            align-items: center;

            .inkline.-dark & {
                border-color: var(--border-color-dark);
            }
        }
    }

    &.-sizing {
        > .body {
            flex: 1;
            padding: 1rem;

            div {
                margin: 0;
                padding: spacer();
                background: color('light');

                .inkline.-dark & {
                    background: color('dark');
                }
            }
        }

        &.-vertical > .body {
            height: 240px;
            display: flex;

            div {
                display: inline-block;
                width: 20%;
            }
        }
    }

    &.-spacing {
        > .body {
            div {
                max-width: 100%;
                padding: spacer();
                background: color('light');

                .inkline.-dark & {
                    background: color('dark');
                }
            }
        }

        &.-vertical > .body {
            display: flex;
            justify-content: flex-start;
            align-items: stretch;
            height: 240px;

            div {
                flex: 1 1;
                display: inline-block;
                max-height: 100%;
            }
        }
    }

    &.-layout > .body {
        .layout-content,
        .layout-header,
        .layout-footer,
        .layout-aside {
            text-align: center;
        }

        .layout-header,
        .layout-footer {
            background: color('gray-20');
            padding: spacer('1') 0;

            .inkline.-dark & {
                background: color('gray-80');
            }
        }

        .layout-content {
            background: color('gray-10');
            padding: spacer('4') 0;

            .inkline.-dark & {
                background: color('gray-70');
            }
        }

        .layout-aside {
            background: color('gray-30');
            width: 30%;
            flex-basis: 30%;

            .inkline.-dark & {
                background: color('gray-75');
            }

            .layout-aside-children {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    &.-grid {
        .container {
            margin-left: auto;
            margin-right: auto;
            width: 100%;
        }

        .column {
            margin-top: spacer('1-2');
            margin-bottom: spacer('1-2');
            text-align: center;

            &::after {
                content: '';
                width: 100%;
                display: block;
                box-sizing: border-box;
                text-align: center;
                border-radius: border-radius();
                padding: 1.25rem 0.5rem;
                color: #fff;
                background: color('primary');
            }
        }

        &.-nested-example {
            .container > .row > .column {
                &::after {
                    display: none;
                }

                &:first-child {
                    border-right: 1px solid color('white');
                }

                border-radius: border-radius('lg');
                padding: spacer() 0;
                background: color('primary-20')
            }
        }

        &.-vertical-alignment-example {
            .container > .row > .column {
                &:first-of-type {
                    &::after {
                        padding: 3rem 0.5rem;
                    }
                }
            }
        }
    }
}
</style>
