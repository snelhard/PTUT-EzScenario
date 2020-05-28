import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { MyNode } from "./Node";
import { MyNewNode } from "./MyNewNode";
import { MyControl } from "./Control";
import { MyControlIntrigueN} from "./ControlIntrigueN";
import { MyControlStart} from "./ControlStart";
import { MyControlFin} from "./ControlFin";
import { MyControlMessage} from "./ControlMessage";
import { MyControlQcm} from "./ControlQcm";
import Swal from 'sweetalert2';
import { alerteErreur,alertevalidation} from '../Components/alerte'
// import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';

var defaultSocket = new Rete.Socket("");

class StoryBlock extends Rete.Component {
	constructor() {
		super("Scene");
	}
	//saisir le nombre de choix d'une scene
	async saisieValeur() {
		const { value: ValeurSaisie } = await Swal.fire({
			title: 'Nombre de choix (entre 2 et 5)',
			input: 'number',
			inputValidator: (value) => {
				if (!value) {
					return 'Vous devez saisir une valeur!'
				}
			}
		})
		if (ValeurSaisie) {
			return ValeurSaisie;
		}
	}

	//Construire la scene avec un nombre de choix/récupere la scene avec les choix 
	async builder(node) {
		const lesInputs = node.inputs;
		const lesOutputs = node.outputs;
		const testChoix1 = node.data.choix1
		const testChoix2 = node.data.choix2
		const testChoix3 = node.data.choix3
		const testChoix4 = node.data.choix4
		const testChoix5 = node.data.choix5
		let nbSorties = 0
		let nbSortiesint = Number(nbSorties);

		if ((typeof(testChoix1) == "undefined") && lesInputs.size==0 && lesOutputs.size==0) {
			while(nbSortiesint>5 || nbSortiesint<2 || isNaN(nbSortiesint)) {
				nbSorties = await this.saisieValeur();
				nbSortiesint = Number(nbSorties);
			}
		} else {
			nbSorties = 99;
		}
		

			if (typeof(testChoix1) != "undefined" && nbSorties==99) {
				nbSortiesint=0
				nbSortiesint++
				if (typeof(testChoix2) != "undefined") {
					nbSortiesint++
					if (typeof(testChoix3) != "undefined") {
						nbSortiesint++
						if (typeof(testChoix4) != "undefined") {
							nbSortiesint++
							if (typeof(testChoix5) != "undefined") {
								nbSortiesint++
							}
						}
					}
				}
			}
		//ajoute une entrée à notre scene
		var inp = new Rete.Input("input", "", defaultSocket, true);
		var ctrl = new MyControl(this.editor, "Paramètres de la scène", nbSortiesint, "", "", "");
		node.addInput(inp)
		//ajoute le nombre de sortie en fonction du nomnre de choix
		for (let i = 0; i < nbSortiesint; i++) {
			node.addOutput(new Rete.Output("choice"+(i+1), "Choix"+(i+1), defaultSocket, false))
		}
		//Ajoute au block scene les champs du control
		node.addControl(ctrl);
		return node;
	}
}

class IntrigueNBlock extends Rete.Component {
	constructor() {
		super("Intrigue reponse numérique");
	}
	builder(node) {
		var inp = new Rete.Input("input", "", defaultSocket, true);
		var out = new Rete.Output("choice1", "Bonne réponse", defaultSocket, false);
		var out2 = new Rete.Output("choice2", "Mauvaise réponse", defaultSocket, false);
		var ctrl = new MyControlIntrigueN(this.editor, "Paramètres de l'intrigue", "Intrigue");

		return node
			.addInput(inp)
			.addOutput(out)
			.addOutput(out2)
			.addControl(ctrl);
	}
}

class MessageBlock extends Rete.Component {
	constructor() {
		super("Message");
	}
	builder(node) {
		var inp = new Rete.Input("input", "", defaultSocket, true);
		var out = new Rete.Output("choice1", "", defaultSocket, false);	
		var ctrl = new MyControlMessage(this.editor, "Paramètres du message", "Message");
		
		return node
		.addInput(inp)
		.addOutput(out)
		.addControl(ctrl);
	}
}

class StartBlock extends Rete.Component {
	constructor() {
		super("Start");
		this.data.component = MyNode;
	}
	builder(node) {
		var out = new Rete.Output("out", "Number", defaultSocket, false);
		var ctrl = new MyControlStart(this.editor, "Paramètres du début", "Start");

		return node.addOutput(out).addControl(ctrl);
	}
}

