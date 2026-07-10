import { data } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    setDate();
    setupNavigation();
    // Zorg dat de pagina start met laden
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
    document.addEventListener('click', (e) => {
        // Zoek of het aangeklikte element een [data-target] heeft
        const targetElement = e.target.closest('[data-target]');
        
        if (targetElement) {
            e.preventDefault(); // Voorkom dat de link daadwerkelijk probeert te laden
            const target = targetElement.dataset.target;
            
            console.log("Navigeren naar:", target); // Check de console of dit verschijnt!

            // Laad de view
            loadView(target);
            updateSEO(target);
            window.scrollTo(0, 0);
        }
    });
}

export function openArticle(article) {
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
                    <button id="verhalen.html" class="mb-10 border border-black px-6 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-all flex items-center gap-2">← Terug naar overzicht</button>
                    <div class="text-xs font-bold uppercase mb-4 text-red-600 tracking-tighter italic">Analyse • ${article.date}</div>
                    <h1 class="text-4xl md:text-7xl font-extrabold uppercase mb-8 leading-[0.9] italic border-b-8 border-black pb-6">${article.title}</h1>
                    <div class="prose max-w-none text-2xl leading-tight font-black mb-12 border-l-8 border-black pl-8 italic text-gray-900">${article.intro}</div>
                    <div class="prose max-w-none text-lg leading-relaxed font-medium space-y-6 text-gray-800">${article.content || "<p>Feitelijke analyse volgt.</p>"}</div>
                </div>
                <div class="lg:col-span-1 bg-gray-50 p-6 md:p-8">
                    <div class="sticky top-10 space-y-8">
                        <div class="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <h5 class="text-sm font-black uppercase mb-3">BI Masterclass 2026</h5>
                            <button class="w-full bg-black text-white py-3 text-[10px] font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-all">Direct aanmelden</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('back-btn').onclick = () => loadView('home');
    if (window.lucide) lucide.createIcons();
}

export function loadView(viewName) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(`tpl-${viewName}`);
    
    if (template) {
        main.innerHTML = '';
        main.appendChild(template.content.cloneNode(true));
        if (viewName === 'home') renderHome();
        if (viewName === 'verhalen') renderVerhalen();
        if (viewName === 'portfolio') renderPortfolio();
        if (window.lucide) lucide.createIcons();
    }
}

function renderHome() {
    const fContainer = document.getElementById('featured-container');
    if (fContainer && data.featured) {
        fContainer.innerHTML = `
            <div class="md:col-span-2 border-r border-black cursor-pointer" id="featured-img">
                <img src="${data.featured.image}" class="w-full h-full object-cover min-h-[400px] grayscale hover:grayscale-0 transition-all duration-700">
            </div>
            <div class="p-10 flex flex-col justify-center bg-white">
                <h2 class="text-5xl font-extrabold mb-6 uppercase cursor-pointer" id="featured-title">${data.featured.title}</h2>
                <p class="text-lg font-semibold">${data.featured.excerpt}</p>
            </div>
        `;
        document.getElementById('featured-img').onclick = () => openArticle(data.featured);
    }
    // ... (rest van je renderHome blijft hier staan)
}

function renderVerhalen() {
    const grid = document.getElementById('verhalen-grid');
    if (!grid) return;
    grid.innerHTML = data.analysis.map(a => `
        <div class="border border-black p-6 cursor-pointer hover:bg-gray-50 transition-colors">
            <h3 class="font-extrabold uppercase text-xl mb-3">${a.title}</h3>
            <p class="text-sm text-gray-600 mb-4">${a.intro}</p>
            <button class="text-xs font-bold uppercase underline">Lees verder</button>
        </div>
    `).join('');
    
    grid.querySelectorAll('div').forEach((el, index) => {
        el.onclick = () => openArticle(data.analysis[index]);
    });
}

function updateSEO(pageName) {
    const seo = {
        home: { title: "Hazy Standard | BI & Veldwerk" },
        verhalen: { title: "Verhalen | Hazy Standard" }
    };
    document.title = seo[pageName]?.title || "Hazy Standard";
}
