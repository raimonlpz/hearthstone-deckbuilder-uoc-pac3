import init from "./pec3";
console.log("JS per a programadors (UOC). Raimon López Mor");


/* La funció init és l'entrada de tota la lògica. El programa s'inicialitza aquí, filtrant per defecte les cartes 
per la classe 'Death Knight', i fent per tant la primera request a la API. 
*/
init();


/*
Aquí capturem els diferents inputs de l'aplicació i hi afegim listeners que permetran a l'usuari interactuar
amb els selectors disponibles i combinar-los per a cercar cartes amb propietats específiques. Per cada
nova opció seleccionada, el mètode init es reactiva i efectua un nou filtratge. Com podem veure el mètode accepta
dos paràmetres, primer el tipus de selector i després el valor específic.
*/



