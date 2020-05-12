import React from 'react';
import './App.css';
import {
    withRouter
  } from 'react-router-dom';

class Scene extends React.Component{

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
                <h2 className="sceneJeuTitre">{this.props.details.data.titre}</h2>
                <p className="sceneJeuTexte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">

                    
                    {/* {this.props.details.output.num.connections.map( (choix, index) => (

                        <button onClick={() => this.remonterChoix(choix.node)} key={index}>{this.props.details.nodes[choix.node].data.choix}</button>

                    ))} */}


                    <button onClick={() => this.remonterChoix()}>{this.props.details.data.choix1}</button>
                    <button onClick={() => this.remonterChoix()}>{this.props.details.data.choix2}</button>
                    {/* {buttonQuitter} */}
                </div>
            </div>
        )
    }

    remonterChoix() {
        // let Idchoix  = this.props.details.outputs[idSuivant];
        // {this.props.details.outputs.map( (choix, index) => {
        //     if(index == idSuivant){
        //         Idchoix = choix.num.connection.node;
        //     }
        // })};
        // console.log( this.props.details.outputs.();
        this.props.renvoiIdSuivant(5);
    }
}

export default withRouter(Scene);