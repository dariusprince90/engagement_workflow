import darkTheme from './themes/dark';
import lightTheme from './themes/light';

import '../src/scss/site.scss';
import '../src/configs/fontAwesomeConfig';
import '../src/configs/modals';
import '../src/components/screens/newEngagementInstance/newEngagementInstanceScreen.scss';

const white = '#ffffff';
const pmBlue050 = '#eceef1';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },

    expanded: true
  },

  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: white
      },
      {
        name: 'cfs background',
        value: pmBlue050
      }
    ]
  },

  darkMode: {
    current: 'dark',
    dark: darkTheme,
    light: lightTheme,
    stylePreview: true
  }
};
