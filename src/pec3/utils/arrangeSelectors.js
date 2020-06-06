import Selectors from '../Classes/Selectors.js';
/*
El mètode arrangeSelectors em permet abstreure la lògica de crear una instància de la classe 'Selectors' i associar-la
a l'objecte passat com a paràmetre que recuperaré de la crida a la API (endpoint INFO).
*/
export default function arrangeSelectors(s) {
    let selector = new Selectors(
        s.classes,
        s.sets,
        s.types,
        s.races,
        s.factions,
        s.qualities
    );
    return selector;
}