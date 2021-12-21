const tileCount = 12;
const namePrefix = 'cribTile';

const gameState = {
	over: false,
	audioOn: false,
	tileState: []
};

const congratulations = [
	'Hooray, you did it!',
	'HO! HO! HO! Well done.',
	'Congratulations! You have solved the puzzle',
	'Winner Winner Christmas Dinner!'
];

function rotate(element, deg) {
	element.style.webkitTransform = 'rotate(' + deg + 'deg)';
	element.style.mozTransform = 'rotate(' + deg + 'deg)';
	element.style.msTransform = 'rotate(' + deg + 'deg)';
	element.style.oTransform = 'rotate(' + deg + 'deg)';
	element.style.transform = 'rotate(' + deg + 'deg)';
}

function isGameOver() {
	return gameState.tileState.every((orientation) => orientation % 360 == 0);
}

function endGame() {
	let randomIndex = Math.floor((Math.random() * 10) % congratulations.length);
	alert(congratulations[randomIndex]);
	let msgDiv = document.querySelector('.message');
	msgDiv.innerHTML = 'Wishing You And Your Loved Ones A Very Happy Christmas';
}

function init() {
	let inner = document.querySelector('#inner');

	console.log('inner is : ', inner);

	for (let i = 0; i < tileCount; i++) {
		let tile = document.createElement('div');
		let orientation = Math.ceil((Math.random() * 10) % 4);
		gameState.tileState.push(orientation * 90);

		tile.classList.add('img-tile');
		tile.style.backgroundImage = "url('./assets/images/" + namePrefix + i + ".jpg')";
		rotate(tile, orientation * 90);

		tile.onclick = function() {
			if (!gameState.audioOn) {
				document.getElementById('audio').play();
			}
			if (!gameState.over) {
				let deg = gameState.tileState[i] % 360 + 90;
				gameState.tileState[i] = deg;
				rotate(this, deg);
				if (isGameOver()) {
					gameState.over = true;
					setTimeout(endGame, 500);
				}
			}
		};
		inner.appendChild(tile);
	}
}

window.onload = init;
