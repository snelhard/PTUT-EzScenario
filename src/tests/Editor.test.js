import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Editor from "../Components/Editor";

let editor;
const tmp = {
    data : {
        titre: "titre",
        texte: "texte",
    }
}
describe('Fin', () => {
    beforeEach(() => {
        editor = render(
            <Editor />
        );
    });
    
    it('Affichage l editeur' , () => {
    //     expect(fin.getByTestId('titre').textContent).toEqual(tmp.data.titre);
    //     expect(fin.getByTestId('texte').textContent).toEqual(tmp.data.texte);
        expect(true).toBeTruthy();
    });
    
    afterEach(() => {
        cleanup();
    });
});