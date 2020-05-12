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

	var components = [new StoryBlock(), new StartBlock(), new IntrigueBlock(), new endBlock()];
	
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
	
	// editor.fromJSON({"id":"demo@0.1.0","nodes":{"1":{"id":1,"data":{"titre":"Le stage"},"inputs":{},"outputs":{"out":{"connections":[{"node":4,"input":"input","data":{}}]}},"position":[-834.8697764997484,-61.820241203077174],"name":"Start"},"4":{"id":4,"data":{"titre":"La recherche d'un stage","texte":"Vous etes à la recherche d'un stage en informatique deux choix se propose à vous","choix1":"Aller au forum des stages","choix2":"Chercher tout seul de son coté"},"inputs":{"input":{"connections":[{"node":1,"output":"out","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":6,"input":"input","data":{}}]},"choice2":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[-493.8554765333238,-183.991930819929],"name":"Scene"},"6":{"id":6,"data":{"titre":"L'entretient avec airbus","texte":"Vous etes à present face au pdg d'airbus il vous pose la question","enigme":"Etes vous bon en informatique ?","reponse":"Oui"},"inputs":{"input":{"connections":[{"node":4,"output":"choice1","data":{}}]}},"outputs":{"goodChoice":{"connections":[{"node":9,"input":"input","data":{}}]},"badChoice":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[-174.8780527763852,-460.0822001960027],"name":"Intrigue"},"8":{"id":8,"data":{"titre":"Vous avez trop attendu ","texte":"Vous n'avez donc pas trouvé de stage et donc pas obtenu cette LPDQL :'("},"inputs":{"input":{"connections":[{"node":13,"output":"choice1","data":{}}]}},"outputs":{},"position":[963.6110143844978,-221.61041883878556],"name":"Fin"},"9":{"id":9,"data":{"titre":"Sélection airbus","texte":"Vous avez de la chance vous avez été choisit pour rejoindre airbus que faites vous?","choix1":"Vous acceptez ","choix2":"Vous refusez "},"inputs":{"input":{"connections":[{"node":6,"output":"goodChoice","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":10,"input":"input","data":{}}]},"choice2":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[198.8737932135002,-549.3012501278903],"name":"Scene"},"10":{"id":10,"data":{"titre":"Airbus","texte":"Bravo vous avez un stage chez airbus vous avez donc gagné votre LPDQL :D"},"inputs":{"input":{"connections":[{"node":9,"output":"choice1","data":{}}]}},"outputs":{},"position":[534.9882460905155,-500.84318559325914],"name":"Fin"},"13":{"id":13,"data":{"titre":"Les mails","texte":"Vous voila seul face à la recherche de stage que faites vous ? ","choix1":"J'attends","choix2":"J'envoie plein de mails"},"inputs":{"input":{"connections":[{"node":4,"output":"choice2","data":{}},{"node":9,"output":"choice2","data":{}},{"node":6,"output":"badChoice","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":8,"input":"input","data":{}}]},"choice2":{"connections":[{"node":14,"input":"input","data":{}}]}},"position":[563.2214628699821,-125.60430027193604],"name":"Scene"},"14":{"id":14,"data":{"titre":"perseverance","texte":"Bravo grace a votre courage vous avez un stage"},"inputs":{"input":{"connections":[{"node":13,"output":"choice2","data":{}}]}},"outputs":{},"position":[945.7749120041622,-22.262938136832247],"name":"Fin"}}});
		
	editor.view.resize();
	console.log(editor.nodes);
	AreaPlugin.zoomAt(editor);
	editor.trigger("process");
}
	
export const jsoned = () => {
	var jsoned = editor.toJSON();
	console.log("jsoned :");
    console.log(JSON.stringify(jsoned));
    // editor.destroy();
    // engine.destroy();
}

