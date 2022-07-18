module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "plugin:jest/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    graphql: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "graphql", "jsx-a11y", "jest"],
  rules: {
    "react/jsx-one-expression-per-line": ["off"],
    "react/prefer-stateless-function": ["off"],
    "react/prop-types": ["off"],
    "max-len": ["off"],
    "react/no-danger": ["off"],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: [""],
        labelAttributes: [""],
        controlComponents: ["TextInput"],
        assert: "either",
        depth: 5,
      },
    ],
  },
};
