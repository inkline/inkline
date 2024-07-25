import { inject } from 'vue';
import { InklineKey } from '@inkline/inkline/constants';
import { createSchema } from '@inkline/inkline/validation';

export function useInkline() {
    return inject(InklineKey, {
        form: createSchema,
        setLocale: () => {},
        options: {
            locale: 'en',
            validateOn: ['input', 'change'],
            routerComponent: undefined,
            color: 'light',
            size: 'md',
            componentOptions: {},
            colorMode: 'system',
            colorModeStrategy: 'localStorage'
        }
    });
}
