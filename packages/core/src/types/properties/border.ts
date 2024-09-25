import { TokenValue } from '../tokens';
import { SidesProperty } from './sides';

export type BorderProperty = {
    color: TokenValue;
    style: TokenValue;
    width: TokenValue;
};

export type BorderSidesProperty = SidesProperty<BorderProperty>;
