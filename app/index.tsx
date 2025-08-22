
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import { Button, Dialog, Text, TextInput } from 'react-native-paper';
import { Controller } from '@/src/controller/Controller';

interface WifiDialogProps {
    controller: Controller,
    visible: boolean,
    onDismiss: () => void,
};

const CommissioningWifiDialog: React.FC<WifiDialogProps> = ({
    controller,
    visible,
    onDismiss,
}) => {

    const [wifissid, setWifiSSID] = React.useState("");
    const [wificredentials, setWifiCredentials] = React.useState("");
    const [discriminator, setDiscriminator] = React.useState("");
    const [passcode, setPasscode] = React.useState("");
    const [nodeid, setNodeId] = React.useState("");

    const [defaultState, setDefaultState] = React.useState(false);

    const buttonHandler = async () => {
        console.warn(`wifi ssid: ${wifissid}`);
        console.warn(`wifi credentials: ${wificredentials}`);
        console.warn(`discriminator: ${discriminator}`);
        console.warn(`passcode: ${passcode}`);
        console.warn(`node id: ${nodeid}`);
        console.log("matter start!");

        await controller.start();
        await controller.commissioningOverWifi(Number(nodeid), wifissid, wificredentials, Number(discriminator), Number(passcode));
    };

    const buttonDefaultHandler = () => {
        setDefaultState(!defaultState);
    };

    useEffect(() => {

        setWifiSSID("");
        setWifiCredentials("");
        setDiscriminator("3840");
        setPasscode("20202021");
        setNodeId("1");

    }, [defaultState]);

    return (
        <Dialog
            visible={visible}
            onDismiss={onDismiss}
            style={{ flex: 1 }}
        >
            <Dialog.Title>Wifi</Dialog.Title>
            <Dialog.Content>
                <TextInput style={styles.context}
                    label="Wifi SSID"
                    defaultValue={wifissid}
                    value={wifissid}
                    onChangeText={text => setWifiSSID(text)}
                />
                <TextInput style={styles.context}
                    label="Wifi Credentials"
                    defaultValue={wificredentials}
                    value={wificredentials}
                    onChangeText={text => setWifiCredentials(text)}
                />
                <TextInput style={styles.context}
                    defaultValue={discriminator}
                    label="Discriminator"
                    value={discriminator}
                    onChangeText={text => setDiscriminator(text)}
                />
                <TextInput style={styles.context}
                    label="Passcode"
                    defaultValue={passcode}
                    value={passcode}
                    onChangeText={text => setPasscode(text)}
                />
                <TextInput style={styles.context}
                    label="Node Id"
                    defaultValue={nodeid}
                    value={nodeid}
                    onChangeText={text => setNodeId(text)}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button style={styles.actions} mode="contained" onPress={buttonDefaultHandler}>Default</Button>
                <Button style={styles.actions} mode="contained" onPress={buttonHandler}>Start</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

interface ThreadDialogProps {
    controller: Controller,
    visible: boolean,
    onDismiss: () => void,
};

const CommissioningThreadDialog: React.FC<ThreadDialogProps> = ({
    controller,
    visible,
    onDismiss,
}
) => {

    const [networkName, setNetworkName] = React.useState("");
    const [operationalDataset, setOperationalDataset] = React.useState("");
    const [discriminator, setDiscriminator] = React.useState("");
    const [passcode, setPasscode] = React.useState("");
    const [nodeid, setNodeId] = React.useState("");

    const [defaultValue, setDefaultValue] = React.useState(false);

    const buttonHandler = async () => {
        console.warn(`network name: ${networkName}`);
        console.warn(`operational dataset: ${operationalDataset}`);
        console.warn(`discriminator: ${discriminator}`);
        console.warn(`passcode: ${passcode}`);
        console.warn(`node id: ${nodeid}`);
        console.log("matter start!");

        await controller.start();
        await controller.commissioningOverThread(Number(nodeid), networkName, operationalDataset, Number(discriminator), Number(passcode));
    };

    const buttonDefaultHandler = () => {
        setDefaultValue(!defaultValue);
    };

    useEffect(() => {
        setDiscriminator("3840");
        setPasscode("20202021");
        setNodeId("1");
    }, [defaultValue]);

    return (
        <Dialog
            visible={visible}
            onDismiss={onDismiss}
            style={{ flex: 1 }}
        >
            <Dialog.Title>Thread</Dialog.Title>
            <Dialog.Content>
                <TextInput style={styles.context}
                    label="Network Name"
                    value={networkName}
                    defaultValue={networkName}
                    onChangeText={text => setNetworkName(text)}
                />
                <TextInput style={styles.context}
                    label="Operational Dataset"
                    defaultValue={operationalDataset}
                    value={operationalDataset}
                    onChangeText={text => setOperationalDataset(text)}
                />
                <TextInput style={styles.context}
                    defaultValue={discriminator}
                    label="Discriminator"
                    value={discriminator}
                    onChangeText={text => setDiscriminator(text)}
                />
                <TextInput style={styles.context}
                    label="Passcode"
                    defaultValue={passcode}
                    value={passcode}
                    onChangeText={text => setPasscode(text)}
                />
                <TextInput style={styles.context}
                    label="Node Id"
                    defaultValue={nodeid}
                    value={nodeid}
                    onChangeText={text => setNodeId(text)}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button style={styles.actions} mode="contained" onPress={buttonDefaultHandler}>Default</Button>
                <Button style={styles.actions} mode="contained" onPress={buttonHandler}>Start</Button>
            </Dialog.Actions>
        </Dialog>
    );

}

const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        try {

            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]);
            if (
                granted["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                return true;
            }

        } catch (error) {
            console.error(`get location permission error: ${error}`);
            return false;
        }
    }

    return true;
};

export default function Index() {

    const controllerRef = useRef<Controller>(null);

    const [threadDialogVisible, setThreadDialogVisible] = useState(false);
    const [wifiDialogVisible, setWifiDialogVisible] = useState(false);

    useEffect(() => {
        const hasPermission = requestLocationPermission();
        if (!hasPermission) {
            console.error(`get location permission error!!!`)
        }
        controllerRef.current = new Controller();
    }, []);


    return (
        <View style={styles.container} >
            <Button
                style={{ margin: 20 }}
                mode="contained"
                onPress={() => {
                    setWifiDialogVisible(true);
                }}
            >Commissioning Wifi</Button>

            <Button
                style={{ margin: 20 }}
                mode="contained"
                onPress={() => {
                    setThreadDialogVisible(true);
                }}
            >Commissioning Thread</Button>

            <CommissioningWifiDialog
                controller={controllerRef.current!}
                visible={wifiDialogVisible}
                onDismiss={() => {
                    setWifiDialogVisible(false);
                }}
            />

            <CommissioningThreadDialog
                controller={controllerRef.current!}
                visible={threadDialogVisible}
                onDismiss={() => {
                    setThreadDialogVisible(false);
                }}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    context: {
        padding: 4,
        margin: 4
    },

    actions: {
        padding: 4,
        margin: 4
    }
});
