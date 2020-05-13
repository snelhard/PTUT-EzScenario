import React from 'react';
import './App.css';
import Scene from './Scene';
import Intrigue from './Intrigue';
import Fin from './Fin';
class Jeu extends React.Component{
    state = {
        file :{
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
                -899.526454893793,
                45.15717213979676
              ],
              "name": "Start"
            },
            "4": {
              "id": 4,
              "data": {
                "titre": "La recherche d'un stage",
                "texte": "Vous êtes à la recherche d'un stage en informatique. Deux choix s'offrent à vous ...",
                "choix1": "Aller au forum stage",
                "choix2": "Chercher tout seul de votre coté"
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
                -550.5834150014452,
                -142.3270116424315
              ],
              "name": "Scene"
            },
            "6": {
              "id": 6,
              "data": {
                "titre": "L'entretient avec airbus",
                "texte": "Vous êtes à present face au pdg d'airbus. Il vous pose la question",
                "enigme": "Etes-vous bon en informatique ?",
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
                -178.84813389680227,
                -253.4262785877647
              ],
              "name": "Intrigue"
            },
            "9": {
              "id": 9,
              "data": {
                "titre": "Sélection airbus",
                "texte": "Vous avez de la chance vous avez été choisi pour rejoindre airbus.\nQue faites-vous?",
                "choix1": "Vous acceptez ",
                "choix2": "Vous refusez "
              },
              "inputs": {
                "input": {
                  "connections": [
                    {
                      "node": 6,
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
                159.19966519995162,
                -587.0394878261493
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
                512.2977217028144,
                -499.66575909420044
              ],
              "name": "Fin"
            },
            "13": {
              "id": 13,
              "data": {
                "titre": "La recherche",
                "texte": "Vous voilà seul face à la recherche de stage. Que faites-vous ? ",
                "choix1": "Je consulte Moodle",
                "choix2": "J'envoie plein de mails à des entreprises connues"
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
                      "output": "choice2",
                      "data": {}
                    },
                    {
                      "node": 9,
                      "output": "choice2",
                      "data": {}
                    },
                    {
                      "node": 31,
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
                      "node": 31,
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
                533.4964186689205,
                -250.66871854683848
              ],
              "name": "Scene"
            },
            "14": {
              "id": 14,
              "data": {
                "titre": "Persévérance",
                "texte": "Bravo ! Grâce à votre courage vous avez obtenu un stage !"
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
                998.7089784019186,
                -278.9391727606627
              ],
              "name": "Fin"
            },
            "31": {
              "id": 31,
              "data": {
                "titre": "Moodle",
                "texte": "Vous trouvez beaucoup d'offres sur Moodle. Que faites-vous ?",
                "choix1": "Je postule aux offres et j'attends.",
                "choix2": "Je retourne chercher des stages en dehors de Moodle."
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
              "outputs": {
                "choice1": {
                  "connections": [
                    {
                      "node": 32,
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
                553.2840325674401,
                220.20657512192687
              ],
              "name": "Scene"
            },
            "32": {
              "id": 32,
              "data": {
                "texte": "Toutes les offres étaient déjà pourvues, les entreprises n'ont même pas pris la peine de vous répondre. Vous n'obtenez donc pas votre licence DQL.",
                "titre": "Aïe ..."
              },
              "inputs": {
                "input": {
                  "connections": [
                    {
                      "node": 31,
                      "output": "choice1",
                      "data": {}
                    }
                  ]
                }
              },
              "outputs": {},
              "position": [
                953.6131630624548,
                211.66295299979234
              ],
              "name": "Fin"
            }
          }
        },
        currentScene: {
        },
        firstScene :{
        }
    }
    
    constructor(props){
        super(props);
        
        this.state.currentScene = this.state.file.nodes[1];
        this.state.firstScene = this.state.currentScene
        this.state.currentScene = this.state.file.nodes[this.state.firstScene.outputs.out.connections[0].node];
        console.log(this.state.firstScene);
        console.log(this.state.firstScene.outputs.out.connections[0].node)
        // this.sceneConatainer = React.createRef();
    }

    componentDidMount(){
        // update();
    }
    
    render() {
        let Current;
        if(this.state.currentScene.name==="Scene"){
            Current  = <Scene renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> 
        }
        if(this.state.currentScene.name==="Intrigue"){
            Current  = <Intrigue renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> 
        }
        
        if(this.state.currentScene.name==="Fin"){
            Current  = <Fin details={this.state.currentScene}/> 
        }

        return (
            <div className="JeuContainer">
            <h1>~ {this.state.firstScene.data.titre} ~</h1>
            {Current}
        
            {/* { this.mountScene } */}

            <div ref={this.sceneConatainer} />

            {/* <Scene renvoiIdSuivant={this.changerScene} details={this.state.currentScene}/> */}

            {/* <button onClick={ this.mountScene }>TEST</button> */}
            </div>
            )
        }

        
        changerScene = (idScene) => {
           
            console.log("changement de scene vers :" + idScene);    
            console.log(this.state.currentScene)
            var sceneSuivante=this.currentScene;
            if (idScene===0) {
                sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice1.connections[0].node];
                console.log(this.state.currentScene.outputs.choice1.connections[0].node)
            }
            if (idScene===1){
                 sceneSuivante =this.state.file.nodes[this.state.currentScene.outputs.choice2.connections[0].node];
                 console.log(this.state.currentScene.outputs.choice2.connections[0].node)


            }
                        this.setState({currentScene: sceneSuivante})                            
        //     let scenes = this.state.scenes.slice();
        //     const index = scenes.findIndex(function(scene){
        //         return scene.blockID === idScene
      
        }
    }

    
    export default Jeu;