/**
 * Generate the given number of data rows using the available dataset
 *
 * @param count
 * @returns {Object[]}
 */
export function generateDataRows(count) {
    return [...Array(count).keys()].map((item, index) => [
        { id: index, name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26, address: { city: 'Cupertino', country: 'United States' } },
        { id: index, name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30, address: { city: 'Toronto', country: 'Canada' } },
        { id: index, name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30, address: { city: 'Lahore', country: 'Pakistan' } },
        { id: index, name: 'Jared Dunn', email: 'jared.dunn@email.com', age: 35, address: { city: 'Berlin', country: 'Germany' } },
        { id: index, name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32, address: { city: 'Palo Alto', country: 'United States' } },
        { id: index, name: 'Nelson Bighetti', email: 'nelson.bighetti@email.com', age: 26, address: { city: 'Stanford', country: 'United States' } },
    ][index % 6])
}
