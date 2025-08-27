import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    Text
} from "react-native";
import { Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTranslation } from '../hooks/useTranslation';
import { useNetworkCheck } from '../hooks/useNetworkCheck';
import { usePermissionRequest } from '../hooks/usePermissionRequest';
import { useServiceCheck } from '../hooks/useServiceCheck';
import { ServiceStatus, PermissionStatus } from '../constants/types';
import { RootStackParamList } from '../navigation/AppNavigator';

type PermissionRequestScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'PermissionCheck'
>;

const PermissionRequestScreen: React.FC = () => {
    const navigation = useNavigation<PermissionRequestScreenNavigationProp>();
    const { t, locale, toggleLocale } = useTranslation();
    const { requestAllPermissions } = usePermissionRequest();
    const { checkLocationEnabled, checkBluetoothEnabled } = useServiceCheck();
    // network
    const { isConnected, networkType } = useNetworkCheck();
    const [networkError, setNetworkError] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>({
        isMounted: false,
        lastUpdated: null
    });
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
        location: null,
        bluetooth: null
    });

    const initializedRef = useRef(false);

    const checkPermissionsAndServices = useCallback(async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else if (!initializedRef.current) {
            setLoading(true);
        }

        try {
            if (!isConnected) {
                setNetworkError(t.network.disconnected);
                return;
            }

            const permissionsGranted = await requestAllPermissions();

            if (!permissionsGranted) {
                setPermissionStatus(prev => ({ ...prev, isMounted: false }));
                return;
            }

            setPermissionStatus(prev => ({ ...prev, isMounted: true }));

            const [locationEnabled, bluetoothEnabled] = await Promise.all([
                checkLocationEnabled(),
                checkBluetoothEnabled()
            ]);

            setServiceStatus({
                location: locationEnabled,
                bluetooth: bluetoothEnabled
            });

            setPermissionStatus(prev => ({ ...prev, lastUpdated: new Date() }));

            if (permissionsGranted && locationEnabled && bluetoothEnabled) {
                navigation.navigate('Main');
            }

        } catch (error) {
            console.error('Error checking permissions and services:', error);
            setNetworkError(t.errors.serviceError);
        } finally {
            setLoading(false);
            setRefreshing(false);
            initializedRef.current = true;
        }
    }, [requestAllPermissions, checkLocationEnabled, checkBluetoothEnabled, navigation]);

    const onRefresh = useCallback(() => {
        checkPermissionsAndServices(true);
    }, [checkPermissionsAndServices]);

    useEffect(() => {
        if (!initializedRef.current) {
            checkPermissionsAndServices();
        }
    }, [checkPermissionsAndServices]);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    title={refreshing ? t.ui.refreshing : t.ui.pullToRefresh}
                    tintColor="#000"
                    titleColor="#000"
                />
            }
        >
            <View style={styles.languageSelector}>
                <Button
                    mode="outlined"
                    onPress={toggleLocale}
                    style={styles.languageButton}
                >
                    {locale === 'zh' ? t.ui.english : t.ui.chinese}
                </Button>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                    <Text style={styles.loadingText}>{t.ui.checkingPermissions}</Text>
                </View>
            ) : (
                <>
                    <View style={styles.statusContainer}>
                        <Text style={styles.sectionTitle}>{t.ui.checkPermissions}</Text>
                        <Text style={[styles.statusText, permissionStatus.isMounted ? styles.granted : styles.notGranted]}>
                            {permissionStatus.isMounted ? t.ui.granted : t.ui.notFullyGranted}
                        </Text>

                        <Text style={styles.sectionTitle}>{t.ui.servicesStatus}</Text>
                        <View style={styles.serviceStatus}>
                            <Text style={styles.serviceName}>{t.ui.locationService}: </Text>
                            <Text style={[styles.serviceValue, serviceStatus.location ? styles.enabled : styles.disabled]}>
                                {serviceStatus.location ? t.ui.enabled : t.ui.disabled}
                            </Text>
                        </View>
                        <View style={styles.serviceStatus}>
                            <Text style={styles.serviceName}>{t.ui.bluetoothService}: </Text>
                            <Text style={[styles.serviceValue, serviceStatus.bluetooth ? styles.enabled : styles.disabled]}>
                                {serviceStatus.bluetooth ? t.ui.enabled : t.ui.disabled}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.networkStatusContainer}>
                        <Text style={styles.sectionTitle}>{t.ui.networkStatus}</Text>
                        <Text style={[styles.statusText, isConnected ? styles.granted : styles.notGranted]}>
                            {isConnected ? t.network.connected : t.network.disconnected}
                        </Text>
                        {isConnected && networkType && (
                            <Text style={styles.networkType}>
                                {t.ui.networkType}: {networkType}
                            </Text>
                        )}
                    </View>

                    <Button
                        mode="contained"
                        onPress={() => checkPermissionsAndServices(true)}
                        style={styles.button}
                        loading={refreshing}
                    >
                        {t.ui.recheckPermissions}
                    </Button>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    networkStatusContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    networkType: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    languageSelector: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    languageButton: {
        borderRadius: 20,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    statusContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    },
    statusText: {
        fontSize: 16,
        marginBottom: 10,
    },
    serviceStatus: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '500',
    },
    serviceValue: {
        fontSize: 16,
    },
    granted: {
        color: 'green',
        fontWeight: 'bold',
    },
    notGranted: {
        color: 'orange',
        fontWeight: 'bold',
    },
    enabled: {
        color: 'green',
        fontWeight: 'bold',
    },
    disabled: {
        color: 'red',
        fontWeight: 'bold',
    },
    lastUpdated: {
        marginTop: 15,
        fontSize: 14,
        color: 'gray',
    },
    button: {
        marginVertical: 10,
        width: '80%',
    },
});

export default PermissionRequestScreen;
