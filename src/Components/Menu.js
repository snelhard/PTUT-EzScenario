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
        {/* <!-- Google fonts--> */}
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <header class="masthead">
            <div class="container h-100">
                <div class="row h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-10 align-self-end">
                        <h1 class="text-uppercase text-white font-weight-bold">Bienvenue sur Ez-Scenario</h1>
                        <hr class="divider my-4" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                        <p class="text-white-75 font-weight-light mb-5">Nous vous proposons des aventures interactives basées sur les célèbres "Livres dont vous êtes le héros".</p>
                        <a class="btn btn-primary btn-xl js-scroll-trigger" href="/meshistoires">JOUER</a>
                    </div>
                </div>
            </div>
        </header>
        {/*About*/}
        <section class="page-section bg-primary" id="about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="text-white mt-0">Présentation du jeu</h2>
                        <hr class="divider light my-4" />
                        <p class="text-white-50 mb-4">Basé sur le principe des « livres dont vous êtes le héros », Vous pourrez jouer des récits extraordinaires 
                            dans lesquels de nombreuses surprises vous attendrons à chaque page. Les choix que vous ferez vous mènerons à de nouveaux chemins encore 
                            inexplorés, de nouveaux défis à relever. Vous devrez faire preuve d’imagination afin de vous sortir de situations parfois délicates. </p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }


