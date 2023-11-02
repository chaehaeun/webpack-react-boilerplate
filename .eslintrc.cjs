module.exports = {
  // 이 설정이 프로젝트의 최상위에 위치하고 있음을 명시
  root: true,

  // 코드 실행 환경을 정의
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended', // ESLint의 권장 설정
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 설정
    'plugin:react-hooks/recommended', // React Hooks 권장 설정
    'plugin:import/recommended', // import 관련 권장 설정
    'plugin:import/typescript', // TypeScript를 위한 import 설정
    'plugin:jsx-a11y/recommended', // 접근성 (a11y) 관련 권장 설정
    'prettier', // Prettier와 충돌하지 않는 ESLint 규칙을 사용
  ],

  // lint 검사에서 제외할 패턴
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  // TypeScript를 위한 파서 사용
  parser: '@typescript-eslint/parser',
  // 사용하는 ESLint 플러그인 목록
  plugins: ['react-refresh', 'jsx-a11y', 'react-hooks', 'import'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent', 'index'],
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '{react*,react*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{./**/*.module.css,./**/*.css}',
            group: 'unknown',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'unknown'],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          // 알파벳 순서로 정렬 설정
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jsx-a11y/anchor-has-content': [
      'warn',
      {
        components: ['Link'],
      },
    ],

    '@typescript-eslint/no-var-requires': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
