export const manifest = {
    name: 'typography',
    css: {
        variables: [
            {
                name: 'font-family-primary--base',
                value: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif',
                description: 'The primary base font-family used for body text throughout the application'
            },
            {
                name: 'font-family-primary--monospace',
                value: '\'SFMono-Regular\', Menlo, Monaco, Consolas, \'Liberation Mono\', \'Courier New\', monospace',
                description: 'The primary monospace font-family used for code throughout the application'
            },
            {
                name: 'font-family-primary--print',
                value: '\'Georgia\', \'Times New Roman\', \'Times\', serif',
                description: 'The primary print font-family used for printing throughout the application'
            },
            {
                name: 'font-family-secondary--base',
                value: 'var(--font-family-primary--base)',
                description: 'The secondary base font-family used for body text throughout the application headings'
            },
            {
                name: 'font-family-secondary--monospace',
                value: 'var(--font-family-primary--monospace)',
                description: 'The secondary monospace font-family used for code throughout the application headings'
            },
            {
                name: 'font-family-secondary--print',
                value: 'var(--font-family-primary--print)',
                description: 'The secondary print font-family used for printing throughout the application headings'
            },
            {
                name: 'letter-spacing',
                value: '0',
                description: 'The letter spacing of the application text'
            },
            {
                name: 'font-size',
                value: '1rem',
                description: 'The base font size of the application text'
            },
            {
                name: 'font-size--xs',
                value: 'calc(var(--font-size) * var(--size-multiplier--xs))',
                description: 'The extra-small font size variant of the application text'
            },
            {
                name: 'font-size--sm',
                value: 'calc(var(--font-size) * var(--size-multiplier--sm))',
                description: 'The small font size variant of the application text'
            },
            {
                name: 'font-size--md',
                value: 'calc(var(--font-size) * var(--size-multiplier--md))',
                description: 'The medium font size variant of the application text'
            },
            {
                name: 'font-size--lg',
                value: 'calc(var(--font-size) * var(--size-multiplier--lg))',
                description: 'The large font size variant of the application text'
            },
            {
                name: 'font-size--xl',
                value: 'calc(var(--font-size) * var(--size-multiplier--xl))',
                description: 'The extra-large font size variant of the application text'
            },
            {
                name: 'line-height',
                value: '1.5',
                description: 'The line-height of the application text'
            },
            {
                name: 'text-muted',
                value: 'var(--color--gray-60)',
                description: 'The muted color of the application text'
            },
            {
                name: 'font-weight--extralight',
                value: '200',
                description: 'The extra-light font weight variant of the application text'
            },
            {
                name: 'font-weight--light',
                value: '300',
                description: 'The extra-light font weight variant of the application text'
            },
            {
                name: 'font-weight--normal',
                value: 'normal',
                description: 'The normal font weight variant of the application text'
            },
            {
                name: 'font-weight--semibold',
                value: '600',
                description: 'The semibold font weight variant of the application text'
            },
            {
                name: 'font-weight--bold',
                value: 'bold',
                description: 'The bold font weight variant of the application text'
            },
            {
                name: 'font-weight--black',
                value: '900',
                description: 'The black font weight variant of the application text'
            },
            {
                name: 'font-weight--lighter',
                value: 'lighter',
                description: 'The lighter font weight variant of the application text'
            },
            {
                name: 'font-weight--bolder',
                value: 'bolder',
                description: 'The bolder font weight variant of the application text'
            },
            {
                name: 'h1--font-size',
                value: 'calc(var(--font-size) * var(--scale-ratio--pow-5))',
                description: 'The font size of the application h1 heading'
            },
            {
                name: 'h2--font-size',
                value: 'calc(var(--font-size) * var(--scale-ratio--pow-4))',
                description: 'The font size of the application h2 heading'
            },
            {
                name: 'h3--font-size',
                value: 'calc(var(--font-size) * var(--scale-ratio--pow-3))',
                description: 'The font size of the application h3 heading'
            },
            {
                name: 'h4--font-size',
                value: 'calc(var(--font-size) * var(--scale-ratio--pow-2))',
                description: 'The font size of the application h4 heading'
            },
            {
                name: 'h5--font-size',
                value: 'calc(var(--font-size) * var(--scale-ratio--pow-1))',
                description: 'The font size of the application h5 heading'
            },
            {
                name: 'h6--font-size',
                value: 'var(--font-size)',
                description: 'The font size of the application h6 heading'
            },
            {
                name: 'heading--margin-top',
                value: 'calc(var(--spacing) * 2.5)',
                description: 'The margin-top of the application headings'
            },
            {
                name: 'heading--margin-bottom',
                value: 'var(--spacing)',
                description: 'The margin-bottom of the application headings'
            },
            {
                name: 'heading--font-family',
                value: 'var(--font-family-secondary--base)',
                description: 'The font-family of the application headings'
            },
            {
                name: 'heading--font-weight',
                value: 'var(--font-weight--semibold)',
                description: 'The font-weight of the application headings'
            },
            {
                name: 'heading--line-height',
                value: '1.1',
                description: 'The line-height of the application headings'
            },
            {
                name: 'heading--color',
                value: 'inherit',
                description: 'The color of the application headings'
            },
            {
                name: 'd1--font-size',
                value: 'calc(var(--h1--font-size) * var(--scale-ratio--pow-6))',
                description: 'The font size of the application d1 display'
            },
            {
                name: 'd2--font-size',
                value: 'calc(var(--h1--font-size) * var(--scale-ratio--pow-5))',
                description: 'The font size of the application d2 display'
            },
            {
                name: 'd3--font-size',
                value: 'calc(var(--h1--font-size) * var(--scale-ratio--pow-4))',
                description: 'The font size of the application d3 display'
            },
            {
                name: 'd4--font-size',
                value: 'calc(var(--h1--font-size) * var(--scale-ratio--pow-3))',
                description: 'The font size of the application d4 display'
            },
            {
                name: 'd5--font-size',
                value: 'calc(var(--h1--font-size) * var(--scale-ratio--pow-2))',
                description: 'The font size of the application d5 display'
            },
            {
                name: 'd6--font-size',
                value: 'calc(var(--h1--font-size) * var(--scale-ratio--pow-1))',
                description: 'The font size of the application d6 display'
            },
            {
                name: 'display--font-weight',
                value: 'var(--font-weight--semibold)',
                description: 'The font-weight of the application displays'
            },
            {
                name: 'display--line-height',
                value: '1.1',
                description: 'The line-height of the application displays'
            },
            {
                name: 'link--color',
                value: 'var(--color--primary)',
                description: 'The color of application anchor tags / links'
            },
            {
                name: 'link--color--hover',
                value: 'var(--color--primary-40)',
                description: 'The color of application anchor tags / links when hovered'
            },
            {
                name: 'link--decoration',
                value: 'none',
                description: 'The text decoration of application anchor tags / links'
            },
            {
                name: 'link--decoration--hover',
                value: 'underline',
                description: 'The text decoration of application anchor tags / links when hovered'
            },
            {
                name: 'lead--font-size',
                value: 'var(--font-size--lg)',
                description: 'The font size of application lead text'
            },
            {
                name: 'lead--font-weight',
                value: 'var(--font-weight--light)',
                description: 'The font weight of application lead text'
            },
            {
                name: 'list--item--padding--inline',
                value: 'var(--spacing)',
                description: 'The padding of inline list items'
            },
            {
                name: 'list--item--margin-bottom',
                value: 'var(--spacing)',
                description: 'The margin-bottom of list items'
            },
            {
                name: 'dt--font-weight',
                value: 'var(--font-weight--bold)',
                description: 'The font-weight of description list titles'
            },
            {
                name: 'small--font-size',
                value: 'var(--font-size--sm)',
                description: 'The font-size of small elements'
            },
            {
                name: 'small--font-weight',
                value: 'var(--font-weight--normal)',
                description: 'The font-weight of small elements'
            },
            {
                name: 'blockquote--footer--color',
                value: 'var(--color--gray-60)',
                description: 'The text color of the blockquote footer'
            },
            {
                name: 'blockquote--font-size',
                value: 'var(--font-size--lg)',
                description: 'The font size of the blockquote element'
            },
            {
                name: 'blockquote--border',
                value: '3px solid var(--color--gray-30)',
                description: 'The border of the blockquote element'
            },
            {
                name: 'blockquote--margin',
                value: 'var(--spacing)',
                description: 'The margin of the blockquote element'
            },
            {
                name: 'blockquote--padding--bordered',
                value: 'var(--spacing)',
                description: 'The padding of the blockquote element bordered variant'
            },
            {
                name: 'hr--border-color',
                value: 'hsla(var(--color--black--h), var(--color--black--s), var(--color--black--l), 0.1)',
                description: 'The border-color of the horizontal rule element'
            },
            {
                name: 'hr--border-width',
                value: 'var(--border-top-width)',
                description: 'The border-width of the horizontal rule element'
            },
            {
                name: 'hr--border-style',
                value: 'var(--border-style)',
                description: 'The border-style of the horizontal rule element'
            },
            {
                name: 'hr--margin',
                value: 'var(--spacing)',
                description: 'The margin of the horizontal rule element'
            },
            {
                name: 'mark--padding',
                value: '0.2rem 0.4rem',
                description: 'The color of the mark element'
            },
            {
                name: 'mark--color',
                value: 'var(--color--gray-80)',
                description: 'The color of the mark element'
            },
            {
                name: 'mark--background-color',
                value: 'var(--color--yellow-10)',
                description: 'The background color of the mark element'
            },
            {
                name: 'code--font-size',
                value: '90%',
                description: 'The font-size of the code element'
            },
            {
                name: 'code--padding',
                value: '0.15rem 0.4rem',
                description: 'The padding of the code element'
            },
            {
                name: 'code--color',
                value: '#bd4147',
                description: 'The color of the code element'
            },
            {
                name: 'code--background',
                value: 'var(--color--gray-10)',
                description: 'The background of the code element'
            },
            {
                name: 'code--color--dark',
                value: '#ff6d6b',
                description: 'The color of the code element when dark color mode'
            },
            {
                name: 'code--background--dark',
                value: 'var(--color--gray-80)',
                description: 'The background of the code element when dark color mode'
            },
            {
                name: 'kbd--font-size',
                value: 'var(--code--font-size)',
                description: 'The font-size of the kbd element'
            },
            {
                name: 'kbd--box-shadow',
                value: 'inset 0 -0.1rem 0 rgba(0, 0, 0, 0.25)',
                description: 'The box-shadow of the kbd element'
            },
            {
                name: 'kbd--nested-font-weight',
                value: 'var(--font-weight--bold)',
                description: 'The font-weight of the kbd element when nested'
            },
            {
                name: 'kbd--padding',
                value: 'var(--code--padding)',
                description: 'The padding of the kbd element'
            },
            {
                name: 'kbd--color',
                value: 'var(--color--white)',
                description: 'The color of the kbd element'
            },
            {
                name: 'kbd--background',
                value: 'var(--color--gray-90)',
                description: 'The background of the kbd element'
            },
            {
                name: 'pre--font-size',
                value: 'var(--code--font-size)',
                description: 'The font-size of the pre element'
            },
            {
                name: 'pre--color',
                value: 'var(--color--gray-90)',
                description: 'The color of the pre element'
            },
            {
                name: 'pre--background',
                value: 'var(--color--white)',
                description: 'The background of the pre element'
            },
            {
                name: 'pre--scrollable-max-height',
                value: '340px',
                description: 'The max height of the pre element before it becomes scrollable'
            }
        ]
    }
};

export default manifest;
