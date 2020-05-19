import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Fin from "../Components/Fin";

let fin;
const tmp = {
    data : {
        titre: "titre",
        texte: "texte",
    }
}
describe('Scene', () => {
    beforeEach(() => {
        fin = render(
            <MemoryRouter>
                <Fin details={tmp}/>
            </MemoryRouter>
        );
    });
    afterEach(() => {
        cleanup();
    });
    
    it('Affichage de la fin' , () => {
        expect(fin.getByTestId('titre').textContent).toEqual(tmp.data.titre);
        expect(fin.getByTestId('texte').textContent).toEqual(tmp.data.texte);
    });

    it('Affichage de la fin' , () => {
        let button = fin.getByTestId('button');
        fireEvent.click(button);
        fin.debug();
    });
});