import { ManifestEntry } from '../types';

export function mapSourceToSlots(source: string): ManifestEntry[] {
    const regex = /<!--\s*@slot\s+([\w-]+)\s+(.+)\s*-->/g;

    return Array.from(source.matchAll(regex), ([_, name, description]) => ({
        name,
        description
    }));
}
