import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Personnage from "../Personnage";

let wrapper, inputNomPerso, buttonValidation = null;
beforeEach(() => {
  wrapper = render(< Personnage submitForm/>);
  // inputNomPerso = wrapper.getByTestId('NomPerso');
  buttonValidation = wrapper.g
});

afterEach(cleanup);

const onSubmit = () => console.log('hi');
//tests d'affichages
// test( 'Champ de saisie pour le nom du personnage visible' , () => {
//   expect(wrapper.queryByTestId('BoutonNomPerso')).toBeTruthy();
//   expect(inputNomPerso.tagName).toBe('INPUT');
// })

test ('Bouton de validation du nom de perso visible' , () => {
  expect(wrapper.queryByTestId('BoutonNomPerso')).toBeTruthy();
  expect(buttonValidation.textContent).toBe('Valider');
})

//tests de fonctionnement
it ('Nom non saisie et bouton valider', () => {
  fireEvent.click(buttonValidation);
})

// it('should update h1 title when message data is changed', () => {
//   // given
//   const wrapper = shallow(Personnage);
 
//   // when
//   wrapper.setData({message: 'world'});
 
//   // then
//   const title = wrapper.find('h1');
//   expect(title.text()).toContain('world');
//  });