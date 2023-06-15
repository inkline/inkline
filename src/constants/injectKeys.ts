import { InjectionKey } from 'vue/dist/vue';
import type { InklineService } from '@inkline/inkline/plugin';
import type { ToastService } from '@inkline/inkline/plugins';
import type { SvgNode } from '@inkline/inkline/types';

export const InklineKey = Symbol('inkline') as InjectionKey<InklineService>;

export const InklineIconsKey = Symbol('inklineIcons') as InjectionKey<Record<string, SvgNode>>;

export const InklineToastKey = Symbol('inklineToast') as InjectionKey<ToastService>;
