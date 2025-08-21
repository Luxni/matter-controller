import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PaperProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="+not-found" />
                </Stack>
            </PaperProvider>
        </SafeAreaView>
    );
}
