import React from 'react';
import './App.css';
import Block from './Block.js'

class Page extends React.Component{
    state = {
        titre: "La page",
    }
    render(){
        return(
        <div className="game">
            <h1>{this.state.titre}</h1>
            <div className="game-board">
                <Block />
            </div>
        </div>
        )
    }
}


export default Page;
