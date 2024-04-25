let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let intervalId;

const main = document.querySelector('main');

document.querySelector('.start').addEventListener('click', function() {
    this.remove();
    console.log('Image clicked, starting...');
    document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
});
//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Populates the maze in the HTML
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('solid');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);
    }
}

//Player movement
function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}



const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;

setInterval(move, 10);

function move() {
    pointCheck();

    if (downPressed) {
        let position = player.getBoundingClientRect()
        let newBottom = position.bottom + 1;

        let btmL = document.elementFromPoint(position.left, newBottom);
        let btmR = document.elementFromPoint(position.right, newBottom);
        if (btmL.classList.contains('solid') == false && btmR.classList.contains('solid') == false) {
            playerTop++;
            player.style.top = playerTop + 'px';
        }
    }
    else if (upPressed) {
        let position = player.getBoundingClientRect()
        let newTop = position.top - 1;

        let btmL = document.elementFromPoint(position.left, newTop);
        let btmR = document.elementFromPoint(position.right, newTop);
        if (btmL.classList.contains('solid') == false && btmR.classList.contains('solid') == false) {
            playerTop--;
            player.style.top = playerTop + 'px';
        }
    }
    else if (leftPressed) {
        let position = player.getBoundingClientRect()
        let newLeft = position.left - 1;

        let btmL = document.elementFromPoint(newLeft, position.top);
        let btmR = document.elementFromPoint(newLeft, position.bottom);
        if (btmL.classList.contains('solid') == false && btmR.classList.contains('solid') == false) {
            playerLeft--;
            player.style.left = playerLeft + 'px';
        }
    }
    else if (rightPressed) {
        let position = player.getBoundingClientRect()
        let newRight = position.right + 1;

        let btmL = document.elementFromPoint(newRight, position.top);
        let btmR = document.elementFromPoint(newRight, position.bottom);
        if (btmL.classList.contains('solid') == false && btmR.classList.contains('solid') == false) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
        }
    }
}
function pointCheck() {
    const position = player.getBoundingClientRect();
    const points = document.querySelectorAll('.point');
    for (let i = 0; i < points.length; i++) {
        let pos = points[i].getBoundingClientRect();
        if (
            position.right > pos.left &&
            position.left < pos.right &&
            position.bottom > pos.top &&
            position.top < pos.bottom
        ) {
            points[i].classList.remove('point');
        } 
    }
}


