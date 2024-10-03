import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#db0d17',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#f5f5f5',
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
    color: '#0b23bd',
    marginBottom: 23,
  },
  pokemonList: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  pokemonItem: {
    fontSize: 18,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  pokemonImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0b23bd', // Azul mais forte para o título
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#f5f5f5',
    marginBottom: 10,
    
  },
});

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(''); // Estado para o Pokémon selecionado
  const [tipo, setTipo] = useState(''); // Estado para o tipo de Pokémon
  const [listaPokemons, setListaPokemons] = useState([]); // Lista de Pokémon filtrados
  const [listaTipos, setListaTipos] = useState([]); // Lista de tipos de Pokémon
  const [limit, setLimit] = useState(10); // Controla a quantidade de Pokémon retornados
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null); // Dados do Pokémon selecionado

  // Fetch para listar todos os tipos de Pokémon
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((resposta) => resposta.json())
      .then((dados) => setListaTipos(dados.results))
      .catch((error) => console.log('aconteceu um erro', error));
  }, []);

  // Fetch para listar os Pokémon filtrados pelo tipo selecionado
  useEffect(() => {
    if (tipo) {
      fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          const pokemonsFiltrados = dados.pokemon.slice(0, limit).map((p) => p.pokemon);
          setListaPokemons(pokemonsFiltrados);
        })
        .catch((error) => console.log('aconteceu um erro ao listar os pokemons', error));
    }
  }, [tipo, limit]);

  // Fetch para obter dados do Pokémon selecionado
  useEffect(() => {
    if (pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setPokemonSelecionado({
            name: dados.name,
            image: dados.sprites.front_default, // Imagem do Pokémon
          });
        })
        .catch((error) => console.log('aconteceu um erro ao obter o pokemon', error));
    }
  }, [pokemon]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Selecione seu Pokémon</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Selecione o tipo</Text>
        <Picker
          style={styles.picker}
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
        >
          <Picker.Item label="Selecione um tipo" value="" />
          {listaTipos.map((item) => (
            <Picker.Item key={item.name} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      {tipo && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Selecione o Pokémon</Text>
          <Picker
            style={styles.picker}
            selectedValue={pokemon}
            onValueChange={(itemValue) => setPokemon(itemValue)}
          >
            <Picker.Item label="Selecione um Pokémon" value="" />
            {listaPokemons.map((item) => (
              <Picker.Item key={item.name} label={item.name} value={item.name} />
            ))}
          </Picker>
        </View>
      )}

      {pokemonSelecionado && (
        <View style={styles.pokemonList}>
          <View style={styles.pokemonImageContainer}>
            <Image
              style={styles.pokemonImage}
              source={{ uri: pokemonSelecionado.image }}
            />
          </View>
          <Text style={styles.text}>Você selecionou {pokemonSelecionado.name}</Text>
        </View>
      )}

      {tipo && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Quantidade de Pokémon por vez:</Text>
          <Picker
            selectedValue={limit}
            onValueChange={(value) => setLimit(value)}
          >
            <Picker.Item label="10" value={10} />
            <Picker.Item label="20" value={20} />
            <Picker.Item label="30" value={30} />
          </Picker>
        </View>
      )}
    </ScrollView>
  );
};

export default Pokemon;