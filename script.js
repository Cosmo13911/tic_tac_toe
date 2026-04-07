const grids = document.querySelectorAll('.grid');
const startBtn = document.querySelector('button');
const statusText = document.querySelector('.status');

let gameActive = false;
let currentPlayer = 'X';

statusText.innerText = 'Click Start Button to Start!'

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function active() {
    if (this.classList.contains('active') || !gameActive) {
        return;
    }
    statusText.innerText = `Player: ${currentPlayer}`
    addPlayerStyle(this);
    this.classList.add('active');
    this.innerText = currentPlayer;
    console.log("current player"  + currentPlayer);
    
    end();
}

function start() {
    gameActive = true;
    grids.forEach(grid => {
        grid.classList.remove('active', 'xPlayer', 'oPlayer');
        grid.innerText = '';
    });
    statusText.innerText = `Player: ${currentPlayer}`
}

function end() {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        console.log(a,b,c);
        console.log('status: ' + isActive(grids[a]));
        console.log('status: ' + isActive(grids[b]));
        console.log('status: ' + isActive(grids[c]));
        
        if (isActive(grids[a]) !== '' && isActive(grids[a]) === isActive(grids[b]) && isActive(grids[b]) === isActive(grids[c])){
            gameActive = false;
            console.log([grids[a], grids[b], grids[c]]);
            statusText.innerText = `Player "${currentPlayer}" Win!`;
            break;
        }
    }
    if (gameActive && [...grids].every(grid => isActive(grid) !== '')) {
        statusText.innerText = `Draw!`;
        gameActive = false;
    }
    
    if (gameActive) {
        currentPlayer = currentPlayer == 'X' ? 'O': 'X';
        statusText.innerText = `Player: ${currentPlayer}`
    }
}

function isActive(grid) {
    if (grid.classList.contains('xPlayer')) {
        return 'X';
    }
    else if (grid.classList.contains('oPlayer')) {
        return 'O';
    }
    else {
        return '';
    }
}

function addPlayerStyle(player) {
    if (currentPlayer == 'X') {
        player.classList.add('xPlayer');
    }
    else {
        player.classList.add('oPlayer');
    }
}

grids.forEach(grid => grid.addEventListener('click', active));
grids.forEach(grid => grid.classList.add('active'));
startBtn.addEventListener('click', start);
