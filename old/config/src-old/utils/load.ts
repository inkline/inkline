export function createRegistry<T>() {
    const items: T[] = [];
    const registerItem = (item: T) => {
        items.push(item);
    };

    return {
        items,
        registerItem
    };
}
