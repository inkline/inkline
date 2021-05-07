interface IconPack {
    title: string;
    name: string;
    url: string;
    version: string;
    license: {
        title: string;
        url: string;
    };
    variants: {
        title?: string;
        name?: string;
        prefix: string;
        pattern?: string;
        import?: string;
        path: string;
        icon: (basename: string, basedir?: string) => string;
        fill: boolean;
    }[];
}
export declare const iconPacks: IconPack[];
export default iconPacks;
