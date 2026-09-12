import React, {useMemo,} from 'react';
import {ActivityIndicator,RefreshControl,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {usePatients} from '../../hooks/usePatients';
import {useTutors} from '../../hooks/useTutors';
import {InsightSummaryCard} from '../../components/InsightSummaryCard';
import {TutorEngagementCard} from '../../components/TutorEngagementCard';

export function VeterinarianInsightsScreen() {

    const {data: patients = [], isLoading:isLoadingPatients, isError:isPatientsError, refetch:refetchPatients, isRefetching:isRefetchingPatients} = usePatients();
    const {data: tutors = [], isLoading:isLoadingTutors, isError:isTutorsError, refetch:refetchTutors, isRefetching:isRefetchingTutors} = useTutors();

    const sortedTutors =
        useMemo(() => {

            return [...tutors].sort((a, b) => b.scoreEngagement - a.scoreEngagement);

        }, [tutors]);

    const totalPoints =
        useMemo(() => {

            return tutors.reduce((total, tutor) => total + tutor.scoreEngagement,0);

        }, [tutors]);

    const averagePoints =
        useMemo(() => {
            if (tutors.length === 0) {
                return 0;
            }

            return Math.round(totalPoints / tutors.length);
        }, [tutors,totalPoints]);

    const activeTutors =
        useMemo(() => {

            return tutors.filter((tutor) => tutor.isActive).length;

        }, [tutors]);

    const isLoading = isLoadingPatients || isLoadingTutors;
    const isError = isPatientsError || isTutorsError;
    const isRefreshing = isRefetchingPatients || isRefetchingTutors;

    async function handleRefresh() {

        await Promise.all([refetchPatients(),refetchTutors()]);

    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#2877E6"/>
                    <Text style={styles.loadingText}>Carregando insights...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.centerContainer}>
                    <Ionicons name="cloud-offline-outline" size={42} color="#8AA0B0"/>

                    <Text style={styles.errorTitulo}>Não foi possível carregar os insights</Text>

                    <Text style={styles.errorText}>Puxe a tela para atualizar ou tente novamente mais tarde.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}>
                
                <View style={styles.header}>
                    <Text style={styles.titulo}>Insights</Text>
                    <Text style={styles.subtitulo}>Uma visão geral dos pacientes e do engajamento dos tutores.</Text>
                </View>

                <View style={styles.cardPrincipal}>
                    <View style={styles.cardPrincipalIcon}>
                        <Ionicons name="analytics-outline" size={29} color="#3DA68D"/>
                    </View>

                    <Text style={styles.cardPrincipalLabel}>Visão da comunidade</Text>
                    <Text style={styles.cardPrincipalTitulo}>Cuidado que gera continuidade</Text>
                    <Text style={styles.cardPrincipalDescricao}>Acompanhe o número de pacientes e como os tutores estão participando da jornada de cuidado.</Text>
                </View>

                <View style={styles.sumarioGrid}>

                    <InsightSummaryCard
                        title="Pacientes"
                        value={patients.length}
                        description="Pets disponíveis para acompanhamento."
                        icon="paw-outline"
                        iconColor="#2877E6"
                        backgroundColor="#EAF4FF"
                    />

                    <InsightSummaryCard
                        title="Tutores"
                        value={tutors.length}
                        description="Tutores cadastrados na plataforma."
                        icon="people-outline"
                        iconColor="#3DA68D"
                        backgroundColor="#EAF7F3"
                    />
                </View>

                <View style={[styles.sumarioGrid,styles.secondGrid]}>

                    <InsightSummaryCard
                        title="Média de pontos"
                        value={averagePoints}
                        description="Engajamento médio dos tutores."
                        icon="sparkles-outline"
                        iconColor="#D9912B"
                        backgroundColor="#FFF3DD"
                    />

                    <InsightSummaryCard
                        title="Tutores ativos"
                        value={activeTutors}
                        description="Contas atualmente ativas."
                        icon="heart-outline"
                        iconColor="#9B72CF"
                        backgroundColor="#F1E9FB"
                    />
                </View>

                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitulo}>Engajamento dos tutores</Text>
                        <Text style={styles.sectionSubtitulo}>Pontuação atual ordenada do maior para o menor engajamento.</Text>
                    </View>

                    <View style={styles.totalPontosBadge}>
                        <Ionicons name="sparkles-outline" size={13} color="#D9912B"/>
                        <Text style={styles.totalPontosText}>{totalPoints} pts</Text>
                    </View>
                </View>

                {sortedTutors.length === 0 ? (

                    <View style={styles.emptyCard}>
                        <Ionicons name="people-outline" size={28} color="#91A4B2"/>
                        <Text style={styles.emptyTitulo}>Nenhum tutor encontrado</Text>
                        <Text style={styles.emptyText}>Ainda não existem dados de engajamento para exibir.</Text>
                    </View>

                ) : (
                    <View style={styles.tutorsList}>
                        {sortedTutors.map((tutor,index) => (
                            <TutorEngagementCard
                                key={tutor.userId}
                                tutor={tutor}
                                position={index + 1}
                            />
                        ))}
                    </View>
                )}

                <View style={styles.dicaCard}>
                    <View style={styles.dicaIcon}>
                        <Ionicons name="information-circle-outline" size={22} color="#3DA68D"/>
                    </View>

                    <View style={styles.dicaConteudo}>
                        <Text style={styles.dicaTitulo}>Sobre os pontos</Text>
                        <Text style={styles.dicaTexto}>A pontuação representa o envolvimento dos tutores com os registros e cuidados dos seus pets.</Text>
                    </View>
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
        paddingTop: 22,
        paddingBottom: 40,
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
        color: '#70889A',
        fontSize: 13,
        lineHeight: 18,
    },

    cardPrincipal: {
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 25,
        borderRadius: 28,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDEAF4',
    },

    cardPrincipalIcon: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor:'#EAF7F3',
    },

    cardPrincipalLabel: {
        marginTop: 14,
        color: '#7890A2',
        fontSize: 11,
        fontWeight: '600',
    },

    cardPrincipalTitulo: {
        marginTop: 5,
        color: '#174F79',
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
    },

    cardPrincipalDescricao: {
        maxWidth: 280,
        marginTop: 7,
        color: '#738B9D',
        fontSize: 11,
        lineHeight: 17,
        textAlign: 'center',
    },

    sumarioGrid: {
        flexDirection: 'row',
        gap: 11,
        marginTop: 14,
    },

    secondGrid: {
        marginTop: 11,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'flex-end',
        marginTop: 28,
        marginBottom: 13,
    },

    sectionTitulo: {
        maxWidth: 220,
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    sectionSubtitulo: {
        maxWidth: 235,
        marginTop: 4,
        color: '#8095A5',
        fontSize: 10,
        lineHeight: 15,
    },

    totalPontosBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 11,
        backgroundColor:'#FFF3DD',
    },

    totalPontosText: {
        color: '#D9912B',
        fontSize: 10,
        fontWeight: '800',
    },

    tutorsList: {
        gap: 10,
    },

    emptyCard: {
        alignItems: 'center',
        padding: 25,
        borderRadius: 22,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EDF4',
    },

    emptyTitulo: {
        marginTop: 9,
        color: '#174F79',
        fontSize: 13,
        fontWeight: '700',
    },

    emptyText: {
        marginTop: 4,
        color: '#8497A5',
        fontSize: 10,
        textAlign: 'center',
    },

    dicaCard: {
        flexDirection: 'row',
        marginTop: 22,
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#EAF7F3',
    },

    dicaIcon: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#FFFFFF',
    },

    dicaConteudo: {
        flex: 1,
        marginLeft: 12,
    },

    dicaTitulo: {
        color: '#347F70',
        fontSize: 13,
        fontWeight: '700',
    },

    dicaTexto: {
        marginTop: 4,
        color: '#557F77',
        fontSize: 11,
        lineHeight: 16,
    },

    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    loadingText: {
        marginTop: 12,
        color: '#70889A',
        fontSize: 12,
    },

    errorTitulo: {
        marginTop: 12,
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },

    errorText: {
        marginTop: 5,
        color: '#8095A5',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center',
    },
});