import { useEffect, useState } from "react";

interface PokemonType {
    id: number;
    name: string;
    img: string;
}

function Pokemon() {

    // Especificar que el estado pokemon es un array de objetos de tipo PokemonType
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {
                pokemon.map(pokemon => (
                    <div key={pokemon.id} className="rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <img src={pokemon.img} alt={pokemon.name} className="w-full overflow-hidden h-40 bg-slate-100 p-4 dark:bg-slate-800" />
                        <div className="p-4 text-center bg-slate-100 dark:bg-slate-800">
                            <p className="text-lg font-bold capitalize">{pokemon.name}</p>
                            <span className="text-gray-500">ID #{pokemon.id}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Pokemon;
