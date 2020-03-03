import React from 'react';
import './App.css';

class Block extends React.Component{
render(){
    return(
        <div>
            <div>
                <label>Titre du block</label> <textarea></textarea>
                <label>Contenu du block</label> <textarea></textarea>
            </div>
            <div>
                <p>Numéro du block : 1</p>
                <p>Numéro du block suivant: 2</p>
            </div>
            <div>
                <button>Valider</button> <button>Ajouter une action(création d'un new block)</button>
            </div>
        </div>
    )
}
}


export default Block;
