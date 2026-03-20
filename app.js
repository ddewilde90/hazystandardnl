import { data } from './data.js';

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

// --- DE ORIGINELE NOS-STIJL ARTIKELPAGINA ---
function openArticle(article) {
    const main = document.getElementById('main-content');
    
    // Filter 3 andere artikelen voor de "Lees ook" sectie onderaan
    const related = data.analysis
        .filter(a => a.title !== article.title)
        .slice(0, 3);

    main.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white min-h-screen border-x border-black">
            <div class="relative w-full h-[350px] md:h-[500px] overflow-hidden border-b border-black">
                <img src="${article.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale" alt="${article.title}">
                <div class="absolute bottom-0 left-0 bg-black text-white px-4 py-2 text-[10px] uppercase font-bold tracking-widest italic">Beeld: Hazy Standard / Archief</div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-0">
                
                <div class="lg:col-span-3 p-6 md:p-16 border-r border-black">
                    <button id="back-btn" class="mb-10 border border-black px-6 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-all flex items-center gap-2">
                        ← Terug naar overzicht
                    </button>
                    
                    <div class="text-xs font-bold uppercase mb-4 text-red-600 tracking-tighter italic">Analyse • ${article.date}</div>
                    <h1 class="text-4xl md:text-7xl font-extrabold uppercase mb-8 leading-[0.9] italic border-b-8 border-black pb-6">
                        ${article.title}
                    </h1>
                    
                    <div class="flex items-center gap-6 mb-12 border-b border-black/10 pb-6">
                        <span class="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <i data-lucide="share-2" class="w-4 h-4"></i> Deel artikel
                        </span>
                        <div class="flex gap-4">
                            <i data-lucide="linkedin" class="w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors"></i>
                            <i data-lucide="twitter" class="w-5 h-5 cursor-pointer hover:text-sky-500 transition-colors"></i>
                            <i data-lucide="link-2" class="w-5 h-5 cursor-pointer hover:text-green-600 transition-colors"></i>
                            <i data-lucide="printer" class="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors"></i>
                        </div>
                    </div>

                    <div class="prose max-w-none text-2xl leading-tight font-black mb-12 border-l-8 border-black pl-8 italic text-gray-900">
                        ${article.intro}
                    </div>
                    
                    <div class="prose max-w-none text-lg leading-relaxed font-medium space-y-6 text-gray-800">
                        ${article.content || "<p>Gedetailleerde feitelijke informatie zodat ik niet voor verrassingen kom te staan. Deze analyse is gebaseerd op de beschikbare dossierstukken en BI-extracties van de afgelopen periode.</p>"}
                    </div>

                    <div class="border-t-8 border-black pt-12 mt-24">
                        <h4 class="font-black uppercase text-3xl mb-10 italic decoration-red-600 underline underline-offset-8">Lees ook:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                            ${related.map(a => `
                                <div class="cursor-pointer group related-item" data-id="${a.title}">
                                    <div class="aspect-video overflow-hidden border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <img src="${a.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                                    </div>
                                    <h5 class="font-black uppercase text-sm leading-tight group-hover:text-red-600 transition-colors">${a.title}</h5>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1 bg-gray-50 p-6 md:p-8">
                    <div class="sticky top-10 space-y-8">
                        <div class="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
                            <span class="text-[9px] text-gray-400 mb-6 tracking-[0.4em] font-bold uppercase italic border-b border-gray-100 w-full pb-2">Advertentie</span>
                            <div class="w-20 h-20 bg-black text-white flex items-center justify-center mb-6 rounded-full">
                                <i data-lucide="bar-chart-3" class="w-10 h-10"></i>
                            </div>
                            <h5 class="text-sm font-black uppercase mb-3">BI Masterclass 2026</h5>
                            <p class="text-[10px] font-bold text-gray-500 mb-8 uppercase leading-tight tracking-tight">Data-audits en dossier-analyse voor professionals.</p>
                            <button class="w-full bg-black text-white py-3 text-[10px] font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-all">
                                Direct aanmelden
                            </button>
                        </div>

                        <div class="border-t border-black/10 pt-6">
                            <p class="text-[10px] font-black uppercase mb-2">Hazy Standard Premium</p>
                            <p class="text-[10px] text-gray-500 uppercase leading-snug mb-4">Onbeperkt toegang tot alle diepte-analyses en ruwe data feeds.</p>
                            <a href="#" class="text-[10px] font-black uppercase underline hover:text-red-600 transition-colors italic">Word nu lid</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    
    document.getElementById('back-btn').onclick = () => loadView('home');
    
    document.querySelectorAll('.related-item').forEach(item => {
        item.onclick = () => {
            const selected = data.analysis.find(a => a.title === item.dataset.id);
            if(selected) {
                openArticle(selected);
                window.scrollTo(0,0);
            }
        };
    });

    if (window.lucide) lucide.createIcons();
}

function loadView(viewName) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(`tpl-${viewName}`);
    
    main.innerHTML = '';

    if (template) {
        const content = template.content.cloneNode(true);
        main.appendChild(content);
        
        if (viewName === 'home') renderHome();
        if (viewName === 'topics') renderTopics();
        if (viewName === 'portfolio') renderPortfolio();
        
        if (window.lucide) lucide.createIcons();
    } else {
        console.warn(`Template tpl-${viewName} niet gevonden. Terug naar home.`);
        renderHome(); 
    }
}

function renderHome() {
    const fContainer = document.getElementById('featured-container');
    if (fContainer && data.featured) {
        fContainer.innerHTML = `
            <div class="md:col-span-2 border-r border-black relative border-b md:border-b-0 cursor-pointer" id="featured-img">
                <img src="${data.featured.image}" class="w-full h-full object-cover min-h-[400px] grayscale hover:grayscale-0 transition-all duration-700">
            </div>
            <div class="p-6 md:p-10 flex flex-col justify-center bg-white">
                <div class="text-xs font-bold uppercase mb-4 border-b border-black inline-block pb-1">${data.featured.date}</div>
                <h2 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight uppercase cursor-pointer" id="featured-title">${data.featured.title}</h2>
                <p class="text-lg font-semibold leading-snug">${data.featured.excerpt}</p>
            </div>
        `;
        document.getElementById('featured-img').onclick = () => openArticle(data.featured);
        document.getElementById('featured-title').onclick = () => openArticle(data.featured);
    }

    // --- HERSTELDE VIDEO SECTIE ---
    const vContainer = document.getElementById('col-video');
    if (vContainer && data.videos) {
        vContainer.innerHTML = '';
        data.videos.slice(0, 2).forEach(v => {
            const vEl = document.createElement('div');
            vEl.className = 'border-b border-black p-4 group cursor-pointer hover:bg-gray-50';
            vEl.innerHTML = `
                <div class="relative w-full aspect-video mb-3 bg-gray-200 border border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <img src="${v.thumb}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent flex items-center justify-center transition-all">
                        <i data-lucide="play-circle" class="text-white w-10 h-10 drop-shadow-lg"></i>
                    </div>
                </div>
                <h3 class="font-bold uppercase text-sm leading-tight group-hover:text-red-600 transition-colors">${v.title}</h3>
                <p class="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Bekijk Analyse</p>
            `;
            vContainer.appendChild(vEl);
        });
    }

    const aContainer = document.getElementById('col-analysis');
    if (aContainer) {
        aContainer.innerHTML = '';
        data.analysis.slice(0, 3).forEach(a => {
            const aEl = document.createElement('div');
            aEl.className = 'border-b border-black p-6 cursor-pointer hover:bg-gray-50 group';
            aEl.innerHTML = `
                <div class="text-xs font-bold uppercase mb-2 text-gray-400 group-hover:text-black transition-colors">${a.date}</div>
                <h3 class="font-extrabold uppercase text-xl mb-3 leading-tight">${a.title}</h3>
                <p class="text-sm font-semibold line-clamp-2 text-gray-600">${a.intro}</p>
            `;
            aEl.onclick = () => openArticle(a);
            aContainer.appendChild(aEl);
        });
    }

    const homeAd = document.getElementById('home-ad-sidebar');
    if (homeAd) {
        homeAd.innerHTML = `
            <div class="flex flex-col items-center p-6 bg-gray-50 border border-black/10 h-full">
                <span class="text-[9px] text-gray-400 mb-6 tracking-[0.3em] font-bold uppercase">Advertentie</span>
                <div class="w-full aspect-square bg-white border border-black mb-6 overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]">
                    <img src="https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=400" class="grayscale w-full h-full object-cover">
                </div>
                <h4 class="text-xs font-black uppercase mb-3 text-center">BI Masterclass 2026</h4>
                <button class="border-2 border-black px-4 py-2 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all w-full">Informatie aanvragen</button>
            </div>
        `;
    }

    const rContainer = document.getElementById('col-raw');
    if (rContainer) {
        rContainer.innerHTML = '';
        data.rawData.forEach(r => {
            const rEl = document.createElement('div');
