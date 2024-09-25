import { defaultThemeTemplate, themeTemplate } from './templates';

describe('defaultThemeTemplate', () => {
    it('should return only selectors when no variables are provided', () => {
        const themeSelector = ':root';
        const variables = '';
        const selectors = `body {
    color: white;
}`;

        expect(defaultThemeTemplate(themeSelector, variables, selectors)).toBe(`body {
    color: white;
}
`);
    });

    it('should return formatted theme with variables and selectors', () => {
        const themeSelector = ':root';
        const variables = '--color: black;';
        const selectors = `body {
    color: var(--color);
}`;

        expect(defaultThemeTemplate(themeSelector, variables, selectors)).toBe(`:root {
    --color: black;
}

body {
    color: var(--color);
}
`);
    });

    it('should return empty string when no variables or selectors are provided', () => {
        const themeSelector = ':root';
        const variables = '';
        const selectors = '';

        expect(defaultThemeTemplate(themeSelector, variables, selectors)).toBe('');
    });
});

describe('themeTemplate', () => {
    it('should indent selectors correctly', () => {
        const themeSelector = '.indented-theme';
        const variables = `--color: blue;`;
        const selectors = `body {
    color: var(--color);
}`;

        expect(themeTemplate(themeSelector, variables, selectors)).toBe(`.indented-theme {
    ${variables}

    body {
        color: var(--color);
    }
}
`);
    });

    it('should handle theme with no variables', () => {
        const themeSelector = '.no-vars-theme';
        const variables = '';
        const selectors = 'body { background-color: grey; }';

        expect(themeTemplate(themeSelector, variables, selectors)).toBe(
            '.no-vars-theme {\n    body { background-color: grey; }\n}\n'
        );
    });

    it('should handle theme with no selectors', () => {
        const themeSelector = '.no-selectors-theme';
        const variables = '--background-color: grey;';
        const selectors = '';

        expect(themeTemplate(themeSelector, variables, selectors)).toEqual(`${themeSelector} {
    ${variables}
}
`);
    });

    it('should return empty theme structure when no variables or selectors are provided', () => {
        const themeSelector = '.empty-theme';
        const variables = '';
        const selectors = '';

        expect(themeTemplate(themeSelector, variables, selectors)).toBe('');
    });
});
