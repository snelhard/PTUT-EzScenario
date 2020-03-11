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
        }
    }
    setTitre = (event) => {
        const value = event.currentTarget.value;
        this.setState({titre : value});
        console.log(value);
    }
    handleSubmitChoix = (event) => {
		event.preventDefault();

    }

    render(){
        return(
            <div className="block">
                <h2>Id block: {this.state.scene.id}</h2>
                <div className="blockTitle">
                    <label>Titre du block</label> <input onChange={this.setTitre} />
                    <label>Contenu du block</label> <textarea rows="3"></textarea>
                </div>
                <div>
                    <h2>Liste des choix</h2>
                       <div>
                            {this.state.scene.scenesSuivantes.map((choixScene) => (
                                <ChoixScene parentCallback ={this.recuperationDataChoixScene} details={choixScene} key={choixScene.idSuivant}/>
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
        const index = scenesSuivantes.findIndex(function(sceneSuivantes){
            return choixSceneData.id === scenesSuivantes.id
        })
        this.setState(prevState => {
            let scene = {...prevState.scene};;
            const sceneSuivante = scenesSuivantes[index]
            console.log(index)
            // scene.scenesSuivantes.splice(sceneSuivante,sceneSuivante+1,{id :sceneSuivante,texte : choixSceneData.texte, idSuivant: choixSceneData.idSuivant});
            scene.scenesSuivantes.splice(index, 1, {id :sceneSuivante,texte : choixSceneData.texte, idSuivant: choixSceneData.idSuivant})
            // scene.scenesSuivantes.push({id :sceneSuivante,texte : choixSceneData.texte, idSuivant: choixSceneData.idSuivant})
            return {scene};
          })
    }
    ajouterChoix(){
        this.setState(prevState => {
            let scene = { ...prevState.scene };;  // creating copy of state variable jasper
            const id = Math.random();
            scene.scenesSuivantes.push({id :this.IdChoixScene ,texte: "", idSuivant: id});                     // update the name property, assign a new value                 
            this.IdChoixScene+=1;
            return { scene };                                 // return new object jasper object
          })
          //console.log(this.state)
    }
}


export default Block;
