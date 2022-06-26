import { GeneratorLocation, GeneratorPriority } from '../constants';

export interface CodegenGroup {
    name: string;
    value: string[];
    location: GeneratorLocation;
    priority: GeneratorPriority;
}

export interface CodegenFile {
    name: string;
    value: string;
}
