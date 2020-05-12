import React from 'react';
import './App.css';
import {
    withRouter
  } from 'react-router-dom';

class Intrigue extends React.Component{

    
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        //alert(this.state.value);
        var rep=""
       if(this.state.value===this.props.details.data.reponse){
            rep=0;
        }else{
            rep=1;
        }
        this.props.renvoiIdSuivant(rep);
       
        event.preventDefault();
    }

    render() {
        return (
            <div className="sceneJeu">
                <h2 className="intrigueJeuTitre">{this.props.details.data.titre}</h2>
                <p className="intrigueJeuTexte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">

                    <form onSubmit={this.handleSubmit}>
                        <p className="intrigueJeuQuestion">{this.props.details.data.enigme}</p>
                        {/* <label>Réponse</label> */}
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" value="Valider" />
                    </form>

                    {/* {buttonQuitter} */}
                </div>
            </div>
        )
    }

   
}

export default withRouter(Intrigue);