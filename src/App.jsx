import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  BarChart2, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Database, 
  PieChart,
  CheckCircle,
  Award,
  Layers,
  ExternalLink,
  XCircle,
  CheckSquare,
  Monitor,
  Plus,
  Minus,
  HelpCircle,
  Facebook,
  MessageSquare,
  Send,
  Sparkles,
  Loader2,
  MessageCircle,
  BrainCircuit,
  FilePenLine,
  Lightbulb
} from 'lucide-react';

// --- FONCTION DE NAVIGATION UNIVERSELLE ---
const smoothScrollTo = (e, targetId) => {
  e.preventDefault();
  const element = document.getElementById(targetId.replace('#', ''));
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// --- STYLES GLOBAUX & ANIMATIONS ---
const GlobalStyles = () => (
  <style>{`
    html {
      scroll-behavior: smooth;
      scroll-padding-top: 80px;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    
    /* Animation Flottante pour le Hero */
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
    .animate-float {
      animation: float 8s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float-delayed 10s ease-in-out infinite;
    }
    
    /* Gradient animé pour les outils IA */
    .bg-gradient-animate {
      background-size: 200% 200%;
      animation: gradient-shift 5s ease infinite;
    }
    @keyframes gradient-shift {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
  `}</style>
);

// --- COMPOSANT DE RÉVÉLATION AU SCROLL ---
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.1 } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- NOUVEAU COMPOSANT : OUTILS IA GEMINI ---
const AITools = () => {
  const [activeTab, setActiveTab] = useState('advisor'); // 'advisor' ou 'writer'
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = ""; // La clé est injectée par l'environnement

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResult('');

    let systemPrompt = "";
    if (activeTab === 'advisor') {
      systemPrompt = "Tu es un expert biostatisticien senior. L'utilisateur va décrire ses données, ses variables ou son objectif de recherche. Tu dois recommander le test statistique le plus approprié (ex: Test t de Student, Chi-2, ANOVA, Régression logistique, Test de Mann-Whitney, etc.) et expliquer brièvement pourquoi en une phrase. Si l'information est incomplète, demande des précisions sur le type de variables. Sois précis et pédagogique.";
    } else {
      systemPrompt = "Tu es un éditeur scientifique académique francophone. L'utilisateur va te fournir un paragraphe brouillon (résumé, introduction, ou discussion). Tu dois le réécrire pour qu'il soit professionnel, clair, concis et adapté à une publication scientifique (thèse ou article). Améliore le vocabulaire et la structure sans changer le sens profond. Donne uniquement le texte réécrit.";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur lors de l'analyse. Veuillez réessayer.";
      setResult(text);
    } catch (error) {
      setResult("Erreur de connexion à l'IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-tools" className="py-24 bg-slate-900 relative overflow-hidden scroll-mt-28">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-bold mb-6">
              <Sparkles size={14} className="mr-2" /> Powered by Gemini AI
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Outils IA & Recherche <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Intelligente</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Testez la puissance de l'IA pour vos projets de recherche. Ces outils gratuits vous aident à choisir vos tests ou à améliorer votre rédaction.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar / Tabs */}
            <div className="md:w-1/3 bg-slate-900/50 border-r border-slate-700 p-6 flex flex-col gap-4">
              <button
                onClick={() => { setActiveTab('advisor'); setResult(''); setInput(''); }}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 ${activeTab === 'advisor' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <BrainCircuit size={24} className="mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold">Conseiller Stats</div>
                  <div className="text-xs opacity-70">Choix du test</div>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('writer'); setResult(''); setInput(''); }}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 ${activeTab === 'writer' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <FilePenLine size={24} className="mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold">Rédacteur Pro</div>
                  <div className="text-xs opacity-70">Reformulation académique</div>
                </div>
              </button>
              
              <div className="mt-auto p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-400">
                <Lightbulb size={16} className="text-yellow-400 mb-2" />
                Ces outils utilisent l'IA Gemini. Vérifiez toujours les résultats avec un statisticien expert de CEBI Stats.
              </div>
            </div>

            {/* Main Content Area */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  {activeTab === 'advisor' ? '🔎 Quel test choisir ?' : '📝 Améliorer mon texte'}
                </h3>
                <p className="text-slate-400 text-sm">
                  {activeTab === 'advisor' 
                    ? "Décrivez vos variables (ex: 'Je veux comparer l'âge moyen entre 3 groupes de patients')." 
                    : "Collez votre paragraphe ici pour le rendre plus professionnel et scientifique."}
                </p>
              </div>

              <form onSubmit={handleAISubmit} className="flex-1 flex flex-col">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={activeTab === 'advisor' ? "Ex: J'ai une variable qualitative (Maladie Oui/Non) et je veux voir le lien avec le Sexe..." : "Ex: On a vu que le medicament marche bien sur les patients..."}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none h-32 transition-all"
                />
                
                <div className="mt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={loading || !input.trim()}
                    className={`px-6 py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 flex items-center ${activeTab === 'advisor' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-cyan-600 hover:bg-cyan-500'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                    {loading ? "Analyse en cours..." : (activeTab === 'advisor' ? "Trouver le test" : "Améliorer le texte")}
                  </button>
                </div>
              </form>

              {/* Result Area */}
              <div className={`mt-6 p-4 rounded-xl border border-slate-700 bg-slate-900/80 min-h-[120px] transition-all duration-500 ${result ? 'opacity-100' : 'opacity-50'}`}>
                {result ? (
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-bold">Réponse de l'IA</div>
                    <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">{result}</div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-600 italic">
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

// --- COMPOSANT ASSISTANT GEMINI ---
const GeminiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bonjour ! Je suis l'assistant IA de CEBI Stats. Je peux vous renseigner sur nos tarifs, nos formations ou vous aider à prendre rendez-vous." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const apiKey = ""; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      const systemPrompt = `Tu es l'assistant virtuel de CEBI Stats, un cabinet de biostatistique et informatique en Côte d'Ivoire.
      Tes réponses doivent être courtes, chaleureuses et orientées vers la prise de contact.
      Si on te pose une question technique complexe, invite l'utilisateur à utiliser la section 'Outils IA' du site ou à contacter M. Kouadio.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, problème de réseau.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Erreur de connexion." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
        aria-label="Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-bounce" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up max-h-[450px]">
          <div className="bg-blue-900 p-4 text-white flex justify-between items-center">
            <span className="font-bold flex items-center"><Sparkles size={16} className="mr-2" /> Chat CEBI</span>
            <button onClick={() => setIsOpen(false)}><X size={18}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-400 ml-2">L'assistant écrit...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-2 border-t flex">
            <input 
              className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none"
              placeholder="Question..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button type="submit" className="ml-2 text-blue-900"><Send size={20}/></button>
          </form>
        </div>
      )}
    </>
  );
};

// --- Composants UI Standard ---

const Button = ({ children, variant = 'primary', className = '', href, onClick, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  const variants = {
    primary: "border-transparent text-white bg-blue-900 hover:bg-blue-800 focus:ring-blue-900 shadow-lg hover:shadow-xl",
    secondary: "border-transparent text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 shadow-md",
    outline: "border-blue-100 text-blue-900 bg-white hover:bg-blue-50 focus:ring-blue-500"
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (href && href.startsWith('#')) {
      smoothScrollTo(e, href);
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </a>
  );
};

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const handleDevisClick = (e) => {
    onClose(); 
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-80 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full relative animate-fade-in-up">
          
          <div className={`bg-gradient-to-r ${service.color} p-6 flex justify-between items-start`}>
            <div className="flex items-center text-white">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold leading-6" id="modal-title">
                {service.title}
              </h3>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <XCircle size={28} />
            </button>
          </div>
          
          <div className="px-6 py-6">
            <p className="text-gray-500 italic mb-6 text-sm border-l-4 border-blue-100 pl-4">
              "{service.intro}"
            </p>
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center">
                <Activity size={16} className="mr-2 text-cyan-500" /> 
                Notre Offre
              </h4>
              <ul className="space-y-3">
                {service.details.map((point, idx) => (
                  <li key={idx} className="flex items-start text-gray-600 text-sm leading-relaxed">
                    <CheckSquare size={16} className="mr-3 mt-1 text-cyan-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3">
                Outils & Logiciels
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDevisClick}
            >
              Demander un devis
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sections du Site ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Expertises', href: '#services' },
    { name: 'Réalisations', href: '#portfolio' },
    { name: 'Outils IA', href: '#ai-tools' }, // Ajout du lien vers la section IA
    { name: 'FAQ', href: '#faq' },
    { name: 'À Propos', href: '#about' },
  ];

  const handleNavClick = (e, href) => {
    setIsOpen(false);
    smoothScrollTo(e, href);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            {/* LOGO */}
            <img 
              src="/logo-cebistats.jpg" 
              alt="Logo CEBI Stats" 
              className="h-12 w-auto mr-3 rounded-lg shadow-sm bg-white hover:scale-105 transition-transform" 
              onError={(e) => {
                e.target.style.display='none';
                e.target.nextSibling.style.display='flex'; 
              }} 
            />
            <div className="hidden bg-blue-900 p-2 rounded-lg mr-2 items-center justify-center">
               <BarChart2 size={24} className="text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tighter leading-none text-slate-900">
                CEBI <span className="text-cyan-500">Stats</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Côte d'Ivoire</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${scrolled ? 'text-gray-600 hover:text-cyan-600' : 'text-gray-700 hover:text-cyan-600'}`}
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" href="#contact" className="!px-5 !py-2 !text-sm !rounded-lg hover:scale-105">
              Devis Gratuit
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-blue-900 focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full top-full left-0 animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="block w-full text-center mt-4 px-5 py-3 rounded-xl bg-blue-900 text-white font-bold shadow-lg cursor-pointer"
            >
              Démarrer un projet
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scroll-mt-28">
      {/* Formes d'arrière-plan animées */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-100 opacity-40 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100 opacity-40 blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left mb-12 lg:mb-0">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-bold mb-6 shadow-sm">
                <Award size={14} className="mr-2 text-cyan-500" />
                Cabinet d'Études Biostatistique & Informatique
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Transformez vos données de santé en <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                  décisions éclairées
                </span>
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Nous combinons expertise statistique et solutions informatiques. Du nettoyage de vos données à la formation sur vos logiciels professionnels.
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
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <Reveal delay={800} className="relative rounded-2xl bg-white p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl opacity-10"></div>
               <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 h-96 flex flex-col justify-center items-center text-center">
                  <div className="bg-white p-4 rounded-full shadow-lg mb-6">
                    <Activity size={48} className="text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Double Compétence</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 max-w-[200px]">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-500 w-full max-w-[220px]">
                    <div className="flex justify-between"><span>Biostatistique</span> <span>Expert</span></div>
                    <div className="flex justify-between"><span>Informatique</span> <span>Expert</span></div>
                    <div className="flex justify-between"><span>Infographie</span> <span>Expert</span></div>
                  </div>
               </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden flex flex-col h-full cursor-pointer">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
    <div className={`w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors`}>
      <Icon size={28} className="text-slate-700 group-hover:text-blue-600 transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm flex-1">{description}</p>
    <button 
      onClick={onClick}
      className="mt-6 flex items-center text-cyan-600 font-semibold text-sm hover:text-cyan-800 transition-colors group-hover:translate-x-1"
    >
      En savoir plus <ChevronRight size={16} className="ml-1" />
    </button>
  </div>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Database,
      title: "Gestion de Données & Formulaires",
      description: "Création de formulaires de collecte automatisés (ODK) et nettoyage de vos bases de données.",
      color: "from-blue-400 to-blue-600",
      intro: "Une bonne analyse commence par une collecte de données fiable et structurée.",
      details: [
        "Création de formulaires de saisie automatisés (ODK, KoboCollect) pour smartphones et tablettes.",
        "Facilitation de la collecte terrain et réduction des erreurs de saisie.",
        "Apurement et structuration des bases de données pour les rendre exploitables.",
        "Gestion et traitement de données massives."
      ],
      tools: ["ODK Collect", "KoboToolbox", "Excel Avancé", "Access", "SQL"]
    },
    {
      icon: Activity,
      title: "Biostatistique Avancée",
      description: "Modélisation complexe : Analyse de survie (Kaplan-Meier, Cox), Régression et Tests.",
      color: "from-cyan-400 to-cyan-600",
      intro: "Nous transformons vos chiffres en preuves scientifiques robustes pour la prise de décision.",
      details: [
        "Analyses bivariées et multivariées pour éliminer les facteurs de confusion.",
        "Calcul des mesures d'association (OR, RR) et modélisation prédictive.",
        "Analyse de survie (Courbes de Kaplan-Meier, Modèles de Cox).",
        "Interprétation rigoureuse des résultats pour thèses et rapports."
      ],
      tools: ["R Studio", "SPSS", "Stata", "Analyse de Survie", "Python"]
    },
    {
      icon: Monitor,
      title: "Informatique & Formation",
      description: "Vente/Installation de logiciels, maintenance et formation personnalisée (Office, Bureautique).",
      color: "from-slate-500 to-slate-700",
      intro: "Nous vous équipons et vous formons pour optimiser votre productivité au quotidien.",
      details: [
        "Vente et installation de logiciels professionnels (Suite Office, Adobe Creative Cloud).",
        "Installation de logiciels ludiques et jeux (PC & PlayStation) pour particuliers.",
        "Formation personnalisée à la suite Office (Word, Excel, PowerPoint) : du niveau débutant à expert.",
        "Conseil en équipement informatique et maintenance logicielle."
      ],
      tools: ["Microsoft Office 365", "Suite Adobe", "Windows", "Maintenance PC"]
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
        "Design de présentations PowerPoint institutionnelles."
      ],
      tools: ["PowerPoint Pro", "InDesign", "Illustrator", "Word Avancé"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-3">Nos Domaines d'Intervention</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Expertise Globale</h3>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              La complémentarité entre l'analyse de données et la maîtrise des outils informatiques.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 150}>
              <ServiceCard 
                {...service} 
                onClick={() => setSelectedService(service)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
};

const ProjectCard = ({ title, category, description, tools }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full hover:scale-[1.02] transform transition-transform">
    <div className="h-3 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500"></div>
    
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
          {category}
        </span>
        <Layers size={16} className="text-gray-300" />
      </div>
      
      <h3 className="text-base font-bold text-slate-900 mb-3 leading-tight uppercase">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-6 flex-1">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tools.map((tool, index) => (
          <span key={index} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
            {tool}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Portfolio = () => {
  const projects = [
    {
      category: "Oncologie",
      title: "Survie Cancer du Sein",
      description: "Analyse de survie des patients souffrant du cancer du sein.",
      tools: ["Kaplan-Meier", "Modèle de Cox", "R Studio"]
    },
    {
      category: "Pédiatrie & Urgences",
      title: "Urgences Chirurgicales Pédiatriques",
      description: "Délais de prise en charge des urgences chirurgicales pédiatriques au CHU de Cocody (2023).",
      tools: ["Analyses Descriptives", "Tests Comparatifs"]
    },
    {
      category: "Santé Publique",
      title: "Handicap & Abandon",
      description: "Épidémiologie des enfants et adolescents handicapés abandonnés admis dans les pouponnières de Côte d’Ivoire (2023).",
      tools: ["Enquête Transversale", "Cartographie"]
    },
    {
      category: "Neurologie",
      title: "Syndromes Épileptiques",
      description: "Facteurs pronostiques des syndromes épileptiques vus en consultation d’épileptologie au CHU de Cocody.",
      tools: ["Régression Logistique", "Pronostic"]
    },
    {
      category: "Santé au Travail",
      title: "Nuisances Sonores",
      description: "Étude des lésions auditives de l’exposition aux nuisances sonores chez les téléopérateurs (Téléphonie Mobile, 2010-2020).",
      tools: ["Étude Longitudinale", "Audiométrie"]
    },
    {
      category: "Cardiologie",
      title: "Urgences Cardiologiques",
      description: "Analyse de la fréquentation du service des urgences de l’Institut de Cardiologie d’Abidjan.",
      tools: ["Séries Temporelles", "Analyse de Flux"]
    },
    {
      category: "Endocrinologie",
      title: "Prévention Diabète",
      description: "Connaissance, attitude et pratique (CAP) des patients diabétiques sur les stratégies de prévention des plaies de pied (CHU Cocody, 2024).",
      tools: ["Étude CAP", "SPSS"]
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 border-t border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Portfolio</h2>
              <h3 className="text-3xl font-extrabold text-slate-900">Travaux Réalisés</h3>
              <p className="mt-4 text-gray-500">
                Un aperçu de notre expertise à travers des études concrètes menées dans les hôpitaux et structures de santé de Côte d'Ivoire.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a href="#contact" className="inline-flex items-center font-bold text-blue-900 hover:text-cyan-600 transition-colors">
                Discuter d'un projet similaire <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 100}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal className="relative mb-12 lg:mb-0">
            <div className="relative rounded-2xl shadow-2xl bg-blue-900 text-white overflow-hidden p-10 z-10 hover:scale-[1.01] transition-transform duration-500">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              
              <BarChart2 size={64} className="mb-6 text-cyan-400" />
              <h3 className="text-3xl font-bold mb-2">Christophe KOUAKOU</h3>
              <p className="text-blue-200 font-medium mb-6">Biostatisticien</p>
              
              <div className="space-y-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-3 text-cyan-400" />
                  Direction de l'Information Sanitaire (MSHPCMU)
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-3 text-cyan-400" />
                  Expert Logiciels & Bureautique
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-3 text-cyan-400" />
                  Double compétence Technique & Visuelle
                </div>
              </div>
            </div>
            <div className="absolute top-4 -right-4 w-full h-full border-2 border-cyan-200 rounded-2xl z-0"></div>
          </Reveal>
          
          <Reveal delay={200}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Plus qu'un statisticien, <br/>
              <span className="text-blue-700">un partenaire de décision.</span>
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-6 text-justify">
              <p>
                <strong>Pourquoi CEBI Stats ?</strong> Vous avez les données, vous avez l'expertise médicale, mais l'analyse statistique vous freine ? Vous n'êtes pas seul.
                Nous avons observé que trop de thèses et d'articles scientifiques sont retardés parce que les auteurs peinent à exploiter leurs propres données. Trop souvent, pour "aller vite", le recours à des personnes non qualifiées en biostatistique conduit à des résultats erronés ou rejetés par les jurys. 
                Nous avons créé ce cabinet pour briser ce cercle vicieux. 
                Ne confiez plus vos années de travail au hasard. Avec CEBI Stats, nous mettons notre expertise de statisticien à votre service pour transformer vos données en résultats indiscutables.
              </p>
              <p>
                Fort de notre expérience au sein du <strong>Ministère de la Santé</strong>, nous maîtrisons toute la chaîne de production des données : 
                de la conception du formulaire de collecte sur tablette (ODK) jusqu'à la mise en page finale du rapport, en passant par l'analyse statistique rigoureuse.
              </p>
              <p>
                Nous proposons également des <strong>formations personnalisées</strong> et l'installation de vos outils de travail, car nous croyons que l'autonomie de nos clients est la clé de leur succès.
              </p>
              
              <div className="pt-4">
                <a href="#contact" className="text-cyan-600 font-bold hover:text-cyan-700 flex items-center">
                  Discutons de votre projet <ChevronRight size={20} className="ml-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- NOUVELLE SECTION : FAQ ---
const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-6 text-left focus:outline-none flex justify-between items-start group"
        onClick={toggle}
      >
        <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? 'text-blue-900' : 'text-slate-800 group-hover:text-blue-700'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${isOpen ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-300 text-gray-400 group-hover:border-blue-900 group-hover:text-blue-900'}`}>
           {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-gray-600 leading-relaxed pr-8">
          {Array.isArray(answer) ? (
            <ul className="space-y-2">
              {answer.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0"></span>
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
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Comment procéder pour une demande de prestation ?",
      answer: "Vous pouvez nous contacter via le formulaire dédié, par email, ou par téléphone. Nous vous recommandons de décrire brièvement votre projet (type d’étude, objectifs principaux, état d’avancement des données). Cela nous permet d’organiser un premier entretien d’évaluation rapide et ciblé, sans engagement, afin de comprendre précisément votre besoin en biostatistique."
    },
    {
      question: "Quelles sont les informations nécessaires pour l’analyse statistique ?",
      answer: [
        "Le protocole de recherche (ou une description détaillée de votre méthodologie).",
        "La base de données (pour évaluation de la qualité, des données manquantes et de la structure).",
        "Le Plan d’Analyse Statistique (PAS) si celui-ci existe déjà.",
        "Ces éléments sont essentiels pour déterminer la complexité et les méthodes requises (Score de Propension, Régression de Cox, etc.)."
      ]
    },
    {
      question: "Comment se déroule la prestation ?",
      answer: [
        "Conception : Validation du protocole et du PAS, ainsi que le calcul de la puissance statistique.",
        "Analyse : Réalisation des analyses avancées (multivariées, Analyse de Survie), incluant la gestion des données complexes.",
        "Rapport et Rédaction : Livraison d’un rapport d’analyse détaillé et de la section résultats, prêts pour votre manuscrit scientifique."
      ]
    },
    {
      question: "Quels sont les tarifs pour une prestation en statistique ?",
      answer: "Nos tarifs sont établis sur devis personnalisé. Nous n’avons pas de forfait standard car le coût dépend de l'étendue de l’accompagnement (consultation ponctuelle ou aide complète) et de la complexité méthodologique de l’étude. Le devis détaillé vous est fourni rapidement après l’évaluation de votre projet."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-gray-200 scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">FAQ</h2>
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
           <a href="#contact" className="inline-flex items-center text-blue-900 font-bold hover:text-cyan-600 transition-colors">
              <HelpCircle size={18} className="mr-2" /> Posez-nous votre question directement
           </a>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    type: 'Analyse Statistique (Thèse/Mémoire)',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    // 1. Validation : On vérifie que les champs ne sont pas vides
    if (!formData.nom || !formData.email || !formData.message) {
      alert("⚠️ Attention : Merci de remplir au moins votre Nom, votre Email et votre Message.");
      return;
    }

    const subject = encodeURIComponent(`Demande de devis - ${formData.type} - ${formData.nom} ${formData.prenom}`);
    const body = encodeURIComponent(
      `Nom: ${formData.nom}\n` +
      `Prénom: ${formData.prenom}\n` +
      `Email: ${formData.email}\n` +
      `Type de projet: ${formData.type}\n` +
      `--------------------------------\n` +
      `Message:\n${formData.message}`
    );
    
    // 2. Création du lien Mailto
    const mailtoLink = `mailto:cebi.stat@yahoo.com?subject=${subject}&body=${body}`;

    // 3. Méthode Robuste : Création d'un lien temporaire et clic simulé
    // Cela contourne les blocages fréquents de window.location
    try {
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.target = '_self'; // Important pour mailto
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Message de succès pour rassurer l'utilisateur
        setTimeout(() => {
             alert("✅ Action envoyée !\n\nVotre logiciel de messagerie devrait s'ouvrir.\nS'il ne s'ouvre pas, c'est qu'aucun compte mail n'est configuré sur cet appareil.");
        }, 500);
    } catch (err) {
        alert("Une erreur est survenue. Vous pouvez nous écrire directement à : cebi.stat@yahoo.com");
        console.error("Erreur mailto:", err);
    }
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.message) {
      alert("⚠️ Attention : Merci de remplir au moins votre Nom et votre Message.");
      return;
    }

    const phoneNumber = "2250141974132"; 
    
    const message = encodeURIComponent(
      `*Demande de Devis CEBI Stats*\n` +
      `👤 Nom: ${formData.nom} ${formData.prenom}\n` +
      `📧 Email: ${formData.email}\n` +
      `📂 Projet: ${formData.type}\n` +
      `--------------------------------\n` +
      `📝 Message:\n${formData.message}`
    );

    // Utilisation de l'API officielle au lieu de "wa.me" pour réduire les erreurs Windows
    const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h2 className="text-3xl font-extrabold mb-6">Contactez CEBI Stats</h2>
              <p className="text-slate-400 mb-10 text-lg">
                Une thèse à finaliser ? Un logiciel à installer ? Une formation à organiser ? 
                Nous sommes basés à Abidjan et disponible pour échanger.
              </p>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-blue-800 p-4 rounded-xl group-hover:bg-cyan-600 transition-colors">
                    <Mail className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium">Email</h3>
                    <a href="mailto:cebi.stat@yahoo.com" className="mt-1 text-slate-400 block hover:text-white transition-colors">
                      cebi.stat@yahoo.com
                    </a>
                    <span className="text-xs text-slate-600">Réponse sous 24h</span>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-blue-800 p-4 rounded-xl group-hover:bg-cyan-600 transition-colors">
                    <Phone className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium">Téléphone & WhatsApp</h3>
                    <p className="mt-1 text-slate-400">(+225) 01 41 97 41 32</p>
                    <p className="text-xs text-slate-500">Disponible 8h - 18h</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-blue-800 p-4 rounded-xl group-hover:bg-cyan-600 transition-colors">
                    <Facebook className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium">Facebook</h3>
                    <a href="https://facebook.com/CEBISTATS" target="_blank" rel="noopener noreferrer" className="mt-1 text-slate-400 block hover:text-white transition-colors">
                      facebook.com/CEBISTATS
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-blue-800 p-4 rounded-xl group-hover:bg-cyan-600 transition-colors">
                    <MapPin className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium">Localisation</h3>
                    <p className="mt-1 text-slate-400">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Envoyez-moi un message</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                    <input 
                      type="text" 
                      name="nom" 
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" 
                      placeholder="Votre nom"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                    <input 
                      type="text" 
                      name="prenom" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" 
                      placeholder="Votre prénom"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" 
                    placeholder="votre@email.com"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type de projet</label>
                  <select 
                    name="type"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    onChange={handleChange}
                  >
                    <option>Analyse Statistique (Thèse/Mémoire)</option>
                    <option>Formation & Logiciels</option>
                    <option>Nettoyage de Données</option>
                    <option>Infographie & Rapport</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea 
                    name="message"
                    rows="4" 
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" 
                    placeholder="Décrivez votre besoin..."
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                {/* Double Boutons d'Action - type="button" ajouté pour sécurité */}
                <div className="flex flex-col sm:flex-row gap-3">
                   <button 
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="flex-1 bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 hover:shadow-lg transition duration-300 transform active:scale-95 flex items-center justify-center"
                   >
                     <MessageCircle size={20} className="mr-2" /> Envoyer par WhatsApp
                   </button>
                   <button 
                    type="button"
                    onClick={handleEmailSubmit}
                    className="flex-1 bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 hover:shadow-lg transition duration-300 transform active:scale-95 flex items-center justify-center"
                   >
                     <Mail size={20} className="mr-2" /> Envoyer par Email
                   </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
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

const Footer = () => (
  <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2">
          <div className="flex items-center text-white mb-4">
            <BarChart2 size={24} className="mr-2 text-cyan-500" />
            <span className="font-bold text-xl">CEBI Stats</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Cabinet d'Études Biostatistique et Informatique.
            La référence ivoirienne pour l'analyse de données de santé, la formation et les solutions informatiques.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">Accueil</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Nos Services</a></li>
            <li><a href="#about" className="hover:text-cyan-400 transition">À Propos</a></li>
            <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Réseaux Sociaux</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://facebook.com/CEBISTATS" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-cyan-400 transition">
                <Facebook size={16} className="mr-2" /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} CEBI Stats Abidjan. Tous droits réservés.</p>
        <div className="mt-4 md:mt-0 flex items-center">
           <span className="mr-2">Design par</span>
           <span className="text-cyan-500 font-bold">Christophe KOUAKOU</span>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  // --- AJOUT POUR LE FAVICON ET LE TITRE ---
  useEffect(() => {
    // 1. Changer le titre de l'onglet
    document.title = "CEBI Stats | Cabinet Biostatistique & Informatique";

    // 2. FORCER le changement d'icône (Méthode Robuste)
    
    // a. Supprimer les anciennes icônes (pour éviter les conflits)
    const existingFavicons = document.querySelectorAll("link[rel~='icon']");
    existingFavicons.forEach(el => el.remove());

    // b. Créer la nouvelle icône
    const link = document.createElement('link');
    link.rel = 'icon';
    // Astuce : on ajoute ?v=2 pour forcer le navigateur à oublier l'ancienne image
    link.href = "/logo_cebistats.png?v=2"; 
    
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  return (
    <div className="font-sans text-slate-900 antialiased bg-white selection:bg-cyan-100 selection:text-cyan-900">
      <GlobalStyles />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Portfolio />
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
