import path from 'path';;
import vue from '@vitejs/plugin-vue';
import markdown from 'vite-plugin-md';

const html = () => ({
    name: 'vue-i18n',
    test: ({ path }) => path.endsWith('.html'),
    transform (code, id) {
        if (/\.html$/.test(id)) {
            return `export default ${JSON.stringify(code)}`
        }
    }
});

export default {
    plugins: [
        vue({
            include: [
                /\.vue$/,
                /\.md$/
            ]
        }),
        markdown(),
        html()
    ],
    alias: [
        {
            find: /^@inkline\/inkline\//,
            replacement: `${path.resolve(__dirname)}/`
        }
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/inkline.js'),
            name: 'Inkline'
        },
        rollupOptions: {
            external: ['vue']
        }
    }
}
