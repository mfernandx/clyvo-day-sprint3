import React from 'react';
import {ActivityIndicator,FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PetCard } from '../../components/PetCard';
import { usePets } from '../../hooks/usePets';

export function PetsScreen() {

    const {data: pets,isLoading,isError,refetch,isRefetching} = usePets();

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.conteudoCenter}>
                    <ActivityIndicator size="large" color="#2877E6"/>
                    <Text style={styles.loadingText}>Carregando seus pets...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.conteudoCenter}>
                    <Ionicons name="alert-circle-outline" size={52} color="#B84B4B"/>

                    <Text style={styles.errorTitulo}>Não foi possível carregar seus pets</Text>

                    <Text style={styles.errorText}>Verifique sua conexão e tente novamente.</Text>

                    <TouchableOpacity style={styles.retryButton} activeOpacity={0.8} onPress={() => refetch()}>
                        <Text style={styles.retryButtonText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.titulo}>Meus Pets</Text>
                    <Text style={styles.subtitulo}>Acompanhe quem faz parte da sua jornada.</Text>
                </View>

                <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                    <Ionicons name="add" size={26} color="#FFFFFF"/>
                </TouchableOpacity>
            </View>

            {!pets || pets.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconContainer}>
                        <Ionicons name="paw-outline" size={50} color="#2877E6"/>
                    </View>

                    <Text style={styles.emptyTitulo}>Nenhum pet cadastrado</Text>
                    <Text style={styles.emptyText}>Seus pets aparecerão aqui quando forem cadastrados.</Text>
                </View>
            ) : (
                <FlatList
                    data={pets}
                    keyExtractor={(item) =>item.petId.toString()}
                    renderItem={({ item }) => (<PetCard pet={item}/>)}
                    contentContainerStyle={styles.listConteudo}
                    ItemSeparatorComponent={() => (<View style={styles.separador} />)}
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FBFF',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 20,
    },

    titulo: {
        color: '#174F79',
        fontSize: 28,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 5,
        color: '#6C879C',
        fontSize: 14,
    },

    addButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: '#2877E6',
    },

    listConteudo: {
        paddingHorizontal: 24,
        paddingBottom: 30,
    },

    separador: {
        height: 13,
    },

    conteudoCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    loadingText: {
        marginTop: 14,
        color: '#6C879C',
        fontSize: 15,
    },

    errorTitulo: {
        marginTop: 16,
        color: '#174F79',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },

    errorText: {
        marginTop: 8,
        color: '#6C879C',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
    },

    retryButton: {
        height: 50,
        marginTop: 22,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: '#2877E6',
    },

    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: 80,
    },

    emptyIconContainer: {
        width: 92,
        height: 92,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: '#EAF4FF',
    },

    emptyTitulo: {
        marginTop: 20,
        color: '#174F79',
        fontSize: 21,
        fontWeight: '700',
    },

    emptyText: {
        maxWidth: 290,
        marginTop: 8,
        color: '#6C879C',
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
    },
});