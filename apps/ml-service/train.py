import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# ----------------------------
# Generate synthetic data
# ----------------------------
np.random.seed(42)

n = 1000

demand = np.random.randint(0, 100, n)
supply = np.random.randint(0, 100, n)
time = np.random.randint(0, 24, n)

# pricing logic (simulated reality)
price = (
    50
    + demand * 2.5
    - supply * 1.8
    + np.sin(time) * 10
    + np.random.normal(0, 5, n)
)

# ----------------------------
# Create DataFrame
# ----------------------------
df = pd.DataFrame({
    "demand": demand,
    "supply": supply,
    "time": time,
    "price": price
})

# ----------------------------
# Train model
# ----------------------------
X = df[["demand", "supply", "time"]]
y = df["price"]

model = LinearRegression()
model.fit(X, y)

# ----------------------------
# Save model
# ----------------------------
joblib.dump(model, "model.pkl")

print("✅ Model trained and saved as model.pkl")