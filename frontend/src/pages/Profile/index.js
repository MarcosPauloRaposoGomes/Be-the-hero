import React,{useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import { FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');//buscando o nome da ong no storage do navegador
    const history = useHistory();
    useEffect(()=>{
        api.get('profile',{
        headers: {
            Authorization: ongId,
        }
        }).then(response=>{
            setIncidents(response.data);
        })//pegar os dados da resposta
    }, [ongId]);//Disparar uma função em determinado momento, primeiro parametro qual função, segundo quando. [ongId] serve pra atualizar os dados acima caso ele mude

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });

        setIncidents(incidents.filter(incident=>incident.id!== id));//Faz com que o caso recem deletado suma da tela em tempo real
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){//Fazer o logout da ong na aplicação
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vida,{ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>{/*O primeiro elemento dentro de uma interação precisa receber o método key para ajuda o react a localizar ele na ordem  */}
                        <strong>CASO:</strong>
                            <p>{incident.title}</p>
                
                        <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p>
                
                        <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>{/*Ferramenta do react para conversão de datas e valores, o primeiro parametro é a linguagem, o segundo é que tipo que no nosso caso foi moeda e o terceiro parametro foi o formato de real */}
            
                        <button onClick={()=> handleDeleteIncident(incident.id)} type="button">{/*Se eu colocar sem a arrow function ele deletaria todos os casos só de exibir o componente já que ele chamar o retorno da função */}
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))} {/*Vai percorrer cada um dos incidentes e vai me retorar um jsx */}
            </ul>
        </div>
    );
}