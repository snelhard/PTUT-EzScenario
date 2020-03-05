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
            <p>{this.state.titre}</p>
            <div className="game-board">
                <Block />
            </div>
        </div>
        )
    }
}


export default Page;
