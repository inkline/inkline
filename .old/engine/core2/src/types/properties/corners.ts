export type CornersPropertyKeys = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';

export type CornersProperty<Value> = {
    topLeft: Value;
    topRight: Value;
    bottomRight: Value;
    bottomLeft: Value;
};
