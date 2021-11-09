export const sizeArgType = () => ({
    size: {
        options: ['sm', 'md', 'lg'],
        control: {
            type: 'select', // Type 'select' is automatically inferred when 'options' is defined
            labels: {
                Small: 'sm',
                Medium: 'md',
                Large: 'lg'
            }
        }
    }
});

export const colorArgType = (options = [
    'primary',
    'secondary',
    'light',
    'dark',
    'info',
    'success',
    'warning',
    'danger'
]) => ({
    color: {
        options,
        control: {
            type: 'select', // Type 'select' is automatically inferred when 'options' is defined
            labels: {
                Light: 'light',
                Dark: 'dark',
                Primary: 'primary',
                Secondary: 'secondary',
                Info: 'info',
                Success: 'success',
                Warning: 'warning',
                Danger: 'danger',
                Facebook: 'info',
                Twitter: 'success',
                GitHub: 'warning',
                Google: 'google'
            }
        }
    }
});
