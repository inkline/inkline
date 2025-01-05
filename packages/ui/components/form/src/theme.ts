import { selector } from '@inkline/core';

export function useFormThemeLayout(options: DefinitionOptions
)
{
    selector('.form', {
        position: 'relative'
    });
}

export function useFormTheme(options: DefinitionOptions
)
{
    useFormThemeLayout(options);
}
