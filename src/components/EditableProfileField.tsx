import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Props {
    label: string;
    value: string;
    icon:
    keyof typeof Ionicons.glyphMap;
    onEdit: () => void;
}

export function EditableProfileField({label,value,icon,onEdit}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={20} color="#2877E6"/>
            </View>

            <View style={styles.info}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.valor} numberOfLines={1}>{value}</Text>
            </View>

            <TouchableOpacity style={styles.editarButton} activeOpacity={0.75} onPress={onEdit}>
                <Ionicons name="pencil-outline" size={17} color="#2877E6"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        minHeight: 66,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 18,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EDF4',
    },

    iconContainer: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        backgroundColor:'#EAF4FF',
    },

    info: {
        flex: 1,
        marginLeft: 11,
    },

    label: {
        color: '#8194A3',
        fontSize: 11,
        fontWeight: '600',
    },

    valor: {
        marginTop: 3,
        color: '#174F79',
        fontSize: 14,
        fontWeight: '700',
    },

    editarButton: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor:'#F0F7FF',
    },
});