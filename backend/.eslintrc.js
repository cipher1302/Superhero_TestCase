module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended', 'plugin:security/recommended', 'prettier'],
  plugins: ['security', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
  },
};
