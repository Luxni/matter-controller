import { useEffect, useState, useCallback } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useTranslation } from './useTranslation';
import { Alert, Linking } from 'react-native';

export const useNetworkCheck = () => {
  const { t } = useTranslation();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [networkType, setNetworkType] = useState<string>('');

  const handleNetworkChange = useCallback((state:NetInfoState) => {
    setIsConnected(state.isConnected);
    setNetworkType(state.type || '');
    
    if (!state.isConnected) {
      Alert.alert(
        t.network.disconnected,
        t.network.pleaseCheck,
        [
          { text: t.alerts.cancel, style: 'cancel' },
          { 
            text: t.network.settings, 
            onPress: () => Linking.sendIntent('android.intent.action.WIRELESS_SETTINGS')
          }
        ]
      );
    }
  }, [t]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);
    
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setNetworkType(state.type || '');
    });

    return () => unsubscribe();
  }, [handleNetworkChange]);

  return { isConnected, networkType };
};
