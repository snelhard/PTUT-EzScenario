import React from 'react';
import '../App.css';
import {
    withRouter
  } from 'react-router-dom';

class Fin extends React.Component{

    componentDidMount(){
        console.log(this.props.details);
    }

    render() {
        // let buttonQuitter;
        // if (!(this.props.details.ListeChoix && this.props.details.ListeChoix.length)) {
        //     buttonQuitter = <button onClick={() => this.props.history.push('/')}>Quitter</button>;
        // }
        return (
            <div className="finJeu">
                <h2 className="finJeuTitre" data-testid="titre">{this.props.details.data.titre}</h2>
                <p className="finJeuTexte" data-testid="texte">{this.props.details.data.texte}</p>
                <button onClick={() => this.props.history.push('/MesHistoires')} data-testid="button">Retour à Mes histoire</button>
            </div>
        )
    }

}

export default withRouter(Fin);