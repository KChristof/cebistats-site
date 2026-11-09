---
title: "Nettoyer sa base de données avant l’analyse : la check-list"
description: "Doublons, valeurs aberrantes, incohérences, codes manquants : les vérifications à faire systématiquement avant de lancer le moindre test statistique."
category: "Gestion de données"
date: 2026-07-08
readTime: "7 min"
---

Un test statistique appliqué à une base mal préparée donne un résultat faux avec trois décimales. Le nettoyage représente souvent plus de la moitié du temps d’une analyse. Voici la liste des vérifications que nous faisons sur chaque base.

## Avant de toucher aux données

**Gardez le fichier brut intact.** Travaillez sur une copie et ne modifiez jamais l’original. Toute correction doit pouvoir être retrouvée et refaite.

**Corrigez par script, pas à la main.** Une correction faite dans Excel case par case est invisible et impossible à reproduire. Un script R, Stata ou SPSS documente chaque modification et se relance en une seconde si la base est mise à jour.

**Rédigez le dictionnaire des variables** : nom, libellé, type, unité, valeurs possibles, codage des réponses manquantes.

## 1. Identifiants et doublons

- Chaque sujet a-t-il un identifiant unique ?
- Y a-t-il des lignes en double (même identifiant, ou mêmes valeurs sur toutes les variables) ?
- Un même patient apparaît-il sous deux identifiants (même nom, même date de naissance) ?

## 2. Valeurs hors plage

Pour chaque variable numérique, regardez le minimum, le maximum et un histogramme. Un âge de 345 ans, un poids de 6,8 kg chez un adulte ou une hémoglobine à 120 g/dL sont des erreurs de saisie (virgule oubliée, unité différente). Retournez au dossier source quand c’est possible ; sinon, mettez la valeur en manquant et notez-le.

## 3. Cohérence entre variables

C’est là que se cachent les erreurs les plus difficiles à voir :

- date de sortie antérieure à la date d’entrée ;
- homme enceinte, enfant de 3 ans marié ;
- « non fumeur » avec un nombre de cigarettes par jour renseigné ;
- durée de suivi négative.

## 4. Modalités des variables qualitatives

« F », « f », « Féminin », « femme » et « 2 » désignent souvent la même chose. Listez les modalités de chaque variable qualitative (`table()` dans R, `tab` dans Stata) et harmonisez-les. Faites attention aux espaces invisibles et aux accents.

## 5. Données manquantes

- Les codes « 99 », « 999 » ou « -1 » sont-ils bien déclarés comme manquants ? Sinon, ils faussent les moyennes.
- Quelle proportion de valeurs manque pour chaque variable ? Au-delà de 20 à 30 %, la variable devient difficile à exploiter.
- Les manquants sont-ils concentrés sur un site, une période, un enquêteur ?

Voir aussi notre article sur [les données manquantes](/blog/donnees-manquantes).

## 6. Dates et unités

Les dates importées depuis Excel sont une source classique d’erreurs : inversion jour et mois, dates stockées comme texte, nombres de série (45 000…). Vérifiez aussi que toutes les mesures sont dans la même unité (mg/dL ou mmol/L, cm ou m).

## 7. Variables dérivées

Recalculez vous-même l’âge, l’IMC, les durées et les scores à partir des variables d’origine, plutôt que de faire confiance à une colonne déjà calculée par quelqu’un d’autre.

## Le journal des corrections

Terminez par un document qui liste chaque correction : ligne, variable, valeur avant, valeur après, raison. C’est ce qui vous permettra de répondre sereinement si un membre du jury s’étonne d’un chiffre.

```r
library(dplyr)
base |> count(id) |> filter(n > 1)              # identifiants en double
base |> filter(age < 0 | age > 110)              # âges impossibles
base |> filter(date_sortie < date_entree)        # incohérences de dates
base |> mutate(sexe = recode(tolower(trimws(sexe)),
         "f" = "F", "féminin" = "F", "m" = "M", "masculin" = "M"))
```

> La meilleure correction reste celle qu’on n’a pas à faire : un formulaire KoboToolbox ou ODK bien conçu bloque la plupart de ces erreurs à la saisie. [Voir notre service collecte de données](/services#donnees).
