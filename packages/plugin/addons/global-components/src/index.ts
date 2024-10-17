import { InklineAddon } from '@inkline/types';

export const globalComponentsAddon: InklineAddon = (app, options) => {
    for (const componentIndex in options.value.components) {
        app.component(componentIndex, options.value.components[componentIndex]);
    }
};

export default globalComponentsAddon;
