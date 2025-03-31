import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [valorReal, setValorReal] = useState('');
  const [resultado, setResultado] = useState('');

  const converterParaDolar = async () => {
    try {
      // Chamada para a API de câmbio
      const resposta = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
      const dados = await resposta.json();
      const taxaDolar = dados.rates.USD;
      
      const valorEmDolar = parseFloat(valorReal) * taxaDolar;
      setResultado(`US$ ${valorEmDolar.toFixed(2)}`);
    } catch (erro) {
      console.error('Erro ao buscar a taxa de câmbio', erro);
      setResultado('Erro ao buscar a taxa de câmbio');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Real (BRL) para Dólar (USD)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor em R$"
        keyboardType="numeric"
        value={valorReal}
        onChangeText={setValorReal}
      />
      <Button title="Converter" onPress={converterParaDolar} />
      <Text style={styles.resultado}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
