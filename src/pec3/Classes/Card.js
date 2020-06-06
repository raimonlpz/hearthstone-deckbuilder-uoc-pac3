/*
Model per a la classe Card, amb totes les propietats que ens interessen passades pel constructor. Netejem aquestes
propietats de qualsevol incidència/imperfecció al script 'utils/arrangeCards.js'.
*/
export default class Card {
    constructor(cardId, name, cardSet, type, health, text, playerClass, locale, rarity, faction, race, imageURL, attack, cost, flavor, artist) {
        this.cardId = cardId;
        this.name = name;
        this.cardSet = cardSet;
        this.type = type;
        this.health = health;
        this.text = text;
        this.playerClass = playerClass;
        this.locale = locale;
        this.rarity = rarity;
        this.faction = faction;
        this.race = race;
        this.imageURL = imageURL;
        this.attack = attack;
        this.cost = cost;
        this.flavor = flavor;
        this.artist = artist;
    }
}