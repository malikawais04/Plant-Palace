export function formatPKR(value) {
  try {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 2,
    }).format(Number(value) || 0)
  } catch (e) {
    return `PKR ${Number(value || 0).toFixed(2)}`
  }
}