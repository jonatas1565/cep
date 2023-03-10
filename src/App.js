import { useState } from 'react';
import { FiSearch} from 'react-icons/fi';
import './style.css'

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({})

  async function handleSearch(){

if(input == ''){
  alert("preencha Com Algum CEP!")
  return;
}
try{
  const response = await api.get(`${input}/json`);
  setCep(response.data);
  setInput("")
}catch{
alert("Erro ao buscar seu cep");
setInput("");
}
  }



  return (
    <div className="container">
      <h1 className="title"> Buscador de CEP </h1>

      <div className="container-input">
        <input type="text"
         placeholder="Digite seu CEP..."
         value={input}
         onChange={(e) => setInput(e.target.value)}>
          
         </input>

        <button className="buttonSearch" onClick={handleSearch}> 
        <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

{/* verificar se tem algo digitado */}
      {Object.keys(cep).length > 0 &&(

    <main className='main'>
      <h2> Cep: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>complemento: {cep.complemento}</span>
      <span>{cep.bairro} </span>
      <span>{cep.localidade} - {cep.uf} </span>


    </main>
    )};

    </div>
  );
}

export default App;
