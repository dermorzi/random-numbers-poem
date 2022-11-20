const synth = window.speechSynthesis;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas.getBoundingClientRect();
const size = (width < height) ? width : height;
canvas.width = width;
canvas.height = height;
let hue = 0;
let randoms;

ctx.fillStyle = '#eee';
ctx.font = `bold ${ size / 3 }px sans-serif`;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

function drawStart() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.font = `bold ${ size / 8 }px sans-serif`;
  ctx.fillText('Click to start!', 0, 0);
  ctx.restore();
}

function drawDigit(digit) {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.fillStyle = `hsl(${(360 / 10) * digit}, 50%, 50%)`;
  ctx.fillText(digit, 0, 0);
  ctx.restore();
}

function generateRandomNumbers(amount = 1000) {
  const randomNumbers = [];

  while (randomNumbers.length < amount) {
    const rnd = Math.round(Math.random() * 9);

    if (randomNumbers.length === 0 || rnd !== randomNumbers[randomNumbers.length - 1]) {
      randomNumbers.push(rnd);
    }
  }

  return randomNumbers;
}

function play() {
  if (randoms.length <= 0) return init();
  console.log('play')
  const digit = randoms.pop();
  const utterThis = new SpeechSynthesisUtterance(digit);
  utterThis.pitch = 1;
  utterThis.rate = .2;
  utterThis.onstart = () => drawDigit(digit);
  utterThis.onend = () => play();
  synth.speak(utterThis);
}

function init() {
  randoms = generateRandomNumbers();
  drawStart();
  canvas.addEventListener('click', () => play(), { once: true });
}

init();