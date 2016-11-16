// @flow

export type PostCSSSyntax = {
    parse: Function,
    stringify: Function,
};

export type LiterateOptions = {
    parser?: Function,
    syntax?: PostCSSSyntax,
    start?: string,
    middle?: string,
    end?: string,
    stripComments?: boolean,
    languages?: Array<string>,
};
