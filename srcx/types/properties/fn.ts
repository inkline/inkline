import { PartialDeep } from 'type-fest';
import { Theme } from '../theme';

export interface FnProperty<T = unknown> {
    (context: { theme: PartialDeep<Theme> }): T;
}
