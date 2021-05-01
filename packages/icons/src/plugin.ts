import { Plugin } from 'vue';
import { IconController } from "./controllers";
import { IIcon } from "./components";
import { Svg } from './types';

export interface PluginOptions {
    [key: string]: Svg;
}

export const InklineIcons: Plugin = {
    install(app, options: PluginOptions = {}) {
        app.component(IIcon.name, IIcon);

        Object.keys(options).forEach((iconName: string) => {
            IconController.add(iconName, options[iconName]);
        });
    }
};
