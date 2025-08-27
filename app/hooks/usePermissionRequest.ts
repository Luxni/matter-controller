import { useTranslation } from './useTranslation';
import { PermissionType } from '../constants/PermissionType';
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

export const usePermissionRequest = () => {
  const { t } = useTranslation();

  const requestAndroidPermission = async (permissionType: PermissionType, options: any): Promise<boolean> => {
    try {
      let permission;
      switch (permissionType) {
        case PermissionType.LOCATION:
          permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
          break;
        case PermissionType.BLUETOOTH_SCAN:
          permission = PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN;
          break;
        case PermissionType.BLUETOOTH_CONNECT:
          permission = PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT;
          break;
        default:
          return false;
      }

      const result = await PermissionsAndroid.request(permission, options);
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error(`Error requesting ${permissionType} permission:`, error);
      return false;
    }
  };

  const showPermissionAlert = (message: string) => {
    Alert.alert(
      t.alerts.permissionRequired,
      message,
      [
        { text: t.alerts.cancel, style: 'cancel' },
        { text: t.alerts.goToSettings, onPress: () => Linking.openSettings() }
      ]
    );
  };

  const requestAllPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      console.log('Non-Android platform, permission handling may need adjustment');
      return false;
    }

    try {
      // 请求定位权限
      const locationGranted = await requestAndroidPermission(
        PermissionType.LOCATION,
        t.permissionRequest.location
      );

      if (!locationGranted) {
        showPermissionAlert(t.alerts.locationPermission.message);
        return false;
      }

      // 请求蓝牙扫描权限
      const bluetoothScanGranted = await requestAndroidPermission(
        PermissionType.BLUETOOTH_SCAN,
        t.permissionRequest.bluetoothScan
      );

      if (!bluetoothScanGranted) {
        showPermissionAlert(t.alerts.bluetoothPermission.message);
        return false;
      }

      // 请求蓝牙连接权限
      const bluetoothConnectGranted = await requestAndroidPermission(
        PermissionType.BLUETOOTH_CONNECT,
        t.permissionRequest.bluetoothConnect
      );

      if (!bluetoothConnectGranted) {
        showPermissionAlert(t.alerts.bluetoothPermission.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  return { requestAllPermissions };
};
