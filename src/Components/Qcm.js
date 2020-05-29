import React from 'react';
import '../App.css';

class Qcm extends React.Component{


    render() {
        return (
            <div className="bookPages">
                <div className="page left">
                    <h2 className="titreScene" data-testid="titre">{this.props.details.data.titre}</h2>
                    <p className="texteScene" data-testid="texte">{this.props.details.data.texte}</p>
                    <p className="questionScene" data-testid="question"><i>{this.props.details.data.question}</i></p>
                </div>
                <div className="page right">
                    <button className="choix" onClick={() => this.remonterChoix(1)} data-testid="choix1">{this.props.details.data.choix1}</button>
                    <button className="choix" onClick={() => this.remonterChoix(2)} data-testid="choix2">{this.props.details.data.choix2}</button>
                    <button className="choix" onClick={() => this.remonterChoix(3)} data-testid="choix3">{this.props.details.data.choix3}</button>
                    <button className="choix" onClick={() => this.remonterChoix(4)} data-testid="choix4">{this.props.details.data.choix4}</button>
                </div>
            </div>
        )
    }
    remonterChoix =(idChoix) => {
        if(this.props.details.data["check"+idChoix]){
            this.props.renvoiIdSuivant(0);
        } else {
            this.props.renvoiIdSuivant(1);
        }
    }

}

export default Qcm;