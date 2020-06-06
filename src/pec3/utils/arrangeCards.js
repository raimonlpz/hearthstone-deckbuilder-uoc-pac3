import Card from '../Classes/Card.js';
/*
El mètode 'arrangeCards' ens permet crear una instància de la class Card i associar-la a l'objecte recuperat de l'Api,
netejant-lo d'imperfeccions com valors indefinits o absents per mitjà d'operadors ternaris. He optat pel comodí 
'null' ja que indica que aquesta propietat no té cap valor ni el tindrà en un futur.
Tanmateix he muntat sobre la propietat cardID la url de la imatge.
*/
export default function arrangeCards(card) {
    let _card = new Card();

    _card.cardId = card.cardId;
    _card.name = card.name;
    _card.cardSet = card.cardSet;
    _card.type = card.type;
    _card.health = card.health ?? null;
    _card.text = card.text ?? null;
    _card.playerClass = card.playerClass;
    _card.locale = card.locale;
    _card.rarity = card.rarity ?? null;
    _card.faction = card.faction ?? null;
    _card.race = card.race ?? null;
    _card.imageURL = mountUrl(card.cardId);
    _card.attack = card.attack ?? null;
    _card.cost = card.cost ?? null;
    _card.flavor = card.flavor ?? null;
    _card.artist = card.artist ?? null;

    return _card;
}

function mountUrl(id) {
    return `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${id}.png`;
}


