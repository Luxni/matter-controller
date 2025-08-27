// src/constants/translations.ts
import { TranslationResources } from './types';

export const translations: Record<string, TranslationResources> = {
    en: {
        network: {
            connected: "Network Connected",
            disconnected: "Network Disconnected",
            checking: "Checking network...",
            error: "Network Error",
            pleaseCheck: "Please check your network connection",
            settings: "Network Settings"
        },
        permissionRequest: {
            location: {
                title: "Location Permission Required",
                message: "Need location permission to scan for Bluetooth devices",
                buttonNeutral: "Later",
                buttonNegative: "Deny",
                buttonPositive: "Allow"
            },
            bluetoothScan: {
                title: "Bluetooth Scan Permission Required",
                message: "Need Bluetooth scan permission to discover devices",
                buttonNeutral: "Later",
                buttonNegative: "Deny",
                buttonPositive: "Allow"
            },
            bluetoothConnect: {
                title: "Bluetooth Connect Permission Required",
                message: "Need Bluetooth connect permission to connect to devices",
                buttonNeutral: "Later",
                buttonNegative: "Deny",
                buttonPositive: "Allow"
            },

        },
        alerts: {
            permissionRequired: "Permission Required",
            goToSettings: "Go to Settings",
            cancel: "Cancel",
            locationPermission: {
                title: "Location Permission Needed",
                message: "Please enable location permission in settings",
                settingsButton: "Open Settings"
            },
            bluetoothPermission: {
                title: "Bluetooth Permission Needed",
                message: "Please enable Bluetooth permission in settings",
                settingsButton: "Open Settings"
            },
            locationService: {
                title: "Location Service Required",
                message: "Please enable location services",
                settingsButton: "Open Location Settings"
            },
            bluetoothService: {
                title: "Bluetooth Service Required",
                message: "Please enable Bluetooth",
                settingsButton: "Open Bluetooth Settings"
            }
        },
        ui: {
            networkType: "Network Type",
            networkStatus: "Network Status",
            checkPermissions: "Check Permissions",
            recheckPermissions: "Recheck Permissions",
            checkingPermissions: "Checking permissions...",
            permissionStatus: "Permission Status",
            granted: "Granted",
            notFullyGranted: "Not Fully Granted",
            language: "Language",
            english: "English",
            chinese: "Chinese",
            pullToRefresh: "Pull to refresh",
            refreshing: "Refreshing...",
            lastUpdated: "Last updated",
            servicesStatus: "Services Status",
            locationService: "Location Service",
            bluetoothService: "Bluetooth Service",
            enabled: "Enabled",
            disabled: "Disabled",
            mainPage: "Main Page",
            mainButton: "Main Button",
            welcome: "Welcome to the Main Page!"
        },
        errors: {
            permissionError: "Permission Error",
            serviceError: "Service Error"
        }
    },
    zh: {
        network: {
            connected: "网络已连接",
            disconnected: "网络未连接",
            checking: "检查网络中...",
            error: "网络错误",
            pleaseCheck: "请检查您的网络连接",
            settings: "网络设置"
        },
        permissionRequest: {
            location: {
                title: "请求定位权限",
                message: "需要定位权限来扫描蓝牙设备",
                buttonNeutral: "稍后",
                buttonNegative: "拒绝",
                buttonPositive: "允许"
            },
            bluetoothScan: {
                title: "请求蓝牙扫描权限",
                message: "需要蓝牙扫描权限来发现设备",
                buttonNeutral: "稍后",
                buttonNegative: "拒绝",
                buttonPositive: "允许"
            },
            bluetoothConnect: {
                title: "请求蓝牙连接权限",
                message: "需要蓝牙连接权限来连接设备",
                buttonNeutral: "稍后",
                buttonNegative: "拒绝",
                buttonPositive: "允许"
            }
        },
        alerts: {
            permissionRequired: "需要权限",
            goToSettings: "去设置",
            cancel: "取消",
            locationPermission: {
                title: "需要定位权限",
                message: "请前往设置手动开启权限",
                settingsButton: "去设置"
            },
            bluetoothPermission: {
                title: "需要蓝牙权限",
                message: "请前往设置手动开启权限",
                settingsButton: "去设置"
            },
            locationService: {
                title: "需要打开定位功能",
                message: "请前往设置手动开启",
                settingsButton: "去设置"
            },
            bluetoothService: {
                title: "需要打开蓝牙功能",
                message: "请前往设置手动开启",
                settingsButton: "去设置"
            }
        },
        ui: {
             networkType: "网络类型",
            networkStatus: "网络状态",
            checkPermissions: "检查权限",
            recheckPermissions: "重新检查权限",
            checkingPermissions: "检查权限中...",
            permissionStatus: "权限状态",
            granted: "已授权",
            notFullyGranted: "未完全授权",
            language: "语言",
            english: "English",
            chinese: "中文",
            pullToRefresh: "下拉刷新",
            refreshing: "刷新中...",
            lastUpdated: "最后更新时间",
            servicesStatus: "服务状态",
            locationService: "定位服务",
            bluetoothService: "蓝牙服务",
            enabled: "已启用",
            disabled: "未启用",
            mainPage: "主页面",
            mainButton: "主按钮",
            welcome: "欢迎来到主页面！"
        },
        errors: {
            permissionError: "权限错误",
            serviceError: "服务错误"
        }
    }
};
