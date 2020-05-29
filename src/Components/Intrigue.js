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
            <div className="bookPages">
                <div className="page left">
                    <h2 className="titreScene" data-testid="titre">{this.props.details.data.titre}</h2>
                    <p className="texteScene" data-testid="texte">{this.props.details.data.texte}</p>
                </div>
                <div className="page right">
                    <p className="enigmeScene" data-testid="enigme">{this.props.details.data.enigme}</p>
                    <form onSubmit={this.handleSubmit} style={{width : "100%"}}>
                        <input className="engimeInput" type="number" value={this.state.value} onChange={this.update} data-testid="reponseInput"/>
                        <button className="enigmeButton" type="submit" value="Valider" data-testid="buttonSubmit"><i class="fas fa-check"></i></button>
                    </form>
                </div>
            </div>
        )
    }

   
}

export default withRouter(Intrigue);