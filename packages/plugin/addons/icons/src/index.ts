import { IconDefinition, InklineAddon, InklineOptions } from '@inkline/types';

export function iconsAddon(
    addonOptions?: Omit<InklineOptions['icons'], 'definitions'> & {
        definitions: IconDefinition[];
    }
): InklineAddon {
    return (_app, options) => {
        if (typeof window === 'undefined' || !addonOptions) return;

        if (addonOptions.component) {
            options.value.icons.component = addonOptions.component;
        }

        (addonOptions.definitions ?? []).forEach((icon) => {
            const key = `${icon.prefix}:${icon.name}`;
            options.value.icons.definitions[key] = icon;
        });
    };
}

export default iconsAddon;
