import { onMounted } from 'vue'
import { useStore } from '../store';

export const useCurrencyConverterStore = () => {
  const store = useStore()

  onMounted(async () => {
    await store.dispatch('currencyConverterModule/fetchSymbolsAndCurrencies')
  })
}
