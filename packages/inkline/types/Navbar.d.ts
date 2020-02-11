import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {Size} from "./constants/size";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {Breakpoint} from "./constants/breakpoint";
import {MonochromeVariants} from "./constants/variants";

export declare class INavbar implements SizePropertyMixin, VariantPropertyMixin {
    collapse?: Breakpoint;
    collapseOnClick?: boolean;
    collapseOnClickOutside?: boolean;
    fluid?: boolean;
    toggleAnimation?: string;
    size?: Size;
    variant?: MonochromeVariants;
}
