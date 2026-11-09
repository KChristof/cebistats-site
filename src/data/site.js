// Source unique des contenus du site : modifier ici, toutes les pages suivent.

export const contact = {
  email: 'cebi.stat@yahoo.com',
  phoneDisplay: '+225 01 41 97 41 32',
  phoneIntl: '2250141974132',
  facebook: 'https://facebook.com/CEBISTATS',
  city: 'Abidjan, Côte d’Ivoire',
  validthese: 'https://validthese.cebistats.com/',
};

export const whatsapp = (text = 'Bonjour CEBI Stats, je voudrais des informations sur vos services.') =>
  `https://wa.me/${contact.phoneIntl}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/outils', label: 'Outils' },
  { href: '/blog', label: 'Blog' },
  { href: '/a-propos', label: 'À propos' },
];

export const tools = ['R', 'SPSS', 'Stata', 'Epi Info', 'ODK', 'KoboToolbox', 'Excel', 'DHIS2'];

export const services = [
  {
    id: 'biostatistique',
    num: '01',
    title: 'Biostatistique & analyse de données',
    short: 'Analyses descriptives, tests comparatifs, régressions et analyse de survie, interprétées pour votre manuscrit.',
    lead: 'Le cœur de notre métier : choisir la bonne méthode, l’appliquer correctement et vous rendre des résultats que vous pouvez défendre devant un jury ou un comité de lecture.',
    methods: [
      'Statistiques descriptives et tableaux de résultats',
      'Tests comparatifs : t de Student, ANOVA, Chi-2, Fisher, Mann-Whitney, Kruskal-Wallis',
      'Régression linéaire et logistique (uni- et multivariée)',
      'Analyse de survie : Kaplan-Meier, log-rank, modèle de Cox',
      'Calcul de taille d’échantillon et de puissance',
      'Plan d’analyse statistique (PAS)',
    ],
    deliverables: [
      'Rapport d’analyse interprété',
      'Section « Résultats » prête à intégrer',
      'Tableaux et figures aux normes de publication',
      'Scripts R / Stata / SPSS sur demande',
    ],
    audience: 'Thèses de médecine, pharmacie et odontostomatologie, mémoires, articles scientifiques.',
  },
  {
    id: 'donnees',
    num: '02',
    title: 'Collecte & gestion de données',
    short: 'Formulaires mobiles ODK / KoboToolbox, apurement et structuration de vos bases de données.',
    lead: 'Une analyse ne vaut que ce que valent les données. Nous concevons des outils de collecte qui évitent les erreurs à la source et nous remettons en état les bases existantes.',
    methods: [
      'Conception de formulaires XLSForm (ODK, KoboToolbox)',
      'Règles de validation, sauts conditionnels, champs obligatoires',
      'Déploiement sur tablette ou smartphone, collecte hors-ligne',
      'Nettoyage : doublons, valeurs aberrantes, données manquantes',
      'Recodage, fusion de fichiers, dictionnaire des variables',
      'Contrôle qualité des données de routine (DHIS2)',
    ],
    deliverables: [
      'Formulaire testé et déployé',
      'Base de données propre et documentée',
      'Journal des corrections effectuées',
      'Formation des enquêteurs',
    ],
    audience: 'Enquêtes de terrain, études hospitalières, programmes de santé, ONG.',
  },
  {
    id: 'formation',
    num: '03',
    title: 'Formation & logiciels',
    short: 'Formations sur mesure en statistique, R, SPSS, Excel et bureautique. Installation et maintenance.',
    lead: 'Nous croyons à l’autonomie de nos clients. Nos formations partent de vos propres données et de vos besoins réels.',
    methods: [
      'Initiation et perfectionnement : R, SPSS, Stata, Epi Info',
      'Excel avancé : tableaux croisés, formules, graphiques',
      'Bureautique : Word (mise en forme de thèse), PowerPoint',
      'Installation et configuration de logiciels',
      'Maintenance informatique',
    ],
    deliverables: [
      'Sessions individuelles ou en groupe',
      'Supports de cours et exercices',
      'Accompagnement après la formation',
    ],
    audience: 'Étudiants, équipes de recherche, personnel administratif et de santé.',
  },
  {
    id: 'edition',
    num: '04',
    title: 'Mise en forme & infographie',
    short: 'Mise en page de thèses et rapports, graphiques, posters scientifiques et supports visuels.',
    lead: 'Un bon résultat mérite une présentation claire. Nous mettons en forme vos documents et produisons des visuels lisibles.',
    methods: [
      'Mise en page de thèses, mémoires et rapports',
      'Sommaires, listes de tableaux et figures automatiques',
      'Graphiques et figures scientifiques',
      'Posters de congrès et diaporamas de soutenance',
      'Visuels et supports de communication',
    ],
    deliverables: [
      'Document final au format Word et PDF',
      'Fichiers sources des visuels',
    ],
    audience: 'Soutenances, congrès, rapports institutionnels.',
  },
];

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
    summary: 'Mesure et facteurs associés aux délais de prise en charge.',
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
    summary: 'Étude des atteintes auditives liées à l’exposition au bruit.',
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
    title: 'Vous nous présentez le projet',
    text: 'Par WhatsApp, e-mail ou formulaire. Un premier échange gratuit et sans engagement pour comprendre votre besoin et l’état de vos données.',
  },
  {
    title: 'Devis et plan d’analyse',
    text: 'Vous recevez un devis clair. Nous validons ensemble les objectifs, les variables et les méthodes avant de commencer.',
  },
  {
    title: 'Analyse et échanges',
    text: 'Nous traitons les données (R, SPSS, Stata) et vous tenons informé. Chaque choix de méthode est expliqué.',
  },
  {
    title: 'Livraison et explications',
    text: 'Rapport interprété, tableaux et figures prêts à intégrer. Nous restons disponibles pour vous préparer à la soutenance.',
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
    a: 'Oui. Vos données ne sont utilisées que pour votre projet, ne sont jamais partagées et sont supprimées à votre demande en fin de prestation. Nous travaillons de préférence sur des bases anonymisées.',
  },
  {
    q: 'Travaillez-vous à distance ?',
    a: 'Oui. Nous sommes basés à Abidjan et accompagnons aussi des clients dans toute la Côte d’Ivoire et à l’étranger, par WhatsApp, e-mail et visioconférence.',
  },
];
