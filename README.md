# Mini-site Carrefour Énergies — Alexandre

Ce dossier contient le site complet, prêt à être mis en ligne gratuitement.

---

## 1. Avant de publier : personnalise ton site

Ouvre le fichier `src/App.jsx` et modifie en haut du fichier (lignes ~30-35) :

```js
const HUBSPOT_PORTAL_ID = "00000000";
const HUBSPOT_FORM_GUID = "00000000-0000-0000-0000-000000000000";
const CALENDLY_URL = "https://calendly.com/votre-compte/etude-energetique-alexandre";

const GTM_CONTAINER_ID = "GTM-XXXXXXX"; // Google Tag Manager
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Google Analytics 4
const META_PIXEL_ID = "0000000000000000"; // Meta (Facebook/Instagram) Pixel
```

- `HUBSPOT_PORTAL_ID` et `HUBSPOT_FORM_GUID` : remplace par les identifiants de ton formulaire HubSpot (voir section 4).
- `CALENDLY_URL` : remplace par ton lien Calendly (ou HubSpot Meetings) où Alexandre gère ses créneaux de rappel.
- `GTM_CONTAINER_ID`, `GA4_MEASUREMENT_ID`, `META_PIXEL_ID` : remplace par tes identifiants de tracking (laisse vide `""` pour désactiver un tracker que tu n'utilises pas). Le site envoie déjà les événements clés : début du tunnel, progression étape par étape, lead généré (avec le score), RDV pris, clic sur le téléphone.

Tu peux aussi modifier directement les textes, le numéro de téléphone, etc. dans ce même fichier.

---

## 2. Mise en ligne gratuite avec Vercel (recommandé)

Pas besoin de carte bancaire, ni de compétences techniques.

### Étape 1 — Créer un compte GitHub (gratuit)
1. Va sur [github.com](https://github.com) et crée un compte.
2. Clique sur **New repository** (bouton vert "New").
3. Donne-lui un nom, par exemple `mini-site-alexandre`, laisse-le **Public** ou **Private**, puis clique sur **Create repository**.

### Étape 2 — Mettre les fichiers sur GitHub
1. Sur la page de ton nouveau dépôt, clique sur **"uploading an existing file"** (ou le lien "Add file > Upload files").
2. Glisse-dépose **tous les fichiers et dossiers** de ce projet (y compris le dossier `src`) dans la zone d'upload.
3. Clique sur **Commit changes** en bas de page.

### Étape 3 — Déployer sur Vercel
1. Va sur [vercel.com](https://vercel.com) et clique sur **Sign Up**.
2. Choisis **Continue with GitHub** et autorise la connexion.
3. Une fois connecté, clique sur **Add New... > Project**.
4. Sélectionne ton dépôt `mini-site-alexandre` puis clique sur **Import**.
5. Vercel détecte automatiquement que c'est un projet **Vite** — ne change rien, clique sur **Deploy**.
6. Patiente ~1 minute : ton site est en ligne ! Vercel te donne une adresse du type :
   `https://mini-site-alexandre.vercel.app`

C'est cette adresse (ou un QR code généré à partir d'elle) que tu peux mettre sur le barnum.

### Mettre à jour le site plus tard
À chaque fois que tu modifies un fichier sur GitHub (par exemple pour changer le lien Calendly), Vercel republie automatiquement le site en quelques secondes.

---

## 3. Brancher ton propre nom de domaine (optionnel)

Si tu achètes un nom de domaine (ex : chez OVH, Gandi, Namecheap...), tu peux le relier gratuitement :
1. Dans Vercel, ouvre ton projet > onglet **Settings > Domains**.
2. Ajoute ton nom de domaine (ex : `etude-energie-alexandre.fr`).
3. Vercel t'indique les enregistrements DNS à ajouter chez ton registrar — copie/colle-les, l'activation prend quelques minutes à quelques heures.

---

## 4. Créer le formulaire HubSpot (pour la collecte automatique des leads)

1. Dans HubSpot, va dans **Marketing > Lead Capture > Forms** et crée un nouveau formulaire.
2. Ajoute les champs (propriétés de contact) suivants — crée-les en propriétés personnalisées si elles n'existent pas :
   - Prénom (`firstname`), Nom (`lastname`), Téléphone (`phone`), Email (`email`), Code postal (`zip`)
   - `type_de_projet`, `statut_occupant`, `type_logement`, `surface_habitable`,
     `mode_chauffage_actuel`, `travaux_deja_realises`, `delai_projet`,
     `client_carrefour`, `source_lead`, `lead_score` (nombre — calculé automatiquement par le site selon le chauffage, le projet, le délai et la surface)
3. Une fois le formulaire créé, récupère son **Portal ID** et son **Form GUID** :
   - Dans HubSpot, ouvre le formulaire > **Share > Embed code**. L'URL ressemble à :
     `.../submissions/v3/integration/submit/PORTAL_ID/FORM_GUID`
4. Colle ces deux valeurs dans `src/App.jsx` comme indiqué à l'étape 1.

---

## 5. (Optionnel) Tester le site sur ton ordinateur avant publication

Si tu as Node.js installé :

```bash
npm install
npm run dev
```

Le site s'ouvre alors sur `http://localhost:5173`.

---

## Besoin d'aide ?

Si tu bloques sur une étape (GitHub, Vercel, HubSpot, nom de domaine), donne-moi le message d'erreur ou une capture d'écran et je t'aide à débloquer ça.
