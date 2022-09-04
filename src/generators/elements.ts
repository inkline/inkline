import { Generator, ResolvedTheme } from '../types';
import { animationProperties, MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX } from '../constants';
import { codegenSetCSSVariable } from '../helpers';
import {capitalizeFirst, toDashCase} from '@grozav/utils';
import {join} from "pathe";

export const elementsGenerator: Generator<ResolvedTheme['elements'][string]> = {
    name: 'elements',
    location: 'root',
    test: /elements\.(.+)$/,
    skip: [MATCH_VARIANTS_REGEX],
    apply: ({ value, path }) => {
        const componentName = toDashCase(path[1]);
        const componentDisplayName = capitalizeFirst(componentName.replace('-', ' '));

        const process = (target: Record<string, any>, path: string[] = [], acc: Record<string, string> = {}) => {
            Object.keys(target).forEach((key) => {
                const currentPath = [...path, key].map((part) => toDashCase(part));

                if (typeof target[key] === 'object') {
                    process(target[key] as Record<string, string>, currentPath, acc);
                } else {
                    const propertiesList = [
                        'animation',
                        'border',
                        'borderRadius',
                        'boxShadow',
                        'color',
                        'margin',
                        'padding'
                    ];

                    let joinedPath = '';
                    const propertyIndex = path.findIndex((part) => propertiesList.includes(part));
                    if (propertyIndex !== -1) {
                        joinedPath = `${currentPath.slice(0, propertyIndex).join('--')}--${currentPath.slice(propertyIndex).join('-')}`;
                    } else {
                        joinedPath = currentPath.join('--');
                    }

                    acc[joinedPath] = target[key];
                }
            });

            return acc;
        };

        return ['/**', ` * ${componentDisplayName} variables`, ' */']
            .concat(Object.entries(process(value, [componentName])).map(([key, value]) => {
                return codegenSetCSSVariable(key, value);
            }));
    }
};

export const elementsGenerators = [
    elementsGenerator
];
