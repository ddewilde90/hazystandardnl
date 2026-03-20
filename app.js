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
            // We zetten de target om naar kleine letters om matches met templates te garanderen
            const target = e.target.dataset.target.toLowerCase();
            loadView(target);
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
    const templateId = name === 'archive' ? 'tpl-topics' : `tpl-${name}`;
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        main.appendChild(tpl.content.cloneNode(true));
        
        // Roep de juiste teken-functies aan op basis van de pagina
        if (name === 'home') renderHome();
        if (name === 'topics' || name === 'archive') renderTopics();
        if (name === 'portfolio') renderPortfolio(); 
    }
    lucide.
