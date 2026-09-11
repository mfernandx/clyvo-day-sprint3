import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommunityStackParamList} from './navigationTypes';
import {CommunityScreen} from '../screen/community/CommunityScreen';
import {CommunityPostCreateScreen} from '../screen/community/CommunityPostCreateScreen';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export function CommunityNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false,}}>

            <Stack.Screen name="Community" component={CommunityScreen}/>
            <Stack.Screen name="CommunityPostCreate" component={CommunityPostCreateScreen}/>

        </Stack.Navigator>
    );
}