import React from 'react';
import './App.css';
import ChoixScene from './ChoixScene.js'

class Block extends React.Component{
    IdChoixScene = 1; //variable des id des choix.
    state = { //scene
        scene:
        {
            id: 1,
            titre: "",
            texte: "",
            scenesSuivantes: [
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
                                <ChoixScene parentCallback ={this.recuperationDataChoixScene} details={choixScene} key={choixScene.id}/>
                            ))}
                        </div>
                    <button onClick={() => this.ajouterChoix()}>Ajouter un choix</button>
                </div>
            </div>
        )
    }
    recuperationDataChoixScene= (choixSceneData) => {
        const scenesSuivantes = this.state.scene.scenesSuivantes.slice()
        const index = scenesSuivantes.findIndex(function(sceneSuivantes){
            return choixSceneData.id === scenesSuivantes.id
        })
        this.setState(prevState => {
            let scene = {...prevState.scene};;
            const sceneSuivante = scenesSuivantes[index]
            scene.scenesSuivantes.splice(sceneSuivante,1);
            scene.scenesSuivantes.push({id :sceneSuivante.id,texte : choixSceneData.texte, idSuivant: choixSceneData.idSuivant})
            console.log(scene)
            return {scene};
          })
    }
    ajouterChoix(){
        this.setState(prevState => {
            let scene = { ...prevState.scene };;  // creating copy of state variable jasper
            const id = Math.random();
            scene.scenesSuivantes.push({id :this.IdChoixScene ,texte: "", idSuivant: id});                     // update the name property, assign a new value                 
            this.IdChoixScene+=1;
            console.log(scene)
            return { scene };                                 // return new object jasper object
          })
    }
}


export default Block;
