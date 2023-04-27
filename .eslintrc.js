module.exports = {
  root: true,

  extends: ['react-app', 'react-app/jest'],

  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'no-var': 'error',
    'react/prop-types': 'error',
    semi: 'error'
  },

  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off'
      }
    }
  ]
};
