import React from "react";
import { Link } from "react-router-dom";
import bois from "../../../assets/Images/pages/test/bg-test-bois.jpg";

function Test() {
  return (
    <>
      <div className="my-8 font-sans text-center ">
        <h2 className="text-6xl font-semibold transition-transform duration-700 ease-in-out text-blue-950 md:text-5xl hover:scale-125">
          Examen Intelligence Artificielle
        </h2>
        <div className="flex justify-center mt-2">
          <div className="w-24 h-1 bg-amber-500"></div>
        </div>
      </div>

      <div className="flex justify-around h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
        <section className="pt-60">
          <Link
            to="/codeEditor"
            className="block max-w-xs p-10 mx-auto space-y-3 bg-white rounded-lg shadow-lg group ring-1 ring-slate-900/5 hover:bg-sky-500 hover:ring-sky-500"
          >
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 stroke-sky-500 group-hover:stroke-white"
                fill="none"
                viewBox="0 0 24 24"
                // Ajoutez des attributs nécessaires pour le SVG ici
              >
                {/* Contenu SVG */}
              </svg>
              <h3 className="text-4xl font-semibold transition-transform duration-300 ease-in-out text-blue-950 md:text-3xl hover:scale-125">
                Editeur de code
              </h3>
            </div>
            <p className="text-sm text-slate-500 group-hover:text-white">
              A vous de jouer
            </p>
          </Link>
        </section>
      </div>


    </>
  );
}

export default Test;
