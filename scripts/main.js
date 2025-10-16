// Selection du labyrinthe
let size = '10';
let ex = 'ex-1';
let labyData = data[size][ex];

// Création du labyrinthe
let labyrinthe = new Labyrinthe(labyData);

// On appelle la fonction 'display' pour lancer l'affichage
labyrinthe.display();

console.log("C'est l'entrée",labyrinthe.getStart())
console.log("C'est la sortie",labyrinthe.getExit())
console.log("----------------------------------------------")
// labyrinthe.getUnvisitedNeighbors(labyrinthe.getPosition(0, 2));
// console.log("----------------------------------------------")
// console.log("je suis passé par là ?", labyrinthe.pingVisited(labyrinthe.cells[30]))
labyrinthe.solve();