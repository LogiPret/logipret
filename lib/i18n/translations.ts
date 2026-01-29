export type Language = "fr" | "en";

export const translations = {
  // Navbar
  nav: {
    features: { fr: "Fonctionnalites", en: "Features" },
    howItWorks: { fr: "Comment ca marche", en: "How it Works" },
    pricing: { fr: "Tarifs", en: "Pricing" },
    comingSoon: { fr: "A venir", en: "Coming Soon" },
    getStarted: { fr: "Commencer", en: "Get Started" },
  },

  // Hero
  hero: {
    badge: {
      fr: "Nouveau: Integration Mac native",
      en: "New: Native Mac Integration",
    },
    title1: { fr: "Envoyez des milliers de", en: "Send thousands of" },
    titleHighlight: { fr: "SMS personnalises", en: "personalized SMS" },
    title2: { fr: "en quelques clics", en: "in just a few clicks" },
    subtitle: {
      fr: "LogiText transforme votre liste de contacts en campagne SMS en moins de 5 minutes. Aucune configuration complexe.",
      en: "LogiText transforms your contact list into an SMS campaign in under 5 minutes. No complex setup required.",
    },
    cta: { fr: "Rejoindre la Beta", en: "Join the Beta" },
    demo: { fr: "Voir la demo", en: "See the demo" },
    trusted: {
      fr: "Utilise par 500+ entreprises",
      en: "Trusted by 500+ businesses",
    },
  },

  // Problem Section
  problem: {
    title: {
      fr: "Le probleme avec les SMS aujourd'hui",
      en: "The problem with SMS today",
    },
    subtitle: {
      fr: "Les solutions existantes sont couteuses, complexes, et limitees.",
      en: "Existing solutions are expensive, complex, and limited.",
    },
    expensive: {
      title: { fr: "Couteux", en: "Expensive" },
      desc: {
        fr: "0.05$ - 0.15$ par SMS. Les couts explosent rapidement.",
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
      title: { fr: "Pas de personnalisation", en: "No personalization" },
      desc: {
        fr: "Meme message pour tout le monde, pas de variables.",
        en: "Same message for everyone, no variables.",
      },
    },
    deliverability: {
      title: { fr: "Delivrabilite incertaine", en: "Uncertain deliverability" },
      desc: {
        fr: "Numeros bloques, messages filtres.",
        en: "Numbers blocked, messages filtered.",
      },
    },
  },

  // Solution Section
  solution: {
    title: { fr: "LogiText: Vos SMS", en: "LogiText: Your SMS" },
    subtitle: {
      fr: "Utilisez votre propre iPhone et Mac pour envoyer des SMS. Aucun cout par message.",
      en: "Use your own iPhone and Mac to send SMS. No per-message cost.",
    },
    free: {
      title: { fr: "Gratuit", en: "Free" },
      desc: {
        fr: "Pas de cout par SMS - votre forfait existant",
        en: "No per-SMS cost - your existing plan",
      },
    },
    personal: {
      title: { fr: "Personnel", en: "Personal" },
      desc: {
        fr: "Votre vrai numero - taux de reponse eleve",
        en: "Your real number - high response rate",
      },
    },
    simple: {
      title: { fr: "Simple", en: "Simple" },
      desc: {
        fr: "CSV, message, envoyer - c'est tout",
        en: "CSV, message, send - that's it",
      },
    },
    personalized: {
      title: { fr: "Personnalise", en: "Personalized" },
      desc: {
        fr: "Variables dynamiques [Prenom], [Date]",
        en: "Dynamic variables [FirstName], [Date]",
      },
    },
    validated: {
      title: { fr: "Valide", en: "Validated" },
      desc: {
        fr: "Detection des erreurs avant envoi",
        en: "Error detection before sending",
      },
    },
    tracked: {
      title: { fr: "Suivi", en: "Tracked" },
      desc: {
        fr: "Rapport complet apres chaque campagne",
        en: "Complete report after each campaign",
      },
    },
  },

  // How It Works
  howItWorks: {
    title: { fr: "Une interface intuitive", en: "An intuitive interface" },
    subtitle: {
      fr: "Concu pour etre simple, rapide et efficace. Aucune formation necessaire.",
      en: "Designed to be simple, fast, and efficient. No training needed.",
    },
    steps: {
      csv: {
        title: {
          fr: "1. Importez vos contacts",
          en: "1. Import your contacts",
        },
        desc: {
          fr: "Glissez votre fichier CSV. LogiText detecte automatiquement les colonnes et nettoie les numeros de telephone.",
          en: "Drag your CSV file. LogiText automatically detects columns and cleans phone numbers.",
        },
      },
      compose: {
        title: { fr: "2. Redigez votre message", en: "2. Write your message" },
        desc: {
          fr: "Creez des messages personnalises avec des variables dynamiques comme [Prenom], [Date] ou [Entreprise].",
          en: "Create personalized messages with dynamic variables like [FirstName], [Date], or [Company].",
        },
      },
      crm: {
        title: { fr: "3. Validez la liste", en: "3. Validate the list" },
        desc: {
          fr: "Verifiez chaque contact dans le CRM integre. Les contacts invalides et suspects sont signales automatiquement.",
          en: "Check each contact in the built-in CRM. Invalid and suspicious contacts are flagged automatically.",
        },
      },
      crmHover: {
        title: { fr: "3b. Detectez les erreurs", en: "3b. Detect errors" },
        desc: {
          fr: "Survolez un contact pour voir les details. Champs manquants en rouge, caracteres suspects en orange.",
          en: "Hover over a contact to see details. Missing fields in red, suspicious characters in orange.",
        },
      },
      crmEdit: {
        title: { fr: "3c. Corrigez en ligne", en: "3c. Edit inline" },
        desc: {
          fr: "Editez directement les champs problematiques. Sauvegardez avec Entree, annulez avec Echap.",
          en: "Edit problematic fields directly. Save with Enter, cancel with Escape.",
        },
      },
      sending: {
        title: { fr: "4. Suivez l'envoi", en: "4. Track sending" },
        desc: {
          fr: "Visualisez la progression en temps reel. Le systeme optimise le debit pour garantir la delivrabilite.",
          en: "Watch the progress in real-time. The system optimizes throughput to ensure deliverability.",
        },
      },
      done: {
        title: { fr: "5. Bilan complet", en: "5. Complete summary" },
        desc: {
          fr: "Obtenez un rapport detaille une fois la campagne terminee. Voyez qui a recu le message et les erreurs eventuelles.",
          en: "Get a detailed report once the campaign is complete. See who received the message and any errors.",
        },
      },
    },
  },

  // Coming Soon
  comingSoon: {
    title: { fr: "Prochainement", en: "Coming Soon" },
    subtitle: {
      fr: "Fonctionnalites en developpement pour rendre LogiText encore plus puissant.",
      en: "Features in development to make LogiText even more powerful.",
    },
    analytics: {
      title: { fr: "Analytiques avancees", en: "Advanced analytics" },
      desc: {
        fr: "Tableaux de bord et rapports detailles",
        en: "Dashboards and detailed reports",
      },
    },
    templates: {
      title: { fr: "Templates", en: "Templates" },
      desc: {
        fr: "Modeles de messages reutilisables",
        en: "Reusable message templates",
      },
    },
    scheduling: {
      title: { fr: "Planification", en: "Scheduling" },
      desc: {
        fr: "Programmez vos envois a l'avance",
        en: "Schedule your sends in advance",
      },
    },
    api: {
      title: { fr: "API", en: "API" },
      desc: {
        fr: "Integrez LogiText a vos outils",
        en: "Integrate LogiText with your tools",
      },
    },
  },

  // Pricing
  pricing: {
    title: { fr: "Tarification simple", en: "Simple pricing" },
    subtitle: {
      fr: "Pas de frais caches. Pas de cout par SMS.",
      en: "No hidden fees. No per-SMS cost.",
    },
    free: {
      title: { fr: "Gratuit", en: "Free" },
      price: { fr: "0$", en: "$0" },
      period: { fr: "/mois", en: "/month" },
      desc: { fr: "Pour toujours pendant la beta", en: "Forever during beta" },
      features: {
        unlimited: { fr: "SMS illimites", en: "Unlimited SMS" },
        csv: { fr: "Import CSV", en: "CSV import" },
        variables: { fr: "Variables personnalisees", en: "Custom variables" },
        validation: { fr: "Validation des contacts", en: "Contact validation" },
      },
    },
    cta: { fr: "Rejoindre la Beta", en: "Join the Beta" },
  },

  // CTA Section
  cta: {
    title: {
      fr: "Pret a simplifier vos SMS?",
      en: "Ready to simplify your SMS?",
    },
    subtitle: {
      fr: "Rejoignez la beta et commencez a envoyer des SMS personnalises en quelques minutes.",
      en: "Join the beta and start sending personalized SMS in minutes.",
    },
    button: { fr: "Rejoindre la Beta", en: "Join the Beta" },
  },

  // Modal
  modal: {
    title: { fr: "Rejoindre la Beta", en: "Join the Beta" },
    subtitle: {
      fr: "Entrez vos informations pour acceder a LogiText.",
      en: "Enter your information to access LogiText.",
    },
    firstName: { fr: "Prenom", en: "First name" },
    lastName: { fr: "Nom", en: "Last name" },
    phone: { fr: "Telephone", en: "Phone" },
    devices: { fr: "Appareils disponibles", en: "Available devices" },
    submit: { fr: "Envoyer", en: "Submit" },
    success: {
      fr: "Merci! Nous vous contacterons bientot.",
      en: "Thank you! We'll contact you soon.",
    },
    error: {
      fr: "Une erreur est survenue. Veuillez reessayer.",
      en: "An error occurred. Please try again.",
    },
  },

  // App Preview
  preview: {
    demo: { fr: "Demo", en: "Demo" },
    step1Title: { fr: "Selectionnez vos contacts", en: "Select your contacts" },
    dragCsv: { fr: "Glissez votre fichier CSV", en: "Drag your CSV file" },
    orClick: { fr: "ou cliquez pour parcourir", en: "or click to browse" },
    recentFiles: { fr: "Fichiers recents :", en: "Recent files:" },
    contacts: { fr: "contacts", en: "contacts" },
    step2Title: { fr: "Redigez votre message", en: "Write your message" },
    insert: { fr: "Inserer :", en: "Insert:" },
    firstName: { fr: "Prenom", en: "FirstName" },
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
    edit: { fr: "Editer", en: "Edit" },
    send: { fr: "Envoyer", en: "Send" },
    editMode: { fr: "Mode Edition", en: "Edit Mode" },
    active: { fr: "ACTIF", en: "ACTIVE" },
    cancel: { fr: "Annuler", en: "Cancel" },
    save: { fr: "Sauver", en: "Save" },
    clickToEdit: {
      fr: "Cliquez sur une cellule pour modifier - Entree pour sauvegarder",
      en: "Click a cell to edit - Enter to save",
    },
    suspectChar: { fr: "Caractere suspect", en: "Suspicious character" },
    missingField: { fr: "Champ manquant", en: "Missing field" },
    phoneRequired: { fr: "Telephone requis", en: "Phone required" },
    correct: { fr: "Corriger", en: "Correct" },
    ignore: { fr: "Ignorer", en: "Ignore" },
    sending: { fr: "Envoi...", en: "Sending..." },
    sendComplete: { fr: "Envoi termine", en: "Sending complete" },
    pause: { fr: "Pause", en: "Pause" },
    done: { fr: "Termine !", en: "Done!" },
    contactsProcessed: { fr: "contacts traites.", en: "contacts processed." },
    sent: { fr: "Envoyes", en: "Sent" },
    error: { fr: "Erreur", en: "Error" },
    invalid: { fr: "Invalide", en: "Invalid" },
    logs: { fr: "Logs", en: "Logs" },
    close: { fr: "Fermer", en: "Close" },
    empty: { fr: "(vide)", en: "(empty)" },
    hello: { fr: "Bonjour", en: "Hello" },
    appointmentConfirmed: { fr: "Votre RDV du", en: "Your appointment on" },
    isConfirmed: { fr: "est confirme.", en: "is confirmed." },
  },

  // Footer
  footer: {
    rights: { fr: "Tous droits reserves.", en: "All rights reserved." },
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
