// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import './css/index.css';
import {
    Inkline,
    components,
    colorModeAddon,
    globalComponentsAddon,
    modalAddon,
    toastAddon
} from 'inkline';
import { Layout } from './components';

export default {
    Layout: () => h(Layout),
    enhanceApp({ app }) {
        app.use(Inkline, {
            addons: [
                colorModeAddon(),
                globalComponentsAddon(components),
                modalAddon(),
                toastAddon()
            ]
        });
    }
} satisfies Theme;
