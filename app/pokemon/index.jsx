import { useState } from 'react'
import { View, Text, Stylesheet, Picker } from 'react-native'
import styles from './styles.jsx'



const Pokemon = () => {
    const [pokemon, setPokemon] = useState('')

    const lista_pokemons = [
        {nome:'Charizard', id:1},
        {nome:'Blastoise', id:2},
        {nome:'Charizard', id:3}
    ]

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
        .then(resposta => resposta.json)

    })

    return (
        <View>
        <Text>Selecione</Text>
        <Picker
            selectedValue={pokemon}
            onValueChange={(item) => setPokemon(item)}
        >
            {lista_pokemons.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.url} />
            ))}
        </Picker>
        {pokemon?<Text>voce selecionou {pokemon}</Text>:''}
        </View>
    )
}

export default Pokemon