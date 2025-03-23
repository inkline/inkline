import type { VNode } from 'vue';

export interface AppTableColumn {
    label: string;
    key: string;
    type?: 'plaintext' | 'code' | 'vnode';
    width?: number | ((row: Record<string, any>, column: AppTableColumn) => number);
    visible?: (row: Record<string, any>, column: AppTableColumn) => boolean;
    render?: (row: Record<string, any>, column: AppTableColumn) => string | VNode;
}
