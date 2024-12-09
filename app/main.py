# main.py
from fastapi import FastAPI, HTTPException
from core.config import app
from db.model_loader import ModelLoader
from domain.input_models import TextInput
from repositories.prediction_repository import PredictionRepository
from services.prediction_service import PredictionService
import uvicorn
from pydantic import BaseModel

# Inicializa e carrega o modelo de Machine Learning
model_loader = ModelLoader('models/music_geral.robson')
model = model_loader.get_model()

# Cria instâncias do repositório e do serviço de predição
prediction_repository = PredictionRepository(model)
prediction_service = PredictionService(prediction_repository)

class TextInput(BaseModel):
    text: str


# Define a rota da API
@app.post("/api/v1/ai/music/prediction")
async def predict(data: TextInput):
    
    try:
        prediction = prediction_service.make_prediction(data.text)
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    print(data)  # Debugging
    prediction = prediction_service.make_prediction(data.text)
    return {"prediction": prediction}

# Código para rodar o servidor com uvicorn diretamente no script
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3636, reload=True)
