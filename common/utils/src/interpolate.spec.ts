import * as micromustache from 'micromustache';
import { interpolate } from './interpolate';

describe('Utils', () => {
    describe('interpolate()', () => {
        it('should call micromustache.render() with the given template and scope', () => {
            const renderSpy = vi.spyOn(micromustache, 'render');

            interpolate('template', { scope: true });

            expect(renderSpy).toHaveBeenCalledWith('template', { scope: true });
        });
    });
});
