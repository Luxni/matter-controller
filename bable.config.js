
const path = require('path');

const aliasMapping = {
    "#general/log": "@matter/general/dist/esm/log",
    "#general/util": "@matter/general/dist/esm/util",
    "#general/environment": "@matter/general/dist/esm/environment",
    "#platform": "@matter/main/dist/esm/platform",
    "#general": resoleGeneral,
    // "#nodejs": "@matter/nodejs",

    // types
    "#types": "@matter/types/dist/esm/",
    "#datatype": "@matter/types/dist/esm/datatype",
    "#globals": "@matter/types/dist/esm/globals",
    "#clusters": "@matter/types/dist/esm/clusters",

    // node
    "#node": "@matter/node/dist/esm/node/",
    "#behavior": "@matter/node/dist/esm/behavior",
    "#behaviors": "@matter/node/dist/esm/behaviors",
    "#endpoints": "@matter/node/dist/esm/endpoints",
    "#endpoint": "@matter/node/dist/esm/endpoint",
    "#devices": "@matter/node/dist/esm/devices",
    "#storage": "@matter/node/dist/esm/storage",

    // protocol
    "#protocol": "@matter/protocol/dist/esm/protocol",
    "#certificate": "@matter/protocol/dist/esm/certificate",
    "#groups": "@matter/protocol/dist/esm/groups",
    "#interaction": "@matter/protocol/dist/esm/interaction",
    "#peer": "@matter/protocol/dist/esm/peer",
    "#action": "@matter/protocol/dist/esm/action",
    "#session": "@matter/protocol/dist/esm/session",
    "#fabric": "@matter/protocol/dist/esm/fabric",
    "#securechannel": "@matter/protocol/dist/esm/securechannel",
    "#codec": resolveCodecAlias,
    "#mdns": "@matter/protocol/dist/esm/mdns",

    // model
    "#model": "@matter/model",
    "#parser": "@matter/model/dist/esm/parser",
    "#standard": "@matter/model/dist/esm/standard",
    "#logic": "@matter/model/dist/esm/logic",
    "#models": "@matter/model/dist/esm/models",
    "#common": resolveCommonAlias,
};

module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            "babel-preset-expo",
            // ["@babel/preset-typescript", { allowDeclareFields: true }],
        ],
        plugins: [
            "@babel/plugin-transform-class-static-block",
            '@babel/plugin-transform-dynamic-import',
            "@babel/plugin-transform-arrow-functions",
            [
                "module-resolver",
                {
                    transformFunctions: ['require', 'import'],
                    // alias: aliasMapping,
                    // extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            ],
        ],
    };
};

function resoleGeneral(sourcePath, currentFile) {
    // console.log("[INFO] ", sourcePath, ">>", currentFile);
    return path.resolve(
        path.dirname(require.resolve('@matter/general')),
        ''
    );
}

function resolveCodecAlias(sourcePath, currentFile) {

    const callerPath = currentFile || '';
    if (callerPath.includes('@matter/protocol')) {
        return path.resolve(
            path.dirname(require.resolve('@matter/protocol')),
            'dist/esm/codec'
        );
    }

    return path.resolve(
        path.dirname(require.resolve('@matter/protocol')),
        'codec'
    );
}

function resolveCommonAlias(sourcePath, currentFile) {
    const callerPath = currentFile || '';

    if (callerPath.includes('@matter/protocol')) {
        return path.resolve(
            path.dirname(require.resolve('@matter/protocol')),
            'dist/esm/common'
        );
    }

    if (callerPath.includes('@matter/model')) {
        return path.resolve(
            path.dirname(require.resolve('@matter/model')),
            'dist/esm/common'
        );
    }

    return path.resolve(
        path.dirname(require.resolve('@matter/types')),
        ''
    );
}
