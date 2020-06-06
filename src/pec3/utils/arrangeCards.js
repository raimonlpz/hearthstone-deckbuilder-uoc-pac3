import Card from '../Classes/Card.js';
/*
El mètode 'arrangeCards' ens permet crear una instància de la class Card i associar-la a l'objecte recuperat de l'Api,
netejant-lo d'imperfeccions com valors indefinits o absents per mitjà d'operadors ternaris. He optat pel comodí 
'null' ja que indica que aquesta propietat no té cap valor ni el tindrà en un futur.
Tanmateix he muntat sobre la propietat cardID la url de la imatge.
*/
export default function arrangeCards(c) {
    let card = new Card(
        c.cardId,
        c.name,
        c.cardSet,
        c.type,
        c.health ?? null,
        c.text ?? null,
        c.playerClass,
        c.locale,
        c.rarity ?? null,
        c.faction ?? null,
        c.race ?? null,
        mountUrl(c.cardId),
        c.attack ?? null,
        c.cost ?? null,
        c.flavor ?? null,
        c.artist ?? null
    );
    return card;
}
function mountUrl(id) {
    return `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${id}.png`;
}


