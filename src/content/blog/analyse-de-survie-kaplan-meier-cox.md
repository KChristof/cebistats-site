---
title: "Analyse de survie : Kaplan-Meier et modèle de Cox expliqués"
description: "Incontournable en oncologie et en épidémiologie clinique, l’analyse de survie étudie le temps jusqu’à un événement. Les deux méthodes clés expliquées simplement."
category: "Méthodes avancées"
date: 2025-02-28
readTime: "8 min"
---

L’analyse de survie étudie le délai jusqu’à la survenue d’un événement : décès, rechute, guérison. C’est une méthode statistique spécialisée que vous rencontrerez souvent en recherche clinique, notamment en oncologie.

## Qu’est-ce que la courbe de Kaplan-Meier ?

La courbe de Kaplan-Meier représente la probabilité de survie au fil du temps pour un groupe de patients. Elle prend en compte les **données censurées** (patients perdus de vue, ou toujours en vie à la fin du suivi), ce que les méthodes classiques ne peuvent pas faire.

## Le modèle de Cox : aller plus loin

La régression de Cox (modèle à risques proportionnels) permet d’étudier l’effet simultané de plusieurs facteurs sur la survie. Elle produit des **hazard ratios (HR)** qui mesurent le risque relatif de l’événement entre groupes, ajusté sur les facteurs de confusion.

## Quand utiliser l’un ou l’autre ?

Kaplan-Meier est idéal pour décrire et comparer visuellement la survie entre 2 ou 3 groupes, avec le test du log-rank. Le modèle de Cox est nécessaire dès que vous voulez ajuster sur des covariables ou obtenir des mesures d’association (HR).

```r
library(survival)
fit <- survfit(Surv(delai, deces) ~ groupe, data = df)   # Kaplan-Meier
survdiff(Surv(delai, deces) ~ groupe, data = df)          # log-rank
m <- coxph(Surv(delai, deces) ~ age + stade, data = df)   # Cox
cox.zph(m)                                                # risques proportionnels
```

> CEBI Stats a réalisé des analyses de survie en oncologie (cancer du sein, cancer du col de l’utérus). [Contactez-nous](/contact?type=biostatistique) pour votre étude.
