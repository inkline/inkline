export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ComponentBaseColor =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink';
export type ComponentStateColor = 'info' | 'success' | 'warning' | 'danger';
export type ComponentBrandColor = 'primary' | 'secondary' | 'light' | 'dark' | ComponentStateColor;
export type ComponentNeutralColor = 'white' | 'black' | 'gray';
export type ComponentColor = ComponentBrandColor | ComponentBaseColor | ComponentNeutralColor;
