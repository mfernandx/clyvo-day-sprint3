import React, {useState} from 'react';
import {ActivityIndicator,Alert,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {TutorStackParamList} from '../../navigation/navigationTypes';
import {MonitoringRatingCard} from '../../components/MonitoringRatingCard';
import {MedicationSelector} from '../../components/MedicationSelector';
import {useCreatePetMonitoring} from '../../hooks/useCreatePetMonitoring';
import {CreatePetMonitoringRequest} from '../../model/PetMonitoring';

type Props = NativeStackScreenProps<TutorStackParamList,'PetMonitoringCreate'>;

export function PetMonitoringCreateScreen({route,navigation}: Props) {

    const { petId } = route.params;
    const createPetMonitoring = useCreatePetMonitoring();
    const [hydrationLevel,setHydrationLevel] = useState<number | null>(null);
    const [food,setFood] = useState<number | null>(null);
    const [sleepQuality,setSleepQuality] = useState<number | null>(null);
    const [energyLevel,setEnergyLevel] = useState<number | null>(null);
    const [mood,setMood] = useState<number | null>(null);
    const [sociability,setSociability] = useState<number | null>(null);
    const [tookMedication,setTookMedication] = useState<boolean | null>(null);
    const [weight,setWeight] = useState('');
    const [observations,setObservations] = useState('');
    const [error,setError] = useState('');

    function hasAtLeastOneField() {
        return (
            hydrationLevel !== null ||
            food !== null ||
            sleepQuality !== null ||
            energyLevel !== null ||
            mood !== null ||
            sociability !== null ||
            tookMedication !== null ||
            weight.trim().length > 0 ||
            observations.trim().length > 0
        );
    }

    function convertRating(value: number | null) {
        if (value === null) {
            return undefined;
        }
        return `${value}/10`;
    }

    function parseWeight() {
        if (!weight.trim()) {
            return undefined;
        }
        return Number(weight.replace(',', '.'));
    }

    async function handleSubmit() {
        setError('');

        if (!hasAtLeastOneField()) {
            setError('Preencha pelo menos uma informação antes de salvar o monitoramento.',);
            return;
        }

        const parsedWeight = parseWeight();

        if (parsedWeight !== undefined && (Number.isNaN(parsedWeight) || parsedWeight <= 0)) {
            setError('Informe um peso válido.');
            return;
        }

        const data:CreatePetMonitoringRequest ={petId};
        const formattedMood = convertRating(mood);
        const formattedEnergy = convertRating(energyLevel);
        const formattedHydration = convertRating(hydrationLevel);
        const formattedFood = convertRating(food);
        const formattedSleep = convertRating(sleepQuality);
        const formattedSociability = convertRating(sociability);

        if (formattedMood) {
            data.mood = formattedMood;
        }

        if (formattedEnergy) {
            data.energyLevel = formattedEnergy;
        }

        if (formattedHydration) {
            data.hydrationLevel = formattedHydration;
        }

        if (formattedFood) {
            data.food = formattedFood;
        }

        if (formattedSleep) {
            data.sleepQuality = formattedSleep;
        }

        if (formattedSociability) {
            data.sociability = formattedSociability;
        }

        if (tookMedication !== null) {
            data.tookMedication = tookMedication;
        }

        if (parsedWeight !== undefined) {
            data.weight = parsedWeight;
        }

        if (observations.trim().length > 0) {
            data.observations = observations.trim();
        }

        try {
            await createPetMonitoring.mutateAsync(data);
            Alert.alert('Monitoramento salvo!','As informações foram adicionadas à jornada do pet.',[{text: 'OK',onPress: () => navigation.goBack()}]);
        
        } catch (error) {
            const axiosError = error as AxiosError;

            if (
                axiosError.response ?.status === 400
            ) {
                setError('Não foi possível salvar o monitoramento. Revise as informações preenchidas.');
                return;
            }
            setError('Não foi possível salvar o monitoramento agora. Tente novamente.');
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.returnButton} activeOpacity={0.7} onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back" size={24} color="#174F79"/>
                    </TouchableOpacity>

                    <View style={styles.headerText}>
                        <Text style={styles.titulo}>Monitoramento</Text>
                        <Text style={styles.subtitulo}>Registre de forma rápida como seu pet está hoje.</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <Ionicons name="heart-outline" size={23} color="#2877E6"/>
                    </View>

                    <View style={styles.infoConteudo}>
                        <Text style={styles.infoTitulo}>Pequenos registros,grandes cuidados</Text>
                        <Text style={styles.infoText}>Você não precisa preencher tudo. Registre apenas o que conseguiu observar hoje.</Text>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitulo}>Como ele está hoje?</Text>
                        <Text style={styles.sectionSubtitulo}>Escolha uma nota de 0 a 10.</Text>
                    </View>
                </View>

                <View style={styles.cards}>
                    <MonitoringRatingCard
                        title="Hidratação"
                        description="Como está a ingestão de água?"
                        icon="water-outline"
                        value={hydrationLevel}
                        onChange={setHydrationLevel}
                        iconColor="#3186DE"
                        iconBackgroundColor="#E7F3FF"
                    />

                    <MonitoringRatingCard
                        title="Apetite"
                        description="Como foi o apetite hoje?"
                        icon="restaurant-outline"
                        value={food}
                        onChange={setFood}
                        iconColor="#E38A35"
                        iconBackgroundColor="#FFF1E3"
                    />

                    <MonitoringRatingCard
                        title="Qualidade do sono"
                        description="Como foi a qualidade do descanso?"
                        icon="moon-outline"
                        value={sleepQuality}
                        onChange={setSleepQuality}
                        iconColor="#6866D9"
                        iconBackgroundColor="#EEEDFF"
                    />

                    <MonitoringRatingCard
                        title="Nível de energia"
                        description="Quanta disposição ele teve hoje?"
                        icon="flash-outline"
                        value={energyLevel}
                        onChange={setEnergyLevel}
                        iconColor="#E79A2E"
                        iconBackgroundColor="#FFF3DD"
                    />

                    <MonitoringRatingCard
                        title="Humor"
                        description="Como você percebeu o humor dele?"
                        icon="happy-outline"
                        value={mood}
                        onChange={setMood}
                        iconColor="#D9912B"
                        iconBackgroundColor="#FFF2D8"
                    />

                    <MonitoringRatingCard
                        title="Sociabilidade"
                        description="Como ele interagiu com pessoas ou outros pets?"
                        icon="people-outline"
                        value={sociability}
                        onChange={setSociability}
                        iconColor="#3DA68D"
                        iconBackgroundColor="#EAF7F3"
                    />

                    <MedicationSelector value={tookMedication} onChange={setTookMedication}/>

                    <View style={styles.pesoCard}>
                        <View style={styles.pesoHeader}>
                            <View style={styles.pesoIcon}>
                                <Ionicons name="scale-outline" size={22} color="#2877E6"/>
                            </View>

                            <View style={styles.pesoInfo}>
                                <Text style={styles.pesoTitulo}>Peso</Text>
                                <Text style={styles.pesoDescricao}>Opcional — informe apenas se pesou o pet hoje.</Text>
                            </View>
                        </View>

                        <View style={styles.pesoInputContainer}>
                            <TextInput style={styles.pesoInput} value={weight} onChangeText={setWeight} placeholder="Ex.: 7,8" placeholderTextColor="#9AAAB6" keyboardType="decimal-pad" maxLength={7}/>
                            <Text style={styles.pesoUnidade}>kg</Text>
                        </View>
                    </View>

                    <View style={styles.observacoesCard}>
                        <View style={styles.observacoesHeader}>
                            <View style={styles.observacoesIcon}>
                                <Ionicons name="document-text-outline"size={22} color="#2877E6"/>
                            </View>

                            <View style={styles.observacoesInfo}>
                                <Text style={styles.observacoesTitulo}>Observações</Text>
                                <Text style={styles.observacoesDescricao}>Opcional — registre algo importante que tenha percebido.</Text>
                            </View>
                        </View>

                        <View style={styles.observacoesInputContainer}>
                            <TextInput
                                style={styles.observacoesInput}
                                value={observations}
                                onChangeText={setObservations}
                                placeholder="Ex.: Ficou mais quieto que o normal durante a manhã..."
                                placeholderTextColor="#9AAAB6"
                                multiline
                                textAlignVertical="top"
                                maxLength={250}
                            />

                            <Text style={styles.limiteTamanho}>{observations.length}/250</Text>
                        </View>
                    </View>
                </View>

                {error.length > 0 && (
                    <View style={styles.errorCard}>
                        <Ionicons name="alert-circle-outline" size={19} color="#C45656"/>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <TouchableOpacity style={[styles.enviarButton,createPetMonitoring.isPending && styles.enviarButtonDisabled]} activeOpacity={0.85} disabled={createPetMonitoring.isPending} onPress={handleSubmit}>
                    {createPetMonitoring.isPending ? (
                        <ActivityIndicator color="#FFFFFF"/>
                    ) : (
                        <>
                            <Ionicons name="checkmark-circle-outline" size={21} color="#FFFFFF"/>
                            <Text style={styles.enviarText}>Salvar monitoramento</Text>
                        </>
                    )}
                </TouchableOpacity>

                <Text style={styles.footerText}>Basta preencher pelo menos uma informação.</Text>
            </ScrollView>
        
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor:'#F5FAFF',
    },

    container: {
        flex: 1,
    },

    conteudo: {
        paddingHorizontal: 22,
        paddingTop: 22,
        paddingBottom: 40,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 18,
    },

    returnButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
    },

    headerText: {
        flex: 1,
        marginLeft: 13,
    },

    titulo: {
        color: '#174F79',
        fontSize: 29,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 5,
        color: '#70889A',
        fontSize: 13,
    },

    infoCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#EAF4FF',
        marginBottom: 27,
    },

    infoIcon: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#FFFFFF',
    },

    infoConteudo: {
        flex: 1,
        marginLeft: 12,
    },

    infoTitulo: {
        color: '#174F79',
        fontSize: 13,
        fontWeight: '700',
    },

    infoText: {
        marginTop: 4,
        color: '#557792',
        fontSize: 11,
        lineHeight: 16,
    },

    sectionHeader: {
        marginBottom: 13,
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

    cards: {
        gap: 11,
    },

    pesoCard: {
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    pesoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    pesoIcon: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#EAF4FF',
    },

    pesoInfo: {
        flex: 1,
        marginLeft: 11,
    },

    pesoTitulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    pesoDescricao: {
        marginTop: 3,
        color: '#7890A2',
        fontSize: 11,
        lineHeight: 15,
    },

    pesoInputContainer: {
        minHeight: 49,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor:'#F7FAFC',
        borderWidth: 1,
        borderColor: '#DFE9F0',
    },

    pesoInput: {
        flex: 1,
        color: '#315B79',
        fontSize: 14,
        fontWeight: '600',
    },

    pesoUnidade: {
        color: '#7890A2',
        fontSize: 13,
        fontWeight: '600',
    },

    observacoesCard: {
        padding: 16,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    observacoesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    observacoesIcon: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#EAF4FF',
    },

    observacoesInfo: {
        flex: 1,
        marginLeft: 11,
    },

    observacoesTitulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    observacoesDescricao: {
        marginTop: 3,
        color: '#7890A2',
        fontSize: 11,
        lineHeight: 15,
    },

    observacoesInputContainer: {
        marginTop: 15,
        padding: 13,
        borderRadius: 15,
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#DFE9F0',
    },

    observacoesInput: {
        minHeight: 90,
        color: '#315B79',
        fontSize: 13,
        lineHeight: 19,
    },

    limiteTamanho: {
        marginTop: 7,
        color: '#8A9BA8',
        fontSize: 10,
        textAlign: 'right',
    },

    errorCard: {
        flexDirection: 'row',
        alignItems:'flex-start',
        gap: 8,
        marginTop: 15,
        padding: 13,
        borderRadius: 14,
        backgroundColor:'#FFF3F3',
    },

    errorText: {
        flex: 1,
        color: '#B75959',
        fontSize: 12,
        lineHeight: 17,
    },

    enviarButton: {
        minHeight: 60,
        marginTop: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        borderRadius: 35,
        backgroundColor:'#1F6AE1',
    },

    enviarButtonDisabled: {
        opacity: 0.65,
    },

    enviarText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

    footerText: {
        marginTop: 11,
        color: '#889AA7',
        fontSize: 10,
        textAlign: 'center',
    },
  });