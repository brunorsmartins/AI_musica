import joblib

class ModelLoader:
    def __init__(self, model_path):
        self.model_path = model_path

    def get_model(self):
        return joblib.load(self.model_path)
