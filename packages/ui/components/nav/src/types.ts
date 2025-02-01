import type { StringOrRenderableType } from '@inkline/types';

export type NavItem = {
    title: StringOrRenderableType;
    icon: StringOrRenderableType;
    url: string;
    children?: NavItem[];
};
