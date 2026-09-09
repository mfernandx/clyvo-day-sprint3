import React from 'react';
import {SafeAreaView,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export function VeterinarianProfileScreen() {
    const {user,signOut} = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.conteudo}>
                <Text style={styles.titulo}>Perfil profissional</Text>

                <Text style={styles.nomeVet}>{user?.fullName}</Text>

                <Text style={styles.email}>{user?.email}</Text>

                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={signOut}>
                    <Text style={styles.logoutText}>Sair da conta</Text>
                </TouchableOpacity>
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

    titulo: {
        color: '#174F79',
        fontSize: 28,
        fontWeight: '700',
    },

    nomeVet: {
        marginTop: 30,
        color: '#174F79',
        fontSize: 20,
        fontWeight: '700',
    },

    email: {
        marginTop: 6,
        color: '#6C879C',
        fontSize: 15,
    },

    logoutButton: {
        height: 54,
        marginTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2877E6',
        borderRadius: 18,
    },

    logoutText: {
        color: '#2877E6',
        fontSize: 16,
        fontWeight: '700',
    },
});