class QcmBlock extends Rete.Component {
	constructor() {
		super("Qcm");
	}
	builder(node) {
		var inp = new Rete.Input("input", "", defaultSocket, true);
		var out = new Rete.Output("choice1", "Bonne réponse", defaultSocket, false);
		var out2 = new Rete.Output("choice2", "Mauvaise réponse", defaultSocket, false);
		var ctrl = new MyControlQcm(this.editor, "Paramètres du QCM", "", "", "", "", false, "", false, "", false, "", false);

		return node
			.addInput(inp)
			.addOutput(out)
			.addOutput(out2)
			.addControl(ctrl);
	}
}

class endBlock extends Rete.Component {
	constructor() {
		super("Fin");
		this.data.component = MyNode;
	}
	builder(node) {
		var inp = new Rete.Input("input", "Number", defaultSocket, true);
		var ctrl = new MyControlFin(this.editor, "Paramètres de la fin", "Fin");

		return node.addInput(inp).addControl(ctrl);
	}
}

var editor;
var engine;
export const initEditor = function (container) {
	editor = new Rete.NodeEditor("demo@0.1.0", container);
	init();
}
//Gestion de l'editeur via rete.js
const init = async () => {

	var components = [new StartBlock(), new StoryBlock(),new MessageBlock(), new IntrigueNBlock(), new QcmBlock(), new endBlock()];
	
	editor.use(ConnectionPlugin);
	editor.use(ReactRenderPlugin, {
		component: MyNewNode,
	});
	editor.use(ContextMenuPlugin);

	engine = new Rete.Engine("demo@0.1.0");

	components.map(c => {
		editor.register(c);
		engine.register(c);
	});

	editor.on("process nodecreated noderemoved connectioncreated connectionremoved nodedraged",
		async () => {
			await engine.abort();
			const data = editor.toJSON();

		}
	);

	editor.on('click', () => {
		editor.selected.clear();
		editor.nodes.map(n => n.update())
	});

	//Si on ne vient pas de mes histoires alors on affichera juste un block Start
	if (localStorage.getItem('Current') ==null || localStorage.getItem('Current')=="") {
		editor.fromJSON({ "id": "demo@0.1.0", "nodes": { "1": { "id": 1, "data": { "titre": "" }, "inputs": {}, "outputs": {}, "position": [-419.80039837027675, -61.903379254543886], "name": "Start" } } });
	} else {
		var json = JSON.parse(localStorage.getItem('Current')); // Parse du JSON
		var editorData = json.file;
		editor.fromJSON(editorData);
	}
	editor.on('zoom', ({ source }) => {
		return source !== 'dblclick';
	});

	editor.view.resize();
	AreaPlugin.zoomAt(editor);
	editor.trigger("process");
}
//Bouton export
export const exportEditorData = () => {

	function retrieveSave() {
		let editorData = editor.toJSON();
		let newJson = { "file": editorData };
		return newJson;
	}

	const element = document.createElement("a");
	// Définie le contenu qui va être dans le fichier JSON
	var debug = retrieveSave();

	// crée le fichier json avec le contenu
	const file = new Blob([JSON.stringify(debug, null, 2)], { type: 'application/json' });

	// Ouverture du lecteur
	var reader = new FileReader();
	// Attend que le fichier à fini de charger
	reader.addEventListener("loadend", (e) => {
		// Récupère la chaine contenu dans le fichier json
		const text = e.srcElement.result;
		// Analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne
		const contenu = JSON.parse(text);
		// renvoie le contenu affecté à nom dans le json

	});
	// Renvoyer le resultat de la lecture du fichier sous forme txt
	//renvoyer le nombre de block avec leur id dans une liste
	var nbNodes=0;
	let liste=[];
	let Start=0;
	let idStart=""
  	JSON.parse(JSON.stringify(debug.file.nodes),(key,value)=> {
		if(key==="id"){
		nbNodes+=1;
		liste.push(value);
		} 
	 }); 
	 //Recherche dans la liste le block start
	 for(var i=0;i<nbNodes;i++){
		if(debug.file.nodes[liste[i]].name==="Start"){
			Start+=1
			idStart=debug.file.nodes[liste[i]].data.titre;
		}
	} 
	if(Start>=2 || Start==0){
		alerteErreur('Oops',"Il doit n'y avoir qu'un seul debut");
	}else{
		if (typeof(idStart) === "undefined" || idStart==""){
			alerteErreur('Oops','Vous avez oublié de donner un nom à votre histoire !');
		} else {
			reader.readAsText(file);
			element.href = URL.createObjectURL(file);
			element.download = idStart + "_Story_file.json";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		}
	} 
	

}
//Chargement
export const loadEditorData = (event) => {
	var files = event.target.files;
	var json;
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		reader.onload = (function () { // À chaque fois qu'une opération de lecture de fichier est menée à bien
			return function (e) {
				try {
					json = JSON.parse(e.target.result); // Parse du JSON
					var editorData = json.file;
					editor.fromJSON(editorData); // Fonction qui exploite les données du JSON pour les mettre dans l'éditeur (blocs, titres, énigmes...)
				} catch (ex) {
					console.log("Exception lors du parse du JSON = ", ex); // Exception levée en cas d'erreur de parse, ou d'envoi de fichier incorrect (non-JSON)
				}
			}
		})(f);
		reader.readAsText(f); // Lit le contenu du fichier f passé en paramètre grâce au FileReader
	}
}
//Sauvegarde
export const saveEditorData = (event) => {
	var FILE_KEY;
	function addKey() {
		var list = localStorage.getItem('List');
		if (list !== null){
			var array = list.split(',');
			if (!array.includes(FILE_KEY)){
				localStorage.setItem('List',list+FILE_KEY+',');
			}
		} else {
			localStorage.setItem('List',FILE_KEY+',');
		}
	}

	function retrieveSave() {
		let editorData = editor.toJSON();
		let newJson = { "file": editorData };
		return newJson;
	}

	const element = document.createElement("a");
	// Définie le contenu qui va être dans le fichier JSON
	var debug = retrieveSave();
	// demande à l'utilisateur de rentrer un titre si le titre est vide !
	var nbNodes=0;
	let liste=[];
	let Start=0;
	let idStart=""
  	JSON.parse(JSON.stringify(debug.file.nodes),(key,value)=> {
		if(key==="id"){
		nbNodes+=1;
		liste.push(value);
		} 
	 }); 
	 for(var i=0;i<nbNodes;i++){
		if(debug.file.nodes[liste[i]].name==="Start"){
			Start+=1
			idStart=debug.file.nodes[liste[i]].data.titre;
		}
	} 
	if(Start>=2 || Start==0){
		alerteErreur('Oops',"Il doit n'y avoir qu'un seul debut");
	}else{
		if (typeof(idStart) === "undefined" || idStart==""){
			alerteErreur('Oops','Vous avez oublié de donner un nom à votre histoire !');
		} else {
	// Si l'utilisateur a rentré un titre
		FILE_KEY=idStart + "_-_Story_file.json";

		if (localStorage.getItem(FILE_KEY)!== "" && localStorage.getItem(FILE_KEY)!== null){
			alertevalidation( 'Une sauvegarde pour cette histoire existe déjà...',"Voulez vous reprendre la sauvegarde déjà existante ?","Reprendre","Supprimer").then((result) => {
				if (result.value) {
					localStorage.setItem(FILE_KEY,JSON.stringify(debug));
					addKey();
					document.body.appendChild(element); // Required for this to work in FireFox
					element.click();
				
					Swal.fire({
						icon: 'success',
						title: 'Votre fichier a bien été sauvegardé',
						showConfirmButton: false,
						timer: 1000
					  })
				}
			  })
		} else {
			localStorage.setItem(FILE_KEY,JSON.stringify(debug));
			console.log(debug)
			addKey();
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		
			Swal.fire({
				icon: 'success',
				title: 'Votre fichier a bien été sauvegardé !',
				showConfirmButton: false,
				timer: 1000
			  })
		}
		}

	}
}		
//Effacer
export const resetEditor = () => {
	alertevalidation( "Êtes vous sûr?","Vous perdrez l'histoire présente dans l'editeur !","Confimer","Annuler").then((result) => {
		if (result.value) {
			localStorage.setItem('Current', "");
			editor.fromJSON({ "id": "demo@0.1.0", "nodes": { "1": { "id": 1, "data": { "titre": "" }, "inputs": {}, "outputs": {}, "position": [-419.80039837027675, -61.903379254543886], "name": "Start" } } });
		} else {
			Swal.fire("Annulé", "Reprise de l'histoire dans l'editeur", "error")
		}
	})
		
}
