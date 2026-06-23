import { useState, useEffect, useRef } from "react";
import {
  Phone, Calendar, ChevronLeft, Check, Play, ShieldCheck,
  Wrench, ClipboardCheck, Users, X, ArrowRight, RefreshCw, Star,
} from "lucide-react";

// =====================================================================
// CONFIG
// =====================================================================
const PHONE_DISPLAY = "07 68 32 95 02";
const PHONE_TEL = "+33768329502";
const CALENDLY_URL = "https://calendly.com/alexandre-lead505/20min";
const HUBSPOT_PORTAL_ID = "00000000";
const HUBSPOT_FORM_GUID = "00000000-0000-0000-0000-000000000000";
const GTM_CONTAINER_ID = "GTM-XXXXXXX";
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
const META_PIXEL_ID = "0000000000000000";

const COLORS = {
  blue: "#0c65a9",
  navy: "#182957",
  turquoise: "#00b8ac",
  orange: "#f6961d",
  green: "#198440",
  bg: "#f5f8fb",
};

// =====================================================================
// VIDÉOS TÉMOIGNAGES
// =====================================================================
const VIDEOS_TEMOIGNAGES = [
  { id: "1PMkPehu6ro", nom: "M. Constantin", accroche: "379€ → 89€ de facture", type: "PAC", highlight: "🔥 Le plus populaire" },
  { id: "_l-l3oRoIPY", nom: "M. Joyez", accroche: "Pompe à chaleur 15kW", type: "PAC", highlight: null },
  { id: "ONlCQF9uxMA", nom: "Mme Gruel", accroche: "Panneaux solaires", type: "PV", highlight: "⭐ Cliente Alexandre" },
  { id: "p3PKy5CLkks", nom: "M. Baillet", accroche: "Pompe à chaleur 15kW", type: "PAC", highlight: null },
  { id: "5hK1gGWzmIM", nom: "M. Benamara", accroche: "Panneaux solaires 6kWc", type: "PV", highlight: null },
  { id: "4FyL1xQEegY", nom: "Mme Moukoudi", accroche: "Isolation thermique extérieure", type: "ITE", highlight: null },
];

const TYPE_COLORS = { PAC: COLORS.blue, PV: COLORS.orange, ITE: COLORS.green };
const TYPE_LABELS = { PAC: "🔥 PAC", PV: "☀️ Solaire", ITE: "🏠 Isolation" };

// =====================================================================
// ASSETS (base64 tronqués pour la lisibilité — remplacer par les vrais)
// =====================================================================
const TF1_LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTAwIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgcng9IjgiIGZpbGw9IiMwMDUwQTAiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjcyIiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjgiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iLTIiPlRGMTwvdGV4dD4KPC9zdmc+";
const CARREFOUR_ENERGIES_LOGO = "data:image/png;base64,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";
const ALEXANDRE_PHOTO = "data:image/jpeg;base64,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";

// =====================================================================
// TRACKING
// =====================================================================
function injectAnalyticsScripts() {
  if (typeof window === "undefined" || window.__analyticsInjected) return;
  window.__analyticsInjected = true;
  window.dataLayer = window.dataLayer || [];
  if (GTM_CONTAINER_ID && GTM_CONTAINER_ID !== "GTM-XXXXXXX") {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    document.head.appendChild(s);
  }
  if (GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(ga);
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID);
  }
}

function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
  if (typeof window.gtag === "function") window.gtag("event", eventName, params);
}

// =====================================================================
// LEAD SCORING
// =====================================================================
const CHAUFFAGE_SCORES = { fioul: 30, gaz: 20, electricite: 15, pac: 5, bois: 0, autre: 0 };
const PROJET_SCORES = { plusieurs: 40, pac: 25, photovoltaique: 20, isolation: 15, clim: 20 };
const DELAI_SCORES = { "3mois": 30, "6mois": 15, annee: 5, info: 0 };

function calculateLeadScore(data) {
  let score = 0;
  score += CHAUFFAGE_SCORES[data.chauffage] || 0;
  score += PROJET_SCORES[data.projet] || 0;
  score += DELAI_SCORES[data.delai] || 0;
  const surface = Number(data.surface) || 0;
  if (surface > 150) score += 20;
  else if (surface >= 100) score += 15;
  else if (surface > 0) score += 5;
  return score;
}

// =====================================================================
// EMAILJS — Envoi email vers alexandre.lead505@gmail.com
// Créer un compte sur emailjs.com, connecter Gmail, remplacer les IDs
// =====================================================================
const EMAILJS_SERVICE_ID = "service_1tr06ov";   // À remplacer sur emailjs.com
const EMAILJS_TEMPLATE_ID = "wi066k4"; // À remplacer sur emailjs.com
const EMAILJS_PUBLIC_KEY = "MIJxzpLwMluAgm-Ko";   // À remplacer sur emailjs.com

async function sendEmailLead(data, score) {
  try {
    if (!window.emailjs) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        s.onload = () => { window.emailjs.init(EMAILJS_PUBLIC_KEY); resolve(); };
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: "alexandre.lead505@gmail.com",
      prenom: data.prenom,
      nom: data.nom,
      telephone: data.telephone,
      email: data.email,
      code_postal: data.codePostal,
      projet: data.projet || "Non précisé",
      statut: data.statut || "",
      type_local: data.typeLocal || "",
      surface_clim: data.surfaceClim || "",
      chauffage: data.chauffage || "",
      delai: data.delai || "",
      parrain: data.parrain || "Aucun",
      lead_score: String(score),
      date_envoi: new Date().toLocaleString("fr-FR"),
    });
    console.log("✅ Email lead envoyé");
  } catch(e) {
    console.error("EmailJS error:", e);
  }
}

