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
        }
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
}

export default Jeu;