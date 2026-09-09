import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {VeterinarianTabParamList,} from './navigationTypes';
import {VeterinarianHomeScreen} from '../screen/veterinarian/VeterinarianHomeScreen';
import {PatientsScreen} from '../screen/veterinarian/PatientsScreen';
import {ComunityScreen} from '../screen/comunity/ComunityScreen';
import {VeterinarianProfileScreen} from '../screen/veterinarian/VeterinarianProfileScreen';

const Tab = createBottomTabNavigator<VeterinarianTabParamList>();

export function VeterinarianNavigator() {
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

                } else if (route.name === 'Comunity') {
                    iconName = focused ? 'people' : 'people-outline';
                    
                } else {
                    iconName = focused ? 'person' : 'person-outline';
                }

                return (
                    <Ionicons name={iconName} size={size} color={color}/>
                );
            },
        })}>

            <Tab.Screen name="VeterinarianHome" component={VeterinarianHomeScreen} options={{title: 'HomeVeterinarian'}}/>

            <Tab.Screen name="Patients" component={PatientsScreen} options={{title: 'Pacientes'}}/>

            <Tab.Screen name="Comunity" component={ComunityScreen} options={{title: 'Comunidade'}}/>

            <Tab.Screen name="VeterinarianProfile" component={VeterinarianProfileScreen} options={{title: 'Perfil'}}/>
        
        </Tab.Navigator>
    );
}