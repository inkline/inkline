import { ConfigurationContext } from './context';

export interface Plugin<ThemeType = any, ValueType = any, ReturnType = any> {
    /**
     * Plugin name
     *
     * @example margin
     */
    name: string;

    /**
     * Path validation regular expression, should contain replacement groups
     *
     * @example /(.*)margin.(\w+)$/
     */
    test: RegExp;

    /**
     * Path skipping / blocking regular expression
     *
     * @example /^variants/
     */
    skip?: RegExp;

    /**
     * Validate value function, returns true if plugin should be applied
     *
     * @param context
     */
    guard?(context: ConfigurationContext<ThemeType, ValueType>): boolean;

    /**
     * Resolve function, returns the value to be set on theme object
     *
     * @param context
     */
    apply(context: ConfigurationContext<ThemeType, ValueType>): ReturnType;
}
