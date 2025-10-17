// === Utils ===
const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

function pickRandomMazeData() {
    // Récupère toutes les tailles disponibles (clés de premier niveau)
    const sizes = Object.keys(data);
    const size = getRandomItem(sizes);

    // Récupère tous les exemples disponibles pour cette taille (clés du second niveau)
    const examples = Object.keys(data[size]);
    const ex = getRandomItem(examples);

    console.log("Random choisi :", size, ex);

    return {size, ex, labyData: data[size][ex]};
}

let currentMaze = null;

function renderMaze(labyData) {
    // Nettoyer le conteneur pour réafficher à neuf
    const container = document.getElementById('maze');
    container.innerHTML = '';

    // Créer et afficher le labyrinthe
    const labyrinthe = new Labyrinthe(labyData);
    labyrinthe.display();

    return labyrinthe;
}

// === Chargement initial ===
const first = pickRandomMazeData();
currentMaze = renderMaze(first.labyData);

// === Bouton "Labyrinthe aléatoire" ===
document.getElementById('randomMaze').addEventListener('click', () => {
    const {size, ex, labyData} = pickRandomMazeData();
    console.clear();
    console.log(`🎲 Nouveau labyrinthe → ${size}x${size} (${ex})`);
    currentMaze = renderMaze(labyData);
});

// === Bouton "DFS" ===
document.getElementById('btn-dfs').addEventListener('click', async () => {
    if (!currentMaze) return;

    currentMaze.resetVisited();
    console.clear();
    console.log("🚀 Lancement DFS...");
    await currentMaze.solveDFS(70);
});

// === Bouton "BFS" ===
document.getElementById('btn-bfs').addEventListener('click', async () => {
    if (!currentMaze) return;

    currentMaze.resetVisited();
    console.clear();
    console.log("🌊 Lancement BFS...");
    await currentMaze.solveBFS(70);
});