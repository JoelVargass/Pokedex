import { useEffect, useState } from "react";

interface PokemonType {
    id: number;
    name: string;
    img: string;
}

function Pokemon({ searchQuery }: { searchQuery: string }) {
    const [pokemon, setPokemon] = useState<PokemonType[]>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<PokemonType[]>([]); // Agregamos un estado para Pokémon filtrados

    useEffect(() => {
        const getPokemon = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100/');
            const pokemonList = await response.json();
            const { results } = pokemonList;

            const newPokemonList = await Promise.all(results.map(async (pokemon: any) => {
                const response = await fetch(pokemon.url);
                const poke = await response.json();
                return {
                    id: poke.id,
                    name: poke.name,
                    img: poke.sprites.other.dream_world.front_default
                };
            }));

            setPokemon(newPokemonList);
            setFilteredPokemon(newPokemonList); // Inicialmente, los Pokémon filtrados son todos
        };

        getPokemon();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const searchResults = pokemon.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPokemon(searchResults);
        } else {
            setFilteredPokemon(pokemon); // Si no hay búsqueda, mostrar todos los Pokémon
        }
    }, [searchQuery, pokemon]);

    return (
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 lg:grid-cols-[1fr-350px] h-full gap-6 p-4">
            {
                filteredPokemon.map(pokemon => (
                    <div key={pokemon.id} className="rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <img src={pokemon.img} alt={pokemon.name} className="w-full h-40 bg-slate-100 p-4 dark:bg-slate-800" />
                        <div className="p-4 text-center bg-slate-100 dark:bg-slate-800">
                            <p className="text-lg font-bold capitalize">{pokemon.name}</p>
                            <span className="text-gray-500">ID #{pokemon.id}</span>
                        </div>
                    </div>
                ))
            }
            {
                filteredPokemon.length === 0 && <p className="text-center w-full">No Pokémon found</p>
            }
        </div>
    );
}

export default Pokemon;
