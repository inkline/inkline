export const localStorageMock = {
    store: {} as { [key: string]: string },
    getItem: (key: string) => {
        return localStorageMock.store[key];
    },
    setItem: (key: string, value: any) => {
        localStorageMock.store[key] = value.toString();
    },
    clear: () => {
        localStorageMock.store = {};
    },
    removeItem: (key: string) => {
        delete localStorageMock.store[key];
    }
};
