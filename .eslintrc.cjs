module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": 'off',
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        
        // jsx
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-indent-props': [ 'error', 2 ],
        'react/jsx-indent': [ 'error', 2 ],
        'react/jsx-sort-props': 'error'
    }
}
