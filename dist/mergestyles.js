'use strict';

var extend = require('extend');
var postcss = require('postcss');
var postcssnext = require('postcss-cssnext');
var fs = require('fs');
var path = require('path');

var defaultTheme = fs.readFileSync(path.join(__dirname, '../themes/default.css'), 'utf8');

exports.compile = function (options) {

  function injectVariables(variables) {
    return function (css) {
      var rule = postcss.rule({ selector: ':root' });
      var props = Object.keys(variables);
      var decls = props.map(function (prop) {
        return postcss.decl({ prop: '--' + prop, value: variables[prop] });
      });
      css.prepend(rule.append(decls));
    };
  }

  var opts = extend({
    backgroundColor: '#f5f2f0',
    padding: '10px 15px',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '13px',
    lineHeight: '1.5',
    tabSize: '2',
    fontColorBase: '#000',
    fontColorComments: 'slategray',
    fontColorPunctuation: '#999',
    fontColorTags: '#905',
    fontColorStrings: '#690',
    fontColorOperators: '#a67f59',
    fontColorKeywords: '#07a',
    fontColorFunctions: '#DD4A68',
    fontColorImportant: '#e90'
  }, options);

  return postcss([injectVariables(opts), postcssnext()]).process(defaultTheme).css;
};