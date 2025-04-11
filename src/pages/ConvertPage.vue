<template>
    <div>
        <h1>Конвертер валют</h1>
        <div class="converter">
            <div class="row">
                <select v-model="fromCurrency">
                    <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
                </select>
                <input type="number" v-model.number="fromAmount" @input="convertFrom" />
            </div>

            <div class="row">
                <select v-model="toCurrency">
                    <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
                </select>
                <input type="number" v-model.number="toAmount" @input="convertTo" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        watch
    } from 'vue'
    import {
        storeToRefs
    } from 'pinia'
    import {
        useCurrencyStore
    } from '../store'

    const store = useCurrencyStore()
    const {
        rates
    } = storeToRefs(store)

    const currencies = ['USD', 'EUR', 'RUB']

    const fromCurrency = ref('RUB')
    const toCurrency = ref('USD')

    const fromAmount = ref(0)
    const toAmount = ref(0)

    const getRate = (from, to) => {
        const key = `${from.toLowerCase()}-${to.toLowerCase()}`
        return rates.value[key] || 1
    }

    const convertFrom = () => {
        const rate = getRate(fromCurrency.value, toCurrency.value)
        toAmount.value = +(fromAmount.value * rate).toFixed(2)
    }

    const convertTo = () => {
        const rate = getRate(toCurrency.value, fromCurrency.value)
        fromAmount.value = +(toAmount.value * rate).toFixed(2)
    }

    watch([fromCurrency, toCurrency], () => {
        convertFrom()
    })
</script>

<style scoped lang="scss">
    .converter {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .row {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        input {
            width: 150px;
        }
    }
</style>