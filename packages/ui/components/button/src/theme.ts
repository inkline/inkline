import {
    add,
    DefinitionOptions,
    multiply,
    nsvariables,
    ref,
    selector,
    setExportsNamespace,
    toVariableKey,
    vref
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useColors,
    useContrastTextColor,
    useFontSize,
    useLineHeight,
    useSpacing,
    useTransition
} from '@inkline/theme';

const ns = 'button';

const defaultButtonColor = 'light';
const defaultButtonColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultButtonSize = 'md';
const defaultButtonSizes = ['sm', 'md', 'lg'] as const;

type ButtonColorVariant = (typeof defaultButtonColors)[number];
type ButtonSizeVariant = (typeof defaultButtonSizes)[number];

export function useButtonThemeColorConfig(variant: ButtonColorVariant, options: DefinitionOptions) {
    const {
        colorLightH,
        colorLightS,
        colorLightL,
        colorLightA,
        colorLightShade50H,
        colorLightShade50S,
        colorLightShade50L,
        colorLightShade50A,
        colorLightShade100H,
        colorLightShade100S,
        colorLightShade100L,
        colorLightShade100A,
        colorDarkH,
        colorDarkS,
        colorDarkL,
        colorDarkA,
        colorDarkTint50H,
        colorDarkTint50S,
        colorDarkTint50L,
        colorDarkTint50A,
        colorDarkTint100H,
        colorDarkTint100S,
        colorDarkTint100L,
        colorDarkTint100A,
        colorPrimaryH,
        colorPrimaryS,
        colorPrimaryL,
        colorPrimaryA,
        colorPrimaryShade50H,
        colorPrimaryShade50S,
        colorPrimaryShade50L,
        colorPrimaryShade50A,
        colorPrimaryShade100H,
        colorPrimaryShade100S,
        colorPrimaryShade100L,
        colorPrimaryShade100A,
        colorSecondaryH,
        colorSecondaryS,
        colorSecondaryL,
        colorSecondaryA,
        colorSecondaryShade50H,
        colorSecondaryShade50S,
        colorSecondaryShade50L,
        colorSecondaryShade50A,
        colorSecondaryShade100H,
        colorSecondaryShade100S,
        colorSecondaryShade100L,
        colorSecondaryShade100A,
        colorSuccessH,
        colorSuccessS,
        colorSuccessL,
        colorSuccessA,
        colorSuccessShade50H,
        colorSuccessShade50S,
        colorSuccessShade50L,
        colorSuccessShade50A,
        colorSuccessShade100H,
        colorSuccessShade100S,
        colorSuccessShade100L,
        colorSuccessShade100A,
        colorDangerH,
        colorDangerS,
        colorDangerL,
        colorDangerA,
        colorDangerShade50H,
        colorDangerShade50S,
        colorDangerShade50L,
        colorDangerShade50A,
        colorDangerShade100H,
        colorDangerShade100S,
        colorDangerShade100L,
        colorDangerShade100A,
        colorWarningH,
        colorWarningS,
        colorWarningL,
        colorWarningA,
        colorWarningShade50H,
        colorWarningShade50S,
        colorWarningShade50L,
        colorWarningShade50A,
        colorWarningShade100H,
        colorWarningShade100S,
        colorWarningShade100L,
        colorWarningShade100A,
        colorInfoH,
        colorInfoS,
        colorInfoL,
        colorInfoA,
        colorInfoShade50H,
        colorInfoShade50S,
        colorInfoShade50L,
        colorInfoShade50A,
        colorInfoShade100H,
        colorInfoShade100S,
        colorInfoShade100L,
        colorInfoShade100A
    } = useColors(options);
    const {
        contrastTextColorLightH,
        contrastTextColorLightS,
        contrastTextColorLightL,
        contrastTextColorLightA,
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA,
        contrastTextColorPrimaryH,
        contrastTextColorPrimaryS,
        contrastTextColorPrimaryL,
        contrastTextColorPrimaryA,
        contrastTextColorSecondaryH,
        contrastTextColorSecondaryS,
        contrastTextColorSecondaryL,
        contrastTextColorSecondaryA,
        contrastTextColorSuccessH,
        contrastTextColorSuccessS,
        contrastTextColorSuccessL,
        contrastTextColorSuccessA,
        contrastTextColorDangerH,
        contrastTextColorDangerS,
        contrastTextColorDangerL,
        contrastTextColorDangerA,
        contrastTextColorWarningH,
        contrastTextColorWarningS,
        contrastTextColorWarningL,
        contrastTextColorWarningA,
        contrastTextColorInfoH,
        contrastTextColorInfoS,
        contrastTextColorInfoL,
        contrastTextColorInfoA
    } = useContrastTextColor(options);

    return {
        light: {
            border: {
                color: {
                    h: ref(colorLightShade50H),
                    s: ref(colorLightShade50S),
                    l: ref(colorLightShade50L),
                    a: ref(colorLightShade50A)
                }
            },
            background: {
                h: ref(colorLightH),
                s: ref(colorLightS),
                l: ref(colorLightL),
                a: ref(colorLightA)
            },
            color: {
                h: ref(contrastTextColorLightH),
                s: ref(contrastTextColorLightS),
                l: ref(contrastTextColorLightL),
                a: ref(contrastTextColorLightA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorLightShade100H),
                        s: ref(colorLightShade100S),
                        l: ref(colorLightShade100L),
                        a: ref(colorLightShade100A)
                    }
                },
                background: {
                    h: ref(colorLightShade100H),
                    s: ref(colorLightShade100S),
                    l: ref(colorLightShade100L),
                    a: ref(colorLightShade100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorLightShade100H),
                        s: ref(colorLightShade100S),
                        l: ref(colorLightShade100L),
                        a: ref(colorLightShade100A)
                    }
                },
                background: {
                    h: ref(colorLightShade50H),
                    s: ref(colorLightShade50S),
                    l: ref(colorLightShade50L),
                    a: ref(colorLightShade50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorLightShade100H),
                        s: ref(colorLightShade100S),
                        l: ref(colorLightShade100L),
                        a: ref(colorLightShade100A)
                    }
                },
                background: {
                    h: ref(colorLightShade50H),
                    s: ref(colorLightShade50S),
                    l: ref(colorLightShade50L),
                    a: ref(colorLightShade50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorLightH),
                        s: ref(colorLightS),
                        l: ref(colorLightL),
                        a: ref(colorLightA)
                    }
                },
                color: {
                    h: ref(colorLightH),
                    s: ref(colorLightS),
                    l: ref(colorLightL),
                    a: ref(colorLightA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorLightH),
                    s: ref(colorLightS),
                    l: ref(colorLightL),
                    a: ref(colorLightA)
                }
            }
        },
        dark: {
            border: {
                color: {
                    h: ref(colorDarkTint50H),
                    s: ref(colorDarkTint50S),
                    l: ref(colorDarkTint50L),
                    a: ref(colorDarkTint50A)
                }
            },
            background: {
                h: ref(colorDarkH),
                s: ref(colorDarkS),
                l: ref(colorDarkL),
                a: ref(colorDarkA)
            },
            color: {
                h: ref(contrastTextColorDarkH),
                s: ref(contrastTextColorDarkS),
                l: ref(contrastTextColorDarkL),
                a: ref(contrastTextColorDarkA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorDarkTint100H),
                        s: ref(colorDarkTint100S),
                        l: ref(colorDarkTint100L),
                        a: ref(colorDarkTint100A)
                    }
                },
                background: {
                    h: ref(colorDarkTint100H),
                    s: ref(colorDarkTint100S),
                    l: ref(colorDarkTint100L),
                    a: ref(colorDarkTint100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorDarkTint100H),
                        s: ref(colorDarkTint100S),
                        l: ref(colorDarkTint100L),
                        a: ref(colorDarkTint100A)
                    }
                },
                background: {
                    h: ref(colorDarkTint50H),
                    s: ref(colorDarkTint50S),
                    l: ref(colorDarkTint50L),
                    a: ref(colorDarkTint50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorDarkTint100H),
                        s: ref(colorDarkTint100S),
                        l: ref(colorDarkTint100L),
                        a: ref(colorDarkTint100A)
                    }
                },
                background: {
                    h: ref(colorDarkTint50H),
                    s: ref(colorDarkTint50S),
                    l: ref(colorDarkTint50L),
                    a: ref(colorDarkTint50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorDarkH),
                        s: ref(colorDarkS),
                        l: ref(colorDarkL),
                        a: ref(colorDarkA)
                    }
                },
                color: {
                    h: ref(colorDarkH),
                    s: ref(colorDarkS),
                    l: ref(colorDarkL),
                    a: ref(colorDarkA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorDarkH),
                    s: ref(colorDarkS),
                    l: ref(colorDarkL),
                    a: ref(colorDarkA)
                }
            }
        },
        primary: {
            border: {
                color: {
                    h: ref(colorPrimaryShade50H),
                    s: ref(colorPrimaryShade50S),
                    l: ref(colorPrimaryShade50L),
                    a: ref(colorPrimaryShade50A)
                }
            },
            background: {
                h: ref(colorPrimaryH),
                s: ref(colorPrimaryS),
                l: ref(colorPrimaryL),
                a: ref(colorPrimaryA)
            },
            color: {
                h: ref(contrastTextColorPrimaryH),
                s: ref(contrastTextColorPrimaryS),
                l: ref(contrastTextColorPrimaryL),
                a: ref(contrastTextColorPrimaryA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorPrimaryShade100H),
                        s: ref(colorPrimaryShade100S),
                        l: ref(colorPrimaryShade100L),
                        a: ref(colorPrimaryShade100A)
                    }
                },
                background: {
                    h: ref(colorPrimaryShade100H),
                    s: ref(colorPrimaryShade100S),
                    l: ref(colorPrimaryShade100L),
                    a: ref(colorPrimaryShade100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorPrimaryShade100H),
                        s: ref(colorPrimaryShade100S),
                        l: ref(colorPrimaryShade100L),
                        a: ref(colorPrimaryShade100A)
                    }
                },
                background: {
                    h: ref(colorPrimaryShade50H),
                    s: ref(colorPrimaryShade50S),
                    l: ref(colorPrimaryShade50L),
                    a: ref(colorPrimaryShade50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorPrimaryShade100H),
                        s: ref(colorPrimaryShade100S),
                        l: ref(colorPrimaryShade100L),
                        a: ref(colorPrimaryShade100A)
                    }
                },
                background: {
                    h: ref(colorPrimaryShade50H),
                    s: ref(colorPrimaryShade50S),
                    l: ref(colorPrimaryShade50L),
                    a: ref(colorPrimaryShade50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorPrimaryH),
                        s: ref(colorPrimaryS),
                        l: ref(colorPrimaryL),
                        a: ref(colorPrimaryA)
                    }
                },
                color: {
                    h: ref(colorPrimaryH),
                    s: ref(colorPrimaryS),
                    l: ref(colorPrimaryL),
                    a: ref(colorPrimaryA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorPrimaryH),
                    s: ref(colorPrimaryS),
                    l: ref(colorPrimaryL),
                    a: ref(colorPrimaryA)
                }
            }
        },
        secondary: {
            border: {
                color: {
                    h: ref(colorSecondaryShade50H),
                    s: ref(colorSecondaryShade50S),
                    l: ref(colorSecondaryShade50L),
                    a: ref(colorSecondaryShade50A)
                }
            },
            background: {
                h: ref(colorSecondaryH),
                s: ref(colorSecondaryS),
                l: ref(colorSecondaryL),
                a: ref(colorSecondaryA)
            },
            color: {
                h: ref(contrastTextColorSecondaryH),
                s: ref(contrastTextColorSecondaryS),
                l: ref(contrastTextColorSecondaryL),
                a: ref(contrastTextColorSecondaryA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorSecondaryShade100H),
                        s: ref(colorSecondaryShade100S),
                        l: ref(colorSecondaryShade100L),
                        a: ref(colorSecondaryShade100A)
                    }
                },
                background: {
                    h: ref(colorSecondaryShade100H),
                    s: ref(colorSecondaryShade100S),
                    l: ref(colorSecondaryShade100L),
                    a: ref(colorSecondaryShade100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorSecondaryShade100H),
                        s: ref(colorSecondaryShade100S),
                        l: ref(colorSecondaryShade100L),
                        a: ref(colorSecondaryShade100A)
                    }
                },
                background: {
                    h: ref(colorSecondaryShade50H),
                    s: ref(colorSecondaryShade50S),
                    l: ref(colorSecondaryShade50L),
                    a: ref(colorSecondaryShade50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorSecondaryShade100H),
                        s: ref(colorSecondaryShade100S),
                        l: ref(colorSecondaryShade100L),
                        a: ref(colorSecondaryShade100A)
                    }
                },
                background: {
                    h: ref(colorSecondaryShade50H),
                    s: ref(colorSecondaryShade50S),
                    l: ref(colorSecondaryShade50L),
                    a: ref(colorSecondaryShade50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorSecondaryH),
                        s: ref(colorSecondaryS),
                        l: ref(colorSecondaryL),
                        a: ref(colorSecondaryA)
                    }
                },
                color: {
                    h: ref(colorSecondaryH),
                    s: ref(colorSecondaryS),
                    l: ref(colorSecondaryL),
                    a: ref(colorSecondaryA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorSecondaryH),
                    s: ref(colorSecondaryS),
                    l: ref(colorSecondaryL),
                    a: ref(colorSecondaryA)
                }
            }
        },
        success: {
            border: {
                color: {
                    h: ref(colorSuccessShade50H),
                    s: ref(colorSuccessShade50S),
                    l: ref(colorSuccessShade50L),
                    a: ref(colorSuccessShade50A)
                }
            },
            background: {
                h: ref(colorSuccessH),
                s: ref(colorSuccessS),
                l: ref(colorSuccessL),
                a: ref(colorSuccessA)
            },
            color: {
                h: ref(contrastTextColorSuccessH),
                s: ref(contrastTextColorSuccessS),
                l: ref(contrastTextColorSuccessL),
                a: ref(contrastTextColorSuccessA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorSuccessShade100H),
                        s: ref(colorSuccessShade100S),
                        l: ref(colorSuccessShade100L),
                        a: ref(colorSuccessShade100A)
                    }
                },
                background: {
                    h: ref(colorSuccessShade100H),
                    s: ref(colorSuccessShade100S),
                    l: ref(colorSuccessShade100L),
                    a: ref(colorSuccessShade100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorSuccessShade100H),
                        s: ref(colorSuccessShade100S),
                        l: ref(colorSuccessShade100L),
                        a: ref(colorSuccessShade100A)
                    }
                },
                background: {
                    h: ref(colorSuccessShade50H),
                    s: ref(colorSuccessShade50S),
                    l: ref(colorSuccessShade50L),
                    a: ref(colorSuccessShade50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorSuccessShade100H),
                        s: ref(colorSuccessShade100S),
                        l: ref(colorSuccessShade100L),
                        a: ref(colorSuccessShade100A)
                    }
                },
                background: {
                    h: ref(colorSuccessShade50H),
                    s: ref(colorSuccessShade50S),
                    l: ref(colorSuccessShade50L),
                    a: ref(colorSuccessShade50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorSuccessH),
                        s: ref(colorSuccessS),
                        l: ref(colorSuccessL),
                        a: ref(colorSuccessA)
                    }
                },
                color: {
                    h: ref(colorSuccessH),
                    s: ref(colorSuccessS),
                    l: ref(colorSuccessL),
                    a: ref(colorSuccessA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorSuccessH),
                    s: ref(colorSuccessS),
                    l: ref(colorSuccessL),
                    a: ref(colorSuccessA)
                }
            }
        },
        danger: {
            border: {
                color: {
                    h: ref(colorDangerShade50H),
                    s: ref(colorDangerShade50S),
                    l: ref(colorDangerShade50L),
                    a: ref(colorDangerShade50A)
                }
            },
            background: {
                h: ref(colorDangerH),
                s: ref(colorDangerS),
                l: ref(colorDangerL),
                a: ref(colorDangerA)
            },
            color: {
                h: ref(contrastTextColorDangerH),
                s: ref(contrastTextColorDangerS),
                l: ref(contrastTextColorDangerL),
                a: ref(contrastTextColorDangerA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorDangerShade100H),
                        s: ref(colorDangerShade100S),
                        l: ref(colorDangerShade100L),
                        a: ref(colorDangerShade100A)
                    }
                },
                background: {
                    h: ref(colorDangerShade100H),
                    s: ref(colorDangerShade100S),
                    l: ref(colorDangerShade100L),
                    a: ref(colorDangerShade100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorDangerShade100H),
                        s: ref(colorDangerShade100S),
                        l: ref(colorDangerShade100L),
                        a: ref(colorDangerShade100A)
                    }
                },
                background: {
                    h: ref(colorDangerShade50H),
                    s: ref(colorDangerShade50S),
                    l: ref(colorDangerShade50L),
                    a: ref(colorDangerShade50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorDangerShade100H),
                        s: ref(colorDangerShade100S),
                        l: ref(colorDangerShade100L),
                        a: ref(colorDangerShade100A)
                    }
                },
                background: {
                    h: ref(colorDangerShade50H),
                    s: ref(colorDangerShade50S),
                    l: ref(colorDangerShade50L),
                    a: ref(colorDangerShade50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorDangerH),
                        s: ref(colorDangerS),
                        l: ref(colorDangerL),
                        a: ref(colorDangerA)
                    }
                },
                color: {
                    h: ref(colorDangerH),
                    s: ref(colorDangerS),
                    l: ref(colorDangerL),
                    a: ref(colorDangerA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorDangerH),
                    s: ref(colorDangerS),
                    l: ref(colorDangerL),
                    a: ref(colorDangerA)
                }
            }
        },
        warning: {
            border: {
                color: {
                    h: ref(colorWarningShade50H),
                    s: ref(colorWarningShade50S),
                    l: ref(colorWarningShade50L),
                    a: ref(colorWarningShade50A)
                }
            },
            background: {
                h: ref(colorWarningH),
                s: ref(colorWarningS),
                l: ref(colorWarningL),
                a: ref(colorWarningA)
            },
            color: {
                h: ref(contrastTextColorWarningH),
                s: ref(contrastTextColorWarningS),
                l: ref(contrastTextColorWarningL),
                a: ref(contrastTextColorWarningA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorWarningShade100H),
                        s: ref(colorWarningShade100S),
                        l: ref(colorWarningShade100L),
                        a: ref(colorWarningShade100A)
                    }
                },
                background: {
                    h: ref(colorWarningShade100H),
                    s: ref(colorWarningShade100S),
                    l: ref(colorWarningShade100L),
                    a: ref(colorWarningShade100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorWarningShade100H),
                        s: ref(colorWarningShade100S),
                        l: ref(colorWarningShade100L),
                        a: ref(colorWarningShade100A)
                    }
                },
                background: {
                    h: ref(colorWarningShade50H),
                    s: ref(colorWarningShade50S),
                    l: ref(colorWarningShade50L),
                    a: ref(colorWarningShade50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorWarningShade100H),
                        s: ref(colorWarningShade100S),
                        l: ref(colorWarningShade100L),
                        a: ref(colorWarningShade100A)
                    }
                },
                background: {
                    h: ref(colorWarningShade50H),
                    s: ref(colorWarningShade50S),
                    l: ref(colorWarningShade50L),
                    a: ref(colorWarningShade50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorWarningH),
                        s: ref(colorWarningS),
                        l: ref(colorWarningL),
                        a: ref(colorWarningA)
                    }
                },
                color: {
                    h: ref(colorWarningH),
                    s: ref(colorWarningS),
                    l: ref(colorWarningL),
                    a: ref(colorWarningA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorWarningH),
                    s: ref(colorWarningS),
                    l: ref(colorWarningL),
                    a: ref(colorWarningA)
                }
            }
        },
        info: {
            border: {
                color: {
                    h: ref(colorInfoShade50H),
                    s: ref(colorInfoShade50S),
                    l: ref(colorInfoShade50L),
                    a: ref(colorInfoShade50A)
                }
            },
            background: {
                h: ref(colorInfoH),
                s: ref(colorInfoS),
                l: ref(colorInfoL),
                a: ref(colorInfoA)
            },
            color: {
                h: ref(contrastTextColorInfoH),
                s: ref(contrastTextColorInfoS),
                l: ref(contrastTextColorInfoL),
                a: ref(contrastTextColorInfoA)
            },
            /**
             * @state active
             */
            active: {
                border: {
                    color: {
                        h: ref(colorInfoShade100H),
                        s: ref(colorInfoShade100S),
                        l: ref(colorInfoShade100L),
                        a: ref(colorInfoShade100A)
                    }
                },
                background: {
                    h: ref(colorInfoShade100H),
                    s: ref(colorInfoShade100S),
                    l: ref(colorInfoShade100L),
                    a: ref(colorInfoShade100A)
                }
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: {
                        h: ref(colorInfoShade100H),
                        s: ref(colorInfoShade100S),
                        l: ref(colorInfoShade100L),
                        a: ref(colorInfoShade100A)
                    }
                },
                background: {
                    h: ref(colorInfoShade50H),
                    s: ref(colorInfoShade50S),
                    l: ref(colorInfoShade50L),
                    a: ref(colorInfoShade50A)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: {
                        h: ref(colorInfoShade100H),
                        s: ref(colorInfoShade100S),
                        l: ref(colorInfoShade100L),
                        a: ref(colorInfoShade100A)
                    }
                },
                background: {
                    h: ref(colorInfoShade50H),
                    s: ref(colorInfoShade50S),
                    l: ref(colorInfoShade50L),
                    a: ref(colorInfoShade50A)
                }
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: {
                        h: ref(colorInfoH),
                        s: ref(colorInfoS),
                        l: ref(colorInfoL),
                        a: ref(colorInfoA)
                    }
                },
                color: {
                    h: ref(colorInfoH),
                    s: ref(colorInfoS),
                    l: ref(colorInfoL),
                    a: ref(colorInfoA)
                }
            },
            /**
             * @variant link
             */
            link: {
                color: {
                    h: ref(colorInfoH),
                    s: ref(colorInfoS),
                    l: ref(colorInfoL),
                    a: ref(colorInfoA)
                }
            }
        }
    }[variant];
}

