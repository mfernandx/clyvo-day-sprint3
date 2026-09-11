import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Action {
    label: string;
    description: string
    icon: keyof typeof Ionicons.glyphMap;
    backgroundColor: string;
    iconColor: string;
    onPress: () => void;
}

interface Props {actions: Action[]}

export function VetQuickActions({actions}: Props) {
    return (
        <View style={styles.container}>
            {actions.map((action) => (
                <TouchableOpacity key={action.label} style={styles.card} activeOpacity={0.8} onPress={action.onPress}>
                    <View style={[styles.iconContainer,{backgroundColor:action.backgroundColor}]}>
                        <Ionicons name={action.icon} size={25} color={action.iconColor}/>
                    </View>

                    <Text style={styles.label}>{action.label}</Text>
                    <Text style={styles.acaoDescricao}>{action.description}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 12,
    },

    card: {
        width: '48%',
        minHeight: 122,
        padding: 16,
        borderRadius: 23,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    iconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },

    label: {
        marginTop: 13,
        color: '#174F79',
        fontSize: 14,
        fontWeight: '700',
    },

    acaoDescricao: {
        marginTop: 4,
        color: '#7B91A4',
        fontSize: 11,
        lineHeight: 16,
    },
});