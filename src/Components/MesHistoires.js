import React from 'react';
import '../App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Swal from 'sweetalert2'
class MesHistoires extends React.Component{

    state = {
        nbHistoire: 0,
        histoires: [],
    }

    constructor(props){
        super(props);
        if (localStorage.getItem('List') ==null) localStorage.setItem('List',""); 
        this.state.nbHistoire = localStorage.getItem('List').split(',').length-1;   
        this.state.histoires = localStorage.getItem('List').split(',');
    }


    UploadJsonFile(e) {
        var FILE_KEY;
        var reader = new FileReader();
        // fire processUpload when the user uploads a file.
        try{
            handleFileUpload(e);
            if(addKey()){
                this.updateStateAdd(FILE_KEY);
            }
            e.target.value = null;
        }
        catch(m){
            console.log("no file exception handled")
        }
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
                if (!array.includes(FILE_KEY)){
                    localStorage.setItem('List',list+FILE_KEY+',');
                    return true;
                }
            } else {
                localStorage.setItem('List',FILE_KEY+',');
                return true;
            }
            return false;
        }

        function handleFileRead(event) {
            var save = JSON.parse(event.target.result);
            console.log(save) // {hp: 32, maxHp: 50, mp: 11, maxMp: 23}
            window.localStorage.setItem(FILE_KEY, JSON.stringify(save));
        }

        function retrieveSave() {
            return JSON.parse(localStorage.getItem(FILE_KEY))
        }
    }

    handleUpload(e) {
        this.UploadJsonFile(e);
    }

    updateStateAdd(FILE_KEY){
        let histoires = [...this.state.histoires];
        histoires.push(FILE_KEY);
        this.setState({
            nbHistoire: this.state.nbHistoire + 1,
            histoires: histoires
        });
    }

    updateStateRemove(){
        this.setState({
            nbHistoire: localStorage.getItem('List').split(',').length-1,
            histoires: localStorage.getItem('List').split(',')
        });
        this.forceUpdate();
    }

    downloadFile(key) {
        var FILE_KEY = key;
        
        console.log('current save: ', retrieveSave());

        function retrieveSave() {
            return JSON.parse(localStorage.getItem(FILE_KEY))
        }
        
        const element = document.createElement("a");
        // Définie le contenu qui va être dans le fichier JSON
        var debug = {file: retrieveSave().file};

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

    supprimer(key){
        Swal.fire({
            title: 'Êtes-vous sûr(e) de vouloir le supprimer ? ',
            text: "Il vous sera impossible de revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.value) {
                var list = localStorage.getItem('List');
                var tab = list.split(',');
                tab.splice([tab.indexOf(key)],1);
                localStorage.setItem('List',tab.toString());
                localStorage.removeItem(key);
                this.updateStateRemove();
            }
          })
    }

    setCurrent(key){
        localStorage.setItem('Current',localStorage.getItem(key));
    }
    

    render() {
        return (
            <div className="AjouterHistoire addedNavSpace">
                <h1>Ajouter un nouvelle histoire</h1>
                <input type="file" name="files[]" id="fileUpload" accept=".json" onChange={e => this.handleUpload(e)}/>
                <div className="listeHistoire">
                    <h1>Vous avez actuellement {this.state.nbHistoire} {this.state.nbHistoire > 1 ? "histoires" : "histoire"}</h1>
                    
                    <div className="storyList">
                    {this.state.histoires.map(json => {
                        return (
                        <div className="storyCard">
                            <p>{json.replace('.json', '').replace('-_Story_file', '').replace('_', ' ')}</p>
                            <Link to="/jeu"> <button onClick={() => this.setCurrent(json)}><i class="fas fa-play"></i></button></Link>
                            <Link to="/editeur"><button onClick={() => this.setCurrent(json)}><i class="fas fa-pen"></i></button></Link>
                            <button onClick={() => this.downloadFile(json)}><i class="fas fa-file-download"></i></button>
                            <button onClick={() => this.supprimer(json)}><i class="fas fa-trash"></i></button>
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        )
    }

}

export default MesHistoires;