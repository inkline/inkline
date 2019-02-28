import {ILinkable} from "./Linkable";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";

export declare class INavItem extends ILinkable implements ClassesProviderMixin, DisabledPropertyMixin {
    disabled: boolean;

    isDisabled(): boolean;
}