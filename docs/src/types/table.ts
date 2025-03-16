import type { VNode } from 'vue';

export interface AppTableColumn {
    label: string;
    key: string;
    width?: number;
    type?: 'plaintext' | 'code' | 'vnode';

    visible?(row: Record<string, any>, column: AppTableColumn): boolean;

    render?(row: Record<string, any>, column: AppTableColumn): string | VNode;
}
