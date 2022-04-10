import { Configuration, SidesPropertyParts, SpacingProperty } from '../../types';
import { sidesPropertyKeys } from '../../constants';

export function parseSidesValue (
    config: Configuration,
    value: SpacingProperty,
    fallbackValue: string = '0'
): SidesPropertyParts<string | number> {
    const sides: SidesPropertyParts<string | number> = {
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
            sides[side] = values[index % 4] || values[index % 2] || values[0];
        });

    /**
     * Handle value types and assign to sides
     */

    if (Array.isArray(value)) {
        assignSidesFromArray(value);
    } else if (typeof value === 'string') {
        assignSidesFromArray(value.split(/\s+/));
    } else if (typeof value === 'object') {
        sides.top = value.top || value.default || fallbackValue;
        sides.right = value.right || value.default || fallbackValue;
        sides.bottom = value.bottom || value.default || fallbackValue;
        sides.left = value.left || value.default || fallbackValue;
    } else if (typeof value === 'function') {
        return parseSidesValue(config, value({ theme: config.theme }));
    } else {
        assignSidesFromArray([value]);
    }

    return sides;
}