// =====================================================================
// HUBSPOT
// =====================================================================
async function submitToHubSpot(data, score) {
  const fields = [
    { name: "firstname", value: data.prenom },
    { name: "lastname", value: data.nom },
    { name: "phone", value: data.telephone },
    { name: "email", value: data.email },
    { name: "zip", value: data.codePostal },
    { name: "type_de_projet", value: data.projet || "" },
    { name: "mode_chauffage_actuel", value: data.chauffage || "" },
    { name: "delai_projet", value: data.delai || "" },
    { name: "parrain", value: data.parrain || "" },
    { name: "type_local_pro", value: data.typeLocal || "" },
    { name: "surface_clim", value: data.surfaceClim || "" },
    { name: "lead_score", value: String(score) },
  ];
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields, context: { pageUri: window.location.href, pageName: "Mini-site Alexandre" } }),
    });
  } catch (e) { console.error("HubSpot error:", e); }
}

// =====================================================================
// TUNNEL DE QUALIFICATION
// =====================================================================
const PROJECT_OPTIONS = [
  { id: "photovoltaique", label: "Panneaux photovoltaïques", icon: "☀️" },
  { id: "pac", label: "Pompe à chaleur", icon: "🔥" },
  { id: "isolation", label: "Isolation thermique", icon: "🏠" },
  { id: "clim", label: "Climatisation réversible", icon: "❄️" },
  { id: "plusieurs", label: "Plusieurs projets", icon: "🔄" },
];
const STATUT_OPTIONS = [
  { id: "occupant", label: "Propriétaire occupant", icon: "🏠" },
  { id: "bailleur", label: "Propriétaire bailleur", icon: "🔑" },
  { id: "professionnel", label: "Professionnel", icon: "🏢" },
];

const TYPE_LOCAL_OPTIONS = [
  { id: "pharmacie", label: "Pharmacie", icon: "💊" },
  { id: "commerce", label: "Commerce", icon: "🛍️" },
  { id: "bureau", label: "Bureau", icon: "💼" },
  { id: "restaurant", label: "Restaurant", icon: "🍽️" },
  { id: "entrepot", label: "Entrepôt", icon: "🏭" },
  { id: "autre", label: "Autre", icon: "❓" },
];

const SURFACE_CLIM_OPTIONS = [
  { id: "moins50", label: "< 50 m²", icon: "📐" },
  { id: "50a100", label: "50 à 100 m²", icon: "📐" },
  { id: "100a250", label: "100 à 250 m²", icon: "📐" },
  { id: "plus250", label: "250 m² +", icon: "📐" },
];
const LOGEMENT_OPTIONS = [
  { id: "maison", label: "Maison", icon: "🏡" },
  { id: "appartement", label: "Appartement", icon: "🏢" },
];
const CHAUFFAGE_OPTIONS = [
  { id: "gaz", label: "Gaz", icon: "🔥" },
  { id: "fioul", label: "Fioul", icon: "🛢️" },
  { id: "electricite", label: "Électricité", icon: "⚡" },
  { id: "bois", label: "Bois / Granulés", icon: "🌳" },
  { id: "pac", label: "Pompe à chaleur", icon: "🌡️" },
  { id: "autre", label: "Autre", icon: "❓" },
];
const TRAVAUX_OPTIONS = [
  { id: "solaire", label: "Panneaux solaires", icon: "☀️" },
  { id: "pac", label: "Pompe à chaleur", icon: "🔥" },
  { id: "isolation", label: "Isolation", icon: "🏠" },
  { id: "menuiseries", label: "Menuiseries", icon: "🚪" },
  { id: "aucun", label: "Aucun", icon: "❌" },
];
const DELAI_OPTIONS = [
  { id: "3mois", label: "Dans les 3 mois" },
  { id: "6mois", label: "Dans les 6 mois" },
  { id: "annee", label: "Dans l'année" },
  { id: "info", label: "En recherche d'informations" },
];

// Étapes standard
const FUNNEL_STEPS_STANDARD = [
  { key: "projet", title: "Quel est votre projet ?", type: "single", options: PROJECT_OPTIONS, columns: 2 },
  { key: "statut", title: "Vous êtes :", type: "single", options: STATUT_OPTIONS, columns: 1 },
  { key: "logement", title: "Quel est le type de votre logement ?", type: "single", options: LOGEMENT_OPTIONS, columns: 2 },
  { key: "surface", title: "Quelle est la surface habitable ?", type: "number" },
  { key: "chauffage", title: "Quel est votre mode de chauffage actuel ?", type: "single", options: CHAUFFAGE_OPTIONS, columns: 2 },
  { key: "travaux", title: "Avez-vous déjà réalisé des travaux énergétiques ?", subtitle: "Plusieurs réponses possibles", type: "multi", options: TRAVAUX_OPTIONS, columns: 1 },
  { key: "delai", title: "Quand souhaitez-vous réaliser votre projet ?", type: "single", options: DELAI_OPTIONS, columns: 1 },
  { key: "clientCarrefour", title: "Êtes-vous déjà client Carrefour ?", type: "single", options: [{ id: "oui", label: "Oui" }, { id: "non", label: "Non" }], columns: 2 },
  { key: "source", title: "Comment nous avez-vous connu(e) ?", type: "single", options: [{ id: "marche", label: "Marché" }, { id: "brocante", label: "Brocante" }, { id: "recommandation", label: "Recommandation" }, { id: "internet", label: "Internet" }, { id: "reseaux", label: "Réseaux sociaux" }, { id: "autre", label: "Autre" }], columns: 2 },
  { key: "contact", title: "Vos coordonnées", subtitle: "Dernière étape avant de choisir votre créneau de rappel", type: "contact" },
];

