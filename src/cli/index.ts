import meow from 'meow';
import help from './help';

const cli = meow(help, {
    flags: {
        out: {
            type: 'string',
            alias: 'o',
            default: 'tachyons.slim.css'
        },
        dir: {
            type: 'string',
            alias: 'd',
            default: false
        },
        fileType: {
            type: 'string',
            alias: 'f',
            default: 'html'
        },
        preserveImports: {
            type: 'boolean',
            alias: 'p',
            default: false
        },
        config: {
            type: 'string',
            alias: 'c',
            default: 'tachyons-slimmer.config.js'
        },
        vue: {
            type: 'boolean',
            alias: 'v',
            default: false
        },
        vuePug: {
            type: 'boolean',
            default: false
        },
        tachyonsDebug: {
            type: 'boolean',
            default: false
        },
        tachyonsNormalize: {
            type: 'boolean',
            default: true
        }
    }
});
export default cli;
