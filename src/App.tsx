import './index.css'
import NavBar from './components/layouts/NavBar'
import Pokemon from './components/Pokemon'

function App() {
  return (
    <div className="bg-slate-200 dark:bg-slate-900 dark:text-gray-200 min-h-screen">
      <NavBar />
      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr-350px] h-full font-poppins p-4">
        <Pokemon />
      </main>
    </div>
  )
}

export default App;
