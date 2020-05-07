import React from 'react';
import './App.css';
import Scene from './Scene';

class Jeu extends React.Component{
    state = {
        scenes: [
            {
                "blockID": 1,
                "blockName": "Le début des vacances",
                "blockContenu": "C'est le début des vacances, ou voulez-vous aller ?",
                "ListeChoix" : [
                    {
                        "id": 1,
                        "ChoixTexte": "A la plage !",
                        "ChoixIdSuivant": 2
                    },
                    {
                        "id": 2,
                        "ChoixTexte": "Je reste chez moi à cause du coronavirus :(",
                        "ChoixIdSuivant": 3
                    }
                ]
            },
            {
                "blockID": 2,
                "blockName": "La plage",
                "blockContenu": "Vous êtes à la plage, mais il y a le coronavirus sur la plage. Cruel manque de chance ...",
                "ListeChoix" : [
                ]
            },
            {
                "blockID": 3,
                "blockName": "A la maison",
                "blockContenu": "Vous êtes resté chez vous. Vous n'attraperez pas le coronavirus.",
                "ListeChoix" : [
                ]
            },
        ],
        currentScene: {
        },
        Chemin : []
        
    }

    constructor(props){
        super(props);
        this.state.currentScene = this.state.scenes[0];
    }

    render() {
        return (
            <div className="JeuContainer">
                <h1>~ Survivre au coronavirus ~</h1>
                <Scene renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/>
                <button onClick={() => this.ajouterSauvegarde()}>Sauvegarde json</button>
            </div>
        )
    }

    changerScene = (idScene) => {
        console.log("changement de scene vers :" + idScene);

        let scenes = this.state.scenes.slice();
        const index = scenes.findIndex(function(scene){
            return scene.blockID === idScene
        })
        const sceneSuivante = this.state.scenes[index];
        this.setState({currentScene: sceneSuivante});
    }

    ajouterSauvegarde = () => {
        this.state.Chemin.push(this.state.currentScene.blockID);
        //console.log(this.state.Chemin)
        const element = document.createElement("a");
        var block = {};
        var listeBlockPassés = []
        
        for (let i = 0; i < this.state.Chemin.length; i++) {
            listeBlockPassés.push({
                blockID: this.state.Chemin[i]
            })
        }
        block["PointsDePassage"] = listeBlockPassés
        const file = new Blob([JSON.stringify(block, '\t', 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        console.log(element);
    }

}
export default Jeu;