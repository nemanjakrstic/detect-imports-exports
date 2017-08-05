const detect = require('lexical-scope');
const fs = require('fs');

const getModuleInfo = (modulePath) => {
    const fullPath = modulePath + (modulePath.endsWith('.js') ? '' : '.js');
    const result = detect(fs.readFileSync(fullPath));

    return {
        imports: result.globals.implicit,
        exports: result.locals[''] || []
    };
};

module.exports = getModuleInfo;
