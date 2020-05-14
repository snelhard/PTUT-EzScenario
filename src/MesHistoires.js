import React from 'react';
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Jeu from './Jeu';
  
class MesHistoires extends React.Component{
    constructor(props){
        super(props);
        if (localStorage.getItem('List') ==null) localStorage.setItem('List',"");    
    }


    UploadJsonFile(e) {
                var FILE_KEY;
                var reader = new FileReader();
                // fire processUpload when the user uploads a file.
                handleFileUpload(e);
                // Log any previously saved file.
                console.log('previous save: ', retrieveSave());

                // Setup file reading
                
                reader.onload = handleFileRead;


                function handleFileUpload(event) {
                    var file = event.target.files[0];
                    FILE_KEY = file.name;
                    reader.readAsText(file); // fires onload when done.
                }
                
                function addKey() {
                    var list = localStorage.getItem('List');
                    if (list !== null){
                        var array = list.split(',');
                        if (!array.includes(FILE_KEY))localStorage.setItem('List',list+FILE_KEY+',');
                    } else {
                        localStorage.setItem('List',FILE_KEY+',');
                    }


                }

                function handleFileRead(event) {
                    var save = JSON.parse(event.target.result);
                    console.log(save) // {hp: 32, maxHp: 50, mp: 11, maxMp: 23}
                    addKey();
                    window.localStorage.setItem(FILE_KEY, JSON.stringify(save));
                }

                function retrieveSave() {
                    return JSON.parse(localStorage.getItem(FILE_KEY))
                }
                // window.location.reload(false);
    }

    downloadFile(key) {
        var FILE_KEY = key;
        
        console.log('current save: ', retrieveSave());

        function retrieveSave() {
            return JSON.parse(localStorage.getItem(FILE_KEY))
        }
        
        const element = document.createElement("a");
        // Définie le contenu qui va être dans le fichier JSON
        var debug = {nom: retrieveSave()};

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
            
        });
        // Renvoyer le resultat de la lecture du fichier sous forme txt
        reader.readAsText(file);
        element.href = URL.createObjectURL(file);
        element.download = "myFile.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    setCurrent(key){
        localStorage.setItem('Current',localStorage.getItem(key));
    }


    render() {
        return (
            <div className="AjouterHistoire">
                <h1>Ajouter un nouvelle Histoire</h1>
                <input type="file" data-testid="rc" name="files[]" id="fileUpload" accept=".json" onChange={e => this.UploadJsonFile(e)}/>
                <div className="ListeHistoire">
                <h1>Vos histoires</h1>
                <button data-testid="br" onClick={() => this.forceUpdate()}>Rafraichir la liste des histoires</button>
                <table>
                    {localStorage.getItem('List').split(',').map(json => {
                        if (json!=="")
                        return (
                            <tr key={json}>
                                <td>{json}</td>
                                <td><Link to="/Jeu"><input value="Jouer" type="button" onClick={() => this.setCurrent(json)}/></Link></td>
                                <td><Link to="/Page"><input value="Modifier" type="button" onClick={() => this.setCurrent(json)}/></Link></td>
                                <td><input value="Download" type="button" onClick={() => this.downloadFile(json)}/></td>
                            </tr>);
                    })}
                </table>

                </div>
            </div>
        )
    }

}

export default MesHistoires;