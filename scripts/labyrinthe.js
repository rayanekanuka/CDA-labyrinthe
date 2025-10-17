class Labyrinthe {

    constructor(labyData) {
        this.cells = this.initCells(labyData);
    }

    initCells(labyData) {
        let cells = [];
        for (let cellData of labyData) {
            let cell = new Cell(cellData);
            cells.push(cell);
        }
        return cells;
    }

    display() {

        // Get le container principal
        let container = document.getElementById('maze');

        // On calcule la largeur (en nombre de cellules)
        // ex : si 9 cellules --> carré de taille 3 x 3 cellules 
        let nbre_cells_largeur = Math.sqrt(this.cells.length);

        // Compute width du main container
        let computed_width = nbre_cells_largeur * this.cells[0].width;

        container.style.width = computed_width + 'px';

        // Ajoute la classe CSS 'main-container' à la div 
        container.classList.add('main-maze');

        // Get la representation DOM de chacune des cellules
        for (let cell of this.cells) {
            let cellDOM = cell.getDOM();
            container.appendChild(cellDOM);
        }

    }

    getStart() {
        return this.cells.find(cell => cell.entrance);
    }

    // Réinitialise l'état des cellules pour relancer un algo
    resetVisited() {
        this.cells.forEach(cell => {
            cell.visited = false;

            // remettre la couleur initiale
            const el = document.getElementById(`cell-${cell.rowX}-${cell.columnY}`);
            if (el) el.style.backgroundColor = '';
        });
    }

    getExit() {
        return this.cells.find(cell => cell.exit);
    }

    getPosition(x, y) {
        return this.cells.find(element => element.rowX === x && element.columnY === y);
    }

    // Renvoie les voisins accessibles (sans mur) et non visités
    getUnvisitedNeighbors(cell) {
        if (!cell) return [];

        let neighbors = [];
        // Haut, Droite, Bas, Gauche
        if (!cell.walls[0]) {
            const up = this.getPosition(cell.rowX - 1, cell.columnY);
            if (up && !up.visited) neighbors.push(up);
        }
        if (!cell.walls[1]) {
            const right = this.getPosition(cell.rowX, cell.columnY + 1);
            if (right && !right.visited) neighbors.push(right);
        }
        if (!cell.walls[2]) {
            const down = this.getPosition(cell.rowX + 1, cell.columnY);
            if (down && !down.visited) neighbors.push(down);
        }
        if (!cell.walls[3]) {
            const left = this.getPosition(cell.rowX, cell.columnY - 1);
            if (left && !left.visited) neighbors.push(left);
        }
        return neighbors;
    }

    pingVisited(cell) {
        return cell.isVisited();
    }

    // Résolution par DFS (LIFO)
    async solveDFS(speed = 100) {
        const start = this.getStart();
        const exit = this.getExit();
        let current = start;
        const stack = [];
        const path = [];

        // Délai pour le chemin
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Coloration du chemin
        const markPath = (cell, color) => {
            const el = document.getElementById(`cell-${cell.rowX}-${cell.columnY}`);
            if (el) el.style.backgroundColor = color;
        };

        // Couleurs utilisées
        const colors = {
            path: '#E9A551',      // exploration
            backtrack: '#444',    // retourner en arrière
        };

        // Marquer la case de départ
        markPath(current);

        // Tant que la position courante n'est pas la sortie, parcours en profondeur
        while (!(current.rowX === exit.rowX && current.columnY === exit.columnY)) {
            const unvisited = this.getUnvisitedNeighbors(current);

            if (unvisited.length > 0) {
                stack.push(current);
                const next = unvisited[0];
                next.visited = true;
                current = next;

                markPath(current, colors.path);
                // enregistrer les coordonnées dans le chemin
                path.push([current.rowX, current.columnY]);

            } else {
                if (stack.length === 0) {
                    console.warn("Aucun chemin trouvé !");
                    return false;
                }
                const back = stack.pop();
                current = back;

                markPath(current, colors.backtrack);
            }

            await delay(speed);
        }

        // Sortie atteinte
        console.log("Sortie trouvée !");
        console.log("Chemin parcouru :", path);
        return path;
    }

    // Résolution par BFS
    async solveBFS(speed = 100) {
        const start = this.getStart();
        const exit = this.getExit();

        // file d’attente (queue, FIFO)
        const queue = [start];
        const cameFrom = new Map(); // pour reconstruire le chemin plus tard
        start.visited = true;

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        const markPath = (cell, color) => {
            const el = document.getElementById(`cell-${cell.rowX}-${cell.columnY}`);
            if (el) el.style.backgroundColor = color;
        };

        const colors = {
            explore: '#4FC3F7',  // bleu clair : exploration en largeur
            finalPath: '#1E88E5' // bleu foncé : chemin final trouvé
        };

        // Parcours en largeur
        while (queue.length > 0) {
            const current = queue.shift(); // prend la 1re cellule de la file
            if (current.rowX === exit.rowX && current.columnY === exit.columnY) {
                console.log("Sortie trouvée avec BFS !");
                break;
            }

            const neighbors = this.getUnvisitedNeighbors(current);
            for (const neighbor of neighbors) {
                if (!neighbor.visited) {
                    neighbor.visited = true;
                    cameFrom.set(neighbor, current); // on mémorise d’où on vient
                    queue.push(neighbor);
                    markPath(neighbor, colors.explore);
                    await delay(speed);
                }
            }
        }

        // Reconstruction du chemin final
        let path = [];
        let current = exit;
        while (cameFrom.has(current)) {
            path.push(current);
            current = cameFrom.get(current);
        }
        path.reverse();

        // Animation du chemin final
        for (const cell of path) {
            markPath(cell, colors.finalPath);
            await delay(50);
        }

        console.log("🧭 Chemin le plus court :", path.map(c => [c.rowX, c.columnY]));
    }

}