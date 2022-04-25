import { Configuration, SidesProperty, UserConfiguration } from '../../types';
import { sidesPropertyKeys } from '../../constants';
import { parseValue } from './parseValue';
import { parseFn } from './parseFn';

export function parseSidesValue<T = unknown> (
    config: Configuration,
    value: T | T[] | UserConfiguration.PropertyFn<T>
): SidesProperty<string | number> {
    const sides: SidesProperty<string | number> = {
        top: '',
        right: '',
        bottom: '',
        left: ''
    };

    /**
     * Assign each side based on value index
     *
     * @param values
     */

    const assignSidesFromArray = (values: Array<string | number>) => sidesPropertyKeys
        .forEach((side, index) => {
            sides[side] = parseValue<string | number>(config, values[index % 4] || values[index % 2] || values[0]);
        });

    /**
     * Handle value types and assign to sides
     */

    if (Array.isArray(value)) {
        assignSidesFromArray(value as unknown as Array<string | number>);
    } else if (typeof value === 'function') {
        return parseSidesValue(config, parseFn<T>(config, value as UserConfiguration.PropertyFn<T>));
    } else if (typeof value === 'string') {
        assignSidesFromArray(value.split(/\s+/));
    } else {
        assignSidesFromArray([value as unknown as number]);
    }

    return sides;
}
