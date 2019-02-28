import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";
import { AttributesProviderMixin } from "./mixins/components/providers/AttributesProviderMixin";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";

export declare class IBreadcrumb implements AttributesProviderMixin, ClassesProviderMixin, SizePropertyMixin {
    size: Size;

    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
}