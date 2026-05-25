export interface ArgType {
  readonly control?: string | { readonly type: string; readonly [key: string]: unknown };
  readonly description?: string;
  readonly options?: readonly unknown[];
  readonly table?: Readonly<Record<string, unknown>>;
}

export interface StoryVariant<TProps> {
  readonly args?: Partial<TProps>;
  /** Path to an `.ink.tsx` render component, resolved relative to the story file. */
  readonly render?: string;
}

export interface StoryMeta<TProps> {
  readonly component: string;
  readonly title: string;
  readonly args?: Partial<TProps>;
  readonly argTypes?: Partial<Record<keyof TProps & string, ArgType>>;
}

export function defineStories<TProps>(meta: StoryMeta<TProps>): StoryMeta<TProps> {
  return meta;
}
