# literate-[postcss][postcss] [![Build Status](https://travis-ci.org/ben-eb/literate-postcss.svg?branch=master)][ci]  [![NPM version](https://badge.fury.io/js/literate-postcss.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/literate-postcss.svg)][deps]

> Write CSS documentation with Markdown and then transform it into CSS.

## Install

With [npm](https://npmjs.org/package/literate-postcss) do:

    npm install literate-postcss --save

## Examples

See the [`examples` directory][examples] for some ideas on how you can use
literate-postcss. If you're using literate-postcss for your styles, please
feel free to get in touch and we'll list your site here.

[examples]: https://github.com/ben-eb/literate-postcss/tree/master/examples

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### literate-postcss

literate-postcss allows you to write Markdown files with embedded CSS code,
and then transform them into a format that can be processed by PostCSS. It's
a way of writing stylesheets that is more like a short-form article, and is
great for documentation focused use cases such as style guides or
pattern libraries.

Because this tool is based on open standards, there's no new language that
you need to learn, or plugin that you need to install in your editor to
enable syntax highlighting, beyond support for CSS & Markdown. If you use
Atom, for instance, there's a Markdown preview that works extremely well
with this format.

Writing CSS in this way allows you to take any Markdown previewer to your
styles and instantly transform them into beautiful documentation. There's
no docblock convention to follow, and you can write as much or as little
supporting text as you would like. You can also use headings and links
to help structure and add meaning to your stylesheet.

 The following parsers have been tested and are known to work out of the box:

-   [postcss](https://github.com/postcss/postcss)' default parser.
-   [postcss-less](https://github.com/Crunch/postcss-less)
-   [postcss-safe-parser](https://github.com/postcss/postcss-safe-parser)
-   [postcss-scss](https://github.com/postcss/postcss-scss)
-   [sugarss](https://github.com/postcss/sugarss)

Note that as literate-postcss is a wrapper for the PostCSS options object,
it should not be used as a traditional plugin. See the examples for details.

**Parameters**

-   `opts` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Same as the [PostCSS options](https://github.com/postcss/postcss#options),
    plus:
    -   `opts.start` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** This string is used to begin the comment block.
    -   `opts.middle` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** This string is prepended to each comment block
        line, other than the `start` & `end` lines.
    -   `opts.end` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** This string is used to end the comment block.
    -   `opts.stripComments` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Setting to `true` removes any
        non-code blocks when parsing Markdown. Note that this option does not
        analyse comments _within_ code blocks and therefore will not strip them. (optional, default `false`)
    -   `opts.languages` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)]** This sets the
        languages that will not be converted into comments, and should be anything
        that a PostCSS parser is capable of parsing. (optional, default `['css','less','scss','sss']`)

**Examples**

_Basic usage_

```javascript
import postcss from 'postcss';
import literate from 'literate-postcss';

const markdown = `# Hello!

    h1 {
        color: blue;
    }`;

postcss().process(markdown, literate()).then(result => {
    console.log(result.content);
    // /*
    //  * # Hello!
    //  *\/
    // h1 {
    //     color: blue;
    // }
});
```

_Usage with postcss-less_

```javascript
import postcss from 'postcss';
import less from 'postcss-less-engine';
import literate from 'literate-postcss';

const markdown = `# Hello!

    h1 {
        width: (1 + 1);
    }`;

postcss(less).process(markdown, literate({parser: less.parser})).then(result => {
    console.log(result.content);
    // /* * # Hello! *\/
    // h1 {
    //     width: 2;
    // }
});
```

_Usage with postcss-scss_

```javascript
import postcss from 'postcss';
import scss from 'postcss-scss';
import literate from 'literate-postcss';

const markdown = `# Hello!

    .#{class} {
        color: blue;
    }`;

postcss().process(markdown, literate({syntax: scss})).then(result => {
    console.log(result.content);
    // /*
    //  * # Hello!
    //  *\/
    // .#{class} {
    //     color: blue;
    // }
});
```

_Usage with sugarss_

```javascript
import postcss from 'postcss';
import sugarss from 'sugarss';
import literate from 'literate-postcss';

const markdown = `# Hello!

    h1
        color: blue
`;

postcss().process(markdown, literate({syntax: sugarss})).then(result => {
    console.log(result.content);
    // /*
    //  * # Hello! *\/
    // h1
    //     color: blue
});
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/1282980?v=3" width="100px;"/><br /><sub>Ben Briggs</sub>](http://beneb.info)<br />[💻](https://github.com/ben-eb/literate-postcss/commits?author=ben-eb) [📖](https://github.com/ben-eb/literate-postcss/commits?author=ben-eb) 👀 [⚠️](https://github.com/ben-eb/literate-postcss/commits?author=ben-eb) |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors] specification. Contributions of
any kind welcome!

## License

MIT © [Ben Briggs](http://beneb.info)

[all-contributors]: https://github.com/kentcdodds/all-contributors

[ci]: https://travis-ci.org/ben-eb/literate-postcss

[deps]: https://gemnasium.com/ben-eb/literate-postcss

[npm]: http://badge.fury.io/js/literate-postcss

[postcss]: https://github.com/postcss/postcss