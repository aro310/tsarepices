# Déploiement sur Netlify

## Configuration préparée

Le fichier `netlify.toml`, à la racine du projet, définit :

- Dossier de base : `frontend`
- Commande : `npm run build -- --webpack`
- Node.js : `24`

Netlify détecte Next.js et installe automatiquement son adaptateur OpenNext.
Il prend en charge les pages dynamiques, les API Next.js et les images.
Conserver la configuration Next.js : le mode `standalone` sert également à Docker.
Ne pas envoyer uniquement le dossier `.next` dans Netlify Drop : ce site nécessite
une compilation avec l'adaptateur Netlify.

## Publication depuis GitHub ou GitLab

1. Mettre les sources à jour dans le dépôt, en incluant `netlify.toml`,
   `frontend/package-lock.json`, `frontend/public` et `frontend/src`.
   Exclure `node_modules`, `.next`, `.netlify`, les fichiers `.env` et les bases locales.
2. Se connecter à Netlify, puis choisir **Add new project → Import an existing project**.
3. Sélectionner le dépôt et la branche contenant ces sources.
4. Vérifier les paramètres ci-dessus, puis lancer le déploiement.
5. Après succès, ouvrir l'URL `https://<nom-du-projet>.netlify.app`.

## Services externes

Le catalogue affiché et le panier utilisent les données incluses dans le frontend.
Le message de commande WhatsApp est généré directement dans le navigateur :
ces fonctions ne nécessitent pas les services Flask.

Le formulaire de contact, en revanche, envoie les demandes à `/api/contact`,
qui appelle le service Flask. Pour qu'il fonctionne en production, configurer :

- `CONTACT_SERVICE_URL` : URL HTTPS publique du service contact, sans `/messages`.
- `CATALOG_SERVICE_URL` : facultatif, URL publique du service catalogue.
- `ORDERS_SERVICE_URL` : nécessaire seulement si l'ancienne API d'archivage
  des commandes doit être utilisée ; le panier WhatsApp ne l'appelle pas.

Ces variables se renseignent dans les paramètres d'environnement du projet Netlify.
Les services Flask et leurs bases SQLite ne sont pas déployés par ce fichier.
Sans service contact accessible, le formulaire renvoie une erreur 503.
Une intégration à Netlify Forms est une autre solution, à mettre en place avant
la mise en service du formulaire.

## Vérifications après publication

- Accueil, catalogue, histoire, qualité, FAQ et contact accessibles.
- Ouverture directe d'une fiche produit et de `/panier`.
- Images et changements de langue.
- Ajout de deux formats, mise à jour des quantités, rechargement du panier.
- Lien WhatsApp contenant les deux formats et le total, sans envoyer de message de test.
- Formulaire de contact après configuration de sa destination.

Documentation : https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
