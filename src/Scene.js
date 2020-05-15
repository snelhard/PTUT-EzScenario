import React from 'react';
import './App.css';
import {
    withRouter
  } from 'react-router-dom';

class Scene extends React.Component{

    // componentDidMount(){
    //     console.log(this.props.details);
    // }

    render() {
        // let buttonQuitter;
        // if (!(this.props.details.ListeChoix && this.props.details.ListeChoix.length)) {
        //     buttonQuitter = <button onClick={() => this.props.history.push('/')}>Quitter</button>;
        // }
        return (
            <div className="sceneJeu">
                <h2 className="sceneJeuTitre" data-testid="titre">{this.props.details.data.titre}</h2>
                <p className="sceneJeuTexte" data-testid="texte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">
                    <button onClick={() => this.remonterChoix(0)} data-testid="choix1">{this.props.details.data.choix1}</button>
                    <button onClick={() => this.remonterChoix(1)} data-testid="choix2">{this.props.details.data.choix2}</button>
                    {/* {buttonQuitter} */}
                </div>
            </div>
        )
    }

    remonterChoix =(idChoix) => {
        console.log(idChoix)
        this.props.renvoiIdSuivant(idChoix);
    }
}

export default withRouter(Scene);