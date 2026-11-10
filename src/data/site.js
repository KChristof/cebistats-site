// Source unique des contenus du site : modifier ici, toutes les pages suivent.

export const contact = {
  email: 'contact@cebistats.com',
  phoneDisplay: '+225 01 52 71 48 98',
  phoneIntl: '2250152714898',
  facebook: 'https://facebook.com/CEBISTATS',
  city: 'Abidjan, Côte d’Ivoire',
  validthese: 'https://validthese.cebistats.com/',
};

export const whatsapp = (text = 'Bonjour CEBI Stats, je voudrais des informations sur vos services.') =>
  `https://wa.me/${contact.phoneIntl}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/tableaux-de-bord', label: 'Tableaux de bord' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/outils', label: 'Outils' },
  { href: '/blog', label: 'Blog' },
  { href: '/a-propos', label: 'Le cabinet' },
];

export const tools = ['R', 'Shiny', 'Stata', 'SPSS', 'Python', 'Epi Info', 'KoboToolbox', 'ODK', 'DHIS2', 'Excel'];

export const services = [
  {
    id: 'biostatistique',
    title: 'Biostatistique',
    tagline: 'Analyser',
    short: 'Tests, régressions, analyse de survie. Des résultats interprétés, prêts pour le manuscrit.',
    lead: 'Choisir la bonne méthode, l’appliquer correctement, et vous rendre des résultats que vous pouvez défendre devant un jury ou un comité de lecture.',
    methods: [
      'Statistiques descriptives et tableaux de résultats',
      'Tests comparatifs : t de Student, ANOVA, Chi-2, Fisher, Mann-Whitney, Kruskal-Wallis',
      'Régression linéaire, logistique, de Poisson (uni- et multivariée)',
      'Analyse de survie : Kaplan-Meier, log-rank, modèle de Cox',
      'Calcul de taille d’échantillon et de puissance',
      'Plan d’analyse statistique (PAS)',
    ],
    deliverables: [
      'Rapport d’analyse interprété',
      'Section « Résultats » prête à intégrer',
      'Tableaux et figures aux normes de publication',
      'Scripts R, Stata ou SPSS sur demande',
    ],
    audience: 'Thèses de médecine, pharmacie et odontostomatologie, mémoires, articles scientifiques.',
  },
  {
    id: 'donnees',
    title: 'Collecte & gestion de données',
    tagline: 'Collecter',
    short: 'Formulaires KoboToolbox et ODK, apurement et documentation de vos bases.',
    lead: 'Une analyse ne vaut que ce que valent les données. Nous concevons des outils de collecte qui évitent les erreurs à la source, et nous remettons en état les bases existantes.',
    methods: [
      'Formulaires XLSForm (KoboToolbox, ODK) avec contrôles de saisie',
      'Sauts conditionnels, champs obligatoires, plages de valeurs',
      'Collecte hors ligne sur tablette ou smartphone',
      'Nettoyage : doublons, valeurs aberrantes, données manquantes',
      'Recodage, fusion de fichiers, dictionnaire des variables',
      'Contrôle de cohérence de données de routine',
    ],
    deliverables: [
      'Formulaire testé et déployé',
      'Base propre et documentée',
      'Journal des corrections',
      'Formation des enquêteurs',
    ],
    audience: 'Enquêtes de terrain, études hospitalières, programmes de santé, ONG.',
  },
  {
    id: 'tableaux-de-bord',
    title: 'Tableaux de bord interactifs',
    tagline: 'Piloter',
    short: 'Applications de suivi en ligne, branchées sur vos données, mises à jour sans intervention.',
    lead: 'Un tableau de bord remplace des dizaines de fichiers Excel envoyés par e-mail. Vos équipes consultent les mêmes chiffres, à jour, filtrés selon leurs besoins.',
    methods: [
      'Applications R Shiny et tableaux de bord web',
      'Connexion directe à KoboToolbox, DHIS2, bases SQL ou fichiers Excel',
      'Suivi de collecte : complétude, objectifs, alertes par enquêteur ou par site',
      'Indicateurs, cartes, séries temporelles, filtres par période et zone',
      'Contrôles qualité automatiques des données',
      'Accès protégé par mot de passe, export Excel et PDF',
    ],
    deliverables: [
      'Application en ligne, accessible sur ordinateur et téléphone',
      'Mise à jour automatique des données',
      'Guide d’utilisation et formation',
      'Maintenance sur devis',
    ],
    audience: 'Coordinations d’enquêtes, programmes de santé, ONG, directions et services hospitaliers.',
  },
  {
    id: 'formation',
    title: 'Formation & logiciels',
    tagline: 'Transmettre',
    short: 'Formations sur mesure en R, Stata, SPSS, Excel. Installation et maintenance.',
    lead: 'L’autonomie de nos clients fait partie du travail. Nos formations partent de vos propres données et de vos besoins réels.',
    methods: [
      'Initiation et perfectionnement : R, Stata, SPSS, Epi Info',
      'Excel avancé : tableaux croisés, formules, graphiques',
      'Word pour la thèse : styles, sommaire, numérotation automatique',
      'Installation et configuration de logiciels',
      'Maintenance informatique',
    ],
    deliverables: [
      'Sessions individuelles ou en groupe',
      'Supports et exercices sur vos données',
      'Suivi après la formation',
    ],
    audience: 'Étudiants, équipes de recherche, personnel administratif et de santé.',
  },
  {
    id: 'sites-web',
    title: 'Conception de sites internet',
    tagline: 'Publier',
    short: 'Sites vitrines, sites de projet ou d’étude, du cahier des charges à l’hébergement.',
    lead: 'Nous concevons votre site avec vous, de l’expression du besoin à la mise en ligne, et nous vous laissons les moyens de le faire vivre.',
    methods: [
      'Rédaction ou relecture du cahier des charges',
      'Arborescence, maquettes et identité visuelle',
      'Développement : site vitrine, site de projet ou d’étude, blog',
      'Affichage sur téléphone, référencement naturel, mesure d’audience',
      'Formulaires de contact, intégration de tableaux de bord',
      'Nom de domaine, hébergement, certificat de sécurité (HTTPS)',
    ],
    deliverables: [
      'Site en ligne sur votre nom de domaine',
      'Accès pour modifier vos contenus',
      'Documentation et prise en main',
      'Maintenance et hébergement sur devis',
    ],
    audience: 'Cabinets, associations, ONG, projets de recherche, structures de santé.',
  },
];

// Pour ajouter une étude : copier un bloc. `repo` (facultatif) = lien vers un dépôt
// GitHub de l'organisation du cabinet, avec données anonymisées.
export const projects = [
  {
    domain: 'Oncologie',
    title: 'Survie des patientes atteintes du cancer du sein',
    year: '2024',
    summary: 'Analyse de survie des patientes suivies pour un cancer du sein.',
    methods: ['Kaplan-Meier', 'Modèle de Cox', 'R'],
  },
  {
    domain: 'Oncologie',
    title: 'Survie des patientes atteintes du cancer du col de l’utérus',
    year: '2025',
    summary: 'Analyse de survie et facteurs pronostiques du cancer du col de l’utérus.',
    methods: ['Kaplan-Meier', 'Modèle de Cox', 'R'],
  },
  {
    domain: 'Pédiatrie',
    title: 'Délais de prise en charge des urgences chirurgicales pédiatriques',
    year: '2023',
    place: 'CHU de Cocody',
    summary: 'Mesure des délais de prise en charge et facteurs associés.',
    methods: ['Analyses descriptives', 'Tests comparatifs'],
  },
  {
    domain: 'Santé publique',
    title: 'Enfants et adolescents handicapés abandonnés en pouponnière',
    year: '2023',
    summary: 'Épidémiologie des enfants handicapés abandonnés admis dans les pouponnières de Côte d’Ivoire.',
    methods: ['Enquête transversale', 'Cartographie'],
  },
  {
    domain: 'Neurologie',
    title: 'Facteurs pronostiques des syndromes épileptiques',
    place: 'CHU de Cocody',
    summary: 'Patients vus en consultation d’épileptologie.',
    methods: ['Régression logistique'],
  },
  {
    domain: 'Santé au travail',
    title: 'Lésions auditives et nuisances sonores chez les téléopérateurs',
    year: '2010–2020',
    summary: 'Atteintes auditives liées à l’exposition au bruit.',
    methods: ['Étude longitudinale', 'Audiométrie'],
  },
  {
    domain: 'Cardiologie',
    title: 'Fréquentation des urgences cardiologiques',
    place: 'Institut de Cardiologie d’Abidjan',
    summary: 'Analyse de la fréquentation du service des urgences.',
    methods: ['Séries temporelles', 'Analyse de flux'],
  },
  {
    domain: 'Endocrinologie',
    title: 'Prévention des plaies du pied chez le patient diabétique',
    year: '2024',
    place: 'CHU de Cocody',
    summary: 'Connaissances, attitudes et pratiques (CAP) des patients diabétiques.',
    methods: ['Étude CAP', 'SPSS'],
  },
];

export const steps = [
  {
    title: 'Premier échange',
    text: 'Par WhatsApp, e-mail ou formulaire. Gratuit et sans engagement : nous regardons votre besoin et l’état de vos données.',
  },
  {
    title: 'Devis et plan d’analyse',
    text: 'Un devis clair, un calendrier calé sur votre échéance. Objectifs, variables et méthodes sont validés avec vous avant de commencer.',
  },
  {
    title: 'Analyse',
    text: 'Traitement dans R, Stata ou SPSS. Chaque choix de méthode est expliqué ; vous êtes tenu informé.',
  },
  {
    title: 'Livraison et explications',
    text: 'Rapport interprété, tableaux et figures prêts à intégrer. Nous restons disponibles jusqu’à la soutenance.',
  },
];

export const faq = [
  {
    q: 'Comment faire une demande ?',
    a: 'Contactez-nous par WhatsApp, par e-mail ou via le formulaire de contact. Décrivez brièvement votre projet : type d’étude, objectifs, état d’avancement des données. Nous organisons ensuite un premier échange gratuit et sans engagement.',
  },
  {
    q: 'Que faut-il fournir pour une analyse statistique ?',
    a: 'Idéalement : le protocole (ou une description de la méthodologie), la base de données, et le plan d’analyse statistique s’il existe déjà. Ces éléments nous permettent d’évaluer la qualité des données et la complexité des méthodes à mettre en œuvre.',
  },
  {
    q: 'Combien coûte une prestation ?',
    a: 'Chaque projet fait l’objet d’un devis personnalisé, selon l’étendue de l’accompagnement et la complexité méthodologique. Les étudiants bénéficient de tarifs adaptés. Le devis est envoyé rapidement après l’évaluation du projet.',
  },
  {
    q: 'Quels sont les délais ?',
    a: 'Ils dépendent de la taille de la base et des analyses demandées. Le délai est fixé dans le devis, en tenant compte de votre date de dépôt ou de soutenance.',
  },
  {
    q: 'Mes données restent-elles confidentielles ?',
    a: 'Oui. Vos données ne servent qu’à votre projet, ne sont jamais partagées et sont supprimées à votre demande en fin de prestation. Nous travaillons de préférence sur des bases anonymisées.',
  },
  {
    q: 'Travaillez-vous à distance ?',
    a: 'Oui. Le cabinet est basé à Abidjan et accompagne des clients dans toute la Côte d’Ivoire et à l’étranger, par WhatsApp, e-mail et visioconférence.',
  },
];
