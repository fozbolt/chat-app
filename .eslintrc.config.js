module.exports ={
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],

    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.config.js'],
    rules: {
        '@typescript-eslint/no-misused-promises': [
            2,
            {
                checksVoidReturn: {
                    attributes: false,
                },
            },
        ],
        // we use some enums as mapping objects
        '@typescript-eslint/no-duplicate-enum-values': 'off',
        'no-console': 'off',
        'no-unexpected-multiline': 'warn',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/dot-notation': 'error',
        'prefer-arrow-callback': 'error',
        'func-names': ['error', 'always'],
        'no-unused-vars': 'off',
        // '@typescript-eslint/interface-name-prefix': 'off',
        // '@typescript-eslint/explicit-function-return-type': 'off',
        // '@typescript-eslint/explicit-module-boundary-types': 'off',
        // '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic',
            },
        ],
    },
};
