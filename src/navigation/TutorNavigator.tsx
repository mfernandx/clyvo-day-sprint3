import React from 'react';
import {createBottomTabNavigator,} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TutorTabParamList } from './navigationTypes';
import { TutorHomeScreen } from '../screen/tutor/TutorHomeScreen';
import { ComunityScreen } from '../screen/comunity/ComunityScreen';
import { JourneyScreen } from '../screen/tutor/JourneyScreen';
import { TutorProfileScreen } from '../screen/tutor/TutorProfileScreen';

const Tab = createBottomTabNavigator<TutorTabParamList>();

export function TutorNavigator() {
    return (
        <Tab.Navigator initialRouteName="TutorHome" screenOptions={({ route }) => ({
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
                    | 'book'
                    | 'book-outline'
                    | 'person'
                    | 'person-outline';

                if (route.name === 'TutorHome') {
                    iconName = focused ? 'home' : 'home-outline';
                    
                } else if (route.name === 'Comunity') {
                    iconName = focused ? 'paw' : 'paw-outline';

                } else if (route.name === 'Journey') {
                    iconName = focused ? 'book' : 'book-outline';

                } else {
                    iconName = focused ? 'person' : 'person-outline';
                }

                return (
                    <Ionicons name={iconName} size={size} color={color}/>
                );
            },
        })}>

            <Tab.Screen name="TutorHome" component={TutorHomeScreen} options={{title: 'HomeTutor'}}/>

            <Tab.Screen name="Journey" component={JourneyScreen} options={{title: 'Jornada'}}/>

            <Tab.Screen name="Comunity" component={ComunityScreen} options={{title: 'Comunity'}}/>

            <Tab.Screen name="TutorProfile" component={TutorProfileScreen} options={{title: 'Perfil'}}/>

        </Tab.Navigator>
    );
}