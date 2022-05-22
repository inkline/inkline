export const numberModifiers: {
    [key: string]: (variable: Record<string, string>, key: string, value: string | number | boolean | undefined) => void;
} = {
    add: (variable, key, value) => {
        variable[key] = `calc(${variable[key]} + ${value})`;
    },
    subtract: (variable, key, value) => {
        variable[key] = `calc(${variable[key]} - ${value})`;
    },
    multiply: (variable, key, value) => {
        variable[key] = `calc(${variable[key]} * ${value})`;
    },
    divide: (variable, key, value) => {
        variable[key] = `calc(${variable[key]} / ${value})`;
    }
};

export const numberModifierAliases: Record<string, string> = {
    times: 'multiply',
    mul: 'multiply',
    div: 'divide'
};
