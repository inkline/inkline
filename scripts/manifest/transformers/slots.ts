import { Block, Spec } from 'comment-parser';
import { ManifestEntry } from '../types';

export const mapBlocksToSlots = (blocks: Block[]): ManifestEntry[] => blocks
    .filter(({ tags }) => tags.find(({ tag, name }) => tag === 'kind' && name === 'slot'))
    .map(({ description, tags }) => {
        const { name } = tags.find(({ tag }) => tag === 'name') as Spec;

        return {
            description,
            name
        };
    });
