import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    title: string;
    description: string;
    icon:keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    iconBackgroundColor?: string;
    iconColor?: string;
    disabled?: boolean;
}

export function ProfileActionCard({title,description,icon,onPress,iconBackgroundColor = '#EAF4FF',iconColor = '#2877E6',disabled = false}: Props) {
    return (
        <TouchableOpacity style={[styles.card,disabled && styles.disabled]} activeOpacity={0.8} disabled={disabled} onPress={onPress}>
            <View style={[styles.iconContainer,{backgroundColor:iconBackgroundColor}]}>
                <Ionicons name={icon} size={24} color={iconColor}/>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.titulo}>{title}</Text>
                <Text style={styles.descricao}>{description}</Text>
            </View>

            <Ionicons name="chevron-forward" size={21} color="#A1B1BD"/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 82,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    disabled: {
        opacity: 0.55,
    },

    iconContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
    },

    textContainer: {
        flex: 1,
        marginHorizontal: 13,
    },

    titulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 3,
        color: '#7C91A2',
        fontSize: 12,
        lineHeight: 17,
    },
});