import React from 'react';
import './App.css';
import {
    withRouter
  } from 'react-router-dom';

class Message extends React.Component{

    componentDidMount(){
        console.log(this.props.details);
    }

    render() {
        // let buttonQuitter;
        // if (!(this.props.details.ListeChoix && this.props.details.ListeChoix.length)) {
        //     buttonQuitter = <button onClick={() => this.props.history.push('/')}>Quitter</button>;
        // }
        return (
            <div className="sceneJeu">
                <p className="sceneJeuTexte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">

                    
                    {/* {this.props.details.output.num.connections.map( (choix, index) => (

                        <button onClick={() => this.remonterChoix(choix.node)} key={index}>{this.props.details.nodes[choix.node].data.choix}</button>

                    ))} */}

                     
                    <button onClick={() => this.remonterChoix(0)}> Suivant </button>
                    {/* {buttonQuitter} */}
                </div>
            </div>
        )
    }

    remonterChoix =(idChoix) => {
        // let Idchoix  = this.props.details.outputs[idSuivant];
        // {this.props.details.outputs.map( (choix, index) => {
        //     if(index == idSuivant){
        //         Idchoix = choix.num.connection.node;
        //     }
        // })};
        // console.log( this.props.details.outputs.();
        console.log(idChoix)
        this.props.renvoiIdSuivant(idChoix);
    }
}

export default withRouter(Message);