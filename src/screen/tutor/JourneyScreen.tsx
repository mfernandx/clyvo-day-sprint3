import React, {useEffect,useMemo,useState} from 'react';
import {ActivityIndicator,RefreshControl,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {usePets} from '../../hooks/usePets';
import {useDailyPetLogs} from '../../hooks/useDailyPetLog';
import {DailyPetLogJourneyCard} from '../../components/JourneyCard';

export function JourneyScreen() {
    const [selectedPetId, setSelectedPetId] = useState<number | undefined>();
    const {data: pets, isLoading: isLoadingPets, isError: isPetsError,} = usePets();

    useEffect(() => {
        if (pets?.length && !selectedPetId) {
            setSelectedPetId(pets[0].petId);
        }
    }, [pets,selectedPetId]);

    const {data: logs,isLoading: isLoadingLogs,isError: isLogsError,refetch,isRefetching} = useDailyPetLogs(selectedPetId);

    const sortedLogs = useMemo(() => {
        if (!logs) {
            return [];
        }

        return [...logs].sort((a, b) => new Date(b.registeredAt,).getTime() - new Date(a.registeredAt).getTime());
    }, [logs]);

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch}/>}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Jornada</Text>
                    <Text style={styles.subtitulo}>Cada momento faz parte da história do seu pet.</Text>
                </View>

                <Text style={styles.petSectionTitulo}>De quem vamos acompanhar a jornada?</Text>

                {isLoadingPets ? (
                    <ActivityIndicator style={styles.loading} color="#2877E6"/>

                ) : isPetsError ? (
                <Text style={styles.errorText}>Não foi possível carregar seus pets.</Text>

                ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.petList}>
                    {pets?.map((pet) => {const selected = selectedPetId === pet.petId;
                        return (
                            <TouchableOpacity key={pet.petId} style={[styles.petButton, selected && styles.petButtonSelected]} activeOpacity={0.8} onPress={() => setSelectedPetId(pet.petId)}>
                                <View style={[styles.petIcon, selected && styles.petIconSelected]}>
                                    <Ionicons name="paw" size={19} color={selected ? '#FFFFFF' : '#2877E6'}/>
                                </View>

                                <Text style={[styles.petNome, selected && styles.petNomeSelected]}>{pet.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                )}

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitulo}>Momentos registrados</Text>
                    <Ionicons name="sparkles-outline" size={19} color="#65A8EA"/>
                </View>

                {!selectedPetId ? (
                <View style={styles.emptyCard}>
                    <Ionicons name="paw-outline" size={35} color="#8BBCE8"/>
                    <Text style={styles.emptyTitulo}>Selecione um pet</Text>
                    <Text style={styles.emptyText}>Escolha um pet para visualizar sua jornada.</Text>
                </View>

                ) : isLoadingLogs ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2877E6"/>

                    <Text style={styles.loadingText}>Carregando a jornada...</Text>
                </View>

                ) : isLogsError ? (
                <View style={styles.emptyCard}>
                    <Ionicons name="alert-circle-outline" size={35} color="#C56A6A"/>

                    <Text style={styles.emptyTitulo}>Algo deu errado</Text>

                    <Text style={styles.emptyText}>Não foi possível carregar os registros deste pet.</Text>

                    <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                        <Text style={styles.retryButtonText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>

                ) : sortedLogs.length === 0 ? (
                <View style={styles.emptyCard}>
                    <Ionicons name="book-outline" size={37} color="#8BBCE8"/>

                    <Text style={styles.emptyTitulo}>A jornada começa aqui ♡</Text>

                    <Text style={styles.emptyText}>Ainda não existem registros diários para este pet.</Text>
                </View>

                ) : (
                <View style={styles.timelineContainer}>
                    {sortedLogs.map((log) => (
                        <DailyPetLogJourneyCard key={log.dailyPetLogId} log={log}/>
                    ))}
                </View>
                
                )}
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
        paddingBottom: 35,
    },

    header: {
        marginBottom: 27,
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

    petSectionTitulo: {
        color: '#174F79',
        fontSize: 16,
        fontWeight: '700',
    },

    petList: {
        gap: 10,
        paddingTop: 13,
        paddingBottom: 5,
    },

    petButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E1ECF5',
    },

    petButtonSelected: {
        borderColor: '#8ABFF2',
        backgroundColor: '#EAF4FF',
    },

    petIcon: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#EAF4FF',
    },

    petIconSelected: {
        backgroundColor: '#2877E6',
    },

    petNome: {
        color: '#57748A',
        fontSize: 14,
        fontWeight: '600',
    },

    petNomeSelected: {
        color: '#2877E6',
        fontWeight: '700',
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginTop: 30,
        marginBottom: 17,
    },

    sectionTitulo: {
        color: '#174F79',
        fontSize: 20,
        fontWeight: '700',
    },

    loading: {
        marginVertical: 20,
    },

    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },

    loadingText: {
        marginTop: 12,
        color: '#71899D',
        fontSize: 14,
    },

    timelineContainer: {
        marginTop: 3,
    },

    emptyCard: {
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 40,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    emptyTitulo: {
        marginTop: 12,
        color: '#174F79',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },

    emptyText: {
        marginTop: 7,
        color: '#71899D',
        fontSize: 13,
        lineHeight: 19,
        textAlign: 'center',
    },

    errorText: {
        marginTop: 12,
        color: '#B84B4B',
        fontSize: 13,
    },

    retryButton: {
        marginTop: 17,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#2877E6',
    },

    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
});