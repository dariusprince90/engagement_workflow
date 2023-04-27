import { create } from '@storybook/theming';
import logo from '../public/pm-logo-stacked-color.png';

export default create({
  base: 'light',
  brandTitle: 'New Engagement Approval',
  brandUrl: 'https://new.dev.az.Company.com',
  brandImage: logo,
  brandTarget: '_blank',

  // typography
  fontBase: '"CaskaydiaCove NF Light", Consolas, "Open Sans", sans-serif',
  fontCode: 'monospace'
});
