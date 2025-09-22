# Portfolio Jekyll - Ludovic Thérage

Ce projet est un site statique Jekyll basé sur les demandes de Ludovic :
- Thème sombre, typo moderne, accent blanc
- Effet visuel : bulles blanches qui apparaissent et se transforment au mouvement du curseur (canvas)
- Page d'accueil avec bouton **Consulter mon porte folio** et modal de consentement
- Trois catégories (Compétences, Projets, À propos) avec animation au survol
- Logo en forme de bulle avec texte
- Responsive, accessible et documenté

## Structure
```
/ (root)
 |_ _config.yml
 |_ index.md (frontmatter -> layout: home)
 |_ _layouts/default.html
 |_ _layouts/home.html
 |_ pages/competences.md
 |_ pages/projets.md
 |_ pages/a-propos.md
 |_ assets/main.css
 |_ assets/main.js
 |_ assets/logo.svg
```
## Installation & test local
Prérequis : Ruby + Bundler (pour Jekyll).

1. Installer dépendances :
```bash
bundle install
```
2. Lancer Jekyll :
```bash
bundle exec jekyll serve
```
3. Ouvrir http://127.0.0.1:4000

> Si vous ne voulez pas configurer Ruby/Jekyll, vous pouvez ouvrir `_layouts/home.html` dans un navigateur en remplaçant les chemins locaux (mais les includes Liquid ne fonctionneront pas).

## Personnalisation
- Modifier `_config.yml` pour changer le titre, l'URL et l'email.
- Les pages se trouvent dans `pages/`.
- Le code d'animation est dans `assets/main.js`.

