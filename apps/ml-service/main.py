from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# ----------------------------
# Load model (we'll create it next)
# ----------------------------
model = None

try:
    model = joblib.load("model.pkl")
except:
    print("Model not found. Using dummy logic.")


# ----------------------------
# Request Schema
# ----------------------------
class PredictRequest(BaseModel):
    demand: float
    supply: float
    time: float


# ----------------------------
# Prediction Logic
# ----------------------------
def predict_price(data):
    global model

    if model:
        prediction = model.predict([[data.demand, data.supply, data.time]])
        return float(prediction[0])
    else:
        # fallback dummy logic (so API works even without model)
        return float(100 + data.demand * 2 - data.supply * 1.5)


# ----------------------------
# Routes
# ----------------------------
@app.get("/")
def root():
    return {"message": "ML Service Running 🚀"}


@app.post("/predict")
def predict(req: PredictRequest):
    price = predict_price(req)

    return {
        "predicted_price": price,
        "confidence": 0.9,
        "model_version": "v1"
    }