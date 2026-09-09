import React from 'react';
import {Text,TouchableOpacity,View} from 'react-native';
import { useAuth } from '../context/AuthContext';

export function TutorNavigator() {
    const { user, signOut } =useAuth();

    return (
        <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            <Text >Área do Tutor</Text>

            <Text>Olá, {user?.fullName}</Text>

            <TouchableOpacity onPress={signOut} style={{marginTop: 20}}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}