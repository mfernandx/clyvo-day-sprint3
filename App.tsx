import { NavigationContainer } from '@react-navigation/native';
import {QueryClientProvider,} from '@tanstack/react-query';
import { PublicNavigator } from './src/navigation/PublicNavigator';
import { queryClient } from './src/service/queryClient';

export default function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <PublicNavigator />
            </NavigationContainer>
        </QueryClientProvider>
    );
}


