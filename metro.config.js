const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require("fs");


/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const matter_link = (subpath) => {
    if (fs.lstatSync(`./node_modules/@matter/${subpath}`).isSymbolicLink()) {
        return path.resolve(fs.realpathSync(`./node_modules/@matter/${subpath}`));
    }
    else {
        return path.resolve(`./node_modules/@matter/${subpath}`);
    }
};

config.resolver.extraNodeModul = {
    "@matter/general": matter_link("general"),
    "@matter/model": matter_link("model"),
    "@matter/node": matter_link("node"),
    "@matter/types": matter_link("types"),
    "@matter/protocol": matter_link("protocol"),
    "@matter/react-native": matter_link("react-native"),
};

config.watchFolders = [
    // ...config.watchFolders,
    matter_link("general"),
    matter_link("model"),
    matter_link("node"),
    matter_link("types"),
    matter_link("protocol"),
    matter_link("react-native"),
];

config.resolver.resolveRequest = (context, moduleName, platform) => {

    if (moduleName === 'crypto') {
        // when importing crypto, resolve to react-native-quick-crypto
        const mappedPath = path.resolve(__dirname, 'node_modules', "react-native-quick-crypto");
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName === "@react-native-community/netinfo") {
        const mappedPath = path.resolve(__dirname, 'node_modules', "@react-native-community/netinfo");
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName === "react-native-udp") {
        const mappedPath = path.resolve(__dirname, 'node_modules', "react-native-udp");
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName === "elliptic") {
        const mappedPath = path.resolve(__dirname, 'node_modules', "elliptic");
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName === "@react-native-async-storage/async-storage") {
        const mappedPath = path.resolve(__dirname, 'node_modules/@react-native-async-storage/async-storage');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName === "react-native-ble-plx") {
        const mappedPath = path.resolve(__dirname, 'node_modules/react-native-ble-plx');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith("react-native-quick-crypto")) {
        const subpath = moduleName.substring("react-native-quick-crypto/".length);
        if (subpath) {
            const mappedPath = path.resolve(__dirname, "node_modules/react-native-quick-crypto", subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }
        const mappedPath = path.resolve(__dirname, 'node_modules/react-native-quick-crypto');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith("react-native-polyfill-globals")) {
        const subpath = moduleName.substring("react-native-polyfill-globals/".length);
        const mappedPath = path.resolve(__dirname, 'node_modules/react-native-polyfill-globals', subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith("@noble")) {
        const subpath = moduleName.substring("@noble/".length);
        if (subpath) {
            const mappedPath = path.resolve(__dirname, 'node_modules/@noble', subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }
        const mappedPath = path.resolve(__dirname, 'node_modules/@noble');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#general",
        "@matter/general"
    ].includes(moduleName)) {
        const mappedPath = path.resolve(matter_link("general"), 'dist/esm');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#model",
        "@matter/model",
    ].includes(moduleName)) {
        const mappedPath = path.resolve(matter_link("model"), 'dist/esm');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#node"
    ].includes(moduleName)) {
        const mappedPath = path.resolve(matter_link("node"), 'dist/esm');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#protocol",
        "@matter/protocol"
    ].includes(moduleName)) {
        // const mappedPath = matter_link("protocol");
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm");
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#types",
        "@matter/types"
    ].includes(moduleName)) {
        // const mappedPath = matter_link("types");
        const mappedPath = path.resolve(matter_link("types"), "dist/esm/");
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith("#clusters")) {
        const subpath = moduleName.substring("#clusters/".length);
        if (subpath) {
            const mappedPath = path.resolve(__dirname, 'node_modules/@matter/types/dist/esm/clusters', subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }
        else {
            const mappedPath = path.resolve(__dirname, 'node_modules/@matter/types/dist/esm/clusters/');
            return context.resolveRequest(context, mappedPath, platform);
        }
    }

    if (moduleName.startsWith("#behaviors")) {
        const subpath = moduleName.substring("#behaviors/".length);
        if (subpath) {
            const mappedPath = path.resolve(__dirname, 'node_modules/@matter/node/dist/esm/behaviors', subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }
        else {
            const mappedPath = path.resolve(__dirname, 'node_modules/@matter/node/dist/esm/behaviors');
            return context.resolveRequest(context, mappedPath, platform);
        }
    }

    if ([
        "#protocol/ChannelManager.js",
        "#protocol/DeviceAdvertiser.js",
        "#protocol/DeviceCommissioner.js",
        "#protocol/ExchangeManager.js",
        "#protocol/ExchangeProvider.js",
        "#protocol/MessageChannel.js",
        "#protocol/MessageCounter.js",
        "#protocol/MessageExchange.js",
        "#protocol/MessageReceptionState.js",
        "#protocol/ProtocolHandler.js",
        "#protocol/ProtocolStatusMessage.js",
        "#protocol/index.js",
    ].includes(moduleName)) {
        const subpath = moduleName.substring("#protocol/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "protocol", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }


    if ([
        "#certificate/kinds/CertificationDeclaration.js",
        "#certificate/CertificateAuthority.js",
        "#certificate/kinds/Icac.js",
        "#certificate/kinds/Noc.js",
        "#certificate/kinds/Rcac.js",
        "#certificate/kinds/X509Base.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/certificate');
        const subpath = moduleName.substring("#certificate/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm/", "certificate", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        '@matter/protocol/mdns',
        "#mdns/MdnsScanner.js",
    ].includes(moduleName)) {
        const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/mdns');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith('#action')) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/action/');
        const subpath = moduleName.substring("#action/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm/action", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#groups/KeySets.js",
        "#groups/MessagingState.js",
        "#groups/FabricGroups.js",
    ].includes(moduleName)) {
        const subpath = moduleName.substring("#groups/".length);
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/groups');
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "groups", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#peer/InteractionQueue.js",
        "#peer/ControllerCommissioningFlow.js",
        "#peer/PeerAddress.js",
        "#peer/ControllerDiscovery.js",
        "#peer/PeerSet.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/peer');
        const subpath = moduleName.substring("#peer/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "peer", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#fabric/FabricManager.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/fabric');
        const subpath = moduleName.substring("#fabric/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "fabric", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#securechannel/SecureChannelMessenger.js",
        "#securechannel/SecureChannelProtocol.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/securechannel');
        const subpath = moduleName.substring("#securechannel/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "securechannel", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#session/SessionManager.js",
        "#session/pase/PaseClient.js",
        "#session/NodeSession.js",
        "#session/pase/PaseServer.js",
        "#session/case/CaseClient.js",
        "#session/InsecureSession.js",
        "#session/GroupSession.js",
        "#session/Session.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/session');
        const subpath = moduleName.substring("#session/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "session", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#interaction/InteractionMessenger.js",
        "#interaction/DecodedDataReport.js",
        "#interaction/FabricAccessControl.js",
        "#interaction/InteractionClient.js",
        "#interaction/SubscriptionClient.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/interaction');
        const subpath = moduleName.substring("#interaction/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "interaction", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#globals/Status.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/types/dist/esm/globals');
        const subpath = moduleName.substring("#globals/".length);
        const mappedPath = path.resolve(matter_link("types"), "dist/esm", "globals", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName === '#types/protocol/definitions') {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/types/dist/esm/protocol/definitions');
        const subpath = moduleName.substring("#types/".length);
        const mappedPath = path.resolve(matter_link("types"), "dist/esm", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#types/schema",
        "#types/schema/Schema.js"
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/types/dist/esm/schema');
        const subpath = moduleName.substring("#types/".length);
        const mappedPath = path.resolve(matter_link("types"), "dist/esm", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#datatype/GroupId.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/types/dist/esm/datatype');
        const subpath = moduleName.substring("#datatype/".length);
        const mappedPath = path.resolve(matter_link("types"), "dist/esm", "datatype", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        '#codec/MessageCodec.js',
        "#codec/index.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/codec');
        const subpath = moduleName.substring("#codec/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "codec", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#common/ExpandedStatus.js",
        "#common/index.js",
        "#common/ExpandedPath.js",
        "#common/PathError.js",
        "#common/InstanceBroadcaster.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/protocol/dist/esm/common');
        const subpath = moduleName.substring("#common/".length);
        const mappedPath = path.resolve(matter_link("protocol"), "dist/esm", "common", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#logic/ModelTraversal.js",
        "#logic/Scope.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/model/dist/esm/logic');
        const subpath = moduleName.substring("#logic/".length);
        const mappedPath = path.resolve(matter_link("model"), "dist/esm", "logic", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#standard/elements/definitions.js",
    ].includes(moduleName)) {
        // const mappedPath = path.resolve(__dirname, 'node_modules/@matter/model/dist/esm/standard');
        const subpath = moduleName.substring("#standard/".length);
        const mappedPath = path.resolve(matter_link("model"), "dist/esm", "standard", subpath);
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#parser/TokenStream.js",
        "#parser/Lexer.js"
    ].includes(moduleName)) {
        const mappedPath = path.resolve(matter_link("model"), 'dist/esm/parser');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#models/DatatypeModel.js",
        "#models/CrossReference.js",
    ].includes(moduleName)) {
        const mappedPath = path.resolve(matter_link("model"), 'dist/esm/models');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#common/Scanner.js",
        "#common/FeatureSet.js",
        "#common/errors.js",
        "#common/Specification.js",
        "#common/ElementTag.js",
    ].includes(moduleName)) {
        const mappedPath = path.resolve(matter_link("model"), 'dist/esm/common');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#node/storage/ServerNodeStore.js",
        "#node/client/ClientNodeFactory.js",
        "#node/client/NodePeerAddressStore.js",
        "#node/server/ServerSubscription.js",
        "#node/server/ServerEndpointInitializer.js",
        "#node/server/InteractionServer.js",
        "#node/server/ProtocolService.js",
        "#node/server/IdentityService.js",
        "#node/Node.js",
        "#node/ServerNode.js",
    ].includes(moduleName)) {
        const subpath = moduleName.substring("#node/".length);
        if (subpath) {
            const mappedPath = path.resolve(matter_link("node"), 'dist/esm/node', subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }
        const mappedPath = path.resolve(matter_link("node"), 'dist/esm/node');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith('#endpoint')) {
        const subpath = moduleName.substring("#endpoint/".length);
        if (subpath) {
            const mappedPath = path.resolve(matter_link("node"), '/dist/esm/endpoint', subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }

        const mappedPath = path.resolve(matter_link("node"), '/dist/esm/endpoint');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith("#behavior")) {
        const subpath = moduleName.substring("#behavior/".length);
        if (subpath) {
            const mappedPath = path.resolve(matter_link("node"), '/dist/esm/behavior', subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }
        const mappedPath = path.resolve(matter_link("node"), '/dist/esm/behavior');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if ([
        "#behaviors/access-control",
        "#behaviors/basic-information",
        "#behaviors/operational-credentials",
        "#behaviors/administrator-commissioning",
        "#behaviors/network-commissioning",
        "#behaviors/time-synchronization",
        "#behaviors/descriptor",
    ].includes(moduleName)) {
        const mappedPath = path.resolve(matter_link("node"), '/dist/esm/behaviors');
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName.startsWith("#storage")) {
        const subpath = moduleName.substring("#storage/".length);
        if (subpath) {
            const mappedPath = path.resolve(matter_link("node"), 'dist/esm', "storage", subpath);
            return context.resolveRequest(context, mappedPath, platform);
        }
        const mappedPath = path.resolve(matter_link("node"), "dist/esm", "storage");
        return context.resolveRequest(context, mappedPath, platform);
    }

    if (moduleName === '@matter/node/load') {
        const mappedPath = path.resolve(matter_link("node"), '/dist/esm');
        return context.resolveRequest(context, mappedPath, platform);
    }

    return context.resolveRequest(context, moduleName, platform);
};

config.resolver.unstable_enablePackageExports = true;
// config.resolver.disableHierarchicalLookup = true;

// config.transformer.minifierConfig = {
//     ...config.transformer.minifierConfig,
//     keep_fnames: true,
//     mangle: false,
//     sourceMap: true,
// };

module.exports = config;
