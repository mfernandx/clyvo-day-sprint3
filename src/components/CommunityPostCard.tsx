import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {CommunityPost} from './../model/CommunityPost';

interface Props {post: CommunityPost}

function getCategoryStyle(category: string,) {

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
                icon: 'help-circle-outline' as const,
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
                icon: 'chatbubble-outline' as const,
                backgroundColor: '#F0F3F6',
                iconColor: '#70879A',
            };
    }
}

function getInitials(name: string) {

    const parts = name.trim().split(' ').filter(Boolean);

    if (parts.length === 0) {
        return '?';
    }

    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getUserTypeLabel(userType: string) {

    return userType === 'Veterinario' ? 'Veterinário(a)' : 'Tutor(a)';
}

function formatPostDate(registeredAt: string,) {

    const date = new Date(registeredAt);
    return date.toLocaleDateString('pt-BR',{day: '2-digit',month: 'short',year: 'numeric'});

}

function formatPostTime(registeredAt: string) {

    const date = new Date(registeredAt);
    return date.toLocaleTimeString('pt-BR',{hour: '2-digit',minute: '2-digit'});

}

export function CommunityPostCard({post}: Props) {

    const categoryStyle = getCategoryStyle(post.category);
    const isVeterinarian = post.userType === 'Veterinario';

    return (
        <View style={styles.card}>
            <View style={styles.usuarioRow}>
                <View style={[styles.avatar,isVeterinarian ? styles.vetAvatar : styles.tutorAvatar]}>
                    <Text style={[styles.avatarText,isVeterinarian ? styles.vetAvatarText : styles.tutorAvatarText]}>{getInitials(post.userName)}</Text>
                </View>

                <View style={styles.usuarioInfo}>
                    <View style={styles.usuarioNomeRow}>
                        <Text style={styles.usuarioNome} numberOfLines={1}>{post.userName}</Text>

                        {isVeterinarian && (
                            <View style={styles.vetBadge}>
                                <Ionicons name="medkit" size={11} color="#3DA68D"/>
                                <Text style={styles.vetBadgeText}>Vet</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.usuarioMeta}>
                        <Text style={styles.usuarioType}>{getUserTypeLabel(post.userType)}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.data}>{formatPostDate(post.registeredAt)}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.data}>{formatPostTime(post.registeredAt)}</Text>
                    </View>
                </View>

            </View>

            <View style={[styles.categoria,{backgroundColor:categoryStyle.backgroundColor}]}>
                <Ionicons name={categoryStyle.icon} size={16} color={categoryStyle.iconColor}/>
                <Text style={[styles.categoriaText,{color:categoryStyle.iconColor}]}>{post.category}</Text>
            </View>

            <Text style={styles.conteudo}>{post.content}</Text>

            {post.location && (
                <View style={styles.localizacao}>
                    <View style={styles.localizacaoIcon}>
                        <Ionicons name="location-outline" size={16} color="#2877E6"/>
                    </View>

                    <Text style={styles.localizacaoText}>{post.location}</Text>
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
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
    },

    tutorAvatar: {
        backgroundColor: '#EAF4FF',
    },

    vetAvatar: {
        backgroundColor: '#EAF7F3',
    },

    avatarText: {
        fontSize: 14,
        fontWeight: '800',
    },

    tutorAvatarText: {
        color: '#2877E6',
    },

    vetAvatarText: {
        color: '#3DA68D',
    },

    usuarioInfo: {
        flex: 1,
        marginLeft: 11,
    },

    usuarioNomeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },

    usuarioNome: {
        flexShrink: 1,
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    vetBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 9,
        backgroundColor: '#EAF7F3',
    },

    vetBadgeText: {
        color: '#3DA68D',
        fontSize: 10,
        fontWeight: '700',
    },

    usuarioMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 3,
    },

    usuarioType: {
        color: '#71899D',
        fontSize: 11,
        fontWeight: '600',
    },

    dot: {
        marginHorizontal: 5,
        color: '#A7B4BF',
        fontSize: 10,
    },

    data: {
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
        gap: 7,
        marginTop: 15,
    },

    localizacaoIcon: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: '#EAF4FF',
    },

    localizacaoText: {
        flex: 1,
        color: '#71899D',
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