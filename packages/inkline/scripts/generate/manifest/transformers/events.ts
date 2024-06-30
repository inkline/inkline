import { Block, Spec } from 'comment-parser';
import { ManifestEntry } from '../types';

export const mapBlocksToEvents = (blocks: Block[]): ManifestEntry[] =>
    blocks
        .filter(({ tags = [] }) => tags.find(({ tag }) => tag === 'event'))
        .map(({ description, tags }) => {
            const { name } = tags.find(({ tag }) => tag === 'event') as Spec;

            return {
                description,
                name
            };
        });
