import React from 'react';
import '../App.css';
import {
    withRouter
  } from 'react-router-dom';

class Intrigue extends React.Component{

    
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(event) {
        this.setState({value: event.target.value});
    }
    //Verifier si la reponse est la bonne
    handleSubmit(event) {
        //ne pas recharger la page
        event.preventDefault();
        var rep;
        if(Number(this.state.value)==this.props.details.data.reponse)
            rep=0;
        else
            rep=1;
        this.props.renvoiIdSuivant(rep);
    }

    render() {
        return (
            <div className="sceneJeu">
                <h2 className="intrigueJeuTitre" data-testid="titre">{this.props.details.data.titre}</h2>
                <p className="intrigueJeuTexte" data-testid="texte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">
                    <form onSubmit={this.handleSubmit}>
                        <p className="intrigueJeuQuestion" data-testid="enigme">{this.props.details.data.enigme}</p>
                        <input type="number" value={this.state.value} onChange={this.update} data-testid="reponseInput"/>
                        <input type="submit" value="Valider" data-testid="buttonSubmit"/>
                    </form>
                </div>
            </div>
        )
    }

   
}

export default withRouter(Intrigue);