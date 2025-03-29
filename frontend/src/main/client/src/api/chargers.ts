import axios from "./axiosInstance.ts";

export const getNearbyStation = async (
  lat: number,
  lng: number,
  radius = 10,
) => {
  const response = await axios.get(`/chargers/nearby`, {
    params: { lat, lng, radiusMiles: radius },
  });
  return response.data;
};
