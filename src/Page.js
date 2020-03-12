import React from 'react';
import './App.css';
import Block from './Block.js'

class Page extends React.Component{
    state = {
        titre: "Création d'une histoire",
        scenes: [
        ]
    }
    addBlock = () => {
        var scenes = this.state.scenes.slice();
        scenes.push({id: 1, titre: "", text: ""});
        this.setState({scenes: scenes});
    }
    render(){
        return(
        <div className="game">
            <h1>{this.state.titre}</h1>
            <button onClick={this.addBlock}>Ajouter scene</button>
            <button onClick={this.downloadJsonFile}>Fichier Json</button>
            <div className="game-board">
                {this.state.scenes.map((scene) => (
                    <Block />
                ))}
            </div>
        </div>
        )
    }

    downloadJsonFile = () => {
        const element = document.createElement("a");
        var block = [];
        const nbBlocks = this.state.scenes.length;
        for (let j=0; j< nbBlocks; j++) {
            block.push({
                blockID: this.state.scenes[j].id,
                blockName: this.state.scenes[j].titre,
                blockContenu: this.state.scenes[j].texte
            })
            console.log(this.state.scenes[j])
            const nbScenes = this.state.scenes[j].state.scene.scenesSuivantes.length;
            var ListeChoix = [];
            for (let i = 0; i < nbScenes; i++) {
            ListeChoix.push({
                ChoixTexte: this.state.scenes[j].state.scene.scenesSuivantes[i].texte,
                ChoixIdSuivant: this.state.scenes[j].scene.scenesSuivantes[i].idSuivant
            });

            }
            block["ListeChoix"] = ListeChoix;
        }
        
        const file = new Blob([JSON.stringify(block, '\t', 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        //element.download = "myFile.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
}


export default Page;
