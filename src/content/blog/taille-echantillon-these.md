---
title: "Calculer la taille d’échantillon de sa thèse : méthode et exemples"
description: "Formule de Schwartz, comparaison de deux groupes, correction pour population finie, non-réponse : comment justifier le nombre de sujets de votre étude."
category: "Biostatistique"
date: 2026-10-20
readTime: "8 min"
---

« Combien de patients dois-je inclure ? » C’est souvent la première question méthodologique d’une thèse, et l’une des plus regardées par le jury. La réponse dépend du type d’étude et de l’objectif principal, pas d’une règle fixe comme « au moins 100 sujets ».

## Étude descriptive : estimer une proportion

Pour estimer une prévalence (par exemple la proportion de patients diabétiques ayant une plaie du pied), on utilise la formule de Schwartz :

**n = Z² × p × (1 − p) / d²**

- **Z** : 1,96 pour un niveau de confiance de 95 % ;
- **p** : la prévalence attendue, tirée de la littérature (une étude similaire, idéalement dans un contexte proche) ;
- **d** : la précision souhaitée, c’est-à-dire la marge d’erreur absolue, souvent 5 %.

Avec p = 30 % et d = 5 % : n = 1,96² × 0,30 × 0,70 / 0,05² = **323 sujets**.

Si aucune donnée n’existe, on prend p = 50 %, qui donne la taille maximale : 385 sujets avec d = 5 %.

> Attention au piège de la précision : si la prévalence attendue est faible (5 %), une marge de 5 % n’a pas de sens, car l’intervalle irait de 0 à 10 %. Prenez alors une précision plus fine (1 à 2 %).

## Corrections courantes

**Population finie.** Si la population source est petite et connue (par exemple 600 dossiers sur la période), on corrige : n′ = n / (1 + (n − 1) / N). Avec n = 323 et N = 600 : n′ = 210.

**Non-réponse.** Si vous prévoyez 10 % de refus ou de dossiers inexploitables, divisez par 0,90 : 323 / 0,90 = 359 sujets à approcher.

**Sondage en grappes.** Si vous tirez des villages ou des écoles plutôt que des individus, multipliez par l’effet de plan (souvent 1,5 à 2 en l’absence de données).

## Étude comparative : deux proportions

Pour comparer deux groupes (exposés et non exposés, deux traitements), il faut aussi fixer la **puissance**, c’est-à-dire la probabilité de détecter une différence si elle existe vraiment. On retient habituellement 80 %.

Exemple : on attend 30 % d’événements dans un groupe et 15 % dans l’autre, avec un risque α de 5 % et une puissance de 80 %. La formule classique donne **121 sujets par groupe**, soit 242 au total.

Plus la différence attendue est petite, plus l’effectif nécessaire augmente vite : pour détecter 30 % contre 25 %, il faudrait plus de 1 200 sujets par groupe.

## Étude comparative : deux moyennes

Pour comparer des moyennes, on a besoin de l’écart-type attendu (σ) et de la différence minimale que l’on juge cliniquement importante (Δ) :

**n par groupe = 2 × (Z<sub>α/2</sub> + Z<sub>β</sub>)² × σ² / Δ²**

Avec σ = 10 mmHg, Δ = 5 mmHg, α = 5 % et puissance 80 % : n = 2 × 2,80² × 100 / 25 = **63 sujets par groupe**.

## Et les études rétrospectives exhaustives ?

Beaucoup de thèses incluent tous les dossiers d’une période. Le calcul n’est alors pas un préalable, mais il reste utile de vérifier a posteriori que l’effectif permet de répondre à la question, et de le signaler dans les limites si ce n’est pas le cas.

## Ce que le jury attend dans le protocole

1. La formule utilisée et sa référence ;
2. la valeur de chaque paramètre, **avec sa source** (article, enquête nationale) ;
3. le résultat, puis les corrections (non-réponse, effet de plan) ;
4. l’effectif final visé.

> Notre [calculateur de taille d’échantillon](/outils#taille-echantillon) applique la formule de Schwartz avec correction pour population finie et non-réponse. Pour un plan plus complexe, [demandez-nous](/contact?type=biostatistique).
