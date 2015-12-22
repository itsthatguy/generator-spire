module.exports = {
  'rules': {
    'trailing-semicolon': 1,
    'no-ids': 2,
    'space-after-colon': 1,
    'placeholder-in-extend': 2,
    'extends-before-mixins': 2,
    'hex-notation': [1, {'style': 'lowercase'}],
    'no-warn': 1,
    'no-important': 2,
    'no-ids': 2,
    'single-line-per-selector': 1,
    'no-color-keywords': 1,
    'mixins-before-declarations': [2, {
      'exclude': ['breakpoint', 'mq']
    }],
    'no-debug': 1,
    'indentation': [1, {'size': 2}],
    'extends-before-declarations': 2,
    'variable-for-property': [1, {
        'properties': ['color']
    }]
  },
  'options': {
    'merge-default-rules': false
  }
}