export function useButtonThemeSizeConfig(variant: ButtonSizeVariant, options: DefinitionOptions) {
    const {
        borderTopLeftRadiusSm,
        borderTopRightRadiusSm,
        borderBottomRightRadiusSm,
        borderBottomLeftRadiusSm,
        borderTopLeftRadiusMd,
        borderTopRightRadiusMd,
        borderBottomRightRadiusMd,
        borderBottomLeftRadiusMd,
        borderTopLeftRadiusLg,
        borderTopRightRadiusLg,
        borderBottomRightRadiusLg,
        borderBottomLeftRadiusLg
    } = useBorderRadius(options);
    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusSm),
                topRight: ref(borderTopRightRadiusSm),
                bottomRight: ref(borderBottomRightRadiusSm),
                bottomLeft: ref(borderBottomLeftRadiusSm)
            },
            fontSize: ref(fontSizeSm),
            padding: {
                top: multiply(ref(spacingSm), 0.5),
                right: ref(spacingSm),
                bottom: multiply(ref(spacingSm), 0.5),
                left: ref(spacingSm)
            },
            /**
             * @element loader
             */
            loader: {
                width: '1rem',
                height: '1rem'
            }
        },
        md: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusMd),
                topRight: ref(borderTopRightRadiusMd),
                bottomRight: ref(borderBottomRightRadiusMd),
                bottomLeft: ref(borderBottomLeftRadiusMd)
            },
            fontSize: ref(fontSizeMd),
            padding: {
                top: multiply(ref(spacingMd), 0.5),
                right: ref(spacingMd),
                bottom: multiply(ref(spacingMd), 0.5),
                left: ref(spacingMd)
            },
            /**
             * @element loader
             */
            loader: {
                width: '1rem',
                height: '1rem'
            }
        },
        lg: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusLg),
                topRight: ref(borderTopRightRadiusLg),
                bottomRight: ref(borderBottomRightRadiusLg),
                bottomLeft: ref(borderBottomLeftRadiusLg)
            },
            fontSize: ref(fontSizeLg),
            padding: {
                top: multiply(ref(spacingLg), 0.5),
                right: ref(spacingLg),
                bottom: multiply(ref(spacingLg), 0.5),
                left: ref(spacingLg)
            },
            /**
             * @element loader
             */
            loader: {
                width: '1rem',
                height: '1rem'
            }
        }
    }[variant];
}

