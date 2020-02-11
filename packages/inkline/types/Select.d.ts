import {ModelProviderMixin} from "./mixins/forms/providers/ModelProviderMixin";
import {SchemaProviderMixin} from "./mixins/forms/providers/SchemaProviderMixin";
import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {Size} from "./constants/size";

export declare class ISelect implements ModelProviderMixin, SchemaProviderMixin, DisabledPropertyMixin, NamePropertyMixin,ReadonlyPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    filterable?: boolean;
    native?: boolean;
    disabled?: boolean;
    name?: string;
    parentForm?: any;
    readonly?: boolean;
    schema?: any;
    size?: Size;
    tabindex?: number | string;
    value: string;
}
