import { Configuration, CornersProperty, UserConfiguration } from '../../types';
import { cornersPropertyKeys } from '../../constants';
import { parseValue } from './parseValue';
import { parseFn } from './parseFn';

export function parseCornersValue<T = unknown> (
    config: Configuration,
    value: T | T[] | UserConfiguration.PropertyFn<T>
): CornersProperty<string | number> {
    const corners: CornersProperty<string | number> = {
        topLeft: '',
        topRight: '',
        bottomRight: '',
        bottomLeft: ''
    };

    /**
     * Assign each side based on value index
     *
     * @param values
     */

    const assignCornersFromArray = (values: Array<string | number>) => cornersPropertyKeys
        .forEach((corner, index) => {
            corners[corner] = parseValue<string | number>(config, values[index % 4] || values[index % 2] || values[0]);
        });

    /**
     * Handle value types and assign to sides
     */

    if (Array.isArray(value)) {
        assignCornersFromArray(value as unknown as Array<string | number>);
    } else if (typeof value === 'function') {
        return parseCornersValue(config, parseFn<T>(config, value as UserConfiguration.PropertyFn<T>));
    } else if (typeof value === 'string') {
        assignCornersFromArray(value.split(/\s+/));
    } else {
        assignCornersFromArray([value as unknown as number]);
    }

    return corners;
}
