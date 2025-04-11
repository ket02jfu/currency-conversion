export async function fetchCurrencyRates() {
    try {
        const response = await fetch('https://status.neuralgeneration.com/api/currency')
        const data = await response.json()

        if (!data || typeof data !== 'object') {
            throw new Error('Ошибка')
        }

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}