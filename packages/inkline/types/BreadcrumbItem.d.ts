import { ILinkable } from "./Linkable";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";

export declare class IBreadcrumbItem extends ILinkable implements SizePropertyMixin {
    size: Size;
}