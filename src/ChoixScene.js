import React from 'react';
import './App.css';

class ChoixScene extends React.Component{
    state = {
        id: 1,
        texte: "",
        idSuivant:0
     }
     handleChangeTexteNouveauChoix = (event) => {
        const value = event.currentTarget.value;
        this.setState({texte : value});
        //this.sendData();
    }
    handleChangeidSuivant = (event) => {
        var value = event.currentTarget.value;
        this.setState({idSuivant : value});
        //this.sendData();

    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmitChoix}>
                    <div className="choixContainer">
                        <label>Texte choix:</label><input type="text" onChange={this.handleChangeTexteNouveauChoix} value={this.state.texte}/>
                        <label>Id Scene:</label><input type="number" onChange={this.handleChangeidSuivant} value={this.state.idSuivant}/>
                    </div>
                    <button>valider</button> 
                </form>
            </div>

        )
    }
    handleSubmitChoix=(event)=> {
        event.preventDefault();
        this.sendData();
    }
    sendData =() => {
           this.props.parentCallback(this.state);
           //console.log(this.state)
    }
}

export default ChoixScene;