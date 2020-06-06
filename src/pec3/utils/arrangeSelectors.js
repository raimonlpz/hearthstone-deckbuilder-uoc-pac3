import Selectors from '../Classes/Selectors.js';
/*
El mètode arrangeSelectors em permet abstreure la lògica de crear una instància de la classe 'Selectors' i associar-la
a l'objecte passat com a paràmetre que recuperaré de la crida a la API (endpoint INFO).
*/
export default function arrangeSelectors(selector) {
    let selectors = new Selectors();

    selectors.classes = selector.classes;
    selectors.sets = selector.sets;
    selectors.types = selector.types;
    selectors.races = selector.races;
    selectors.factions = selector.factions;
    selectors.qualities = selector.qualities;

    return selectors;
}