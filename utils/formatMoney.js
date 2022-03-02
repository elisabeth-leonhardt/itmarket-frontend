export default function formatMoney(amount = 0, usd = 0, emergency = false) {
  const options = {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  };

  if (emergency || !usd) {
    return 'Consultar precio';
  }
  // convert dolar and price in cents
  const finalPrice = amount * 100 * usd * 100;
  const formatter = Intl.NumberFormat('es-AR', options);
  return formatter.format(finalPrice / 10000);
}
