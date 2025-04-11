import {
    defineStore
} from 'pinia'
import {
    fetchCurrencyRates
} from '../services/CurrencyService'

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        baseCurrency: 'RUB',
        rates: {},
        loading: false,
        err: null
    }),

    actions: {
        setBaseCurrency(currency) {
            this.baseCurrency = currency
        },

        async loadRates() {
            this.loading = true
            this.err = null
            try {
                const rawRates = await fetchCurrencyRates()

                if (rawRates && typeof rawRates === 'object') {
                    this.rates = rawRates


                    this.rates['USD-RUB'] = rawRates['usd-rub']
                    this.rates['EUR-RUB'] = rawRates['eur-rub']
                    this.rates['USD-EUR'] = rawRates['usd-eur']
                    this.rates['EUR-USD'] = rawRates['eur-usd']
                    this.rates['RUB-USD'] = rawRates['rub-usd']
                    this.rates['RUB-EUR'] = rawRates['rub-eur']
                } else {
                    throw new Error('Ошибка')
                }

            } catch (err) {
                this.err = 'Не удалось загрузить курсы валют'
                console.error(err)
            } finally {
                this.loading = false
            }
        }
    }
})