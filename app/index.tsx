import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { LocaleProvider } from './contexts/LocaleContext';
import AppNavigator from './navigation/AppNavigator';

const Index: React.FC = () => {
    return (
        <PaperProvider>
            <LocaleProvider>
                <AppNavigator />
            </LocaleProvider>
        </PaperProvider>
    );
};

export default Index;
