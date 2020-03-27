import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Logon(){
    const [id,setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions',{id});
            localStorage.setItem('ongId', id);//Salvar no navegador o id da ong para ser exibido durante toda a aplicação
            localStorage.setItem('ongName', response.data.name);//Salvar no navegador o nome da ong
            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">{/*Tudo que estiver no mesmo painel que a parte de login*/}
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                    placeholder="Sua ID"
                    //value={id}
                    onChage={e =>setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">{/* Linkar as rotas da aplicação */}
                        <FiLogIn size={16} color="#E02041"/>{/*Recebido como componente*/}
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}