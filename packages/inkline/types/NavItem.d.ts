import {ILinkable} from "./Linkable";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";

export declare class INavItem extends ILinkable implements DisabledPropertyMixin {
    disabled?: boolean;
    tag?: string;
}
