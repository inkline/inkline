import { IconController } from "./controllers";
import { IIcon } from "./components";
export const InklineIcons = {
    install(app, options = {}) {
        app.component(IIcon.name, IIcon);
        Object.keys(options).forEach((iconName) => {
            IconController.add(iconName, options[iconName]);
        });
    }
};
export default InklineIcons;
//# sourceMappingURL=plugin.js.map