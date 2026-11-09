---
title: "Comment choisir le bon test statistique pour votre étude ?"
description: "L’utilisation d’un test inadapté est l’erreur la plus fréquente dans les thèses. Un guide pratique pour faire le bon choix selon vos variables."
category: "Biostatistique"
date: 2025-03-12
readTime: "6 min"
---

Choisir le mauvais test statistique peut invalider des mois de travail de recherche. Cette erreur est malheureusement très courante chez les étudiants en médecine et en santé publique. Ce guide vous donne les clés pour faire le bon choix.

## 1. La règle d’or : identifier le type de vos variables

Avant tout, déterminez la nature de vos variables. Sont-elles quantitatives continues (âge, poids, taux), quantitatives discrètes (nombre d’enfants), ou qualitatives (sexe, diagnostic, groupe) ? C’est la première question à se poser.

## 2. Comparer des moyennes : test t ou ANOVA ?

Pour comparer des moyennes entre **2 groupes indépendants**, utilisez le test t de Student si la distribution est normale, ou le test de Mann-Whitney sinon. Pour **3 groupes ou plus**, préférez l’ANOVA (Kruskal-Wallis si la distribution n’est pas normale).

## 3. Comparer des proportions : le test du Chi-2

Lorsque vos deux variables sont qualitatives (par exemple l’association entre sexe et maladie), le test du Chi-2 est votre allié. Vérifiez que les effectifs théoriques sont supérieurs ou égaux à 5 dans chaque case. Sinon, utilisez le test exact de Fisher.

## En résumé

| Situation | Distribution normale | Distribution non normale |
|---|---|---|
| 2 groupes indépendants, variable quantitative | Test t de Student | Mann-Whitney |
| 3 groupes ou plus, variable quantitative | ANOVA | Kruskal-Wallis |
| Mesures appariées (avant / après) | Test t apparié | Wilcoxon signé |
| Deux variables qualitatives | Chi-2 (Fisher si effectifs < 5) | |

> Notre [guide interactif « Quel test choisir ? »](/outils#choix-du-test) vous oriente vers le test adapté en quelques questions, avec le code R correspondant.
