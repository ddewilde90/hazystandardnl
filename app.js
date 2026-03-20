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
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            links.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            // We zetten de target altijd naar kleine letters
            loadView(e.target.dataset.target.toLowerCase());
        });
    });
}

function openArticle(article) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="max-w-4xl mx-auto p-6 md:p-20 bg-white min-h-screen border-x border-black">
            <button id="back-btn" class="mb-10 border border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center gap-2">
                ← Terug naar overzicht
            </button>
            <div class="text-xs font-bold uppercase mb-4 text-gray-500">${article.date}</div>
            <h1 class="text-4xl md:text-6xl font-extrabold uppercase mb-8 leading-tight">${article.title}</h1>
            <div class="prose max-w-none text-lg leading-relaxed font-medium mb-10">
                ${article.intro}
            </div>
            <div class="prose max-w-none text-lg leading-relaxed font-medium border-t border-black pt-10">
                ${article.content || "Gedetailleerde rapportage volgt."}
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
    document.getElementById('back-btn').onclick = () => loadView('home');
}

function loadView(viewName) {
    const main = document.getElementById('main-content');
    if (!main) return;
    main.innerHTML = '';
    
    const name = viewName.toLowerCase();

    // BELANGRIJK: Alleen 'archive' mag naar 'tpl-topics'. 
    // Portfolio moet naar zijn eigen template: 'tpl-portfolio'.
    const templateId = name === 'archive' ? 'tpl-topics' : `tpl-${name}`;
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        main.appendChild(tpl.content.cloneNode(true));
        if (name === 'home') renderHome();
        if (name === 'topics' || name === 'archive') renderTopics();
        
        // Zorg dat deze naam matcht met de functie onderaan
        if (name === 'portfolio') renderPortfolio();
    }
    lucide.createIcons();
}

function renderHome() {
    const fContainer = document.getElementById('featured-container');
    if (fContainer && data.featured) {
        fContainer.innerHTML = `
            <div class="md:col-span-2 border-r border-black relative border-b md:border-b-0">
                <img src="${data.featured.image}" alt="Featured" class="w-full h-full object-cover min-h-[300px]">
            </div>
            <div class="p-6 md:p
