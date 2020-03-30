import React, {useState,useEffect} from 'react';//Carregar uma informação toda vez que um componente é exibido em tela
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';//não preciso passar o @2x pois o próprio react escolhe qual é a melhor resolução pra minha tela
import styles from './styles';
import api from '../../services/api';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] =useState(0);
    const [page, setPage] = useState(1);//Não tem como iniciar na página 0, então inicia na 1
    const [loading, setLoading] = useState(false);//Carregar uma página por vez

    const navigation = useNavigation();//Como se fosse o useHistory

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});//O segundo paramentro recebe todas as informações que a gente quer enviar pra pagina que estamos navegando
    }

    async function loadIncidents(){
        if(loading){//Limitar a uma requisição de loading da página por vez
            return;
        }

        if(total > 0 && incidents.legth == total){//Se o total de registros no banco de dados for maior que zero quer dizer que ele já carregou a primeira página e o número de incidents presentes na minha lista for igual ao total, não vamos mandar outra requisição
            return;
        }

        setLoading(true);

        const response = await api.get('incidents',{
        params: { page }//Para sabermos que página da aplicação estamos
        });
        setIncidents([...incidents, ...response.data]);//ao inves de substituir o dados , vamos soma-los igual o view infinito do instagram, ... significa todos os valores dentro de incidents, estamos anexando dois vetores dentro de um vetor
        setTotal(response.headers['x-total-count']);//Contar o número total de casos
        setPage(page + 1);//pular pra próxima pagina
        setLoading(false);//final da requisição

    }

    useEffect(()=> {
        loadIncidents();
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total}</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}//Precisa receber um valor único pra cada elemento de vetor
                showsVerticalScrollIndicator={false}//Para de exibir a barra de scroll
                onEndReached={loadIncidents}//Vai disparar a função de carregar mais casos quando o usuário chegar no final da lista
                onEndReachedThreshold={0.2}//Quando por cento do final da lista o usuário precisa estar para carregar novos itens
                data={incidents}
                renderItem={({item: incident})=> (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{
                        Intl.NumberFormat('pt-BR',
                        {style: 'currency',
                         currency: 'BRL'
                         }).format(incident.value)}
                         </Text>

                        <TouchableOpacity style={styles.detailsButton}
                         onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={17} color="E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}