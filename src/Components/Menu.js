import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Page from './Page';
// import Personnage from './Personnage';
import Jeu from './Jeu';
import Editor from './Editor';
// import MesHistoires from './MesHistoires';
import MesHistoires from './MesHistoiresCopie';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
      
        <ul className="navBar">
          <li><i className="fas fa-home navIcon"></i>
            <Link to="/">Accueil</Link>
          </li>
          <li><i className="fas fa-book-open navIcon"></i>
              <Link to="/meshistoires">Mes histoires</Link>
          </li>
          <li><i className="fas fa-pen-nib navIcon"></i>
            <Link to="/editeur">Création d'histoire</Link>
          </li>
        </ul>

        {/* <hr /> */}

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
            <Route>
              <Menu />
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


