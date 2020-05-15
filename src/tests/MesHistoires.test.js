import React from "react";
import { render, cleanup, fireEvent, findAllByTestId } from "@testing-library/react";

import MesHistoires from '../MesHistoires'
import {setCurrent} from '../MesHistoires'

let wrapper = null;
beforeEach(() => {
  wrapper = render(< MesHistoires/>);
  // inputNomPerso = wrapper.getByTestId('NomPerso');
});

afterEach(cleanup);

test (' Affichage des histoires présents dans le localstorage ', () => {
  const UneHistoire = "Contenu de l'histoire"
  localStorage.setItem('Histoire', UneHistoire);
  console.log(localStorage.getItem('Histoire'));
  expect(localStorage.getItem('Histoire')).toBe(UneHistoire);
  
});

test('Sauvegarde dans le localstorage', () => {
  const UploadJsonFileMockFn = jest.fn();
  const Histoire = "Une exemple d'une histoire";
});


test('selectionner une histoire', () => {
  const UneHistoire = "Contenu de l'histoire"
  localStorage.setItem('Histoire', UneHistoire);
  const setCurrent = jest.fn(() => localStorage.setItem('Current',localStorage.getItem('Histoire')));
  setCurrent();
  expect(localStorage.getItem('Current')).toBe(localStorage.getItem('Histoire'));
})