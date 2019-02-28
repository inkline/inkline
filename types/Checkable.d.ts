import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {InjectParentFormProviderMixin} from "./mixins/forms/providers/InjectParentFormProviderMixin";
import {ModelGroupProviderMixin} from "./mixins/forms/providers/ModelGroupProviderMixin";
import {ClickInputRefMethodMixin} from "./mixins/forms/methods/ClickInputRefMethodMixin";
import {EmitClickMethodMixin} from "./mixins/components/methods/EmitClickMethodMixin";
import {EmitFocusMethodMixin} from "./mixins/components/methods/EmitFocusMethodMixin";
import {EmitInputMethodMixin} from "./mixins/components/methods/EmitInputMethodMixin";
import {CustomPropertyMixin} from "./mixins/components/properties/CustomPropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {ParentFormGroupPropertyMixin} from "./mixins/forms/properties/ParentFormGroupPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {Size} from "./constants/size";

export declare class ICheckable implements AttributesProviderMixin, ClassesProviderMixin, InjectParentFormProviderMixin, ModelGroupProviderMixin, ClickInputRefMethodMixin, EmitClickMethodMixin, EmitFocusMethodMixin, EmitInputMethodMixin, CustomPropertyMixin, DisabledPropertyMixin, ReadonlyPropertyMixin, ParentFormGroupPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    custom: boolean;
    disabled: boolean;
    parentForm: any;
    readonly: boolean;
    size: Size;
    tabindex: number | string;
    value: Array<string | boolean> | boolean | string;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
    clickInputRef(): void;
    currentValue(): Array<string | boolean>;
    emitBlur(event: Event): void;
    emitClick(event: Event): void;
    emitFocus(event: Event): void;
    emitInput(value: any): void;
    isDisabled(): boolean;
    isGrouped(): boolean;
    isReadonly(): boolean;
    model(): Array<string | boolean>;
    parentFormGroup(): any;
    tabIndex(): number | string;
}