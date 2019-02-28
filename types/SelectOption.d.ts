import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {EmitProviderMixin} from "./mixins/components/providers/EmitProviderMixin";
import {EmitClickMethodMixin} from "./mixins/components/methods/EmitClickMethodMixin";
import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {ParentFormGroupPropertyMixin} from "./mixins/forms/properties/ParentFormGroupPropertyMixin";

export declare class ISelectOption implements AttributesProviderMixin, ClassesProviderMixin, EmitProviderMixin, EmitClickMethodMixin, DisabledPropertyMixin, ParentFormGroupPropertyMixin {
    value: string;
    label: string;
    disabled: boolean;
    active(): boolean;
    getDispatchProps(): { value: string; label: string; disabled: boolean; };
    onClick(e: Event): void;

    attributes(): { [p: string]: string };
    broadcast(parentComponentName: string, eventName: string, params: any): void;
    classes(): Array<{ [p: string]: boolean }>;
    dispatch(childComponentName: string, eventName: string, params: any): void;
    emitClick(event: Event): void;
    isDisabled(): boolean;
    isGrouped(): boolean;
    parentFormGroup(): any;
}