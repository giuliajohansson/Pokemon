import { useState } from 'react'
import { View, Text, Stylesheet} from 'react-native'
import {Picker} from '@react.native.picker'

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
});

const Pokemon = () => {
    const [pokemon, setPokemon] = useState('');
    const [tipo, setTipo] = useState('');
    const [listaPokemons, setListaPokemons] = useState([]);
    const [listaTipos, setListaTipos] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/type")
            .then(resposta => resposta.json())
            .then(dados => setListaTipos(dados.results))
            .catch(error => console.log("aconteceu um erro", error));
    }, []);

    useEffect(() => {
        if (tipo) {
            fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
                .then(resposta => resposta.json())
                .then(dados => setListaPokemons(dados.pokemon))
                .catch(error => console.log("aconteceu um erro tipos", error));
        }
    }, [tipo]);

    return (
        <View>
        <Text>Selecione</Text>
        <Picker
            style={stylers.pickerInput}
            selectedValue={pokemon}
            onValueChange={(item) => setPokemon(item)}
        >
            <Picker.item labem={'Selecione um Pokémon'}/>
            {lista_pokemons.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.url} />
            ))}
        </Picker>
        {pokemon?<Text>Você selecionou {pokemon}</Text>:''}
        </View>
    )
}

export default Pokemon