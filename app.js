import { data } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    setDate();
    setupNavigation();
    loadView('home'); // Laad home als standaard
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

function loadView(viewName) {
    // Verberg alle templates/secties eerst (zorg dat je in HTML secties hebt met een class 'page')
    // Of: laad alleen de data in de elementen die al op de pagina staan
    
    if (viewName === 'home') {
        renderHome();
    } else if (viewName === 'topics') {
        renderTopics();
    }
    // ... enzovoorts
}
}

function openArticle(article) {
    const main = document.getElementById('main-content');
    const related = data.analysis.filter(a => a.title !== article.title).slice(0, 3);

    main.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white min-h-screen border-x border-black">
            <div class="relative w-full h-[350px] md:h-[500px] overflow-hidden border-b border-black">
                <img src="${article.image}" class="w-full h-full object-cover grayscale" alt="${article.title}">
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-4">
                <div class="lg:col-span-3 p-6 md:p-16 border-r border-black">
                    <button id="back-btn" class="mb-10 border border-black px-6 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-all">← Terug</button>
                    <h1 class="text-4xl md:text-7xl font-extrabold uppercase mb-8 leading-[0.9] italic border-b-8 border-black pb-6">${article.title}</h1>
                    <div class="prose max-w-none text-xl font-black mb-12 border-l-8 border-black pl-8 italic">${article.intro}</div>
                    <div class="prose max-w-none text-lg text-gray-800">${article.content || "<p>Geen inhoud beschikbaar.</p>"}</div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('back-btn').onclick = () => loadView('topics');
    if (window.lucide) lucide.createIcons();
}

function renderHome() {
    const fContainer = document.getElementById('featured-container');
    if (fContainer && data.featured) {
        fContainer.innerHTML = `
            <div class="md:col-span-2 border-r border-black cursor-pointer" id="featured-img">
                <img src="${data.featured.image}" class="w-full h-full object-cover min-h-[400px] grayscale hover:grayscale-0 transition-all">
            </div>
            <div class="p-10 flex flex-col justify-center bg-white">
                <h2 class="text-5xl font-extrabold mb-6 uppercase">${data.featured.title}</h2>
                <p class="text-lg font-semibold">${data.featured.excerpt}</p>
            </div>
        `;
        document.getElementById('featured-img').onclick = () => openArticle(data.featured);
    }
    // ... render video/analysis/raw hier zoals je had ...
}

function renderTopics(filterCategory = 'Alles') {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const filtered = filterCategory === 'Alles' ? data.analysis : data.analysis.filter(a => a.tags?.includes(filterCategory));

    filtered.forEach(a => {
        const el = document.createElement('div');
        el.className = 'border border-black p-6 cursor-pointer hover:bg-gray-50';
        el.innerHTML = `<h3 class="font-extrabold uppercase text-lg mb-2">${a.title}</h3><p class="text-sm text-gray-600">${a.intro}</p>`;
        el.onclick = () => openArticle(a);
        grid.appendChild(el);
    });
}

function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    grid.innerHTML = '';
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border border-black p-6 cursor-pointer hover:bg-gray-50';
        el.innerHTML = `<h3 class="font-bold uppercase">${item.title}</h3><p class="text-sm">${item.intro}</p>`;
        grid.appendChild(el);
    });
}
