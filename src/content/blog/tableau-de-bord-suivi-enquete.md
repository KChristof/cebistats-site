---
title: "Suivre une enquête de terrain en temps réel avec un tableau de bord"
description: "Objectifs par site, rythme de collecte, contrôles qualité automatiques : ce qu’un tableau de bord branché sur KoboToolbox change dans la conduite d’une enquête."
category: "Outils & méthodes"
date: 2026-01-20
readTime: "6 min"
---

Sur une enquête avec plusieurs équipes, la question revient chaque jour : où en est-on ? Sans outil, la réponse arrive tard, par des fichiers Excel envoyés par chaque superviseur, déjà périmés quand on les compile. Un tableau de bord branché directement sur le serveur de collecte change la conduite de l’enquête.

## Le principe

Les enquêteurs saisissent sur tablette (KoboToolbox ou ODK). Les questionnaires remontent sur le serveur dès qu’une connexion est disponible. Le tableau de bord interroge le serveur par son API, à intervalle régulier, et recalcule les indicateurs. Personne ne ressaisit rien.

## Ce qu’il faut suivre

**L’avancement par rapport aux objectifs**

- questionnaires reçus par site, par équipe, par enquêteur, comparés à la cible ;
- rythme quotidien, et projection de la date de fin au rythme actuel.

**La qualité de la collecte**, pendant qu’il est encore temps de corriger

- durée des entretiens : un questionnaire de 40 questions rempli en 3 minutes mérite une vérification ;
- taux de refus ou de « ne sait pas » anormalement élevés chez un enquêteur ;
- valeurs extrêmes, incohérences entre questions ;
- positions GPS hors de la zone attendue ;
- doublons d’identifiants.

**Les alertes**

Un site sous 50 % de son objectif à mi-parcours, un enquêteur sans soumission depuis deux jours : ces situations doivent ressortir sans qu’on ait à les chercher.

## Ce que cela change

- Les superviseurs interviennent pendant la collecte, et non après.
- La coordination parle des mêmes chiffres que le terrain.
- Les problèmes de formulaire (une question mal comprise, un saut mal programmé) sont repérés dès les premiers jours.
- La base finale demande beaucoup moins de nettoyage.

## Quelques points techniques à anticiper

- **La pagination de l’API.** Les serveurs de collecte renvoient les données par pages. Un script qui ne lit que la première page affiche un chiffre plafonné sans aucun message d’erreur. Vérifiez toujours le total affiché avec celui du serveur.
- **Les noms de champs.** Dans les formulaires organisés en groupes, les variables portent le chemin complet du groupe. Un tableau de bord robuste doit s’y adapter.
- **La confidentialité.** Les données individuelles ne doivent pas être visibles par tous. Prévoyez un accès protégé et n’affichez que des agrégats quand c’est possible.
- **L’hébergement.** Une application R Shiny a besoin d’un serveur capable de l’exécuter : hébergement dédié, conteneur ou service spécialisé.

## Par où commencer

Partez des décisions à prendre, pas des graphiques. Trois ou quatre indicateurs bien choisis, avec des seuils d’alerte clairs, valent mieux qu’un écran surchargé que personne ne regarde.

> Nous concevons des tableaux de bord de suivi d’enquête et d’indicateurs de programme. [Essayez notre démonstration](/tableaux-de-bord).
