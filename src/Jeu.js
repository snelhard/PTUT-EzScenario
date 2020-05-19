import React from 'react';
import './App.css';

import Scene from './Scene';
import Intrigue from './Intrigue';
import Fin from './Fin';
import Message from './Message';

class Jeu extends React.Component{
    state = {
      "file": {
        "id": "demo@0.1.0",
        "nodes": {
          "1": {
            "id": 1,
            "data": {
              "titre": "Debut"
            },
            "inputs": {},
            "outputs": {
              "out": {
                "connections": [
                  {
                    "node": 2,
                    "input": "input",
                    "data": {}
                  }
                ]
              }
            },
            "position": [
              -419.80039837027675,
              -61.903379254543886
            ],
            "name": "Start"
          },
          "2": {
            "id": 2,
            "data": {
              "texte": "Milieu"
            },
            "inputs": {
              "input": {
                "connections": [
                  {
                    "node": 1,
                    "output": "out",
                    "data": {}
                  }
                ]
              }
            },
            "outputs": {
              "choice1": {
                "connections": [
                  {
                    "node": 3,
                    "input": "input",
                    "data": {}
                  }
                ]
              }
            },
            "position": [
              -88.72922817376633,
              -75.19785955293125
            ],
            "name": "Message"
          },
          "3": {
            "id": 3,
            "data": {
              "titre": "Fin",
              "texte": "Fin"
            },
            "inputs": {
              "input": {
                "connections": [
                  {
                    "node": 2,
                    "output": "choice1",
                    "data": {}
                  }
                ]
              }
            },
            "outputs": {},
            "position": [
              247.0670603121046,
              -82.0763918177984
            ],
            "name": "Fin"
          }
        }
      },
        currentScene: {
        },
        firstScene :{
        }
    }

    constructor(props){
        super(props);
        
        this.state.file=JSON.parse(localStorage.getItem('Current')).file;
        console.log(this.state)
        //for(this.state.file)

       
        this.state.firstScene=this.state.file.nodes[1];       
        this.state.currentScene = this.state.file.nodes[this.state.firstScene.outputs.out.connections[0].node];
        console.log(this.state.firstScene);
        console.log(this.state.firstScene.outputs.out.connections[0].node)
        // this.sceneConatainer = React.createRef();
    }
  UNSAFE_componentWillMount(){     
  //Verification robustesse
  var nbNodes=0;
  var Start=0;
  let liste=[];
  JSON.parse(JSON.stringify(this.state.file.nodes),(key,value)=> {
    if(key==="id"){
      nbNodes+=1;
      liste.push(value);
    } 
  });     
  console.log(this.state.file)
  for(var i=0;i<nbNodes;i++){
      if (this.state.file.nodes[liste[i].name==="Start"]){
        alert('Votre histoire doit avoir un debut pour etre jouée');
       // this.props.history.push('/MesHistoires');
      }
       if (this.state.file.nodes[liste[i]].name==="Scene"  || this.state.file.nodes[liste[i]].name==="Intrigue" ){
           if (this.state.file.nodes[liste[i]].outputs.choice1.connections.length===0 || this.state.file.nodes[liste[i]].outputs.choice2.connections.length===0){
            alert('Vos blocks intrigue ou scene doivent avoir un suite pour pouvoir etre jouée');
            // this.props.history.push('/MesHistoires');
           }
       }
       if (this.state.file.nodes[liste[i]].name==="Message"){
        if (this.state.file.nodes[liste[i]].outputs.choice1.connections.length===0){
          alert('Vos Messages doivent avoir un suite pour pouvoir etre jouée');
            // this.props.history.push('/MesHistoires');
        }
       }
  }    
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
        if(this.state.currentScene.name==="Message"){
            Current = <Message renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/>
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
                 console.log(this.state.currentScene.outputs.choice2.connections[0].node)


            }
                        this.setState({currentScene: sceneSuivante})                            
        //     let scenes = this.state.scenes.slice();
        //     const index = scenes.findIndex(function(scene){
        //         return scene.blockID === idScene
      
        }
    }

    
    export default Jeu;