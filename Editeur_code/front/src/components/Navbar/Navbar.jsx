// import React, { useState } from 'react';
import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from "../../assets/Logo.jpg";
import { Link } from 'react-router-dom';


// const [isMenuOpen, setIsMenuOpen] = useState(false) 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
    {/* <header className="flex justify-between items-center text-gray-700 py-2 px-8 md:px-20 bg-white drop-shadow-md">
      <a href='#'>
        <img src={Logo} alt="Kontiki logo" className="w-16 hover:scale-105 transition-all rounded-full"/>
        <span className='w-44 hover:scale-105 transition-all text-2xl text-blue-900'>
          L2IRD1-SE20220239
        </span>
      </a>

      <div className="hidden xl:flex items-center gap-12 font-sans  text-slate-700 text-lg">
          <Link to="/accueil" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>Accueil</Link>
          <Link to="/test" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>Coder</Link>
          <Link to="/entretien" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>Entretien</Link>
        </div>

        <img className='xl:hidden block text-5xl cursor-pointer' width="50" height="50" src="https://img.icons8.com/ios/50/menu--v1.png" alt="menu--v1" onClick={() => setIsMenuOpen(!isMenuOpen)}/>        
    </header> */}
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/api/placeholder/150/50" 
              alt="Kontiki logo" 
              className="h-10"
            />
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link to="/accueil" className="text-gray-800 hover:text-blue-600 transition">Accueil</Link>
            <Link to="/services" className="text-gray-800 hover:text-blue-600 transition">Services</Link>
            <Link to="/entretien" className="text-gray-800 hover:text-blue-600 transition">Entretien</Link>
            <Link to="/test" className="text-gray-800 hover:text-blue-600 transition">Coder</Link>
            <Link to="/contact" className="text-gray-800 hover:text-blue-600 transition">Contact</Link>
          </div>

          {/* Bouton CTA Desktop */}
          <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
              Démarrer
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-800 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a href="#" className="block py-2 text-gray-800 hover:text-blue-600">Accueil</a>
              <a href="#" className="block py-2 text-gray-800 hover:text-blue-600">Services</a>
              <a href="#" className="block py-2 text-gray-800 hover:text-blue-600">Solutions</a>
              <a href="#" className="block py-2 text-gray-800 hover:text-blue-600">À propos</a>
              <a href="#" className="block py-2 text-gray-800 hover:text-blue-600">Contact</a>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Démarrer
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  )
}
export default Navbar