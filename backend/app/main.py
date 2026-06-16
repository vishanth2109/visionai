from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from models.registry import MODEL_REGISTRY

app = FastAPI(title="VisionAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    model: str = Form("mobilenet"),
):
    predictor = MODEL_REGISTRY.get(model)

    if predictor is None:
        return {
            "error": f"Model '{model}' not found"
        }

    predictions = predictor(file.file)

    return {
        "model": model,
        "predictions": predictions,
    }