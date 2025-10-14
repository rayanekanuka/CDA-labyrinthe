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
        start.visited = true
        return start
    }

    getExit() {
        return this.cells.find(cell => cell.exit);
    }

    getPosition(x, y) {
        return this.cells.find(element => element.rowX === x && element.columnY === y);
    }

    setPlayer() {
        this.PlayerX = this.getStart().rowX
        this.PlayerY = this.getStart().columnY
    }

    displayPlayer() {
        let pawn = document.createElement("img")
        $(pawn).attr("src", "https://cdn.bizzotto.com/media/catalog/product/cache/03c842fc66811009131946d59a1902eb/0/7/0790653_-decorazione_chess_pedone_antracite_1648434469.jpg")
        document.getElementById(this.PlayerX + "-" + this.PlayerY).append(pawn)
    }

    getUnvisitedNeighbors(cell) {
        console.log('Nous avons ici')
        console.log('posX', cell.rowX)
        console.log('posY', cell.columnY)
        console.log('walls', cell.walls)
        console.log('visited', cell.visited)

        let neighbors = []
        if (!cell.walls[0]) {
            neighbors.push(this.getPosition(cell.rowX - 1, cell.columnY)); // Haut
        }
        if (!cell.walls[1]) {
            neighbors.push(this.getPosition(cell.rowX, cell.columnY + 1)); // Droite
        }
        if (!cell.walls[2]) {
            neighbors.push(this.getPosition(cell.rowX + 1, cell.columnY)); // Bas
        }
        if (!cell.walls[3]) {
            neighbors.push(this.getPosition(cell.rowX, cell.columnY - 1)); // Gauche
        }
        console.log("cases dispos :", neighbors)
        return neighbors
    }

    pingVisited(cell) {
        return cell.isVisited()
    }

    moves() {
        this.getUnvisitedNeighbors(this.getPosition(this.rowX, this.columnY));
        // this.PlayerX = ...
        // this.PlayerY = ...
        // this.pingVisited()

    }

    solve() {
        if (!(this.PlayerX === this.getExit().rawX && this.PlayerY === this.getExit().columnY)) {
            this.movePlayer()
            this.displayPlayer()
        } else {
            console.log("BRAVO c'est gagné !!!!!!")
        }
    }

    // let directions = [
    //     {x:-1, y: 0},
    //     {x:0, y: 1},
    //     {x:1, y: 0},
    //     {x:0, y: -1}, 
    // ];

}