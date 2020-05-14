import React from "react";
import { render, cleanup, fireEvent, findAllByTestId } from "@testing-library/react";

import MesHistoires from '../MesHistoires'


let wrapper = null;
beforeEach(() => {
  wrapper = render(< MesHistoires/>);
  // inputNomPerso = wrapper.getByTestId('NomPerso');
});

afterEach(cleanup);

test (' Affichage de mes histoires ', () => {
  wrapper.debug();
  const RafraichirBoutton = wrapper.getByTestId('br');
  const fichiers = wrapper.getByTestId('rc');
  fireEvent.click(RafraichirBoutton);
})

test('should save to localStorage', () => {
  console.log(localStorage.length);
})