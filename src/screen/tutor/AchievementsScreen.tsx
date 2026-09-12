import React from 'react';
import {SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useAuth} from '../../context/AuthContext';
import {TutorUser} from '../../model/User';
import {achievements} from '../../utils/constants/achievements';
import {AchievementCard} from '../../components/AchievementCard';
import {AchievementProgress} from '../../components/AchievementProgress';

export function AchievementsScreen() {

    const { user } = useAuth();

    if (!user || user.typeUser !== 'Tutor') {
        return null;
    }

    const tutor = user as TutorUser;
    const currentIndex = achievements.findIndex((achievement) => achievement.id === tutor.achievement);
    const currentAchievement = achievements[currentIndex];
    const nextAchievement = achievements[currentIndex + 1];

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Conquistas</Text>
                    <Text style={styles.subtitulo}>Cada cuidado conta para a jornada de vocês.</Text>
                </View>

                <View style={styles.cardPrincipal}>
                    <View style={styles.cardPrincipalIcon}>
                        <Ionicons name={currentAchievement ?.icon ?? 'paw-outline'} size={30} color="#2877E6"/>
                    </View>

                    <Text style={styles.cardPrincipalLabel}>Sua conquista atual</Text>

                    <Text style={styles.cardPrincipalTitulo}>{currentAchievement ?.title}</Text>

                    <Text style={styles.cardPrincipalDescricao}>{currentAchievement ?.description}</Text>

                    <View style={styles.scoreContainer}>
                        <Ionicons name="sparkles-outline" size={16} color="#D9912B"/>
                        <Text style={styles.score}>{tutor.scoreEngagement}{' '}pontos</Text>
                    </View>
                </View>

                <View style={styles.progressoSection}>
                    <AchievementProgress
                        currentScore={ tutor.scoreEngagement}
                        currentMinScore={currentAchievement ?.minScore ?? 0}
                        nextMinScore={nextAchievement ?.minScore}
                        nextTitle={nextAchievement?.title}
                    />
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitulo}>Sua jornada</Text>
                    <Text style={styles.sectionSubtitulo}>Continue registrando cuidados e acompanhando seu pet para avançar.</Text>
                </View>

                <View style={styles.conquistaList}>
                    {achievements.map((achievement,index) => {
                        const unlocked = index <= currentIndex;
                        const current = achievement.id === tutor.achievement;

                        return (
                            <AchievementCard
                                key={achievement.id}
                                achievement={achievement}
                                unlocked={unlocked}
                                current={current}
                            />
                        );
                    })}
                </View>

                <View style={styles.dicaCard}>
                    <View style={styles.dicaIcon}>
                        <Ionicons name="heart-outline" size={22} color="#3DA68D"/>
                    </View>

                    <View style={styles.dicaConteudo}>
                        <Text style={styles.dicaTitulo}>Como ganhar pontos?</Text>

                        <Text style={styles.dicaText}>Registros e acompanhamento frequente ajudam você a avançar na jornadade cuidado do seu pet.</Text>
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
    },

    cardPrincipal: {
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 26,
        borderRadius: 28,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDEAF4',
    },

    cardPrincipalIcon: {
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor:'#EAF4FF',
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
        fontSize: 22,
        fontWeight: '800',
    },

    cardPrincipalDescricao: {
        maxWidth: 270,
        marginTop: 7,
        color: '#738B9D',
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },

    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 15,
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor:'#FFF3DD',
    },

    score: {
        color: '#D9912B',
        fontSize: 12,
        fontWeight: '800',
    },

    progressoSection: {
        marginTop: 13,
    },

    sectionHeader: {
        marginTop: 28,
        marginBottom: 13,
    },

    sectionTitulo: {
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    sectionSubtitulo: {
        marginTop: 4,
        color: '#8095A5',
        fontSize: 11,
        lineHeight: 16,
    },

    conquistaList: {
        gap: 11,
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

    dicaText: {
        marginTop: 4,
        color: '#557F77',
        fontSize: 11,
        lineHeight: 16,
    },
});