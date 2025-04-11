<template>
    <div>
        <h1>Курсы валют</h1>
        <p>Выбранная валюта: <strong>{{ baseCurrency }}</strong></p>

        <div v-if="Object.keys(displayedRates).length">
            <div v-for="(rate, code) in displayedRates" :key="code">
                1 {{ code }} = {{ formatRate(rate) }} {{ baseCurrency }}
            </div>
        </div>
        <div v-else>
            Загрузка...
        </div>
    </div>
</template>


<script setup>
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '../store'
import { computed } from 'vue'

const store = useCurrencyStore()
const { baseCurrency, rates } = storeToRefs(store)

const formatRate = (rate) => rate.toFixed(2)

const displayedRates = computed(() => {
    const otherCurrencies = ['USD', 'EUR', 'RUB'].filter(c => c !== baseCurrency.value)
    const result = {}

    otherCurrencies.forEach((currency) => {
        const pairKey = `${currency.toLowerCase()}-${baseCurrency.value.toLowerCase()}`

        const rate = rates.value[pairKey]

        if (rate) {
            result[currency] = rate
        } else {
            result[currency] = 0
        }
    })

    return result
})
</script>
