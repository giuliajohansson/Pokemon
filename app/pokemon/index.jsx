import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  pokemonList: {
    marginTop: 20,
  },
  pokemonItem: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(''); 
  const [tipo, setTipo] = useState(''); 
  const [listaPokemons, setListaPokemons] = useState([]); 
  const [listaTipos, setListaTipos] = useState([]); 
  const [limit, setLimit] = useState(10); 
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null); 

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((resposta) => resposta.json())
      .then((dados) => setListaTipos(dados.results))
      .catch((error) => console.log('aconteceu um erro', error));
  }, []);

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

  useEffect(() => {
    if (pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setPokemonSelecionado({
            name: dados.name,
            image: dados.sprites.front_default, 
          });
        })
        .catch((error) => console.log('aconteceu um erro ao obter o pokemon', error));
    }
  }, [pokemon]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.text}>Selecione o tipo</Text>
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

      {tipo && (
        <View>
          <Text style={styles.text}>Selecione o Pokémon</Text>
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
          <Text style={styles.text}>Você selecionou {pokemonSelecionado.name}</Text>
          <Image
            style={styles.pokemonImage}
            source={{ uri: pokemonSelecionado.image }}
          />
        </View>
      )}

      <View style={styles.picker}>
        <Text style={styles.text}>Quantidade de Pokémon por vez:</Text>
        <Picker
          selectedValue={limit}
          onValueChange={(value) => setLimit(value)}
        >
          <Picker.Item label="10" value={10} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="30" value={30} />
        </Picker>
      </View>
    </ScrollView>
  );
};

export default Pokemon;