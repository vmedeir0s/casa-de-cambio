const coinsTitle = document.querySelector('.coins-title');
const coinstListElement = document.querySelector('.coins');

export default function createCoinElement(coinName, value) {
  const liElement = document.createElement('li');
  liElement.classList.add('coin');
  liElement.innerHTML = `${coinName} <span>${value}</span>`;
  return liElement;
}

export function renderCoins(coins, baseCoin) {
  coinsTitle.innerHTML = `Valores referentes a 1 ${baseCoin}`;
  coinstListElement.innerHTML = '';
  coins.forEach((coin) => {
    const coinElement = createCoinElement(coin.coinName, coin.value);
    coinstListElement.appendChild(coinElement);
  });
}
