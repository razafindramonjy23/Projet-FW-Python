import React from "react";


const ServiceDetail = ({ title, description, icon, features }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-xl transition">
      <div className="flex items-center mb-6">
        <img src={icon} alt={title} className="w-16 h-16 mr-6" />
        <h2 className="text-2xl font-bold text-blue-600">{title}</h2>
      </div>
      <p className="text-gray-700 mb-6">{description}</p>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const servicesData = [
    {
      title: "Intelligence Artificielle Prédictive",
      description:
        "Transformez vos données en insights stratégiques avec nos solutions d'IA avancées.",
      icon: "/api/placeholder/80/80",
      features: [
        "Analyse prédictive en temps réel",
        "Modèles d'apprentissage automatique personnalisés",
        "Tableaux de bord interactifs",
        "Rapports de tendances détaillés",
      ],
    },
    {
      title: "Automatisation Intelligente",
      description:
        "Optimisez vos processus métiers grâce à l'automatisation basée sur l'IA.",
      icon: "/api/placeholder/80/80",
      features: [
        "Automatisation des tâches répétitives",
        "Réduction des erreurs humaines",
        "Augmentation de la productivité",
        "Intégration avec vos systèmes existants",
      ],
    },
    {
      title: "Conseil Stratégique IA",
      description:
        "Accompagnement personnalisé pour intégrer l'IA dans votre stratégie d'entreprise.",
      icon: "/api/placeholder/80/80",
      features: [
        "Audit technologique",
        "Stratégie d'implémentation IA",
        "Formation et support",
        "Veille technologique continue",
      ],
    },
  ];

  return (
    <>
      <div>
        <div className="bg-gray-50 min-h-screen pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Nos Services IA
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des solutions sur-mesure qui transforment vos défis métiers en
                opportunités stratégiques.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <ServiceDetail
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                />
              ))}
            </div>

            <div className="text-center mt-16">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Prêt à Révolutionner Votre Entreprise ?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Contactez nos experts pour une consultation gratuite et
                personnalisée.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
                Demander un Rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default ServicesPage;
