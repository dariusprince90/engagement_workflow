const webpack = require('webpack');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    'storybook-dark-mode',
    '@storybook/addon-storysource'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true
  },
  webpackFinal: async (config) => ({
    ...config,
    plugins: [
      ...config.plugins.filter((plugin) => plugin.constructor.name !== 'IgnorePlugin'),
      new webpack.IgnorePlugin({
        resourceRegExp: /react-dom\/client$/,
        contextRegExp: /(app\/react|app\\react|@storybook\/react|@storybook\\react)/
      })
    ]
  })
};
