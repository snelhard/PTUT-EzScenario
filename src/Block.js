import React from 'react';
import './App.css';
import ChoixScene from './ChoixScene.js'

class Block extends React.Component{
    state = { //scene
        scene:
        {
            id: 1,
            titre: "",
            texte: "",
            scenesSuivantes: [
                {texte: "", id: 2},
                {texte: "", id: 3}
            ]
        }
    }
    setTitre = (event) => {
        const value = event.currentTarget.value;
        this.setState({titre : value});
    }
    handleSubmitChoix = (event) => {
		event.preventDefault();

    }

    render(){
        return(
            <div className="block">
                <h2>Id block: {this.state.scene.id}</h2>
                <div className="blockTitle">
                    <label>Titre du block</label> <input onChange={this.setTitre} value={this.state.titre}/>
                    <label>Contenu du block</label> <textarea rows="3"></textarea>
                </div>
                <div>
                    <h2>Liste des choix</h2>
                       <div>
                            {this.state.scene.scenesSuivantes.map((choixScene) => (
                                <ChoixScene details={choixScene} key={choixScene.id}/>
                            ))}
                        </div>
                    <button onClick={() => this.ajouterChoix()}>Ajouter un choix</button>
                </div>
            </div>
        )
    }
    ajouterChoix(){
        this.setState(prevState => {
            let scene = { ...prevState.scene };;  // creating copy of state variable jasper
            const id = Math.random();
            scene.scenesSuivantes.push({texte: "", id: id});                     // update the name property, assign a new value                 
            return { scene };                                 // return new object jasper object
          })
    }
}


export default Block;
