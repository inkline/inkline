import type { FormValidatorFn, FormValue } from '../types';

const validator =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const email: FormValidatorFn = (value: FormValue) => {
    if (value?.constructor === Array) {
        return value.every((v) => !v || validator.test(String(v)));
    }

    return !value || validator.test(String(value));
};
