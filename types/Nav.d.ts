import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {Size} from "./constants/size";

export declare class INav implements ClassesProviderMixin, SizePropertyMixin {
    tabs: boolean;
    vertical: boolean;
    size: Size;

    classes(): Array<{ [p: string]: boolean }>;
}