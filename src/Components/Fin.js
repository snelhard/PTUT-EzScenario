import React from 'react';
import '../App.css';
import {
    withRouter
  } from 'react-router-dom';

class Fin extends React.Component{


    render() {
        return (
            <div className="bookPages">
                <div className="page left">
                    <h2 className="titreScene" data-testid="titre">{this.props.details.data.titre}</h2>
                    <p className="texteScene" data-testid="texte">{this.props.details.data.texte}</p>
                </div>
                <div className="page right">
                    <button className="choix" onClick={() => this.props.history.push('/MesHistoires')} data-testid="button">Quitter</button>
                </div>
            </div>
        )
    }

}

export default withRouter(Fin);