import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>{/*Vai garantir que apenas uma rota seja acessada por vez */}
                <Route path="/" exact component={Logon}/>{/*O path serve para passar o caminho da rota e o component é o que vai aparecer quando o caminho for chamado, o exact sempre deve usado na primeira rota  */}
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    )
}