<template>
    <header>
        <nav>
            <router-link to="/">Главная</router-link>
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

<style lang="scss" scoped>
    header {
        width: 100%;
        padding: 16px 32px;
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 2;

        nav {
            display: flex;
            gap: 24px;

            a {
                color: #0077b6;
                font-weight: 500;
                transition: color 0.3s ease;

                &.router-link-active {
                    color: #1F2261;
                }

                &:hover {
                    color: #0096c7;
                }
            }
        }

        select {
            padding: 6px 12px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
            background-color: #f9f9f9;
            transition: border-color 0.2s;

            &:focus {
                border-color: #0077b6;
                outline: none;
            }
        }
    }
</style>