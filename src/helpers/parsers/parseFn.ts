import { Configuration, UserConfiguration } from '../../types';
import { parseValue } from './parseValue';

export function parseFn<T = unknown> (
    config: Configuration,
    value: UserConfiguration.PropertyFn<T>
): string {
    return parseValue(config, value({ theme: config.theme }));
}