export function useButtonThemeConfig(options: DefinitionOptions) {
    const {
        borderTopStyle,
        borderTopWidth,
        borderRightStyle,
        borderRightWidth,
        borderBottomStyle,
        borderBottomWidth,
        borderLeftStyle,
        borderLeftWidth
    } = useBorder(options);
    const { spacing, spacingXs } = useSpacing(options);
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);
    const { lineHeight } = useLineHeight(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);

    return merge(
        {
            border: {
                top: {
                    width: ref(borderTopWidth),
                    style: ref(borderTopStyle)
                },
                right: {
                    width: ref(borderRightWidth),
                    style: ref(borderRightStyle)
                },
                bottom: {
                    width: ref(borderBottomWidth),
                    style: ref(borderBottomStyle)
                },
                left: {
                    width: ref(borderLeftWidth),
                    style: ref(borderLeftStyle)
                }
            },
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            },
            lineHeight: ref(lineHeight),
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @state disabled
             */
            disabled: {
                opacity: '0.8'
            },
            /**
             * @variant block
             */
            block: {
                margin: { top: ref(spacing) }
            },
            /**
             * @element icon
             */
            icon: {
                margin: { left: ref(spacingXs) }
            }
        },
        useButtonThemeColorConfig(defaultButtonColor, options),
        useButtonThemeSizeConfig(defaultButtonSize, options)
    );
}

