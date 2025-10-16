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
        let container = document.getElementById('labyby');

        // On calcule la largeur (en nombre de cellules)
        // ex : si 9 cellules --> carré de taille 3 x 3 cellules 
        let nbre_cells_largeur = Math.sqrt(this.cells.length);

        // Compute width du main container
        let computed_width = nbre_cells_largeur * this.cells[0].width;

        container.style.width = computed_width + 'px';

        // Ajoute la classe CSS 'main-container' à la div 
        container.classList.add('main-labyby');

        // Get la representation DOM de chacune des cellules
        for (let cell of this.cells) {
            let cellDOM = cell.getDOM();
            container.appendChild(cellDOM);
        }

    }

    getStart() {
        let start = this.cells.find(cell => cell.entrance);
        start.visited = true;
        return start;
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
        // Haut, Droite, Bas, Gauche (en cohérence avec l'ordre des murs)
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

    // Résolution intuitive (DFS avec retour arrière)
    solve() {
        const start = this.getStart();
        const exit = this.getExit();
        let current = start;
        const stack = [];

        // Optionnel: marquer visuellement le chemin
        const markPath = (cell, on) => {
            try {
                const el = document.getElementById(['cell', cell.rowX, cell.columnY].join('-'));
                if (el) {
                    el.style.backgroundColor = on ? '#1f6feb' : (cell.exit ? 'darkmagenta' : (cell.entrance ? 'gold' : 'black'));
                }
            } catch (_) { /* no-op */ }
        };

        markPath(current, true);

        // Tant que la position courante n'est pas la sortie
        while (!(current.rowX === exit.rowX && current.columnY === exit.columnY)) {
            const unvisited = this.getUnvisitedNeighbors(current);
            if (unvisited.length > 0) {
                // Aller sur un voisin non visité
                stack.push(current);
                const next = unvisited[0];
                next.visited = true;
                current = next;
                markPath(current, true);
            } else {
                // Revenir en arrière jusqu'à trouver une case avec un voisin non visité
                if (stack.length === 0) {
                    console.warn("Aucun chemin vers la sortie n'a été trouvé.");
                    return false;
                }
                const back = stack.pop();
                current = back;
                // on conserve le marquage des cases du chemin actuel
            }
        }
        console.log('Sortie trouvée !');
        return true;
    }

}