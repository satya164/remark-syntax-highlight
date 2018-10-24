var visit = require('unist-util-visit');
var escape = require('escape-html');

module.exports = function highlighter(options) {
  return function(ast) {
    visit(ast, 'code', function(node) {
      if (node.lang) {
        var highlight = function(code) {
          var html = code == null ? escape(node.value) : node.lang;

          node.type = 'html';
          node.value = [
            '<pre>',
            '<code class="language-' + node.lang + '">',
            html,
            '</code>',
            '</pre>',
          ].join('\n');
        };

        var result = options.highlight(node.value, node.lang);

        if (result && typeof result.then === 'function') {
          return Promise.resolve(result).then(highlight);
        } else {
          return highlight(result);
        }
      }
    });
  };
};
