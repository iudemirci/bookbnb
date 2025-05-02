import { useMutation } from '@tanstack/react-query';

export function useReverseGeocode() {
  return useMutation({
    mutationFn: async ({ lat, lng }) => {
      if (!lat || !lng) throw new Error('Latitude and longitude are required');

      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }

      const data = await response.json();
      return data;
    },
  });
}
