import React from 'react';
import './App.css';
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
                <h2 className="finJeuTitre">{this.props.details.data.titre}</h2>
                <p className="finJeuTexte">{this.props.details.data.texte}</p>
                <button onClick={() => this.props.history.push('/')}>Quitter</button>
            </div>
        )
    }

}

export default withRouter(Fin);