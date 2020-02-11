import {ActivePropertyMixin} from "./mixins/components/properties/ActivePropertyMixin";

export declare class ILinkable implements ActivePropertyMixin {
    active?: boolean;
    activeClass?: string;
    tag?: string;
}
