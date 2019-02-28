import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {Size} from "./constants/size";
import {MonochromeVariants} from "./constants/variants";

export declare class IProgress implements ClassesProviderMixin, SizePropertyMixin, VariantPropertyMixin {
    size: Size;
    variant: MonochromeVariants;

    classes(): Array<{ [p: string]: boolean }>;
}