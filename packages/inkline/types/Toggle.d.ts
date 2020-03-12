import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {SchemaProviderMixin} from "./mixins/forms/providers/SchemaProviderMixin";

export declare class IToggle implements NamePropertyMixin, SchemaProviderMixin {
    value: boolean | string;
    name?: string;
    schema?: any;
}
