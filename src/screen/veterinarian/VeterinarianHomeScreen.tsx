import React from 'react';
import {SafeAreaView,StyleSheet,Text,View,} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export function VeterinarianHomeScreen() {
    const { user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.conteudo}>
            <Text style={styles.header}>Olá, Dr(a). {user?.fullName}</Text>

            <Text style={styles.titulo}>Home do veterinário</Text>

            <Text style={styles.subtitulo}>Consulte seus pacientes e acompanhe informações importantes da jornada de cuidado.</Text>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FBFF',
    },

    conteudo: {
        flex: 1,
        padding: 24,
    },

    header: {
        color: '#5D7890',
        fontSize: 16,
    },

    titulo: {
        marginTop: 10,
        color: '#174F79',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 12,
        color: '#6C879C',
        fontSize: 16,
        lineHeight: 23,
    },
});