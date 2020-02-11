import {MonochromeVariants} from "./constants/variants";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";

export declare class ILoader implements SizePropertyMixin, VariantPropertyMixin {
    count?: boolean;
    size?: Size;
    variant?: MonochromeVariants;
}
