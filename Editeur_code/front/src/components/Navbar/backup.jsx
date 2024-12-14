import React, {useState} from 'react';
import Logo from "../../assets/d.jpg";
import { Link } from 'react-router-dom';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const toggleNavbar = () => {
      setOpenLinks(!openLinks);
  };

  return (
    <div className=' navbar'>
        <div className='leftSide ' id={openLinks ? "open" : "close"}  >
            <img src={Logo} alt="logo kontiki"/>
            <div className='hiddenLinks '>
              <Link to="/accueil" className=''>Accueil</Link>
              <Link to="/services">Services</Link>
              <Link to="/apropos">A propos</Link>
              <Link to="/test">Teste</Link>
              <Link to="/contact">Contactez-nous</Link>
            </div> 
        </div>

        <div className='rightSide'>
          <Link to="/accueil" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>Accueil</Link>
          <Link to="/services" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>Services</Link>
          <Link to="/apropos" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>A propos</Link>
          <Link to="/test" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>Test</Link>
          <Link to="/contact" className='px-3 py-2 font-medium transition-all duration-700 rounded-lg text-slate-700 hover:bg-amber-200 hover:text-slate-900'>Contactez-nous</Link>
        </div>
    </div>
  )
}

export default Navbar
