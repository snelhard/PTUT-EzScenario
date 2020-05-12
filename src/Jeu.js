import React from 'react';
import './App.css';
import Scene from './Scene';
import Intrigue from './Intrigue';
import Fin from './Fin';
class Jeu extends React.Component{
    state = {
        file :{"id":"demo@0.1.0","nodes":{"1":{"id":1,"data":{"titre":"Le stage"},"inputs":{},"outputs":{"out":{"connections":[{"node":4,"input":"input","data":{}}]}},"position":[-834.8697764997484,-61.820241203077174],"name":"Start"},"4":{"id":4,"data":{"titre":"La recherche d'un stage","texte":"Vous etes à la recherche d'un stage en informatique deux choix se propose à vous","choix1":"Aller au forum des stages","choix2":"Chercher tout seul de son coté"},"inputs":{"input":{"connections":[{"node":1,"output":"out","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":6,"input":"input","data":{}}]},"choice2":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[-551.7590537665678,-142.63223279618322],"name":"Scene"},"6":{"id":6,"data":{"titre":"L'entretient avec airbus","texte":"Vous etes à present face au pdg d'airbus il vous pose la question","enigme":"Etes vous bon en informatique ?","reponse":"Oui"},"inputs":{"input":{"connections":[{"node":4,"output":"choice1","data":{}}]}},"outputs":{"goodChoice":{"connections":[{"node":9,"input":"input","data":{}}]},"badChoice":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[-150.84159414159095,-413.54898277580577],"name":"Intrigue"},"8":{"id":8,"data":{"titre":"Vous avez trop attendu ","texte":"Vous n'avez donc pas trouvé de stage et donc pas obtenu cette LPDQL :'("},"inputs":{"input":{"connections":[{"node":13,"output":"choice1","data":{}}]}},"outputs":{},"position":[963.6110143844978,-221.61041883878556],"name":"Fin"},"9":{"id":9,"data":{"titre":"Sélection airbus","texte":"Vous avez de la chance vous avez été choisit pour rejoindre airbus que faites vous?","choix1":"Vous acceptez ","choix2":"Vous refusez "},"inputs":{"input":{"connections":[{"node":6,"output":"goodChoice","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":10,"input":"input","data":{}}]},"choice2":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[213.37238856279745,-490.43048867357],"name":"Scene"},"10":{"id":10,"data":{"titre":"Airbus","texte":"Bravo vous avez un stage chez airbus vous avez donc gagné votre LPDQL :D"},"inputs":{"input":{"connections":[{"node":9,"output":"choice1","data":{}}]}},"outputs":{},"position":[534.9882460905155,-500.84318559325914],"name":"Fin"},"13":{"id":13,"data":{"titre":"Les mails","texte":"Vous voila seul face à la recherche de stage que faites vous ? ","choix1":"J'attends","choix2":"J'envoie plein de mails"},"inputs":{"input":{"connections":[{"node":4,"output":"choice2","data":{}},{"node":6,"output":"badChoice","data":{}},{"node":9,"output":"choice2","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":8,"input":"input","data":{}}]},"choice2":{"connections":[{"node":14,"input":"input","data":{}}]}},"position":[563.2214628699821,-125.60430027193604],"name":"Scene"},"14":{"id":14,"data":{"titre":"perseverance","texte":"Bravo grace a votre courage vous avez un stage"},"inputs":{"input":{"connections":[{"node":13,"output":"choice2","data":{}}]}},"outputs":{},"position":[945.7749120041622,-22.262938136832247],"name":"Fin"}}},
        currentScene: {
        },
        firstScene :{
        }
    }
    
    constructor(props){
        super(props);
        
        this.state.currentScene = this.state.file.nodes[1];
        this.state.firstScene = this.state.currentScene
        this.state.currentScene = this.state.file.nodes[this.state.firstScene.outputs.out.connections[0].node];
        console.log(this.state.firstScene);
        console.log(this.state.firstScene.outputs.out.connections[0].node)
        // this.sceneConatainer = React.createRef();
    }

    componentDidMount(){
        // update();
    }
    
    render() {
        let Current;
        if(this.state.currentScene.name==="Scene"){
            Current  = <Scene renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> 
        }
        if(this.state.currentScene.name==="Intrigue"){
            Current  = <Intrigue renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> 
        }
        
        if(this.state.currentScene.name==="Fin"){
            Current  = <Fin details={this.state.currentScene}/> 
        }

        return (
            <div className="JeuContainer">
            <h1>~ {this.state.firstScene.data.titre} ~</h1>
                {Current}
        
            {/* { this.mountScene } */}

            <div ref={this.sceneConatainer} />

            {/* <Scene renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> */}

            {/* <button onClick={ this.mountScene }>TEST</button> */}
            </div>
            )
        }

        
        changerScene = (idScene) => {
           
            console.log("changement de scene vers :" + idScene);    
            console.log(this.state.currentScene)

            var sceneSuivante=this.currentScene;
            if (idScene===0) {
                 sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice1.connections[0].node];
                 console.log(this.state.currentScene.outputs.choice1.connections[0].node)
            }
            if (idScene===1){
                 sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice2.connections[0].node];
                 console.log(this.state.currentScene.outputs.choice1.connections[0].node)


            }
                        this.setState({currentScene: sceneSuivante})                            
        //     let scenes = this.state.scenes.slice();
        //     const index = scenes.findIndex(function(scene){
        //         return scene.blockID === idScene
      
        }
    }

    
    export default Jeu;