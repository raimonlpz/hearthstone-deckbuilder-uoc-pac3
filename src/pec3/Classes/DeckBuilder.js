/*
Classe 'DeckBuilder' amb els principals mètodes que ens permetran guardar la data de la nostra aplicació i filtrar-la.
*/
export default class DeckBuilder {
    constructor() {
        this.deckOfCards = [];
        this.cardsSessionCache = [];
        this.fetchedFiltersList = [];
        this.gameSelectorsOptions;
        this.selectorBase;
        this.selectors = {
            classes: 'all',
            sets: 'all',
            types: 'all',
            factions: 'all',
            qualities: 'all',
            races: 'all'
        };
        this.relationSelectorsInCardAttrb = {
            classes: 'playerClass',
            sets: 'cardSet',
            types: 'type',
            factions: 'faction',
            qualities: 'rarity',
            races: 'race'
        }
    }

    getSelectorZero() {
        return this.selectorBase;
    }
    setSelectorZero(newSelectorBase) {
        this.selectorBase = newSelectorBase;
    }

    /*
    Getter per als selectors utilitzats en una cerca específica
    */
    getSelectors() {
        return this.selectors;
    }

    saveSelectorsOptions(infoSelectors) {
        this.gameSelectorsOptions = infoSelectors;
    }
    getSelectorsOptions() {
        return this.gameSelectorsOptions;
    }

    /*
    Mètodes per afegir cartes i -noms de- classes al caché de la sessió. D'aquesta manera resulta més fàcil comprovar que 
    una classe determinada ja ha estat obtinguda de la API i recuperar per tant les cartes de la mateixa.
    */
    addFilterToCache(newFilter) {
        this.fetchedFiltersList.push(newFilter);
    }
    addCardToCache(cardsRequest) {
        this.cardsSessionCache.push(cardsRequest);
    }
    isFilterAlreadyFetched(newFilter) {
        return this.fetchedFiltersList.find(filterFetched => filterFetched == newFilter);
    }

    /*
    Mètodes per a obtenir cartes per classe i per ID del caché de la sessió.
    */
    getCardById(id) {
        return this.cardsSessionCache.find(card => card.cardId == id);
    }
    getCardsByFilterZero(filterSelector, filterZero) {
        return this.cardsSessionCache.filter(card => card[this.relationSelectorsInCardAttrb[filterSelector]] == filterZero);
    }

    filterCards(selector, value) {
        this.selectors[selector] = value;
        let filteredCache = this.getCardsByFilterZero(this.selectorBase, this.selectors[this.selectorBase]);
        let filteredResult = this.avoidDuplicationAtRealocationOfFilterZero(filteredCache);

        const keysSelector = Object.keys(this.selectors);
        keysSelector.splice(keysSelector.indexOf(this.selectorBase), 1);
        for (let key of keysSelector) {
            if (this.selectors[key] !== 'all') {
                filteredResult = filteredResult.filter((cards) => cards[this.relationSelectorsInCardAttrb[key]] === this.selectors[key]);
            }
        }
        return filteredResult;
    }

    avoidDuplicationAtRealocationOfFilterZero(filteredResult) {
        filteredResult.map((card, i) => {
            for (let x = 0; x < filteredResult.length; x++) {
                if (card.cardId == filteredResult[x].cardId && i != x) {
                    filteredResult.splice(filteredResult.indexOf(filteredResult[x]), 1);
                    x++;
                }
            }
        });
        return filteredResult;
    }

    realocateFilterZero(selector) {
        this.selectors[selector] = 'all';
        const keysSelector = Object.keys(this.selectors);
        let newSelectorBase = {};

        for (let key of keysSelector) {
            if (this.selectors[key] !== 'all') {
                newSelectorBase = {
                    [key]: this.selectors[key]
                }
                this.setSelectorZero(key);
                break;
            }
        }
        return newSelectorBase;
    }

    /*
    Mètodes específics de la PEC.3. Permetran crear a l'usuari un deck personalitzat. 
    */
    addCardToDeck(newCard) {
        if (this.deckOfCards.indexOf(newCard) == -1) {
            return this.deckOfCards.push(newCard);
        }
        console.log('Card already added to deck.');
    }
    deleteCardFromDeck(id) {
        let cardToDelete = this.deckOfCards.find((card) => card.cardId == id);
        this.deckOfCards = this.deckOfCards.filter((card) => card != cardToDelete);
    }
    getDeckOfCards() {
        return this.deckOfCards;
    }
}
