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

// Verbeterde loadView met SEO-integratie
function loadView(viewName) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(`tpl-${viewName}`);
    
    main.innerHTML = '';
    
    if (template) {
        main.appendChild(template.content.cloneNode(true));
        
        // Update SEO bij het wisselen van views
        updateSEO(viewName);

        if (viewName === 'home') renderHome();
        if (viewName === 'topics') renderTopics();
        if (viewName === 'portfolio') renderPortfolio();
        
        if (window.lucide) lucide.createIcons();
    } else {
        renderHome(); 
    }
}

function updateSEO(pageName) {
    const seoConfig = {
        home: { title: "Hazy Standard | Onafhankelijke Business Intelligence", description: "Hazy Standard biedt onafhankelijke business intelligence. Wij zoeken de feiten achter de data." },
        topics: { title: "Verhalen | Hazy Standard", description: "Diepgaande rapportages en analyses over actuele thema's." },
        about: { title: "Over Hazy Standard | Daniëlle de Wilde", description: "Informatie over onze methode en de drijfveren achter Hazy Standard." },
        contact: { title: "Contact | Hazy Standard", description: "Directe lijnen met Hazy Standard." },
        portfolio: { title: "Portfolio | Projecten & Cases", description: "Bekijk onze gerealiseerde projecten en business intelligence cases." }
    };

    const config = seoConfig[pageName] || seoConfig.home;
    document.title = config.title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = config.description;
}

// ... Hieronder laat je jouw functies openArticle, renderHome, renderTopics, etc. staan.
// (Deze hoeven niet te veranderen, ze zijn correct!)
