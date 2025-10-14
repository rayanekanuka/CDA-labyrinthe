class Cell {

    constructor(cellData) {
        this.rowX = cellData.posX; // lignes
        this.columnY = cellData.posY; // colonnes
        this.walls = cellData.walls; // murs

        this.width = 70; // largeur en px
        this.entrance = cellData.entrance; // entrée
        this.exit = (cellData.exit === true); // sortie
        this.visited = false; // visite
        this.cross = false; // intersection 
    }

    // On 'fabrique' une div pour la cellule
    getDOM() {
        let cellDOM = document.createElement('div');
        cellDOM.id = ['cell', this.rowX, this.columnY].join('-')
        cellDOM.style.width = this.width + 'px';
        cellDOM.style.height = this.width + 'px';
        cellDOM.style.border = 'solid 1px red';
        cellDOM.style.backgroundColor = 'black';

        // Entrée et sortie du labyrinthe
        if (this.entrance) {
            cellDOM.style.backgroundColor = 'gold';
        }
        if (this.exit) {
            cellDOM.style.backgroundColor = 'darkmagenta';
        }
        // Bordure de chaque cellule
        cellDOM.style.borderWidth = this.computeBorders();
        return cellDOM;
    }

    // Fonction fléchée + opérateur ternaire "?"" (alors) ":" (sinon)
    // [true, true, false, true] en '1px 1px 0px 1px' 
    computeBorders() {
        return this.walls.map(wall => wall ? '1px' : '0px').join(' ')
    }

    setVisited() {
        this.visited = true
    }

    isVisited(){
        return this.visited
    }

}