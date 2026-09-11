import React, {useState} from 'react';
import {ActivityIndicator,Alert,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {VeterinarianTabParamList} from '../../navigation/navigationTypes';
import {ProfileActionCard} from '../../components/ProfileActionCard';
import {useAuth} from '../../context/AuthContext';

type NavigationProp = BottomTabNavigationProp<VeterinarianTabParamList>;

export function VeterinarianProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const {user,signOut} = useAuth();
    const [isLoggingOut,setIsLoggingOut] = useState(false);

    function getInitials(name?: string) {
        if (!name) {
            return '?';
        }

        const parts = name.trim().split(' ').filter(Boolean);

        if (parts.length === 0) {
            return '?';
        }

        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }

        return (parts[0][0] +parts[parts.length - 1][0]).toUpperCase();
    }

    function handleLogout() {
        Alert.alert('Sair da conta','Deseja realmente sair do CLYVO DAY?',
        [
            {
            text: 'Cancelar',
            style: 'cancel',
            },
            {
            text: 'Sair',
            style: 'destructive',
            onPress: handleConfirmLogout,
            },
        ]);
    }

    async function handleConfirmLogout() {
        try {
            setIsLoggingOut(true);
            await signOut();

        } catch {
            Alert.alert('Não foi possível sair','Tente novamente.');

        } finally {
            setIsLoggingOut(false);
        }
    }

    if (!user) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2877E6"/>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo}>

                <View style={styles.header}>
                    <Text style={styles.titulo}>Perfil</Text>
                    <Text style={styles.subtitulo}>Seu espaço profissional no CLYVO DAY.</Text>
                </View>

                <View style={styles.perfilCard}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(user.fullName)}</Text>
                        </View>

                        <View style={styles.vetBadge}>
                            <Ionicons name="medkit" size={14} color="#FFFFFF"/>
                        </View>
                    </View>

                    <Text style={styles.usuarioNome}>{user.fullName}</Text>

                    <View style={styles.tipoUsuarioBadge}>
                        <Ionicons name="medkit-outline" size={14} color="#3DA68D"/>
                        <Text style={styles.roleBadgeText}>Profissional veterinário</Text>
                    </View>

                    <Text style={styles.usuarioEmail}>{user.email}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitulo}>Minha atuação</Text>

                    <Text style={styles.sectionSubtitulo}>Acesse as principais áreas da sua experiência profissional.</Text>

                    <View style={styles.actionsContainer}>
                        <ProfileActionCard
                            title="Meus pacientes"
                            description="Consulte os pets cadastrados e acompanhe seus históricos."
                            icon="paw-outline"
                            iconBackgroundColor="#EAF4FF"
                            iconColor="#2877E6"
                            onPress={() => navigation.navigate('Patients')}
                        />

                        <ProfileActionCard
                            title="Dados profissionais"
                            description="Consulte suas informações profissionais cadastradas."
                            icon="document-text-outline"
                            iconBackgroundColor="#FFF3DD"
                            iconColor="#D9912B"
                            onPress={() => {Alert.alert('Dados profissionais')}}
                        />
                    </View>
                </View>

                <View style={styles.section}>

                    <Text style={styles.sectionTitulo}>Minha conta</Text>

                    <View style={styles.contaCard}>
                        
                        <View style={styles.contaRow}>
                            <View style={styles.contaIcon}>
                                <Ionicons name="mail-outline" size={19} color="#2877E6"/>
                            </View>

                            <View style={styles.contaInfo}>
                                <Text style={styles.contaLabel}>E-mail</Text>
                                <Text style={styles.contaValue}>{user.email}</Text>
                            </View>
                        </View>

                        <View style={styles.divisor}/>

                        <View style={styles.contaRow}>
                            <View style={[styles.contaIcon,styles.vetContaIcon]}>
                                <Ionicons name="medkit-outline" size={19} color="#3DA68D"/>
                            </View>

                            <View style={styles.contaInfo}>
                                <Text style={styles.contaLabel}>Tipo de conta</Text>
                                <Text style={styles.contaValue}>Veterinário</Text>
                            </View>
                        </View>

                        <View style={styles.divisor}/>
                        
                        <View style={styles.contaRow}>
                            <View style={styles.contaIcon}>
                                <Ionicons name="call-outline" size={19} color="#2877E6"/>
                            </View>
                        
                            <View style={styles.contaInfo}>
                                <Text style={styles.contaLabel}>Telefone</Text>
                                <Text style={styles.contaValue}>{user.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={[styles.logoutButton,isLoggingOut && styles.logoutDisabled]} activeOpacity={0.8} disabled={isLoggingOut} onPress={handleLogout}>
                    {isLoggingOut ? (
                        <ActivityIndicator size="small" color="#C45656"/>
                    ) : (
                        <Ionicons name="log-out-outline" size={21} color="#C45656"/>
                    )}

                    <Text style={styles.logoutButtonText}>
                        {isLoggingOut ? 'Saindo...' : 'Sair da conta'}
                    </Text>
                </TouchableOpacity>
                
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5FAFF',
    },

    conteudo: {
        paddingHorizontal: 22,
        paddingTop: 22,
        paddingBottom: 38,
    },

    header: {
        marginBottom: 20,
    },

    titulo: {
        color: '#174F79',
        fontSize: 30,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 5,
        color: '#6C879C',
        fontSize: 14,
    },

    perfilCard: {
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 27,
        borderRadius: 28,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3EDF5',
    },

    avatarWrapper: {
        position: 'relative',
    },

    avatar: {
        width: 84,
        height: 84,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 29,
        backgroundColor: '#EAF7F3',
    },

    avatarText: {
        color: '#3DA68D',
        fontSize: 25,
        fontWeight: '800',
    },

    vetBadge: {
        position: 'absolute',
        right: -4,
        bottom: -4,
        width: 29,
        height: 29,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        backgroundColor: '#3DA68D',
    },

    usuarioNome: {
        marginTop: 15,
        color: '#174F79',
        fontSize: 21,
        fontWeight: '700',
        textAlign: 'center',
    },

    tipoUsuarioBadge: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        backgroundColor: '#EAF7F3',
    },

    roleBadgeText: {
        color: '#3DA68D',
        fontSize: 11,
        fontWeight: '700',
    },

    usuarioEmail: {
        marginTop: 10,
        color: '#748C9F',
        fontSize: 13,
    },

    section: {
        marginTop: 30,
    },

    sectionTitulo: {
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    sectionSubtitulo: {
        marginTop: 4,
        color: '#8095A5',
        fontSize: 12,
        lineHeight: 17,
    },

    actionsContainer: {
        marginTop: 14,
        gap: 11,
    },

    contaCard: {
        marginTop: 14,
        paddingHorizontal: 17,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    contaRow: {
        minHeight: 72,
        flexDirection: 'row',
        alignItems: 'center',
    },

    contaIcon: {
        width: 39,
        height: 39,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        backgroundColor: '#EAF4FF',
    },

    vetContaIcon: {
        backgroundColor: '#EAF7F3',
    },

    contaInfo: {
        flex: 1,
        marginLeft: 12,
    },

    contaLabel: {
        color: '#879BAA',
        fontSize: 11,
        fontWeight: '600',
    },

    contaValue: {
        marginTop: 3,
        color: '#315B79',
        fontSize: 14,
        fontWeight: '600',
    },

    divisor: {
        height: 1,
        marginLeft: 51,
        backgroundColor: '#EDF2F6',
    },

    logoutButton: {
        minHeight: 56,
        marginTop: 31,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: '#F0CACA',
        backgroundColor: '#FFF7F7',
    },

    logoutDisabled: {
        opacity: 0.65,
    },

    logoutButtonText: {
        color: '#C45656',
        fontSize: 14,
        fontWeight: '700',
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});