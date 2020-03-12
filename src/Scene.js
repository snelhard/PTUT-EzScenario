import React from 'react';
import './App.css';
import {
    withRouter
  } from 'react-router-dom';

class Scene extends React.Component{

    render() {
        let buttonQuitter;
        if (!(this.props.details.ListeChoix && this.props.details.ListeChoix.length)) {
            buttonQuitter = <button onClick={() => this.props.history.push('/')}>Quitter</button>;
        }
        return (
            <div className="sceneJeu">
                <h2 className="sceneJeuTitre">{this.props.details.blockName}</h2>
                <p className="sceneJeuTexte">{this.props.details.blockContenu}</p>
                <div className="choixContainerJeu">
                    {this.props.details.ListeChoix.map( (choix) => (
                        <button onClick={() => this.remonterChoix(choix.ChoixIdSuivant)} key={choix.id}>{choix.ChoixTexte}</button>
                    ))}
                    {buttonQuitter}
                </div>
            </div>
        )
    }

    remonterChoix(idSuivant) {
        this.props.renvoiIdSuivant(idSuivant);
    }
}

export default withRouter(Scene);