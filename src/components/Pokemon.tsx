import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface PokemonType {
    id: number;
    name: string;
    img: string;
}

interface PokemonProps {
    searchQuery: string;
}

const Pokemon: React.FC<PokemonProps> = ({ searchQuery }) => {
    const [pokemon, setPokemon] = useState<PokemonType[]>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<PokemonType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Obtener Pokémon al montar el componente
    useEffect(() => {
        const getPokemon = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
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
            setFilteredPokemon(newPokemonList);  // Inicialmente se muestran todos
        };

        getPokemon();
    }, []);

    // Filtrar los Pokémon en base a la búsqueda
    useEffect(() => {
        const searchPokemon = () => {
            if (searchQuery) {
                const searchResults = pokemon.filter(p =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredPokemon(searchResults);
            } else {
                setFilteredPokemon(pokemon);  // Si no hay búsqueda, muestra todos
            }
            setCurrentPage(1);  // Reinicia la paginación en la página 1
        };

        // Usar debounce para limitar la frecuencia de la búsqueda
        const debouncedSearch = debounce(searchPokemon, 300); // Esperar 300 ms
        debouncedSearch();

        return () => {
            debouncedSearch.cancel(); // Cancelar el debounce en la limpieza
        };
    }, [searchQuery, pokemon]);

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPokemon = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

    // Lógica para mostrar botones de paginación
    const renderPagination = () => {
        const pageButtons = [];
        const maxPagesToShow = 5; // Máximo número de botones a mostrar
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Botón "Primera"
        if (startPage > 1) {
            pageButtons.push(
                <button key={1} onClick={() => paginate(1)} className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">
                    1
                </button>
            );
            if (startPage > 2) {
                pageButtons.push(<span key="dots1" className="px-2">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={`px-3 py-1 ${currentPage === i ? 'bg-slate-400 text-white' : 'bg-gray-300 dark:bg-gray-700'} rounded`}
                    onClick={() => paginate(i)}
                >
                    {i}
                </button>
            );
        }

        // Botón "Última"
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageButtons.push(<span key="dots2" className="px-2">...</span>);
            }
            pageButtons.push(
                <button key={totalPages} onClick={() => paginate(totalPages)} className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div>
            {/* Lista de Pokémon filtrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {currentPokemon.map(pokemon => (
                    <div key={pokemon.id} className="rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <img src={pokemon.img} alt={pokemon.name} className="w-full h-40 bg-slate-100 p-4 dark:bg-slate-800" />
                        <div className="p-4 text-center bg-slate-100 dark:bg-slate-800">
                            <p className="text-lg font-bold capitalize">{pokemon.name}</p>
                            <span className="text-gray-500">N° {pokemon.id}</span>
                        </div>
                    </div>
                ))}
                {currentPokemon.length === 0 && <p className="text-center w-full">No Pokémon found</p>}
            </div>

            {/* Controles de paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {renderPagination()}

                    <button
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pokemon;
