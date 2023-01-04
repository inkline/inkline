import addons from '@storybook/addons';
import { app } from '@storybook/vue3';
import { defineComponent, h, markRaw, computed } from 'vue';
import { light, dark } from './theme';
import { Inkline, components } from '../src/inkline';
import '../src/inkline.scss';
import './preview.scss';

const RouterLink = defineComponent({
    props: {
        to: {
            type: [String, Object]
        },
        href: {
            type: String
        }
    },
    setup(props, { slots }) {
        const href = computed(() => {
            if (props.to) {
                if (typeof props.to === 'string') {
                    return props.to;
                }

                return props.to.name ? `/${props.to.name.replace('-', '/')}` : props.to.path;
            }

            return props.href;
        });

        function onClick(event) {
            event.preventDefault();
        }

        return () => h('a', { href: href.value, onClick }, slots.default());
    }
});

app.use(Inkline, {
    components,
    routerComponent: markRaw(RouterLink)
});

addons.getChannel().on('DARK_MODE', (isDarkMode) => {
    app.config.globalProperties.$inkline.options.colorMode = isDarkMode ? 'dark' : 'light';
});

export const parameters = {
    actions: {
        argTypesRegex: '^on[A-Z].*'
    },
    controls: {
        matchers: {
            date: /Date$/
        }
    },
    darkMode: {
        stylePreview: true,
        dark,
        light
    }
};
