import React from 'react';
import './App.css';
import Block from './Block.js'

class Page extends React.Component{
    state = {
        titre: "LA PAGE",
    }
    render(){
        return(
        <div className="game">
            <p>{this.state.titre}</p>
            <div className="game-board">
                <Block />
                <button>Créer</button>
            </div>
            <div className="game-info">
                <div><Block /></div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
        )
    }
}


export default Page;
