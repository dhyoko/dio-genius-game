let order = [];
let clickedOrder = [];
let score = 0;
let allowClick = false;

const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");

// funcao para inicializar uma cor
const createColorElement = (color) => {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
  }
};

// acender cor
const lightColor = (element, count) => {
  const time = count * 500;
  const delay = count * 500;
  setTimeout(() => element.classList.add("selected"), time + delay);
  setTimeout(() => element.classList.remove("selected"), time + 500 + delay);
};

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const shuffleOrder = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order.push(colorOrder);
  clickedOrder = [];

  order.forEach((el, index) => {
    lightColor(createColorElement(el), index);
  });
  setTimeout(() => (allowClick = true), order.length * 1000);
};

// verificar se a ordem clicada e a ordem definida são iguais
const checkOrder = () => {
  for (let index in clickedOrder) {
    if (clickedOrder[index] !== order[index]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    score++;
    alert(`Pontuação: ${score}\nVocê Acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

const resetColor = () => {
  green.classList.remove("selected");
  red.classList.remove("selected");
  yellow.classList.remove("selected");
  blue.classList.remove("selected");
};

// define a açao de clique do usuario
const click = (color) => {
  if (allowClick) {
    clickedOrder.push(color);
    const colorElement = createColorElement(color);
    colorElement.classList.add("selected");

    setTimeout(() => {
      colorElement.classList.remove("selected");
      checkOrder();
    }, 250);
  }
};

const nextLevel = () => {
  resetColor();
  allowClick = false;
  setTimeout(() => shuffleOrder(), 500);
};

const gameOver = () => {
  alert(
    `Pontuação: ${score}\nVocê perdeu o jogo\nClique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];
  playGame();
};

const playGame = () => {
  alert("Bem vindo ao Gênesis!");
  score = 0;

  shuffleOrder();
};

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
