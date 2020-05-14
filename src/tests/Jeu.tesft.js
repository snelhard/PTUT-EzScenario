import React from "react";
import { render, cleanup, fireEvent, findAllByTestId } from "@testing-library/react";

import Jeu from '../Jeu'


let wrapper = null;
beforeEach(() => {
  wrapper = render(< Jeu/>);
  // inputNomPerso = wrapper.getByTestId('NomPerso');
});

afterEach(cleanup);

test (' Affichage de mes histoires ', () => {
  wrapper.debug();
})
