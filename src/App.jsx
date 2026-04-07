import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity, BarChart2, Menu, X, Mail, Phone, MapPin, ChevronRight,
  Database, PieChart, CheckCircle, Award, Layers, ExternalLink, XCircle,
  CheckSquare, Monitor, Plus, Minus, HelpCircle, Facebook, MessageSquare,
  Send, Sparkles, Loader2, MessageCircle, BrainCircuit, FilePenLine,
  Lightbulb, Copy, Check, ArrowRight, Users, BookOpen, TrendingUp, Clock
} from 'lucide-react';

// --- NAVIGATION UNIVERSELLE ---
const smoothScrollTo = (e, targetId) => {
  e.preventDefault();
  const element = document.getElementById(targetId.replace('#', ''));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// --- STYLES GLOBAUX & ANIMATIONS ---
const GlobalStyles = () => (
  <style>{`
    html {
      scroll-behavior: smooth;
      scroll-padding-top: 80px;
      font-family: 'Inter', sans-serif;
      font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    }
    body {
      font-size: 16px;
      line-height: 1.6;
    }
    h1, h2, h3, h4, h5 {
      letter-spacing: -0.025em;
      line-height: 1.2;
    }
    p {
      line-height: 1.75;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

    @keyframes float {
      0% { transform: translate(0px, 0px); }
      50% { transform: translate(10px, -20px); }
      100% { transform: translate(0px, 0px); }
    }
    @keyframes float-delayed {
      0% { transform: translate(0px, 0px); }
      50% { transform: translate(-15px, 15px); }
      100% { transform: translate(0px, 0px); }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in-down {
      from { opacity: 0; transform: translateY(-16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes gradient-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes toast-slide-in {
      from { opacity: 0; transform: translateY(16px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    :root {
      --cebi-indigo: #2B3490;
      --cebi-indigo-light: #3D4DB7;
      --cebi-indigo-dark: #1E2566;
    }

    .animate-float          { animation: float 8s ease-in-out infinite; }
    .animate-float-delayed  { animation: float-delayed 10s ease-in-out infinite; }
    .animate-fade-in-up     { animation: fade-in-up 0.35s ease-out forwards; }
    .animate-fade-in-down   { animation: fade-in-down 0.3s ease-out forwards; }
    .animate-toast          { animation: toast-slide-in 0.3s ease-out forwards; }
    .bg-gradient-animate    { background-size: 200% 200%; animation: gradient-shift 5s ease infinite; }
  `}</style>
);

// --- COMPOSANT REVEAL AU SCROLL ---
const Reveal = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- TOAST NOTIFICATION (remplace alert) ---
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: 'bg-green-600',
    error:   'bg-red-600',
    info:    'bg-indigo-700',
  };

  return (
    <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-[200] ${styles[type]} text-white px-5 py-3 rounded-xl shadow-2xl animate-toast flex items-center gap-3 text-sm font-semibold max-w-xs text-center`}>
      {type === 'success' && <Check size={16} className="flex-shrink-0" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100 flex-shrink-0"><X size={14} /></button>
    </div>
  );
};

const useToast = () => {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'success') => setToast({ message, type }), []);
  const hideToast = useCallback(() => setToast(null), []);
  return { toast, showToast, hideToast };
};

// --- COMPTEUR ANIMÉ ---
const useCounter = (target, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, isVisible, duration]);
  return count;
};

const StatItem = ({ icon: Icon, label, value, suffix, color, isVisible, delay }) => {
  const count = useCounter(value, isVisible, 2000 + delay);
  return (
    <div className="text-center group">
      <div className="flex justify-center mb-3">
        <div className="bg-white/10 p-3 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
          <Icon size={28} className={color} />
        </div>
      </div>
      <div className={`text-4xl font-extrabold ${color} mb-1 tabular-nums`}>
        {count}{suffix}
      </div>
      <div className="text-indigo-200 text-sm font-medium">{label}</div>
    </div>
  );
};

// ============================================================
// NOUVELLE SECTION : STATISTIQUES ANIMÉES
// ============================================================
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: BookOpen,   label: 'Études réalisées',        value: 50,  suffix: '+', color: 'text-sky-400',    delay: 0 },
    { icon: Users,      label: 'Personnes accompagnées', value: 50,  suffix: '+', color: 'text-indigo-300', delay: 200 },
    { icon: TrendingUp, label: 'Taux de satisfaction',   value: 98,  suffix: '%', color: 'text-green-400',  delay: 400 },
    { icon: Clock,      label: "Années d'existence",     value: 5,   suffix: '+', color: 'text-violet-300', delay: 600 },
  ];

  return (
    <section className="py-16 bg-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900"></div>
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// NOUVELLE SECTION : PROCESSUS EN 3 ÉTAPES
// ============================================================
const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      icon: MessageCircle,
      title: 'Prise de Contact',
      description: "Décrivez votre projet via notre formulaire, WhatsApp ou email. Nous organisons un premier entretien d'évaluation gratuit et sans engagement.",
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      number: '02',
      icon: Activity,
      title: 'Analyse & Traitement',
      description: "Nos experts traitent vos données avec les méthodes statistiques adaptées (R, SPSS, Stata). Chaque étape est validée avec vous en toute transparence.",
      color: 'from-sky-500 to-sky-700',
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Rapport & Livraison',
      description: "Vous recevez un rapport d'analyse complet, interprété et formaté, prêt à intégrer dans votre thèse, mémoire ou article scientifique.",
      color: 'from-indigo-500 to-indigo-700',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-sm font-bold text-sky-600 uppercase tracking-widest mb-3">Comment ça marche</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Notre Processus en 3 Étapes</h3>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Simple, transparent et rigoureux — de votre première question à la livraison finale.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 200}>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative text-center overflow-hidden">
                <span className="absolute top-4 right-5 text-6xl font-black text-slate-100 select-none leading-none">
                  {step.number}
                </span>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg relative z-10`}>
                  <step.icon size={28} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{step.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// NOUVEAU BANDEAU CTA
// ============================================================
const CTABanner = () => (
  <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-800 relative overflow-hidden">
    <div className="absolute right-0 top-0 w-72 h-72 bg-sky-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
    <div className="absolute left-0 bottom-0 w-72 h-72 bg-indigo-400 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          Votre thèse mérite une analyse irréprochable
        </h2>
        <p className="text-indigo-200 mb-8 text-lg max-w-2xl mx-auto">
          Rejoignez les +50 personnes qui font confiance à CEBI Stats pour leurs données de santé.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            onClick={(e) => smoothScrollTo(e, '#contact')}
            className="inline-flex items-center justify-center px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all hover:-translate-y-1 shadow-lg hover:shadow-sky-500/30"
          >
            Obtenir un devis gratuit <ArrowRight size={20} className="ml-2" />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=2250141974132&text=Bonjour%20CEBI%20Stats%2C%20je%20voudrais%20obtenir%20un%20devis."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all hover:-translate-y-1 shadow-lg"
          >
            <MessageCircle size={20} className="mr-2" /> Écrire sur WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

// ============================================================
// OUTILS IA (clé API corrigée + bouton copier)
// ============================================================
const AITools = () => {
  const [activeTab, setActiveTab] = useState('advisor');
  const [input, setInput]         = useState('');
  const [result, setResult]       = useState('');
  const [loading, setLoading]     = useState(false);
  const [copied, setCopied]       = useState(false);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResult('');

    const systemPrompt = activeTab === 'advisor'
      ? "Tu es un expert biostatisticien senior nommé Keycee, de CEBI Stats. L'utilisateur va décrire ses données, ses variables ou son objectif de recherche. Recommande le test statistique le plus approprié (Test t de Student, Chi-2, ANOVA, Régression logistique, Mann-Whitney, Kaplan-Meier, etc.) et explique brièvement pourquoi. Si l'information est incomplète, demande des précisions sur le type de variables. Sois précis et pédagogique."
      : "Tu es un éditeur scientifique académique francophone expert. L'utilisateur te fournit un paragraphe brouillon (résumé, introduction, ou discussion). Réécris-le pour qu'il soit professionnel, clair, concis et adapté à une publication scientifique (thèse ou article). Améliore le vocabulaire et la structure sans changer le sens. Donne uniquement le texte réécrit.";

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur lors de l'analyse. Veuillez réessayer.";
      setResult(text);
    } catch {
      setResult("Erreur de connexion. Vérifiez votre réseau et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-tools" className="py-24 bg-slate-900 relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-bold mb-6">
              <Sparkles size={14} className="mr-2" /> Powered by Gemini AI
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Outils IA &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                Recherche Intelligente
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Des outils gratuits pour vous aider à choisir vos tests statistiques ou améliorer votre rédaction scientifique.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row min-h-[520px]">
            {/* Sidebar */}
            <div className="md:w-1/3 bg-slate-900/60 border-b md:border-b-0 md:border-r border-slate-700 p-6 flex flex-col gap-4">
              <button
                onClick={() => { setActiveTab('advisor'); setResult(''); setInput(''); }}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 text-left ${activeTab === 'advisor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <BrainCircuit size={24} className="mr-3 flex-shrink-0" />
                <div>
                  <div className="font-bold">Conseiller Stats</div>
                  <div className="text-xs opacity-70">Quel test choisir ?</div>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('writer'); setResult(''); setInput(''); }}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 text-left ${activeTab === 'writer' ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <FilePenLine size={24} className="mr-3 flex-shrink-0" />
                <div>
                  <div className="font-bold">Rédacteur Pro</div>
                  <div className="text-xs opacity-70">Reformulation académique</div>
                </div>
              </button>

              <div className="mt-auto p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-400">
                <Lightbulb size={16} className="text-yellow-400 mb-2" />
                Ces outils utilisent l'IA Gemini. Vérifiez toujours les résultats avec un statisticien expert de CEBI Stats.
              </div>
            </div>

            {/* Zone principale */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
              <div className="mb-5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {activeTab === 'advisor' ? '🔎 Quel test statistique choisir ?' : '📝 Améliorer mon texte scientifique'}
                </h3>
                <p className="text-slate-400 text-sm">
                  {activeTab === 'advisor'
                    ? "Décrivez vos variables et votre objectif (ex : 'Je veux comparer l'âge moyen entre 3 groupes de patients')."
                    : "Collez votre paragraphe brouillon pour le transformer en texte académique professionnel."}
                </p>
              </div>

              <form onSubmit={handleAISubmit} className="flex-1 flex flex-col">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={activeTab === 'advisor'
                    ? "Ex : J'ai une variable qualitative (Maladie Oui/Non) et je veux voir le lien avec le Sexe..."
                    : "Ex : On a vu que le medicament marche bien sur les patients..."}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none resize-none h-32 transition-all text-sm"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className={`px-6 py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 flex items-center gap-2 text-sm ${activeTab === 'advisor' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-sky-600 hover:bg-sky-500'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading
                      ? <><Loader2 size={16} className="animate-spin" /> Analyse en cours...</>
                      : <><Sparkles size={16} /> {activeTab === 'advisor' ? 'Trouver le test' : 'Améliorer le texte'}</>
                    }
                  </button>
                </div>
              </form>

              {/* Zone de résultat */}
              <div className={`mt-5 rounded-xl border border-slate-700 bg-slate-900/80 min-h-[130px] transition-all duration-500 ${result ? 'opacity-100' : 'opacity-40'}`}>
                {result ? (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Réponse de l'IA</span>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors px-2 py-1 rounded-lg hover:bg-slate-800"
                      >
                        {copied
                          ? <><Check size={13} className="text-green-400" /> Copié !</>
                          : <><Copy size={13} /> Copier</>
                        }
                      </button>
                    </div>
                    <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-sm">{result}</div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-600 italic text-sm p-4">
                    Le résultat s'affichera ici...
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================
// ASSISTANT CHATBOT (clé API + nom Keycee + meilleure UX)
// ============================================================
const GeminiAssistant = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bonjour ! Mon nom est Keycee, l'assistant de CEBI Stats. Je peux vous renseigner sur nos services, nos tarifs ou vous aider à prendre rendez-vous. Comment puis-je vous aider ?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      const systemPrompt = `Tu es Keycee, l'assistant virtuel de CEBI Stats, cabinet d'études biostatistique et informatique à Abidjan, Côte d'Ivoire.
Tes réponses sont courtes (2-3 phrases), chaleureuses et professionnelles.
Services : Biostatistique avancée (thèses, mémoires), Gestion et nettoyage de données, Formation bureautique et logiciels, Infographie et mise en forme.
Tarifs : sur devis personnalisé, tarifs étudiants défiant toute concurrence.
Contact : cebi.stat@yahoo.com | WhatsApp : +225 01 41 97 41 32 | Facebook : CEBISTATS.
Pour les questions très techniques, renvoie vers la section "Outils IA" du site ou vers le formulaire de contact en bas de page.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas pu traiter votre message. Contactez-nous directement.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "Problème de connexion. Contactez-nous sur WhatsApp au +225 01 41 97 41 32." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] bg-gradient-to-r from-indigo-700 to-sky-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant Keycee"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up"
             style={{ maxHeight: '500px' }}>
          <div className="bg-gradient-to-r from-indigo-900 to-slate-800 p-4 text-white flex justify-between items-center flex-shrink-0">
            <span className="font-bold flex items-center gap-2">
              <Sparkles size={15} className="text-sky-400" />
              Keycee — CEBI Stats
            </span>
            <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-400 flex items-center gap-2 shadow-sm">
                  <Loader2 size={13} className="animate-spin" /> Keycee écrit...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white flex gap-2 flex-shrink-0">
            <input
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Votre question..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-indigo-900 text-white p-2 rounded-xl disabled:opacity-40 hover:bg-indigo-800 transition-colors"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// --- COMPOSANTS UI STANDARD ---

const Button = ({ children, variant = 'primary', className = '', href, onClick, ...props }) => {
  const base = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  const variants = {
    primary: "border-transparent text-white bg-indigo-900 hover:bg-indigo-800 focus:ring-indigo-900 shadow-lg hover:shadow-xl",
    secondary: "border-transparent text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-500 shadow-md",
    outline: "border-indigo-100 text-indigo-900 bg-white hover:bg-indigo-50 focus:ring-indigo-500",
  };
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (href && href.startsWith('#')) smoothScrollTo(e, href);
  };
  return (
    <a href={href} onClick={handleClick} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
};

// --- MODAL SERVICE (avec Escape pour fermer) ---
const ServiceModal = ({ service, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!service) return null;

  const handleDevisClick = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full relative animate-fade-in-up">
          <div className={`bg-gradient-to-r ${service.color} p-6 flex justify-between items-start`}>
            <div className="flex items-center text-white">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold" id="modal-title">{service.title}</h3>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Fermer">
              <XCircle size={28} />
            </button>
          </div>

          <div className="px-6 py-6">
            <p className="text-gray-500 italic mb-6 text-sm border-l-4 border-indigo-100 pl-4">"{service.intro}"</p>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center">
                <Activity size={16} className="mr-2 text-sky-500" /> Notre Offre
              </h4>
              <ul className="space-y-3">
                {service.details.map((point, idx) => (
                  <li key={idx} className="flex items-start text-gray-600 text-sm leading-relaxed">
                    <CheckSquare size={16} className="mr-3 mt-1 text-sky-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3">Outils & Logiciels</h4>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">{tool}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3">
            <button type="button" onClick={handleDevisClick}
              className="w-full sm:w-auto inline-flex justify-center rounded-xl px-5 py-2.5 bg-indigo-900 text-sm font-semibold text-white hover:bg-indigo-800 focus:outline-none transition-colors">
              Demander un devis
            </button>
            <button type="button" onClick={onClose}
              className="w-full sm:w-auto mt-3 sm:mt-0 inline-flex justify-center rounded-xl border border-gray-300 px-5 py-2.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// NAVIGATION (avec surlignage de la section active)
// ============================================================
const Navigation = ({ onBlogClick }) => {
  const [isOpen, setIsOpen]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'services', 'portfolio', 'ai-tools', 'faq', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Accueil',      href: '#home',      id: 'home' },
    { name: 'Expertises',   href: '#services',  id: 'services' },
    { name: 'Réalisations', href: '#portfolio', id: 'portfolio' },
    { name: 'Outils IA',   href: '#ai-tools',  id: 'ai-tools' },
    { name: 'FAQ',          href: '#faq',        id: 'faq' },
    { name: 'À Propos',    href: '#about',      id: 'about' },
  ];

  const handleNavClick = (e, href) => {
    setIsOpen(false);
    smoothScrollTo(e, href);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/logo-cebistats.jpg"
              alt="Logo CEBI Stats"
              className="h-12 w-auto mr-3 rounded-lg shadow-sm bg-white hover:scale-105 transition-transform"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className="hidden bg-indigo-900 p-2 rounded-lg mr-2 items-center justify-center">
              <BarChart2 size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tighter leading-none" style={{ color: 'var(--cebi-indigo)' }}>
                CEBI <span style={{ color: 'var(--cebi-indigo-light)' }}>Stats</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Côte d'Ivoire</span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer relative pb-0.5
                  ${activeSection === link.id
                    ? 'text-sky-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-500 after:rounded-full'
                    : scrolled ? 'text-gray-600 hover:text-sky-600' : 'text-gray-700 hover:text-sky-600'
                  }`}
              >
                {link.name}
              </a>
            ))}
            {onBlogClick && (
              <button
                onClick={() => { setIsOpen(false); onBlogClick(); }}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${scrolled ? 'text-gray-600 hover:text-sky-600' : 'text-gray-700 hover:text-sky-600'}`}
              >
                <BookOpen size={13} /> Blog
              </button>
            )}
            <Button variant="primary" href="#contact" className="!px-5 !py-2 !text-sm !rounded-lg">
              Devis Gratuit
            </Button>
          </div>

          {/* Burger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-indigo-900 focus:outline-none p-2" aria-label="Menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full top-full left-0 animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-gray-700 hover:text-sky-600 hover:bg-indigo-50'
                }`}
              >
                {activeSection === link.id && (
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-3 flex-shrink-0"></span>
                )}
                {link.name}
              </a>
            ))}
            {onBlogClick && (
              <button
                onClick={() => { setIsOpen(false); onBlogClick(); }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-indigo-50 transition-colors w-full"
              >
                <BookOpen size={16} /> Blog
              </button>
            )}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="block w-full text-center mt-4 px-5 py-3 rounded-xl bg-indigo-900 text-white font-bold shadow-lg"
            >
              Démarrer un projet
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ============================================================
// HERO (barres animées + badges de confiance + mini-stats)
// ============================================================
const Hero = () => {
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const skills = [
    { label: 'Biostatistique', level: 95, color: 'bg-sky-500' },
    { label: 'Informatique',   level: 90, color: 'bg-indigo-500' },
    { label: 'Infographie',    level: 88, color: 'bg-indigo-500' },
  ];

  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-50 via-indigo-50 to-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scroll-mt-28">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-100 opacity-40 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-100 opacity-40 blur-3xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Texte gauche */}
          <div className="lg:col-span-7 text-center lg:text-left mb-12 lg:mb-0">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold mb-6 shadow-sm">
                <Award size={14} className="mr-2 text-sky-500" />
                Cabinet d'Études Biostatistique & Informatique — Abidjan
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Transformez vos données de santé en{' '}
                <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B3490] to-[#3D4DB7]">
                  décisions éclairées
                </span>
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Nous combinons expertise statistique et solutions informatiques. Du nettoyage de vos données à la livraison de votre rapport final.
              </p>
            </Reveal>
            <Reveal delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href="#services" variant="primary">
                  Nos Services <ChevronRight size={20} className="ml-2" />
                </Button>
                <Button href="#portfolio" variant="outline">
                  Nos Réalisations
                </Button>
              </div>
            </Reveal>
            <Reveal delay={800}>
              <div className="mt-8 flex flex-wrap items-center gap-5 justify-center lg:justify-start text-sm text-gray-500">
                <div className="flex items-center gap-1.5"><CheckCircle size={15} className="text-green-500" /> Devis gratuit</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={15} className="text-green-500" /> Résultats validés</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={15} className="text-green-500" /> Disponible 24/7</div>
              </div>
            </Reveal>
          </div>

          {/* Illustration Dashboard Biostat */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <Reveal delay={800}>
              <div className="relative">
                {/* Carte principale : dashboard R */}
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-500">
                  {/* Window chrome */}
                  <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500 opacity-80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
                    <span className="ml-3 text-xs text-slate-400 font-mono">analyse_survie.R — CEBI Stats</span>
                  </div>

                  <div className="p-5">
                    {/* Titre du graphique */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-slate-600">Distribution par groupe — n=247</span>
                      <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Analyse complète</span>
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end gap-1.5 h-28 mb-4 bg-slate-50 rounded-xl px-3 pt-3 pb-0">
                      {[55,72,48,88,62,95,58,82,70,90].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background: i % 2 === 0
                              ? 'linear-gradient(to top, #2B3490, #3D4DB7)'
                              : 'linear-gradient(to top, #1E2566, #2B3490)',
                            opacity: 0.75 + i * 0.02,
                          }}
                        />
                      ))}
                    </div>

                    {/* Résultats stats */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'p-valeur',   value: '< 0.001', cls: 'text-green-700 bg-green-50 border-green-100' },
                        { label: 'OR [IC95%]', value: '2.34',    cls: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
                        { label: 'Sensibilité',value: '87.4 %',  cls: 'text-sky-700 bg-sky-50 border-sky-100' },
                      ].map((s, i) => (
                        <div key={i} className={`rounded-xl p-2.5 border text-center ${s.cls}`}>
                          <div className="font-black text-xs">{s.value}</div>
                          <div className="text-[9px] opacity-70 mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Barre de progression survie */}
                    <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-600">Survie globale Kaplan-Meier</span>
                        <span className="font-black text-indigo-900">72.4 %</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500" style={{ width: '72.4%' }}></div>
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1">Suivi médian 38 mois · CHU Cocody</div>
                    </div>
                  </div>
                </div>

                {/* Badge flottant : Chi-2 */}
                <div className="absolute -top-5 -right-5 bg-indigo-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-indigo-700 animate-float">
                  <div className="text-sky-300 font-bold text-[10px] uppercase tracking-wide mb-0.5">Test Chi²</div>
                  <div className="text-white font-black text-lg leading-none">Sig. ✓</div>
                  <div className="text-indigo-300 text-[9px] mt-0.5">p = 0.003</div>
                </div>

                {/* Badge flottant : 50+ études */}
                <div className="absolute -bottom-5 -left-5 bg-white border border-sky-100 px-4 py-3 rounded-2xl shadow-xl animate-float-delayed">
                  <div className="text-slate-400 font-bold text-[10px] uppercase tracking-wide mb-0.5">Études réalisées</div>
                  <div className="text-indigo-900 font-black text-lg leading-none">50 +</div>
                  <div className="text-slate-400 text-[9px] mt-0.5">depuis 2020 · Abidjan</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CARTE DE SERVICE ---
const ServiceCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div
    className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden flex flex-col h-full cursor-pointer"
    onClick={onClick}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
    <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
      <Icon size={28} className="text-slate-700 group-hover:text-indigo-600 transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm flex-1">{description}</p>
    <button className="mt-6 flex items-center text-sky-600 font-semibold text-sm hover:text-sky-800 transition-colors group-hover:translate-x-1">
      En savoir plus <ChevronRight size={16} className="ml-1" />
    </button>
  </div>
);

// --- SECTION SERVICES ---
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Database,
      title: "Gestion de Données & Formulaires",
      description: "Création de formulaires de collecte de données mobiles et nettoyage de vos bases de données.",
      color: "from-indigo-400 to-indigo-600",
      intro: "Une bonne analyse commence par une collecte de données fiable et structurée.",
      details: [
        "Création de formulaires de saisie automatisés (ODK, KoboCollect) pour smartphones et tablettes.",
        "Facilitation de la collecte terrain et réduction des erreurs de saisie.",
        "Apurement et structuration des bases de données pour les rendre exploitables.",
        "Gestion et traitement de données massives.",
      ],
      tools: ["ODK Collect", "EPI Info", "KoboToolbox", "Excel Avancé", "SQL"],
    },
    {
      icon: Activity,
      title: "Biostatistique Avancée",
      description: "Modélisation complexe : Analyse de survie (Kaplan-Meier, Cox), Régression et Tests.",
      color: "from-sky-400 to-sky-600",
      intro: "Nous transformons vos chiffres en preuves scientifiques robustes pour la prise de décision.",
      details: [
        "Analyses bivariées et multivariées pour éliminer les facteurs de confusion.",
        "Calcul des mesures d'association (OR, RR) et modélisation prédictive.",
        "Analyse de survie (Courbes de Kaplan-Meier, Modèles de Cox).",
        "Interprétation rigoureuse des résultats pour thèses et rapports.",
      ],
      tools: ["R Studio", "SPSS", "Epi Info", "Stata", "Analyse de Survie", "Python"],
    },
    {
      icon: Monitor,
      title: "Formation en Informatique & Logiciels",
      description: "Vente/Installation de logiciels, maintenance et formation personnalisée en bureautique.",
      color: "from-slate-500 to-slate-700",
      intro: "Nous vous équipons et vous formons pour optimiser votre productivité au quotidien.",
      details: [
        "Vente et installation de logiciels professionnels (Suite Office, Adobe Creative Cloud).",
        "Installation de logiciels ludiques et jeux (PC & PlayStation) pour particuliers.",
        "Formation personnalisée à la suite Office (Word, Excel, PowerPoint) : du niveau débutant à expert.",
        "Conseil en équipement informatique et maintenance logicielle.",
      ],
      tools: ["Microsoft Office 365", "Suite Adobe", "Windows", "Maintenance PC"],
    },
    {
      icon: PieChart,
      title: "Infographie & Édition",
      description: "Mise en forme professionnelle de documents et création de visuels impactants.",
      color: "from-indigo-400 to-indigo-600",
      intro: "La forme valorise le fond. Nous rendons vos rapports et supports lisibles et professionnels.",
      details: [
        "Mise en forme professionnelle de rapports d'études, thèses et mémoires.",
        "Conception de supports de formation clairs et pédagogiques.",
        "Création d'infographies récapitulatives pour valoriser vos résultats statistiques.",
        "Design de présentations PowerPoint institutionnelles.",
      ],
      tools: ["PowerPoint", "Adobe InDesign", "Adobe Illustrator"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-white relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-sky-600 uppercase tracking-widest mb-3">Nos Domaines d'Intervention</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Expertise Globale</h3>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              La complémentarité entre l'analyse de données et la maîtrise des outils informatiques.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 150}>
              <ServiceCard {...service} onClick={() => setSelectedService(service)} />
            </Reveal>
          ))}
        </div>
      </div>
      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
};

// --- CARTE PORTFOLIO ---
const ProjectCard = ({ title, category, description, tools }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:scale-[1.02] transform">
    <div className="h-1.5 bg-gradient-to-r from-indigo-900 via-indigo-700 to-sky-500"></div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
          {category}
        </span>
        <Layers size={15} className="text-gray-300" />
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-3 leading-tight uppercase tracking-wide">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tools.map((tool, i) => (
          <span key={i} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
            {tool}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// --- SECTION PORTFOLIO ---
const Portfolio = () => {
  const projects = [
    {
      category: "Oncologie",
      title: "Survie Cancer du Sein",
      description: "Analyse de survie des patients souffrant du cancer du sein (2024).",
      tools: ["Kaplan-Meier", "Modèle de Cox", "R Studio"],
    },
    {
      category: "Oncologie",
      title: "Survie Cancer du Col de l'Utérus",
      description: "Analyse de survie des patients souffrant du cancer du col de l'utérus (2025).",
      tools: ["Kaplan-Meier", "Modèle de Cox", "R Studio"],
    },
    {
      category: "Pédiatrie & Urgences",
      title: "Urgences Chirurgicales Pédiatriques",
      description: "Délais de prise en charge des urgences chirurgicales pédiatriques au CHU de Cocody (2023).",
      tools: ["Analyses Descriptives", "Tests Comparatifs"],
    },
    {
      category: "Santé Publique",
      title: "Handicap & Abandon",
      description: "Épidémiologie des enfants et adolescents handicapés abandonnés admis dans les pouponnières de Côte d'Ivoire (2023).",
      tools: ["Enquête Transversale", "Cartographie"],
    },
    {
      category: "Neurologie",
      title: "Syndromes Épileptiques",
      description: "Facteurs pronostiques des syndromes épileptiques vus en consultation d'épileptologie au CHU de Cocody.",
      tools: ["Régression Logistique", "Pronostic"],
    },
    {
      category: "Santé au Travail",
      title: "Nuisances Sonores",
      description: "Étude des lésions auditives liées à l'exposition aux nuisances sonores chez les téléopérateurs (2010-2020).",
      tools: ["Étude Longitudinale", "Audiométrie"],
    },
    {
      category: "Cardiologie",
      title: "Urgences Cardiologiques",
      description: "Analyse de la fréquentation du service des urgences de l'Institut de Cardiologie d'Abidjan.",
      tools: ["Séries Temporelles", "Analyse de Flux"],
    },
    {
      category: "Endocrinologie",
      title: "Prévention Diabète",
      description: "Connaissance, attitude et pratique (CAP) des patients diabétiques sur la prévention des plaies de pied (CHU Cocody, 2024).",
      tools: ["Étude CAP", "SPSS"],
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 border-t border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Portfolio</h2>
              <h3 className="text-3xl font-extrabold text-slate-900">Travaux Réalisés</h3>
              <p className="mt-4 text-gray-500">
                Un aperçu de notre expertise à travers des études concrètes menées dans les hôpitaux et structures de santé de Côte d'Ivoire.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a
                href="#contact"
                onClick={(e) => smoothScrollTo(e, '#contact')}
                className="inline-flex items-center font-bold text-indigo-900 hover:text-sky-600 transition-colors"
              >
                Discuter d'un projet similaire <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 80}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION À PROPOS ---
const About = () => (
  <section id="about" className="py-24 bg-white overflow-hidden scroll-mt-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        <Reveal className="relative mb-12 lg:mb-0">
          <div className="relative rounded-2xl shadow-2xl bg-indigo-900 text-white overflow-hidden p-10 z-10 hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-sky-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <BarChart2 size={64} className="mb-6 text-sky-400" />
            <h3 className="text-3xl font-bold mb-2">L'Équipe CEBI Stats</h3>
            <p className="text-indigo-200 font-medium mb-6">Experts en Biostatistique et Informatique</p>
            <div className="space-y-4 text-sm text-indigo-100">
              {[
                "Cabinet d'Études Biostatistique & Informatique (CEBI Stats)",
                "Expert en Santé Publique & Épidémiologie — Ministère de la Santé",
                "Expert Logiciels & Bureautique",
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <CheckCircle size={18} className="mr-3 text-sky-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-4 -right-4 w-full h-full border-2 border-sky-200 rounded-2xl z-0"></div>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Plus qu'un statisticien,{' '}
            <br />
            <span className="text-indigo-700">un partenaire de décision.</span>
          </h2>
          <div className="prose prose-lg text-gray-600 space-y-6 text-justify">
            <p>
              <strong>Pourquoi CEBI Stats ?</strong> Vous avez les données, vous avez l'expertise médicale, mais l'analyse statistique vous freine ? Vous n'êtes pas seul.
              Trop de thèses et d'articles scientifiques sont retardés parce que leurs auteurs peinent à exploiter leurs propres données. Trop souvent, le recours à des personnes non qualifiées conduit à des résultats erronés ou rejetés par les jurys.
              Nous avons créé CEBI Stats pour briser ce cercle vicieux.
            </p>
            <p>
              Fort de notre expérience au sein du <strong>Ministère de la Santé</strong>, nous maîtrisons toute la chaîne de production des données :
              de la conception du formulaire de collecte sur tablette (ODK) jusqu'à la mise en page finale du rapport, en passant par l'analyse statistique rigoureuse.
            </p>
            <p>
              Nous proposons également des <strong>formations personnalisées</strong> et l'installation de vos outils de travail, car nous croyons que l'autonomie de nos clients est la clé de leur succès.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => smoothScrollTo(e, '#contact')}
                className="text-sky-600 font-bold hover:text-sky-700 flex items-center"
              >
                Discutons de votre projet <ChevronRight size={20} className="ml-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// --- FAQ ---
const FAQItem = ({ question, answer, isOpen, toggle }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button className="w-full py-6 text-left focus:outline-none flex justify-between items-start group" onClick={toggle}>
      <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? 'text-indigo-900' : 'text-slate-800 group-hover:text-indigo-700'}`}>
        {question}
      </span>
      <div className={`flex-shrink-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${isOpen ? 'bg-indigo-900 border-indigo-900 text-white' : 'border-gray-300 text-gray-400 group-hover:border-indigo-900 group-hover:text-indigo-900'}`}>
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
      <div className="text-gray-600 leading-relaxed pr-8">
        {Array.isArray(answer) ? (
          <ul className="space-y-2">
            {answer.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{answer}</p>
        )}
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Comment procéder pour une demande de prestation ?",
      answer: "Vous pouvez nous contacter via le formulaire dédié, par WhatsApp ou par email. Décrivez brièvement votre projet (type d'étude, objectifs, état d'avancement des données). Nous organisons un premier entretien d'évaluation rapide, sans engagement, pour comprendre précisément votre besoin.",
    },
    {
      question: "Quelles sont les informations nécessaires pour l'analyse statistique ?",
      answer: [
        "Le protocole de recherche (ou une description détaillée de votre méthodologie).",
        "La base de données (pour évaluation de la qualité, des données manquantes et de la structure).",
        "Le Plan d'Analyse Statistique (PAS) si celui-ci existe déjà.",
        "Ces éléments sont essentiels pour déterminer la complexité et les méthodes requises (Score de Propension, Régression de Cox, etc.).",
      ],
    },
    {
      question: "Comment se déroule la prestation ?",
      answer: [
        "Conception : Validation du protocole et du PAS, calcul de la puissance statistique.",
        "Analyse : Réalisation des analyses avancées (multivariées, Analyse de Survie), gestion des données complexes.",
        "Rapport et Rédaction : Livraison d'un rapport d'analyse détaillé, section résultats prête pour votre manuscrit.",
      ],
    },
    {
      question: "Quels sont les tarifs pour une prestation ?",
      answer: "Nos tarifs sont établis sur devis personnalisé. Le coût dépend de l'étendue de l'accompagnement et de la complexité méthodologique. Pour les étudiants, nous proposons des tarifs spéciaux défiant toute concurrence. Le devis vous est fourni rapidement après l'évaluation de votre projet.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-gray-200 scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">FAQ</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Questions Fréquentes</h3>
            <p className="mt-4 text-gray-500">
              Tout ce que vous devez savoir avant de démarrer une collaboration avec CEBI Stats.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </Reveal>
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Vous ne trouvez pas votre réponse ?</p>
          <a
            href="#contact"
            onClick={(e) => smoothScrollTo(e, '#contact')}
            className="inline-flex items-center text-indigo-900 font-bold hover:text-sky-600 transition-colors"
          >
            <HelpCircle size={18} className="mr-2" /> Posez-nous votre question directement
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// CONTACT (alert → Toast inline)
// ============================================================
const Contact = () => {
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', type: 'Analyse Statistique (Thèse/Mémoire)', message: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) {
      showToast("Merci de remplir votre Nom, Email et Message.", 'error');
      return;
    }
    const subject = encodeURIComponent(`Demande de devis - ${formData.type} - ${formData.nom} ${formData.prenom}`);
    const body = encodeURIComponent(
      `Nom: ${formData.nom}\nPrénom: ${formData.prenom}\nEmail: ${formData.email}\nType de projet: ${formData.type}\n---\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:cebi.stat@yahoo.com?subject=${subject}&body=${body}`;
    try {
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => showToast("Votre messagerie devrait s'ouvrir. Sinon, écrivez à cebi.stat@yahoo.com", 'info'), 500);
    } catch {
      showToast("Erreur. Écrivez directement à cebi.stat@yahoo.com", 'error');
    }
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.message) {
      showToast("Merci de remplir au moins votre Nom et votre Message.", 'error');
      return;
    }
    const message = encodeURIComponent(
      `*Demande de Devis CEBI Stats*\n👤 Nom: ${formData.nom} ${formData.prenom}\n📧 Email: ${formData.email}\n📂 Projet: ${formData.type}\n---\n📝 Message:\n${formData.message}`
    );
    window.open(`https://api.whatsapp.com/send?phone=2250141974132&text=${message}`, '_blank');
  };

  const contactItems = [
    { icon: Mail,        title: 'Email',                   content: 'cebi.stat@yahoo.com',     href: 'mailto:cebi.stat@yahoo.com', sub: 'Réponse sous 24h' },
    { icon: Phone,       title: 'Téléphone & WhatsApp',   content: '(+225) 01 41 97 41 32',   href: 'https://api.whatsapp.com/send?phone=2250141974132', sub: 'Disponible 24/7', external: true },
    { icon: Facebook,    title: 'Facebook',                content: 'facebook.com/CEBISTATS',  href: 'https://facebook.com/CEBISTATS', external: true },
    { icon: MapPin,      title: 'Localisation',            content: "Abidjan, Côte d'Ivoire",  href: null },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-28">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Contactez CEBI Stats</h2>
              <p className="text-slate-400 mb-10 text-lg">
                Une thèse à finaliser ? Un logiciel à installer ? Une formation à organiser ?
                Nous sommes basés à Abidjan et disponibles pour vous.
              </p>
              <div className="space-y-7">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="flex-shrink-0 bg-indigo-800 p-4 rounded-xl group-hover:bg-sky-600 transition-colors">
                      <item.icon className="w-6 h-6 text-sky-200 group-hover:text-white" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="mt-1 text-slate-400 block hover:text-white transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="mt-1 text-slate-400">{item.content}</p>
                      )}
                      {item.sub && <span className="text-xs text-slate-600">{item.sub}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Nom', name: 'nom', placeholder: 'Votre nom', required: true },
                    { label: 'Prénom', name: 'prenom', placeholder: 'Votre prénom' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                      <input
                        type="text" name={f.name} required={f.required}
                        placeholder={f.placeholder} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email" name="email" required placeholder="votre@email.com" onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type de projet</label>
                  <select name="type" onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition">
                    <option>Analyse Statistique (Thèse/Mémoire)</option>
                    <option>Formation & Logiciels</option>
                    <option>Nettoyage de Données</option>
                    <option>Infographie & Rapport</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message" rows="4" required placeholder="Décrivez votre besoin..." onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={handleWhatsAppSubmit}
                    className="flex-1 bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 hover:shadow-lg transition duration-300 transform active:scale-95 flex items-center justify-center gap-2">
                    <MessageCircle size={19} /> Envoyer par WhatsApp
                  </button>
                  <button type="button" onClick={handleEmailSubmit}
                    className="flex-1 bg-indigo-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-800 hover:shadow-lg transition duration-300 transform active:scale-95 flex items-center justify-center gap-2">
                    <Mail size={19} /> Envoyer par Email
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  *L'envoi par email ouvrira votre logiciel de messagerie par défaut.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2">
          <div className="flex items-center text-white mb-4">
            <BarChart2 size={24} className="mr-2" style={{ color: '#3D4DB7' }} />
            <span className="font-bold text-xl tracking-tight">CEBI <span style={{ color: '#3D4DB7' }}>Stats</span></span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Cabinet d'Études Biostatistique et Informatique.
            La référence ivoirienne pour l'analyse de données de santé, la formation et les solutions informatiques.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=2250141974132&text=Bonjour%20CEBI%20Stats%20!"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-lg transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp : +225 01 41 97 41 32
          </a>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: 'Accueil',      href: '#home' },
              { label: 'Nos Services', href: '#services' },
              { label: 'Outils IA',   href: '#ai-tools' },
              { label: 'À Propos',    href: '#about' },
              { label: 'Contact',     href: '#contact' },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={(e) => smoothScrollTo(e, l.href)} className="hover:text-sky-400 transition cursor-pointer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Réseaux Sociaux</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://facebook.com/CEBISTATS" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-sky-400 transition">
                <Facebook size={15} /> facebook.com/CEBISTATS
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=2250141974132" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-sky-400 transition">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:cebi.stat@yahoo.com" className="flex items-center gap-2 hover:text-sky-400 transition">
                <Mail size={15} /> cebi.stat@yahoo.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} CEBI Stats Abidjan. Tous droits réservés.</p>
        <div className="mt-4 md:mt-0 flex items-center gap-1">
          <span>Design par</span>
          <span className="text-sky-500 font-bold">Christophe KOUAKOU</span>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================
// BLOG — DONNÉES
// ============================================================
const blogArticles = [
  {
    id: 1,
    title: 'Comment choisir le bon test statistique pour votre étude ?',
    category: 'Biostatistique',
    date: '12 Mars 2025',
    readTime: '6 min',
    author: 'Christophe KOUAKOU',
    excerpt: "L'utilisation d'un test inadapté est l'erreur la plus fréquente dans les thèses. Voici un guide pratique pour faire le bon choix selon vos variables.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    content: [
      { type: 'intro', text: "Choisir le mauvais test statistique peut invalider des mois de travail de recherche. Cette erreur est malheureusement très courante chez les étudiants en médecine et en santé publique. Ce guide vous donne les clés pour faire le bon choix." },
      { type: 'heading', text: "1. La règle d'or : identifier le type de vos variables" },
      { type: 'paragraph', text: "Avant tout, déterminez la nature de vos variables. Sont-elles quantitatives continues (âge, poids, taux), quantitatives discrètes (nombre d'enfants), ou qualitatives (sexe, diagnostic, groupe) ? C'est la première question à se poser." },
      { type: 'heading', text: "2. Comparer des moyennes : test t ou ANOVA ?" },
      { type: 'paragraph', text: "Pour comparer des moyennes entre 2 groupes indépendants, utilisez le test t de Student (si distribution normale) ou le test de Mann-Whitney (si non-normal). Pour 3 groupes ou plus, préférez l'ANOVA (Kruskal-Wallis si non-normal)." },
      { type: 'heading', text: "3. Comparer des proportions : le test du Chi-2" },
      { type: 'paragraph', text: "Lorsque vos deux variables sont qualitatives (ex : association entre sexe et maladie), le test du Chi-2 est votre allié. Vérifiez que les effectifs théoriques sont ≥ 5 par case. Sinon, utilisez le test exact de Fisher." },
      { type: 'tip', text: "💡 Notre outil IA 'Conseiller Stats' peut vous aider à identifier le test adapté à votre situation en quelques secondes. Essayez-le dans la section Outils IA du site." },
    ],
  },
  {
    id: 2,
    title: "Analyse de survie : Kaplan-Meier et modèle de Cox expliqués",
    category: 'Méthodes Avancées',
    date: '28 Février 2025',
    readTime: '8 min',
    author: 'Christophe KOUAKOU',
    excerpt: "Incontournable en oncologie et en épidémiologie clinique, l'analyse de survie permet d'étudier le temps jusqu'à un événement. Découvrez les deux méthodes clés.",
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    content: [
      { type: 'intro', text: "L'analyse de survie étudie le délai jusqu'à la survenue d'un événement (décès, rechute, guérison). C'est une méthode statistique spécialisée que vous rencontrerez souvent en recherche clinique, notamment en oncologie." },
      { type: 'heading', text: "Qu'est-ce que la courbe de Kaplan-Meier ?" },
      { type: 'paragraph', text: "La courbe de Kaplan-Meier représente la probabilité de survie au fil du temps pour un groupe de patients. Elle prend en compte les données censurées (patients perdus de vue ou en vie à la fin du suivi), ce que les méthodes classiques ne peuvent pas faire." },
      { type: 'heading', text: "Le modèle de Cox : aller plus loin" },
      { type: 'paragraph', text: "La régression de Cox (modèle à risques proportionnels) permet d'étudier l'effet simultané de plusieurs facteurs sur la survie. Elle produit des Hazard Ratios (HR) mesurant le risque relatif de l'événement entre groupes, ajusté sur les facteurs de confusion." },
      { type: 'heading', text: "Quand utiliser l'un ou l'autre ?" },
      { type: 'paragraph', text: "Kaplan-Meier est idéal pour décrire et comparer visuellement la survie entre 2-3 groupes (avec le test du log-rank). Le modèle de Cox est nécessaire dès que vous voulez ajuster sur des covariables ou obtenir des mesures d'association (HR)." },
      { type: 'tip', text: "📊 CEBI Stats a réalisé des analyses de survie pour des études en oncologie (cancer du sein, cancer du col de l'utérus) au CHU de Cocody. Contactez-nous pour votre étude." },
    ],
  },
  {
    id: 3,
    title: "ODK Collect : révolutionner votre collecte de données sur terrain",
    category: 'Outils & Méthodes',
    date: '10 Janvier 2025',
    readTime: '5 min',
    author: 'Christophe KOUAKOU',
    excerpt: "Fini les questionnaires papier et les erreurs de saisie ! ODK Collect transforme votre smartphone en outil de collecte de données professionnel pour les études épidémiologiques.",
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    content: [
      { type: 'intro', text: "La collecte de données sur terrain est souvent une étape sous-estimée des études épidémiologiques. Pourtant, une mauvaise collecte peut compromettre toute l'analyse statistique qui suivra." },
      { type: 'heading', text: "Pourquoi abandonner le papier ?" },
      { type: 'paragraph', text: "Les questionnaires papier génèrent des erreurs de saisie, des données manquantes et des incohérences difficiles à corriger. ODK Collect permet de définir des règles de validation en temps réel : plages de valeurs acceptables, champs obligatoires, logique de saut conditionnelle." },
      { type: 'heading', text: "Comment ça fonctionne ?" },
      { type: 'paragraph', text: "Vous concevez votre formulaire dans Excel (format XLSForm), vous le téléversez sur un serveur KoboToolbox, et vos enquêteurs le téléchargent sur leurs smartphones. Les données sont collectées hors-ligne et synchronisées dès qu'une connexion est disponible." },
      { type: 'heading', text: "ODK vs KoboToolbox : lequel choisir ?" },
      { type: 'paragraph', text: "KoboToolbox est la solution recommandée pour les organisations humanitaires et de santé publique car elle offre une interface web conviviale, un hébergement gratuit et une synchronisation simplifiée. ODK est plus technique mais plus flexible pour les projets complexes." },
      { type: 'tip', text: "🛠️ CEBI Stats vous accompagne dans la création de vos formulaires ODK/KoboToolbox et la formation de vos équipes terrain. Demandez un devis gratuit." },
    ],
  },
];

// ============================================================
// BLOG PAGE
// ============================================================
const BlogPage = ({ onBack, onReadArticle }) => (
  <div className="min-h-screen bg-slate-50 pt-20">
    {/* Header */}
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500 rounded-full blur-[100px] opacity-10 animate-pulse"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button onClick={onBack} className="flex items-center text-indigo-300 hover:text-white mb-8 transition-colors text-sm font-medium group">
          <ChevronRight size={16} className="mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" /> Retour au site
        </button>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold mb-5">
          <BookOpen size={13} className="mr-2" /> Ressources & Guides
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Blog CEBI Stats</h1>
        <p className="text-indigo-200 max-w-xl text-lg">
          Guides pratiques en biostatistique, analyses avancées et outils de collecte de données pour chercheurs et étudiants.
        </p>
      </div>
    </div>

    {/* Articles grid */}
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-slate-100"
            onClick={() => onReadArticle(article)}
          >
            <div className="h-44 overflow-hidden bg-indigo-50">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">{article.category}</span>
                <span className="text-[11px] text-slate-400">{article.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-900 transition-colors">{article.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{article.excerpt}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
                <span className="text-[11px] text-slate-400">{article.date}</span>
                <span className="text-sm font-bold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1">
                  Lire <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA bottom */}
      <div className="mt-16 bg-indigo-900 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <Sparkles size={32} className="text-sky-400 mx-auto mb-4" />
        <h3 className="text-2xl font-extrabold mb-2">Une question sur votre analyse ?</h3>
        <p className="text-indigo-200 mb-6 max-w-md mx-auto">Utilisez nos outils IA gratuits ou contactez directement l'équipe CEBI Stats.</p>
        <button
          onClick={onBack}
          className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
        >
          <BrainCircuit size={18} /> Essayer les Outils IA
        </button>
      </div>
    </div>
  </div>
);

// ============================================================
// ARTICLE PAGE
// ============================================================
const ArticlePage = ({ article, onBack, onBackToBlog }) => (
  <div className="min-h-screen bg-white pt-16">
    {/* Hero image */}
    <div className="h-64 md:h-80 overflow-hidden relative">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.background='#1e1b4b'; }} />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-indigo-900/80"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <div className="max-w-3xl mx-auto w-full">
          <button onClick={onBackToBlog} className="flex items-center text-white/80 hover:text-white mb-4 text-sm font-medium group">
            <ChevronRight size={15} className="mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" /> Blog
          </button>
          <span className="text-[11px] font-bold text-sky-300 bg-white/15 px-3 py-1 rounded-full border border-white/20">{article.category}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3 leading-tight">{article.title}</h1>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-10 pb-8 border-b border-slate-100">
        <span className="flex items-center gap-1.5"><Award size={14} className="text-indigo-400" /> {article.author}</span>
        <span>{article.date}</span>
        <span className="flex items-center gap-1.5"><BookOpen size={13} /> {article.readTime} de lecture</span>
      </div>

      {/* Body */}
      <div className="space-y-5">
        {article.content.map((block, i) => {
          if (block.type === 'intro') return (
            <p key={i} className="text-lg text-slate-700 font-medium leading-relaxed border-l-4 border-indigo-300 pl-5">{block.text}</p>
          );
          if (block.type === 'heading') return (
            <h2 key={i} className="text-xl font-bold text-indigo-900 mt-8 mb-2">{block.text}</h2>
          );
          if (block.type === 'paragraph') return (
            <p key={i} className="text-slate-600 leading-relaxed">{block.text}</p>
          );
          if (block.type === 'tip') return (
            <div key={i} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-indigo-800 text-sm font-medium leading-relaxed">{block.text}</div>
          );
          return null;
        })}
      </div>

      {/* CTA */}
      <div className="mt-14 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-8 text-center">
        <h3 className="text-xl font-extrabold mb-2">Besoin d'aide pour votre analyse ?</h3>
        <p className="text-indigo-200 mb-6 text-sm max-w-sm mx-auto">CEBI Stats vous accompagne de la collecte des données à la rédaction des résultats.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onBack} className="bg-white text-indigo-900 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition-colors text-sm">
            Demander un devis
          </button>
          <button onClick={onBackToBlog} className="bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-white/20 transition-colors text-sm">
            Lire d'autres articles
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// APP PRINCIPAL
// ============================================================
const App = () => {
  const [page, setPage]       = useState('home');   // 'home' | 'blog' | 'article'
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const titles = {
      home:    "CEBI Stats | Cabinet Biostatistique & Informatique",
      blog:    "Blog | CEBI Stats — Biostatistique & Informatique",
      article: article ? `${article.title} | Blog CEBI Stats` : "CEBI Stats",
    };
    document.title = titles[page] || titles.home;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // favicon
    const existingFavicons = document.querySelectorAll("link[rel~='icon']");
    existingFavicons.forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/logo-cebistats.jpg?v=4';
    document.head.appendChild(link);
  }, [page, article]);

  const goHome    = () => { setPage('home');    setArticle(null); };
  const goBlog    = () => { setPage('blog');    setArticle(null); };
  const goArticle = (a) => { setPage('article'); setArticle(a); };

  if (page === 'blog') return (
    <div className="font-sans text-slate-900 antialiased bg-white selection:bg-sky-100 selection:text-sky-900">
      <GlobalStyles />
      <Navigation onBlogClick={goBlog} />
      <BlogPage onBack={goHome} onReadArticle={goArticle} />
      <GeminiAssistant />
    </div>
  );

  if (page === 'article') return (
    <div className="font-sans text-slate-900 antialiased bg-white selection:bg-sky-100 selection:text-sky-900">
      <GlobalStyles />
      <Navigation onBlogClick={goBlog} />
      <ArticlePage article={article} onBack={goHome} onBackToBlog={goBlog} />
      <GeminiAssistant />
    </div>
  );

  return (
    <div className="font-sans text-slate-900 antialiased bg-white selection:bg-sky-100 selection:text-sky-900">
      <GlobalStyles />
      <Navigation onBlogClick={goBlog} />
      <main>
        <Hero />
        <StatsSection />
        <Services />
        <ProcessSection />
        <Portfolio />
        <CTABanner />
        <AITools />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <GeminiAssistant />
    </div>
  );
};

export default App;
