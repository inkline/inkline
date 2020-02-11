import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";

export declare class ISelectOption implements DisabledPropertyMixin {
    value: string;
    label?: string;
    disabled?: boolean;
}
