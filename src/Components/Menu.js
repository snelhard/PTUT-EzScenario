import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Jeu from './Jeu';
import Editor from './Editor';
import MesHistoires from './MesHistoires';


export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul className="navBar">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/meshistoires">Mes histoires</Link>
          </li>
          <li>
            <Link to="/editeur">Création d'une histoire</Link>
          </li>
        </ul>

        <div className="main-container">
          <Switch>
            <Route exact path="/">
              <Menu />
            </Route>
            <Route path="/editeur">
              <Editor />
            </Route>
            <Route path="/jeu">
              <Jeu />
            </Route>
            <Route path="/meshistoires">
              <MesHistoires />
            </Route>
          </Switch>
        </div>
        
      </div>
    </Router>
  );
}

function Menu() {
    return (
      <div>
        <h1>Bienvenue sur Ez-Scenario !</h1>
      </div>
    );
  }


