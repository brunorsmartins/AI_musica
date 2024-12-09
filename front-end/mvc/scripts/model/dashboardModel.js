export class DashboardModel {
  static async makePrediction(texto) {
    const response = await fetch('http://localhost:3636/api/v1/ai/music/prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texto }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro desconhecido na API');
    }

    const data = await response.json();
    return data.prediction;
  }
}
