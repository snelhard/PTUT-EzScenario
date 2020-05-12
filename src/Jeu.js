import React from 'react';
import './App.css';
import Scene from './Scene';

class Jeu extends React.Component{
    state = {
        file : {"id":"demo@0.1.0","nodes":{"1":{"id":1,"data":{"titre":"zatzet","texte":"zef zef ze f","choix1":"zef zef ","choix2":"ze fzef zef "},"inputs":{"input":{"connections":[]}},"outputs":{"choice1":{"connections":[{"node":2,"input":"input","data":{}}]},"choice2":{"connections":[{"node":3,"input":"input","data":{}}]}},"position":[-428.6968700385575,-243.53694148332954],"name":"Scene"},"2":{"id":2,"data":{"titre":"sdfsdf","texte":"sdfsdf","choix1":"sdfsdf","choix2":"sdfsdf"},"inputs":{"input":{"connections":[{"node":1,"output":"choice1","data":{}}]}},"outputs":{"choice1":{"connections":[]},"choice2":{"connections":[]}},"position":[58.628600589702884,-331.7957303243366],"name":"Scene"},"3":{"id":3,"data":{"titre":"sdfsdfzgzegzgtrfhjgfjhj","texte":"sdffgjfgjfj","choix1":"sdfsdfjfgjgfj","choix2":"gjghjghjghkghkghk"},"inputs":{"input":{"connections":[{"node":1,"output":"choice2","data":{}}]}},"outputs":{"choice1":{"connections":[]},"choice2":{"connections":[]}},"position":[55.008593123516135,85.45035722386028],"name":"Scene"}}},
        currentScene: {
        }
    }
    
    constructor(props){
        super(props);
        this.state.currentScene = this.state.file.nodes[1];
        console.log(this.state.currentScene)
        this.sceneConatainer = React.createRef();
    }

    componentDidMount(){
        // update();
    }
    
    render() {
        return (
            <div className="JeuContainer">
            <h1>~ {this.state.currentScene.data.titre} ~</h1>
            <Scene details={this.state.currentScene}/>

            {/* { this.mountScene } */}

            <div ref={this.sceneConatainer} />

            <Scene renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/>

            {/* <button onClick={ this.mountScene }>TEST</button> */}
            </div>
            )
        }

        mountScene() {
            switch (this.state.currentScene.name) {
                case 'Scene':
                    this.sceneConatainer = <Scene renvoiIdSuivant={this.changerScene(5)} details={this.state.currentScene} />;
                // case 'Intrigue':
                //     return <Intrigue details={this.state.currentScene} />;
                // case 'Start':
                //     return <Start details={this.state.currentScene} />;
                // case 'Fin':
                //     return <Fin details={this.state.currentScene} />;
                // default:
                //     console.log("gérer fail");
                //     return null;
            }
            // return <Scene details={this.state.currentScene} />;
        }
        
        changerScene = (idScene) => {
            idScene = 5;
            console.log("changement de scene vers :" + idScene);
        
        //     let scenes = this.state.scenes.slice();
        //     const index = scenes.findIndex(function(scene){
        //         return scene.blockID === idScene
        //     })
        //     const sceneSuivante = this.state.scenes[index];
        //     this.setState({currentScene: sceneSuivante});
        }
    }

    
    export default Jeu;