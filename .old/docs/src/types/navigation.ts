export type NavigationItem = {
    id: string;
    title: string;
    to?: string;
    icon?: string;
    children?: NavigationItem[];
    active?: Array<string | RegExp> | string | RegExp;
};
