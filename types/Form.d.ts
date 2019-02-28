import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {EmitSubmitMethodMixin} from "./mixins/forms/methods/EmitSubmitMethodMixin";
import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {LoadingPropertyMixin} from "./mixins/components/properties/LoadingPropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {Size} from "./constants/size";

export declare class IForm implements AttributesProviderMixin, ClassesProviderMixin, EmitSubmitMethodMixin, DisabledPropertyMixin, LoadingPropertyMixin, ReadonlyPropertyMixin, SizePropertyMixin, NamePropertyMixin {
    inline: boolean;
    schema: any;
    add(input: any): void;
    remove(input: any): void;

    disabled: boolean;
    loading: boolean;
    name: string;
    readonly: boolean;
    size: Size;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
    emitSubmit(event: Event): void;
    isDisabled(): boolean;
    isReadonly(): boolean;
}