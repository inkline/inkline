import { ConfigurationContext } from './context';
import { Theme } from './theme';
import { Plugin } from './plugin';

export interface Resolver<ValueType = any, ReturnType = any> extends Plugin<Theme, ValueType, ReturnType> {
    /**
     * Set string, should contain replacement groups
     *
     * @example $1margin.$2
     */
    set: string | string[] | ((context: ConfigurationContext<Theme, ValueType>, returnValue: ReturnType) => void);
}
