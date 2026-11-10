# cebistats.com — v2

Site vitrine statique de CEBI Stats, construit avec [Astro](https://astro.build).

## Commandes

```bash
npm install
npm run dev      # aperçu local : http://localhost:4321
npm run build    # génère le site dans dist/
```

## Où modifier le contenu

| Contenu | Fichier |
|---|---|
| Coordonnées, services, réalisations (champ `repo` pour un lien GitHub), étapes, FAQ, logiciels | `src/data/site.js` |
| Articles du blog (un fichier Markdown par article) | `src/content/blog/*.md` |
| Couleurs, polices | `src/styles/global.css` (variables `:root`, palette du monogramme CB) |
| Logo | `public/logo-cb.svg` ; régénérer les PNG avec `node scripts/make-images.mjs` |
| Pages | `src/pages/*.astro` |

Pour ajouter un article : copier un fichier de `src/content/blog/`, changer l'en-tête (title, description, category, date, readTime) et le texte.

## Déploiement (Vercel)

Vercel détecte Astro automatiquement (commande `npm run build`, dossier `dist`).
Le sitemap (`/sitemap-index.xml`) et le `robots.txt` sont générés.
