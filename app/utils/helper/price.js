export function formatPrice(price, currency) {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: currency === 'dollar' ? 'USD' : 'EUR',
  }).format(price)
}