export const load = () => {
	editor.fromJSON({
		"id": "demo@0.1.0",
		"nodes": {
		  "1": {
			"id": 1,
			"data": {
			  "titre": "Le stage"
			},
			"inputs": {},
			"outputs": {
			  "out": {
				"connections": [
				  {
					"node": 4,
					"input": "input",
					"data": {}
				  }
				]
			  }
			},
			"position": [
			  -834.8697764997484,
			  -61.820241203077174
			],
			"name": "Start"
		  },
		  "4": {
			"id": 4,
			"data": {
			  "titre": "La recherche d'un stage",
			  "texte": "Vous etes à la recherche d'un stage en informatique deux choix se propose à vous",
			  "choix1": "Aller au forum des stages",
			  "choix2": "Chercher tout seul de son coté"
			},
			"inputs": {
			  "input": {
				"connections": [
				  {
					"node": 1,
					"output": "out",
					"data": {}
				  }
				]
			  }
			},
			"outputs": {
			  "choice1": {
				"connections": [
				  {
					"node": 6,
					"input": "input",
					"data": {}
				  }
				]
			  },
			  "choice2": {
				"connections": [
				  {
					"node": 13,
					"input": "input",
					"data": {}
				  }
				]
			  }
			},
			"position": [
			  -551.7590537665678,
			  -142.63223279618322
			],
			"name": "Scene"
		  },
		  "6": {
			"id": 6,
			"data": {
			  "titre": "L'entretient avec airbus",
			  "texte": "Vous etes à present face au pdg d'airbus il vous pose la question",
			  "enigme": "Etes vous bon en informatique ?",
			  "reponse": "Oui"
			},
			"inputs": {
			  "input": {
				"connections": [
				  {
					"node": 4,
					"output": "choice1",
					"data": {}
				  }
				]
			  }
			},
			"outputs": {
			  "choice1": {
				"connections": [
				  {
					"node": 9,
					"input": "input",
					"data": {}
				  }
				]
			  },
			  "choice2": {
				"connections": [
				  {
					"node": 13,
					"input": "input",
					"data": {}
				  }
				]
			  }
			},
			"position": [
			  -150.84159414159095,
			  -413.54898277580577
			],
			"name": "Intrigue"
		  },
		  "8": {
			"id": 8,
			"data": {
			  "titre": "Vous avez trop attendu ",
			  "texte": "Vous n'avez donc pas trouvé de stage et donc pas obtenu cette LPDQL :'("
			},
			"inputs": {
			  "input": {
				"connections": [
				  {
					"node": 13,
					"output": "choice1",
					"data": {}
				  }
				]
			  }
			},
			"outputs": {},
			"position": [
			  963.6110143844978,
			  -221.61041883878556
			],
			"name": "Fin"
		  },
		  "9": {
			"id": 9,
			"data": {
			  "titre": "Sélection airbus",
			  "texte": "Vous avez de la chance vous avez été choisit pour rejoindre airbus que faites vous?",
			  "choix1": "Vous acceptez ",
			  "choix2": "Vous refusez "
			},
			"inputs": {
			  "input": {
				"connections": [
				  {
					"node": 6,
					"output": "goodChoice",
					"data": {}
				  }
				]
			  }
			},
			"outputs": {
			  "choice1": {
				"connections": [
				  {
					"node": 10,
					"input": "input",
					"data": {}
				  }
				]
			  },
			  "choice2": {
				"connections": [
				  {
					"node": 13,
					"input": "input",
					"data": {}
				  }
				]
			  }
			},
			"position": [
			  213.37238856279745,
			  -490.43048867357
			],
			"name": "Scene"
		  },
		  "10": {
			"id": 10,
			"data": {
			  "titre": "Airbus",
			  "texte": "Bravo vous avez un stage chez airbus vous avez donc gagné votre LPDQL :D"
			},
			"inputs": {
			  "input": {
				"connections": [
				  {
					"node": 9,
					"output": "choice1",
					"data": {}
				  }
				]
			  }
			},
			"outputs": {},
			"position": [
			  534.9882460905155,
			  -500.84318559325914
			],
			"name": "Fin"
		  },
		  "13": {
			"id": 13,
			"data": {
			  "titre": "Les mails",
			  "texte": "Vous voila seul face à la recherche de stage que faites vous ? ",
			  "choix1": "J'attends",
			  "choix2": "J'envoie plein de mails"
			},
			"inputs": {
			  "input": {
				"connections": [
				  {
					"node": 4,
					"output": "choice2",
					"data": {}
				  },
				  {
					"node": 6,
					"output": "badChoice",
					"data": {}
				  },
				  {
					"node": 9,
					"output": "choice2",
					"data": {}
				  }
				]
			  }
			},
			"outputs": {
			  "choice1": {
				"connections": [
				  {
					"node": 8,
					"input": "input",
					"data": {}
				  }
				]
			  },
			  "choice2": {
				"connections": [
				  {
					"node": 14,
					"input": "input",
					"data": {}
				  }
				]
			  }
			},
			"position": [
			  563.2214628699821,
			  -125.60430027193604
			],
			"name": "Scene"
		  },
		  "14": {
			"id": 14,
			"data": {
			  "titre": "perseverance",
			  "texte": "Bravo grace a votre courage vous avez un stage"
			},
			"inputs": {
			  "input": {
				"connections": [
				  {
					"node": 13,
					"output": "choice2",
					"data": {}
				  }
				]
			  }
			},
			"outputs": {},
			"position": [
			  945.7749120041622,
			  -22.262938136832247
			],
			"name": "Fin"
		  }
		}
	  }
	);
	// console.log("jsoned :");
	// console.log(JSON.stringify(jsoned));
}