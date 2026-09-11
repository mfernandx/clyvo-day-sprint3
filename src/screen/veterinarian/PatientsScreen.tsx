import React, {useMemo,useState} from 'react';
import {ActivityIndicator,RefreshControl,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {usePatients} from '../../hooks/usePatients';
import {PatientCard} from '../../components/PatientCard';

export function PatientsScreen() {
    const [search,setSearch] = useState('');
    const {data: patients,isLoading,isError,isRefetching,refetch,} = usePatients();
    
    const filteredPatients = useMemo(() => {

        if (!patients) {
            return [];
        }

        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) {
            return patients;
        }

        return patients.filter((pet) => {
            const searchableText = [pet.name,pet.species,pet.breed,pet.sex].join(' ').toLowerCase();

            return searchableText.includes(normalizedSearch,);
        });

    }, [patients, search]);

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()}/>}>
                
                <View style={styles.header}>
                    <View>
                        <Text style={styles.titulo}>Pacientes</Text>
                        <Text style={styles.subtitulo}>Consulte os pets cadastrados no CLYVO DAY.</Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons name="paw-outline" size={24} color="#2877E6"/>
                    </View>
                </View>

                <View style={styles.buscaContainer}>
                    <Ionicons name="search-outline" size={20} color="#7A92A4"/>
                    <TextInput style={styles.buscaInput} placeholder="Buscar por nome, espécie ou raça..." placeholderTextColor="#9AAAB6" value={search} onChangeText={setSearch}/>

                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Ionicons name="close-circle" size={19} color="#9AAAB6"/>
                        </TouchableOpacity>
                    )}
                </View>

                {!isLoading && !isError && (
                    <View style={styles.sumarioRow}>
                        <View>
                            <Text style={styles.sectionTitulo}>Todos os pacientes</Text>
                            <Text style={styles.sectionSubtitulo}>Pets disponíveis para acompanhamento profissional.</Text>
                        </View>

                        <View style={styles.contadorBadge}>
                            <Text style={styles.contadorText}>{filteredPatients.length}</Text>
                        </View>
                    </View>
                )}

                {isLoading && (
                    <View style={styles.estadoContainer}>
                        <ActivityIndicator size="large" color="#2877E6"/>
                        <Text style={styles.estadoText}>Buscando pacientes...</Text>
                    </View>
                )}

                {isError && (
                    <View style={styles.estadoCard}>
                        <View style={styles.estadoIcon}>
                            <Ionicons name="cloud-offline-outline" size={28} color="#C86A6A"/>
                        </View>

                        <Text style={styles.estadoTitulo}>Não foi possível carregar os pacientes</Text>
                        <Text style={styles.estadoDescricao}>Verifique sua conexão e tente novamente.</Text>

                        <TouchableOpacity style={styles.retryButton} activeOpacity={0.8} onPress={() => refetch()}>
                            <Ionicons name="refresh-outline" size={18} color="#2877E6"/>
                            <Text style={styles.retryText}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!isLoading && !isError && patients?.length === 0 && (
                    <View style={styles.estadoCard}>
                        <View style={styles.emptyIcon}>
                            <Ionicons name="paw-outline" size={30} color="#78A9D8"/>
                        </View>

                        <Text style={styles.estadoTitulo}>Nenhum paciente cadastrado ainda</Text>
                        <Text style={styles.estadoDescricao}>Quando novos pets forem cadastrados, eles aparecerão por aqui.</Text>
                    </View>
                )}

                {!isLoading && !isError && patients && patients.length > 0 && filteredPatients.length === 0 && (
                    <View style={styles.estadoCard}>
                        <View style={styles.emptyIcon}>
                            <Ionicons name="search-outline" size={29} color="#78A9D8"/>
                        </View>

                        <Text style={styles.estadoTitulo}>Nenhum paciente encontrado</Text>
                        <Text style={styles.estadoDescricao}>Tente pesquisar poroutro nome, espécie ou raça.</Text>
                    </View>
                )}

                {!isLoading && !isError && filteredPatients.length > 0 && (
                    <View style={styles.listContainer}>
                        {filteredPatients.map(
                            (pet) => (<PatientCard key={pet.petId} pet={pet}/>),
                        )}
                    </View>
                )}
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
        paddingBottom: 36,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 21,
    },

    titulo: {
        color: '#174F79',
        fontSize: 30,
        fontWeight: '700',
    },

    subtitulo: {
        maxWidth: 260,
        marginTop: 5,
        color: '#70889A',
        fontSize: 13,
        lineHeight: 18,
    },

    headerIcon: {
        width: 47,
        height: 47,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor:'#EAF4FF',
    },

    buscaContainer: {
        minHeight: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 19,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3EDF5',
    },

    buscaInput: {
        flex: 1,
        marginHorizontal: 10,
        color: '#315B79',
        fontSize: 14,
    },

    sumarioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginTop: 27,
        marginBottom: 15,
    },

    sectionTitulo: {
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    sectionSubtitulo: {
        marginTop: 3,
        color: '#8194A3',
        fontSize: 11,
    },

    contadorBadge: {
        minWidth: 37,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 13,
        backgroundColor:'#EAF4FF',
    },

    contadorText: {
        color: '#2877E6',
        fontSize: 14,
        fontWeight: '800',
    },

    listContainer: {
        gap: 11,
    },

    estadoContainer: {
        alignItems: 'center',
        paddingVertical: 70,
    },

    estadoText: {
        marginTop: 12,
        color: '#768D9F',
        fontSize: 13,
    },

    estadoCard: {
      alignItems: 'center',
        marginTop: 35,
        paddingHorizontal: 25,
        paddingVertical: 32,
        borderRadius: 25,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    estadoIcon: {
        width: 57,
        height: 57,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 19,
        backgroundColor:'#FFF1F1',
    },

    emptyIcon: {
        width: 57,
        height: 57,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 19,
        backgroundColor:'#EAF4FF',
    },

    estadoTitulo: {
        marginTop: 14,
        color: '#315B79',
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },

    estadoDescricao: {
        maxWidth: 270,
        marginTop: 6,
        color: '#8195A4',
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },

    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 17,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 13,
        backgroundColor:'#EAF4FF',
    },

    retryText: {
        color: '#2877E6',
        fontSize: 12,
        fontWeight: '700',
    },
});