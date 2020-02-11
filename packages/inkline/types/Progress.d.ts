import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {Size} from "./constants/size";
import {MonochromeVariants} from "./constants/variants";

export declare class IProgress implements SizePropertyMixin, VariantPropertyMixin {
    size?: Size;
    variant?: MonochromeVariants;
}
