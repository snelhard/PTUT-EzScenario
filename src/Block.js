import React from 'react';
import './App.css';

class Block extends React.Component{
    state = {
        titre: "",
    }
    setTitre = (event) => {
        // console.log(event.currentTarget.value);
        // const value = event.currentTarget.value;
        // this.setState({titre : value});
        // alert(value);
        console.log("test");
    }
    render(){
        return(
            <div>
                <div>
                    <label>Titre du block</label> <input onChange={this.setTitre} value={this.state.titre}/>
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
