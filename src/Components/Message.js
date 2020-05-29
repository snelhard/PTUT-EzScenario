import React from 'react';
import '../App.css';
import {
    withRouter
  } from 'react-router-dom';

class Message extends React.Component{
    render() {
        return (
            <div className="bookPages">
                <div className="page left">
                    <p className="texteScene" data-testid="texte">{this.props.details.data.texte}</p>
                </div>
                <div className="page right">
                    <button className="choix" onClick={() => this.remonterChoix(0)} data-testid="button">Continuer</button>
                </div>
            </div>
        )
    }
    remonterChoix =(idChoix) => {
        this.props.renvoiIdSuivant(idChoix);
    }
}

export default withRouter(Message);