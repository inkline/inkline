export function validator (value) {
    return [false, true, '', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(value) !== -1;
}
