import { VitePluginConfig as UnocssConfig } from '@unocss/vite';

export interface InklinePlugin<T = {}> {
    (options?: T): {
         name: string;
         apply: (options: UserOptions) => UserOptions;
    };
}

export interface UserOptions {
    configFile?: string;
    outputDir?: string;
    extName?: `.${string}`;
    unocss?: UnocssConfig;
    plugins?: ReturnType<InklinePlugin>[];
}
