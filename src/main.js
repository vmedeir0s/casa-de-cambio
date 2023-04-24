import Swal from 'sweetalert2';
import { renderCoins } from './components';
import './style.css';

const searchBtnEl = document.querySelector('.search-btn');
const coinsInputEl = document.querySelector('#coin-input');
const coinContentEl = document.querySelector('.coin-content');

async function fetchRates(searchCoin = 'BRL') {
  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${searchCoin}`);
    const result = await response.json();
    if (searchCoin.toUpperCase() !== result.base) {
      throw new Error('Digite uma moeda válida');
    }
    return result;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Moeda Inválida',
      text: error.message,
    });
    return null;
  }
}

async function handleSearch() {
  const searchedCoin = coinsInputEl.value;
  if (!searchedCoin) {
    Swal.fire({
      icon: 'error',
      title: 'Erro Inesperado',
      text: 'Digite uma moeda',
    });
    return;
  }
  const result = await fetchRates(searchedCoin);
  const rates = await result.rates;
  const ratesArray = Object.entries(rates);

  const ratesArrayObject = ratesArray.map((rate) => (
    { coinName: rate[0], value: rate[1].toFixed(2) }));
  coinContentEl.style = 'overflow-y: auto';
  renderCoins(ratesArrayObject, result.base);
}

searchBtnEl.addEventListener('click', handleSearch);
