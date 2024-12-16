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
                placeholder="Etes-vous aujourd'hui satisfait de votre carrière?"
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
            <h2 className="text-2xl font-bold text-blue-600">Ponctualite</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Retard
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="La dernière fois que vous êtes arrivé en retard, comment avez-vous géré la sitation?"
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
                Donnez nous votre definition du retard
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Selon vous, à partir de combien de temps êtes-vous en retard?"
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
            <h2 className="text-2xl font-bold text-blue-600">Tenacite</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Difficulté
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Racontez-nous la dernière fois où vous avez été confroné à une difficulté en situation professionnelle. Qu'avez-vous fait? Comment avez-vous réagi?"
                value={formData.Tenacite.difficulte_professionnelle}
                onChange={(e) =>
                  updateFormData(
                    "Tenacite",
                    "difficulte_professionnelle",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Activités difficiles
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Dans vos expériences professionnelle, quelles ont été les activités les plus difficiles à réaliser pour vous?"
                value={formData.Tenacite.activites_difficiles}
                onChange={(e) =>
                  updateFormData(
                    "Tenacite",
                    "activites_difficiles",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Critiques
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Dans vos expériences professionnelle, quelles ont été les activités les plus difficiles à réaliser pour vous?"
                value={formData.Tenacite.critique_travail}
                onChange={(e) =>
                  updateFormData("Tenacite", "critique_travail", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confit d'intérêts
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Dans vos expériences professionnelle, quelles ont été les activités les plus difficiles à réaliser pour vous?"
                value={formData.Tenacite.conflit_interets}
                onChange={(e) =>
                  updateFormData("Tenacite", "conflit_interets", e.target.value)
                }
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">Integration</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Choix équipe
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Avec quels types de personnes aimez-vous le mieux travailler? Pour quel raisons?"
                value={formData.Integration.type_personnes_preferees}
                onChange={(e) =>
                  updateFormData(
                    "Integration",
                    "type_personnes_preferees",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Remarque négative
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Un collègue vous fait une remarque négative sur la qualité de votre travail. Comment réagissez-vous?"
                value={formData.Integration.reaction_remarque_negative}
                onChange={(e) =>
                  updateFormData(
                    "Integration",
                    "reaction_remarque_negative",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Complications
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Avez-vous déjà été dépassé par la situation? Donnez-moi un exemple."
                value={formData.Integration.depasse_par_situation}
                onChange={(e) =>
                  updateFormData(
                    "Integration",
                    "depasse_par_situation",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">
              Sens du sérvice
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Aider les autres
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Vous êtes salarié de notre société, affecté au département DEVELOPPEUR. Ce matin vous êtes occupé dans une tâche urgente et importante. L'un de vos collègues va vers vous et se plaint vivement auprès de vous, car il est en retard sur son travail parce que son ordi a des soucis (la connexion internet ne marche pas). Quelle est votre réaction?"
                value={formData.SensDuService.reaction_collegue_probleme}
                onChange={(e) =>
                  updateFormData(
                    "SensDuService",
                    "reaction_collegue_probleme",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Agir
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Vous remarquez quil y a une tâche qui est pas faite et pourtant cette tâche ne fait pas partie de votre fiche de poste. Que faites-vous?"
                value={formData.SensDuService.tache_non_attribuee}
                onChange={(e) =>
                  updateFormData(
                    "SensDuService",
                    "tache_non_attribuee",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Initiative
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Avez-vous l'esprit d'initiative? Prouvez-le à l'aIde d'exemples."
                value={formData.SensDuService.esprit_initiative}
                onChange={(e) =>
                  updateFormData(
                    "SensDuService",
                    "esprit_initiative",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">Autonomie</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Travailler seul
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Avez-vous déjà travaillé seul? Qu'est-ce que vous avez trouvé difficile?"
                value={formData.Autonomie.reaction_collegue_probleme}
                onChange={(e) =>
                  updateFormData("Autonomie", "travail_seul", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Heure suplémentaire
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Le client vous demande un travail non prévu sur votre fiche de poste? Que faites-vous?"
                value={formData.Autonomie.demande_travail_non_prevus}
                onChange={(e) =>
                  updateFormData(
                    "Autonomie",
                    "demande_travail_non_prevus",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">Organisation</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment vous organisez-vous?
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Vous arrivez au bureau. Que faites-vous en premier? Comment vous organisez-vous?"
                value={formData.Organisation.organisation_journee}
                onChange={(e) =>
                  updateFormData(
                    "Organisation",
                    "organisation_journee",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">Satisfaction</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vos satisfactions ancien poste
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Quelles ont été vos satisfactions dans les postes que vous avez occupés?"
                value={formData.Satisfaction.satisfactions_postes}
                onChange={(e) =>
                  updateFormData(
                    "Satisfaction",
                    "satisfactions_postes",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Poste idéal
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Quel serait le poste Idéal pour vous?"
                value={formData.Satisfaction.poste_ideal}
                onChange={(e) =>
                  updateFormData("Satisfaction", "poste_ideal", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Choix entreprise
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Si on vous propose le même salaire et le même nombre d'heures, entre deux entreprises, laquelle choisissez-vous?"
                value={formData.Satisfaction.choix_entreprises}
                onChange={(e) =>
                  updateFormData(
                    "Satisfaction",
                    "choix_entreprises",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Traitement
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Quand avez-vous senti dans vos précédents postes que vous avez été bien traité?"
                value={formData.Satisfaction.bien_traite}
                onChange={(e) =>
                  updateFormData("Satisfaction", "bien_traite", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Travailler le weekend
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Est-ce un problème si l'on vous demande de travailler le soir et/ou le week-end?"
                value={formData.Satisfaction.travail_soir_weekend}
                onChange={(e) =>
                  updateFormData(
                    "Satisfaction",
                    "travail_soir_weekend",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apport pour l'entreprise
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Quelle compétence pouvez-vous apporter à cette entreprise?"
                value={formData.Satisfaction.competence_apportee}
                onChange={(e) =>
                  updateFormData(
                    "Satisfaction",
                    "competence_apportee",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">
              Teste Technique Python
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Execution python
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Expliquez brièvement le processus d'exécution d'un fichier Python"
                value={formData.TestTechniquePython.execution_python}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniquePython",
                    "execution_python",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                specificateurs d'accès
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Nous savons que Python est un langage orienté objet, mais a-t-il des spécificateurs d'accès ?"
                value={formData.TestTechniquePython.specificateurs_acces}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniquePython",
                    "specificateurs_acces",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                copie-superficielle-profonde
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Quand devez-vous utiliser la copie superficielle au lieu de la copie profonde, et vice versa ?"
                value={
                  formData.TestTechniquePython.copie_superficielle_profonde
                }
                onChange={(e) =>
                  updateFormData(
                    "TestTechniquePython",
                    "copie_superficielle_profonde",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Utilisation de decorateurs
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Expliquez l'utilisation de décorateurs en Python. Donnez un exemple pratique de situation où vous utiliseriez un décorateur."
                value={formData.TestTechniquePython.utilisation_decorateurs}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniquePython",
                    "utilisation_decorateurs",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gérer les exceptions
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Comment gérer les exceptions de manière robuste en Python? Donnez des exemples de situations où les exceptions seraient appropriées"
                value={formData.TestTechniquePython.gestion_exceptions}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniquePython",
                    "gestion_exceptions",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capturer les exceptions
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Pouvez-vous expliquer comment une exception peut être attrapée dans un programme Python ?"
                value={formData.TestTechniquePython.capture_exception}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniquePython",
                    "capture_exception",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                threading_vs_multiprocessing
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Décrivez les différences entre le threading et le multiprocessing en Python. Quand choisiriez-vous l'un par rapport à l'autre?"
                value={
                  formData.TestTechniquePython.threading_vs_multiprocessing
                }
                onChange={(e) =>
                  updateFormData(
                    "TestTechniquePython",
                    "threading_vs_multiprocessing",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">
              Test téchnique JavaScript
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                local_state_vs_global_state
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Comparez les avantages et les inconvénients des états locaux (local state) et des états gérés globalement (global state) dans une application Vue.js ou React.js."
                value={
                  formData.TestTechniqueJavaScript.local_state_vs_global_state
                }
                onChange={(e) =>
                  updateFormData(
                    "TestTechniqueJavaScript",
                    "local_state_vs_global_state",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                userlist_component
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Créez un composant fonctionnel nommé UserList qui reçoit une liste d'utilisateurs en tant que prop et affiche leurs noms dans une liste. Assurez-vous que le composant met à jour correctement le state avec la liste d'utilisateurs. (* sur vscode)"
                value={formData.TestTechniqueJavaScript.userlist_component}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniqueJavaScript",
                    "userlist_component",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                app_component
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Créez un composant parent nommé App qui contient le state avec une liste initiale d'utilisateurs. Ce composant doit rendre le composant UserList créé précédemment et un nouveau composant UserForm qui permet d'ajouter un nouvel utilisateur à la liste. (* sur vscode)"
                value={formData.TestTechniqueJavaScript.app_component}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniqueJavaScript",
                    "app_component",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                userform_component
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Implémentez le composant UserForm avec un formulaire simple qui permet à l'utilisateur de saisir un nom. Lorsque le formulaire est soumis, ajoutez un nouvel utilisateur à la liste dans le state du composant parent (App). Assurez-vous que le state est mis à jour correctement. (* sur vscode)"
                value={formData.TestTechniqueJavaScript.userform_component}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniqueJavaScript",
                    "userform_component",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">
              Test téchnique fullstack
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment vous organisez-vous?
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Mettez en place une route côté serveur (Django, Flask) qui renvoie une liste d'utilisateurs au format JSON. La liste d'utilisateurs peut être stockée dans un fichier json. (* sur vscode)"
                value={formData.TestTechniqueFullstack.route_serveur}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniqueFullstack",
                    "route_serveur",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Requêtes vers une base de données
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Comment optimisez-vous les requêtes vers une base de données pour améliorer les performances d'une application? Parlez de l'indexation, du caching, ou d'autres stratégies que vous avez déjà mise en œuvre dans vos expériences."
                value={
                  formData.TestTechniqueFullstack.optimisation_requetes_bdd
                }
                onChange={(e) =>
                  updateFormData(
                    "TestTechniqueFullstack",
                    "optimisation_requetes_bdd",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Processus de déploiement
              </label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Décrivez le processus de déploiement d'une application fullstack, en mettant l'accent sur les bonnes pratiques. Parlez de l'utilisation d'outils tels que Docker, Kubernetes, ou autres, selon votre expérience."
                value={formData.TestTechniqueFullstack.deploiement_fullstack}
                onChange={(e) =>
                  updateFormData(
                    "TestTechniqueFullstack",
                    "deploiement_fullstack",
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-28">
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
