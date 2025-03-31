async function converter() {
    const valorReal = parseFloat(document.getElementById('valorReal').value);
    if (isNaN(valorReal) || valorReal <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }
  
    // API para pegar a taxa de câmbio
    const url = "https://api.exchangerate-api.com/v4/latest/BRL";
  
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      const taxaDolar = dados.rates.USD;  // A taxa de conversão de BRL para USD
      const valorDolar = valorReal * taxaDolar;
  
      document.getElementById('resultado').innerHTML = `R$ ${valorReal} é equivalente a US$ ${valorDolar.toFixed(2)}`;
    } catch (erro) {
      console.error("Erro ao obter dados da API: ", erro);
      alert("Houve um erro ao obter a taxa de câmbio. Tente novamente.");
    }
  }
  