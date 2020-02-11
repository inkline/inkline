import { ILinkable } from "./Linkable";
import { Variants } from "./constants/variants";
import { LoadingPropertyMixin } from "./mixins/components/properties/LoadingPropertyMixin";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { TabIndexPropertyMixin } from "./mixins/components/properties/TabIndexPropertyMixin";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";
import { DisabledPropertyMixin } from "./mixins/forms/properties/DisabledPropertyMixin";
import { Size } from "./constants/size";

export declare class IButton extends ILinkable implements DisabledPropertyMixin, LoadingPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin, VariantPropertyMixin {
    block?: boolean;
    circle?: boolean;
    link?: boolean;
    outline?: boolean;
    tag?: string;
    disabled?: boolean;
    loading?: boolean;
    size?: Size;
    tabindex?: number | string;
    variant?: Variants;
}
