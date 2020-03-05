import React from 'react';
import './App.css';

class Block extends React.Component{
    state = { //scene
        scenes: [
            {
                id: 1,
                titre: "",
                texte: "",
                scenesSuivantes: [
                    {texte: "", id: 2},
                    {texte: "", id: 3}
                ]
            },
            {
                id: 2,
                titre: "",
                texte: "",
                scenesSuivantes: [
                    {texte: "", id: 3}
                ]
            }
        ],
        texteNouveauChoix: "",
        idNouveauChoix: -1,
        
    }
    setTitre = (event) => {
        const value = event.currentTarget.value;
        this.setState({titre : value});
    }
    handleSubmitChoix = (event) => {
		event.preventDefault();

    }
    handleChangeTexteNouveauChoix = (event) => {
        const value = event.currentTarget.value;
        this.setState({texteNouveauChoix : value});
    }
    handleChangeIdNouveauChoix = (event) => {
        const value = event.currentTarget.value;
        this.setState({idNouveauChoix : value});
    }
    render(){
        return(
            <div class="block">
                <h2>Id block: {this.state.scenes[0].id}</h2>
                <div class="blockTitle">
                    <label>Titre du block</label> <input onChange={this.setTitre} value={this.state.titre}/>
                    <label>Contenu du block</label> <textarea rows="3"></textarea>
                </div>
                <div>
                    <h2>Liste des choix</h2>
                    <form onSubmit={this.handleSubmitChoix}>
                        <div class="choixContainer">
                            <label>Texte choix:</label><input type="text" onChange={this.handleChangeTexteNouveauChoix} value={this.state.texteNouveauChoix}/>
                            <label>Id Scene:</label><input type="number" onChange={this.handleChangeIdNouveauChoix} value={this.state.idNouveauChoix}/>
                        </div>
                        <button>Ajouter un choix</button>
                    </form>
                </div>

                <div>
                    <button>Valider</button>
                </div>
                
            </div>
        )
    }
}


export default Block;
