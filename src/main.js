import Swal from 'sweetalert2';
import { renderCoins } from './components';
import './style.css';

const searchBtnEl = document.querySelector('.search-btn');
const coinsInputEl = document.querySelector('#coin-input');
const coinContentEl = document.querySelector('.coin-content');

async function fetchRates(searchCoin) {
  try {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${
        searchCoin || 'BRL'
      }`
    );
    const result = await response.json();
    if (result.result == 'error') {
      throw new Error('Digite uma moeda válida');
    }
    coinsInputEl.value = '';
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

  const result = await fetchRates(searchedCoin);
  const rates = await result.conversion_rates;
  const ratesArray = Object.entries(rates);

  const ratesArrayObject = ratesArray.map((rate) => ({
    coinName: rate[0],
    value: rate[1].toFixed(2),
  }));
  coinContentEl.style = 'overflow-y: auto';
  renderCoins(ratesArrayObject, result.base_code);
}

searchBtnEl.addEventListener('click', handleSearch);
