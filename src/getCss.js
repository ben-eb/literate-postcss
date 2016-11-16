// @flow

import remark from 'remark';
import commentBlocks from 'remark-comment-blocks';
import type {LiterateOptions} from './types';

function isSupportedLanguage ({lang}, languages) {
    if (!languages || !Array.isArray(languages)) {
        throw new Error('An array of languages must be provided.');
    }
    return !lang || ~languages.indexOf(lang);
}

export default function getCss (fromString: String, opts: LiterateOptions) {
    const {start, middle, end, stripComments, languages} = opts;

    const proc = remark().use(commentBlocks, {start, middle, end});
    const ast = proc.parse(fromString);

    let cache = {type: 'root', children: []};
    return ast.children.reduce((toString, node) => {
        if (node.type !== 'code') {
            cache.children.push(node);
        } else {
            if (!isSupportedLanguage(node, languages)) {
                cache.children.push(node);
                return toString;
            }
            if (!stripComments) {
                if (toString.length) {
                    toString += '\n\n';
                }
                if (cache.children.length) {
                    toString += proc.stringify(cache);
                }
            }
            toString += node.value;
            if (!cache.children.length) {
                toString += '\n\n';
            }
            cache.children = [];
        }
        return toString;
    }, '') + (!stripComments && cache.children.length && proc.stringify(cache) || '') + '\n';
}
