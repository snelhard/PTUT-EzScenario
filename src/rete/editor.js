import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { MyNode } from "./Node";
import { MyNewNode } from "./MyNewNode";
import { MyControl } from "./Control";
// import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';

var numSocket = new Rete.Socket("Number value");


class StoryBlock extends Rete.Component {
	constructor() {
		super("Scene");
	}
	
	builder(node) {
		var inp = new Rete.Input("num1", "Number", numSocket, true);
		var out = new Rete.Output("num", "Choix 1", numSocket, false);
		var out2 = new Rete.Output("num1", "Choix 2", numSocket, false);
		var ctrl = new MyControl(this.editor, "greeting", "","","","","");
		
		return node
		.addInput(inp)
		.addOutput(out)
		.addOutput(out2)
		.addControl(ctrl);
	}
	
	worker(node, inputs, outputs) {
		console.log(node.data.greeting);
	}
}

class StartBlock extends Rete.Component {
	constructor() {
		super("Start");
		this.data.component = MyNode;
	}
	
	builder(node) {
		// var inp = new Rete.Input("num1", "Number", numSocket, true);
		var out = new Rete.Output("num", "Number", numSocket);
		// var ctrl = new MyControl(this.editor, "greeting", "#username");
		
		return node.addOutput(out);
	}
	
	worker(node, inputs, outputs) {
		console.log(node.data.greeting);
	}
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

	var components = [new StoryBlock(), new StartBlock()];
	
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
	
	editor.fromJSON({
		"id": "demo@0.1.0",
		"nodes": {
			"1": {
				"id": 1,
				"data": {},
				"inputs": {},
				"outputs": {
					"num": {
						"connections": [
							{
								"node": 2,
								"input": "num1",
								"data": {
									"pins": []
								}
							}
						]
					}
				},
				"position": [
					-285.5,
					-105.375
				],
				"name": "Start"
			},
			"2": {
				"id": 2,
				"data": {},
				"inputs": {
					"num1": {
						"connections": [
							{
								"node": 1,
								"output": "num",
								"data": {
									"pins": []
								}
							}
						]
					}
				},
				"outputs": {
					"num": {
						"connections": [
							{
								"node": 5,
								"input": "num1",
								"data": {
									"pins": []
								}
							}
						]
					},
					"num1": {
						"connections": [
							{
								"node": 3,
								"input": "num1",
								"data": {
									"pins": []
								}
							}
						]
					}
				},
				"position": [
					-98.5,
					-125.375
				],
				"name": "Scene"
			}
		}
	});
		
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
	editor.fromJSON({"id":"demo@0.1.0","nodes":{"1":{"id":1,"data":{},"inputs":{},"outputs":{"num":{"connections":[{"node":2,"input":"num1","data":{"pins":[]}}]}},"position":[-285.5,-105.375],"name":"Start"},"2":{"id":2,"data":{},"inputs":{"num1":{"connections":[{"node":1,"output":"num","data":{"pins":[]}}]}},"outputs":{"num":{"connections":[{"node":5,"input":"num1","data":{"pins":[]}}]},"num1":{"connections":[{"node":3,"input":"num1","data":{"pins":[]}}]}},"position":[-98.5,-125.375],"name":"Scene"},"3":{"id":3,"data":{},"inputs":{"num1":{"connections":[{"node":2,"output":"num1","data":{"pins":[]}}]}},"outputs":{"num":{"connections":[{"node":7,"input":"num1","data":{}}]},"num1":{"connections":[{"node":7,"input":"num1","data":{}}]}},"position":[152.5,-7.375],"name":"Scene"},"5":{"id":5,"data":{},"inputs":{"num1":{"connections":[{"node":2,"output":"num","data":{"pins":[]}}]}},"outputs":{"num":{"connections":[{"node":6,"input":"num1","data":{}}]},"num1":{"connections":[{"node":6,"input":"num1","data":{}}]}},"position":[177.5,-203.375],"name":"Scene"},"6":{"id":6,"data":{},"inputs":{"num1":{"connections":[{"node":5,"output":"num","data":{}},{"node":5,"output":"num1","data":{}},{"node":7,"output":"num","data":{}}]}},"outputs":{"num":{"connections":[]},"num1":{"connections":[]}},"position":[604,-244.375],"name":"Scene"},"7":{"id":7,"data":{},"inputs":{"num1":{"connections":[{"node":3,"output":"num","data":{}},{"node":3,"output":"num1","data":{}}]}},"outputs":{"num":{"connections":[{"node":6,"input":"num1","data":{}}]},"num1":{"connections":[]}},"position":[380,-104.375],"name":"Scene"}}});
	// console.log("jsoned :");
	// console.log(JSON.stringify(jsoned));
}