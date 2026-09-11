import React from 'react';
import {Alert,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {VeterinarianStackParamList} from '../../navigation/navigationTypes';
import {useAuth} from '../../context/AuthContext';
import {VetQuickActions} from '../../components/VetQuickActions';
import {VetOverviewCard} from '../../components/VetOverviewCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export function VeterinarianHomeScreen() {

    const navigation =useNavigation<NativeStackNavigationProp<VeterinarianStackParamList>>();
    const { user } = useAuth();
    
    function getFirstName() {
        if (!user?.fullName) {
            return '';
        }
        return user.fullName.split(' ')[0];
    }

    if (!user) {
        return null;
    }

    const quickActions = [
        {
            label: 'Atendimentos',
            description: 'Acesse sua agenda',
            icon:'medical-outline' as const,
            backgroundColor:'#EAF4FF',
            iconColor:'#2877E6',
            onPress: () => {Alert.alert('Em breve')},
        },
        {
            label: 'Publicar',
            description: 'Compartilhe no feed',
            icon:'create-outline' as const,
            backgroundColor:'#F1ECFF',
            iconColor:'#7254D6',
            onPress: () => navigation.navigate('CommunityPostCreate'),
        },
        {
            label: 'Insights',
            description: 'Relatórios gerais',
            icon:'document-text-outline' as const,
            backgroundColor:'#EAF7F3',
            iconColor:'#3DA68D',
            onPress: () => {Alert.alert('Em breve')},
        },
        {
            label: 'Buscar paciente',
            description: 'Busca rápida',
            icon:'search-outline' as const,
            backgroundColor:'#FFF3DD',
            iconColor:'#D9912B',
            onPress: () => {Alert.alert('Em breve')},
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo}>
                <View style={styles.topHeader}>
                    <View>
                        <View style={styles.badge}>
                            <Ionicons name="medkit-outline" size={20} color="#2877E6"/>
                            <Text style={styles.badgeText}>Área veterinária</Text>
                        </View>

                        <Text style={styles.paginaSubtitulo}>  Seu espaço de cuidado veterinário</Text>
                    </View>

                    <TouchableOpacity style={styles.notificacaoButton} activeOpacity={0.8}>
                        <Ionicons name="notifications-outline" size={23} color="#174F79"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardPrincipal}>
                                    
                    <View style={styles.circleLarge} />
                    <View style={styles.circleSmall} />
                
                    <View style={styles.cardPrincipalConteudo}>
                        <View style={styles.cardPrincipalTextContainer}>
                            <Text style={styles.cardPrincipalTitulo}>Olá, {getFirstName()} 👋</Text>
                            <Text style={styles.cardPrincipalDescricao}>Continue acompanhando histórias e fortalecendo a relação com os tutores.</Text>
                        </View>
                
                        <View style={styles.cardPrincipalPetIcon}>
                            <Ionicons name="heart-circle-outline" size={55} color="#2877E6"/>
                        </View>
                    </View>
                
                </View>

                <View style={styles.comunidadeCard}>
                    <View style={styles.comunidadeIcon}>
                        <Ionicons name="chatbubbles-outline" size={25} color="#2877E6"/>
                    </View>

                    <View style={styles.comunidadeText}>
                        <Text style={styles.comunidadeTitulo}>Compartilhe conhecimento</Text>
                        <Text style={styles.comunidadeDescricao}>Sua experiência pode orientar, acolher e ajudar muitos tutores.</Text>
                    </View>

                    <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8} onPress={() => navigation.navigate('Community')}>
                        <Ionicons name="arrow-forward" size={20} color="#2877E6"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitulo}>Acessos rápidos</Text>
                            <Text style={styles.sectionSubtitulo}>Tudo que você mais usa em um só lugar.</Text>
                        </View>
                    </View>

                    <VetQuickActions actions={quickActions}/>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitulo}>Seus cuidados</Text>
                            <Text style={styles.sectionSubtitulo}>Acompanhe sua atuação dentro do CLYVO DAY.</Text>
                        </View>
                    </View>

                    <VetOverviewCard />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor:'#F5FAFF',
    },

    conteudo: {
        paddingHorizontal: 22,
        paddingTop: 20,
        paddingBottom: 35,
    },

    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 20,
    },

    badge: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        
    },

    badgeText: {
        color: '#2877E6',
        fontSize: 15,
        fontWeight: '700',
    },

    paginaSubtitulo: {
        marginTop: 10,
        color: '#6C879C',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '500',
    },

    notificacaoButton: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    section: {
        marginTop: 30,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 15,
    },

    sectionTitulo: {
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    sectionSubtitulo: {
        marginTop: 3,
        color: '#8095A5',
        fontSize: 12,
    },

    cardPrincipal: {
        minHeight: 200,
        borderRadius: 30,
        backgroundColor: '#DDEFFF',
        overflow: 'hidden',
    },

    cardPrincipalConteudo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 28,
    },

    cardPrincipalTextContainer: {
        flex: 1,
        zIndex: 2,
    },

    cardPrincipalTitulo: {
        maxWidth: 220,
        color: '#174F79',
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '700',
    },

    cardPrincipalDescricao: {
        maxWidth: 225,
        marginTop: 10,
        color: '#547B9A',
        fontSize: 14,
        lineHeight: 21,
    },

    cardPrincipalPetIcon: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.72)',
        zIndex: 2,
    },

    circleLarge: {
        position: 'absolute',
        width: 180,
        height: 180,
        right: -40,
        bottom: -50,
        borderRadius: 90,
        backgroundColor: '#C8E5FF',
    },

    circleSmall: {
        position: 'absolute',
        width: 90,
        height: 90,
        left: -20,
        top: -20,
        borderRadius: 45,
        backgroundColor: '#EAF6FF',
    },

    comunidadeCard: {
        marginTop: 28,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    comunidadeIcon: {
        width: 49,
        height: 49,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: '#EAF4FF',
    },

    comunidadeText: {
        flex: 1,
        marginHorizontal: 12,
    },

    comunidadeTitulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    comunidadeDescricao: {
        marginTop: 4,
        color: '#7A91A2',
        fontSize: 12,
        lineHeight: 17,
    },

    arrowButton: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        backgroundColor: '#F0F7FE',
    },
  });