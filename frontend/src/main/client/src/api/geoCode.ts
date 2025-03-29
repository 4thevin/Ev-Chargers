import axios from "./axiosInstance.ts";

export const getCoordsFromZip = async (
  zipCode: string,
): Promise<{ lat: number; lng: number }> => {
  const res = await axios
    .get(`/geo/zip`, { params: { zip: zipCode } })
    .catch((error) => {
      console.error("Geo API failed", error);
      throw new Error("Invalid Zip code or server issue");
    });

  return res.data;
};
