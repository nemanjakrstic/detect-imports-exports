const getModuleInfo = require('./getModuleInfo');
const glob = require('glob');

// Path to the Xola source.
const PATH = '/Users/nemanja/Xola/xola/src/**/*.js'

// Ignore files with this patterns.
const IGNORE = ['saas\\.js', 'jsrsasign-latest-all-min\\.js', 'vendor', 'backbone'];

// Registry for all files.
const registry = {};

glob.sync(PATH).forEach((path) => {
    if (IGNORE.every((pattern) => !new RegExp(pattern).test(path))) {
        const moduleInfo = getModuleInfo(path);

        moduleInfo.exports.forEach((exportName) => {
            if (registry.hasOwnProperty(exportName)) {
                console.error(`${exportName} already exists in ${registry[exportName]}`);
            }

            registry[exportName] = {
                path: path.substring('/Users/nemanja/Xola/xola/'.length),
                imports: moduleInfo.imports,
                exports: moduleInfo.exports,
            };
        });
    }
});

console.log(registry);
