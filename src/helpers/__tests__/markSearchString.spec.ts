import { markSearchString } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('markSearchString()', () => {
        it('should split text by matches', () => {
            const text = 'The orange fox said hello to the red fox.';
            const query = 'fox';

            expect(markSearchString(text, query)).toEqual([
                { text: 'The orange ' },
                { text: 'fox', marked: true },
                { text: ' said hello to the red ' },
                { text: 'fox', marked: true },
                { text: '.' }
            ]);
        });

        it('should return whole text if no match found', () => {
            const text = 'The orange said hello to the red.';
            const query = 'fox';

            expect(markSearchString(text, query)).toEqual([
                { text }
            ]);
        });
    });
});
