import {ICheckable} from "./Checkable";
import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {SchemaProviderMixin} from "./mixins/forms/providers/SchemaProviderMixin";

export declare class ICheckbox extends ICheckable implements NamePropertyMixin, SchemaProviderMixin {
    value: boolean | string;
    indeterminate?: boolean;
    name?: string;
    schema?: any;
}
