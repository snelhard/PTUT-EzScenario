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
            <div>
                <h2>{this.props.details.blockName}</h2>
                <p>{this.props.details.blockContenu}</p>
                <div>
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