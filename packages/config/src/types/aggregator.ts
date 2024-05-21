import { GeneratorChunk, GeneratorPriority, GeneratorType } from './generator';

export interface AggregatorMeta {
    themeName: 'default' | string;
    themeSelector: string;
    aggregators: Aggregator[];
}

export interface Aggregator {
    type: GeneratorType;
    aggregate: {
        path: (path: GeneratorChunk['path'], meta: AggregatorMeta) => GeneratorChunk['path'];
        content: (
            content: GeneratorChunk['content'],
            meta: AggregatorMeta
        ) => GeneratorChunk['content'];
    };
}

export interface AggregatorFile {
    path: string[];
    type: GeneratorType;
    priority: GeneratorPriority;
    content: string[];
}
