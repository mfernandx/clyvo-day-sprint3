import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublicStackParamList } from './navigationTypes';
import { InicioScreen } from '../screen/public/InicioScreen';
import { LoginScreen } from '../screen/public/LoginScreen';
import { CadastroUserScreen } from '../screen/public/CadastroUserScreen';
import { CadastroPetScreen } from '../screen/public/CadastroPetScreen';
import { CadastroVeterinarianScreen } from '../screen/public/CadastroVeterinarianScreen';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export function PublicNavigator() {
    return (
        <Stack.Navigator initialRouteName="Inicio" screenOptions={{headerShown: false}}>

            <Stack.Screen name="Inicio" component={InicioScreen}/>

            <Stack.Screen name="Login" component={LoginScreen}/>

            <Stack.Screen name="CadastroUser" component={CadastroUserScreen}/>

            <Stack.Screen name="CadastroPet"  component={CadastroPetScreen}/>

            <Stack.Screen name="CadastroVeterinarian" component={CadastroVeterinarianScreen}/>
            
        </Stack.Navigator>
  );
}