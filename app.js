import { data } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check of Lucide geladen is om crashes te voorkomen
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    setDate();
    setupNavigation();
    
    // We starten altijd op home
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
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Voorkom standaard gedrag en zorg dat we het juiste target pakken
            e.preventDefault();
            const target = e.currentTarget.dataset.target;
            
            links.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            loadView(target);
        });
    });
}

function openArticle(article) {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = `
        <div class="max-w-4xl mx-auto p-6 md:p-20 bg-white min-h-screen border-x border-black">
            <button id="back-btn" class="mb-10 border border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center gap-2 transition-none">
                ← Terug naar overzicht
            </button>
            <div class="text-xs font-bold uppercase mb-4 text-gray-500">${article.date || ''}</div>
            <h1 class="text-4xl md:text-6xl font-extrabold uppercase mb-8 leading-tight">${article.title}</h1>
            <div class="prose max-w-none text-lg leading-relaxed font-medium mb-10">
                ${article.intro || ''}
            </div>
            <div class="prose max-w-none text-lg leading-relaxed font-medium border-t border-black pt-10">
                ${article.content || "Gedetailleerde rapportage volgt."}
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.onclick = () => loadView('home');
    }
}

function loadView(viewName) {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = '';
    
    // Mapping voor afwijkende namen
    let templateId = `tpl-${viewName}`;
    if (viewName === 'archive') templateId = 'tpl-topics';
    if (viewName === 'about') templateId = 'tpl-about'; // Expliciet voor de zekerheid

    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        main.appendChild(tpl.content.cloneNode(true));
        
        // Render functies alleen aanroepen als de data en container bestaan
        if (viewName === 'home') renderHome();
        if (viewName === 'topics' || viewName === 'archive') renderTopics();
        if (viewName === 'portfolio') renderPortfolio();
    } else {
        console.error(`Template niet gevonden: ${templateId}`);
        main.innerHTML = `<div class="p-20 text-center uppercase font-bold">Pagina onder constructie: ${viewName}</div>`;
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function renderHome() {
    const fContainer = document.getElementById('featured-container');
    if (fContainer && data.featured) {
        fContainer.innerHTML = `
            <div class="md:col-span-2 border-r border-black relative border-b md:border-b-0">
                <img src="${data.featured.image}" alt="Featured" class="w-full h-full object-cover min-h-[400px]">
            </div>
            <div class="p-6 md:p-10 flex flex-col justify-center bg-white">
                <div class="text-xs font-bold uppercase mb-4 border-b border-black inline-block pb-1">${data.featured.author} // ${data.featured.date}</div>
                <h2 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight uppercase">${data.featured.title}</h2>
                <p class="text-lg font-semibold">${data.featured.excerpt}</p>
            </div>
        `;
    }

    const vContainer = document.getElementById('col-video');
    if (vContainer && data.videos) {
        vContainer.innerHTML = '';
        data.videos.forEach(v => {
            const vEl = document.createElement('div');
            vEl.className = 'border-b border-black p-4 group cursor-pointer';
            vEl.innerHTML = `
                <div class="relative w-full h-40 mb-3 bg-gray-200 border border-black overflow-hidden">
                    <img src="${v.thumb}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <i data-lucide="play-circle" class="text-white w-12 h-12"></i>
                    </div>
                </div>
                <h3 class="font-bold uppercase text-lg leading-tight">${v.title}</h3>
            `;
            vContainer.appendChild(vEl);
        });
    }

    const aContainer = document.getElementById('col-analysis');
    if (aContainer && data.analysis) {
        aContainer.innerHTML = '';
        data.analysis.forEach(a => {
            const aEl = document.createElement('div');
            aEl.className = 'border-b border-black p-6 cursor-pointer hover:bg-gray-50 transition-none';
            aEl.innerHTML = `
                <div class="text-xs font-bold uppercase mb-2 text-gray-500">${a.date}</div>
                <h3 class="font-extrabold uppercase text-xl mb-3">${a.title}</h3>
                <p class="text-sm font-semibold">${a.intro}</p>
            `;
            aEl.onclick = () => openArticle(a);
            aContainer.appendChild(aEl);
        });
    }

    const rContainer = document.getElementById('col-raw');
    if (rContainer && data.rawData) {
        rContainer.innerHTML = '';
        data.rawData.forEach(r => {
            const rEl = document.createElement('div');
            rEl.className = 'border-l-4 border-black pl-3 text-sm font-semibold py-1 mb-2';
            rEl.textContent = r;
            rContainer.appendChild
