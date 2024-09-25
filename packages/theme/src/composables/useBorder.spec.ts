import { useBorder } from './useBorder';

describe('useBorder', () => {
    it('should return the correct variables', () => {
        const border = useBorder();

        expect(border.borderTopWidth).toBeDefined();
        expect(border.borderRightWidth).toBeDefined();
        expect(border.borderBottomWidth).toBeDefined();
        expect(border.borderLeftWidth).toBeDefined();
        expect(border.borderWidth).toBeDefined();
        expect(border.borderTopStyle).toBeDefined();
        expect(border.borderRightStyle).toBeDefined();
        expect(border.borderBottomStyle).toBeDefined();
        expect(border.borderLeftStyle).toBeDefined();
        expect(border.borderStyle).toBeDefined();
        expect(border.borderTopColor).toBeDefined();
        expect(border.borderRightColor).toBeDefined();
        expect(border.borderBottomColor).toBeDefined();
        expect(border.borderLeftColor).toBeDefined();
        expect(border.borderColor).toBeDefined();
        expect(border.border).toBeDefined();
    });
});
