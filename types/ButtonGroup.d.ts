import { DisabledPropertyMixin } from "./mixins/forms/properties/DisabledPropertyMixin";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { TabIndexPropertyMixin } from "./mixins/components/properties/TabIndexPropertyMixin";
import { Size } from "./constants/size";

export declare class IButtonGroup implements DisabledPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    vertical: boolean;
    disabled: boolean;
    size: Size;
    tabindex: number | string;
}
