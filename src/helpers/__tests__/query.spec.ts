import { querySelector, querySelectorAll } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('querySelector()', () => {
        const items = [
            {},
            { $options: { name: '1' } },
            { $options: { extends: { name: '2' } } },
            { componentInstance: { $options: { name: '3' } } },
            { componentInstance: { $options: { extends: { name: '4' } } } },
            { children: [{ $options: { name: '5' } }] },
            { $children: [{ $options: { name: '6' } }] },
            { componentInstance: { $children: [{ $options: { name: '7' } }] } },
            { $children: [{ $children: [{ $children: [{ $options: { name: '8' } }] }] }] }
        ];

        it('should return undefined if no items in array', () => {
            expect((querySelector as any)([])).toEqual(undefined);
        });

        it('should return item if $options.name matches given name', () => {
            expect(querySelector(items, '1')).toEqual(items[1]);
        });

        it('should return item if $options.$extends.name matches given name', () => {
            expect(querySelector(items, '2')).toEqual(items[2]);
        });

        it('should return item if componentInstance.$options.name matches given name', () => {
            expect(querySelector(items, '3')).toEqual(items[3]);
        });

        it('should return item if componentInstance.$options.$extends.name matches given name', () => {
            expect(querySelector(items, '4')).toEqual(items[4]);
        });

        it('should return item if children[0] matches given name', () => {
            expect(querySelector(items, '5')).toEqual((items[5] as any).children[0]);
        });

        it('should return item if $children[0] matches given name', () => {
            expect(querySelector(items, '6')).toEqual((items[6] as any).$children[0]);
        });

        it('should return item if componentInstance.$children[0] matches given name', () => {
            expect(querySelector(items, '7')).toEqual((items[7] as any).componentInstance.$children[0]);
        });

        it('should return undefined if item below given search depth', () => {
            expect(querySelector(items, '8', 2)).toEqual(undefined);
        });

        it('should return item if item above given search depth', () => {
            expect(querySelector(items, '8', 3)).toEqual({ $options: { name: '8' } });
        });
    });

    describe('querySelectorAll()', () => {
        const items = [
            {},
            { $options: { name: '1' } },
            { $options: { extends: { name: '2' } } },
            { componentInstance: { $options: { name: '3' } } },
            { componentInstance: { $options: { extends: { name: '4' } } } },
            { children: [{ $options: { name: '5' } }] },
            { $children: [{ $options: { name: '6' } }] },
            { componentInstance: { $children: [{ $options: { name: '7' } }] } },
            { $children: [{ $children: [{ $children: [{ $options: { name: '8' } }] }] }] }
        ];

        it('should return empty array if items is undefined', () => {
            expect((querySelectorAll as any)(undefined)).toEqual([]);
        });

        it('should return empty array if no items in array', () => {
            expect((querySelectorAll as any)([])).toEqual([]);
        });

        it('should return array containing item if $options.name matches given name', () => {
            expect(querySelectorAll(items, '1')).toEqual([items[1]]);
        });

        it('should return array containing item if $options.$extends.name matches given name', () => {
            expect(querySelectorAll(items, '2')).toEqual([items[2]]);
        });

        it('should return array containing item if componentInstance.$options.name matches given name', () => {
            expect(querySelectorAll(items, '3')).toEqual([items[3]]);
        });

        it('should return array containing item if componentInstance.$options.$extends.name matches given name', () => {
            expect(querySelectorAll(items, '4')).toEqual([items[4]]);
        });

        it('should return array containing item if children[0] matches given name', () => {
            expect(querySelectorAll(items, '5')).toEqual([(items[5] as any).children[0]]);
        });

        it('should return array containing item if $children[0] matches given name', () => {
            expect(querySelectorAll(items, '6')).toEqual([(items[6] as any).$children[0]]);
        });

        it('should return array containing item if componentInstance.$children[0] matches given name', () => {
            expect(querySelectorAll(items, '7')).toEqual([(items[7] as any).componentInstance.$children[0]]);
        });

        it('should return array containing undefined if item below given search depth', () => {
            expect(querySelectorAll(items, '8', 2)).toEqual([]);
        });

        it('should return array containing item if item above given search depth', () => {
            expect(querySelectorAll(items, '8', 3)).toEqual([{ $options: { name: '8' } }]);
        });
    });
});
