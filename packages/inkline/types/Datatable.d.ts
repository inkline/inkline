import {BrandVariants, MonochromeVariants, StateVariants} from "./constants/variants";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";

interface IColumn {
    title: string;
    path: string;
    classes?: string | string[];
    align?: string;
    sortable?: boolean;
    render?: any;
    renderHeader?: any;
    renderFooter?: any;
}

export declare class IDatatable implements VariantPropertyMixin {
    bordered?: boolean;
    striped?: boolean;
    hover?: boolean;
    responsive?: boolean | string;
    variant?: BrandVariants | StateVariants | MonochromeVariants;
    async?: boolean;
    columns: any[];
    countColumn?: any;
    expandColumn?: any;
    rows: any[];
    rowsCount?: number;
    defaultSortKey?: string;
    pagination?: boolean | {
        limit?: any;
        size?: string;
        variant?: string;
        rowsPerPage?: number;
        rowsPerPageOptions?: number[];
    };
    filtering?: boolean | {
        size?: string;
        variant?: string;
        fuse?: any;
    };
    i18n?: {
        pagination?: {
            rowsPerPage?: string;
            rowsRange?: string;
        },
        filtering?: {
            inputPlaceholder?: string;
            noResultsFound?: string;
        }
    };
    footer?: boolean;
    singleExpand?: boolean;
}
