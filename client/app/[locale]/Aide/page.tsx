"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  DollarSign,
  HelpCircle,
  Mail,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

const AidePage = () => {
  const sections = [
    {
      title: "Gestion de l'Agenda",
      icon: <Calendar className="w-6 h-6" />,
      description: "Apprenez à organiser vos tâches et événements efficacement",
      items: [
        "Comment ajouter une nouvelle tâche",
        "Navigation entre les vues mensuelles et hebdomadaires",
        "Gestion des tâches récurrentes",
        "Marquer une tâche comme terminée",
      ],
    },
    {
      title: "Gestion du Budget",
      icon: <DollarSign className="w-6 h-6" />,
      description:
        "Maîtrisez vos finances avec nos outils de gestion budgétaire",
      items: [
        "Ajouter une dépense ou un revenu",
        "Suivi des dépenses par catégorie",
        "Conversion des devises",
        "Analyse des tendances de dépenses",
      ],
    },
    {
      title: "Paramètres du Compte",
      icon: <Settings className="w-6 h-6" />,
      description: "Personnalisez votre expérience utilisateur",
      items: [
        "Modifier vos informations personnelles",
        "Changer la langue de l'application",
        "Gérer les notifications",
        "Sécurité et confidentialité",
      ],
    },
    {
      title: "Collaboration",
      icon: <Users className="w-6 h-6" />,
      description: "Travaillez en équipe sur vos projets",
      items: [
        "Inviter des membres",
        "Partager des tâches",
        "Gérer les permissions",
        "Communication en temps réel",
      ],
    },
  ];

  const contactOptions = [
    {
      title: "Centre d'Assistance",
      icon: <HelpCircle className="w-6 h-6" />,
      description: "Consultez notre base de connaissances",
      link: "#",
    },
    {
      title: "Support par Email",
      icon: <Mail className="w-6 h-6" />,
      description: "support@planificateur.ca",
      link: "mailto:support@planificateur.ca",
    },
    {
      title: "Chat en Direct",
      icon: <MessageCircle className="w-6 h-6" />,
      description: "Discutez avec notre équipe",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
      <div className="w-full max-w-6xl mx-auto bg-[#f9fafb] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Centre d&apos;Aide & Support
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Tout ce dont vous avez besoin pour utiliser efficacement notre
          application
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Contactez-nous</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                  {option.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <Button variant="outline" asChild>
                <a href={option.link}>Contacter</a>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Besoin d&apos;aide supplémentaire ?
          </h2>
          <p className="text-gray-600 mb-6">
            Notre équipe est disponible 24/7 pour vous aider
          </p>
          <Button size="lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            Démarrer une conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AidePage;
