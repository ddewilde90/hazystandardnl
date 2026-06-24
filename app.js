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

function loadView(viewName) {
    const main = document.getElementById('main-content');
    if (!main) return;

    // 1. Wis de inhoud van de main
    main.innerHTML = '';

    // 2. Plaats de basis HTML-structuur per pagina
    if (viewName === 'home') {
        main.innerHTML = `
            <div id="featured-container" class="border-b border-black grid grid-cols-1 md:grid-cols-3"></div>
            <div class="grid grid-cols-1 md:grid-cols-3 flex-grow">
                <div class="border-r border-black flex flex-col"><div class="p-3 border-b border-black bg-black text-white font-bold uppercase text-sm">Video / Docu</div><div id="col-video"></div></div>
                <div class="border-r border-black flex flex-col"><div class="p-3 border-b border-black bg-black text-white font-bold uppercase text-sm">Analysis / Blog</div><div id="col-analysis"></div></div>
                <div class="flex flex-col bg-gray-50"><div class="p-3 border-b border-black bg-black text-white font-bold uppercase text-sm">Raw Data</div><div id="col-raw" class="p-4 space-y-4"></div></div>
            </div>
        `;
        renderHome();
    } else if (viewName === 'topics') {
        main.innerHTML = `<div id="topics-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6 p-8"></div>`;
        renderTopics();
    } else if (viewName === 'portfolio') {
        main.innerHTML = `<div id="portfolio-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6 p-8"></div>`;
        renderPortfolio();
    }

    if (window.lucide) lucide.createIcons();
}

function openArticle(article) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white min-h-screen border-x border-black p-10">
            <button id="back-btn" class="mb-10 border border-black px-6 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-all">← Terug</button>
            <h1 class="text-4xl md:text-7xl font-extrabold uppercase mb-8 italic border-b-8 border-black pb-6">${article.title}</h1>
            <div class="prose max-w-none text-xl mb-12">${article.intro}</div>
            <div class="prose max-w-none text-lg">${article.content || "<p>Geen inhoud beschikbaar.</p>"}</div>
        </div>
    `;
    document.getElementById('back-btn').onclick = () => loadView('home');
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
    // Vul hier eventueel ook je col-video, col-analysis etc. aan met document.getElementById(...).innerHTML = ...
}

function renderTopics() {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;
    data.analysis.forEach(a => {
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
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border border-black p-6 cursor-pointer hover:bg-gray-50';
        el.innerHTML = `<h3 class="font-bold uppercase">${item.title}</h3><p class="text-sm">${item.intro}</p>`;
        grid.appendChild(el);
    });
}
