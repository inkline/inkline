import { Configuration, ResolvedConfiguration } from './config';
import { Theme } from './theme';

export interface ConfigurationContext<ThemeType, ValueType> {
    config: ThemeType extends Theme ? Configuration : ResolvedConfiguration;
    theme: ThemeType;
    value: ValueType;
    path: string[];
}
