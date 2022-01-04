import { h, VNode } from 'vue';
import { SvgNode } from '@inkline/inkline/types';

export const renderSvg = (children: SvgNode[]): (VNode | string)[] => children
    .map((child) => child.type === 'element'
        ? h(child.name, child.attributes, renderSvg(child.children))
        : child.value
    );
