import { useTranslation } from './useTranslation';
import { Alert, Linking } from "react-native";
import * as Location from 'expo-location';
import { BleManager } from 'react-native-ble-plx';

export const useServiceCheck = () => {
  const { t } = useTranslation();

  const checkLocationEnabled = async (): Promise<boolean> => {
    try {
      const isEnabled = await Location.hasServicesEnabledAsync();
      if (!isEnabled) {
        Alert.alert(
          t.alerts.locationService.title,
          t.alerts.locationService.message,
          [
            { text: t.alerts.cancel, style: 'cancel' },
            {
              text: t.alerts.locationService.settingsButton, 
              onPress: () => Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
            }
          ]
        );
      }
      return isEnabled;
    } catch (error) {
      console.error('Error checking location service:', error);
      return false;
    }
  };

  const checkBluetoothEnabled = async (): Promise<boolean> => {
    try {
      const bleManager = new BleManager();
      const state = await bleManager.state();
      const isEnabled = state !== 'PoweredOff';
      
      if (!isEnabled) {
        Alert.alert(
          t.alerts.bluetoothService.title,
          t.alerts.bluetoothService.message,
          [
            { text: t.alerts.cancel, style: 'cancel' },
            {
              text: t.alerts.bluetoothService.settingsButton, 
              onPress: () => Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS')
            }
          ]
        );
      }
      
      return isEnabled;
    } catch (error) {
      console.error('Error checking Bluetooth status:', error);
      return false;
    }
  };

  return { checkLocationEnabled, checkBluetoothEnabled };
};
