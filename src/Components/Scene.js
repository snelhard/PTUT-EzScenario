import React from 'react';
import '../App.css';
import {
    withRouter
  } from 'react-router-dom';

class Scene extends React.Component{

    renderSwitch(param) {
        switch(param) {
          case 0:
            return this.props.details.data.choix1;
          case 1:
            return this.props.details.data.choix2;
          case 2:
            return this.props.details.data.choix3;
          case 3:
            return this.props.details.data.choix4;
          case 4:
            return this.props.details.data.choix5;
            
        }
      }

    render() {
        var tableauDeConnexions = JSON.stringify(this.props.details.data)
            let nbChoix = 0
            for (let index = 0; index < tableauDeConnexions.length - 4; index++) {
                if ((tableauDeConnexions[index] === 'c') 
                && (tableauDeConnexions[index+1] === 'h') 
                && (tableauDeConnexions[index+2] === 'o')
                && (tableauDeConnexions[index+3] === 'i')
                && (tableauDeConnexions[index+4] === 'x')) {
                    nbChoix++;
                }
            }
        
            let ListeChoix = []
            for (let index = 0; index < nbChoix; index++) {
                ListeChoix.push(
                    <button 
                        onClick={() => this.remonterChoix(index)} 
                        data-testid={"choix"+index+1}>
                        {
                        this.renderSwitch(index)
                        }
                    </button>
                );
                
            }

        return (
            <div className="sceneJeu">
                <h2 className="sceneJeuTitre" data-testid="titre">{this.props.details.data.titre}</h2>
                <p className="sceneJeuTexte" data-testid="texte">{this.props.details.data.texte}</p>
                <div className="choixContainerJeu">
                    {ListeChoix}
                </div>
            </div>
        )
    }

    remonterChoix =(idChoix) => {
        // console.log(idChoix)
        this.props.renvoiIdSuivant(idChoix);
    }
}

export default withRouter(Scene);