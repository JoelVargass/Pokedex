import Navigation from "../Navigation";
import DarkTheme from "./DarkTheme";

function NavBar (){
    return (
    <nav className="bg-red-600 p-4 dark:bg-slate-950">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          POKEDEX
        </div>
        
        <div className={`md:flex items-center`}>
          <div className="px-4">
            <Navigation/>
            
          </div>
          <DarkTheme/>
        </div>
      </div>
      
    </nav>
    )
}

export default NavBar