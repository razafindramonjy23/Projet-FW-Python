import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-scroll";
// import '../../../App.scss';

function Accueil() {
  const servicesData = [
    {
      title: "Analyse Prédictive",
      description:
        "Anticipez les tendances et les risques avec nos algorithmes avancés.",
      icon: "/api/placeholder/50/50",
    },
    {
      title: "Automatisation",
      description: "Optimisez vos processus métiers avec l'IA intelligente.",
      icon: "/api/placeholder/50/50",
    },
    {
      title: "Conseil Stratégique",
      description: "Transformez vos données en décisions stratégiques.",
      icon: "/api/placeholder/50/50",
    },
  ];

  return (
    <>
      {/* Banniere */}
      <div className="relative h-screen flex items-center bg-gradient-to-r from-blue-400 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Kontiki Service <br /> au Service de Votre Entreprise
            </h1>
            <p className="text-xl mb-10 animate-fadeIn animation-delay-300">
              Transformez vos données en opportunités stratégiques avec nos
              solutions d'IA avancées.
            </p>
            <div className="flex space-x-4 animate-fadeIn animation-delay-500">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100 transition flex items-center">
                Nos Services <ChevronRight className="ml-2" />
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white/20 transition">
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nos Services 
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="mb-4 w-16 h-16"
                />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default Accueil;
