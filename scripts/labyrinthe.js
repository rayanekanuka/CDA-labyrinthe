class Labyrinthe {

    constructor(labyData) {
        this.cells = this.initCells(labyData);
    }


    initCells(labyData) {
        return labyData.map(cellData => new Cell(cellData));
    }

    display() {
        const container = document.getElementById('maze');
        container.innerHTML = '';

        const nbre_cells_largeur = Math.sqrt(this.cells.length);
        let computed_width = nbre_cells_largeur * this.cells[0].width;
        container.style.width = computed_width + 'px';
        // Ajoute la classe CSS 'main-container' à la div 
        container.classList.add('main-maze');
        // Get la representation DOM de chacune des cellules
        this.cells.forEach(cell => container.appendChild(cell.getDOM()));
    }

    getStart() {
        return this.cells.find(cell => cell.entrance);
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
        const neighbors = [];
        const dirs = [[-1,0],[0,1],[1,0],[0,-1]]; // Haut, Droite, Bas, Gauche
        for (let i=0;i<4;i++) {
            if (!cell.walls[i]) {
                const nx = cell.rowX + dirs[i][0];
                const ny = cell.columnY + dirs[i][1];
                const neighbor = this.getPosition(nx, ny);
                if (neighbor && !neighbor.visited) neighbors.push(neighbor);
            }
        }
        return neighbors;
    }

    // Réinitialise l'état des cellules pour relancer un algo
    resetVisited() {
        this.cells.forEach(cell => {
            cell.visited = false;
            const el = document.getElementById(`cell-${cell.rowX}-${cell.columnY}`);
            if (!el) return;

            // Couleur de fond par défaut
            if (cell.entrance) {
                el.style.backgroundColor = '#ece5f0';
            }
            else if (cell.exit) {
                el.style.backgroundColor = '#ece5f0';
            }
            else {
                el.style.backgroundColor = '#ece5f0';
                el.style.backgroundImage = 'none';
            }
        });
    }

    // Résolution par DFS (LIFO)
    async solveDFS(speed = 100) {
        stopAlgo = false;
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
            backtrack: '#548037',    // retourner en arrière
        };

        // Marquer la case de départ
        markPath(current);

        // Tant que la position courante n'est pas la sortie, parcours en profondeur
        while (!(current.rowX === exit.rowX && current.columnY === exit.columnY)) {
            if (stopAlgo) break;

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
        stopAlgo = false;
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
            explore: '#4FC3F7',  // bleu clair : exploration
            finalPath: '#1E88E5' // bleu foncé : chemin final
        };

        // Parcours en largeur
        while (queue.length > 0) {
            if (stopAlgo) break;
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