import { NavigationContainer } from '@react-navigation/native';

import { PublicNavigator } from './src/navigation/PublicNavigator';


export default function App() {
    return (
        <NavigationContainer>
            <PublicNavigator />
        </NavigationContainer>
    );
}


