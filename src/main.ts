/**
 * File used as Vite.js entry point.
 * Imports the ".scss" file to output compiled ".css" in the "dist" folder
 */

import '@inkline/inkline/inkline.scss';
import { Inkline } from '@inkline/inkline/plugin';

export * from '@inkline/inkline/inkline';
export default Inkline;
