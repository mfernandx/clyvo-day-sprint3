import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {VeterinarianStackParamList, VeterinarianTabParamList,} from './navigationTypes';
import {VeterinarianHomeScreen} from '../screen/veterinarian/VeterinarianHomeScreen';
import {PatientsScreen} from '../screen/veterinarian/PatientsScreen';
import {CommunityScreen} from '../screen/community/CommunityScreen';
import {VeterinarianProfileScreen} from '../screen/veterinarian/VeterinarianProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommunityPostCreateScreen } from '../screen/community/CommunityPostCreateScreen';

const Tab = createBottomTabNavigator<VeterinarianTabParamList>();
const Stack = createNativeStackNavigator<VeterinarianStackParamList>();

function VeterinarianTabs() {
    return (
        <Tab.Navigator initialRouteName="VeterinarianHome" screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#2877E6',
            tabBarInactiveTintColor: '#8DA4B6',
            tabBarStyle: {
                height: 68,
                paddingTop: 7,
                paddingBottom: 8,
                borderTopWidth: 0,
                backgroundColor: '#FFFFFF',
                elevation: 10,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
            },

            tabBarIcon: ({color,size,focused}) => {
                let iconName:
                    | 'home'
                    | 'home-outline'
                    | 'paw'
                    | 'paw-outline'
                    | 'people'
                    | 'people-outline'
                    | 'person'
                    | 'person-outline';

                if (route.name === 'VeterinarianHome') {
                    iconName = focused ? 'home' : 'home-outline';

                } else if (route.name === 'Patients') {
                    iconName = focused ? 'paw' : 'paw-outline';

                } else if (route.name === 'Community') {
                    iconName = focused ? 'people' : 'people-outline';
                    
                } else {
                    iconName = focused ? 'person' : 'person-outline';
                }

                return (
                    <Ionicons name={iconName} size={size} color={color}/>
                );
            },
        })}>

            <Tab.Screen name="VeterinarianHome" component={VeterinarianHomeScreen} options={{title: 'Home'}}/>

            <Tab.Screen name="Patients" component={PatientsScreen} options={{title: 'Pacientes'}}/>

            <Tab.Screen name="Community" component={CommunityScreen} options={{title: 'Comunidade'}}/>

            <Tab.Screen name="VeterinarianProfile" component={VeterinarianProfileScreen} options={{title: 'Perfil'}}/>
        
        </Tab.Navigator>
    );
}

export function VeterinarianNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="VeterinarianTabs" component={VeterinarianTabs}/>

            <Stack.Screen name="CommunityPostCreate" component={CommunityPostCreateScreen}/>

            <Stack.Screen name="Community" component={CommunityScreen}/>
        </Stack.Navigator>
    );
}