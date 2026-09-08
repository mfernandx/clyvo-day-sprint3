import { NavigationContainer } from '@react-navigation/native';
import {QueryClientProvider,} from '@tanstack/react-query';
import { PublicNavigator } from './src/navigation/PublicNavigator';
import { queryClient } from './src/service/queryClient';
import { RegisterUserProvider } from './src/context/CadastroContext';

export default function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <RegisterUserProvider>
                <NavigationContainer>
                    <PublicNavigator />
                </NavigationContainer>
            </RegisterUserProvider> 
        </QueryClientProvider>
    );
}


