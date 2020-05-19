import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Scene from "../Components/Scene";

let scene;
const tmp = {
    data : {
        titre: "titre",
        texte: "texte",
        choix1: "choix1",
        choix2: "choix2",
    }
}
const renvoiIdSuivant = jest.fn();

describe('Scene', () => {
    beforeEach(() => {
        scene = render(
            <MemoryRouter>
                <Scene renvoiIdSuivant={renvoiIdSuivant} details={tmp}/>
            </MemoryRouter>
        );
    });
    afterEach(() => {
        cleanup();
        renvoiIdSuivant.mockClear();
    }); 

    it('Affichage de la scene', () => {
        expect(scene.getByTestId('titre').textContent).toEqual(tmp.data.titre);
        expect(scene.getByTestId('texte').textContent).toEqual(tmp.data.texte);
        expect(scene.getByTestId('choix1').textContent).toEqual(tmp.data.choix1);
        expect(scene.getByTestId('choix2').textContent).toEqual(tmp.data.choix2);
    })
    
    it('Choix numero 1', () => {
        const button = scene.getByTestId('choix1');
        fireEvent.click(button);
        expect(renvoiIdSuivant).toHaveBeenCalledTimes(1);
        expect(renvoiIdSuivant).toHaveBeenCalledWith(0);
    })
    
    it('Choix numero 2', () => {
        const button = scene.getByTestId('choix2');
        fireEvent.click(button);
        expect(renvoiIdSuivant).toHaveBeenCalledTimes(1);
        expect(renvoiIdSuivant).toHaveBeenCalledWith(1);
    });
       
});




