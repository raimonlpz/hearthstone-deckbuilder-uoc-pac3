import { getCardsByFilterZero, getCardById, getInfoApi, getSelectors, filterCards, addCardToDeck, deleteCardFromDeck, getCardsFromDeck, getSelectorZero, setSelectorZero, realocateFilterZero } from './api.js';

const $deckDisplayer = document.getElementById('hearthStone_cardSelector');
const $cardSummaryStats = document.getElementById('hearthStone_cardSummaryStats');
const $deckBuilderCards = document.getElementById('hearthStone_deckBuilderCards');
const $classesSelectorOptions = document.getElementById('hearthStone_sidebarSelectors');

let optionsSetUp = false;

export default async function init() {
    renderPlaceholder();
    if (!optionsSetUp) {
        await renderSelectors();
        optionsSetUp = true;
    }
    let _selectors = getSelectors();
    console.log(_selectors);
}

function listenToSelectors(filter) {
    const $typeCard = document.getElementById(filter);
    $typeCard.addEventListener('change', (e) => {
        const typeCardFilter = $typeCard.options[$typeCard.selectedIndex].value;
        console.log(typeCardFilter);
        renderImgGrid(filter, typeCardFilter);
    });
}

function renderPlaceholder() {
    return $deckDisplayer.innerHTML = `<div class="placeholder-zero-results">
    <img class="imagedec" src="https://d30itml3t0pwpf.cloudfront.net/api/v3/medias/12450786/image/original/1503526057.png">
    <h2>Choose any filter & add Cards to Deck!</h2>
    </div>`;
}

function renderSingleSelector(attrb, textNode, domEl) {
    let option = document.createElement('option');
    option.setAttribute('value', attrb);
    let textnode = document.createTextNode(textNode);
    option.appendChild(textnode);
    domEl.appendChild(option);
}

async function renderSelectors() {
    let infoGame = await getInfoApi();
    let infoList = Array.from(Object.keys(infoGame));

    infoList.forEach((filter) => {
        const selectEl = document.createElement('select');
        selectEl.name = filter;
        selectEl.setAttribute('id', filter);
        selectEl.className = 'select-css';

        renderSingleSelector('all', `All ${filter}`, selectEl);
        infoGame[filter].map((subfilter) => {
            renderSingleSelector(subfilter, subfilter, selectEl);
        });
        $classesSelectorOptions.appendChild(selectEl);
        listenToSelectors(filter);
    });

    console.log('INFO GAME:');
    console.table(infoGame);
}

function renderUpdatesInDeck() {
    let deckUpdate = getCardsFromDeck();
    for (let _card of deckUpdate) {
        let newCardToDeck = document.createElement('li');
        newCardToDeck.innerHTML = `${_card.name}`;
        newCardToDeck.setAttribute('id', _card.cardId);
        $deckBuilderCards.appendChild(newCardToDeck);
        newCardToDeck.addEventListener('click', (e) => {
            deleteCardFromDeck(e.target.id);
            newCardToDeck.remove();
        });
        newCardToDeck.addEventListener('mouseover', async (e) => {
            let cardHovered = await getCardById(e.target.id);
            $cardSummaryStats.innerHTML = '';

            let keysList = Object.keys(cardHovered);
            for (let _key of keysList) {
                if (cardHovered[_key] != null && _key != 'imageURL') {
                    renderInfoCardHovered(_key, cardHovered, $cardSummaryStats);
                }
            }
        });
    }
}

let isInitialFiltering = true;

async function renderImgGrid(selector, value) {
    $deckDisplayer.innerHTML = '<div class="loader">Loading...</div>';

    if (isInitialFiltering) {
        await getCardsByFilterZero(selector, value);
        setSelectorZero(selector);
        isInitialFiltering = false;
    }

    if (selector == getSelectorZero()) {
        if (value == 'all') {
            filterCards(selector, value); // & update selectors
            let infoSelectors = getSelectors();
            let selectors = Object.keys(infoSelectors);
            let allSelectorsAreAll = true;
            for (let selector of selectors) {
                if (infoSelectors[selector] != 'all') {
                    allSelectorsAreAll = false;
                    break;
                }
            }
            if (allSelectorsAreAll) {
                setSelectorZero('');
                isInitialFiltering = true;
                return renderPlaceholder();
            }
            let filtBase = realocateFilterZero(selector);
            await getCardsByFilterZero(Object.keys(filtBase), Object.values(filtBase));
        } else {
            await getCardsByFilterZero(selector, value);
        }
    }

    let filteredCards = filterCards(selector, value).reverse();
    $deckDisplayer.innerHTML = '';

    if (filteredCards.length == 0) {
        return $deckDisplayer.innerHTML = '<div class="placeholder-zero-results"><h2>No Search Results</h2></div>';
    }

    for (let card of filteredCards) {
        let img = document.createElement('img');
        img.src = card.imageURL;
        img.onerror = function () {
            img.src = 'http://www.josepserra.com/web/uoc/nocard.png';
        }
        img.setAttribute('class', 'imgbox');
        img.setAttribute('id', card.cardId);
        img.addEventListener('click', async (e) => {
            $deckBuilderCards.innerHTML = '';
            let cardSelected = await getCardById(e.target.id);
            addCardToDeck(cardSelected);
            renderUpdatesInDeck();
        });

        /* CARD SUMMARY */
        img.addEventListener('mouseover', async (e) => {
            let cardHovered = await getCardById(e.target.id);
            $cardSummaryStats.innerHTML = '';

            let keysList = Object.keys(cardHovered);
            for (let _key of keysList) {
                if (cardHovered[_key] != null && _key != 'imageURL') {
                    renderInfoCardHovered(_key, cardHovered, $cardSummaryStats);
                }
            }
        });
        $deckDisplayer.appendChild(img);
    }
    console.log('CARDS (selectors/filters) Search:')
    console.log(filteredCards);
    return filteredCards;
}

function renderInfoCardHovered(_key, cardHovered, cardSummaryStats) {
    let keyEl = document.createElement('li');
    keyEl.innerHTML = `${_key.toUpperCase()}: ${cardHovered[_key]}`;
    cardSummaryStats.appendChild(keyEl);
}