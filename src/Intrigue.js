import React from 'react';
import './App.css';
import {
    withRouter
  } from 'react-router-dom';

class Intrigue extends React.Component{

    componentDidMount(){
        console.log(this.props.details);
    }
    hundleSubmit(event){
      
        const reponse=event.target.value;
        console.log(reponse);
        console.log(this.props.details.data.reponse)
        if(reponse===this.props.details.data.reponse){
            //this.props.renvoiIdSuivant(0);
            alert("OUIIII");
        }else{
            alert("NON");
            //this.props.renvoiIdSuivant(1);
        }
        // let Idchoix  = this.props.details.outputs[idSuivant];
        // {this.props.details.outputs.map( (choix, index) => {
        //     if(index == idSuivant){
        //         Idchoix = choix.num.connection.node;
        //     }
        // })};
        // console.log( this.props.details.outputs.();
        event.preventDefault();
    }
    render() {
        // let buttonQuitter;
        // if (!(this.props.details.ListeChoix && this.props.details.ListeChoix.length)) {
        //     buttonQuitter = <button onClick={() => this.props.history.push('/')}>Quitter</button>;
        // }
        
        return (
            <div className="intrigueJeu">
                <h2 className="intrigueJeuTitre">{this.props.details.data.titre}</h2>
                <p className="intrigueJeuTexte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">

                    
                    {/* {this.props.details.output.num.connections.map( (choix, index) => (

                        <button onClick={() => this.remonterChoix(choix.node)} key={index}>{this.props.details.nodes[choix.node].data.choix}</button>

                    ))} */}
                
                <form onSubmit={()=> this.hundleSubmit()}>
                    <p className="intrigueJeuQuestion">{this.props.details.data.enigme}</p>
                    Réponse<input type="text" />
                    <input type="submit"></input> 
                </form>
                 
                    
                    {/* {buttonQuitter} */}
                </div>
            </div>
        )
    }

   
}

export default withRouter(Intrigue);