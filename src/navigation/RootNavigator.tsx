import React from 'react';
import {ActivityIndicator,View} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { PublicNavigator } from './PublicNavigator';
import { TutorNavigator } from './TutorNavigator';
import { VeterinarianNavigator } from './VeterinarianNavigator';

export function RootNavigator() {
    const {user,isAuthenticated,isLoadingSession} = useAuth();

    if (isLoadingSession) {
        return (
            <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    if (!isAuthenticated || !user) {
        return <PublicNavigator />;
    }

    if (user.typeUser === 'Tutor') {
        return <TutorNavigator />;
    }

    return <VeterinarianNavigator />;
}