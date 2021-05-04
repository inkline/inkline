import { IconController } from "./controllers";
import IIcon from "./components/IIcon/index.vue";
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