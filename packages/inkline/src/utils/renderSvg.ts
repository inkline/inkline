import type { VNode } from 'vue';
import { h } from 'vue';
import type { SvgNode } from '@inkline/inkline/types';

export const renderSvg = (children: SvgNode[]): (VNode | string)[] =>
    children.map((child) =>
        child.type === 'element'
            ? h(child.name, child.attributes, renderSvg(child.children))
            : child.value
    );
