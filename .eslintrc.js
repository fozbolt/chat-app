/**
 * NOTE: this is considered as a playground for implementing the same rules on AMS, hence a lot of comments related to AMS
 * NOTE2: eslint deprecated rules: You can continue to use deprecated rules indefinitely if they are working for you. However, keep in mind that deprecated rules will effectively be unmaintained and may be removed at some point.
 * NOTE3: search for word 'diskutabilno' for questionable ones, search 'deprecated' for deprecated ones
 * Kada cu dodavati pravila, ne kopirati cijeli file jer se nece vidjeti izmmjene, zamijeniti postojeca i na kraju dodati nova!, isto za tsconfig i prettier
 * provjeriti jos jednom da nisam koje u bilo kojem fileu izostavio
 */
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest', //diskutabilno
    },
    plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
    extends: [
        'eslint:recommended', //AMS doesn't use any of this recommended esllint rules ->B2b ga koristi -> note: "No rules are enabled by default. The "extends": "eslint:recommended" property in a configuration file enables rules that report common problems"
        'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/eslint-recommended', // AMS uses this but it's suspicious to me  because its empty and just extends eslint:recommended-> ask Marko
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js', '.prettierrc.js', '*.dto.{ts,js}', '*.entity.{ts,js}', 'app.e2e-spec.ts'], //promijeniti u ovo i na AMS prva dva, ostaatak je diskutabilan, ali previsse kompliciraju stvari za dto i entitete
    rules: {
        // eslint rules (AMS) + eslint:recommended overrides
        'no-console': 'warn', // tako ima i AMS, diskutablino, vj pustiti tako radi svih loggera koje imamo
        'no-unexpected-multiline': 'error', // AMS ima na warn -> ne treba jer je na error u eslint recommended
        'prefer-arrow-callback': 'error', // Requires arrow function callbacks instead of anonymous function expressions -> questionable for AMS - search code -> also on few places
        'func-names': ['error', 'always'], // Requires function names -> questionable for AMS - search code -> we have singletos, do not implement this?
        'prefer-template': 'error', //AMS ima na warn
        'eqeqeq': 'warn', //Kao AMS,
        'no-param-reassign': 'warn', //kao AMS
        'no-unsafe-optional-chaining': 'warn', //nema AMS, error mozda pre strogo s obzoirom da nemamo '| undefined' u interfaceima

        // deprecated rules that AMS has and their alternatives
        // 'unused-imports/no-unused-imports': 'error', //AMS ima na warn //isto deprecated -> zamjena -> eslint-plugin-simple-import-sort plugin
        // 'simple-import-sort/imports': 'warn', // kao AMS, prodiskutirati -> nisam siguran da li ova dva rulesa jos postoje -> zamjena. dodao plugin za ovo eslint-plugin-simple-import-sort plugin
        // 'simple-import-sort/exports': 'warn', //kao AMS //deprecated? ne mogu ga naci -> zamjena: eslint-plugin-simple-import-sort
        // quotes //-> dodano u prettier
        // 'quote-props': ['warn', 'as-needed', { numbers: false }], //prettier ima i editorConfig
        // 'object-curly-newline' //( ne obnavlja se, ali radi) -> prettier nema, ali to je samo za importe na Ams, bez toga se da?
        // space-before-function-paren // treba samo za async arrow-> tnema ni prettier ni editorConfig, mogu i pustiti tako makar je deprecated
        // 'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // -> nastimao u editorConfig;
        // 'comma-dangle': 'off', // ovo bi bilo dobro imati, osim u JSONU, prettier ima po defaultu na true za multiline, editorCOnfig ima ij_typescript_enforce_trailing_comma
        // 'max-len': 'off', // prettier has printWidth, editorConfig ima hard wrap

        // additional eslint rules (the ones that are not on AMS an not in eslint:recommended
        'no-unmodified-loop-condition': 'error',
        'no-constant-binary-expression': 'error',
        'no-duplicate-imports': 'error',
        'no-promise-executor-return': 'error', // may cause some errors in AMS
        'block-scoped-var': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'dot-notation': 'warn',
        'max-lines': ['warn', { 'max': 1000 }], //enlarge if necessary, diskutabilno
        // 'new-cap': 'error', // nije prikladno za dekoratore
        'no-eq-null': 'error', // na AMS mozda prikladan warn
        'no-extra-label': 'error',
        'no-invalid-this': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'require-await': 'error',
        // 'sort-keys': 'warn', //boring, complains in modules and everything, sometimes messes the custom structure
        'yoda': 'error',
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',

        // eslint -> @typescript-eslint rules overrides
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'error',
        'no-throw-literal': 'off',
        '@typescript-eslint/only-throw-error': 'error', //za mene ok, ali AMS je mozda prevelik projekt i bilo bi previse konflikata
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error', // AMS ima na warn, testirati, ali vj je previse error
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_',
            },
        ], // AMS ima na warn
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        'init-declarations': 'off',
        '@typescript-eslint/init-declarations': 'warn', // AMS bi bilo previse promjena da ima ovo, za moj projekt bi islo i na error, ali mozda naporno i nepotrebno

        // @typescript-eslint rules
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/no-var-requires': 'warn', // kao AMS
        '@typescript-eslint/no-this-alias': 'off', // Disables the rule that flags using 'this' as an alias -> this is error by defualt, so if AMS has it, then its ok to delete it
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/no-require-imports': 'error', //jako diskutabilno posto imamo common, probati disableati koji file pa ce biti ok? testirati
        '@typescript-eslint/no-duplicate-enum-values': 'off', // because of bodyTypes mappings etc, only no-dupe-keys is convenient
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-mixed-enums': 'error', // diskutabilno
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/ban-types': 'error', //AMS ima na warn, inace je ovo defaultno i ne treba
        '@typescript-eslint/no-explicit-any': 'error', //ne treba jer je defaultno
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-inferrable-types': 'error', //ovo je nesto sto ja koristim u AMS, a nije potrebno, diskutirati!, ima puno opcija, AMS ima na off, vj ne treba off kad jer je default off?
        '@typescript-eslint/no-empty-interface': 'error', //AMS ima na off, diskutabilno
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/prefer-find': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error', // ovo bi isto izazvalo velike promjene i da li je prikladno za zamjeniti sve slucajeve
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error', //ovo bi znalo izazivati probleme posvugdje
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/prefer-for-of': 'error', //only in cases where index is not used
        // '@typescript-eslint/parameter-properties': 'error', //diskutabilno
        // '@typescript-eslint/interface-name-prefix': 'off', //tako ima AMS, ali mislim da je po defaultnu na off: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-array-delete': 'error',
        '@typescript-eslint/space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ], //kao AMS
        '@typescript-eslint/unified-signatures': [
            'error',
            {
                'ignoreDifferentlyNamedParameters': true,
            },
        ],
        '@typescript-eslint/no-base-to-string': [
            'error', {
                'ignoredTypeNames': ['Error', 'RegExp', 'URL', 'URLSearchParams'],
            },
        ],
        // ako ovo nije ok, eslint ima rule 'camelCase'
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': ['variable', 'function'],
                'format': ['camelCase'],
                'leadingUnderscore': 'allow',
                'trailingUnderscore': 'allow',
            },
            // {
            //   'selector': 'variable',
            //   'format': ['camelCase', 'UPPER_CASE']  //ovo je malo blaze, ali da li to ukljucuje propertye?
            // },
            {
                'selector': 'interface',
                'format': ['PascalCase'],
                // 'suffix': ['Interface'], //ovo mozda maknuti, ne svida mi se da moramo dodati suffix na svaki interface, samo za primjer
            }, //ovo pitati, meni se bas ne svida, ali je standard ok
            {
                'selector': 'class',
                'format': ['PascalCase'],
                'leadingUnderscore': 'forbid',
                'trailingUnderscore': 'forbid',
            },
            {
                'selector': 'variable',
                'types': ['boolean'],
                'format': ['PascalCase'],
                'prefix': ['is', 'should', 'has', 'can', 'did', 'will'],
            },
        ], //ovo jos doraditi i dosta je strogo pa provjeriti, ovdje upitne varjable kao BYNCO_PAGE_SIZE (konstante globalne), istraziti i variableLike
        '@typescript-eslint/explicit-function-return-type': 'error',
        // Note: you must disable the base rule as it can report incorrect errors -> ovo nemamo u AMS i trebalo bi puno toga mijenajati..pitati Marka
        '@typescript-eslint/member-ordering': [
            'error',
            {
                'default': [
                    'field',
                    'signature',
                    'constructor',
                    'method',
                ],
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': 'error', //ova je stroga al po meni bi bilo dobro -> radi warninge na dekoratorima
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                'assertionStyle': 'as',
                'objectLiteralTypeAssertions': 'never',
            },
        ], //ova je kontroverzna
        '@typescript-eslint/consistent-indexed-object-style': [
            'error',
            'record',
        ],
        '@typescript-eslint/consistent-generic-constructors': [
            'error',
            'constructor',
        ],
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {
                'ts-expect-error': 'allow-with-description',
            },
        ],
        '@typescript-eslint/array-type': [ // Enforces a consistent array type
            'error',
            {
                default: 'generic',
            },
        ],
        // paket eslint-config-next vuce i dependacije kao sto su eslint-plugin react gdje runnanjem eslinta dolazi do problema: React version was set to 'detect' in eslint-plugin-react settings, but the 'react' package is not installed
        //replacement: no-import-assign rule ? that is already included in eslint:recommended
        '@next/next/no-assign-module-variable': 'off', // ovo je vj neki legacy, s nexta, da li nam uopce treba? ali AMS ima eslint-config-next i extenda next/core-web-vitals' -> zamijeniti eslit ruleom?
    },
};