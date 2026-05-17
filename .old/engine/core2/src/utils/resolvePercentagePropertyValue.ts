import { TokenValue } from '../types';
import { isNumberOrNumberString } from '../typeGuards';

export function resolvePercentagePropertyValue<T extends TokenValue>(value: T): T | string {
    return isNumberOrNumberString(value) ? `${value}%` : value;
}
