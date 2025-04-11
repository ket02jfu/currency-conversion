<template>
    <div>
        <h1>Курсы валют</h1>
        <p>Выбранная валюта: <strong>{{ baseCurrency }}</strong></p>

        <div v-if="Object.keys(displayedRates).length" class="rates-container">
            <div v-if="Object.keys(displayedRates).length">
                <div v-for="(rate, code) in displayedRates" :key="code" class="rate-item">
                    <span>{{ getFlag(code) }} 1 {{ code }} = {{ formatRate(rate) }} {{ baseCurrency }}
                        {{ getFlag(baseCurrency) }} </span>
                </div>
            </div>
        </div>
        <div v-else>
            Загрузка...
        </div>
    </div>
</template>


<script setup>
    import {
        storeToRefs
    } from 'pinia'
    import {
        useCurrencyStore
    } from '../store'
    import {
        computed
    } from 'vue'

    const store = useCurrencyStore()
    const {
        baseCurrency,
        rates
    } = storeToRefs(store)

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
</script>

<style lang="scss" scoped>
    h1 {
        text-align: center;
        margin-bottom: 16px;
        color: #1F2261;
        font-size: 28px;
    }

    p {
        text-align: center;
        font-size: 18px;
        margin-bottom: 24px;
    }

    strong {
        color: #1F2261;
    }

    .rates-container {
        background-color: #fff;
        padding: 24px 32px;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        min-width: 280px;
        max-width: 400px;
        margin: 0 auto;

        .rate-item {
            font-size: 18px;
            color: #333;
            margin-bottom: 12px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>