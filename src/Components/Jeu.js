import React from 'react';
import '../App.css';
import Scene from './Scene';
import Intrigue from './Intrigue';
import Fin from './Fin';
import Message from './Message';
import Qcm from './Qcm';
import {
    withRouter
  } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    alerteErreur,
    alertevalidation
        } from './alerte'

class Jeu extends React.Component{
    state = {
        currentScene: {
        },
        firstScene :{
        }
    }
    
    constructor(props){
        super(props);
        //le fichier JSON du jeu prend le fichier du current
        this.state.file=JSON.parse(localStorage.getItem('Current')).file;
        var nbNodes=0;
        var Start=0;
        let liste=[];
        //parcourir le fichier JSON pour recuperer le nombre d'id des nodes et leur valeur
        
        JSON.parse(JSON.stringify(this.state.file.nodes),(key,value)=> {
          if(key==="id"){
            nbNodes+=1;
            liste.push(value);
          } 
        });     

        //Pour toute les nodes
        for(var i=0;i<nbNodes;i++){
            //Si la nodes a pour nom Start
            if(this.state.file.nodes[liste[i]].name==="Start"){
                Start+=1;
                //Sauvegarde la block Start en tant que premiere scene
                this.state.firstScene=this.state.file.nodes[liste[i]];
                //Verifie que le block start a une suite
                if(this.state.file.nodes[liste[i]].outputs.out.connections.length===0){
                    alerteErreur('Oops...','Le block de start doit avoir une suite pour pouvoir etre joué')
                    this.props.history.push('/MesHistoires');
                }else{
                    this.state.currentScene = this.state.file.nodes[this.state.firstScene.outputs.out.connections[0].node];
                }
            }   
           
          
        //Stock la chaine de sortie d'un block
        var tableauDeConnexions = JSON.stringify(this.state.file.nodes[liste[i]].outputs)
        let nbChoix = 0
        //parcour les caracteres et verifie si c'est un choice alors on augmente le nombre de choix qu'a le block
        for (let index = 0; index < tableauDeConnexions.length - 5; index++) {
            if ((tableauDeConnexions[index] === 'c') 
            && (tableauDeConnexions[index+1] === 'h') 
            && (tableauDeConnexions[index+2] === 'o')
            && (tableauDeConnexions[index+3] === 'i')
            && (tableauDeConnexions[index+4] === 'c')
            && (tableauDeConnexions[index+5] === 'e')){
                nbChoix++;
            }
        }
        //Si le block n'est pas une fin et qu'elle n'a pas de choix alors on retourne une erreur
        if(this.state.file.nodes[liste[i]].name!=="Fin"){
            if(nbChoix!=0){
                if(this.renderSwitch(nbChoix,liste[i]).connections.length===0){
                    alerteErreur('Oops...','Vos blocks doivent avoir une suite pour pouvoir etre joués');
                    this.props.history.push('/MesHistoires');
                }
            }
        }              
        // this.state.currentScene = this.state.file.nodes[this.state.firstScene.outputs.out.connections[0].node];
        this.gererSauvegarde();
        }
    }
    //Switch des choice en fonction du nombre ce choix d'un block  
    renderSwitch(param,i) {
        switch(param) {
          case 1:
            return this.state.file.nodes[i].outputs.choice1;
          case 2:
            return this.state.file.nodes[i].outputs.choice2;
          case 3:
            return this.state.file.nodes[i].outputs.choice3;
          case 4:
            return this.state.file.nodes[i].outputs.choice4;
          case 5:
            return this.state.file.nodes[i].outputs.choice5;
            
        }
      }
    componentWillUnmount() {
        localStorage.setItem('Current',"");
    }
    
    render() {
        //En fonction du nom du block on affiche son composant
        let Current;
        if(this.state.currentScene.name==="Scene"){
            Current  = <Scene renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> 
        }
        if(this.state.currentScene.name==="Intrigue reponse numérique"){
            Current  = <Intrigue renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> 
        }
        
        if(this.state.currentScene.name==="Fin"){
            Current  = <Fin details={this.state.currentScene}/> 
        }
        if(this.state.currentScene.name==="Message"){
            Current = <Message renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/>
        }
        if(this.state.currentScene.name==="Qcm"){
            Current = <Qcm renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/>
        }
            
        return (
            <div className="bookContainer addedNavSpace">
                {/* <img src={img} className="book"/> */}
                <div className="bookContent">
                    {/* <h1 className="storyTitle">~ {this.state.firstScene.data.titre} ~</h1> */}
                    {Current}
                    {/* <div ref={this.sceneConatainer} /> */}
                </div>
            </div>
            )
        }

        //Est appelé quand on clic sur un des choix
        changerScene = (idScene) => {
     
            var sceneSuivante;
            switch (idScene) {
                case 0:
                    sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice1.connections[0].node];
                   break;
                case 1:
                    sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice2.connections[0].node];
                   break;
                case 2:
                    sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice3.connections[0].node];
                    break;
                case 3:
                    sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice4.connections[0].node];
                    break;
                case 4:
                    sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice5.connections[0].node];
                    break;
                default:
                   break;
           }
           //MaJ de la currentScene avec la nouvelle scene
            this.setState({currentScene: sceneSuivante});
            //gestion sauvegarde
            if (sceneSuivante.name!== "Fin")
                this.Sauvegarder(sceneSuivante);
            else
                this.supprimerSauvegarde();
            
        }

        Sauvegarder (sceneSuivante) {
            var FILE_KEY=this.state.firstScene.data.titre+'.save';
            localStorage.setItem(FILE_KEY,(localStorage.getItem(FILE_KEY).concat(sceneSuivante.id+',')));
        }

        supprimerSauvegarde () {
            var FILE_KEY=this.state.firstScene.data.titre+'.save';
            localStorage.setItem(FILE_KEY,'');
        }

        gererSauvegarde = () => {
            // Définie la clef d'accès au local storage (titre de l'histoire)
            var KEY = this.state.firstScene.data.titre+'.save';
            // Vérifie qu'une sauvegarde existe est qu'elle n'est pas vide
            if(localStorage.getItem(KEY)!=="" && localStorage.getItem(KEY)!==null) {
                // Affiche un message comme quoi une sauvegarde existe déjà et propose à l'utilisateur de faire un choix
                alertevalidation( 'Une sauvegarde pour cette histoire existe déjà...',"Voulez vous reprendre la sauvegarde déjà existante ?","Reprendre","Supprimer").then((result) => {
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