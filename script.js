// Obtenez le canvas et son contexte 2D
//Canvas = élément HTML5 qui fournit un espace de dessin dynamique en utilisant JavaScript
//Il est utilisé pour dessiner des graphiques, des animations, des jeux, etc. 
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Définir la taille de la grille
let grid = 16;
let count = 0;

// Définir les propriétés du serpent
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

// Définir les propriétés de la pomme
let apple = {
    x: 320,
    y: 320
};

// Fonction pour obtenir un entier aléatoire dans un intervalle
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Boucle principale du jeu
function loop() {
    requestAnimationFrame(loop);

    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    // Gestion des collisions avec les bords du canvas
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    // Limiter la longueur du serpent
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Dessiner la pomme
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

    // Dessiner le serpent
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
        context.fillRect(cell.x, cell.y, grid-1, grid-1);

        // Vérifier si le serpent a mangé la pomme
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;

            // Placer une nouvelle pomme aléatoirement
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // Vérifier si le serpent s'est mordu la queue
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // Réinitialiser le jeu
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                // Placer une nouvelle pomme aléatoirement
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

// Gérer les événements de pression des touches
document.addEventListener('keydown', function(e) {
    // Utiliser la propriété "key" pour détecter la touche appuyée
    let key = e.key;

    if (key === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

// Démarrer la boucle de jeu
requestAnimationFrame(loop);
