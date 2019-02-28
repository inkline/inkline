import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {InjectParentFormProviderMixin} from "./mixins/forms/providers/InjectParentFormProviderMixin";
import {EmitInputMethodMixin} from "./mixins/components/methods/EmitInputMethodMixin";
import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {LoadingPropertyMixin} from "./mixins/components/properties/LoadingPropertyMixin";
import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {ParentFormGroupPropertyMixin} from "./mixins/forms/properties/ParentFormGroupPropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {Size} from "./constants/size";

export declare class IFormGroup implements AttributesProviderMixin, ClassesProviderMixin, InjectParentFormProviderMixin, EmitInputMethodMixin, DisabledPropertyMixin, LoadingPropertyMixin, NamePropertyMixin, ParentFormGroupPropertyMixin, ReadonlyPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    inline: boolean;
    validate: boolean;

    disabled: boolean;
    loading: boolean;
    name: string;
    parentForm: any;
    readonly: boolean;
    size: Size;
    tabindex: number | string;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
    emitInput(value: any): void;
    isDisabled(): boolean;
    isGrouped(): boolean;
    isReadonly(): boolean;
    parentFormGroup(): any;
    tabIndex(): number | string;
}