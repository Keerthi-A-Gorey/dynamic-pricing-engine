import axios from "axios";

export const predictPrice = async (data) => {
  const res = await axios.post("http://localhost:8000/predict", data);
  return res.data;
};