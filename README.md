# remark-syntax-highlight

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![MIT License][license-badge]][license]
[![Version][version-badge]][package]
[![Bundle size (minified + gzip)][bundle-size-badge]][bundle-size]

Syntax highlight code blocks with a custom highlight function in [remark](https://github.com/remarkjs/remark).

## Why

Several markdown parsers accept a highlight function where you can highlight code in any way you want. It's especially useful if you're concerned about the bundle size and want to support a limited set of languages. However, with remark, you have to write a custom plugin to achieve the same behavior.

The official plugin for highlighting is [`remark-highlight.js`](https://github.com/remarkjs/remark-highlight.js), which uses `highlight.js`. However, it isn't possible to customize which languages are loaded. In addition, if you want to use something like [`prism.js`](https://prismjs.com/) instead of `highlight.js`, there's no similar plugin available.

This plugin is a tiny abstraction over `remark`'s plugin API, allowing you to pass a custom `highlight` function.

## Installation

```sh
npm install remark-syntax-highlight
```

or

```sh
yarn add remark-syntax-highlight
```

## Usage

First, we need to wrap our worker:

```js
import remark from 'remark';
import highlight from 'remark-syntax-highlight';

import html from 'remark-html';
import github from 'hast-util-sanitize/lib/github';
import merge from 'deepmerge';

// Import the highlighter, for example, say I want prism with javascript support
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// Preserve className attributes when sanitizing the HTML
// This is necessary for syntax highlighting
const schema = merge(github, { attributes: { '*': ['className'] } });

remark()
  .use(html, { sanitize: schema })
  .use(highlight, {
    // Pass a highlight function to highlight the code
    highlight: (code, language) => {
      const grammar = languages[lang];

      if (grammar) {
        return highlight(code, grammar);
      }
    },
  })
  .process(markdown, function(err, file) {
    // do something
  });
```

You can return highlighted HTML code from the `highlight`, or `null`/`undefined` if no highlight was performed. The plugin will escape the HTML from the code if no highlight was performed.

You can also return a promise which resolves to the highlighted HTML. This can be useful if you want to load languages as needed.

## Contributing

While developing, you can run the example app and open the console to see your changes:

```sh
yarn example
```

Make sure your code passes ESLint. Run the following to verify:

```sh
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint -- --fix
```

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/project/github/satya164/remark-syntax-highlight/master.svg?style=flat-square
[build]: https://circleci.com/gh/satya164/remark-syntax-highlight
[coverage-badge]: https://img.shields.io/codecov/c/github/satya164/remark-syntax-highlight.svg?style=flat-square
[coverage]: https://codecov.io/github/satya164/remark-syntax-highlight
[license-badge]: https://img.shields.io/npm/l/remark-syntax-highlight.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[version-badge]: https://img.shields.io/npm/v/remark-syntax-highlight.svg?style=flat-square
[package]: https://www.npmjs.com/package/remark-syntax-highlight
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/remark-syntax-highlight.svg?style=flat-square
[bundle-size]: https://bundlephobia.com/result?p=remark-syntax-highlight
