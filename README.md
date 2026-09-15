# Ts'Art Épices — Site Vitrine Premium

Site vitrine e-commerce pour **Ts'Art Épices**, marque malagasy de vanille Bourbon de Madagascar.
Architecture : Frontend Next.js (App Router) + 3 Microservices Flask.

## Structure du Projet

```text
tsarepices/
├── frontend/                 # Next.js 15 (React 19, Tailwind CSS v4, Framer Motion)
│   ├── src/app/              # Pages et API Routes (Gateway)
│   ├── src/components/       # Composants UI
│   └── src/lib/              # Configuration et utilitaires
├── services/
│   ├── catalog-service/      # Service catalogue (Flask) - port 5001
│   ├── orders-service/       # Service commandes WhatsApp (Flask + SQLite) - port 5002
│   └── contact-service/      # Service contact (Flask + SQLite) - port 5003
└── docker-compose.yml        # Orchestration
```

## Fonctionnalités

- **Design Premium** : Thème sombre, effets glassmorphism, animations fluides (Framer Motion).
- **Catalogue** : Liste des produits (formats poids et tube) chargée depuis le `catalog-service`.
- **Commandes WhatsApp** : Génération de messages pré-remplis pour faciliter les commandes. Historique sauvegardé dans `orders-service`.
- **Contact** : Formulaire de contact lié au `contact-service`.
- **Images générées** : Visuels haute qualité générés par IA.

## Lancement (Docker)

La méthode recommandée est d'utiliser Docker Compose pour lancer l'ensemble des services.

```bash
docker-compose up --build -d
```

Le site sera accessible sur : [http://localhost:3000](http://localhost:3000)

## Lancement (Développement Local)

Si vous souhaitez lancer les services séparément pour le développement :

**1. Backend (Microservices)**

```bash
# Service Catalogue
cd services/catalog-service
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python app.py

# Service Commandes
cd ../orders-service
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python app.py

# Service Contact
cd ../contact-service
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python app.py
```

**2. Frontend (Next.js)**

```bash
cd frontend
npm install
npm run dev
```
