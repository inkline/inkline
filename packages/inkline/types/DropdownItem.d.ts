import { ILinkable } from "./Linkable";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";

export declare class IDropdownItem extends ILinkable implements DisabledPropertyMixin, TabIndexPropertyMixin {
    action?: string | number | boolean;
    disabled?: boolean;
    tabindex?: number | string;
}
