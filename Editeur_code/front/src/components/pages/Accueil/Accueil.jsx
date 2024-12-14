import React from 'react';
import { Link } from 'react-scroll';
// import '../../../App.scss';

function Accueil() {
  return (
    <section id='intro'>
      <div className="introContent">
        <span className='kontiki'>Examen IA</span>
        <span className="introTexte"> Corrige le samedi<br/></span>
        <span className='introMarketing'> Elle sera notee</span>
        <p className="introPara">
          Aller tout de suite dans la partie code editor si vous voulez coder tout de suite
        </p>

      </div>
    </section>
  )
}

export default Accueil
