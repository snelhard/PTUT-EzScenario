import React from 'react';
import './App.css';
import ChoixScene from './ChoixScene.js'
import jsonfile from 'jsonfile';

class Block extends React.Component{
    state = { //scene
        scene:
        {
            id: 1,
            titre:"",
            texte: "",
            scenesSuivantes: [
            ]
        },
        IdChoixScene: 1,
        fichierJson:"",
        contenuJson:"",
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
            <div className="block" id="divBlockGlobal">
                <form onSubmit={this.handleSubmitBlock}>
                    <h2>Block</h2>
                    <div className="blockTitle" id="divTitle">
                        <label id="titre">Titre du block</label> <input onChange={this.setTitre} />
                        <label id="contenu">Contenu du block</label> <textarea rows="3" onChange={this.setContenu}></textarea>
                    </div>
                    <div>
                        <h2>Liste des choix</h2>
                        <div>
                                {this.state.scene.scenesSuivantes.map((choixScene) => (
                                    <ChoixScene parentCallback ={this.recuperationDataChoixScene} details={choixScene} key={choixScene.id}/>
                                ))}
                            </div>
                        <button onClick={() => this.ajouterChoix()}>Ajouter un choix</button>
                        <button onClick={() => this.downloadJsonFile()}>Créer le fichier json</button>
                    </div>
                    <button>Valider</button>
                </form>
            </div>
        )
    }
    handleSubmitBlock=(event)=> {
        event.preventDefault();
        // Définie le contenu qui va être dans le fichier JSON
        this.state.contenuJson += '{ blockID: '+this.state.scene.id+', blockName: '+this.state.scene.titre+', blockContenu: '+this.state.scene.texte+' ';
        const nbScenes = this.state.scene.scenesSuivantes;
        for (let i=0; i<nbScenes.length; i++) {
            this.state.contenuJson += '{ ChoixTexte: '+this.state.scene.scenesSuivantes[i].texte+', ChoixIdSuivant: '+this.state.scene.scenesSuivantes[i].idSuivant + ' }' ;
        }
        this.state.contenuJson += "}"
        this.state.contenuJson.replace("/","")
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
    downloadJsonFile = () => {
        const element = document.createElement("a");
        // Définie le contenu qui va être dans le fichier JSON
        var debug = '{ blockID: '+this.state.scene.id+', blockName: '+this.state.scene.titre+', blockContenu: '+this.state.scene.texte+' ';
        const nbScenes = this.state.scene.scenesSuivantes;
        for (let i=0; i<nbScenes.length; i++) {
            debug += '{ ChoixTexte: '+this.state.scene.scenesSuivantes[i].texte+', ChoixIdSuivant: '+this.state.scene.scenesSuivantes[i].idSuivant + ' }' ;
        }
        debug += "}"
        debug.replace("/","")
        console.log(debug)
        
        //debug = JSON.stringify(debug)
        // crée le fichier json avec le contenu
        const file = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
    
        element.href = URL.createObjectURL(file);
        element.download = "myFile.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }

}


export default Block;
