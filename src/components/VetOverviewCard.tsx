import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function VetOverviewCard() {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Ionicons name="pulse-outline" size={23} color="#3DA68D"/>
                </View>

                <View style={styles.headerText}>
                    <Text style={styles.titulo}>Acompanhamento profissional</Text>
                    <Text style={styles.subtitulo}>Sua área de pacientes será exibida aqui.</Text>
                </View>
            </View>

            <View style={styles.emptyEstado}>
                <Ionicons name="paw-outline" size={35} color="#8DB8AC"/>

                <Text style={styles.emptyTitulo}>Em breve, seus pacientes por aqui</Text>
                <Text style={styles.emptyText}>Você ainda não possui pacientes.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 18,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#EAF7F3',
    },

    headerText: {
        flex: 1,
        marginLeft: 12,
    },

    titulo: {
        color: '#174F79',
        fontSize: 16,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 3,
        color: '#7890A2',
        fontSize: 12,
        lineHeight: 17,
    },

    emptyEstado: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 18,
        paddingVertical: 24,
        borderRadius: 20,
        backgroundColor: '#F7FBFD',
    },

    emptyTitulo: {
        marginTop: 10,
        color: '#315B79',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
    },

    emptyText: {
        marginTop: 6,
        color: '#8196A5',
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },
});