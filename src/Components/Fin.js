import React from 'react';
import '../App.css';
import {
    withRouter
  } from 'react-router-dom';

class Fin extends React.Component{


    render() {
        return (
            <div className="finJeu">
                <h2 className="finJeuTitre" data-testid="titre">{this.props.details.data.titre}</h2>
                <p className="finJeuTexte" data-testid="texte">{this.props.details.data.texte}</p>
                <button onClick={() => this.props.history.push('/MesHistoires')} data-testid="button">Retour à mes histoires</button>
            </div>
        )
    }

}

export default withRouter(Fin);