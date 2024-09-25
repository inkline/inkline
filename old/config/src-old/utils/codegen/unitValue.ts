export function toUnitValue(value: string | number, unit: string = 'px'): string {
    return typeof value === 'number' ? `${value}${value === 0 ? '' : unit}` : value;
}
