import { ILinkable } from "./Linkable";
import { Size } from "./constants/size";
import {EmitProviderMixin} from "./mixins/components/providers/EmitProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";

export declare class IDropdownItem extends ILinkable implements DisabledPropertyMixin, TabIndexPropertyMixin, ClassesProviderMixin, EmitProviderMixin {
    action: string | number | boolean;
    onClick (): void;

    disabled: boolean;
    tabindex: number | string;
    broadcast(parentComponentName: string, eventName: string, params: any): void;
    classes(): Array<{ [p: string]: boolean }>;
    dispatch(childComponentName: string, eventName: string, params: any): void;
    isDisabled(): boolean;
    tabIndex(): number | string;
}