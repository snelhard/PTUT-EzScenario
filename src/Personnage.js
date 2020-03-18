import React from 'react';
import './App.css';
import data from './MDD.json';
import {
    withRouter
  } from 'react-router-dom'

class Personnage extends React.Component{


    downloadJsonFile = () => {
        const element = document.createElement("a");
        // Définie le contenu qui va être dans le fichier JSON
        var debug = {nom: document.getElementById('myInput').value};

        // crée le fichier json avec le contenu
        const file = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});

        // Ouverture du lecteur
        var reader = new FileReader();
        // Attend que le fichier à fini de charger
        reader.addEventListener("loadend", (e) => {
            // Récupère la chaine contenu dans le fichier json
            const text = e.srcElement.result;
            // Analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne
            const contenu = JSON.parse(text);
            // renvoie le contenu affecté à nom dans le json
            console.log(contenu.nom)
            
            document.getElementById('Affichage').value=contenu.nom;
        });
        // Renvoyer le resultat de la lecture du fichier sous forme txt
        reader.readAsText(file);
        element.href = URL.createObjectURL(file);
        element.download = "myFile.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }

    lectureFichier() {
        console.log(data);
    }


    render() {
        return(
            <div className="creation-personnage">
                <h1>Création d'un personnage</h1>
                <div>
                    <label>Nom du personnage :</label>
                    <div>
                        <input id="myInput" onBlur={this.setNom}/> 
                        {/* <button onClick={this.downloadJsonFile}>Valider</button> */}
                    </div>
                </div>
                {/* <div>
                    <label>Output :</label>
                    <textarea id="Affichage" name="Text1" cols="40" rows="5" onBlur={this.setNom}></textarea>
                </div> */}
                <button onClick={this._handleButtonClick}>Click</button>
            </div>
        )
    }

    _handleButtonClick = () => {
        //calculate your data here
        //then redirect:
        this.props.history.push('/Jeu');
      }
}


export default withRouter(Personnage);
