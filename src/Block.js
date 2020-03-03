import React from 'react';
import logo from './logo.svg';
import './App.css';

class Block extends React.Component{
render(){
    return(
        <div>
            <div>
                <label>Texte du block</label> <textarea></textarea>
            </div>
        </div>
    )
}
}


export default Block;
