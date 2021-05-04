export class IconController {
    static add(name, icon) {
        IconController.icons[name] = icon;
    }
    static addMultiple(icons) {
        Object.keys(icons).forEach((iconName) => {
            IconController.icons[iconName] = icons[iconName];
        });
    }
}
IconController.icons = {};
export default IconController;
//# sourceMappingURL=IconController.js.map