import { app } from '@storybook/vue3';
import Inkline from '../src/inkline';
import '../src/inkline.scss';
import './preview.scss';

app.use(Inkline);

export const parameters = {
  actions: {
      argTypesRegex: "^on[A-Z].*"
  },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
}
