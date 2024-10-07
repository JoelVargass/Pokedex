import { useState } from "react";
import Search from "../Search";
import DarkTheme from "./DarkTheme";
import Pokemon from "../Pokemon";

function NavBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <>
      <nav className="bg-red-600 p-4 dark:bg-slate-950">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-white text-2xl font-bold mb-2 md:mb-0">
            POKEDEX
          </div>
          <div className="flex items-center w-full md:w-auto">
            <Search search={search} setSearch={setSearch} onSearch={handleSearch} />
            <DarkTheme />
          </div>
        </div>
      </nav>
      <Pokemon searchQuery={search} />
    </>
  );
}

export default NavBar;
