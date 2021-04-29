import * as icons from '@inkline/inkline/src/icons/inkline';

export const IconController = {
    icons: {},
    async add(icons) {
        Object.keys(icons).forEach((iconName) => {
            IconController.icons[iconName] = icons[iconName];
        });
    }
};

IconController.add(icons);

export default IconController;

