import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {Size} from "./constants/size";

export declare class INav implements SizePropertyMixin {
    tabs?: boolean;
    vertical?: boolean;
    size?: Size;
}
