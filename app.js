import { data } from './data.js';

// SEO Configuratie
const seoConfig = {
    home: {
        title: "Hazy Standard | Onafhankelijke Business Intelligence & Veldwerk",
        description: "Hazy Standard biedt onafhankelijke business intelligence. Wij zoeken de feiten achter de data door middel van diepgaande rapportages."
    },
    topics: {
        title: "Verhalen | Dossiers & Analyse | Hazy Standard",
        description: "Bekijk onze uitgebreide verzameling verhalen, analyses en veldwerk-rapportages."
    },
    about: {
        title: "Over Hazy Standard | Onze Methode",
        description: "In een wereld vol ruis kiest Hazy Standard voor de essentie. Ontdek onze methodiek en achtergrond."
    },
    contact: {
        title: "Contact | Hazy Standard",
        description: "Directe lijnen met Hazy Standard? Neem contact met ons op voor samenwerkingen en vragen."
    },
    portfolio: {
        title: "Portfolio | Projecten & Cases | Hazy Standard",
        description: "Bekijk onze gerealiseerde projecten en business intelligence cases."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    setDate();
    setupNavigation();
    loadView('home');
});

function setDate() {
    const el = document.getElementById('current-date');
    if (el) {
        const d = new Date();
        el.textContent = d.toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, footer [data-target]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            if(!target) return;

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const activeNav = document.querySelector(`.nav-link[data-target="${target}"]`);
            if (activeNav) activeNav.classList.add('active');

            loadView(target);
            window.scrollTo(0, 0);
        });
    });
}

function updateSEO(pageName, article = null) {
    const config = seoConfig[pageName] || seoConfig.home;
    
    // Gebruik artikelgegevens als we in een artikel zitten
    const title = article ? `${article.title} | Hazy Standard` : config.title;
    const description = article ? (article.intro || config.description) : config.description;

    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
}

function openArticle(article) {
    updateSEO('topics', article); // SEO updaten bij openen artikel
    const main = document.getElementById('main-content');
    const related = data.analysis.filter(a => a.title !== article.title).slice(0, 3);

    main.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white min-h-screen border-x border-black">
            <div class="relative w-full h-[350px] md:h-[500px] overflow-hidden border-b border-black">
                <img src="${article.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale" alt="${article.title}">
                <div class="absolute bottom-0 left-0 bg-black text-white px-4 py-2 text-[10px] uppercase font-bold tracking-widest italic">Beeld: Hazy Standard / Archief</div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-0">
                <div class="lg:col-span-3 p-6 md:p-16 border-r border-black">
                    <button id="back-btn" class="mb-10 border border-black px-6 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-all flex items-center gap-2">← Terug naar overzicht</button>
                    <h1 class="text-4xl md:text-7xl font-extrabold uppercase mb-8 leading-[0.9] italic border-b-8 border-black pb-6">${article.title}</h1>
                    <div class="prose max-w-none text-2xl leading-tight font-black mb-12 border-l-8 border-black pl-8 italic text-gray-900">${article.intro}</div>
                    <div class="prose max-w-none text-lg leading-relaxed font-medium space-y-6 text-gray-800">${article.content}</div>
                </div>
                <div class="lg:col-span-1 bg-gray-50 p-6 md:p-8">
                     <div class="sticky top-10">
                        <div class="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <h5 class="text-sm font-black uppercase mb-3">BI Masterclass 2026</h5>
                            <button class="w-full bg-black text-white py-3 text-[10px] font-bold uppercase">Aanmelden</button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('back-btn').onclick = () => loadView('topics');
    if (window.lucide) lucide.createIcons();
}

function loadView(viewName) {
    updateSEO(viewName);
    const main = document.getElementById('main-content');
    const template = document.getElementById(`tpl-${viewName}`);
    
    main.innerHTML = '';
    if (template) {
        main.appendChild(template.content.cloneNode(true));
        if (viewName === 'home') renderHome();
        if (viewName === 'topics') renderTopics();
        if (viewName === 'portfolio') renderPortfolio();
        if (window.lucide) lucide.createIcons();
    }
}

function renderTopics() {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;
    grid.innerHTML = '';
    data.analysis.forEach(a => {
        const el = document.createElement('div');
        el.className = 'border border-black flex flex-col cursor-pointer hover:bg-gray-50 group bg-white';
        el.innerHTML = `<div class="aspect-video w-full overflow-hidden border-b border-black"><img src="${a.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"></div><div class="p-6"><h3 class="font-extrabold uppercase text-xl mb-3">${a.title}</h3><p class="text-sm font-semibold mb-6 line-clamp-3">${a.intro}</p><div class="text-[10px] font-bold uppercase border-t border-black pt-3">${a.date}</div></div>`;
        el.onclick = () => openArticle(a);
        grid.appendChild(el);
    });
}

function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !data.portfolio) return;
    grid.innerHTML = ''; 
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border border-black flex flex-col hover:bg-gray-50 cursor-pointer group bg-white';
        el.innerHTML = `<div class="aspect-video w-full border-b border-black"><img src="${item.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0"></div><div class="p-6"><h3 class="text-xl font-extrabold uppercase mb-4">${item.title}</h3><p class="text-sm text-gray-700">${item.intro}</p></div>`;
        el.onclick = () => openArticle(item);
        grid.appendChild(el);
    });
}

// ... (renderHome blijft gelijk)
