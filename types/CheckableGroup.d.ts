import {SchemaProviderMixin} from "./mixins/forms/providers/SchemaProviderMixin";
import {EmitFocusMethodMixin} from "./mixins/components/methods/EmitFocusMethodMixin";

export declare class ICheckableGroup implements SchemaProviderMixin, EmitFocusMethodMixin {
    value: any;

    schema: any;
    emitBlur(event: Event): void;
    emitFocus(event: Event): void;
}