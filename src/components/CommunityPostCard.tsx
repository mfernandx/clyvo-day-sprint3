import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {CommunityPost} from './../model/CommunityPost';

interface Props {post: CommunityPost;}

function getCategoryStyle(category: string) {

    switch (category) {
        case 'Momento com meu pet':
            return {
                icon: 'paw-outline' as const,
                backgroundColor: '#E7F2FF',
                iconColor: '#2877E6',
            };

        case 'Experiência com veterinário':
            return {
                icon: 'medkit-outline' as const,
                backgroundColor: '#EAF7F3',
                iconColor: '#3DA68D',
            };

        case 'Experiência com clínica':
            return {
                icon: 'business-outline' as const,
                backgroundColor: '#EEF1FF',
                iconColor: '#5C6FD8',
            };

        case 'Conquista do meu pet':
            return {
                icon: 'trophy-outline' as const,
                backgroundColor: '#FFF3DD',
                iconColor: '#D9912B',
            };

        case 'Dica':
            return {
                icon: 'bulb-outline' as const,
                backgroundColor: '#FFF0E6',
                iconColor: '#D97745',
            };

        case 'Dúvida':
            return {
                icon:
                'help-circle-outline' as const,
                backgroundColor: '#F1ECFF',
                iconColor: '#7254D6',
            };

        case 'Recomendação':
            return {
                icon: 'heart-outline' as const,
                backgroundColor: '#FFE9EC',
                iconColor: '#D85B6A',
            };

        case 'Adoção e acolhimento':
            return {
                icon: 'home-outline' as const,
                backgroundColor: '#E8F7FF',
                iconColor: '#3A9BC7',
            };

        default:
            return {
                icon:
                'chatbubble-outline' as const,
                backgroundColor: '#F0F3F6',
                iconColor: '#70879A',
            };
    }
}

function formatPostDate(registeredAt: string) {

    const date = new Date(registeredAt);
    return date.toLocaleDateString('pt-BR',{day: '2-digit',month: 'short',year: 'numeric'});

}

export function CommunityPostCard({post}: Props) {
  const categoryStyle = getCategoryStyle(post.category);

  return (
        <View style={styles.card}>
            <View style={styles.usuarioRow}>
                <View style={styles.avatar}>
                    <Ionicons name="person-outline" size={22} color="#2877E6"/>
                </View>

                <View style={styles.usuarioInfo}>
                    <Text style={styles.usuarioNome}>Membro da comunidade</Text>
                    <Text style={styles.data}>{formatPostDate(post.registeredAt)}</Text>
                </View>

                <Ionicons name="ellipsis-horizontal" size={21} color="#8BA0B1"/>
            </View>

            <View style={[styles.categoria,{backgroundColor:categoryStyle.backgroundColor}]}>
                <Ionicons name={categoryStyle.icon} size={16} color={categoryStyle.iconColor}/>
                <Text style={[styles.categoriaText,{color:categoryStyle.iconColor}]}>{post.category}</Text>
            </View>

            <Text style={styles.conteudo}>{post.content}</Text>

            {post.location && (
                <View style={styles.localizacao}>
                    <Ionicons name="location-outline" size={16} color="#8299AA"/>
                    <Text style={styles.localizacaoText}>{post.location}</Text>
                </View>
            )}

            {post.imageUrl && (
                <View style={styles.imagemPlaceholder}>
                    <Ionicons name="image-outline" size={28} color="#8BBCE8"/>
                    <Text style={styles.imagemPlaceholderText}>Imagem da publicação</Text>
                </View>
            )}

            <View style={styles.divisor} />

            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Ionicons name="heart-outline" size={21} color="#66859B"/>
                    <Text style={styles.footerText}>Apoiar</Text>
                </View>

                <View style={styles.footerItem}>
                    <Ionicons name="chatbubble-outline" size={20} color="#66859B"/>
                    <Text style={styles.footerText}>Conversar</Text>
                </View>

                <View style={styles.footerItem}>
                    <Ionicons name="share-social-outline" size={20} color="#66859B"/>
                    <Text style={styles.footerText}>Compartilhar</Text>
                </View>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        padding: 18,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    usuarioRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 46,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#EAF4FF',
    },

    usuarioInfo: {
        flex: 1,
        marginLeft: 11,
    },

    usuarioNome: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    data: {
        marginTop: 2,
        color: '#8A9EAE',
        fontSize: 11,
    },

    categoria: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 17,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },

    categoriaText: {
        fontSize: 12,
        fontWeight: '700',
    },

    conteudo: {
        marginTop: 15,
        color: '#315B79',
        fontSize: 15,
        lineHeight: 23,
    },

    localizacao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 14,
    },

    localizacaoText: {
        color: '#8299AA',
        fontSize: 12,
    },

    imagemPlaceholder: {
        minHeight: 150,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#F3F8FC',
    },

    imagemPlaceholderText: {
        marginTop: 7,
        color: '#8BA0B1',
        fontSize: 12,
    },

    divisor: {
        height: 1,
        marginTop: 17,
        backgroundColor: '#EAF0F5',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
    },

    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    footerText: {
        color: '#66859B',
        fontSize: 12,
        fontWeight: '600',
    },
});