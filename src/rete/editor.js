import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { MyNode } from "./Node";
import { MyNewNode } from "./MyNewNode";
import { MyControl } from "./Control";
import { MyControlIntrigue} from "./ControlIntrigue";
import { MyControlStart} from "./ControlStart";
import { MyControlFin} from "./ControlFin";
import { MyControlMessage} from "./ControlMessage";
// import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';

var numSocket = new Rete.Socket("Number value");


class StoryBlock extends Rete.Component {
	constructor() {
		super("Scene");
	}
	
	builder(node) {
		var inp = new Rete.Input("input", "", numSocket, true);
		var out = new Rete.Output("choice1", "Choix 1", numSocket, false);
		var out2 = new Rete.Output("choice2", "Choix 2", numSocket, false);
		//var titre = new Rete.Control("Titre");
		var ctrl = new MyControl(this.editor, "greeting", "","","","");
		
		return node
		.addInput(inp)
		.addOutput(out)
		.addOutput(out2)
		.addControl(ctrl);
	}
	
	// worker(node, inputs, outputs) {
	// 	console.log(node.data.greeting);
	// }
}
class IntrigueBlock extends Rete.Component {
	constructor() {
		super("Intrigue");
	}
	
	builder(node) {
		var inp = new Rete.Input("input", "", numSocket, true);
		var out = new Rete.Output("choice1", "Bonne reponse", numSocket, false);
		var out2 = new Rete.Output("choice2", "Mauvaise réponse", numSocket, false);
		var ctrl = new MyControlIntrigue(this.editor, "greeting", "Intrigue");
		
		return node
		.addInput(inp)
		.addOutput(out)
		.addOutput(out2)
		.addControl(ctrl);
	}
	
	// worker(node, inputs, outputs) {
	// 	console.log(node.data.greeting);
	// }
}
class MessageBlock extends Rete.Component {
	constructor() {
		super("Message");
	}
	
	builder(node) {
		var inp = new Rete.Input("input", "", numSocket, true);
		var out = new Rete.Output("choice1", "", numSocket, false);	
		var ctrl = new MyControlMessage(this.editor, "greeting", "Intrigue");
		
		return node
		.addInput(inp)
		.addOutput(out)
		.addControl(ctrl);
	}
	
	// worker(node, inputs, outputs) {
	// 	console.log(node.data.greeting);
	// }
}
class StartBlock extends Rete.Component {
	constructor() {
		super("Start");
		this.data.component = MyNode;
	}
	
	builder(node) {
		// var inp = new Rete.Input("num1", "Number", numSocket, true);
		var out = new Rete.Output("out", "Number", numSocket);
		var ctrl = new MyControlStart(this.editor, "greeting", "Start");
		
		return node.addOutput(out).addControl(ctrl);

	}
	
	// worker(node, inputs, outputs) {
	// 	console.log(node.data.greeting);
	// }
}
class endBlock extends Rete.Component {
	constructor() {
		super("Fin");
		this.data.component = MyNode;
	}
	
	builder(node) {
		var inp = new Rete.Input("input", "Number", numSocket, true);
		var ctrl = new MyControlFin(this.editor, "greeting", "Fin");
		
		return node.addInput(inp).addControl(ctrl);
	}
	
	// worker(node, inputs, outputs) {
	// 	console.log(node.data.greeting);
	// }
}
 class AddComponent extends Rete.Component {
 	constructor() {
 		super("Add");
 	}
	
 	builder(node) {
 		var inp = new Rete.Input("num1", "Number", numSocket);
 		var out = new Rete.Output("num", "Number", numSocket);
 		var ctrl = new MyControl(this.editor, "greeting", "#username");
		
 		return node
 		.addInput(inp)
		.addOutput(out)
 		.addControl(ctrl);
 	}
	
 	worker(node, inputs, outputs) {
 		console.log(node.data.greeting);
 	}
 }

 class RemoveComponent extends Rete.Component {
 	constructor() {
 		super("Remove");
 	}
	
 	builder(node) {
 		var inp = new Rete.Input("num1", "Number", numSocket);
 		var inp2 = new Rete.Input("num2", "Number", numSocket);
 		var inp3 = new Rete.Input("num3", "Number", numSocket);
 		var inp4 = new Rete.Input("num4", "Number", numSocket);
 		var out = new Rete.Output("num", "Number", numSocket);
 		var ctrl = new MyControl(this.editor, "greeting", "#username");
		
 		return node
 		.addInput(inp)
 		.addInput(inp2)
 		.addInput(inp3)
 		.addInput(inp4)
 		.addOutput(out)
 		.addControl(ctrl);
 	}
	
	worker(node, inputs, outputs) {
		console.log("params");
		console.log(node.data.greeting);
		console.log(inputs);
		console.log(outputs);
	}
}

var editor;
var engine;
export const initEditor = function(container) {
	editor = new Rete.NodeEditor("demo@0.1.0", container);
	init();
}

const init =  async ()  => {

	var components = [new StartBlock(), new StoryBlock(),new MessageBlock(), new IntrigueBlock(), new endBlock()];
	
	editor.use(ConnectionPlugin);
	editor.use(ReactRenderPlugin, {
		component: MyNewNode,
	});
	editor.use(ContextMenuPlugin);
	// editor.use(ConnectionReroutePlugin);
	
	engine = new Rete.Engine("demo@0.1.0");

	components.map(c => {
		editor.register(c);
		engine.register(c);
	});
	
	editor.on("process nodecreated noderemoved connectioncreated connectionremoved nodedraged",
		async () => {
			console.log("process");
			await engine.abort();
			const data = editor.toJSON();
			// await engine.process(data);
			console.log(data);
		}
	);
		
	editor.on('click', () => {
		editor.selected.clear();
		editor.nodes.map(n => n.update())
	});
	
	editor.on('nodeselect', node => {
		console.log("Selected Node :");
		console.log(node);
    });

    // editor.on('destroy', () => {
        // console.log("dest");
        // editor.destroy();
        // engine.destroy();
	// });
	
	editor.fromJSON({"id":"demo@0.1.0","nodes":{"1":{"id":1,"data":{"titre":""},"inputs":{},"outputs":{},"position":[-419.80039837027675,-61.903379254543886],"name":"Start"}}    });
		
	editor.view.resize();
	console.log(editor.nodes);
	AreaPlugin.zoomAt(editor);
	editor.trigger("process");
}
	
export const exportEditorData = () => {
	
	function retrieveSave() {
		let editorData = editor.toJSON();
		let newJson = { "file" : editorData };
		return newJson;
	}

	const element = document.createElement("a");
	// Définie le contenu qui va être dans le fichier JSON
	var debug = retrieveSave();

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
	element.download = debug.file.nodes[1].data.titre + " - Story file.json";
	document.body.appendChild(element); // Required for this to work in FireFox
	element.click();
}

export const loadEditorData = (event) => {
	var files = event.target.files;
	var json;
	// console.log(files);
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		reader.onload = (function () {
			return function (e) {
				try {
					json = JSON.parse(e.target.result);
					var editorData = json.file;
					console.log(JSON.stringify(editorData));
					editor.fromJSON(editorData);
				} catch (ex) {
					console.log("Exception lors du parse du JSON = ", ex);
					editor.fromJSON();
				}
			}
		})(f);
		reader.readAsText(f);
	}
}
