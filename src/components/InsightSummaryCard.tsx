import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {Ionicons,} from '@expo/vector-icons';

interface Props {
    title: string;
    value: string | number;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    backgroundColor: string;
}

export function InsightSummaryCard({title,value,description,icon,iconColor,backgroundColor}: Props) {
    
    return (
        <View style={styles.card}>
            <View style={[styles.iconContainer,{backgroundColor}]}>
                <Ionicons name={icon} size={23} color={iconColor}/>
            </View>

            <Text style={styles.valor}>{value}</Text>
            <Text style={styles.titulo}>{title}</Text>
            <Text style={styles.descricao}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minHeight: 155,
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3EDF5',
    },

    iconContainer: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },

    valor: {
        marginTop: 13,
        color: '#174F79',
        fontSize: 25,
        fontWeight: '800',
    },

    titulo: {
        marginTop: 2,
        color: '#315B79',
        fontSize: 12,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 5,
        color: '#8497A5',
        fontSize: 10,
        lineHeight: 14,
    },
});