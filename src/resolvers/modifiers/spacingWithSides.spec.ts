import {
    topModifier,
    rightModifier,
    bottomModifier,
    leftModifier,
    xModifier,
    yModifier,
    allModifier,
    addModifier,
    subtractModifier,
    multiplyModifier,
    divideModifier
} from './spacing';
import { ResolvedThemeSpacing } from '../../types';

describe('spacingModifiers', () => {
    let spacing: ResolvedThemeSpacing;

    beforeEach(() => {
        spacing = { top: '10px', right: '10px', bottom: '10px', left: '10px' };
    });

    describe('top', () => {
        it('should correctly apply the top modifier', () => {
            topModifier(spacing, '20px');
            expect(spacing.top).toBe('20px');
        });
    });

    describe('right', () => {
        it('should correctly apply the right modifier', () => {
            rightModifier(spacing, '20px');
            expect(spacing.right).toBe('20px');
        });
    });

    describe('bottom', () => {
        it('should correctly apply the bottom modifier', () => {
            bottomModifier(spacing, '20px');
            expect(spacing.bottom).toBe('20px');
        });
    });

    describe('left', () => {
        it('should correctly apply the left modifier', () => {
            leftModifier(spacing, '20px');
            expect(spacing.left).toBe('20px');
        });
    });

    describe('x', () => {
        it('should correctly apply the x modifier', () => {
            xModifier(spacing, '20px');
            expect(spacing.left).toBe('20px');
            expect(spacing.right).toBe('20px');
        });
    });

    describe('y', () => {
        it('should correctly apply the y modifier', () => {
            yModifier(spacing, '20px');
            expect(spacing.top).toBe('20px');
            expect(spacing.bottom).toBe('20px');
        });
    });

    describe('all', () => {
        it('should correctly apply the all modifier', () => {
            allModifier(spacing, '20px');
            expect(spacing.top).toBe('20px');
            expect(spacing.right).toBe('20px');
            expect(spacing.bottom).toBe('20px');
            expect(spacing.left).toBe('20px');
        });
    });

    describe('add', () => {
        it('should correctly apply the add modifier', () => {
            addModifier(spacing, '10px');
            expect(spacing.top).toBe('calc(10px + 10px)');
            expect(spacing.right).toBe('calc(10px + 10px)');
            expect(spacing.bottom).toBe('calc(10px + 10px)');
            expect(spacing.left).toBe('calc(10px + 10px)');
        });
    });

    describe('subtract', () => {
        it('should correctly apply the subtract modifier', () => {
            subtractModifier(spacing, '5px');
            expect(spacing.top).toBe('calc(10px - 5px)');
            expect(spacing.right).toBe('calc(10px - 5px)');
            expect(spacing.bottom).toBe('calc(10px - 5px)');
            expect(spacing.left).toBe('calc(10px - 5px)');
        });
    });

    describe('multiply', () => {
        it('should correctly apply the multiply modifier', () => {
            multiplyModifier(spacing, '2');
            expect(spacing.top).toBe('calc(10px * 2)');
            expect(spacing.right).toBe('calc(10px * 2)');
            expect(spacing.bottom).toBe('calc(10px * 2)');
            expect(spacing.left).toBe('calc(10px * 2)');
        });
    });

    describe('divide', () => {
        it('should correctly apply the divide modifier', () => {
            divideModifier(spacing, '2');
            expect(spacing.top).toBe('calc(10px / 2)');
            expect(spacing.right).toBe('calc(10px / 2)');
            expect(spacing.bottom).toBe('calc(10px / 2)');
            expect(spacing.left).toBe('calc(10px / 2)');
        });
    });
});
