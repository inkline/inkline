import type { InklineAddon, InklineOptions } from '@inkline/types';

export function globalComponentsAddon(components: InklineOptions['components']): InklineAddon {
    return (app) => {
        for (const componentIndex in components) {
            app.component(componentIndex, components[componentIndex]);
        }
    };
}

export default globalComponentsAddon;
