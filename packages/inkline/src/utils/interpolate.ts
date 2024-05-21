import { render } from 'micromustache';

export function interpolate(template: string, scope: Record<string, any> = {}): string {
    return render(template, scope);
}
