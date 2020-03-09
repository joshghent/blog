module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        graphql: true,
        __PATH_PREFIX__: true,
        __BASE_PATH__: true,
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "graphql"
    ],
    "rules": {
        "react/jsx-one-expression-per-line": ["off"],
        "react/prefer-stateless-function": ["off"],
        "react/prop-types": ["off"],
        "max-len": ["off"],
        "react/no-danger": ["off"]
    }
};
