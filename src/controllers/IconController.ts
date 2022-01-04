import { SvgNode } from '@inkline/inkline/types';

export interface IIconController {
    icons: { [key: string]: SvgNode };
    add(name: string, icon: SvgNode): void;
    addMultiple(icons: { [key: string]: SvgNode }): void;
}

export const IconController: IIconController = {
    icons: {},
    add (name, icon) {
        IconController.icons[name] = icon;
    },
    addMultiple (icons) {
        Object.keys(icons).forEach((iconName) => {
            IconController.icons[iconName] = icons[iconName];
        });
    }
};

export default IconController;
