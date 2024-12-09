// Seleção dos elementos diretamente pelo ID nas tags HTML
const predictButton = document.querySelector('#predict-btn');
const inputText = document.getElementById('caixa-musica');
const resultDiv = document.querySelector('#result');

predictButton.addEventListener('click', async () => {
  const texto = inputText.value;

  if (!texto) {
    resultDiv.textContent = 'Por favor, insira um texto.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3636/api/v1/ai/music/prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto }),
    });

    if (response.ok) {
      const data = await response.json();
      resultDiv.textContent = `Predição: ${data.predicao}`;
    } else {
      const error = await response.json();
      resultDiv.textContent = `Erro: ${error.detail}`;
    }
  } catch (error) {
    resultDiv.textContent = `Erro na conexão com o servidor: ${error.message}`;
  }
});
