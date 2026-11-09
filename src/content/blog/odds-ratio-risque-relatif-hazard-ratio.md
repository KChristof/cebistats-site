---
title: "OR, RR, HR : quelle mesure d’association rapporter ?"
description: "Odds ratio, risque relatif, hazard ratio : ce que mesure chacun, quand l’utiliser selon le type d’étude, et comment l’interpréter sans erreur dans une thèse."
category: "Biostatistique"
date: 2026-09-15
readTime: "7 min"
---

Odds ratio, risque relatif, hazard ratio : les trois s’interprètent de la même façon en apparence (1 = pas d’association, au-dessus de 1 = facteur de risque, en dessous = facteur protecteur). Pourtant ils ne mesurent pas la même chose, et les confondre est une erreur fréquente dans les discussions de thèse.

## Le risque relatif (RR)

Le RR compare directement deux **risques**, c’est-à-dire deux proportions de sujets qui présentent l’événement :

RR = risque chez les exposés / risque chez les non-exposés

Si 20 % des fumeurs et 10 % des non-fumeurs développent la maladie, RR = 2 : le risque est deux fois plus élevé chez les fumeurs. C’est la mesure la plus intuitive. Elle suppose que l’on suit des groupes dans le temps : **étude de cohorte** ou essai.

## L’odds ratio (OR)

L’OR compare deux **cotes** (odds). La cote est le rapport entre la probabilité de l’événement et celle de son absence : un risque de 20 % correspond à une cote de 0,20 / 0,80 = 0,25.

On l’utilise :

- dans les **études cas-témoins**, où le RR ne peut pas être calculé, puisque c’est le chercheur qui fixe la proportion de malades ;
- dans les **régressions logistiques**, qui produisent naturellement des OR ajustés.

## Le piège : un OR n’est pas un RR

Quand l’événement est rare (moins de 10 %), OR et RR sont proches. Quand il est fréquent, l’OR **exagère** l’association.

Exemple : 60 % d’événements chez les exposés, 40 % chez les non-exposés.

| Mesure | Calcul | Valeur |
|---|---|---|
| RR | 0,60 / 0,40 | 1,5 |
| OR | (0,60 / 0,40) / (0,40 / 0,60) | 2,25 |

Écrire « les exposés ont 2,25 fois plus de risque » serait faux. La formulation correcte est : « la cote de l’événement est multipliée par 2,25 ».

> Dans une étude transversale où l’issue est fréquente, préférez le **rapport de prévalences**, obtenu par une régression de Poisson à variance robuste ou une régression log-binomiale, plutôt qu’un OR de régression logistique.

## Le hazard ratio (HR)

Le HR vient de l’**analyse de survie** (modèle de Cox). Il compare des **taux instantanés** de survenue de l’événement entre deux groupes, en tenant compte du temps de suivi et des perdus de vue.

Un HR de 0,46 signifie qu’à tout moment du suivi, le taux de décès dans le groupe traité représente environ la moitié de celui du groupe témoin. Il repose sur l’hypothèse de **risques proportionnels**, à vérifier (résidus de Schoenfeld).

## En résumé

| Type d’étude | Mesure à rapporter | Modèle multivarié |
|---|---|---|
| Cohorte, essai (issue binaire) | RR | Poisson robuste, log-binomial |
| Cas-témoins | OR | Régression logistique |
| Transversale, issue rare | OR (≈ rapport de prévalences) | Régression logistique |
| Transversale, issue fréquente | Rapport de prévalences | Poisson robuste |
| Délai jusqu’à un événement | HR | Modèle de Cox |

## Toujours avec un intervalle de confiance

Une mesure d’association seule ne suffit pas : donnez son intervalle de confiance à 95 %. S’il contient 1, l’association n’est pas statistiquement significative au seuil de 5 %. Un intervalle large (par exemple 1,1 à 9,8) signale un manque de précision, souvent dû à un petit effectif : à mentionner dans les limites.
