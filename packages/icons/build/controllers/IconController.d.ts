import { INode as Svg } from "svgson";
export declare class IconController {
    static icons: {
        [key: string]: Svg;
    };
    static add(name: string, icon: Svg): void;
    static addMultiple(icons: {
        [key: string]: Svg;
    }): void;
}
export default IconController;
