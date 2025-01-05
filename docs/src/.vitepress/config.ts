import { defineConfig } from 'vitepress';
import inkline from '@inkline/vite';
import { resolve } from 'path';
import Container from 'markdown-it-container';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Inkline',
    description: 'UI UX DX Vue.js Library',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
    },
    vite: {
        plugins: [
            inkline({
                outputDir: resolve(__dirname, 'theme', 'css', 'inkline')
            })
        ]
        // resolve: {
        //     alias: [
        //         {
        //             find: /^.*\/VPButton\.vue$/,
        //             replacement: fileURLToPath(
        //                 new URL('./theme/components/Button.vue', import.meta.url)
        //             )
        //         }
        //     ]
        // }
    },
    markdown: {
        config: (md) => {
            const infoRegEx = /^\s*info\s+(.*)$/;
            md.use(Container, 'info', {
                validate: (params) => params.trim().match(infoRegEx),
                render: (tokens, idx) => {
                    const m = tokens[idx].info.trim().match(infoRegEx);

                    console.log({ token: tokens[idx] });

                    return tokens[idx].nesting === 1
                        ? `<div class="alert -info"><strong>${m[1]}</strong>`
                        : '</div>\n';
                }
            });
        }
    }
});
