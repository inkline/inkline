import { address } from './address';
import { blockquote } from './blockquote';
import { body } from './body';
import { caption } from './caption';
import { code } from './code';
import { d1, d2, d3, d4, d5, d6 } from './display';
import { h1, h2, h3, h4, h5, h6 } from './heading';
import { hr } from './hr';
import { kbd } from './kbd';
import { link } from './link';
import { pre } from './pre';
import { samp } from './samp';
import { figure, thumbnail } from './images';
import { dl, list, ol, ul } from './lists';
import { mark } from './mark';
import { initialism, lead, p } from './paragraphs';
import { defineElementsGroup } from '../../../../../utils';

export const elements = defineElementsGroup({
    address,
    blockquote,
    body,
    caption,
    code,
    dl,
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    figure,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    initialism,
    kbd,
    lead,
    list,
    link,
    mark,
    ol,
    p,
    pre,
    samp,
    thumbnail,
    ul
});
