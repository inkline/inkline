import {
    topLeftModifier,
    topRightModifier,
    bottomRightModifier,
    bottomLeftModifier,
    allModifier,
    addModifier,
    subtractModifier,
    multiplyModifier,
    divideModifier
} from './borderRadius';

describe('topLeftModifier', () => {
    it('should set topLeft value', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        topLeftModifier(borderRadius, '10px');
        expect(borderRadius.topLeft).toBe('10px');
    });
});

describe('topRightModifier', () => {
    it('should set topRight value', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        topRightModifier(borderRadius, '10px');
        expect(borderRadius.topRight).toBe('10px');
    });
});

describe('bottomRightModifier', () => {
    it('should set bottomRight value', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        bottomRightModifier(borderRadius, '10px');
        expect(borderRadius.bottomRight).toBe('10px');
    });
});

describe('bottomLeftModifier', () => {
    it('should set bottomLeft value', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        bottomLeftModifier(borderRadius, '10px');
        expect(borderRadius.bottomLeft).toBe('10px');
    });
});

describe('allModifier', () => {
    it('should set all values', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        allModifier(borderRadius, '15px');
        expect(borderRadius).toEqual({
            topLeft: '15px',
            topRight: '15px',
            bottomRight: '15px',
            bottomLeft: '15px'
        });
    });
});

describe('addModifier', () => {
    it('should add to all values', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        addModifier(borderRadius, '5px');
        expect(borderRadius).toEqual({
            topLeft: 'calc(5px + 5px)',
            topRight: 'calc(5px + 5px)',
            bottomRight: 'calc(5px + 5px)',
            bottomLeft: 'calc(5px + 5px)'
        });
    });
});

describe('subtractModifier', () => {
    it('should subtract from all values', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        subtractModifier(borderRadius, '3px');
        expect(borderRadius).toEqual({
            topLeft: 'calc(5px - 3px)',
            topRight: 'calc(5px - 3px)',
            bottomRight: 'calc(5px - 3px)',
            bottomLeft: 'calc(5px - 3px)'
        });
    });
});

describe('multiplyModifier', () => {
    it('should multiply all values', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        multiplyModifier(borderRadius, '2');
        expect(borderRadius).toEqual({
            topLeft: 'calc(5px * 2)',
            topRight: 'calc(5px * 2)',
            bottomRight: 'calc(5px * 2)',
            bottomLeft: 'calc(5px * 2)'
        });
    });
});

describe('divideModifier', () => {
    it('should divide all values', () => {
        const borderRadius = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        divideModifier(borderRadius, '2');
        expect(borderRadius).toEqual({
            topLeft: 'calc(5px / 2)',
            topRight: 'calc(5px / 2)',
            bottomRight: 'calc(5px / 2)',
            bottomLeft: 'calc(5px / 2)'
        });
    });
});
