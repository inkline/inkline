import { DevEnv, DevEnvType, DevLibraryType } from '../types';

export const defaultFileIndent = '    ';

export const unknownDevEnvironment: DevEnv = {
    type: DevEnvType.Unknown,
    library: DevLibraryType.Unknown,
    configFile: ''
};
