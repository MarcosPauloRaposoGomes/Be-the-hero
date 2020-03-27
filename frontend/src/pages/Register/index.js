import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [name, setName]= useState('');/*Importar o input do usuário pra função que vai ser conectada com o back-end*/
    const [email, setEmail]= useState('');
    const [whatsapp, setWhatsapp]= useState('');
    const [city, setCity]= useState('');
    const [uf, setUf]= useState('');

    const history = useHistory();//history serve para fazermos a navegação através de uma função js quando a gente não pode colocar o link do react-router-dom no html, e o useHistory serve para fazer o usuário voltar para alguma página

    async function handleRegister(e){/*Função responsável pelo cadastro do usuário*/
        e.preventDefault();/*Faz com que a página não seja recarregada quando o usuário enviar o formulário*/

        const data = {//Objeto javascript que vai ser enviado para a api
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try {

            const response = await api.post('ongs', data)//Armazenar a resposta e enviar pro usuário que o cadastro foi feito com sucesso
        
            alert(`Seu ID de acesso: ${response.data.id}`)//${} é pra chamar uma variável dentro do texto, e não são aspas são acrases e só da pra chamar variáveis dentro de texto com elas
            
            history.push('/');//Faz o usuário voltar para a página inicial 
            } catch(err){
                alert('Erro no cadastro, tente novamente.');
            }
        }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">{/* Linkar as rotas da aplicação */}
                        <FiArrowLeft size={16} color="#E02041"/>{/*Recebido como componente*/}
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit = {handleRegister}>
                    <input 
                        placeholder="Nome da Ong"
                        value={name}//Variável do estado
                        onChange={e => setName(e.target.value)}//A cada mudança eu vou pegar o evento e armazenar na variável
                        />
                    <input type="email" 
                        placeholder="E-mail"
                        value={email}//Variável do estado
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input 
                    placeholder="Whatsapp"
                    value={whatsapp}//Variável do estado
                    onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}//Variável do estado
                            onChange={e => setCity(e.target.value)}
                            />
                        <input 
                        placeholder="UF" style={{width: 80}}
                        value={uf}//Variável do estado
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}