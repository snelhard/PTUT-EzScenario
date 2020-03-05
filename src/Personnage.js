import React from 'react';
import './App.css';


class Personnage extends React.Component{
    state = {
        nom: "Test"
    }

    setNom = (event) => {
        const value = event.currentTarget.value;
        this.setState({nom : value});
    }

    render() {
        return(
            <div>
                <label>Nom du personnage </label> <input onChange={this.setNom} value={this.state.nom}/>
            </div>
        )
    }
}


export default Personnage;
