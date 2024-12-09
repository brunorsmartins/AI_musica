import { DashboardModel } from '../model/dashboardModel.js';
import { DashboardView } from '../view/dashboardView.js';

const handlePrediction = async () => {
  const texto = DashboardView.getInputText();

  if (!texto) {
    DashboardView.displayResult("Por favor, insira um texto.");
    return;
  }

  try {
    const prediction = await DashboardModel.makePrediction(texto);
    DashboardView.displayResult(`Predição: ${prediction}`);
  } catch (error) {
    DashboardView.displayResult(error.message);
  }
};

// Inicializar o controlador
DashboardView.bindPredictButton(handlePrediction);
