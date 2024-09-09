import { useState } from 'react'
import { View, Text, Stylesheet, Picker } from 'react-native'
import {Picker} from '@react.native.picker'
import styles from './styles.jsx'



const Pokemon = () => {
    const [pokemon, setPokemon] = useState('')

//    const lista_pokemons = [
//        {nome:'Charizard', id:1},
//        {nome:'Blastoise', id:2},
//        {nome:'Charizard', id:3}
//    ]

   useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
        .then(resposta => resposta.json())
        .then(dados => setListaPokemons(dados.reults))
        .catch(console.log('Aconteceu um erro'))
    })

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