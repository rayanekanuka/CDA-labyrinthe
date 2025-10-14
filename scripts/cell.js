class Cell {

    constructor(cellData) {
        this.rowX = cellData.posX; // lignes
        this.columnY = cellData.posY; // colonnes
        this.walls = cellData.walls; // murs

        this.width = 35; // largeur en px
        this.entrance = cellData.entrance; // entrée
        this.exit = (cellData.exit === true); // sortie
        this.visited = false; // visite
        this.cross = false; // intersection
    }

    // Création de la cellule dans le DOM
    getDOM() {
        let cellDOM = document.createElement('div');
        cellDOM.id = ['cell', this.rowX, this.columnY].join('-')
        cellDOM.style.width = this.width + 'px';
        cellDOM.style.height = this.width + 'px';
        cellDOM.style.border = 'solid 3px red';
        cellDOM.style.backgroundColor = 'black';

        // Entrée et sortie du labyrinthe
        if (this.entrance) {
            cellDOM.style.backgroundColor = 'gold';
            cellDOM.style.backgroundImage = "url('https://m.media-amazon.com/images/I/81dkKe0akYL.jpg')";
            cellDOM.style.backgroundSize = 90 + '%';
            cellDOM.style.backgroundRepeat = "no-repeat";
            cellDOM.style.backgroundPosition = "center";
        }
        if (this.exit) {
            cellDOM.style.backgroundColor = 'darkmagenta';
            cellDOM.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/60/60577.png')";
            cellDOM.style.backgroundSize = 75 + '%';
            cellDOM.style.backgroundRepeat = "no-repeat";
            cellDOM.style.backgroundPosition = "center";
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