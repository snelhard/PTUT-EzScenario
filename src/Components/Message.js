import React from 'react';
import '../App.css';
import {
    withRouter
  } from 'react-router-dom';

class Message extends React.Component{
    render() {
        return (
            <div className="sceneJeu">
                <p className="sceneJeuTexte" data-testid="texte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">
                    <button onClick={() => this.remonterChoix(0)} data-testid="button">Suivant</button>
                </div>
            </div>
        )
    }
    remonterChoix =(idChoix) => {
        this.props.renvoiIdSuivant(idChoix);
    }
}

export default withRouter(Message);