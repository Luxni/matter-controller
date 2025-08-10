

import "@matter/react-native";

import { Crypto, VariableService, asyncNew } from "@matter/general";
import { Diagnostic, Environment, Logger, Time } from "@matter/general";
import { MdnsService } from "@matter/protocol";
// import { ReactNativeCrypto } from "@matter/react-native";
// import { fetch } from "@react-native-community/netinfo";
import { CommissioningController, NodeCommissioningOptions } from "./CommissioningController";
import { ControllerStore } from "./ControllerStore";
import { NodeId } from "@matter/types";
import { GeneralCommissioning } from "@matter/types/clusters/general-commissioning";

const logger = Logger.get("Controller");

const environment: Environment = Environment.default;

export class Controller {

    private commissioningController: CommissioningController | undefined;

    async CommissioningControllerInit() {
        // logger.info("controller init");

        const controller_id = Time.nowMs().toString();

        try {
            // environment.set(Crypto, new ReactNativeCrypto());
            // environment.set(Network, new NetworkReactNative());

            // environment.set(StorageService, new StorageService(environment, (namespace: string) => {
            //     const cache = new Map<string, string>();
            //     cache.set("ble.thread.networkname", "matterjs-thread");
            //     return {
            //         setItem: (key, value) => cache.set(`${namespace}:${key}`, value),
            //         getItem: (key) => cache.get(`${namespace}:${key}`) || null,
            //         removeItem: (key) => cache.delete(`${namespace}:${key}`),
            //     };
            // }));

            // const storageService = new StorageService(environment, (namespace: string) => {
            //     logger.info(`Storage service requested for namespace ${namespace}`);
            //     const storageName = `"/tmp/chip_tool_kvs"}-${namespace}`;
            //     return new StorageBackendAsyncStorage(storageName);
            // });
            // environment.set(StorageService, storageService);

            const _VariableService = new VariableService(environment);
            _VariableService.set("mdns.ipv4", true);
            _VariableService.set("mdns.networkInterface", "wifi");
            environment.set(VariableService, _VariableService);

            const controllerStore = await ControllerStore.create(controller_id, environment);
            environment.set(ControllerStore, controllerStore);

            await asyncNew(MdnsService, environment);
            // environment.set(MdnsService, _mdnsService);

            logger.info(`controller id: ${controller_id}`);
            this.commissioningController = new CommissioningController({
                environment: {
                    environment: environment,
                    id: controller_id,
                },
                autoConnect: false, // Do not auto connect to the commissioned nodes
                adminFabricLabel: "controller"
            });
        } catch (error) {
            logger.error(`${error}`);
            throw new Error(`${error}`);
        }
    }

    // networkInfo() {
    //     try {
    //         fetch("wifi").then(state => {
    //             if (state.details) {
    //                 console.log("SSID", state.details.ssid);
    //                 console.log("BSSID", state.details.bssid);
    //                 console.log("ipAddress", state.details.ipAddress);
    //                 console.log("Is connected?", state.isConnected);
    //             }
    //         });
    //     } catch (error) {
    //         console.log(`111:  ${error}`);
    //     }
    // }

    constructor() {
        logger.info("controller init");

    }

    async start() {

        // this.test_udp6();
        // return;

        await this.CommissioningControllerInit();
        if (undefined === this.commissioningController) {
            return;
        }

        try {
            logger.info("start.....");
            await this.commissioningController.start();
        } catch (error) {
            logger.error(`${error}`);
            return;
        }
        // this.networkInfo();
        logger.info("goto commissioning");
        await this.commissioning();
    }

    async commissioning() {

        const commissioningOptions: NodeCommissioningOptions["commissioning"] = {
            nodeId: NodeId(0x1),
            regulatoryLocation: GeneralCommissioning.RegulatoryLocationType.IndoorOutdoor,
            regulatoryCountryCode: "XX",
            // threadNetwork: {
            //     networkName: "OpenThread-ESP",
            //     operationalDataset: "0e080000000000010000000300000f4a0300001035060004001fffe00208dead00beef00cafe0708fd000db800a00000051000112233445566778899aabbccddeeff030e4f70656e5468726561642d455350010212340410104810e2315100afd6bc9215a6bfac530c0402a0f7f8",
            // },
            wifiNetwork: {
                wifiSsid: "homebridge",
                wifiCredentials: "",
            }
        };

        const options: NodeCommissioningOptions = {
            commissioning: commissioningOptions,
            discovery: {
                knownAddress: undefined,
                identifierData: { instanceId: "1", longDiscriminator: 3840 },
                discoveryCapabilities: {
                    ble: true,
                },
            },
            passcode: 20202021,
        }

        logger.info(`Commissioning ... ${Diagnostic.json(options)}`);
        if (this.commissioningController) {
            const nodeId = await this.commissioningController.commissionNode(options);
            if (nodeId) {
                console.log(`Commissioning successfully done with nodeId ${nodeId}`);
            }
        }
    }
}

