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
            loadView(e.target.dataset.target);
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
    main.innerHTML = '';
    const templateId = viewName === 'archive' ? 'tpl-topics' : `tpl-${viewName}`;
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        main.appendChild(tpl.content.cloneNode(true));
        if (viewName === 'home') renderHome();
        if (viewName === 'topics' || viewName === 'archive') renderTopics();
        
        // STAP 1: Voeg deze regel toe om de portfolio te tekenen
        if (viewName === 'Portfolio') renderPortfolio();
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
            <div class="p-6 md:p-10 flex flex-col justify-center bg-white">
                <div class="text-xs font-bold uppercase mb-4 border-b border-black inline-block pb-1">${data.featured.author} // ${data.featured.date}</div>
                <h2 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight uppercase">${data.featured.title}</h2>
                <p class="text-lg font-semibold">${data.featured.excerpt}</p>
            </div>
        `;
    }

    const vContainer = document.getElementById('col-video');
    if (vContainer) {
        data.videos.forEach(v => {
            const vEl = document.createElement('div');
            vEl.className = 'border-b border-black p-4 group cursor-pointer';
            vEl.innerHTML = `
                <div class="relative w-full h-40 mb-3 bg-gray-200 border border-black overflow-hidden">
                    <img src="${v.thumb}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <i data-lucide="play-circle" class="text-white w-12 h-12"></i>
                    </div>
                </div>
                <h3 class="font-bold uppercase text-lg leading-tight">${v.title}</h3>
            `;
            vContainer.appendChild(vEl);
        });
    }

    const aContainer = document.getElementById('col-analysis');
    if (aContainer) {
        data.analysis.forEach(a => {
            const aEl = document.createElement('div');
            aEl.className = 'border-b border-black p-6 cursor-pointer hover:bg-gray-50 transition-none';
            aEl.innerHTML = `
                <div class="text-xs font-bold uppercase mb-2 text-gray-500">${a.date}</div>
                <h3 class="font-extrabold uppercase text-xl mb-3">${a.title}</h3>
                <p class="text-sm font-semibold">${a.intro}</p>
            `;
            aEl.onclick = () => openArticle(a);
            aContainer.appendChild(aEl);
        });
    }

    const rContainer = document.getElementById('col-raw');
    if (rContainer) {
        data.rawData.forEach(r => {
            const rEl = document.createElement('div');
            rEl.className = 'border-l-4 border-black pl-3 text-sm font-semibold py-1';
            rEl.textContent = r;
            rContainer.appendChild(rEl);
        });
    }
    lucide.createIcons();
}

function renderTopics() {
    const filterContainer = document.getElementById('topics-filters');
    const gridContainer = document.getElementById('topics-grid');
    if (!filterContainer || !gridContainer) return;
    
    filterContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'border border-black px-4 py-2 text-xs font-bold uppercase bg-black text-white';
    allBtn.textContent = 'ALLES';
    allBtn.onclick = () => renderTopicGrid('ALLES');
    filterContainer.appendChild(allBtn);

    data.topics.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'border border-black px-4 py-2 text-xs font-bold uppercase bg-white text-black';
        btn.textContent = t;
        btn.onclick = (e) => {
            Array.from(filterContainer.children).forEach(c => {
                c.classList.remove('bg-black', 'text-white');
                c.classList.add('bg-white', 'text-black');
            });
            e.target.classList.add('bg-black', 'text-white');
            renderTopicGrid(t);
        };
        filterContainer.appendChild(btn);
    });

    function renderTopicGrid(filter) {
        gridContainer.innerHTML = '';
        let items = data.analysis;
        if (filter !== 'ALLES') items = items.filter(a => a.tags && a.tags.includes(filter));
        
        items.forEach(a => {
            const el = document.createElement('div');
            el.className = 'border-r border-b border-black p-6 flex flex-col justify-between cursor-pointer hover:bg-gray-50';
            el.innerHTML = `
                <div>
                    <h3 class="font-extrabold uppercase text-2xl mb-4 leading-tight">${a.title}</h3>
                    <p class="text-sm font-semibold mb-6">${a.intro}</p>
                </div>
                <div class="text-xs font-bold uppercase border-t border-black pt-2">${a.date}</div>
            `;
            el.onclick = () => openArticle(a);
            gridContainer.appendChild(el);
        });
    }
    renderTopicGrid('ALLES');
}

// STAP 2: Voeg deze nieuwe functie onderaan toe
function renderportfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !data.portfolio) return;

    grid.innerHTML = ''; 

    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'p-8 border-r border-b border-black hover:bg-gray-50 cursor-pointer transition-colors';
        el.innerHTML = `
            <div class="text-[10px] font-bold uppercase text-gray-400 mb-2">${item.date}</div>
            <h3 class="text-xl font-extrabold uppercase mb-4 leading-tight">${item.title}</h3>
            <p class="text-sm font-semibold text-gray-700">${item.intro}</p>
        `;
        // Zorg dat deze ook een artikel opent als je erop klikt
        el.onclick = () => openArticle(item);
        grid.appendChild(el);
    });
}
