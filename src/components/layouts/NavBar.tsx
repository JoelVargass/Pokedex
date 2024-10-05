function NavBar (){
    return (
    <nav className="bg-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          POKEDEX
        </div>
        <div className={`md:flex items-center`}>
          <a href="#" className="text-white text-xl">Joel</a>
        </div>
      </div>
    </nav>
    )
}

export default NavBar