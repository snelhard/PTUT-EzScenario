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
                    </div>
                </div>
                <button onClick={this._handleButtonClick}>Click</button><br></br><br></br>
                <label>Image :</label><br></br>
                <input type="file" onChange={this.traitementFichierChoisi} accept=".json" />
            </div>
        )
    }

    _handleButtonClick = () => {
        this.props.history.push('/Jeu');
      }
    
    traitementFichierChoisi = (event) => {
        console.log(event.target.files[0]); 
        /*var obj = JSON.parse(event.target.result);
        this.alert_data(obj.name, obj.family)*/
    }

    /*alert_data = (name, family) => {
        alert('Name : ' + name + ', Family : ' + family);
    }*/
}


export default withRouter(Personnage);
