import React, {useMemo} from 'react';
import {ActivityIndicator,RefreshControl,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStackParamList} from '../../navigation/navigationTypes';
import {useCommunityPosts} from '../../hooks/useCommunityPosts';
import {CommunityPostCard} from '../../components/CommunityPostCard';

type Props = NativeStackScreenProps<CommunityStackParamList,'Community'>;

export function CommunityScreen({navigation}: Props) {
    const {data: posts,isLoading,isError,refetch,isRefetching} = useCommunityPosts();

    const sortedPosts = useMemo(() => {
        if (!posts) {
            return [];
        }

        return [...posts].sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())}, [posts]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch}/>}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.titulo}>Comunidade</Text>
                        <Text style={styles.subtitulo}>Um espaço feito para compartilhar experiências,descobertas e cuidado.</Text>
                    </View>

                    <View style={styles.headerIconContainer}>
                        <Ionicons name="people-outline" size={25} color="#2877E6"/>
                    </View>
                </View>

                <View style={styles.welcomeCard}>
                    <View style={styles.welcomeTop}>
                        <View style={styles.heartIcon}>
                            <Ionicons name="heart" size={22} color="#FFFFFF"/>
                        </View>

                        <View style={styles.welcomeText}>
                            <Text style={styles.welcomeTitulo}>Cuidar também é compartilhar</Text>
                            <Text style={styles.welcomeDescricao}>Conte experiências que possam acolher, inspirar ou ajudar outras pessoas.</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.publicarButton} activeOpacity={0.85} onPress={() => navigation.navigate('CommunityPostCreate')}>
                        <Ionicons name="add-circle-outline" size={21} color="#FFFFFF"/>
                        <Text style={styles.publicarButtonText}>Compartilhar algo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.feedHeader}>
                    <View>
                        <Text style={styles.feedTitulo}>Conversas da comunidade</Text>
                        <Text style={styles.feedSubtitulo}>Veja o que está sendo compartilhado</Text>
                    </View>

                    <Ionicons name="sparkles-outline" size={21} color="#65A8EA"/>
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#2877E6"/>
                        <Text style={styles.loadingText}>Buscando histórias...</Text>
                    </View>
                ) : isError ? (

                <View style={styles.estadoCard}>
                    <View style={styles.errorIconContainer}>
                        <Ionicons name="cloud-offline-outline" size={31} color="#C46A6A"/>
                    </View>

                    <Text style={styles.estadoTitulo}>Não conseguimos carregar a comunidade</Text>
                    <Text style={styles.estadoText}>Verifique sua conexão e tente novamente.</Text>

                    <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                        <Ionicons name="refresh-outline" size={18} color="#FFFFFF"/>
                        <Text style={styles.retryButtonText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>

                ) : sortedPosts.length === 0 ? (
                <View style={styles.estadoCard}>
                    <View style={styles.emptyIconContainer}>
                        <Ionicons name="chatbubbles-outline" size={33} color="#65A8EA"/>
                    </View>

                    <Text style={styles.estadoTitulo}>Seja o primeiro a compartilhar ♡</Text>
                    <Text style={styles.estadoText}>A comunidade ainda não possui publicações. Uma experiência sua pode ser exatamente o que outra pessoa precisava encontrar.</Text>

                    <TouchableOpacity style={styles.emptyButton} activeOpacity={0.85} onPress={() => navigation.navigate('CommunityPostCreate')}>
                        <Text style={styles.emptyButtonText}>Criar publicação</Text>
                    </TouchableOpacity>
                </View>

                ) : (
                <View style={styles.feed}>
                    {sortedPosts.map((post) => (
                        <CommunityPostCard key={post.communityPostId} post={post}/>
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
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 35,    
    },

    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 22,
    },

    headerText: {
        flex: 1,
        paddingRight: 15,
    },

    titulo: {
        color: '#174F79',
        fontSize: 30,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 6,
        color: '#6C879C',
        fontSize: 14,
        lineHeight: 20,
    },

    headerIconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: '#EAF4FF',
    },

    welcomeCard: {
        padding: 20,
        borderRadius: 26,
        backgroundColor: '#E7F2FF',
        borderWidth: 1,
        borderColor: '#D4E8FA',
    },

    welcomeTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    heartIcon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: '#2877E6',
    },

    welcomeText: {
        flex: 1,
        marginLeft: 13,
    },

    welcomeTitulo: {
        color: '#174F79',
        fontSize: 17,
        fontWeight: '700',
    },

    welcomeDescricao: {
        marginTop: 4,
        color: '#5F7D94',
        fontSize: 13,
        lineHeight: 19,
    },

    publicarButton: {
        minHeight: 60,
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        borderRadius: 35,
        backgroundColor: '#1F6AE1',
    },

    publicarButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

    feedHeader: {
        marginTop: 29,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    feedTitulo: {
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    feedSubtitulo: {
        marginTop: 3,
        color: '#8296A6',
        fontSize: 12,
    },

    feed: {
        width: '100%',
    },

    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 65,
    },

    loadingText: {
        marginTop: 12,
        color: '#71899D',
        fontSize: 13,
    },

    estadoCard: {
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 38,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    emptyIconContainer: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: '#EAF4FF',
    },

    errorIconContainer: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: '#FFF0F0',
    },

    estadoTitulo: {
        marginTop: 15,
        color: '#174F79',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },

    estadoText: {
        marginTop: 7,
        color: '#71899D',
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'center',
    },

    retryButton: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 18,
        paddingVertical: 11,
        borderRadius: 15,
        backgroundColor: '#2877E6',
    },

    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },

    emptyButton: {
        marginTop: 18,
        paddingHorizontal: 20,
        paddingVertical: 11,
        borderRadius: 15,
        backgroundColor: '#EAF4FF',
    },

    emptyButtonText: {
        color: '#2877E6',
        fontSize: 13,
        fontWeight: '700',
    },
  });