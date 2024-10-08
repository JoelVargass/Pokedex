import { useState } from "react";
import './index.css';
import NavBar from './components/layouts/NavBar';
import Pokemon from './components/Pokemon';
import Footer from "./components/layouts/Footer";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  return (
    <div className=" bg-slate-200 dark:bg-slate-900 dark:text-gray-200 min-h-screen">
        <NavBar onSearch={handleSearch}/>
      <main className="max-w-[1400px] mx-auto h-full font-poppins p-4">
        <Pokemon searchQuery={searchQuery}/>
      </main>

        <Footer/>
        
    </div>
  );
}

export default App;
