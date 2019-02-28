import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {Size} from "./constants/size";

export declare class IHeader implements ClassesProviderMixin, SizePropertyMixin {
    cover: boolean;
    fluid: boolean;
    fullscreen: boolean;

    size: Size;
    classes(): Array<{ [p: string]: boolean }>;
}