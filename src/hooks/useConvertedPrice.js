import { useQuery } from '@tanstack/react-query';

export function useConvertedPrice({ amount, fromCurrency, toCurrency }) {
  const shouldFetch = !!amount && !!fromCurrency && !!toCurrency && fromCurrency !== toCurrency;

  return useQuery({
    queryKey: ['convertedPrice', amount, fromCurrency, toCurrency],
    queryFn: async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
      );

      if (!res.ok) throw new Error('Currency conversion failed');

      const data = await res.json();
      return data.rates[toCurrency];
    },
    enabled: shouldFetch,
    staleTime: 10 * 60 * 10,
    gcTime: 5 * 60 * 30,
  });
}
