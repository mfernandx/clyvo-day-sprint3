import React, {useState} from 'react';
import {ActivityIndicator,Alert,KeyboardAvoidingView,Platform,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {TutorStackParamList} from '../../navigation/navigationTypes';
import {CareEventTypeSelector} from '../../components/CareEventTypeSelector';
import {useCreateCareEvent} from '../../hooks/useCreateCareEvent';
import {CreateCareEventRequest} from '../../model/CareEvent';

type Props = NativeStackScreenProps<TutorStackParamList,'CareEventCreate'>;

export function CareEventCreateScreen({route,navigation,}: Props) {

    const { petId } = route.params;
    const createCareEvent = useCreateCareEvent();
    const [typeEvent,setTypeEvent] = useState('');
    const [description,setDescription] = useState('');
    const [eventDate,setEventDate] = useState('');
    const [observations,setObservations] = useState('');
    const [error,setError] = useState('');

    function formatDateInput(value: string,) {

        const numbers = value.replace(/\D/g,'');

        if (numbers.length <= 2) {
            return numbers;
        }

        if (numbers.length <= 4) {
            return `${numbers.slice(0,2)}/${numbers.slice(2)}`;
        }

        return `${numbers.slice(0,2)}/${numbers.slice(2,4)}/${numbers.slice(4,8)}`;
    }

    function convertDateToApi(value: string) {
        const [day,month,year] = value.split('/');
        return `${year}-${month}-${day}`;
    }

    function isValidDate(value: string) {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;

        if (!regex.test(value)) {
            return false;
        }

        const [day,month,year] = value.split('/').map(Number);

        const date = new Date(year,month - 1,day);

        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    }

    async function handleSubmit() {
        setError('');

        if (!typeEvent) {
            setError('Selecione o tipo de cuidado.',);
            return;
        }

        if (!description.trim()) {
            setError('Informe uma descrição para o cuidado.');
            return;
        }

        if (!isValidDate(eventDate)) {
            setError('Informe uma data válida no formato DD/MM/AAAA.');
            return;
        }

        const data: CreateCareEventRequest =
        {
            petId,
            typeEvent,
            description:description.trim(),
            eventDate:convertDateToApi(eventDate,),
        };

        if (observations.trim().length > 0) {
            data.observations = observations.trim();
        }

        try {
            await createCareEvent.mutateAsync(data);
            Alert.alert('Evento agendado!','O evento foi adicionado à sua agenda.',[{text: 'OK', onPress: () => navigation.goBack()}]);
        
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response ?.status === 400) {
                setError('Não foi possível registrar o cuidado. Revise as informações.');
                return;
            }

            setError('Não foi possível registrar o cuidado agora. Tente novamente.');
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
                            <Text style={styles.titulo}>Registrar evento</Text>
                            <Text style={styles.subtitulo}>Organize os próximos eventos de cuidado.</Text>
                        </View>
                    </View>

                    <View style={styles.badgeCard}>
                        <View style={styles.badgeIcon}>
                            <Ionicons name="calendar-outline" size={23} color="#2877E6"/>
                        </View>

                        <View style={styles.badgeConteudo}>
                            <Text style={styles.badgeTitulo}>Cuidar também é planejar</Text>
                            <Text style={styles.badgeText}>Registre vacinas, consultas, exames e mais.</Text>
                        </View>
                    </View>

                    <CareEventTypeSelector value={typeEvent} onChange={setTypeEvent}/>

                    <View style={styles.eventoInfoCard}>
                        <View style={styles.eventoInfoHeader}>
                            <View style={styles.eventoInfoIcon}>
                                <Ionicons name="create-outline" size={22} color="#2877E6" />
                            </View>

                            <View style={styles.eventoInfo}>
                                <Text style={styles.eventoInfoTitulo}>Descrição</Text>
                                <Text style={styles.eventoDescricao}>Dê um nome para este evento.</Text>
                            </View>
                        </View>

                        <View style={styles.eventoInfoInputContainer}>
                            <TextInput style={styles.eventoInfoInput} value={description} onChangeText={setDescription} placeholder="Ex.: Vacina B12" placeholderTextColor="#9AAAB6" maxLength={100} />
                        </View>
                    </View>

                    <View style={styles.eventoInfoCard}>
                        <View style={styles.eventoInfoHeader}>
                            <View style={styles.eventoInfoIcon}>
                                <Ionicons name="calendar-outline" size={22} color="#2877E6" />
                            </View>

                            <View style={styles.eventoInfo}>
                                <Text style={styles.eventoInfoTitulo}>Data</Text>
                                <Text style={styles.eventoDescricao}>Para quando este evento está agendado?</Text>
                            </View>
                        </View>

                        <View style={styles.eventoInfoInputContainer}>
                            <TextInput style={styles.eventoInfoInput} value={eventDate} onChangeText={(value) => setEventDate(formatDateInput(value))} placeholder="DD/MM/AAAA" placeholderTextColor="#9AAAB6" keyboardType="number-pad" maxLength={10} />
                        </View>
                    </View>
                    

                    <View style={styles.eventoInfoCard}>
                        <View style={styles.eventoInfoHeader}>
                            <View style={styles.eventoInfoIcon}>
                                <Ionicons name="document-text-outline" size={22} color="#2877E6" />
                            </View>

                            <View style={styles.eventoInfo}>
                                <Text style={styles.eventoInfoTitulo}>Observações</Text>
                                <Text style={styles.eventoDescricao}>Opcional — acrescente alguma informação importante.</Text>
                            </View>
                        </View>

                        <View style={styles.observacoesInputContainer}>
                            <TextInput
                                style={styles.observacoesInput}
                                value={observations}
                                onChangeText={setObservations}
                                placeholder="Ex.: Levar a carteirinha de vacinação..."
                                placeholderTextColor="#9AAAB6"
                                multiline
                                textAlignVertical="top"
                                maxLength={250}
                            />

                            <Text style={styles.limiteTamanho}>{observations.length}/250</Text>
                        </View>
                    </View>

                    {error.length > 0 && (
                        <View style={styles.errorCard}>
                            <Ionicons name="alert-circle-outline" size={19} color="#C45656"/>

                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <TouchableOpacity style={[styles.enviarButton, createCareEvent.isPending && styles.enviarButtonDisabled]} activeOpacity={0.85} disabled={createCareEvent.isPending} onPress={handleSubmit}>
                        {createCareEvent.isPending ? (
                            <ActivityIndicator color="#FFFFFF"/>
                        ) : (
                            <>
                                <Ionicons name="calendar-outline" size={20} color="#FFFFFF"/>
                                <Text style={styles.enviarText}>Agendar evento</Text>
                            </>
                        )}
                    </TouchableOpacity>

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
        marginBottom: 18,
        flexDirection: 'row',
        alignItems: 'flex-start',
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

    badgeCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#EAF4FF',
        marginBottom: 27,
    },

    badgeIcon: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#FFFFFF',
    },

    badgeConteudo: {
        flex: 1,
        marginLeft: 12,
    },

    badgeTitulo: {
        color: '#174F79',
        fontSize: 13,
        fontWeight: '700',
        marginTop: 5
    },

    badgeText: {
        marginTop: 4,
        color: '#557792',
        fontSize: 11,
        lineHeight: 16,
    },

    eventoInfoCard: {
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
        marginTop: 25
    },

    eventoInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    eventoInfoIcon: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#EAF4FF',
    },

    eventoInfo: {
        flex: 1,
        marginLeft: 11,
    },

    eventoInfoTitulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    eventoDescricao: {
        marginTop: 3,
        color: '#7890A2',
        fontSize: 11,
        lineHeight: 15,
    },

    eventoInfoInputContainer: {
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

    eventoInfoInput: {
        flex: 1,
        color: '#315B79',
        fontSize: 14,
        
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
        marginTop: 18,
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
        minHeight: 57,
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
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
});