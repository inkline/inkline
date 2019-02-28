import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {Size} from "./constants/size";
import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {Breakpoint} from "./constants/breakpoint";
import {MonochromeVariants} from "./constants/variants";

export declare class INavbar implements AttributesProviderMixin, ClassesProviderMixin, SizePropertyMixin, VariantPropertyMixin {
    collapse: Breakpoint;
    fluid: boolean;
    toggleAnimation: string;
    toggleCollapse(): void;
    onWindowResize(): void;

    size: Size;
    variant: MonochromeVariants;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
}