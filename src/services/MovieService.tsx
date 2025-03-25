import axios from "axios";

export async function getAllMovies() {
  try {
    const res = await axios.get(`${process.env.API_URL_WITH_KEY}`);
    const result = res.data;
    return result;
  } catch (error) {
    console.log(error + "Failed to fetch movies");
    return { data: [] };
  }
}
