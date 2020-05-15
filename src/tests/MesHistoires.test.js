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
  const RafraichirBoutton = wrapper.getByTestId('br');
  const fichiers = wrapper.getByTestId('rc');
  fireEvent.click(RafraichirBoutton);
})

test('should save to localStorage', () => {
  localStorage.setItem('List','test.json,');
  console.log(localStorage.getItem('List'));
  

  // const result = '{ "name":"John", "age":30, "car":"Peugeot"}';

  // //set json object to storage 
  // localStorage.setItem('user', JSON.stringify(result));

  // //get object
  // expect(result).toBe(JSON.parse(localStorage.getItem('user')));
  // // const value = localStorage.getItem('user');

  // //remove object
  // localStorage.removeItem('user');
})