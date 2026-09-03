import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublicStackParamList } from './navigationTypes';
import { InicioScreen } from '../screen/public/InicioScreen';
import { LoginScreen } from '../screen/public/LoginScreen';
import { CadastroScreen } from '../screen/public/CadastroScreen';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export function PublicNavigator() {
    return (
        <Stack.Navigator initialRouteName="Inicio" screenOptions={{headerShown: false}}>

            <Stack.Screen name="Inicio" component={InicioScreen}/>

            <Stack.Screen name="Login" component={LoginScreen}/>

            <Stack.Screen name="Cadastro" component={CadastroScreen}/>
            
        </Stack.Navigator>
  );
}