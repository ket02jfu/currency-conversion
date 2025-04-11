<template>
    <header>
        <nav>
            <router-link to="/">Главная</router-link>
            |
            <router-link to="/convert">Конвертация</router-link>
        </nav>
        <select v-model="currencyStore.baseCurrency">
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
        </select>
    </header>
</template>

<script setup>
    import {
        useCurrencyStore
    } from '../store'
    const currencyStore = useCurrencyStore()
</script>