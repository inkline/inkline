import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";
import {BrandVariants, MonochromeVariants, StateVariants} from "./constants/variants";
import {Size} from "./constants/size";

export declare class IModal implements SizePropertyMixin, VariantPropertyMixin, DisabledPropertyMixin {
    transition: string;
    closeOnPressEscape: boolean;
    showClose: boolean;
    value: boolean;
    disabled: boolean;
    size: Size;
    variant: BrandVariants | MonochromeVariants | StateVariants;
}
