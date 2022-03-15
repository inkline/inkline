import { h } from '@inkline/paper';
import { SvgNode } from '@inkline/inkline/types';

export const renderSvg = (children: SvgNode[]): any[] => children
    .map((child, index) => child.type === 'element'
        ? h(child.name, { key: index, ...child.attributes }, renderSvg(child.children))
        : child.value
    );
