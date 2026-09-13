import React, {useState} from 'react';
import {ActivityIndicator,Alert,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {TutorStackParamList} from '../../navigation/navigationTypes';
import {ProfileActionCard} from '../../components/ProfileActionCard';
import {useAuth} from '../../context/AuthContext';
import { EditProfileFieldModal } from '../../components/EditProfileFieldModal';
import { useUpdateEmail } from '../../hooks/useUpdateEmail';
import { useUpdatePhone } from '../../hooks/useUpdatePhone';
import { TutorUser } from '../../model/User';
import { EditableProfileField } from '../../components/EditableProfileField';

type NavigationProp = NativeStackNavigationProp<TutorStackParamList>;

export function TutorProfileScreen() {

    const navigation = useNavigation<NavigationProp>();
    const {user,signOut} = useAuth();
    const [isLoggingOut,setIsLoggingOut] = useState(false);
    const tutor = user?.typeUser === 'Tutor' ? (user as TutorUser) : null;
    const updateEmail = useUpdateEmail();
    const updatePhone = useUpdatePhone();
    const [emailModalVisible,setEmailModalVisible,] = useState(false);
    const [phoneModalVisible,setPhoneModalVisible,] = useState(false);

    function getInitials(name?: string,) {
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

        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    async function handleUpdateEmail(email: string) {
        if (!user) {
            return;
        }

        await updateEmail.mutateAsync({
            userId: user.userId,
            email,
        });

        setEmailModalVisible(false);
    }

    async function handleUpdatePhone(phoneNumber: string) {
        if (!user) {
            return;
        }

        const formattedPhone =phoneNumber.replace(/\D/g,'',);

        await updatePhone.mutateAsync({
            userId: user.userId,
            phoneNumber: formattedPhone,
        });

        setPhoneModalVisible(false);
    }


    function handleLogout() {
        Alert.alert('Sair da conta','Deseja realmente sair do CLYVO DAY?',
        [
            {text: 'Cancelar',style: 'cancel'},
            {text: 'Sair',style: 'destructive',onPress:handleConfirmLogout},
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
                    <Text style={styles.subtitulo}>Seu espaço dentro do CLYVO DAY.</Text>
                </View>

                <View style={styles.perfilCard}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(user.fullName)}</Text>
                        </View>

                        <View style={styles.pawBadge}>
                            <Ionicons name="paw" size={14} color="#FFFFFF"/>
                        </View>
                    </View>

                    <Text style={styles.usuarioNome}>{user.fullName}</Text>

                    <View style={styles.roleBadge}>
                        <Ionicons name="heart-outline" size={14} color="#2877E6"/>
                        <Text style={styles.roleBadgeText}>Tutor de pet</Text>
                    </View>

                    <Text style={styles.usuarioEmail}>{user.email}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitulo}>Minha jornada</Text>
                    <Text style={styles.sectionSubtitulo}>Acesse tudo que faz parteda sua experiência.</Text>

                    <View style={styles.acoesContainer}>
                        <ProfileActionCard
                            title="Meus Pets"
                            description="Visualize e gerencie os pets vinculados à sua conta."
                            icon="paw-outline"
                            onPress={() => navigation.navigate('PetsTutor')}
                        />

                        <ProfileActionCard
                            title="Minhas conquistas"
                            description="Acompanhe marcos e conquistas construídos ao longo da jornada."
                            icon="trophy-outline"
                            iconBackgroundColor="#FFF3DD"
                            iconColor="#D9912B"
                            onPress={() => navigation.navigate('Achievements')}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitulo}>Minha conta</Text>
                    <Text style={styles.sectionSubtitulo}>Veja aqui suas informações pessoais.</Text>

                    <View style={styles.contaFields}>

                        <EditableProfileField
                            label="E-mail"
                            value={user.email}
                            icon="mail-outline"
                            onEdit={() => setEmailModalVisible(true)}
                        />

                        <EditableProfileField
                            label="Telefone"
                            value={user.phoneNumber}
                            icon="call-outline"
                            onEdit={() => setPhoneModalVisible(true)}
                        />
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
            <EditProfileFieldModal
                            visible={emailModalVisible}
                            title="Alterar e-mail"
                            description="Informe o novo e-mail da sua conta."
                            value={user.email}
                            placeholder="novo@email.com"
                            loading={updateEmail.isPending}
                            onClose={() => setEmailModalVisible(false)}
                            onSave={handleUpdateEmail}
                        />
            
                        <EditProfileFieldModal
                            visible={phoneModalVisible}
                            title="Alterar telefone"
                            description="Informe o novo número de telefone."
                            value={user.phoneNumber}
                            placeholder="11999999999"
                            maxLength={15}
                            loading={updatePhone.isPending}
                            onClose={() => setPhoneModalVisible(false)}
                            onSave={handleUpdatePhone}
                        />
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
        color: '#5795D4',
        fontSize: 15,
        lineHeight: 21,
        fontWeight: '500',
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
        backgroundColor: '#E5F2FF',
    },

    avatarText: {
        color: '#2877E6',
        fontSize: 25,
        fontWeight: '800',
    },

    pawBadge: {
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
        backgroundColor: '#2877E6',
    },

    usuarioNome: {
        marginTop: 15,
        color: '#174F79',
        fontSize: 21,
        fontWeight: '700',
        textAlign: 'center',
    },

    roleBadge: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        backgroundColor: '#EAF4FF',
    },

    roleBadgeText: {
        color: '#2877E6',
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

    acoesContainer: {
        marginTop: 14,
        gap: 11,
    },

    contaFields: {
        gap: 10,
        marginTop: 15,
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