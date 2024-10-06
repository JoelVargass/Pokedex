import { FaSearch } from "react-icons/fa";

function Navigation () {
    return (
        <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-300"/>
            <input
            className="pl-10 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black-500 p-2 w-full dark:text-slate-300 dark:bg-slate-700 "
            type="search"
            name="valueSearch"
            id=""
            placeholder="Buscar pokemon..."
            />
        </div>
    )
}

export default Navigation