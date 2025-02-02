import type { StringOrRenderableType } from '@inkline/types';

export type NavItemDefinition = {
    title: StringOrRenderableType;
    icon: StringOrRenderableType;
    url: string | object;
    children?: NavItemDefinition[];
};
