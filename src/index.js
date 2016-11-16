// @flow

import postcss from 'postcss';
import getCss from './getCss';
import type {LiterateOptions} from './types';

function resolveParser ({syntax, parser}) {
    if (syntax) {
        return syntax.parse;
    }
    return parser ? parser : postcss.parse;
}

/**
 * literate-postcss allows you to write Markdown files with embedded CSS code,
 * and then transform them into a format that can be processed by PostCSS. It's
 * a way of writing stylesheets that is more like a short-form article, and is
 * great for documentation focused use cases such as style guides or
 * pattern libraries.
 *
 * Because this tool is based on open standards, there's no new language that
 * you need to learn, or plugin that you need to install in your editor to
 * enable syntax highlighting, beyond support for CSS & Markdown. If you use
 * Atom, for instance, there's a Markdown preview that works extremely well
 * with this format.
 *
 * Writing CSS in this way allows you to take any Markdown previewer to your
 * styles and instantly transform them into beautiful documentation. There's
 * no docblock convention to follow, and you can write as much or as little
 * supporting text as you would like. You can also use headings and links
 * to help structure and add meaning to your stylesheet.
 *
 *  The following parsers have been tested and are known to work out of the box:
 *
 * * [postcss](https://github.com/postcss/postcss)' default parser.
 * * [postcss-less](https://github.com/Crunch/postcss-less)
 * * [postcss-safe-parser](https://github.com/postcss/postcss-safe-parser)
 * * [postcss-scss](https://github.com/postcss/postcss-scss)
 * * [sugarss](https://github.com/postcss/sugarss)
 *
 * Note that as literate-postcss is a wrapper for the PostCSS options object,
 * it should not be used as a traditional plugin. See the examples for details.
 *
 * @name literate-postcss
 * @param {Object} [opts] Same as the [PostCSS options](https://github.com/postcss/postcss#options),
 * plus:
 * @param {String} [opts.start] This string is used to begin the comment block.
 * @param {String} [opts.middle] This string is prepended to each comment block
 * line, other than the `start` & `end` lines.
 * @param {String} [opts.end] This string is used to end the comment block.
 * @param {Boolean} [opts.stripComments=false] Setting to `true` removes any
 * non-code blocks when parsing Markdown. Note that this option does not
 * analyse comments *within* code blocks and therefore will not strip them.
 * @param {Array} [opts.languages=['css', 'less', 'scss', 'sss']] This sets the
 * languages that will not be converted into comments, and should be anything
 * that a PostCSS parser is capable of parsing.
 * @example <caption>Basic usage</caption>
 * import postcss from 'postcss';
 * import literate from 'literate-postcss';
 *
 * const markdown = `# Hello!
 *
 *     h1 {
 *         color: blue;
 *     }`;
 *
 * postcss().process(markdown, literate()).then(result => {
 *     console.log(result.content);
 *     // /*
 *     //  * # Hello!
 *     //  *\/
 *     // h1 {
 *     //     color: blue;
 *     // }
 * });
 *
 * @example <caption>Usage with postcss-less</caption>
 * import postcss from 'postcss';
 * import less from 'postcss-less-engine';
 * import literate from 'literate-postcss';
 *
 * const markdown = `# Hello!
 *
 *     h1 {
 *         width: (1 + 1);
 *     }`;
 *
 * postcss(less).process(markdown, literate({parser: less.parser})).then(result => {
 *     console.log(result.content);
 *     // /* * # Hello! *\/
 *     // h1 {
 *     //     width: 2;
 *     // }
 * });
 *
 * @example <caption>Usage with postcss-scss</caption>
 * import postcss from 'postcss';
 * import scss from 'postcss-scss';
 * import literate from 'literate-postcss';
 *
 * const markdown = `# Hello!
 *
 *     .#{class} {
 *         color: blue;
 *     }`;
 *
 * postcss().process(markdown, literate({syntax: scss})).then(result => {
 *     console.log(result.content);
 *     // /*
 *     //  * # Hello!
 *     //  *\/
 *     // .#{class} {
 *     //     color: blue;
 *     // }
 * });
 *
 * @example <caption>Usage with sugarss</caption>
 * import postcss from 'postcss';
 * import sugarss from 'sugarss';
 * import literate from 'literate-postcss';
 *
 * const markdown = `# Hello!
 *
 *     h1
 *         color: blue
 * `;
 *
 * postcss().process(markdown, literate({syntax: sugarss})).then(result => {
 *     console.log(result.content);
 *     // /*
 *     //  * # Hello! *\/
 *     // h1
 *     //     color: blue
 * });
 */

function literate (defaultOpts: LiterateOptions = {}) {
    function setOptions (parserOpts) {
        const parser = resolveParser(parserOpts);
        return function wrappedParser (literateString: String, opts: LiterateOptions) {
            const cssString = getCss(literateString, opts);
            return parser(cssString, opts);
        };
    }

    return {
        stripComments: false,
        start: '/*\n',
        middle: ' * ',
        end: '\n */\n\n',
        languages: ['css', 'less', 'scss', 'sss'],
        ...defaultOpts,
        parser: setOptions(defaultOpts),
    };
}

export default literate;
