import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Intrigue from "../Components/Intrigue";

let intrigue;
let reponseInput;
const tmp = {
    data : {
        titre: "titre",
        texte: "texte",
        enigme: "enigme",
        reponse: "correct",
    }
}
const renvoiIdSuivant = jest.fn();

describe('Intrigue', () => {
    beforeEach(() => {
        intrigue = render(
            <MemoryRouter>
                <Intrigue renvoiIdSuivant={renvoiIdSuivant} details={tmp}/>
            </MemoryRouter>
        );
        reponseInput = intrigue.getByTestId('reponseInput');
    });

    it('Affichage de l intrigue', () => {
        expect(intrigue.getByTestId('titre').textContent).toEqual(tmp.data.titre);
        expect(intrigue.getByTestId('texte').textContent).toEqual(tmp.data.texte);
        expect(intrigue.getByTestId('enigme').textContent).toEqual(tmp.data.enigme);
        expect(intrigue.getByTestId('reponseInput').textContent).toEqual("");
    });

    it('Saisie de la bonne reponse', () => {
        expect(reponseInput.value).toEqual("");
        // reponseInput.value = "correct";
        // fireEvent.change(reponseInput);
        fireEvent.change(reponseInput, {
            target : {value : 'correct' },
        });
        expect(reponseInput.value).toEqual("correct");
    });

    it('Saisie du champ', () => {
        expect(reponseInput.value).toEqual("");
        fireEvent.change(reponseInput, {
            target : {value : 'correct' },
        });
        expect(reponseInput.value).toEqual("correct");
    });

    it('Submit de la bonne reponse', () => {
        fireEvent.change(reponseInput, {
            target : {value : 'correct' },
        });
        const buttonSubmit = intrigue.getByTestId('buttonSubmit');
        fireEvent.click(buttonSubmit);
        expect(renvoiIdSuivant).toHaveBeenCalledTimes(1);
        expect(renvoiIdSuivant).toHaveBeenCalledWith(0);
    });

    it('Submit de la mauvaise reponse', () => {
        fireEvent.change(reponseInput, {
            target : {value : 'mauvais' },
        });
        const buttonSubmit = intrigue.getByTestId('buttonSubmit');
        fireEvent.click(buttonSubmit);
        expect(renvoiIdSuivant).toHaveBeenCalledTimes(1);
        expect(renvoiIdSuivant).toHaveBeenCalledWith(1);
    });

    afterEach(() => {
        cleanup();
        renvoiIdSuivant.mockClear();
    });
});