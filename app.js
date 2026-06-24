import { data } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    setDate();
    setupNavigation();
    
    // Laad de footer direct bij het opstarten
    loadFooter();
    
    // Start de pagina
    loadView('home');
});

// Functie om de footer dynamisch te laden
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById('footer-container');
            if (container) {
                container.innerHTML = html;
                
                // Activeer iconen in de zojuist geladen footer
                if (window.lucide) lucide.createIcons();

                // FIX: Dwing MailerLite om het formulier in de nieuwe HTML te laden
                if (typeof ml !== 'undefined') {
                    ml('webforms', 'load', '8Qhza5');
                }
            }
        })
        .catch(err => console.error('Fout bij laden footer:', err));
}

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

function openArticle(article) {
    const main = document.getElementById('main-content');
    const related = data.analysis.filter(a => a.title !== article.title).slice(0, 3);

    main.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white min-h-screen border-x border-black">
            </div>
    `;
    // ... rest van je openArticle logica
    if (window.lucide) lucide.createIcons();
}

function loadView(viewName) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(`tpl-${viewName}`);
    main.innerHTML = '';
    if (template) {
        main.appendChild(template.content.cloneNode(true));
        if (viewName === 'home') renderHome();
        if (window.lucide) lucide.createIcons();
    } else {
        renderHome(); 
    }
}

function renderHome() {
    // ... (jouw renderHome functies zoals featured, video, etc.)
}

// ... (overige functies zoals renderTopics, renderPortfolio, updateSEO blijven staan)
