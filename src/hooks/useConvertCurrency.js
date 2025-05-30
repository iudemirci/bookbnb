import { useMutation } from '@tanstack/react-query';

export function useConvertCurrency() {
  return useMutation({
    mutationFn: async ({ amount, fromCurrency, toCurrency }) => {
      if (fromCurrency === toCurrency) return amount;

      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
      );

      if (!res.ok) throw new Error('Currency conversion failed');

      const data = await res.json();
      return data.rates[toCurrency];
    },
  });
}
