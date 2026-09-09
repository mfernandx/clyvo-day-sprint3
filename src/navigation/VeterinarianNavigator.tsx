import React from 'react';
import {Text,TouchableOpacity,View} from 'react-native';
import { useAuth } from '../context/AuthContext';

export function VeterinarianNavigator() {
    const { user, signOut } = useAuth();

    return (
        <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',}}>
            <Text>Área do Veterinário</Text>

            <Text>Olá, {user?.fullName}</Text>

            <TouchableOpacity onPress={signOut} style={{marginTop: 20}}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}