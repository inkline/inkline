export function insertInBetweenElements<T>(array: T[], value: T): T[] {
    return array
        .reduce<T[]>((acc, curr) => {
            acc.push(curr, value);
            return acc;
        }, [])
        .slice(0, -1);
}
