import { ConfigurationContext, FnProperty, SidesProperty, Theme } from '../../types';
import { sidesPropertyKeys } from '../../constants';
import { parseValue } from './parseValue';

export function parseSidesValue<ValueType = unknown, ReturnType = string | number> (
    context: ConfigurationContext<Theme, ValueType | FnProperty<ValueType>>
): SidesProperty<ReturnType> {
    const value = parseValue(context);
    const sides: SidesProperty<ReturnType> = {
        top: '' as unknown as ReturnType,
        right: '' as unknown as ReturnType,
        bottom: '' as unknown as ReturnType,
        left: '' as unknown as ReturnType
    };

    /**
     * Assign each side based on value index
     *
     * @param values
     */

    const assignSidesFromArray = (values: Array<ReturnType | string>) => sidesPropertyKeys
        .forEach((side, index) => {
            sides[side] = (values[index % 4] || values[index % 2] || values[0]) as ReturnType;
        });

    /**
     * Handle value types and assign to sides
     */

    if (Array.isArray(value)) {
        assignSidesFromArray(
            (value as unknown as Array<ReturnType>).map((side) => parseValue({
                ...context,
                value: side
            }))
        );
    } else if (typeof value === 'string') {
        assignSidesFromArray(value.split(/\s+/));
    } else {
        assignSidesFromArray([value as unknown as ReturnType]);
    }

    return sides;
}
