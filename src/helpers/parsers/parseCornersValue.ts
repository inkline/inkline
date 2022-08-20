import { ConfigurationContext, CornersProperty, FnProperty, Theme } from '../../types';
import { cornersPropertyKeys } from '../../constants';
import { parseValue } from './parseValue';

export function parseCornersValue<ValueType = unknown, ReturnType = string | number> (
    context: ConfigurationContext<Theme, ValueType | FnProperty<ValueType>>
): CornersProperty<ReturnType> {
    const value = parseValue(context);
    const corners: CornersProperty<ReturnType> = {
        topLeft: '' as unknown as ReturnType,
        topRight: '' as unknown as ReturnType,
        bottomRight: '' as unknown as ReturnType,
        bottomLeft: '' as unknown as ReturnType
    };

    /**
     * Assign each side based on value index
     *
     * @param values
     */

    const assignCornersFromArray = (values: Array<ReturnType | string>) => cornersPropertyKeys
        .forEach((corner, index) => {
            corners[corner] = (values[index % 4] || values[index % 2] || values[0]) as ReturnType;
        });

    /**
     * Handle value types and assign to sides
     */

    if (Array.isArray(value)) {
        assignCornersFromArray(
            (value as unknown as Array<ReturnType>).map((corner) => parseValue({
                ...context,
                value: corner
            }))
        );
    } else if (typeof value === 'string') {
        assignCornersFromArray(value.split(/\s+/));
    } else {
        assignCornersFromArray([value as unknown as ReturnType]);
    }

    return corners;
}
