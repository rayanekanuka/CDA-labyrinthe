// === Utils ===
const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

function pickRandomMazeData() {
    // Récupère toutes les tailles disponibles (clés de premier niveau)
    const sizes = Object.keys(data);
    const size = getRandomItem(sizes);

    // Récupère tous les exemples disponibles pour cette taille (clés du second niveau)
    const examples = Object.keys(data[size]);
    const ex = getRandomItem(examples);

    return { size, ex, labyData: data[size][ex] };
}

function renderMaze(labyData) {
    // Nettoyer le conteneur pour réafficher à neuf
    const container = document.getElementById('maze');
    container.innerHTML = '';

    // Créer et afficher le labyrinthe
    const labyrinthe = new Labyrinthe(labyData);
    labyrinthe.display();

    // Lancer directement la résolution
    labyrinthe.solve();

    return labyrinthe;
}

// === Chargement initial (choix fixe ou aléatoire) ===
// Si on veut garder un choix fixe au chargement, décommenter ceci:
// let size = '10';
// let ex = 'ex-1';
// renderMaze(data[size][ex]);

// Sinon: labyrinthe aléatoire dès le chargement
const first = pickRandomMazeData();
renderMaze(first.labyData);

// === Bouton "Labyrinthe au hasard" ===
document.getElementById('randomMaze').addEventListener('click', () => {
    const { size, ex, labyData } = pickRandomMazeData();
    console.log(`Labyrinthe tiré au hasard → size: ${size}, ex: ${ex}`);
    renderMaze(labyData);
});