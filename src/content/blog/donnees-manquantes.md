---
title: "Données manquantes : que faire avant de lancer l’analyse ?"
description: "Mesurer, comprendre et traiter les données manquantes : pourquoi remplacer par la moyenne est une mauvaise idée, et quand utiliser l’imputation multiple."
category: "Méthodes avancées"
date: 2026-03-03
readTime: "7 min"
---

Dans les études sur dossiers médicaux, il manque presque toujours des informations : un examen non réalisé, une variable non renseignée, un patient perdu de vue. La façon de traiter ces trous peut changer les conclusions.

## Étape 1 : mesurer

Pour chaque variable, calculez le nombre et le pourcentage de valeurs manquantes. Puis regardez **où** elles se trouvent : un site, une période, un type de patients ? Un tableau de ce type a sa place dans la thèse ou en annexe.

## Étape 2 : comprendre le mécanisme

Les statisticiens distinguent trois situations :

- **MCAR** (manquant complètement au hasard) : la donnée manque sans lien avec quoi que ce soit, par exemple un tube de sang cassé. C’est le cas le plus favorable, et le plus rare.
- **MAR** (manquant au hasard, conditionnellement aux données observées) : le manque dépend d’autres variables connues. Par exemple, la charge virale manque plus souvent dans un centre qui n’a pas d’accès facile au laboratoire.
- **MNAR** (manquant non au hasard) : le manque dépend de la valeur elle-même. Par exemple, les patients les plus graves ne reviennent pas à la consultation où l’on mesure l’issue.

On ne peut jamais prouver le mécanisme à partir des données, mais la connaissance du terrain permet de le raisonner. Il conditionne la méthode.

## Ce qu’il vaut mieux éviter

**Remplacer par la moyenne.** Cela réduit artificiellement la variabilité, resserre les intervalles de confiance et affaiblit les corrélations. Les résultats paraissent plus précis qu’ils ne le sont.

**Supprimer silencieusement.** La plupart des logiciels excluent automatiquement toute ligne incomplète d’une régression. Avec dix variables manquant chacune à 5 %, vous pouvez perdre 40 % de l’effectif sans vous en rendre compte. Vérifiez toujours le nombre d’observations utilisées par le modèle.

**Créer une modalité « non renseigné » partout.** Elle peut se justifier pour une variable descriptive, mais dans un modèle multivarié elle introduit souvent un biais.

## Les approches recommandées

**Analyse des cas complets**, si les manquants sont peu nombreux (moins de 5 %) et plausiblement MCAR. Elle reste simple et acceptable ; dites-le explicitement.

**Imputation multiple**, si les manquants sont plus nombreux et plausiblement MAR. On crée plusieurs bases complétées (souvent 20 ou plus), on fait l’analyse sur chacune, puis on combine les résultats selon les règles de Rubin. L’incertitude due aux manquants est ainsi prise en compte.

```r
library(mice)
imp <- mice(base, m = 20, seed = 2026)
fit <- with(imp, glm(deces ~ age + stade + diabete, family = binomial))
summary(pool(fit), conf.int = TRUE, exponentiate = TRUE)
```

**Analyse de sensibilité**, si un mécanisme MNAR est possible : on compare les résultats sous différentes hypothèses (par exemple en supposant que tous les perdus de vue sont décédés, puis qu’aucun ne l’est). Si les conclusions tiennent, elles sont solides.

## Cas particulier : l’analyse de survie

Les patients perdus de vue ne sont pas des données manquantes ordinaires : la méthode de Kaplan-Meier les traite comme **censurés**. Mais elle suppose que la censure n’est pas liée au pronostic. Dans certaines cohortes, beaucoup de perdus de vue sont en réalité des décès non enregistrés : la survie est alors surestimée. Il faut le discuter, et parfois choisir un autre critère, comme la rétention dans les soins.

## Ce qu’il faut écrire dans la thèse

1. Le pourcentage de manquants par variable ;
2. la méthode retenue et sa justification ;
3. le nombre de sujets réellement analysés dans chaque modèle ;
4. les limites qui en découlent.