export function useButtonColorVariables(variant: ButtonColorVariant, options: DefinitionOptions) {
    return nsvariables([ns, variant] as const, useButtonThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useButtonThemeSizeVariables(
    variant: ButtonSizeVariant,
    options: DefinitionOptions
) {
    return nsvariables([ns, variant] as const, useButtonThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useButtonThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useButtonThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

export function useButtonThemeLayout(options: DefinitionOptions) {
    selector(
        '.button',
        {
            display: 'inline-flex',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            userSelect: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            outline: 0
        },
        options
    );

    // Button states

    selector(
        ['.button.-disabled', '.button:disabled'],
        {
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        '.button.-loading',
        {
            cursor: 'default'
        },
        options
    );

    // Button icon and content

    selector(
        ['.button-icon', 'button-content'],
        {
            lineHeight: 1,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        options
    );

    // Future-proof disabling of clicks on `<a>` elements

    selector(
        ['a.button.-disabled', '*:disabled a.button'],
        {
            pointerEvents: 'none'
        },
        options
    );
}

export function useButtonThemeBaseSelectors(options: DefinitionOptions) {
    const {
        buttonBorderWidth,
        buttonBorderStyle,
        buttonBorderTopColor,
        buttonBorderRightColor,
        buttonBorderBottomColor,
        buttonBorderLeftColor,
        buttonPadding,
        buttonBorderRadius,
        buttonBoxShadow,
        buttonColor,
        buttonBackground,
        buttonFontSize,
        buttonLineHeight,
        buttonTransitionProperty,
        buttonTransitionDuration,
        buttonTransitionTimingFunction,
        buttonHoverBackground,
        buttonFocusBackground,
        buttonActiveBackground,
        buttonLoaderWidth,
        buttonLoaderHeight,
        buttonIconMargin,
        buttonDisabledOpacity
    } = useButtonThemeVariables(options);

    selector(
        '.button',
        {
            borderWidth: vref(buttonBorderWidth),
            borderStyle: vref(buttonBorderStyle),
            borderTopColor: vref(buttonBorderTopColor),
            borderRightColor: vref(buttonBorderRightColor),
            borderBottomColor: vref(buttonBorderBottomColor),
            borderLeftColor: vref(buttonBorderLeftColor),
            borderRadius: vref(buttonBorderRadius),
            background: vref(buttonBackground),
            boxShadow: vref(buttonBoxShadow),
            color: vref(buttonColor),
            fontSize: ref(buttonFontSize),
            lineHeight: ref(buttonLineHeight),
            padding: vref(buttonPadding),
            transitionProperty: vref(buttonTransitionProperty),
            transitionDuration: vref(buttonTransitionDuration),
            transitionTimingFunction: vref(buttonTransitionTimingFunction)
        },
        options
    );

    // Button states

    selector(
        ['.button:hover', '.button.-hover'],
        {
            background: vref(buttonHoverBackground)
        },
        options
    );

    selector(
        ['.button:focus', '.button.-focus'],
        {
            background: vref(buttonFocusBackground)
        },
        options
    );

    selector(
        ['.button:active', '.button.-active'],
        {
            background: vref(buttonActiveBackground)
        },
        options
    );

    selector(
        ['.button:disabled', '.button.-disabled'],
        {
            background: vref(buttonBackground),
            opacity: ref(buttonDisabledOpacity),
            boxShadow: 'none'
        },
        options
    );

    // Button icon and content

    selector(
        '.button-icon + .button-content',
        {
            margin: vref(buttonIconMargin)
        },
        options
    );

    // Button loading icon

    selector(
        ['.button .loader', '.button .loader.-md'],
        {
            width: ref(buttonLoaderWidth),
            height: ref(buttonLoaderHeight)
        },
        options
    );

    selector(
        '.button .loader svg circle',
        {
            stroke: ref(buttonColor)
        },
        options
    );
}

export function useButtonThemeVariantsSelectors(options: DefinitionOptions) {
    const {
        buttonBackground,
        buttonBorderTopColor,
        buttonBorderRightColor,
        buttonBorderBottomColor,
        buttonBorderLeftColor,
        buttonColor,
        buttonFontSize,
        buttonLineHeight,
        buttonPaddingTop,
        buttonPaddingBottom,
        buttonBlockMargin
    } = useButtonThemeVariables(options);

    // Block button

    selector(
        '.button.-block',
        {
            display: 'flex',
            width: '100%'
        },
        options
    );

    selector(
        '.button.-block + .button.-block',
        {
            margin: vref(buttonBlockMargin)
        },
        options
    );

    selector(
        [
            'input[type="submit"].button.-block',
            'input[type="reset"].button.-block',
            'input[type="button"].button.-block'
        ],
        {
            width: '100%'
        },
        options
    );

    // Link button
    // Remove button background, box shadow, and border

    selector(
        '.button.-link',
        {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            cursor: 'pointer',
            color: vref(buttonBackground)
        },
        options
    );

    selector(
        [
            '.button.-link:active',
            '.button.-link.-active',
            '.button.-link:hover',
            '.button.-link.-hover',
            '.button.-link:focus',
            '.button.-link.-focus'
        ],
        {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            textDecoration: 'underline'
        },
        options
    );

    // Outline buttons
    // Remove button background

    selector(
        '.button.-outline',
        {
            background: 'transparent',
            boxShadow: 'none',
            borderTopColor: vref(buttonBackground),
            borderRightColor: vref(buttonBackground),
            borderBottomColor: vref(buttonBackground),
            borderLeftColor: vref(buttonBackground),
            color: vref(buttonBackground)
        },
        options
    );

    selector(
        ['.button.-outline:hover', '.button.-outline.-hover'],
        {
            background: vref(buttonBackground),
            boxShadow: 'none',
            borderTopColor: vref(buttonBorderTopColor),
            borderRightColor: vref(buttonBorderRightColor),
            borderBottomColor: vref(buttonBorderBottomColor),
            borderLeftColor: vref(buttonBorderLeftColor),
            color: vref(buttonColor)
        },
        options
    );

    // Circle and square button

    selector(
        ['.button.-circle', '.button.-square'],
        {
            width: add(
                ref(buttonPaddingTop),
                multiply(ref(buttonFontSize), ref(buttonLineHeight)),
                ref(buttonPaddingBottom)
            ),
            height: add(
                ref(buttonPaddingTop),
                multiply(ref(buttonFontSize), ref(buttonLineHeight)),
                ref(buttonPaddingBottom)
            ),
            padding: 0
        },
        options
    );

    selector(
        '.button.-circle',
        {
            borderRadius: '50%'
        },
        options
    );
}

export function useButtonThemeSizeSelectors(
    variant: ButtonSizeVariant,
    options: DefinitionOptions
) {
    const {
        buttonPaddingTop,
        buttonPaddingRight,
        buttonPaddingBottom,
        buttonPaddingLeft,
        buttonBorderTopLeftRadius,
        buttonBorderTopRightRadius,
        buttonBorderBottomRightRadius,
        buttonBorderBottomLeftRadius,
        buttonFontSize
    } = useButtonThemeVariables(options);

    const {
        variantBorderTopLeftRadius,
        variantBorderTopRightRadius,
        variantBorderBottomRightRadius,
        variantBorderBottomLeftRadius,
        variantFontSize,
        variantPaddingTop,
        variantPaddingRight,
        variantPaddingBottom,
        variantPaddingLeft
    } = setExportsNamespace(useButtonThemeSizeVariables(variant, options), 'variant');

    selector(
        `.button.-${variant}`,
        {
            [toVariableKey(buttonBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(buttonBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(buttonBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(buttonBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(buttonFontSize)]: ref(variantFontSize),
            [toVariableKey(buttonPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(buttonPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(buttonPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(buttonPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useButtonThemeColorSelectors(
    variant: ButtonColorVariant,
    options: DefinitionOptions
) {
    const {
        buttonBackgroundH,
        buttonBackgroundS,
        buttonBackgroundL,
        buttonBackgroundA,
        buttonBorderTopColorH,
        buttonBorderTopColorS,
        buttonBorderTopColorL,
        buttonBorderTopColorA,
        buttonBorderRightColorH,
        buttonBorderRightColorS,
        buttonBorderRightColorL,
        buttonBorderRightColorA,
        buttonBorderBottomColorH,
        buttonBorderBottomColorS,
        buttonBorderBottomColorL,
        buttonBorderBottomColorA,
        buttonBorderLeftColorH,
        buttonBorderLeftColorS,
        buttonBorderLeftColorL,
        buttonBorderLeftColorA,
        buttonColorH,
        buttonColorS,
        buttonColorL,
        buttonColorA,
        buttonHoverBackgroundH,
        buttonHoverBackgroundS,
        buttonHoverBackgroundL,
        buttonHoverBackgroundA,
        buttonHoverBorderTopColorH,
        buttonHoverBorderTopColorS,
        buttonHoverBorderTopColorL,
        buttonHoverBorderTopColorA,
        buttonHoverBorderRightColorH,
        buttonHoverBorderRightColorS,
        buttonHoverBorderRightColorL,
        buttonHoverBorderRightColorA,
        buttonHoverBorderBottomColorH,
        buttonHoverBorderBottomColorS,
        buttonHoverBorderBottomColorL,
        buttonHoverBorderBottomColorA,
        buttonHoverBorderLeftColorH,
        buttonHoverBorderLeftColorS,
        buttonHoverBorderLeftColorL,
        buttonHoverBorderLeftColorA,
        buttonFocusBackgroundH,
        buttonFocusBackgroundS,
        buttonFocusBackgroundL,
        buttonFocusBackgroundA,
        buttonFocusBorderTopColorH,
        buttonFocusBorderTopColorS,
        buttonFocusBorderTopColorL,
        buttonFocusBorderTopColorA,
        buttonFocusBorderRightColorH,
        buttonFocusBorderRightColorS,
        buttonFocusBorderRightColorL,
        buttonFocusBorderRightColorA,
        buttonFocusBorderBottomColorH,
        buttonFocusBorderBottomColorS,
        buttonFocusBorderBottomColorL,
        buttonFocusBorderBottomColorA,
        buttonFocusBorderLeftColorH,
        buttonFocusBorderLeftColorS,
        buttonFocusBorderLeftColorL,
        buttonFocusBorderLeftColorA,
        buttonActiveBackgroundH,
        buttonActiveBackgroundS,
        buttonActiveBackgroundL,
        buttonActiveBackgroundA,
        buttonActiveBorderTopColorH,
        buttonActiveBorderTopColorS,
        buttonActiveBorderTopColorL,
        buttonActiveBorderTopColorA,
        buttonActiveBorderRightColorH,
        buttonActiveBorderRightColorS,
        buttonActiveBorderRightColorL,
        buttonActiveBorderRightColorA,
        buttonActiveBorderBottomColorH,
        buttonActiveBorderBottomColorS,
        buttonActiveBorderBottomColorL,
        buttonActiveBorderBottomColorA,
        buttonActiveBorderLeftColorH,
        buttonActiveBorderLeftColorS,
        buttonActiveBorderLeftColorL,
        buttonActiveBorderLeftColorA
    } = useButtonThemeVariables(options);
    const {
        variantBackgroundH,
        variantBackgroundS,
        variantBackgroundL,
        variantBackgroundA,
        variantBorderTopColorH,
        variantBorderTopColorS,
        variantBorderTopColorL,
        variantBorderTopColorA,
        variantBorderRightColorH,
        variantBorderRightColorS,
        variantBorderRightColorL,
        variantBorderRightColorA,
        variantBorderBottomColorH,
        variantBorderBottomColorS,
        variantBorderBottomColorL,
        variantBorderBottomColorA,
        variantBorderLeftColorH,
        variantBorderLeftColorS,
        variantBorderLeftColorL,
        variantBorderLeftColorA,
        variantColorH,
        variantColorS,
        variantColorL,
        variantColorA,
        variantHoverBackgroundH,
        variantHoverBackgroundS,
        variantHoverBackgroundL,
        variantHoverBackgroundA,
        variantHoverBorderTopColorH,
        variantHoverBorderTopColorS,
        variantHoverBorderTopColorL,
        variantHoverBorderTopColorA,
        variantHoverBorderRightColorH,
        variantHoverBorderRightColorS,
        variantHoverBorderRightColorL,
        variantHoverBorderRightColorA,
        variantHoverBorderBottomColorH,
        variantHoverBorderBottomColorS,
        variantHoverBorderBottomColorL,
        variantHoverBorderBottomColorA,
        variantHoverBorderLeftColorH,
        variantHoverBorderLeftColorS,
        variantHoverBorderLeftColorL,
        variantHoverBorderLeftColorA,
        variantFocusBackgroundH,
        variantFocusBackgroundS,
        variantFocusBackgroundL,
        variantFocusBackgroundA,
        variantFocusBorderTopColorH,
        variantFocusBorderTopColorS,
        variantFocusBorderTopColorL,
        variantFocusBorderTopColorA,
        variantFocusBorderRightColorH,
        variantFocusBorderRightColorS,
        variantFocusBorderRightColorL,
        variantFocusBorderRightColorA,
        variantFocusBorderBottomColorH,
        variantFocusBorderBottomColorS,
        variantFocusBorderBottomColorL,
        variantFocusBorderBottomColorA,
        variantFocusBorderLeftColorH,
        variantFocusBorderLeftColorS,
        variantFocusBorderLeftColorL,
        variantFocusBorderLeftColorA,
        variantActiveBackgroundH,
        variantActiveBackgroundS,
        variantActiveBackgroundL,
        variantActiveBackgroundA,
        variantActiveBorderTopColorH,
        variantActiveBorderTopColorS,
        variantActiveBorderTopColorL,
        variantActiveBorderTopColorA,
        variantActiveBorderRightColorH,
        variantActiveBorderRightColorS,
        variantActiveBorderRightColorL,
        variantActiveBorderRightColorA,
        variantActiveBorderBottomColorH,
        variantActiveBorderBottomColorS,
        variantActiveBorderBottomColorL,
        variantActiveBorderBottomColorA,
        variantActiveBorderLeftColorH,
        variantActiveBorderLeftColorS,
        variantActiveBorderLeftColorL,
        variantActiveBorderLeftColorA
    } = setExportsNamespace(useButtonColorVariables(variant, options), 'variant');

    selector(
        `.button.-${variant}`,
        {
            [toVariableKey(buttonBorderTopColorH)]: ref(variantBorderTopColorH),
            [toVariableKey(buttonBorderTopColorS)]: ref(variantBorderTopColorS),
            [toVariableKey(buttonBorderTopColorL)]: ref(variantBorderTopColorL),
            [toVariableKey(buttonBorderTopColorA)]: ref(variantBorderTopColorA),
            [toVariableKey(buttonBorderRightColorH)]: ref(variantBorderRightColorH),
            [toVariableKey(buttonBorderRightColorS)]: ref(variantBorderRightColorS),
            [toVariableKey(buttonBorderRightColorL)]: ref(variantBorderRightColorL),
            [toVariableKey(buttonBorderRightColorA)]: ref(variantBorderRightColorA),
            [toVariableKey(buttonBorderBottomColorH)]: ref(variantBorderBottomColorH),
            [toVariableKey(buttonBorderBottomColorS)]: ref(variantBorderBottomColorS),
            [toVariableKey(buttonBorderBottomColorL)]: ref(variantBorderBottomColorL),
            [toVariableKey(buttonBorderBottomColorA)]: ref(variantBorderBottomColorA),
            [toVariableKey(buttonBorderLeftColorH)]: ref(variantBorderLeftColorH),
            [toVariableKey(buttonBorderLeftColorS)]: ref(variantBorderLeftColorS),
            [toVariableKey(buttonBorderLeftColorL)]: ref(variantBorderLeftColorL),
            [toVariableKey(buttonBorderLeftColorA)]: ref(variantBorderLeftColorA),
            [toVariableKey(buttonBackgroundH)]: ref(variantBackgroundH),
            [toVariableKey(buttonBackgroundS)]: ref(variantBackgroundS),
            [toVariableKey(buttonBackgroundL)]: ref(variantBackgroundL),
            [toVariableKey(buttonBackgroundA)]: ref(variantBackgroundA),
            [toVariableKey(buttonColorH)]: ref(variantColorH),
            [toVariableKey(buttonColorS)]: ref(variantColorS),
            [toVariableKey(buttonColorL)]: ref(variantColorL),
            [toVariableKey(buttonColorA)]: ref(variantColorA),
            [toVariableKey(buttonHoverBorderTopColorH)]: ref(variantHoverBorderTopColorH),
            [toVariableKey(buttonHoverBorderTopColorS)]: ref(variantHoverBorderTopColorS),
            [toVariableKey(buttonHoverBorderTopColorL)]: ref(variantHoverBorderTopColorL),
            [toVariableKey(buttonHoverBorderTopColorA)]: ref(variantHoverBorderTopColorA),
            [toVariableKey(buttonHoverBorderRightColorH)]: ref(variantHoverBorderRightColorH),
            [toVariableKey(buttonHoverBorderRightColorS)]: ref(variantHoverBorderRightColorS),
            [toVariableKey(buttonHoverBorderRightColorL)]: ref(variantHoverBorderRightColorL),
            [toVariableKey(buttonHoverBorderRightColorA)]: ref(variantHoverBorderRightColorA),
            [toVariableKey(buttonHoverBorderBottomColorH)]: ref(variantHoverBorderBottomColorH),
            [toVariableKey(buttonHoverBorderBottomColorS)]: ref(variantHoverBorderBottomColorS),
            [toVariableKey(buttonHoverBorderBottomColorL)]: ref(variantHoverBorderBottomColorL),
            [toVariableKey(buttonHoverBorderBottomColorA)]: ref(variantHoverBorderBottomColorA),
            [toVariableKey(buttonHoverBorderLeftColorH)]: ref(variantHoverBorderLeftColorH),
            [toVariableKey(buttonHoverBorderLeftColorS)]: ref(variantHoverBorderLeftColorS),
            [toVariableKey(buttonHoverBorderLeftColorL)]: ref(variantHoverBorderLeftColorL),
            [toVariableKey(buttonHoverBorderLeftColorA)]: ref(variantHoverBorderLeftColorA),
            [toVariableKey(buttonHoverBackgroundH)]: ref(variantHoverBackgroundH),
            [toVariableKey(buttonHoverBackgroundS)]: ref(variantHoverBackgroundS),
            [toVariableKey(buttonHoverBackgroundL)]: ref(variantHoverBackgroundL),
            [toVariableKey(buttonHoverBackgroundA)]: ref(variantHoverBackgroundA),
            [toVariableKey(buttonFocusBorderTopColorH)]: ref(variantFocusBorderTopColorH),
            [toVariableKey(buttonFocusBorderTopColorS)]: ref(variantFocusBorderTopColorS),
            [toVariableKey(buttonFocusBorderTopColorL)]: ref(variantFocusBorderTopColorL),
            [toVariableKey(buttonFocusBorderTopColorA)]: ref(variantFocusBorderTopColorA),
            [toVariableKey(buttonFocusBorderRightColorH)]: ref(variantFocusBorderRightColorH),
            [toVariableKey(buttonFocusBorderRightColorS)]: ref(variantFocusBorderRightColorS),
            [toVariableKey(buttonFocusBorderRightColorL)]: ref(variantFocusBorderRightColorL),
            [toVariableKey(buttonFocusBorderRightColorA)]: ref(variantFocusBorderRightColorA),
            [toVariableKey(buttonFocusBorderBottomColorH)]: ref(variantFocusBorderBottomColorH),
            [toVariableKey(buttonFocusBorderBottomColorS)]: ref(variantFocusBorderBottomColorS),
            [toVariableKey(buttonFocusBorderBottomColorL)]: ref(variantFocusBorderBottomColorL),
            [toVariableKey(buttonFocusBorderBottomColorA)]: ref(variantFocusBorderBottomColorA),
            [toVariableKey(buttonFocusBorderLeftColorH)]: ref(variantFocusBorderLeftColorH),
            [toVariableKey(buttonFocusBorderLeftColorS)]: ref(variantFocusBorderLeftColorS),
            [toVariableKey(buttonFocusBorderLeftColorL)]: ref(variantFocusBorderLeftColorL),
            [toVariableKey(buttonFocusBorderLeftColorA)]: ref(variantFocusBorderLeftColorA),
            [toVariableKey(buttonFocusBackgroundH)]: ref(variantFocusBackgroundH),
            [toVariableKey(buttonFocusBackgroundS)]: ref(variantFocusBackgroundS),
            [toVariableKey(buttonFocusBackgroundL)]: ref(variantFocusBackgroundL),
            [toVariableKey(buttonFocusBackgroundA)]: ref(variantFocusBackgroundA),
            [toVariableKey(buttonActiveBorderTopColorH)]: ref(variantActiveBorderTopColorH),
            [toVariableKey(buttonActiveBorderTopColorS)]: ref(variantActiveBorderTopColorS),
            [toVariableKey(buttonActiveBorderTopColorL)]: ref(variantActiveBorderTopColorL),
            [toVariableKey(buttonActiveBorderTopColorA)]: ref(variantActiveBorderTopColorA),
            [toVariableKey(buttonActiveBorderRightColorH)]: ref(variantActiveBorderRightColorH),
            [toVariableKey(buttonActiveBorderRightColorS)]: ref(variantActiveBorderRightColorS),
            [toVariableKey(buttonActiveBorderRightColorL)]: ref(variantActiveBorderRightColorL),
            [toVariableKey(buttonActiveBorderRightColorA)]: ref(variantActiveBorderRightColorA),
            [toVariableKey(buttonActiveBorderBottomColorH)]: ref(variantActiveBorderBottomColorH),
            [toVariableKey(buttonActiveBorderBottomColorS)]: ref(variantActiveBorderBottomColorS),
            [toVariableKey(buttonActiveBorderBottomColorL)]: ref(variantActiveBorderBottomColorL),
            [toVariableKey(buttonActiveBorderBottomColorA)]: ref(variantActiveBorderBottomColorA),
            [toVariableKey(buttonActiveBorderLeftColorH)]: ref(variantActiveBorderLeftColorH),
            [toVariableKey(buttonActiveBorderLeftColorS)]: ref(variantActiveBorderLeftColorS),
            [toVariableKey(buttonActiveBorderLeftColorL)]: ref(variantActiveBorderLeftColorL),
            [toVariableKey(buttonActiveBorderLeftColorA)]: ref(variantActiveBorderLeftColorA),
            [toVariableKey(buttonActiveBackgroundH)]: ref(variantActiveBackgroundH),
            [toVariableKey(buttonActiveBackgroundS)]: ref(variantActiveBackgroundS),
            [toVariableKey(buttonActiveBackgroundL)]: ref(variantActiveBackgroundL),
            [toVariableKey(buttonActiveBackgroundA)]: ref(variantActiveBackgroundA)
        },
        options
    );
}

/**
 * Composables
 */

export function useButtonThemeSizes(sizes: ButtonSizeVariant[], options: DefinitionOptions) {
    sizes.forEach((size) => useButtonThemeSizeSelectors(size, options));
}

export function useButtonThemeColors(colors: ButtonColorVariant[], options: DefinitionOptions) {
    colors.forEach((color) => useButtonThemeColorSelectors(color, options));
}

export function useButtonTheme(options: DefinitionOptions) {
    useButtonThemeVariables(options);
    useButtonThemeLayout(options);
    useButtonThemeBaseSelectors(options);
    useButtonThemeSizes([...defaultButtonSizes], options);
    useButtonThemeColors([...defaultButtonColors], options);
    useButtonThemeVariantsSelectors(options);
}
