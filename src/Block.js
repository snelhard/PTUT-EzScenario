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
            ]
        },
        IdChoixScene: 1,
    }
    setTitre = (event) => {
        const value = event.currentTarget.value;
        this.setState((prevState) => {
            let scene = {...prevState.scene};;
            scene.titre = value;
            return {scene};
        })
    }
    setTexte = (event) => {
        const value = event.currentTarget.value;
        this.setState((prevState) => {
            let scene = {...prevState.scene};;
            scene.texte = value;
            return {scene};
        })
    }
    handleSubmitChoix = (event) => {
		event.preventDefault();

    }
    render(){
        return(
            <div className="block">
                <h2>Id block: {this.state.scene.id}</h2>
                <div className="blockTitle">
                    <label>Titre du block</label> <input onChange={this.setTitre} value={this.state.scene.titre}/>
                    <label>Contenu du block</label> <textarea rows="3" onChange={this.setTexte}>{this.state.scene.texte}</textarea>
                </div>
                <div>
                    <h2>Liste des choix</h2>
                       <div>
                            {this.state.scene.scenesSuivantes.map((choixScene) => (
                                <ChoixScene parentCallback ={this.recuperationDataChoixScene} details={choixScene} key={this.state.scene.scenesSuivantes.id}/>
                            ))}
                        </div>
                    <button onClick={() => this.ajouterChoix()}>Ajouter un choix</button>
                </div>
            </div>
        )
    }
    recuperationDataChoixScene= (choixSceneData) => {
        const scenesSuivantes = this.state.scene.scenesSuivantes.slice()
        //console.log(choixSceneData.texte)
        const index = scenesSuivantes.findIndex(function(sceneSuivante){
            return choixSceneData.id === sceneSuivante.id
        })
        console.log(this.state.scene.scenesSuivantes[index+1]);
        this.setState(prevState => {
            let scene = {...prevState.scene};;
            // const sceneSuivante = scenesSuivantes[index]
            console.log("index :"+ index)
            // scene.scenesSuivantes.splice(sceneSuivante,sceneSuivante+1,{id :sceneSuivante,texte : choixSceneData.texte, idSuivant: choixSceneData.idSuivant});
            scene.scenesSuivantes.splice(index, 1, {id :choixSceneData.id, texte : choixSceneData.texte, idSuivant: choixSceneData.idSuivant})
            // this.state.IdChoixScene += 1;
            // scene.scenesSuivantes.push({id :sceneSuivante,texte : choixSceneData.texte, idSuivant: choixSceneData.idSuivant})
            return {scene};
          })
    }
    ajouterChoix(){
        this.setState(prevState => {
            let scene = { ...prevState.scene };;    // creating copy of state variable jasper
            scene.scenesSuivantes.push({id :this.state.IdChoixScene ,texte: "", idSuivant: null});    // update the name property, assign a new value                 
            this.state.IdChoixScene += 1;
            return { scene };   // return new object jasper object
          })
          //console.log(this.state)
    }
}


export default Block;
