import { disableComment } from '../constants';

export function shouldExtract(code: string) {
    return !code.includes(disableComment);
}
