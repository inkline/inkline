import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        color: {
            red: '#ee1411',
            orange: '#f65809',
            yellow: '#ffbb00',
            green: '#36c989',
            teal: '#49b6ab',
            blue: '#1db1e2',
            purple: '#7559a6',
            pink: '#f20d61',
            white: '#ffffff',
            black: '#000000',
            primary: '<% theme.color.blue %>',
            secondary: '<% theme.color.purple %>',
            info: '<% theme.color.teal %>',
            success: '<% theme.color.green %>',
            warning: '<% theme.color.yellow %>',
            danger: '<% theme.color.red %>'
        },
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #c4cdd0',
        typography: {
            fontFamily: {
                primary: {
                    base: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif',
                    monospace: '\'SFMono-Regular\', Menlo, Monaco, Consolas, \'Liberation Mono\', \'Courier New\', monospace',
                    print: '\'Georgia\', \'Times New Roman\', \'Times\', serif'
                },
                secondary: {
                    base: 'var(--font-family-primary-base)',
                    monospace: 'var(--font-family-primary-monospace)',
                    print: 'var(--font-family-primary-print)'
                }
            },
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: 0
        }
    }
});
