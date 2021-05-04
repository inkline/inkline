import { INode as Svg } from "svgson";

export class IconController {
    static icons: { [key: string]: Svg } = {};

    static add(name: string, icon: Svg): void {
        IconController.icons[name] = icon;
    }

    static addMultiple(icons: { [key: string]: Svg }): void {
        Object.keys(icons).forEach((iconName) => {
            IconController.icons[iconName] = icons[iconName];
        });
    }
}

export default IconController;
