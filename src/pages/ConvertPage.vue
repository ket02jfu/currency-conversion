<template>
    <div class="converter-page">
        <h1>Конвертер валют</h1>
        <div class="converter">
            <div class="row">
                <div class="title">Сумма</div>
                <div class="currency-wrapper">
                    <select v-model="fromCurrency">
                        <option v-for="c in currencies" :key="c" :value="c">{{ getFlag(c) }} {{ c }}</option>
                    </select>
                    <input type="number" v-model.number="fromAmount" @input="convertFrom" placeholder="Сумма" />
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="title">Конвертированная сумма</div>
                <div class="currency-wrapper">
                    <select v-model="toCurrency">
                        <option v-for="c in currencies" :key="c" :value="c">{{ getFlag(c) }} {{ c }}</option>
                    </select>
                    <input type="number" v-model.number="toAmount" @input="convertTo" placeholder="Сумма" />
                </div>
            </div>
        </div>

        <div class="exchange-rates">
            <h2>Индикативный обменный курс</h2>
            <div v-if="Object.keys(displayedRates).length">
                <div v-for="(rate, code) in displayedRates" :key="code" class="rate-item">
                    <span>{{ getFlag(code) }} {{ code }}: </span>
                    <span>{{ rate }}</span>
                </div>
            </div>
            <div v-else>
                <p>Загрузка курсов...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        computed,
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

    const getFlag = (currency) => {
        switch (currency) {
            case 'USD':
                return '🇺🇸'
            case 'EUR':
                return '🇪🇺'
            case 'RUB':
                return '🇷🇺'
            default:
                return ''
        }
    }

    const displayedRates = computed(() => {
        const otherCurrencies = ['USD', 'EUR', 'RUB'].filter(c => c !== fromCurrency.value)
        const result = {}

        otherCurrencies.forEach((currency) => {
            const rate = rates.value[`${currency.toLowerCase()}-${fromCurrency.value.toLowerCase()}`]
            result[currency] = rate ? rate.toFixed(2) : 'N/A'
        })

        return result
    })
</script>

<style scoped lang="scss">
    .converter-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            text-align: center;
            margin-bottom: 16px;
            color: #1F2261;
            font-size: 28px;
        }

        .converter {
            background-color: #fff;
            padding: 24px 32px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            min-width: 280px;
            margin: 0 auto;

            .row {
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: flex-start;

                .title {
                    color: #989898;
                    font-size: 15px;
                }
            }

            .currency-wrapper {
                display: flex;
                align-items: center;
                width: 100%;
                gap: 16px;
            }

            select {
                padding: 0.5rem;
                padding: 11px 14px;
                font-size: 20px;
                border: none;
                outline: none;
                background-color: #fff;
                cursor: pointer;
            }

            input {
                width: 141px;
                padding: 11px 14px;
                font-size: 20px;
                border-radius: 7px;
                border: none;
                outline: none;
                background: #EFEFEF;
                text-align: end;
            }

            input::placeholder {
                text-align: center;
                color: #aaa;
            }

            hr {
                width: 100%;
                background: #EFEFEF;
                height: 1px;
                border: none;
            }
        }

        .exchange-rates {
            background-color: #fff;
            padding: 24px 32px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            min-width: 280px;
            margin: 20px auto;

            .rate-item {
                margin: 8px 0;
                font-size: 16px;
                color: #555;
                display: flex;
                justify-content: space-between;
                gap: 12px;

                span {
                    font-weight: bold;
                }
            }

            h2 {
                font-size: 18px;
                color: #333;
                margin-bottom: 10px;
            }
        }
    }
</style>