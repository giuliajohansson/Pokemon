import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fb6f92',
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
    fontSize: 28,
    fontWeight: '600',
    color: '#b9375e',
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
    color: '#b9375e',
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#f5f5f5',
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
    <ImageBackground source={{uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/24628798-f3d0-411c-be85-8e11d898ab54/d4h6fk6-599e6d1d-01bd-4ca4-8cf0-36c6814d466b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0NjI4Nzk4LWYzZDAtNDExYy1iZTg1LThlMTFkODk4YWI1NFwvZDRoNmZrNi01OTllNmQxZC0wMWJkLTRjYTQtOGNmMC0zNmM2ODE0ZDQ2NmIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ODuvZUyll4JlhywilY5njNr8vIHxqvy6klLLTHW9JAg"}} resizeMode="cover" style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.6}}>
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
    </ImageBackground>
  );
};

export default Pokemon;