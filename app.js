import { data } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    setDate();
    setupNavigation();
    
    // Routering: Bepaal wat we moeten laden op basis van de aanwezige ID's
    if (document.getElementById('topics-grid')) {
        renderTopics();
    } else if (document.getElementById('portfolio-grid')) {
        renderPortfolio();
    } else {
        // Fallback naar home als we op de index of een andere pagina zijn
        loadView('home'); 
    }
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
            const target = link.dataset.target;
            if(!target) return;
            
            // Als we naar een pagina navigeren die in de navigatie staat,
            // checken we of we naar een andere HTML-pagina moeten of binnen de SPA blijven
            if (window.location.pathname.includes(target + '.html')) return;
            
            window.location.href = target + '.html';
        });
    });
}

// --- RENDERING LOGICA ---

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
        document.getElementById('featured-img').onclick = () => window.location.href = 'artikel.html?id=' + data.featured.id;
    }
    // ... (rest van je renderHome blijft zoals hij was)
}

function renderTopics() {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;
    grid.innerHTML = '';
    data.analysis.forEach(a => {
        const el = document.createElement('div');
        el.className = 'border-r border-b border-black flex flex-col cursor-pointer hover:bg-gray-50 group bg-white';
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${a.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
            </div>
            <div class="p-8 flex flex-col flex-grow">
                <h3 class="font-extrabold uppercase text-xl mb-4 leading-tight">${a.title}</h3>
                <p class="text-sm font-semibold mb-6 text-gray-700 line-clamp-3">${a.intro}</p>
                <div class="text-[10px] font-bold uppercase border-t border-black pt-4 mt-auto">${a.date}</div>
            </div>
        `;
        el.onclick = () => window.location.href = 'artikel.html?id=' + a.id;
        grid.appendChild(el);
    });
}

function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !data.portfolio) return;
    grid.innerHTML = '';
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border-r border-b border-black flex flex-col hover:bg-gray-50 cursor-pointer group bg-white';
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${item.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
            </div>
            <div class="p-8">
                <h3 class="text-xl font-extrabold uppercase mb-4">${item.title}</h3>
                <p class="text-sm font-semibold text-gray-700 line-clamp-2">${item.intro}</p>
            </div>
        `;
        el.onclick = () => window.location.href = 'artikel.html?id=' + item.id;
        grid.appendChild(el);
    });
}

function loadView(viewName) {
    // Deze functie is nu alleen nodig als je dynamisch wilt laden
    // Anders kun je navigatie via href's regelen (zoals hierboven in setupNavigation)
}
