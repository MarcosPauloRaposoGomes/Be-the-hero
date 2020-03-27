import React from 'react';
import ReactDOM from 'react-dom';//Esta importando a integração do react com o navegador, a dom é a arvore de elementos

import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


