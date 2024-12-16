import { useEffect } from 'react';
import * as React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Accueil from './components/pages/Accueil/Accueil.jsx';
// import Services from './components/pages/Services/Services.jsx';
// import A_propos from './components/pages/A_propos/A_propos.jsx';
import Test from './components/pages/Test/Test.jsx';
import TestDev from './components/pages/Test/allTest/testDev/TestDev.jsx';
// import TestTM from './components/pages/Test/allTest/testTM/TestTM.jsx';
// import Contact from './components/pages/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import EditeurDeCode from './components/pages/Test/allTest/testDev/Code-editor.jsx';
import Entretien from './components/pages/Test/allTest/testDev/Entretien.jsx'
import Services from './components/pages/Services/Services.jsx'
import Contact from './components/pages/Contact/Contact.jsx'

import './App.scss';
// import Activites from './components/pages/A_propos/actvt/Activites.jsx';
// import DevActivites from './components/pages/A_propos/actvt/dev/DevActivites.jsx';


function App() {


  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/accueil' element={<Accueil />} />
        {/* <Route path='/services' element={<Services />} /> */}
        <Route path='/test' element={<Test />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/apropos' element={<A_propos />} /> */}
        <Route path='/codeEditor' element={<EditeurDeCode />} />
        <Route path='/entretien' element={<Entretien />} />
        <Route path='/services' element={<Services />} />

        {/* TESTES */}
        <Route path='testDev' element={<TestDev />} />
        {/* <Route path='testTM' element={<TestTM />} /> */}

        {/* A PROPOS  */}
        {/* <Route path='activites' element={<Activites />} /> */}
        {/* <Route path='dev' element={<DevActivites/>} /> */}

      </Routes>

      <Footer />
    </>
  )
}

export default App
