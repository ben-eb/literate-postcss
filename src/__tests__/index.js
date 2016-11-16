import test from 'ava';
import postcss from 'postcss';
import less from 'postcss-less-engine';
import safe from 'postcss-safe-parser';
import scss from 'postcss-scss';
import sugarss from 'sugarss';
import literate from '../';

function markdownToCss (t, fixture, expected, opts, plugins = []) {
    return postcss(plugins).process(fixture, literate(opts)).then(result => {
        t.deepEqual(result.css, expected);
    });
}

function shouldThrow (t, fixture, opts) {
    return t.throws(markdownToCss(t, fixture, fixture, opts));
}

test(
    'should handle css by default',
    markdownToCss,
    `# Hello, world!

A description of our first component, followed by its presentation:

\`\`\`css
h1 {
    color: blue;
}
\`\`\`
`,
`/*
 * # Hello, world!
 *
 * A description of our first component, followed by its presentation:
 */

h1 {
    color: blue;
}
`);

test(
    'should handle css by default (without the language tag)',
    markdownToCss,
    `# Hello, world!

A description of our first component, followed by its presentation:

\`\`\`
h1 {
    color: blue;
}
\`\`\`
`,
`/*
 * # Hello, world!
 *
 * A description of our first component, followed by its presentation:
 */

h1 {
    color: blue;
}
`);

test(
    'should strip comments',
    markdownToCss,
    `# Hello, world!

A description of our first component, followed by its presentation:

\`\`\`
h1 {
    color: blue;
}
\`\`\`
`,
`h1 {
    color: blue;
}
`,
    {stripComments: true}
);

test(
    'should handle css first',
    markdownToCss,
    `\`\`\`css
h1 {
    color: blue;
}
\`\`\`

css first!
`,
`h1 {
    color: blue;
}

/*
 * css first!
 */


`
);

test(
    'should handle multiple prose blocks',
    markdownToCss,
    `# one

\`\`\`
h1{color:blue}
\`\`\`

# two

\`\`\`
h2{color:red}
\`\`\`
`,
`/*
 * # one
 */

h1{color:blue}

/*
 * # two
 */

h2{color:red}
`,
);

test(
    'should contain unsupported languages in comments',
    markdownToCss,
    `# html

\`\`\`html
<a href="https://github.com/ben-eb/literate-postcss">literate-postcss</a>
\`\`\`
`,
`/*
 * # html
 *
 * \`\`\`html
 * <a href=\"https://github.com/ben-eb/literate-postcss\">literate-postcss</a>
 * \`\`\`
 */


`
);

test(
    'should handle broken css',
    markdownToCss,
    `# Hello!

    h1 {
        color: blue
    `,
    `/*
 * # Hello!
 */

h1 {
    color: blue
}`,
    {parser: safe}
);

test(
    'should handle scss',
    markdownToCss,
    `# Hello!

    .#{class} {
        color: blue;
    }`,
    `/*
 * # Hello!
 */

.#{class} {
    color: blue;
}
`,
    {syntax: scss}
);

test(
    'should handle sugarss',
    markdownToCss,
    `# Hello!

    h1
        color: blue
    `,
    `/*
 * # Hello! */

h1
    color: blue
`,
    {syntax: sugarss}
);

test(
    'should handle less',
    markdownToCss,
    `# Hello!

    h1 {
        width: (1 + 1);
    }`,
    `/* * # Hello! */
h1 {
    width: 2
}`,
    {parser: less.parser},
    less
);

test(
    'should handle custom languages',
    markdownToCss,
    `# Hello!

\`\`\`foobar
h1{color:blue}
\`\`\``,
`/*
 * # Hello!
 */

h1{color:blue}
`,
    {languages: ['foobar']}
);

test(
    'should throw on invalid language definitions',
    shouldThrow,
    `\`\`\`foobar
h1{color:blue}
\`\`\``,
    {languages: 'foobar'}
);
