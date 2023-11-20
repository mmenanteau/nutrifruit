import { Fruit } from "@/types/Fruit";

const BASE_URL = "https://www.fruityvice.com/api/fruit";

export const fetchAllFruits = async (): Promise<Fruit[]> => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

const fruitsApi = { fetchAllFruits };

export default fruitsApi;
