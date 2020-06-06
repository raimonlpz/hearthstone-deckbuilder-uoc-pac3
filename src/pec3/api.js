import { API_ENDPOINT, getEndpoint } from './config.js';
import DeckBuilder from './Classes/DeckBuilder.js';
import arrangeCards from './utils/arrangeCards.js';
import arrangeSelectors from './utils/arrangeSelectors.js';

/*
Instància de la classe principal DeckBuilder. Ens servirà per a poblar tota la info necessària per al correcte
funcionament de l'aplicació adquirida a les diferents crides de la API i per a guardar la data al caché de la sessió i 
optimitzar el seu funcionament, evitant crides innecessàries. 
*/
let myDeck = new DeckBuilder();

/*
Mètode per a extreure la data dels diferents selectors de cartes i els seus valors. Si el cridem per primer cop 
-inici sessió- cridem a la API, sinó guardem ja la data al deckBuilder i fem la comprovació.
*/
export async function getInfoApi() {
    let optionsAlreadyFetched = myDeck.selectorsOptions;
    if (optionsAlreadyFetched) {
        return optionsAlreadyFetched;
    }
    let infoApi = await getEndpoint(`${API_ENDPOINT.INFO}`);
    let selectorsInfo = arrangeSelectors(infoApi);
    myDeck.selectorsOptions = selectorsInfo;
    return myDeck.selectorsOptions;
}

/*
Mètode per extreure les cartes per un filtre determinat. A l'igual que amb la info general dels selectors. 
Inicialment fem la comprovació per veure si ja tenim les cartes del filtre específic guardades al DeckBuilder, 
si és així les obtenim directament d'aquí. Sinó fem una nova crida a la API i guardem les cartes noves al 
caché per a futures cerques.
*/
export async function getCardsByFilterZero(filterSelector, filterVal) {
    let filterIsAlreadyFetched = myDeck.isFilterAlreadyFetched(filterVal);
    if (filterIsAlreadyFetched) {
        myDeck.selectors[filterSelector] = filterVal;
        return myDeck.getCardsByFilterZero(filterSelector, filterVal);
    }
    await getEndpoint(`${API_ENDPOINT.BY_FILTER}${filterSelector}/${filterVal}`).then((cards) => {
        try {
            myDeck.selectors[filterSelector] = filterVal;
            cards.map((card) => {
                let newCard = arrangeCards(card);
                myDeck.addCardToCache(newCard);
            });
        } catch (e) {
            throw new Error('Choice not found.');
        }
    });
    myDeck.addFilterToCache(filterVal);
    return myDeck.getCardsByFilterZero(filterSelector, filterVal);
}

/*
Mètode per a extreure cartes per ID. Mateix procediment. Comprovem que la carta no estigui ja guardada al 
caché de la sessió, si és així la recuperem directament del DeckBuilder. Si no és així cridem a la API.
*/
export async function getCardById(cardId) {
    let card = myDeck.getCardById(cardId);
    if (!card) {
        let newCard;
        await getEndpoint(`${API_ENDPOINT.BY_ID}${cardId}`).then((_card) => {
            if (_card.length > 0) {
                newCard = arrangeCards(_card[0]);
                myDeck.addCardToCache(newCard);
            } else {
                throw new Error('ID not found');
            }
        });
        return newCard;
    } else {
        return card;
    }
}

/*
Mètode per filtrar les cartes pels altres selectors disponibles. Podem observar com aquí no cridem a la API de cap de les
maneres, ja que és més òptim filtrar les cartes partint sempre d'un filtre base seleccionat prèviament. Així
fem el filtratge sobre les cartes guardades al nostre DeckBuilder i evitem peticions innecessàries.
El mètode accepta dos paràmetres que seràn poblats per la pròpia interacció dels usuaris amb els inputs dels formulari
i les seves opcions -mirar interfície-. 
*/
export function filterCards(selector, value) {
    let filteredCards = myDeck.filterCards(selector, value);
    console.log(`${filteredCards.length} cards found`);
    return filteredCards;
}

/*
Mètode que recupera els selectors específics de l'última de les cerques.
*/
export function getSelectors() {
    return myDeck.getCurrentSelectors();
}

/*
Mètodes per a permetre a l'usuari crear un deck personalitzat. 
*/
export function addCardToDeck(newCard) {
    myDeck.addCardToDeck(newCard);
}
export function deleteCardFromDeck(idCard) {
    myDeck.deleteCardFromDeck(idCard);
}
export function getCardsFromDeck() {
    return myDeck.getDeckOfCards();
}

/*
Mètodes per fer 'tracking' del selector Base/Zero. A partir del qual aplicar la resta de filtres.
*/
export function getSelectorZero() {
    return myDeck.selectorZero;
}
export function setSelectorZero(newSelectorBase) {
    myDeck.selectorZero = newSelectorBase;
}
export function realocateFilterZero(selector) {
    return myDeck.realocateFilterZero(selector);
}