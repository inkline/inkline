import { Block, Spec } from 'comment-parser';
import { ManifestProp } from '../types';

export const mapBlocksToProps = (blocks: Block[]): ManifestProp[] =>
    blocks
        .filter(({ tags }) => !tags.find(({ tag }) => tag === 'kind' || tag === 'event'))
        .map(({ description, tags }) => {
            const { name } = tags.find(({ tag }) => tag === 'name') as Spec;
            const { name: defaultValue } = tags.find(({ tag }) => tag === 'default') as Spec;
            const typeTag = tags.find(({ tag }) => tag === 'type') as Spec;
            const type = typeTag ? `${typeTag.name}${typeTag.description}`.split(/ *\| */) : [];

            return {
                name,
                type,
                default: defaultValue,
                description
            };
        });
