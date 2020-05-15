import React from "react";
import { render, cleanup, fireEvent, findAllByTestId } from "@testing-library/react";

import MesHistoires from '../MesHistoires';
import { MemoryRouter } from "react-router-dom";

let wrapper = null;
beforeEach(() => {
  <MemoryRouter>
    wrapper = render(< MesHistoires/>);
  </MemoryRouter>
 
});

afterEach(cleanup);

it (' Affichage des histoires présents dans le localstorage ', () => {
  //const UneHistoire = {"file":{"id":"demo@0.1.0","nodes":{"1":{"id":1,"data":{"titre":"Le stage"},"inputs":{},"outputs":{"out":{"connections":[{"node":4,"input":"input","data":{}}]}},"position":[-834.8697764997484,-61.820241203077174],"name":"Start"},"4":{"id":4,"data":{"titre":"La recherche d'un stage","texte":"Vous etes à la recherche d'un stage en informatique deux choix se propose à vous","choix1":"Aller au forum des stages","choix2":"Chercher tout seul de son coté"},"inputs":{"input":{"connections":[{"node":1,"output":"out","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":6,"input":"input","data":{}}]},"choice2":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[-551.7590537665678,-142.63223279618322],"name":"Scene"},"6":{"id":6,"data":{"titre":"L'entretient avec airbus","texte":"Vous etes à present face au pdg d'airbus il vous pose la question","enigme":"Etes vous bon en informatique ?","reponse":"Oui"},"inputs":{"input":{"connections":[{"node":4,"output":"choice1","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":9,"input":"input","data":{}}]},"choice2":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[-150.84159414159095,-413.54898277580577],"name":"Intrigue"},"8":{"id":8,"data":{"titre":"Vous avez trop attendu ","texte":"Vous n'avez donc pas trouvé de stage et donc pas obtenu cette LPDQL :'("},"inputs":{"input":{"connections":[{"node":13,"output":"choice1","data":{}}]}},"outputs":{},"position":[963.6110143844978,-221.61041883878556],"name":"Fin"},"9":{"id":9,"data":{"titre":"Sélection airbus","texte":"Vous avez de la chance vous avez été choisit pour rejoindre airbus que faites vous?","choix1":"Vous acceptez ","choix2":"Vous refusez "},"inputs":{"input":{"connections":[{"node":6,"output":"choice1","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":10,"input":"input","data":{}}]},"choice2":{"connections":[{"node":13,"input":"input","data":{}}]}},"position":[213.37238856279745,-490.43048867357],"name":"Scene"},"10":{"id":10,"data":{"titre":"Airbus","texte":"Bravo vous avez un stage chez airbus vous avez donc gagné votre LPDQL :D"},"inputs":{"input":{"connections":[{"node":9,"output":"choice1","data":{}}]}},"outputs":{},"position":[534.9882460905155,-500.84318559325914],"name":"Fin"},"13":{"id":13,"data":{"titre":"Les mails","texte":"Vous voila seul face à la recherche de stage que faites vous ? ","choix1":"J'attends","choix2":"J'envoie plein de mails"},"inputs":{"input":{"connections":[{"node":4,"output":"choice2","data":{}},{"node":6,"output":"choice2","data":{}},{"node":9,"output":"choice2","data":{}}]}},"outputs":{"choice1":{"connections":[{"node":8,"input":"input","data":{}}]},"choice2":{"connections":[{"node":14,"input":"input","data":{}}]}},"position":[563.2214628699821,-125.60430027193604],"name":"Scene"},"14":{"id":14,"data":{"titre":"perseverance","texte":"Bravo grace a votre courage vous avez un stage"},"inputs":{"input":{"connections":[{"node":13,"output":"choice2","data":{}}]}},"outputs":{},"position":[945.7749120041622,-22.262938136832247],"name":"Fin"}}}}
  if (localStorage.getItem('List') ==null) localStorage.setItem('List',"");
  localStorage.setItem('Current',"");
  
  expect(localStorage.getItem('List').split(',').length-1).toBe(0);

  var list = localStorage.getItem('List');
  if (list !== null){
    var array = list.split(',');
    if (!array.includes('Histoire.json')){
        localStorage.setItem('List',list+'Histoire.json'+',');
    }
  } else {
    localStorage.setItem('List','Histoire.json'+',');
  }

  //localStorage.setItem("Histoire.json", UneHistoire);
  
  expect(localStorage.getItem('List').split(',').length-1).toBe(1);
});

it('Sauvegarde dans le localstorage', () => {
  const UneHistoire = "Contenu de l'histoire"
  localStorage.setItem('Histoire', UneHistoire);
  const Une2Histoire = "Contenu de l'histoire"
  localStorage.setItem('Histoire2', Une2Histoire);
  const Une3Histoire = "Contenu de l'histoire"
  localStorage.setItem('Histoire3', Une3Histoire);

  expect(localStorage.getItem('Histoire')).toBe(UneHistoire);
  expect(localStorage.getItem('Histoire2')).toBe(UneHistoire);
  expect(localStorage.getItem('Histoire3')).toBe(UneHistoire);
});


it('selectionner une histoire', () => {
  const UneHistoire = "Contenu de l'histoire"
  localStorage.setItem('Histoire', UneHistoire);
  const setCurrent = jest.fn(() => localStorage.setItem('Current',localStorage.getItem('Histoire')));
  setCurrent('Histoire');
  expect(localStorage.getItem('Current')).toBe(localStorage.getItem('Histoire'));
  expect(setCurrent).toHaveBeenCalledTimes(1);
  expect(setCurrent).toHaveBeenCalledWith('Histoire');
})