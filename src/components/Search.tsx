import { FaSearch } from "react-icons/fa";

interface SearchProps {
    search: string;
    setSearch: (value: string) => void; // Definir el tipo de la función
    onSearch: (query: string) => void; // Definir el tipo de la función
}

function Search( { search, setSearch, onSearch }: SearchProps) {

    

    return (
        <form
            className="relative w-full"
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(search);
            }}
        >
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400" />
            <input
                className="pl-10 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black-500 p-2 w-full dark:text-slate-400 dark:bg-slate-700"
                type="text"
                name="valueSearch"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar pokemon..."
            />
        </form>
    );
}

export default Search;