// Étapes parcours PRO (après "Professionnel")
const FUNNEL_STEPS_PRO = [
  { key: "projet", title: "Quel est votre projet ?", type: "single", options: PROJECT_OPTIONS, columns: 2 },
  { key: "statut", title: "Vous êtes :", type: "single", options: STATUT_OPTIONS, columns: 1 },
  { key: "typeLocal", title: "Quel type de local ?", type: "single", options: TYPE_LOCAL_OPTIONS, columns: 2 },
  { key: "surfaceClim", title: "Quelle est la surface à climatiser ?", type: "single", options: SURFACE_CLIM_OPTIONS, columns: 2 },
  { key: "chauffage", title: "Quel est votre mode de chauffage actuel ?", type: "single", options: CHAUFFAGE_OPTIONS, columns: 2 },
  { key: "delai", title: "Quand souhaitez-vous réaliser votre projet ?", type: "single", options: DELAI_OPTIONS, columns: 1 },
  { key: "source", title: "Comment nous avez-vous connu(e) ?", type: "single", options: [{ id: "marche", label: "Marché" }, { id: "brocante", label: "Brocante" }, { id: "recommandation", label: "Recommandation" }, { id: "internet", label: "Internet" }, { id: "reseaux", label: "Réseaux sociaux" }, { id: "autre", label: "Autre" }], columns: 2 },
  { key: "contact", title: "Vos coordonnées", subtitle: "Dernière étape avant de choisir votre créneau de rappel", type: "contact" },
];

// Sélection dynamique selon statut
function getFunnelSteps(data) {
  return data.statut === "professionnel" ? FUNNEL_STEPS_PRO : FUNNEL_STEPS_STANDARD;
}

const FUNNEL_STEPS = FUNNEL_STEPS_STANDARD; // fallback

// =====================================================================
// COMPOSANTS UI
// =====================================================================
function TopBar() {
  return (
    <div className="sticky top-0 z-40 flex items-center px-3 py-2 shadow-sm" style={{ backgroundColor: COLORS.navy, gap: "8px" }}>

      {/* Logo */}
      <div className="flex-shrink-0 flex items-center rounded-md bg-white" style={{ padding: "3px 6px" }}>
        <img src={CARREFOUR_ENERGIES_LOGO} alt="Carrefour Énergies" style={{ height: "22px", width: "auto", display: "block" }} />
      </div>

      {/* Photo */}
      <img src={ALEXANDRE_PHOTO} alt="Alexandre"
        style={{ height: "34px", width: "34px", borderRadius: "50%", border: `2px solid ${COLORS.turquoise}`, objectFit: "cover", flexShrink: 0 }} />

      {/* Nom + titre */}
      <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
        <p style={{ color: "white", fontWeight: 700, fontSize: "13px", margin: 0 }}>Alexandre</p>
        <p style={{ color: COLORS.turquoise, fontWeight: 600, fontSize: "10px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          Conseiller Carrefour Énergies
        </p>
      </div>

      {/* Téléphone */}
      <a href={`tel:${PHONE_TEL}`}
        style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "5px", backgroundColor: COLORS.turquoise, color: "white", fontWeight: 700, fontSize: "12px", padding: "7px 12px", borderRadius: "20px", textDecoration: "none", whiteSpace: "nowrap" }}>
        <Phone size={13} />{PHONE_DISPLAY}
      </a>

    </div>
  );
}

function FloatingBar({ onCallback, onBook }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 mx-auto grid max-w-md grid-cols-3 gap-2 border-t border-slate-200 bg-white p-2 shadow-lg">
      <button onClick={onCallback} className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-xs font-bold text-white" style={{ backgroundColor: COLORS.blue }}>
        <RefreshCw size={16} />Être rappelé
      </button>
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-xs font-bold text-white" style={{ backgroundColor: COLORS.turquoise }}>
        <Calendar size={16} />Prendre RDV
      </a>
      <a href={`tel:${PHONE_TEL}`} className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-xs font-bold text-white" style={{ backgroundColor: COLORS.orange }}>
        <Phone size={16} />Appeler
      </a>
    </div>
  );
}

function ProgressTicket({ stepIndex, total }) {
  const pct = ((stepIndex + 1) / total) * 100;
  return (
    <div className="mx-auto max-w-md px-4 pb-2 pt-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: COLORS.navy }}>Votre étude gratuite</span>
        <span className="text-xs font-extrabold" style={{ color: COLORS.turquoise }}>Étape {stepIndex + 1}/{total}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: COLORS.turquoise }} />
      </div>
    </div>
  );
}

function ChoiceGrid({ options, value, multi, columns, onSelect }) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {options.map((opt) => {
        const selected = multi ? (value || []).includes(opt.id) : value === opt.id;
        return (
          <button key={opt.id} onClick={() => onSelect(opt.id)} className="flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors"
            style={{ borderColor: selected ? COLORS.turquoise : "#e2e8f0", backgroundColor: selected ? "#e6f9f7" : "#ffffff" }}>
            {opt.icon ? <span className="flex-shrink-0 text-2xl">{opt.icon}</span> : (
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2"
                style={{ borderColor: selected ? COLORS.turquoise : "#cbd5e1", backgroundColor: selected ? COLORS.turquoise : "transparent" }}>
                {selected && <Check size={12} className="text-white" />}
              </span>
            )}
            <span className="text-sm font-semibold text-slate-800">{opt.label}</span>
            {multi && selected && <Check className="ml-auto flex-shrink-0" size={18} style={{ color: COLORS.turquoise }} />}
          </button>
        );
      })}
    </div>
  );
}

