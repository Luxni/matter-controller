import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PermissionRequestScreen from '../components/PermissionRequestScreen';
import MainScreen from '../components/MainScreen';

export type RootStackParamList = {
    PermissionCheck: undefined;
    Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="PermissionCheck">
            <Stack.Screen
                name="PermissionCheck"
                component={PermissionRequestScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ title: "Main" }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
