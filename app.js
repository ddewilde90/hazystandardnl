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
    
    // Pak 3 andere artikelen voor onderaan
    const related = data.analysis.filter(a => a.title !== article.title).slice(0, 3);

    main.innerHTML = `
        <article class="max-w-5xl mx-auto bg-white min-h-screen border-x border-black shadow-2xl">
            <div class="relative w-full h-[400px] overflow-hidden border-b border-black">
                <img src="${article.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale" alt="Beeld bij artikel">
                <div class="absolute bottom-0 left-0 bg-black text-white px-3 py-1 text-[10px] uppercase font-bold">Beeld: Hazy Standard / Archief</div>
            </div>

            <div class="p-6 md:p-12">
                <button id="back-btn" class="mb-8 border border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center gap-2">← Terug</button>
                
                <div class="text-xs font-bold uppercase mb-2 text-red-600">Analyse • ${article.date}</div>
                <h1 class="text-4xl md:text-6xl font-extrabold uppercase mb-8 leading-tight italic border-b-4 border-black pb-4">${article.title}</h1>
                
                <div class="flex gap-4 mb-10 border-b border-black pb-4">
                    <i data-lucide="share-2" class="w-4 h-4 text-gray-400"></i>
                    <i data-lucide="linkedin" class="w-4 h-4 cursor-pointer hover:text-blue-700"></i>
                    <i data-lucide="twitter" class="w-4 h-4 cursor-pointer hover:text-blue-400"></i>
                    <i data-lucide="mail" class="w-4 h-4 cursor-pointer hover:text-red-600"></i>
                </div>

                <div class="text-xl md:text-2xl leading-relaxed font-bold mb-8 text-gray-900 bg-gray-50 p-6 border-l-8 border-black">
                    ${article.intro}
                </div>
                
                <div class="text-lg leading-relaxed space-y-6 mb-20 font-medium">
                    ${article.content || "Gedetailleerde feitelijke informatie zodat ik niet voor verrassingen kom te staan."}
                </div>

                <div class="border-t-2 border-black pt-10">
                    <h3 class="font-black uppercase text-xl mb-6 italic underline">Lees ook:</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${related.map(a => `
                            <div class="cursor-pointer group related-trigger" data-title="${a.title}">
                                <div class="aspect-video overflow-hidden border border-black mb-2">
                                    <img src="${a.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                                </div>
                                <h4 class="font-bold uppercase text-xs leading-tight group-hover:underline">${a.title}</h4>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </article>
    `;
    
    document.getElementById('back-btn').onclick = () => loadView('home');
    if (window.lucide) lucide.createIcons();
}

function loadView(viewName) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(`tpl-${viewName}`);
    
    // Wis de huidige weergave
    main.innerHTML = '';

    if (template) {
        const content = template.content.cloneNode(true);
        main.appendChild(content);
        
        // Render de dynamische data
        if (viewName === 'home') renderHome();
        if (viewName === 'topics') renderTopics();
        if (viewName === 'portfolio') renderPortfolio();
        
        if (window.lucide) lucide.createIcons();
    } else {
        // Als er geen template is, gaan we terug naar home om een "wit scherm" te voorkomen
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
            rEl.className = 'border-l-4 border-black pl-3 text-sm font-semibold py-2 mb-4 hover:bg-gray-50 transition-colors cursor-default';
            rEl.textContent = r;
            rContainer.appendChild(rEl);
        });
    }
}

function renderTopics() {
    const gridContainer = document.getElementById('topics-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    data.analysis.forEach(a => {
        const el = document.createElement('div');
        el.className = 'border border-black flex flex-col cursor-pointer hover:bg-gray-50 group overflow-hidden bg-white';
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${a.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
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

function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !data.portfolio) return;
    grid.innerHTML = ''; 
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border border-black flex flex-col hover:bg-gray-50 cursor-pointer group bg-white';
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${item.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
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
