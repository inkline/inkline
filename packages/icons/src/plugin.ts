import { Plugin } from 'vue';
import { IconController } from "./controllers";
import { Svg } from './types';
import { IIcon } from "./components";

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

export default InklineIcons;
