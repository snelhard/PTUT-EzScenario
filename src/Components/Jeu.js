import React from 'react';
import '../App.css';
import Scene from './Scene';
import Intrigue from './Intrigue';
import Fin from './Fin';
import Message from './Message';
import {
    withRouter
  } from 'react-router-dom';
import Swal from 'sweetalert2';
class Jeu extends React.Component{
    state = {
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
        console.log(this.state.firstScene.outputs.out.connections[0].node);
        this.gererSauvegarde();
        
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
       
       if (this.state.file.nodes[liste[i]].name==="Scene"  || this.state.file.nodes[liste[i]].name==="Intrigue" ){
           if (this.state.file.nodes[liste[i]].outputs.choice1.connections.length===0 || this.state.file.nodes[liste[i]].outputs.choice2.connections.length===0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vos blocks intrigue ou scene doivent avoir une suite pour pouvoir etre jouée',
              })
             this.props.history.push('/MesHistoires');
           }
       }
       if (this.state.file.nodes[liste[i]].name==="Message"){
        if (this.state.file.nodes[liste[i]].outputs.choice1.connections.length===0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vos Messages doivent avoir un suite pour pouvoir etre jouée',
              })
         this.props.history.push('/MesHistoires');
        }
       }
  }    
    }
    componentDidMount(){
        // update();
    }

    componentWillUnmount() {
        localStorage.setItem('Current',"");
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
           
            
            var tableauDeConnexions = JSON.stringify(this.state.currentScene.outputs)
            let nbChoix = 0
            for (let index = 0; index < tableauDeConnexions.length - 5; index++) {
                if ((tableauDeConnexions[index] === 'c') 
                && (tableauDeConnexions[index+1] === 'h') 
                && (tableauDeConnexions[index+2] === 'o')
                && (tableauDeConnexions[index+3] === 'i')
                && (tableauDeConnexions[index+4] === 'c')
                && (tableauDeConnexions[index+5] === 'e')) {
                    nbChoix++;
                }
            }
            console.log("nombre de choix = "+nbChoix);
            var sceneSuivante=this.currentScene;
           
            if (idScene===0) {
                sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice1.connections[0].node];
                // console.log(this.state.currentScene.outputs.choice1.connections[0].node)
            }
            if (idScene===1){
                 sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice2.connections[0].node];
                //  console.log(this.state.currentScene.outputs.choice2.connections[0].node)
            }
            if (idScene===2){
                sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice3.connections[0].node];
                // console.log(this.state.currentScene.outputs.choice3.connections[0].node)
           }
           if (idScene===3){
                sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice4.connections[0].node];
                // console.log(this.state.currentScene.outputs.choice4.connections[0].node)
           }
           if (idScene===4){
                sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice5.connections[0].node];
                // console.log(this.state.currentScene.outputs.choice5.connections[0].node)
           }
        
           this.setState({currentScene: sceneSuivante});
           this.Sauvegarder(sceneSuivante);
        }

        Sauvegarder (sceneSuivante) {
            var FILE_KEY=this.state.firstScene.data.titre+'.save';
            localStorage.setItem(FILE_KEY,(localStorage.getItem(FILE_KEY).concat(sceneSuivante.id+',')));
        }

        gererSauvegarde = () => {
            // Définie la clef d'accès au local storage (titre de l'histoire)
            var KEY = this.state.firstScene.data.titre+'.save';
            // Vérifie qu'une sauvegarde existe est qu'elle n'est pas vide
            if(localStorage.getItem(KEY)!=="" && localStorage.getItem(KEY)!==null) {
                // Affiche un message comme quoi une sauvegarde existe déjà et propose à l'utilisateur de faire un choix
                Swal.fire({
                    title: 'Une sauvegarde pour cette histoire existe déjà ...',
                    text: "Voulez vous reprendre la sauvegarde déjà existante ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Reprendre',
                    cancelButtonText: 'Supprimer'
                  }).then((result) => {
                    if (result.value) {
                        // Récupère les éléments de sauvegarde stocké dans local storage et crée un tableau
                        var tab = localStorage.getItem(KEY).split(',');
                        // Définie quelle sera la scène suivante (length-2 car -1 ="" car .split prend ce qui se trouve après l'élément limite " , ")
                        var sceneSuivante = this.state.file.nodes[tab[tab.length-2]];
                        // Met à jour la scène courrante 
                        this.setState({currentScene: sceneSuivante})
                    } else {
                        // Réinitialise la valeur stocké dans le local storage pour la clef KEY
                        localStorage.setItem(KEY,"");
                    }
                  })
            } else {
                // Initialise la valeur du local storage pour la clef KEY
                localStorage.setItem(KEY,"");
            }
    
        }
    

    }

    
    export default withRouter(Jeu);