export type Language = "fr" | "en";

export const translations = {
  // Navbar
  nav: {
    features: { fr: "Fonctionnalités", en: "Features" },
    howItWorks: { fr: "Comment ça marche", en: "How It Works" },
    pricing: { fr: "Tarifs", en: "Pricing" },
    comingSoon: { fr: "À venir", en: "Coming Soon" },
    getStarted: { fr: "Commencer", en: "Get Started" },
  },

  // Hero
  hero: {
    badge: {
      fr: "Nouveau : Intégration Mac native",
      en: "New: Native Mac Integration",
    },
    title1: { fr: "Envoyez des milliers de", en: "Send thousands of" },
    titleHighlight: { fr: "SMS personnalisés", en: "personalized SMS" },
    title2: { fr: "en quelques clics", en: "in just a few clicks" },
    subtitle: {
      fr: "LogiText transforme votre liste de contacts en campagne SMS en moins de 5 minutes. Aucune configuration complexe.",
      en: "LogiText transforms your contact list into an SMS campaign in under 5 minutes. No complex setup required.",
    },
    cta: { fr: "Rejoindre la bêta", en: "Join the Beta" },
    demo: { fr: "Voir la démo", en: "See the Demo" },
    trusted: {
      fr: "Utilisé par 500+ entreprises",
      en: "Trusted by 500+ businesses",
    },
  },

  // Problem Section
  problem: {
    title: {
      fr: "Le problème avec les SMS aujourd'hui",
      en: "The Problem with SMS Today",
    },
    subtitle: {
      fr: "Les solutions existantes sont coûteuses, complexes et limitées.",
      en: "Existing solutions are expensive, complex, and limited.",
    },
    expensive: {
      title: { fr: "Coûteux", en: "Expensive" },
      desc: {
        fr: "0,05 $ - 0,15 $ par SMS. Les coûts explosent rapidement.",
        en: "$0.05 - $0.15 per SMS. Costs add up quickly.",
      },
    },
    complex: {
      title: { fr: "Complexe", en: "Complex" },
      desc: {
        fr: "APIs, webhooks, configuration technique requise.",
        en: "APIs, webhooks, technical setup required.",
      },
    },
    noPersonalization: {
      title: { fr: "Pas de personnalisation", en: "No Personalization" },
      desc: {
        fr: "Même message pour tout le monde, pas de variables.",
        en: "Same message for everyone, no variables.",
      },
    },
    deliverability: {
      title: { fr: "Délivrabilité incertaine", en: "Uncertain Deliverability" },
      desc: {
        fr: "Numéros bloqués, messages filtrés.",
        en: "Numbers blocked, messages filtered.",
      },
    },
  },

  // Solution Section
  solution: {
    title: { fr: "LogiText : Vos SMS", en: "LogiText: Your SMS" },
    subtitle: {
      fr: "Utilisez votre propre iPhone et Mac pour envoyer des SMS. Aucun coût par message.",
      en: "Use your own iPhone and Mac to send SMS. No per-message cost.",
    },
    free: {
      title: { fr: "Gratuit", en: "Free" },
      desc: {
        fr: "Pas de coût par SMS – votre forfait existant",
        en: "No per-SMS cost – your existing plan",
      },
    },
    personal: {
      title: { fr: "Personnel", en: "Personal" },
      desc: {
        fr: "Votre vrai numéro – taux de réponse élevé",
        en: "Your real number – high response rate",
      },
    },
    simple: {
      title: { fr: "Simple", en: "Simple" },
      desc: {
        fr: "CSV, message, envoyer – c'est tout",
        en: "CSV, message, send – that's it",
      },
    },
    personalized: {
      title: { fr: "Personnalisé", en: "Personalized" },
      desc: {
        fr: "Variables dynamiques [Prénom], [Date]",
        en: "Dynamic variables [FirstName], [Date]",
      },
    },
    validated: {
      title: { fr: "Validé", en: "Validated" },
      desc: {
        fr: "Détection des erreurs avant envoi",
        en: "Error detection before sending",
      },
    },
    tracked: {
      title: { fr: "Suivi", en: "Tracked" },
      desc: {
        fr: "Rapport complet après chaque campagne",
        en: "Complete report after each campaign",
      },
    },
  },

  // How It Works
  howItWorks: {
    title: { fr: "Une interface intuitive", en: "An Intuitive Interface" },
    subtitle: {
      fr: "Conçu pour être simple, rapide et efficace. Aucune formation nécessaire.",
      en: "Designed to be simple, fast, and efficient. No training needed.",
    },
    steps: {
      csv: {
        title: {
          fr: "1. Importez vos contacts",
          en: "1. Import Your Contacts",
        },
        desc: {
          fr: "Glissez votre fichier CSV. LogiText détecte automatiquement les colonnes et nettoie les numéros de téléphone.",
          en: "Drag your CSV file. LogiText automatically detects columns and cleans phone numbers.",
        },
      },
      compose: {
        title: { fr: "2. Rédigez votre message", en: "2. Write Your Message" },
        desc: {
          fr: "Créez des messages personnalisés avec des variables dynamiques comme [Prénom], [Date] ou [Entreprise].",
          en: "Create personalized messages with dynamic variables like [FirstName], [Date], or [Company].",
        },
      },
      crm: {
        title: { fr: "3. Validez la liste", en: "3. Validate the List" },
        desc: {
          fr: "Vérifiez chaque contact dans le CRM intégré. Les contacts invalides et suspects sont signalés automatiquement.",
          en: "Check each contact in the built-in CRM. Invalid and suspicious contacts are flagged automatically.",
        },
      },
      crmHover: {
        title: { fr: "3b. Détectez les erreurs", en: "3b. Detect Errors" },
        desc: {
          fr: "Survolez un contact pour voir les détails. Champs manquants en rouge, caractères suspects en orange.",
          en: "Hover over a contact to see details. Missing fields in red, suspicious characters in orange.",
        },
      },
      crmEdit: {
        title: { fr: "3c. Corrigez en ligne", en: "3c. Edit Inline" },
        desc: {
          fr: "Éditez directement les champs problématiques. Sauvegardez avec Entrée, annulez avec Échap.",
          en: "Edit problematic fields directly. Save with Enter, cancel with Escape.",
        },
      },
      sending: {
        title: { fr: "4. Suivez l'envoi", en: "4. Track Sending" },
        desc: {
          fr: "Visualisez la progression en temps réel. Le système optimise le débit pour garantir la délivrabilité.",
          en: "Watch the progress in real-time. The system optimizes throughput to ensure deliverability.",
        },
      },
      done: {
        title: { fr: "5. Bilan complet", en: "5. Complete Summary" },
        desc: {
          fr: "Obtenez un rapport détaillé une fois la campagne terminée. Voyez qui a reçu le message et les erreurs éventuelles.",
          en: "Get a detailed report once the campaign is complete. See who received the message and any errors.",
        },
      },
    },
  },

  // Coming Soon
  comingSoon: {
    title: { fr: "Prochainement", en: "Coming Soon" },
    subtitle: {
      fr: "Fonctionnalités en développement pour rendre LogiText encore plus puissant.",
      en: "Features in development to make LogiText even more powerful.",
    },
    analytics: {
      title: { fr: "Analytiques avancées", en: "Advanced Analytics" },
      desc: {
        fr: "Tableaux de bord et rapports détaillés",
        en: "Dashboards and detailed reports",
      },
    },
    templates: {
      title: { fr: "Modèles", en: "Templates" },
      desc: {
        fr: "Modèles de messages réutilisables",
        en: "Reusable message templates",
      },
    },
    scheduling: {
      title: { fr: "Planification", en: "Scheduling" },
      desc: {
        fr: "Programmez vos envois à l'avance",
        en: "Schedule your sends in advance",
      },
    },
    api: {
      title: { fr: "API", en: "API" },
      desc: {
        fr: "Intégrez LogiText à vos outils",
        en: "Integrate LogiText with your tools",
      },
    },
  },

  // Pricing
  pricing: {
    title: { fr: "Tarification simple", en: "Simple Pricing" },
    subtitle: {
      fr: "Pas de frais cachés. Pas de coût par SMS.",
      en: "No hidden fees. No per-SMS cost.",
    },
    free: {
      title: { fr: "Gratuit", en: "Free" },
      price: { fr: "0 $", en: "$0" },
      period: { fr: "/mois", en: "/month" },
      desc: { fr: "Pour toujours pendant la bêta", en: "Forever during beta" },
      features: {
        unlimited: { fr: "SMS illimités", en: "Unlimited SMS" },
        csv: { fr: "Import CSV", en: "CSV Import" },
        variables: { fr: "Variables personnalisées", en: "Custom Variables" },
        validation: { fr: "Validation des contacts", en: "Contact Validation" },
      },
    },
    cta: { fr: "Rejoindre la bêta", en: "Join the Beta" },
  },

  // CTA Section
  cta: {
    title: {
      fr: "Prêt à simplifier vos SMS?",
      en: "Ready to Simplify Your SMS?",
    },
    subtitle: {
      fr: "Rejoignez la bêta et commencez à envoyer des SMS personnalisés en quelques minutes.",
      en: "Join the beta and start sending personalized SMS in minutes.",
    },
    button: { fr: "Rejoindre la bêta", en: "Join the Beta" },
  },

  // Modal
  modal: {
    title: { fr: "Rejoindre la bêta", en: "Join the Beta" },
    subtitle: {
      fr: "Entrez vos informations pour accéder à LogiText.",
      en: "Enter your information to access LogiText.",
    },
    firstName: { fr: "Prénom", en: "First Name" },
    lastName: { fr: "Nom", en: "Last Name" },
    phone: { fr: "Téléphone", en: "Phone" },
    devices: { fr: "Appareils disponibles", en: "Available Devices" },
    submit: { fr: "Envoyer", en: "Submit" },
    success: {
      fr: "Merci! Nous vous contacterons bientôt.",
      en: "Thank you! We'll contact you soon.",
    },
    error: {
      fr: "Une erreur est survenue. Veuillez réessayer.",
      en: "An error occurred. Please try again.",
    },
  },

  // App Preview
  preview: {
    demo: { fr: "Démo", en: "Demo" },
    step1Title: { fr: "Sélectionnez vos contacts", en: "Select Your Contacts" },
    dragCsv: { fr: "Glissez votre fichier CSV", en: "Drag Your CSV File" },
    orClick: { fr: "ou cliquez pour parcourir", en: "or click to browse" },
    recentFiles: { fr: "Fichiers récents :", en: "Recent files:" },
    contacts: { fr: "contacts", en: "contacts" },
    step2Title: { fr: "Rédigez votre message", en: "Write Your Message" },
    insert: { fr: "Insérer :", en: "Insert:" },
    firstName: { fr: "Prénom", en: "FirstName" },
    lastName: { fr: "Nom", en: "LastName" },
    company: { fr: "Entreprise", en: "Company" },
    date: { fr: "Date", en: "Date" },
    back: { fr: "Retour", en: "Back" },
    continue: { fr: "Continuer", en: "Continue" },
    step3Title: { fr: "Destinataires", en: "Recipients" },
    all: { fr: "Tout", en: "All" },
    none: { fr: "Aucun", en: "None" },
    suspects: { fr: "Suspects", en: "Suspects" },
    invalids: { fr: "Invalides", en: "Invalid" },
    edit: { fr: "Éditer", en: "Edit" },
    send: { fr: "Envoyer", en: "Send" },
    editMode: { fr: "Mode Édition", en: "Edit Mode" },
    active: { fr: "ACTIF", en: "ACTIVE" },
    cancel: { fr: "Annuler", en: "Cancel" },
    save: { fr: "Sauvegarder", en: "Save" },
    clickToEdit: {
      fr: "Cliquez sur une cellule pour modifier – Entrée pour sauvegarder",
      en: "Click a cell to edit – Enter to save",
    },
    suspectChar: { fr: "Caractère suspect", en: "Suspicious Character" },
    missingField: { fr: "Champ manquant", en: "Missing Field" },
    phoneRequired: { fr: "Téléphone requis", en: "Phone Required" },
    correct: { fr: "Corriger", en: "Correct" },
    ignore: { fr: "Ignorer", en: "Ignore" },
    sending: { fr: "Envoi en cours...", en: "Sending..." },
    sendComplete: { fr: "Envoi terminé", en: "Sending Complete" },
    pause: { fr: "Pause", en: "Pause" },
    done: { fr: "Terminé!", en: "Done!" },
    contactsProcessed: { fr: "contacts traités.", en: "contacts processed." },
    sent: { fr: "Envoyés", en: "Sent" },
    error: { fr: "Erreur", en: "Error" },
    invalid: { fr: "Invalide", en: "Invalid" },
    logs: { fr: "Journaux", en: "Logs" },
    close: { fr: "Fermer", en: "Close" },
    empty: { fr: "(vide)", en: "(empty)" },
    hello: { fr: "Bonjour", en: "Hello" },
    appointmentConfirmed: { fr: "Votre RDV du", en: "Your appointment on" },
    isConfirmed: { fr: "est confirmé.", en: "is confirmed." },
  },

  // Footer
  footer: {
    rights: { fr: "Tous droits réservés.", en: "All rights reserved." },
  },

  // ClickOn Presentation Pages
  clickon: {
    liveSession: { fr: "Session en direct", en: "Live Session" },
    resetSession: { fr: "Réinitialiser", en: "Reset Session" },
    joinPresentation: { fr: "Rejoignez la", en: "Join the" },
    presentation: { fr: "Présentation", en: "Presentation" },
    scanQR: {
      fr: "Scannez le code QR pour participer",
      en: "Scan the QR code to participate",
    },
    reconnecting: { fr: "Reconnexion...", en: "Reconnecting..." },
    participantsConnected: {
      fr: "participant(s) connecté(s)",
      en: "participant(s) connected",
    },
    totalClients: { fr: "Total Clients", en: "Total Clients" },
    participants: { fr: "Participants", en: "Participants" },
    avgCommission: { fr: "Comm. Moy.", en: "Avg. Commission" },
    openRate: { fr: "Ouvertures (46%)", en: "Opens (46%)" },
    engagementRate: { fr: "Engagement (14%)", en: "Engagement (14%)" },
    potentialSales: { fr: "Ventes Pot. (5%)", en: "Pot. Sales (5%)" },
    potentialRevenue: {
      fr: "Revenu Potentiel Total",
      en: "Total Potential Revenue",
    },
    launchDemo: { fr: "Lancer la démo vidéo", en: "Launch Video Demo" },
    redirecting: { fr: "Redirection en cours...", en: "Redirecting..." },
    allRedirected: {
      fr: "Tous les participants sont redirigés vers la vidéo",
      en: "All participants are being redirected to the video",
    },
  },

  // Join Page
  join: {
    welcome: { fr: "Bienvenue!", en: "Welcome!" },
    enterInfo: {
      fr: "Entrez vos informations pour voir votre potentiel",
      en: "Enter your information to see your potential",
    },
    howManyClients: {
      fr: "Combien de clients avez-vous dans votre base de données?",
      en: "How many clients do you have in your database?",
    },
    clientsPlaceholder: { fr: "ex: 500", en: "e.g., 500" },
    avgCommissionLabel: {
      fr: "Quelle est votre commission moyenne? ($)",
      en: "What is your average commission? ($)",
    },
    commissionPlaceholder: { fr: "ex: 5000", en: "e.g., 5000" },
    calculating: { fr: "Calcul en cours...", en: "Calculating..." },
    calculatePotential: {
      fr: "Calculer Mon Potentiel",
      en: "Calculate My Potential",
    },
    yourResults: { fr: "Vos Résultats", en: "Your Results" },
    yourPotential: { fr: "Voici Votre Potentiel", en: "Here's Your Potential" },
    basedOn: {
      fr: "Basé sur votre base de données et vos commissions",
      en: "Based on your database and commissions",
    },
    clients: { fr: "Clients", en: "Clients" },
    avgComm: { fr: "Comm. Moyenne", en: "Avg. Commission" },
    opens: { fr: "Ouvertures (46%)", en: "Opens (46%)" },
    engagement: { fr: "Engagement (14%)", en: "Engagement (14%)" },
    potentialSales: {
      fr: "Ventes Potentielles (5%)",
      en: "Potential Sales (5%)",
    },
    yourPotentialRevenue: {
      fr: "Votre Revenu Potentiel",
      en: "Your Potential Revenue",
    },
    withAutomation: {
      fr: "Avec l'automatisation Club Privilège",
      en: "With Club Privilège automation",
    },
    waitingForPresenter: {
      fr: "En attente du présentateur...",
      en: "Waiting for presenter...",
    },
    redirectingToDemo: {
      fr: "Redirection vers la démo...",
      en: "Redirecting to demo...",
    },
    takingYouToDemo: {
      fr: "Direction la démo Logitext",
      en: "Taking you to the Logitext demo",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(
  section: keyof typeof translations,
  key: string,
  lang: Language,
): string {
  const sectionData = translations[section] as Record<
    string,
    Record<string, string> | Record<string, Record<string, string>>
  >;

  // Handle nested keys like "steps.csv.title"
  const keys = key.split(".");
  let value: unknown = sectionData;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if not found
    }
  }

  if (value && typeof value === "object" && lang in value) {
    return (value as Record<string, string>)[lang];
  }

  return key;
}
