import axios from "axios";

export const predictFromML = async (data: {
  demand: number;
  supply: number;
  time: number;
}) => {
  try {
    const response = await axios.post("http://localhost:8000/predict", data);

    return response.data;
  } catch (error: any) {
  console.error("ML Service Error:", error.message);
  throw new Error("Failed to fetch prediction from ML service");
}
};