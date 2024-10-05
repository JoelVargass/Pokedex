import { useEffect, useState } from "react"
import PokemonPreview from "./PokemonPreview";

// Definimos el tipo del Pokémon
interface PokemonType {
    id: number;
    name: string;
    img: string;
}

function Pokemon() {

    // Especificamos que el estado `pokemon` es un array de objetos de tipo `PokemonType`
    const [pokemon, setPokemon] = useState<PokemonType[]>([])

    useEffect(() => {
        const getPokemon = async () => {
            // Obtenemos resultado de los Pokémon
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100/')
            // Variable para listar a los Pokémon
            const pokemonList = await response.json()

            const { results } = pokemonList

            // Mapeamos los resultados para obtener los datos de cada Pokémon
            const newPokemon1 = results.map(async (pokemon: any) => {
                const response = await fetch(pokemon.url)
                const poke = await response.json()

                return {
                    id: poke.id,
                    name: poke.name,
                    img: poke.sprites.other.dream_world.front_default
                }
            })

            setPokemon(await Promise.all(newPokemon1));
        }

        getPokemon()

    }, [])

    return (
        <div>
            <PokemonPreview/>
            {
                pokemon.map(pokemon => (
                    <div key={pokemon.id}>
                        <img src={pokemon.img} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                        <span>{pokemon.id}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Pokemon
