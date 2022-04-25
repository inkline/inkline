import {Configuration, UserConfiguration} from '../../types';

export function parseFn<T = unknown> (
    config: Configuration,
    value: UserConfiguration.PropertyFn<T>
): T {
    return value({ theme: config.theme });
}
