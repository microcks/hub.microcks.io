export default {
  extends: ['@pplancq/stylelint-config', '@pplancq/stylelint-config/prettier'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['custom-variant', 'theme', 'layer', 'apply'],
      },
    ],
    'at-rule-no-deprecated': null,
  },
};
