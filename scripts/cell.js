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
        cellDOM.style.border = 'solid 3px black';
        cellDOM.style.backgroundColor = '#ece5f0';

        // Entrée et sortie du labyrinthe
        if (this.entrance) {
            cellDOM.style.backgroundImage = "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDl5MzRwZ2Y3MjRydjJmdGM0aXhudWlxcmZ2bDlya2NmYjdrbzBpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/91BCkba1STSmzb4UWK/giphy.gif')";
            cellDOM.style.backgroundSize = 90 + '%';
            cellDOM.style.backgroundRepeat = "no-repeat";
            cellDOM.style.backgroundPosition = "center";
        }
        if (this.exit) {
            cellDOM.style.backgroundImage = "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGptN3pzczVqdWt4eXhsOTRiMnl5MmExcnFkcTBnczZ5c20xajAyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YUOfIPbz85vmhT2J6y/giphy.gif')";
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

}