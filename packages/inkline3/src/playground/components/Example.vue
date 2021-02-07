<template>
    <section class="example" :class="classes">
        <div class="example-body">
            <component :is="component" v-if="component" />
        </div>
    </section>
</template>

<script>
export default {
    name: 'Example',
    props: {
        component: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.type}`]: Boolean(this.type)
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../css/variables';

.example {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid var(--border-color-light);
    border-radius: border-radius();
    box-sizing: border-box;

    > .example-body {
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

        > .example-body {
            > * {
                margin: 0;
            }
        }
    }

    &.-color-utilities {
        > .example-body {
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
    }

    &.-border-utilities,
    &.-border-utilities-with-border {
        > .example-body {
            > div {
                display: inline-block;
                width: 64px;
                height: 64px;
                background: color('gray-10');
                border-color: var(--border-color);
            }
        }
    }

    &.-border-utilities-with-border {
        > .example-body {
            > div {
                border-width: 1px;
                border-style: solid;
            }
        }
    }

    &.-flex {
        &.-tall {
            > .example-body {
                > div {
                    min-height: 150px;
                }
            }
        }

        > .example-body {
            [class*="_flex-direction-column"],
            [class*="_align-items"] {
                min-height: 180px;
            }

            div {
                padding: spacer('1-2');
                background: color('gray-10');
                border: 1px solid color('gray-30');
            }
        }
    }

    &.-overflow {
        > .example-body {
            > div {
                background: color('light');
                padding: spacer('1-2');
                border-radius: border-radius();

                + div {
                    margin-top: spacer();
                }
            }
        }
    }

    &.-card {
        > .example-body {
            .card {
                max-width: 360px;
            }
        }
    }

    &.-sizing {
        > .example-body {
            flex: 1;
            padding: 1rem;

            div {
                margin: 0;
                padding: spacer();
                background: color('light');
            }
        }

        &.-vertical {
            > .example-body {
                height: 240px;
                display: flex;

                div {
                    display: inline-block;
                    width: 20%;
                }
            }
        }
    }

    &.-spacing {
        > .example-body {
            div {
                max-width: 100%;
                padding: spacer();
                background: color('light');
            }
        }

        &.-vertical {
            > .example-body {
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
    }
}
</style>
