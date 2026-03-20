import { data } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
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
    // Pak zowel de hoofd-nav buttons als de knoppen in de footer met data-target
    const navLinks = document.querySelectorAll('.nav-link, footer [data-target]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            
            // Update actieve status alleen voor hoofd-nav
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const activeNav = document.querySelector(`.nav-link[data-target="${target}"]`);
            if (activeNav) activeNav.classList.add('active');

            loadView(target);
            window.scrollTo(0, 0);
        });
    });
}

// --- ARTIKEL WEERGAVE (NOS STIJL) ---
function openArticle(article) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white min-h-screen border-x border-black">
            <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden border-b border-black">
                <img src="${article.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale" alt="${article.title}">
                <div class="absolute bottom-0 left-0 bg-black text-white px-4 py-2 text-[10px] uppercase font-bold text-white">Beeld: Hazy Standard / Archief</div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-0">
                <div class="lg:col-span-3 p-6 md:p-16 border-r border-black">
                    <button id="back-btn" class="mb-10 border border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center gap-2">← Terug</button>
                    <div class="text-xs font-bold uppercase mb-4 text-gray-500">${article.date}</div>
                    <h1 class="text-4xl md:text-6xl font-extrabold uppercase mb-8 leading-tight italic">${article.title}</h1>
                    <div class="prose max-w-none text-xl leading-relaxed font-semibold mb-10 border-l-4 border-black pl-6">${article.intro}</div>
                    <div class="prose max-w-none text-lg leading-relaxed font-medium mb-20">${article.content || "Gedetailleerde feitelijke analyse volgt."}</div>
                </div>
                <div class="lg:col-span-1 bg-gray-50 p-6">
                    <div class="sticky top-10 text-center uppercase font-bold text-xs border border-black p-4 bg-white">Advertentie</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('back-btn').onclick = () => loadView('home');
    lucide.createIcons();
}

// --- VIEW LOADER ---
function loadView(viewName) {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    const templateId = viewName === 'archive' ? 'tpl-topics' : `tpl-${viewName}`;
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        main.appendChild(tpl.content.cloneNode(true));
        if (viewName === 'home') renderHome();
        if (viewName === 'topics' || viewName === 'archive') renderTopics();
        if (viewName === 'portfolio') renderPortfolio();
        // About en Contact hebben geen aparte JS-render nodig omdat ze statisch in de template staan,
        // MAAR we moeten wel de icoontjes verversen:
    }
    lucide.createIcons();
}

// --- HOMEPAGE ---
function renderHome() {
    const fContainer = document.getElementById('featured-container');
    if (fContainer && data.featured) {
        fContainer.innerHTML = `
            <div class="md:col-span-2 border-r border-black relative border-b md:border-b-0 cursor-pointer" id="featured-img">
                <img src="${data.featured.image}" class="w-full h-full object-cover min-h-[400px] grayscale">
            </div>
            <div class="p-6 md:p-10 flex flex-col justify-center bg-white">
                <div class="text-xs font-bold uppercase mb-4 border-b border-black inline-block pb-1">${data.featured.date}</div>
                <h2 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight uppercase cursor-pointer" id="featured-title">${data.featured.title}</h2>
                <p class="text-lg font-semibold">${data.featured.excerpt}</p>
            </div>
        `;
        const openFeatured = () => openArticle(data.featured);
        document.getElementById('featured-img').onclick = openFeatured;
        document.getElementById('featured-title').onclick = openFeatured;
    }

    const aContainer = document.getElementById('col-analysis');
    if (aContainer) {
        aContainer.innerHTML = '';
        data.analysis.slice(0, 3).forEach(a => {
            const aEl = document.createElement('div');
            aEl.className = 'border-b border-black p-6 cursor-pointer hover:bg-gray-50';
            aEl.innerHTML = `
                <div class="text-xs font-bold uppercase mb-2 text-gray-500">${a.date}</div>
                <h3 class="font-extrabold uppercase text-xl mb-3">${a.title}</h3>
                <p class="text-sm font-semibold line-clamp-2">${a.intro}</p>
            `;
            aEl.onclick = () => openArticle(a);
            aContainer.appendChild(aEl);
        });
    }

    const rContainer = document.getElementById('col-raw');
    if (rContainer) {
        rContainer.innerHTML = '';
        data.rawData.forEach(r => {
            const rEl = document.createElement('div');
            rEl.className = 'border-l-4 border-black pl-3 text-sm font-semibold py-2 mb-4';
            rEl.textContent = r;
            rContainer.appendChild(rEl);
        });
    }

    const homeAd = document.getElementById('home-ad-sidebar');
    if (homeAd) {
        homeAd.innerHTML = `
            <div class="flex flex-col items-center">
                <span class="text-[9px] text-gray-400 mb-4 tracking-widest font-bold">ADVERTENTIE</span>
                <img src="https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=400" class="grayscale w-full aspect-square object-cover border border-black mb-4">
                <h4 class="text-xs font-black uppercase mb-2 text-center">BI Dashboarding Masterclass 2026</h4>
                <button class="border border-black px-4 py-2 text-[10px] font-bold uppercase hover:bg-black hover:text-white w-full">Inschrijven</button>
            </div>
        `;
    }
}

// --- TOPICS ---
function renderTopics() {
    const gridContainer = document.getElementById('topics-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    data.analysis.forEach(a => {
        const el = document.createElement('div');
        el.className = 'border border-black flex flex-col cursor-pointer hover:bg-gray-50 group transition-all overflow-hidden bg-white';
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${a.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="font-extrabold uppercase text-xl mb-3 leading-tight">${a.title}</h3>
                <p class="text-sm font-semibold mb-6 line-clamp-3 text-gray-600">${a.intro}</p>
                <div class="text-[10px] font-bold uppercase border-t border-black pt-3 mt-auto">${a.date}</div>
            </div>
        `;
        el.onclick = () => openArticle(a);
        gridContainer.appendChild(el);
    });
}

// --- PORTFOLIO ---
function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !data.portfolio) return;
    grid.innerHTML = ''; 
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border border-black flex flex-col hover:bg-gray-50 cursor-pointer group transition-all bg-white';
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${item.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
            </div>
            <div class="p-6">
                <div class="text-[10px] font-bold uppercase text-gray-400 mb-2">${item.date}</div>
                <h3 class="text-xl font-extrabold uppercase mb-4 leading-tight">${item.title}</h3>
                <p class="text-sm font-semibold text-gray-700 line-clamp-2">${item.intro}</p>
            </div>
        `;
        el.onclick = () => openArticle(item);
        grid.appendChild(el);
    });
}
