import { BorderProperty, BorderPropertyParts, Configuration, SidesPropertyParts } from '../../types';
import { parseSidesValue } from './parseSidesValue';
import { sidesPropertyKeys } from '../../constants';

export function parseBorderValue (
    config: Configuration,
    value: BorderProperty
): SidesPropertyParts<BorderPropertyParts> {
    const border: SidesPropertyParts<BorderPropertyParts> = {
        top: {
            width: '',
            style: '',
            color: ''
        },
        right: {
            width: '',
            style: '',
            color: ''
        },
        bottom: {
            width: '',
            style: '',
            color: ''
        },
        left: {
            width: '',
            style: '',
            color: ''
        }
    };

    const getValueFromString = (value: string): BorderPropertyParts => {
        const [width, style, color] = value.split(/\s+/);

        return { width, style, color };
    };

    if (typeof value === 'string') {
        sidesPropertyKeys.forEach((sideKey) => {
            border[sideKey] = getValueFromString(value);
        });
    } else if (typeof value === 'object') {
        const width = parseSidesValue(config, value.width as string);
        const style = parseSidesValue(config, value.style as string, 'solid');
        const color = parseSidesValue(config, value.color as string, 'transparent');

        sidesPropertyKeys.forEach((sideKey) => {
            let sideValue = (value as SidesPropertyParts<BorderPropertyParts>)[sideKey];

            if (typeof (value as SidesPropertyParts<string>)[sideKey] === 'string') {
                sideValue = getValueFromString((value as SidesPropertyParts<string>)[sideKey] as string);
            }

            border[sideKey]!.width = sideValue?.width || width[sideKey];
            border[sideKey]!.style = sideValue?.style || style[sideKey] as string;
            border[sideKey]!.color = sideValue?.color || color[sideKey] as string;
        });
    }

    return border;
}
