# 💸 MoneyMood

**Application PWA de suivi budgétaire avec vision hebdomadaire**

MoneyMood offre une approche simplifiée de la gestion de budget : définissez vos charges et revenus, suivez vos dépenses semaine par semaine, et gérez des projets spécifiques en parallèle. L'interface mobile-first permet un suivi au quotidien.

🔗 **[Voir la démo live](https://moneymood-ios.vercel.app/)**

---

## 📸 Aperçu

> **Note**: L'interface est pensée en mobile-first. Une version desktop améliorée est en développement.

### Dashboard principal

<img src="./docs/screenshots/dashboard.webp" alt="Interface dashboard" width="240">

### Historique des derniers mois

<img src="./docs/screenshots/history.webp" alt="Historique des budgets" width="240">

### Interface projet

<img src="./docs/screenshots/project_details.webp" alt="Interface projet" width="240">

---

## ✨ Fonctionnalités principales

- **📊 Vue hebdomadaire du budget** : suivi visuel semaine par semaine
- **🎯 Budgets projets dédiés** : gérez des enveloppes spécifiques (vacances, travaux, etc.) en parallèle du budget mensuel
- **📈 Historique détaillé** : retrouvez vos anciens budgets facilement en consultation
- **📱PWA optimisée** : interface mobile-first avec installation possible sur l'écran d'accueil

---

## 🛠️ Stack technique

### Core

- **Architecture**: Monorepo (npm workspaces) - Frontend/Backend/Shared
- **Frontend**: [React 19](https://react.dev) + Vite
- **Backend**: [Express](https://expressjs.com) + Node.js
- **Base de données**: PostgreSQL hébergé sur [Neon](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)

### Librairies principales

- **Styling**: Sass (modules CSS)
- **Validation**: Zod (schémas type-safe partagés frontend/backend)
- **State management**: Zustand
- **Cache et requêtes serveurs**: TanStack Query (React Query)

### Tests & Qualité

- **Tests E2E**: Playwright
- **Tests intégration**: Jest
- **Tests API**: Postman
- **CI/CD**: Intégration continue avec tests automatisés - Github Actions

### Infrastructure

- **Déploiement**: Vercel

---

## 🎯 Défis techniques relevés

- **Architecture monorepo** : Configuration de workspaces npm avec package `shared` pour partager types et validations Zod entre frontend/backend
- **Système d'authentification custom** : Implémentation de sessions sécurisées avec tokens cryptographiques (crypto.randomBytes), expiration glissante (rolling sessions) et nettoyage automatique
- **PWA et mode offline** : Accès en lecture seule aux données mises en cache pour une consultation hors ligne
- **Stratégie de Validation & CI/CD Multi-niveaux** :
  - **Pipeline de PR (Validation)** : Exécution automatisée des linters, type-checking, tests d'intégration (Jest) et tests E2E ciblés (**Playwright Smoke Tests**) sur une base de données isolée via container Docker
  - **Pipeline de Staging (Déploiement Continu)** : Déploiement automatique sur un environnement _Vercel Preview_ à chaque push sur `dev`, suivi d'une suite de tests d'API (**Postman CLI**) et d'interface (**Playwright E2E Regression Tests**) avec isolation et nettoyage automatisé de la base de données.

---

## 🚀 Installation et développement local

### Prérequis

- Node.js 18+
- npm/yarn/pnpm/bun
- PostgreSQL

### Configuration

**1. Installer les dépendances**

```bash
npm install
```

**2. Configurer les variables d'environnement**

Créer les fichiers `.env` dans les worspaces :

`backend/.env` :

```bash
DATABASE_URL="postgresql://..."
```

**3. Builder le package partagé**

```bash
npm run build --workspace=shared
```

**4. Setup de la base de données**

```bash

npx prisma generate --workspace=backend
npx prisma migrate dev --workspace=backend
```

**6. Lancer l'application**

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

---

### Tests

**Tests d'intégration (Backend) :**

```bash
cd ./backend/
npm run test
```

> Les tests backend utilisent une base de données dédiée. Créez un fichier `.env.test` dans `/backend/` avec un `DATABASE_URL` pointant vers votre base de test.

**Tests E2E (Playwright + Docker) :**

```bash
cd ./e2e/
npm run test
```

> Les tests backend utilisent une base de données dédiée. Créez un fichier `.env.test` dans `/e2e/` avec un `DATABASE_URL` pointant vers votre base de test.
> Le script lance le backend et le frontend localement via la configuration `webServer` de Playwright.

---

## 🗺️ Roadmap

**Expérience utilisateur :**

- [ ] Refonte de l'interface desktop pour une meilleure expérience multi-écrans
- [ ] Mode offline complet avec synchronisation automatique au retour de connexion

**Fonctionnalités :**

- [ ] Graphiques de tendances et visualisation des habitudes de dépenses
- [ ] Catégorisation des dépenses mensuelles

---
