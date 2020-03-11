import React from 'react';
import './App.css';
import Block from './Block.js'

class Page extends React.Component{
    state = {
        titre: "La page",
        scenes: [

        ]
    }
    addBlock = () => {
        var scenes = this.state.scenes.slice();
        scenes.push({id: 1, titre: "", text: ""});
        this.setState({scenes: scenes});
    }
    render(){
        return(
        <div className="game">
            <h1>{this.state.titre}</h1>
            <button onClick={this.addBlock}>Ajouter scene</button>
            <div className="game-board">
                {this.state.scenes.map((scene) => (
                    <Block />
                ))}
            </div>
        </div>
        )
    }
}


export default Page;
