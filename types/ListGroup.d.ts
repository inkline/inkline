import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {Size} from "./constants/size";

export declare class IListGroup implements ClassesProviderMixin, SizePropertyMixin {
    bordered: boolean;
    size: Size;
    classes(): Array<{ [p: string]: boolean }>;
}