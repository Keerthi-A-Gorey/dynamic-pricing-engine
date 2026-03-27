from fastapi import FastAPI

app = FastAPI(title="ML Service")

@app.get("/")
def health():
    return {"status": "ok"}