import React, { useState, useCallback } from "react";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

// Custom Hook for Multi-Step Form Management
const useMultiStepForm = (initialData, totalSteps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [completedSteps, setCompletedSteps] = useState([]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps, completedSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const updateFormData = useCallback((section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }, []);

  const isStepValid = useCallback(
    (step) => {
      // Fonction utilitaire pour vérifier si tous les champs sont valides
      const areFieldsValid = (fields) =>
        fields.every((field) => field?.trim?.() !== "");

      switch (step) {
        case 1:
          return (
            formData.technicalSkills?.languages?.length > 0 &&
            formData.technicalSkills?.selectedLanguageLevel?.trim() !== ""
          );

        case 2:
          return areFieldsValid([
            formData.InformationPersonnel?.nom_prenom,
            formData.InformationPersonnel?.age,
            formData.InformationPersonnel?.situation_matrimoniale,
            formData.InformationPersonnel?.adresse,
            formData.InformationPersonnel?.email,
            formData.InformationPersonnel?.telephone,
          ]);

        case 3:
          return areFieldsValid([
            formData.SavoirFormation?.poste_envisage,
            formData.SavoirFormation?.formation_renseignements,
            formData.SavoirFormation?.dernier_travail,
            formData.SavoirFormation?.satisfaction_carriere,
          ]);

        case 4:
          return areFieldsValid([
            formData.Ponctualite?.retard_dernier,
            formData.Ponctualite?.definition_retard,
          ]);

        case 5:
          return areFieldsValid([
            formData.Tenacite?.difficulte_professionnelle,
            formData.Tenacite?.activites_difficiles,
            formData.Tenacite?.critique_travail,
            formData.Tenacite?.conflit_interets,
          ]);

        case 6:
          return areFieldsValid([
            formData.Integration?.type_personnes_preferees,
            formData.Integration?.reaction_remarque_negative,
            formData.Integration?.depasse_par_situation,
          ]);

        case 7:
          return areFieldsValid([
            formData.SensDuService?.type_personnes_preferees,
            formData.SensDuService?.tache_non_attribuee,
            formData.SensDuService?.esprit_initiative,
          ]);

        case 8:
          return areFieldsValid([
            formData.Autonomie?.travail_seul,
            formData.Autonomie?.demande_travail_non_prevus,
          ]);

        case 9:
          return areFieldsValid([formData.Organisation?.organisation_journee]);

        case 10:
          return areFieldsValid([
            formData.Satisfaction?.satisfactions_postes,
            formData.Satisfaction?.poste_ideal,
            formData.Satisfaction?.choix_entreprises,
            formData.Satisfaction?.bien_traite,
            formData.Satisfaction?.travail_soir_weekend,
            formData.Satisfaction?.competence_apportee,
          ]);

        case 11:
          return areFieldsValid([
            formData.TestTechniquePython?.execution_python,
            formData.TestTechniquePython?.specificateurs_acces,
            formData.TestTechniquePython?.copie_superficielle_profonde,
            formData.TestTechniquePython?.utilisation_decorateurs,
            formData.TestTechniquePython?.gestion_exceptions,
            formData.TestTechniquePython?.capture_exception,
            formData.TestTechniquePython?.threading_vs_multiprocessing,
          ]);

        case 12:
          return areFieldsValid([
            formData.TestTechniqueJavaScript?.local_state_vs_global_state,
            formData.TestTechniqueJavaScript?.userlist_component,
            formData.TestTechniqueJavaScript?.app_component,
            formData.TestTechniqueJavaScript?.userform_component,
          ]);

        case 13:
          return areFieldsValid([
            formData.TestTechniqueFullstack?.route_serveur,
            formData.TestTechniqueFullstack?.optimisation_requetes_bdd,
            formData.TestTechniqueFullstack?.deploiement_fullstack,
          ]);

        default:
          return false;
      }
    },
    [formData]
  );

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    completedSteps,
    isStepValid,
  };
};

