import { ExportedName, NamespacedKey, NamespaceType } from './namespaces';
import {
    OutputMapAnimation,
    OutputMapBorder,
    OutputMapBorderRadius,
    OutputMapBoxShadow,
    OutputMapMargin,
    OutputMapPadding,
    OutputMapTransition,
    SourceMapAnimation,
    SourceMapBorder,
    SourceMapBorderRadius,
    SourceMapBoxShadow,
    SourceMapMargin,
    SourceMapPadding,
    SourceMapTransition,
    OutputMapBackground,
    OutputMapColor,
    SourceMapBackground,
    SourceMapColor
} from '../tokens';
import { TokenValue, Variable } from './tokens';
import { KebabCase, PartialDeep } from 'type-fest';

export type SourceMap = {
    alignContent: TokenValue;
    alignItems: TokenValue;
    alignSelf: TokenValue;
    animation: SourceMapAnimation;
    animationName: TokenValue;
    animationDuration: TokenValue;
    animationIterationCount: TokenValue;
    animationDirection: TokenValue;
    background: SourceMapBackground;
    backgroundColor: SourceMapBackground;
    border: SourceMapBorder;
    borderWidth: TokenValue;
    borderStyle: TokenValue;
    borderColor: TokenValue;
    borderTopWidth: TokenValue;
    borderTopStyle: TokenValue;
    borderTopColor: TokenValue;
    borderRightWidth: TokenValue;
    borderRightStyle: TokenValue;
    borderRightColor: TokenValue;
    borderBottomWidth: TokenValue;
    borderBottomStyle: TokenValue;
    borderBottomColor: TokenValue;
    borderLeftWidth: TokenValue;
    borderLeftStyle: TokenValue;
    borderLeftColor: TokenValue;
    borderRadius: SourceMapBorderRadius;
    borderTopLeftRadius: TokenValue;
    borderTopRightRadius: TokenValue;
    borderBottomRightRadius: TokenValue;
    borderBottomLeftRadius: TokenValue;
    bottom: TokenValue;
    boxShadow: SourceMapBoxShadow;
    color: SourceMapColor;
    cursor: TokenValue;
    display: TokenValue;
    flexBasis: TokenValue;
    flexDirection: TokenValue;
    flexFlow: TokenValue;
    flexGrow: TokenValue;
    flexShrink: TokenValue;
    flexWrap: TokenValue;
    fontFamily: TokenValue;
    fontSize: TokenValue;
    fontWeight: TokenValue;
    gap: TokenValue;
    gridAutoColumns: TokenValue;
    gridAutoFlow: TokenValue;
    gridAutoRows: TokenValue;
    gridColumn: TokenValue;
    gridColumnEnd: TokenValue;
    gridColumnStart: TokenValue;
    gridRow: TokenValue;
    gridRowEnd: TokenValue;
    gridRowStart: TokenValue;
    gridTemplateAreas: TokenValue;
    gridTemplateColumns: TokenValue;
    gridTemplateRows: TokenValue;
    height: TokenValue;
    justifyContent: TokenValue;
    left: TokenValue;
    letterSpacing: TokenValue;
    lineHeight: TokenValue;
    margin: SourceMapMargin;
    opacity: TokenValue;
    order: TokenValue;
    overflow: TokenValue;
    padding: SourceMapPadding;
    placeContent: TokenValue;
    placeItems: TokenValue;
    position: TokenValue;
    right: TokenValue;
    size: TokenValue;
    textAlign: TokenValue;
    textDecoration: TokenValue;
    textTransform: TokenValue;
    top: TokenValue;
    transform: TokenValue;
    transition: SourceMapTransition;
    whiteSpace: TokenValue;
    width: TokenValue;
    zIndex: TokenValue;
    [key: string]:
        | TokenValue
        | SourceMapAnimation
        | SourceMapBackground
        | SourceMapBorder
        | SourceMapBorderRadius
        | SourceMapBoxShadow
        | SourceMapMargin
        | SourceMapPadding
        | SourceMapTransition
        | SourceMap;
};

export type OutputMap<Namespace extends NamespaceType> = {
    animation: OutputMapAnimation<Namespace>;
    background: OutputMapBackground<Namespace>;
    backgroundColor: OutputMapBackground<Namespace>;
    border: OutputMapBorder<Namespace>;
    borderRadius: OutputMapBorderRadius<Namespace>;
    boxShadow: OutputMapBoxShadow<Namespace>;
    color: OutputMapColor<Namespace>;
    margin: OutputMapMargin<Namespace>;
    padding: OutputMapPadding<Namespace>;
    transition: OutputMapTransition<Namespace>;
};

export type ResultMap<
    Namespace extends NamespaceType,
    InputMap extends Record<string, any>,
    OutputMap extends { [InputKey in keyof InputMap]?: Record<string, any> }
> = {
    [InputKey in keyof InputMap as InputKey extends keyof OutputMap
        ? OutputMap[InputKey] extends Record<string, any>
            ? keyof OutputMap[InputKey]
            : InputKey
        : InputKey]: InputKey extends keyof OutputMap
        ? OutputMap[InputKey] extends Record<string, any>
            ? OutputMap[InputKey][keyof OutputMap[InputKey]]
            : InputMap[InputKey]
        : InputKey extends string
          ? Variable<NamespacedKey<Namespace, KebabCase<InputKey>>>
          : InputMap[InputKey];
};

export type NamespacedMap<Namespace extends NamespaceType, Input> = {
    [Key in keyof Input as Key extends string
        ? ExportedName<NamespacedKey<Namespace, Key>>
        : Key]: Input[Key];
};

export type Define<
    Namespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
> = NamespacedMap<Namespace, ResultMap<Namespace, SourceSubMap, OutputMap<Namespace>>>;
