import React, { useState } from 'react';
import Logo from "../../assets/Logo.jpg";
import { Link } from 'react-router-dom';


// const [isMenuOpen, setIsMenuOpen] = useState(false) 

function Navbar() {
  return (
    <>
    <header className="flex justify-between items-center text-gray-700 py-2 px-8 md:px-20 bg-white drop-shadow-md">
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
    </header>
    </>
  )
}
export default Navbar