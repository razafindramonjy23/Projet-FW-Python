import React, { useState } from 'react';


const SolutionCard = ({ title, description, icon, industries }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="flex items-center mb-4">
        <img 
          src={icon} 
          alt={title} 
          className="w-16 h-16 mr-4"
        />
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-4">
        <h4 className="font-medium text-gray-800 mb-2">Secteurs d'application :</h4>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SolutionsPage = () => {
  const [activeTab, setActiveTab] = useState('entreprise');

  const solutionsTabs = {
    entreprise: [
      {
        title: "Analyse de Données Stratégiques",
        description: "Transformez vos données brutes en insights décisionnels avec nos algorithmes d'IA avancés.",
        icon: "/api/placeholder/80/80",
        industries: ["Finance", "Consulting", "Tech"]
      },
      {
        title: "Optimisation des Processus",
        description: "Automatisez et rationalisez vos opérations métiers pour une efficacité maximale.",
        icon: "/api/placeholder/80/80",
        industries: ["Industrie", "Logistique", "Production"]
      }
    ],
    sante: [
      {
        title: "Diagnostic Assisté par IA",
        description: "Améliorez la précision diagnostique et la prise en charge des patients.",
        icon: "/api/placeholder/80/80",
        industries: ["Hôpitaux", "Cliniques", "Recherche Médicale"]
      }
    ],
    finance: [
      {
        title: "Détection de Fraude",
        description: "Protégez vos actifs avec notre système de détection de fraude en temps réel.",
        icon: "/api/placeholder/80/80",
        industries: ["Banques", "Assurances", "Fintech"]
      }
    ]
  };

  return (
    <div>
      
      <div className="bg-gray-50 min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nos Solutions IA sur Mesure
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions intelligentes adaptées à chaque secteur d'activité.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-md inline-flex">
              {Object.keys(solutionsTabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full transition ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'entreprise' ? 'Entreprise' : 
                   tab === 'sante' ? 'Santé' : 
                   'Finance'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutionsTabs[activeTab].map((solution, index) => (
              <SolutionCard
                key={index}
                title={solution.title}
                description={solution.description}
                icon={solution.icon}
                industries={solution.industries}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
