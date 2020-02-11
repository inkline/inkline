import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {MonochromeVariants} from "./constants/variants";

export declare class IHamburgerMenu implements VariantPropertyMixin {
    active?: boolean;
    animation?: string;
    variant?: MonochromeVariants;
}
