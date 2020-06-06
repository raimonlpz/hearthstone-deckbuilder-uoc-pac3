/*
Model per a la classe Selectors, amb les propietats/filtres que ens interessen passats pel constructor. 
*/
export default class Selectors {
    constructor(classes, sets, types, races, factions, qualities) {
        this.classes = classes;
        this.sets = sets;
        this.types = types;
        this.races = races;
        this.factions = factions;
        this.qualities = qualities;
    }
}