// =====================================================================
// SECTION TF1
// =====================================================================
function TF1Section() {
  const [popup, setPopup] = useState(false);
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-md">
        <button
          onClick={() => setPopup(true)}
          className="relative w-full overflow-hidden rounded-2xl shadow-lg transition-transform active:scale-95"
          style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)` }}
        >
          {/* Badge TF1 */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <img src={TF1_LOGO} alt="TF1" className="h-8 rounded-md" />
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              📺 REPORTAGE
            </span>
          </div>

          {/* Contenu */}
          <div className="flex items-center gap-4 p-5 pt-12">
            {/* Bouton play */}
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
              <Play size={22} style={{ color: COLORS.blue }} fill={COLORS.blue} />
            </div>
            <div className="text-left">
              <p className="text-base font-extrabold text-white">Carrefour Énergies sur TF1</p>
              <p className="mt-0.5 text-sm text-blue-200">JT 20h — Avril 2025</p>
              <p className="mt-1 text-xs text-blue-300">Pompe à chaleur & économies d'énergie</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 border-t border-white border-opacity-20 py-2">
            <span className="text-xs font-bold text-blue-200">▶ Voir le reportage</span>
          </div>
        </button>
      </div>

      {/* Popup Yuzzit */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(15,23,42,0.92)" }} onClick={() => setPopup(false)}>
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: COLORS.navy }}>
              <div>
                <p className="text-sm font-bold text-white">Reportage TF1 — 20h</p>
                <p className="text-xs" style={{ color: COLORS.turquoise }}>Carrefour Énergies • Avril 2025</p>
              </div>
              <button onClick={() => setPopup(false)} className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                <X size={16} className="text-white" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600 mb-4">Carrefour Énergies et ses clients témoignent sur les économies réalisées grâce à la pompe à chaleur.</p>
              <a
                href="https://app.yuzzitpro.com/pwa/V2/view/Cfp4qv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-extrabold text-white w-full"
                style={{ backgroundColor: COLORS.blue }}
              >
                <Play size={16} fill="white" />
                Voir le reportage TF1
              </a>
              <p className="text-center text-xs text-slate-400 mt-3">S'ouvre dans un lecteur sécurisé</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =====================================================================
// SECTION VIDÉOS TÉMOIGNAGES
// =====================================================================
function VideoSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  return (
    <section className="px-4 py-6" style={{ backgroundColor: COLORS.bg }}>
      <div className="mx-auto max-w-md">
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold text-white" style={{ backgroundColor: COLORS.turquoise }}>
            ⭐ TÉMOIGNAGES VÉRIFIÉS
          </span>
        </div>
        <h2 className="font-display text-xl font-extrabold" style={{ color: COLORS.navy }}>
          Ils ont fait confiance à Carrefour Énergies
        </h2>
        <p className="mt-1 text-sm text-slate-500">Vrais clients, vrais résultats.</p>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {VIDEOS_TEMOIGNAGES.map((v) => (
            <button key={v.id} onClick={() => setActiveVideo(v)}
              className="flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition-transform active:scale-95"
              style={{ width: "160px" }}>
              <div className="relative">
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.nom} className="w-full object-cover" style={{ aspectRatio: "16/9" }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.25)" }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#ff0000" }}>
                    <Play size={14} className="text-white" fill="white" />
                  </div>
                </div>
                <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: TYPE_COLORS[v.type] }}>
                  {TYPE_LABELS[v.type]}
                </span>
              </div>
              <div className="p-2">
                {v.highlight && <p className="mb-0.5 text-xs font-extrabold uppercase truncate" style={{ color: COLORS.orange }}>{v.highlight}</p>}
                <p className="text-xs font-bold text-slate-800 truncate">{v.nom}</p>
                <p className="text-xs text-slate-500 truncate">{v.accroche}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popup vidéo plein écran */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(15,23,42,0.92)" }} onClick={() => setActiveVideo(null)}>
          <div className="w-full max-w-sm overflow-hidden rounded-2xl" style={{ backgroundColor: "#000" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: COLORS.navy }}>
              <div>
                <p className="text-sm font-bold text-white">{activeVideo.nom}</p>
                <p className="text-xs font-medium" style={{ color: COLORS.turquoise }}>{activeVideo.accroche}</p>
              </div>
              <button onClick={() => setActiveVideo(null)} className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                <X size={16} className="text-white" />
              </button>
            </div>
            <div className="relative" style={{ paddingBottom: "177.78%", height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                className="absolute inset-0 h-full w-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =====================================================================
// SECTION AVIS CLIENTS
// =====================================================================
function AvisSection() {
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-md">
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold" style={{ backgroundColor: "#e8f5e9", color: COLORS.green }}>
            ⭐ AVIS VÉRIFIÉS
          </span>
        </div>
        <h2 className="font-display text-xl font-extrabold" style={{ color: COLORS.navy }}>Ce que disent nos clients</h2>
        <p className="mt-1 text-sm text-slate-500">Des centaines de familles accompagnées en Île-de-France</p>



        {/* Cartes avis */}
        <div className="mt-4 space-y-3">
          {[
            { nom: "Magnouche", projet: "PAC + Isolation ITE", texte: "J'ai particulièrement apprécié la rigueur du suivi. Un grand merci à Alexandre D., très à l'écoute, disponible et réactif. Le résultat est à la hauteur de mes attentes." },
            { nom: "Jean-Luc Gros", projet: "Pompe à chaleur Ariston", texte: "Très satisfait du conseiller Alexandre D. L'installation s'est faite en une journée par des techniciens de qualité." },
          ].map((a) => (
            <div key={a.nom} className="rounded-2xl bg-white p-4 shadow-sm" style={{ borderLeft: `4px solid ${COLORS.blue}` }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-800">{a.nom}</p>
                  <p className="text-xs text-slate-400">{a.projet}</p>
                </div>
                <span style={{ color: COLORS.orange }}>★★★★★</span>
              </div>
              <p className="mt-2 text-sm italic leading-snug text-slate-600">"{a.texte}"</p>
            </div>
          ))}
        </div>

        {/* Trustpilot évolutif */}
        <a href="https://fr.trustpilot.com/review/avisun.fr" target="_blank" rel="noopener noreferrer"
          className="mt-4 flex items-center justify-between rounded-2xl p-4"
          style={{ backgroundColor: "#f0f7ff", textDecoration: "none" }}>
          <div>
            <p className="text-sm font-bold" style={{ color: COLORS.blue }}>⭐ Retrouvez tous nos avis</p>
            <p className="text-xs text-slate-400">Avisun — Avis clients vérifiés sur Trustpilot</p>
          </div>
          <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: "#00b67a" }}>Trustpilot →</span>
        </a>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION CONFIANCE
// =====================================================================
const TRUST_ITEMS = [
  { icon: ShieldCheck, title: "Une marque de confiance", text: "Carrefour Énergies, une marque connue de tous." },
  { icon: Wrench, title: "Des solutions fiables", text: "Matériel certifié et installateurs RGE." },
  { icon: ClipboardCheck, title: "Aides optimisées", text: "Toutes les aides disponibles sont activées." },
  { icon: Users, title: "Accompagnement complet", text: "De l'étude à la réalisation, de A à Z." },
];

function TrustSection() {
  return (
    <section className="px-4 py-6" style={{ backgroundColor: COLORS.bg }}>
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-xl font-extrabold" style={{ color: COLORS.navy }}>Pourquoi choisir Carrefour Énergies ?</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f9f7" }}>
                  <Icon size={18} style={{ color: COLORS.turquoise }} />
                </div>
                <p className="mt-2 text-sm font-bold text-slate-800">{item.title}</p>
                <p className="mt-1 text-xs leading-snug text-slate-500">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION SOLUTIONS
// =====================================================================
const SOLUTIONS = [
  { id: "photovoltaique", icon: "☀️", title: "Panneaux photovoltaïques", color: COLORS.orange, text: "Produisez votre propre électricité et réduisez durablement votre facture." },
  { id: "pac", icon: "🔥", title: "Pompe à chaleur", color: COLORS.blue, text: "Remplacez un chauffage énergivore par une solution performante avec aides de l'État." },
  { id: "isolation", icon: "🏠", title: "Isolation thermique", color: COLORS.green, text: "Limitez les pertes de chaleur et gagnez en confort toute l'année." },
  { id: "clim", icon: "❄️", title: "Climatisation réversible", color: "#0ea5e9", text: "Chaud en hiver, frais en été. Une solution 2-en-1 performante et éligible aux aides de l'État." },
];

function SolutionsSection({ onSelectProject }) {
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-xl font-extrabold" style={{ color: COLORS.navy }}>Nos solutions</h2>
        <div className="mt-4 space-y-3">
          {SOLUTIONS.map((s) => (
            <div key={s.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xl" style={{ backgroundColor: `${s.color}1A` }}>
                  {s.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{s.title}</p>
                  <p className="mt-1 text-sm leading-snug text-slate-500">{s.text}</p>
                  <button onClick={() => onSelectProject(s.id)} className="mt-2 flex items-center gap-1 text-sm font-bold" style={{ color: s.color }}>
                    Je suis intéressé <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION PARRAINAGE
// =====================================================================
function ParrainageSection({ onStart }) {
  return (
    <section className="px-4 py-6" style={{ backgroundColor: COLORS.navy }}>
      <div className="mx-auto max-w-md text-center">
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: COLORS.orange }}>
          🎁 PROGRAMME PARRAINAGE
        </span>
        <h2 className="mt-3 font-display text-xl font-extrabold text-white">Parrainez & gagnez 250€ par filleul</h2>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Transformez votre projet en économies supplémentaires</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[["250€", "1 filleul"], ["500€", "2 filleuls"], ["1000€", "4 filleuls"]].map(([nb, label]) => (
            <div key={label} className="rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <p className="text-2xl font-extrabold" style={{ color: COLORS.orange }}>{nb}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm font-bold" style={{ color: COLORS.turquoise }}>🛒 En cartes cadeaux Carrefour</p>
        <button onClick={onStart} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-extrabold text-white border-2" style={{ borderColor: COLORS.turquoise, color: COLORS.turquoise }}>
          Démarrer mon étude gratuite
        </button>
      </div>
    </section>
  );
}

// =====================================================================
// SECTION ALEXANDRE
// =====================================================================
function AlexandreSection({ onStart }) {
  return (
    <section className="px-4 py-6" style={{ backgroundColor: COLORS.bg }}>
      <div className="mx-auto max-w-md rounded-2xl p-5 text-white" style={{ backgroundColor: COLORS.navy }}>
        <div className="flex items-center gap-4">
          <img src={ALEXANDRE_PHOTO} alt="Alexandre" className="h-20 w-20 rounded-2xl border-2 object-cover" style={{ borderColor: COLORS.turquoise }} />
          <div>
            <p className="font-display text-lg font-extrabold">Votre conseiller local</p>
            <p className="text-sm font-semibold" style={{ color: COLORS.turquoise }}>Alexandre — Carrefour Énergies</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-200">Je vous accompagne dans l'étude de votre projet énergétique, du premier contact jusqu'à la réalisation.</p>
        <div className="mt-4 flex flex-col gap-2">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold" style={{ color: COLORS.navy }}>
            <Phone size={16} />{PHONE_DISPLAY}
          </a>
          <button onClick={onStart} className="flex items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-bold" style={{ borderColor: COLORS.turquoise, color: COLORS.turquoise }}>
            Démarrer mon étude gratuite
          </button>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// VUE ACCUEIL
// =====================================================================
function HomeView({ onStart, onStartWithProject, onBook }) {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="px-4 pb-6 pt-6" style={{ backgroundColor: COLORS.bg }}>
        <div className="mx-auto max-w-md">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-extrabold" style={{ color: COLORS.blue, border: `1px solid ${COLORS.blue}33` }}>
            <Star size={12} style={{ color: COLORS.orange }} fill={COLORS.orange} />
            Étude gratuite &amp; sans engagement
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight" style={{ color: COLORS.navy }}>RÉDUISEZ VOS FACTURES D'ÉNERGIE</h1>
          <p className="mt-2 text-base font-bold" style={{ color: COLORS.blue }}>Avec Alexandre, votre conseiller Carrefour Énergies.</p>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-dashed p-3" style={{ borderColor: COLORS.orange, backgroundColor: "#fff7ec" }}>
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ backgroundColor: COLORS.orange }}>-70%</div>
            <p className="text-sm font-semibold" style={{ color: COLORS.navy }}>Jusqu'à -70% sur vos factures grâce aux aides optimisées par Carrefour Énergies.</p>
          </div>
          <p className="mt-4 text-sm font-bold text-slate-600">Étude gratuite et sans engagement pour vos projets :</p>
          <ul className="mt-2 space-y-1.5 text-sm font-medium text-slate-700">
            <li className="flex items-center gap-2"><span className="text-lg">☀️</span> Panneaux photovoltaïques</li>
            <li className="flex items-center gap-2"><span className="text-lg">🔥</span> Pompe à chaleur</li>
            <li className="flex items-center gap-2"><span className="text-lg">🏠</span> Isolation thermique</li>
            <li className="flex items-center gap-2"><span className="text-lg">❄️</span> Climatisation réversible</li>
          </ul>
          <div className="mt-5 space-y-2.5">
            <button onClick={onStart} className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold text-white shadow-md" style={{ backgroundColor: COLORS.blue }}>
              JE DEMANDE MON ÉTUDE GRATUITE <ArrowRight size={16} />
            </button>
            <button onClick={onBook} className="flex w-full items-center justify-center gap-2 rounded-full border-2 bg-white py-3.5 text-sm font-extrabold" style={{ borderColor: COLORS.turquoise, color: COLORS.turquoise }}>
              <Calendar size={16} />JE PRENDS RENDEZ-VOUS
            </button>
          </div>
        </div>
      </section>

      {/* Reportage TF1 */}
      <TF1Section />

      {/* Confiance */}
      <TrustSection />

      {/* Vidéos témoignages */}
      <VideoSection />

      {/* Avis clients */}
      <AvisSection />

      {/* Solutions */}
      <SolutionsSection onSelectProject={onStartWithProject} />

      {/* Parrainage */}
      <ParrainageSection onStart={onStart} />

      {/* Alexandre */}
      <AlexandreSection onStart={onStart} />
    </div>
  );
}

// =====================================================================
// FORMULAIRE CONTACT (avec champ parrain)
// =====================================================================
function ContactForm({ data, update }) {
  const fields = [
    { key: "prenom", label: "Prénom *", type: "text", autoComplete: "given-name" },
    { key: "nom", label: "Nom *", type: "text", autoComplete: "family-name" },
    { key: "telephone", label: "Téléphone *", type: "tel", autoComplete: "tel" },
    { key: "email", label: "Email *", type: "email", autoComplete: "email" },
    { key: "codePostal", label: "Code postal *", type: "text", autoComplete: "postal-code" },
  ];
  return (
    <div className="space-y-3">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="mb-1 block text-xs font-bold text-slate-500">{f.label}</label>
          <input type={f.type} autoComplete={f.autoComplete} value={data[f.key] || ""} onChange={(e) => update(f.key, e.target.value)}
            placeholder={f.label.replace(" *", "")}
            className="input-field w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800" />
        </div>
      ))}
      {/* Champ parrainage */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: "#fff8e1", border: `1.5px solid ${COLORS.orange}` }}>
        <label className="mb-2 block text-xs font-extrabold uppercase" style={{ color: COLORS.orange }}>
          🎁 Avez-vous été recommandé(e) par quelqu'un ?
        </label>
        <input type="text" value={data.parrain || ""} onChange={(e) => update("parrain", e.target.value)}
          placeholder="Nom et prénom de la personne qui vous a recommandé(e)"
          className="input-field w-full rounded-xl border-2 bg-white px-4 py-3 text-sm font-semibold text-slate-800"
          style={{ borderColor: COLORS.orange }} />
        <p className="mt-2 text-xs text-slate-500">Votre parrain recevra une carte cadeau Carrefour de <strong>250€</strong> 🛒</p>
      </div>
    </div>
  );
}

function isContactValid(data) {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");
  const phoneValid = (data.telephone || "").replace(/\D/g, "").length >= 10;
  const cpValid = /^\d{5}$/.test(data.codePostal || "");
  return Boolean(data.prenom) && Boolean(data.nom) && emailValid && phoneValid && cpValid;
}

// =====================================================================
// VUE TUNNEL
// =====================================================================
function FunnelView({ stepIndex, data, update, onSelectSingle, onToggleMulti, onNext, onBack, submitting }) {
  const steps = getFunnelSteps(data);
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  let canContinue = true;
  if (step.type === "multi") canContinue = (data[step.key] || []).length > 0;
  if (step.type === "number") canContinue = Boolean(data.surface) && Number(data.surface) > 0;
  if (step.type === "contact") canContinue = isContactValid(data);

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: COLORS.bg }}>
      <ProgressTicket stepIndex={stepIndex} total={getFunnelSteps(data).length} />
      <div className="mx-auto max-w-md px-4 pt-2">
        <button onClick={onBack} className="mb-3 flex items-center gap-1 text-sm font-bold text-slate-400">
          <ChevronLeft size={16} /> Retour
        </button>
        <h2 className="font-display text-xl font-extrabold" style={{ color: COLORS.navy }}>{step.title}</h2>
        {step.subtitle && <p className="mt-1 text-sm text-slate-500">{step.subtitle}</p>}
        <div className="mt-4">
          {step.type === "single" && <ChoiceGrid options={step.options} value={data[step.key]} columns={step.columns} onSelect={(id) => onSelectSingle(step.key, id)} />}
          {step.type === "multi" && <ChoiceGrid options={step.options} value={data[step.key]} multi columns={step.columns} onSelect={(id) => onToggleMulti(step.key, id)} />}
          {step.type === "number" && (
            <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-4">
              <input type="number" placeholder="Ex : 90" value={data.surface} onChange={(e) => update("surface", e.target.value)} className="w-full bg-transparent text-lg font-bold text-slate-800 outline-none" />
              <span className="text-sm font-bold text-slate-400">m²</span>
            </div>
          )}
          {step.type === "contact" && <ContactForm data={data} update={update} />}
        </div>
        {(step.type === "multi" || step.type === "number" || step.type === "contact") && (
          <button onClick={onNext} disabled={!canContinue || submitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold text-white disabled:opacity-40"
            style={{ backgroundColor: COLORS.blue }}>
            {submitting ? "Envoi en cours..." : isLast ? "Valider et choisir mon créneau" : "Continuer"}
            {!submitting && <ArrowRight size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

// =====================================================================
// VUE CALENDLY
// =====================================================================
function BookingView({ onConfirm }) {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { if (document.body.contains(s)) document.body.removeChild(s); };
  }, []);
  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: COLORS.bg }}>
      <div className="mx-auto max-w-md px-4 pt-5">
        <h2 className="font-display text-xl font-extrabold" style={{ color: COLORS.navy }}>Choisissez votre créneau</h2>
        <p className="mt-1 text-sm text-slate-500">Alexandre vous rappellera personnellement à l'heure choisie.</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: "100%", height: "560px" }} />
        </div>
        <button onClick={onConfirm} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold text-white" style={{ backgroundColor: COLORS.turquoise }}>
          <Check size={16} />J'ai choisi mon créneau
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// VUE CONFIRMATION
// =====================================================================
function ConfirmationView({ data, onRestart }) {
  const projetLabel = {
    photovoltaique: "panneaux solaires", pac: "pompe à chaleur",
    isolation: "isolation thermique", clim: "climatisation réversible",
    plusieurs: "vos projets énergétiques",
  }[data.projet] || "votre projet";

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: COLORS.bg }}>
      {/* Header confirmation */}
      <div className="px-4 py-8 text-center" style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)` }}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="mt-4 font-display text-2xl font-extrabold text-white">
          Merci{data.prenom ? ` ${data.prenom}` : ""} !
        </h2>
        <p className="mt-2 text-base font-bold" style={{ color: COLORS.turquoise }}>
          Votre demande a bien été reçue
        </p>
      </div>

      <div className="mx-auto max-w-md px-4">
        {/* Étapes progression */}
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-wide mb-3" style={{ color: COLORS.navy }}>Prochaine étape</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: COLORS.turquoise }}>✓</span>
              <p className="text-sm font-semibold text-slate-700">Demande reçue</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: COLORS.turquoise }}>✓</span>
              <p className="text-sm font-semibold text-slate-700">Analyse de votre projet en cours</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "#f0f7ff", color: COLORS.blue }}>📅</span>
              <p className="text-sm font-semibold" style={{ color: COLORS.blue }}>Réservez votre créneau ci-dessous</p>
            </div>
          </div>
        </div>

        {/* Calendly intégré */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="px-4 py-3" style={{ backgroundColor: COLORS.navy }}>
            <p className="text-sm font-bold text-white">📅 Réservez votre créneau maintenant</p>
            <p className="text-xs" style={{ color: COLORS.turquoise }}>Pendant que vous êtes disponible — Alexandre ou Delphine vous rappelle</p>
          </div>
          <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: "100%", height: "500px" }} />
        </div>

        {/* Message rappel alternatif */}
        <div className="mt-3 rounded-2xl p-4" style={{ backgroundColor: "#f0f7ff" }}>
          <p className="text-sm text-slate-600">
            🕐 Si vous ne trouvez pas de créneau, <span className="font-bold" style={{ color: COLORS.blue }}>Alexandre ou Delphine vous rappellera sous 24h ouvrées.</span>
          </p>
        </div>

        {/* Vidéos témoignages */}
        <h3 className="mt-6 font-display text-lg font-extrabold" style={{ color: COLORS.navy }}>
          Ils ont déjà fait le pas
        </h3>
        <p className="mt-1 text-sm text-slate-500">Des clients comme vous, en Île-de-France</p>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {VIDEOS_TEMOIGNAGES.slice(0, 4).map((v) => (
            <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
              style={{ width: "140px" }}>
              <div className="relative">
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.nom} className="w-full object-cover" style={{ aspectRatio: "16/9" }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#ff0000" }}>
                    <Play size={12} className="text-white" fill="white" />
                  </div>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs font-bold text-slate-800 truncate">{v.nom}</p>
                <p className="text-xs text-slate-500 truncate">{v.accroche}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Avis clients */}
        <h3 className="mt-6 font-display text-lg font-extrabold" style={{ color: COLORS.navy }}>
          Avis clients vérifiés
        </h3>
        <div className="mt-3 space-y-3">
          {[
            { nom: "Magnouche", projet: "PAC + Isolation ITE", texte: "Un grand merci à Alexandre D., très à l'écoute, disponible et réactif. Le résultat est à la hauteur de mes attentes." },
            { nom: "Jean-Luc Gros", projet: "Pompe à chaleur Ariston", texte: "Très satisfait du conseiller Alexandre D. L'installation s'est faite en une journée par des techniciens de qualité." },
          ].map((a) => (
            <div key={a.nom} className="rounded-2xl bg-white p-4 shadow-sm" style={{ borderLeft: `4px solid ${COLORS.blue}` }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-800">{a.nom}</p>
                  <p className="text-xs text-slate-400">{a.projet}</p>
                </div>
                <span style={{ color: COLORS.orange }}>★★★★★</span>
              </div>
              <p className="mt-2 text-sm italic leading-snug text-slate-600">"{a.texte}"</p>
            </div>
          ))}
        </div>

        {/* Lien témoignages Carrefour Énergies */}
        <a href="https://installation.energies.carrefour.fr/temoignages/chauffage"
          target="_blank" rel="noopener noreferrer"
          className="mt-4 flex items-center justify-between rounded-2xl p-4 bg-white shadow-sm"
          style={{ border: `1.5px solid ${COLORS.blue}33` }}>
          <div>
            <p className="text-sm font-bold" style={{ color: COLORS.navy }}>Voir tous les témoignages</p>
            <p className="text-xs text-slate-400">Carrefour Énergies — Réalisations clients</p>
          </div>
          <ArrowRight size={18} style={{ color: COLORS.blue }} />
        </a>

        {/* CTA appel */}
        <a href={`tel:${PHONE_TEL}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold text-white shadow-md"
          style={{ backgroundColor: COLORS.blue }}>
          <Phone size={16} />Appeler Alexandre — {PHONE_DISPLAY}
        </a>

        <button onClick={onRestart} className="mt-4 w-full text-center text-sm font-bold text-slate-400 underline pb-4">
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// APP PRINCIPALE
// =====================================================================
const EMPTY_DATA = {
  projet: null, statut: null, logement: null, surface: "", chauffage: null,
  travaux: [], delai: null, clientCarrefour: null, source: null,
  typeLocal: null, surfaceClim: null,
  prenom: "", nom: "", telephone: "", email: "", codePostal: "", parrain: "",
};

export default function App() {
  const [view, setView] = useState("home");
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState(EMPTY_DATA);

  useEffect(() => { injectAnalyticsScripts(); }, []);

  function update(key, value) { setData((prev) => ({ ...prev, [key]: value })); }

  function selectSingle(key, value) {
    setData((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStepIndex((i) => Math.min(i + 1, FUNNEL_STEPS.length - 1)), 150);
  }

  function toggleMulti(key, value) {
    setData((prev) => {
      const current = prev[key] || [];
      let next;
      if (value === "aucun") { next = current.includes("aucun") ? [] : ["aucun"]; }
      else { const wo = current.filter(v => v !== "aucun"); next = wo.includes(value) ? wo.filter(v => v !== value) : [...wo, value]; }
      return { ...prev, [key]: next };
    });
  }

  function goBack() { if (stepIndex > 0) setStepIndex(i => i - 1); else setView("home"); }

  async function goNext() {
    const steps = getFunnelSteps(data);
    if (stepIndex < steps.length - 1) { setStepIndex(i => i + 1); return; }
    setSubmitting(true);
    const score = calculateLeadScore(data);
    await Promise.all([
      submitToHubSpot(data, score),
      sendEmailLead(data, score),
    ]);
    trackEvent("generate_lead", { value: score, currency: "EUR", project_type: data.projet });
    setSubmitting(false);
    setView("confirmation");
  }

  function startFunnel() { setStepIndex(0); setView("funnel"); }
  function startFunnelWithProject(projectId) { setData(prev => ({ ...prev, projet: projectId })); setStepIndex(1); setView("funnel"); }
  function goToBooking() { setView("booking"); }
  function finishBooking() { trackEvent("appointment_scheduled"); setView("confirmation"); }
  function restart() { setData(EMPTY_DATA); setStepIndex(0); setView("home"); }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap');
        .font-display { font-family: 'Outfit', sans-serif; }
        .input-field { outline: none; transition: border-color 0.15s ease; }
        .input-field:focus { border-color: ${COLORS.turquoise}; }
      `}</style>

      <TopBar />

      {view === "home" && <HomeView onStart={startFunnel} onStartWithProject={startFunnelWithProject} onBook={goToBooking} />}
      {view === "funnel" && <FunnelView stepIndex={stepIndex} data={data} update={update} onSelectSingle={selectSingle} onToggleMulti={toggleMulti} onNext={goNext} onBack={goBack} submitting={submitting} />}
      {/* Vue booking supprimée — Calendly intégré dans confirmation */}
      {view === "confirmation" && <ConfirmationView data={data} onRestart={restart} />}

      {view === "home" && <FloatingBar onCallback={startFunnel} onBook={goToBooking} />}
    </div>
  );
}
