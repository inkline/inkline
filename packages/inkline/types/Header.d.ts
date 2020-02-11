import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {Size} from "./constants/size";

export declare class IHeader implements SizePropertyMixin {
    cover?: boolean;
    fluid?: boolean;
    fullscreen?: boolean;
    size?: Size;
}
