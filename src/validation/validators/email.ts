const validator =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function email(value: any): boolean {
    if (value.constructor === Array) {
        return value.every((v) => !v || validator.test(String(v)));
    }

    return !value || validator.test(String(value));
}
