import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';
import { useTabPanelTheme } from '../tab-panel/theme';
import { useTabListTheme } from '../tab-list/theme';
import { useTabTheme } from '../tab/theme';

export function useTabsLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.tabs',
        {
            position: 'relative',
            display: 'block',
            width: '100%'
        },
        options
    );
}

export function useTabsTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useTabsLayoutSelectors(options);
    useTabListTheme(options);
    useTabTheme(options);
    useTabPanelTheme(options);
}
