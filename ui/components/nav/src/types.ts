import type { Renderable } from '@inkline/types';

export type NavItemDefinition = {
    title: Renderable;
    icon: Renderable;
    url: string | object;
    children?: NavItemDefinition[];
};
