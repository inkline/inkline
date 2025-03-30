import { defaultThemeTemplate, themeTemplate } from './templates';

describe('defaultThemeTemplate', () => {
    it('should return only selectors when no variables or utilities are provided', () => {
        const themeSelector = ':root';
        const variables = '';
        const selectors = `body {
    color: white;
}`;
        const utilities = '';

        expect(defaultThemeTemplate(themeSelector, variables, selectors, utilities)).toBe(`body {
    color: white;
}
`);
    });

    it('should return formatted theme with variables, selectors, and utilities', () => {
        const themeSelector = ':root';
        const variables = '--color: black;';
        const selectors = `body {
    color: var(--color);
}`;
        const utilities = `._flex {
    display: flex;
}`;

        expect(defaultThemeTemplate(themeSelector, variables, selectors, utilities)).toBe(`:root {
    --color: black;
}

body {
    color: var(--color);
}

._flex {
    display: flex;
}
`);
    });

    it('should return empty string when no variables or selectors are provided', () => {
        const themeSelector = ':root';
        const variables = '';
        const selectors = '';
        const utilities = '';

        expect(defaultThemeTemplate(themeSelector, variables, selectors, utilities)).toBe('');
    });
});

describe('themeTemplate', () => {
    it('should indent selectors and utilities correctly', () => {
        const themeSelector = '.indented-theme';
        const variables = `--color: blue;`;
        const selectors = `body {
    color: var(--color);
}`;
        const utilities = `._flex {
    display: flex;
}`;

        expect(themeTemplate(themeSelector, variables, selectors, utilities))
            .toBe(`.indented-theme {
    ${variables}

    body {
        color: var(--color);
    }

    ._flex {
        display: flex;
    }
}
`);
    });

    it('should handle theme with selectors only', () => {
        const themeSelector = '.no-vars-theme';
        const variables = '';
        const selectors = 'body { background-color: grey; }';
        const utilities = '';

        expect(themeTemplate(themeSelector, variables, selectors, utilities)).toBe(
            '.no-vars-theme {\n    body { background-color: grey; }\n}\n'
        );
    });

    it('should handle theme with utilities only', () => {
        const themeSelector = '.no-vars-theme';
        const variables = '';
        const selectors = '';
        const utilities = '._flex { display: flex; }';

        expect(themeTemplate(themeSelector, variables, selectors, utilities)).toBe(
            '.no-vars-theme {\n    ._flex { display: flex; }\n}\n'
        );
    });

    it('should handle theme with no selectors', () => {
        const themeSelector = '.no-selectors-theme';
        const variables = '--background-color: grey;';
        const selectors = '';
        const utilities = '';

        expect(themeTemplate(themeSelector, variables, selectors, utilities))
            .toEqual(`${themeSelector} {
    ${variables}
}
`);
    });

    it('should return empty theme structure when no variables or selectors are provided', () => {
        const themeSelector = '.empty-theme';
        const variables = '';
        const selectors = '';
        const utilities = '';

        expect(themeTemplate(themeSelector, variables, selectors, utilities)).toBe('');
    });
});