// Hook for Form Submission
const useFormSubmission = (formData) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return { submitForm, isSubmitting, submissionStatus };
};
function Entretien() {
  const INITIAL_FORM_DATA = {
    technicalSkills: {
      languages: [],
      frameworks: [],
      selectedLanguageLevel: "",
    },
    InformationPersonnel: {
      nom_prenom: "",
      age: "",
      situation_matrimoniale: "",
      adresse: "",
      email: "",
      telephone: "",
    },
    SavoirFormation: {
      poste_envisage: "",
      formation_renseignements: "",
      dernier_travail: "",
      satisfaction_carriere: "",
    },
    Ponctualite: {
      retard_dernier: "",
      definition_retard: "",
    },
    Tenacite: {
      difficulte_professionnelle: "",
      activites_difficiles: "",
      critique_travail: "",
      conflit_interets: "",
    },
    Integration: {
      type_personnes_preferees: "",
      reaction_remarque_negative: "",
      depasse_par_situation: "",
    },
    SensDuService: {
      reaction_collegue_probleme: "",
      tache_non_attribuee: "",
      esprit_initiative: "",
    },
    Autonomie: {
      travail_seul: "",
      demande_travail_non_prevus: "",
    },

    Organisation: {
      organisation_journee: "",
    },

    Satisfaction: {
      satisfactions_postes: "",
      poste_ideal: "",
      choix_entreprises: "",
      bien_traite: "",
      travail_soir_weekend: "",
      competence_apportee: "",
    },

    TestTechniquePython: {
      execution_python: "",
      specificateurs_acces: "",
      copie_superficielle_profonde: "",
      utilisation_decorateurs: "",
      gestion_exceptions: "",
      capture_exception: "",
      threading_vs_multiprocessing: "",
    },

    TestTechniqueJavaScript: {
      local_state_vs_global_state: "",
      userlist_component: "",
      app_component: "",
      userform_component: "",
    },

    TestTechniqueFullstack: {
      route_serveur: "",
      optimisation_requetes_bdd: "",
      deploiement_fullstack: "",
    },
  };

  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    completedSteps,
    isStepValid,
  } = useMultiStepForm(INITIAL_FORM_DATA, 13);

  const { submitForm, isSubmitting, submissionStatus } =
    useFormSubmission(formData);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900">
              Compétences Techniques
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Langages de Programmation
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "JavaScript",
                  "Python",
                  "Java",
                  "C#",
                  "Ruby",
                  "Go",
                  "Rust",
                ].map((lang) => (
                  <label key={lang} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={formData.technicalSkills.languages.includes(
                        lang
                      )}
                      onChange={(e) => {
                        const updatedLangs = e.target.checked
                          ? [...formData.technicalSkills.languages, lang]
                          : formData.technicalSkills.languages.filter(
                              (l) => l !== lang
                            );
                        updateFormData(
                          "technicalSkills",
                          "languages",
                          updatedLangs
                        );
                      }}
                    />
                    <span className="ml-2">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Niveau de Maîtrise
              </label>
              <select
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                value={formData.technicalSkills.selectedLanguageLevel}
                onChange={(e) =>
                  updateFormData(
                    "technicalSkills",
                    "selectedLanguageLevel",
                    e.target.value
                  )
                }
              >
                <option value="">Sélectionner un niveau</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900">
              Informations Personnelles
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom et Prénom(s)
              </label>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Votre nom complet"
                value={formData.InformationPersonnel.nom_prenom || ""}
                onChange={(e) =>
                  updateFormData(
                    "InformationPersonnel",
                    "nom_prenom",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Âge
              </label>
              <input
                type="number"
                min="0"
                max="120"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Votre âge"
                value={formData.InformationPersonnel.age || ""}
                onChange={(e) =>
                  updateFormData("InformationPersonnel", "age", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Situation Matrimoniale
              </label>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Votre situation matrimoniale"
                value={
                  formData.InformationPersonnel.situation_matrimoniale || ""
                }
                onChange={(e) =>
                  updateFormData(
                    "InformationPersonnel",
                    "situation_matrimoniale",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Votre adresse complète"
                value={formData.InformationPersonnel.adresse || ""}
                onChange={(e) =>
                  updateFormData(
                    "InformationPersonnel",
                    "adresse",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Votre adresse complète"
                value={formData.InformationPersonnel.email || ""}
                onChange={(e) =>
                  updateFormData(
                    "InformationPersonnel",
                    "email",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Votre numéro de téléphone"
                value={formData.InformationPersonnel.telephone || ""}
                onChange={(e) =>
                  updateFormData(
                    "InformationPersonnel",
                    "telephone",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">
              Savoir et Formation
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Poste Envisagé
              </label>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Poste envisagée chez KONTIKI et qu'est-ce qui vous attire, dans le poste proposé?"
                value={formData.SavoirFormation.poste_envisage || ""}
                onChange={(e) =>
                  updateFormData(
                    "SavoirFormation",
                    "poste_envisage",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Formation et Renseignements
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Avez-vous suivi des formations ou vous êtes vous renseignés sur le poste si oui, racontez nous"
                value={formData.SavoirFormation.formation_renseignements || ""}
                onChange={(e) =>
                  updateFormData(
                    "SavoirFormation",
                    "formation_renseignements",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dernier Travail
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Quel est le dernier travai que vous avez occupé? Combien de temps? Et la raison pour laquelle vous avez quitté votre dernier emploi."
                value={formData.SavoirFormation.dernier_travail || ""}
                onChange={(e) =>
                  updateFormData(
                    "SavoirFormation",
                    "dernier_travail",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Satisfaction de Carrière
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Parlez de votre satisfaction professionnelle"
                value={formData.SavoirFormation.satisfaction_carriere || ""}
                onChange={(e) =>
                  updateFormData(
                    "SavoirFormation",
                    "satisfaction_carriere",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">
            Ponctualite
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment avez-vous géré votre dernier retard?
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Partagez votre passion et motivation pour le développement logiciel"
                value={formData.Ponctualite.retard_dernier}
                onChange={(e) =>
                  updateFormData(
                    "Ponctualite",
                    "retard_dernier",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Donnez nous votre definition de mot retard
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Décrivez vos objectifs professionnels à court et long terme"
                value={formData.Ponctualite.definition_retard}
                onChange={(e) =>
                  updateFormData(
                    "Ponctualite",
                    "definition_retard",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );
      
        case 5:
          return (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600">
              Tenacite
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment avez-vous géré votre dernier retard?
                </label>
                <textarea
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                  rows="3"
                  placeholder="Partagez votre passion et motivation pour le développement logiciel"
                  value={formData.Ponctualite.retard_dernier}
                  onChange={(e) =>
                    updateFormData(
                      "Ponctualite",
                      "retard_dernier",
                      e.target.value
                    )
                  }
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Donnez nous votre definition de mot retard
                </label>
                <textarea
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                  rows="3"
                  placeholder="Décrivez vos objectifs professionnels à court et long terme"
                  value={formData.Ponctualite.definition_retard}
                  onChange={(e) =>
                    updateFormData(
                      "Ponctualite",
                      "definition_retard",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    if (isStepValid(currentStep)) {
      submitForm();
    } else {
      alert("Veuillez remplir tous les champs obligatoires");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl p-6">
        {/* Barre de progression */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((step) => (
            <div
              key={step}
              className={`w-full h-2 mx-1 rounded-full ${
                completedSteps.includes(step) || currentStep >= step
                  ? "bg-amber-300"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Contenu de l'étape */}
        <div className="min-h-[400px]">{renderStepContent()}</div>

        {/* Navigation et soumission */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              <ChevronLeft className="mr-2" /> Précédent
            </button>
          )}

          {currentStep < 13 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className={`ml-auto flex items-center px-4 py-2 rounded-md ${
                isStepValid(currentStep)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Suivant <ChevronRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isStepValid(currentStep)}
              className={`ml-auto flex items-center px-4 py-2 rounded-md ${
                isStepValid(currentStep) && !isSubmitting
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  <CheckCircle2 className="mr-2" /> Soumettre
                </>
              )}
            </button>
          )}
        </div>

        {/* Statut de soumission */}
        {submissionStatus === "success" && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            Formulaire soumis avec succès !
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
            Erreur lors de la soumission. Veuillez réessayer.
          </div>
        )}
      </div>
    </div>
  );
}

export default Entretien;
