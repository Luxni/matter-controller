export interface TranslationResources {
    network: {
        connected: string,
        disconnected: string,
        checking: string,
        error: string,
        pleaseCheck: string,
        settings: string
    },
    permissionRequest: {
        location: PermissionRequestTexts;
        bluetoothScan: PermissionRequestTexts;
        bluetoothConnect: PermissionRequestTexts;
    };
    alerts: {
        permissionRequired: string;
        goToSettings: string;
        cancel: string;
        locationPermission: AlertTexts;
        bluetoothPermission: AlertTexts;
        locationService: AlertTexts;
        bluetoothService: AlertTexts;
    };
    ui: {
        networkType: string;
        networkStatus: string,
        checkPermissions: string;
        recheckPermissions: string;
        checkingPermissions: string;
        permissionStatus: string;
        granted: string;
        notFullyGranted: string;
        language: string;
        english: string;
        chinese: string;
        pullToRefresh: string;
        refreshing: string;
        lastUpdated: string;
        servicesStatus: string;
        locationService: string;
        bluetoothService: string;
        enabled: string;
        disabled: string;
        mainPage: string;
        mainButton: string;
        welcome: string;
    };
    errors: {
        permissionError: string;
        serviceError: string;
    };
}

export interface PermissionRequestTexts {
    title: string;
    message: string;
    buttonNeutral: string;
    buttonNegative: string;
    buttonPositive: string;
}

export interface AlertTexts {
    title: string;
    message: string;
    settingsButton: string;
}

export interface ServiceStatus {
    location: boolean | null;
    bluetooth: boolean | null;
}

export interface PermissionStatus {
    isMounted: boolean;
    lastUpdated: Date | null;
}
