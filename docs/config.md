## Configuration

### `theme[name]`

The config supports multiple themes.
- The `default` theme variables will be generated directly in the `:root` of your page
- Other themes are defined under a `.${themeName}-theme` class, e.g. `.dark-theme`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            color: {
                primary: '#178ab0'
            }
        },
        dark: {
            color: {
                primary: '#56aecc'
            }
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --color-primary-h: 195deg;
    --color-primary-s: 77%;
    --color-primary-l: 39%;
    --color-primary-a: 1;
    --color-primary: hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), var(--color-primary-a));
}

.dark-theme {
    --color-primary-h: 195deg;
    --color-primary-s: 54%;
    --color-primary-l: 57%;
    --color-primary-a: 1;
    --color-primary: hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), var(--color-primary-a));
}
~~~


### Animation `theme[name].animation`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            animation: {
                duration: '300ms',
                timingFunction: 'ease'
            }
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --transition-duration: 300ms;
    --transition-timing-function: ease;
}
~~~


### Box Shadow `theme[name].boxShadow`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            boxShadow: {
                offsetX: '0',
                offsetY: '0.5rem',
                blurRadius: '1rem',
                spreadRadius: '-0.75rem',
                color: 'rgba(0, 0, 0, 0.15)'
            }
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --box-shadow-offset-x: 0;
    --box-shadow-offset-y: 0.5rem;
    --box-shadow-blur-radius: 1rem;
    --box-shadow-spread-radius: -0.75rem;
    --box-shadow-color: rgba(0, 0, 0, 0.15);
    --box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-spread-radius) var(--box-shadow-color);
}
~~~

### Breakpoints `theme[name].breakpoints`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            breakpoints: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
                '2xl': 1400
            }
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --breakpoint-xs: 0px;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --breakpoint-2xl: 1400px;
}
~~~

### Color `theme[name].color`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            color: {
                gray: '#8e9fa4',
                dark: 'var(--color-gray)',
            }
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --color-gray-h: 193.63636363636363;
    --color-gray-s: 10.784313725490199%;
    --color-gray-l: 60.00000000000001%;
    --color-gray-a: 1;
    --color-gray: hsla(var(--color-gray-h), var(--color-gray-s), var(--color-gray-l), var(--color-gray-a));

    --color-dark-h: var(--color-gray-h);
    --color-dark-s: var(--color-gray-s);
    --color-dark-l: var(--color-gray-l);
    --color-dark-a: var(--color-gray-a);
    --color-dark: hsla(var(--color-dark-h), var(--color-dark-s), var(--color-dark-l), var(--color-dark-a));
}
~~~

You can also define colors as HSLA or RGB.

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            color: {
                primary: {
                    h: 86,
                    s: 175,
                    l: 205,
                    a: 1
                },
                secondary: {
                    r: 195,
                    g: 54,
                    b: 57,
                    a: 1
                },
            }
        }
    }
});
~~~

### Color `theme[name].margin`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            margin: '1rem'
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --margin-top: 1rem;
    --margin-right: 1rem;
    --margin-bottom: 1rem;
    --margin-left: 1rem;
    --margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);
}
~~~

Margin sides can also be specified individually, or as an array of values.

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            margin: {
                top: '1rem',
                right: '1rem',
                bottom: '1rem',
                left: '1rem'
            }
        }
    }
});
~~~

### Color `theme[name].padding`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            padding: '1rem'
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --padding-top: 1rem;
    --padding-right: 1rem;
    --padding-bottom: 1rem;
    --padding-left: 1rem;
    --padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
}
~~~

Padding sides can also be specified individually, or as an array of values.

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            padding: {
                top: '1rem',
                right: '1rem',
                bottom: '1rem',
                left: '1rem'
            }
        }
    }
});
~~~

### Border `theme[name].border`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            border: '1px solid #c4cdd0'
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --border-top-width: 1px;
    --border-right-width: 1px;
    --border-bottom-width: 1px;
    --border-left-width: 1px;
    --border-width: var(--border-top-width) var(--border-right-width) var(--border-bottom-width) var(--border-left-width);
    --border-top-style: solid;
    --border-right-style: solid;
    --border-bottom-style: solid;
    --border-left-style: solid;
    --border-style: var(--border-top-style) var(--border-right-style) var(--border-bottom-style) var(--border-left-style);
    --border-top-color: #c4cdd0;
    --border-right-color: #c4cdd0;
    --border-bottom-color: #c4cdd0;
    --border-left-color: #c4cdd0;
    --border-color: var(--border-top-color) var(--border-right-color) var(--border-bottom-color) var(--border-left-color);
}
~~~

Border sides can also be specified individually as strings or objects.

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            border: {
                top: {
                    width: '1px',
                    style: 'solid',
                    color: '#c4cdd0'
                },
                right: '1px solid #c4cdd0',
                bottom: '1px solid #c4cdd0',
                left: '1px solid #c4cdd0'
            }
        }
    }
});
~~~

### Border Radius `theme[name].borderRadius`

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            borderRadius: '4px'
        }
    }
});
~~~

**Output**:

~~~scss
:root {
    --border-top-left-radius: 4px;
    --border-top-right-radius: 4px;
    --border-bottom-right-radius: 4px;
    --border-bottom-left-radius: 4px;
    --border-radius: var(--border-top-left-radius) var(--border-top-right-radius) var(--border-bottom-right-radius) var(--border-bottom-left-radius);
}
~~~

Border radius corners can also be specified individually, or as an array of values.

~~~ts
import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        default: {
            borderRadius: {
                topLeft: '4px',
                topRight: '4px',
                bottomRight: '4px',
                bottomLeft: '4px',
            }
        }
    }
});
~~~
