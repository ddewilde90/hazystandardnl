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

// --- DE NIEUWE OPENARTICLE FUNCTIE (NOS STIJL) ---
function openArticle(article) {
    const main = document.getElementById('main-content');
    
    main.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white min-h-screen border-x border-black">
            
            <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden border-b border-black">
                <img src="${article.image || 'placeholder.jpg'}" 
                     class="w-full h-full object-cover grayscale" alt="${article.title}">
                <div class="absolute bottom-0 left-0 bg-black text-white px-4 py-2 text-[10px] uppercase font-bold">
                    Beeld: Studio / Unsplash
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-0">
                
                <div class="lg:col-span-3 p-6 md:p-16 border-r border-black">
                    <button id="back-btn" class="mb-10 border border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center gap-2">
                        ← Terug naar overzicht
                    </button>

                    <div class="text-xs font-bold uppercase mb-4 text-gray-500">${article.date}</div>
                    <h1 class="text-4xl md:text-6xl font-extrabold uppercase mb-8 leading-tight italic">${article.title}</h1>
                    
                    <div class="flex gap-4 mb-10 border-y border-gray-100 py-4">
                        <span class="text-[10px] font-bold uppercase self-center mr-2 text-gray-400">Deel dit:</span>
                        <div class="w-8 h-8 rounded-full border border-black flex items-center justify-center cursor-pointer hover:bg-green-500 hover:text-white transition-colors">
                            <i data-lucide="message-circle" class="w-4 h-4"></i>
                        </div>
                        <div class="w-8 h-8 rounded-full border border-black flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
                            <i data-lucide="facebook" class="w-4 h-4"></i>
                        </div>
                        <div class="w-8 h-8 rounded-full border border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
                            <i data-lucide="twitter" class="w-4 h-4"></i>
                        </div>
                    </div>

                    <div class="prose max-w-none text-xl leading-relaxed font-semibold mb-10 border-l-4 border-black pl-6">
                        ${article.intro}
                    </div>
                    
                    <div class="prose max-w-none text-lg leading-relaxed font-medium mb-20">
                        ${article.content || "Gedetailleerde feitelijke analyse volgt."}
                    </div>

                    <div class="border-t-2 border-black pt-10">
                        <h4 class="text-sm font-bold uppercase mb-6 tracking-widest">Lees ook:</h4>
                        <div id="related-articles" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            </div>
                    </div>
                </div>

                <div class="lg:col-span-1 bg-gray-50 p-6 flex flex-col gap-8">
                    <div class="sticky top-10">
                        <div class="border border-gray-300 bg-white p-4 h-[400px] flex flex-col items-center justify-center text-gray-300 text-center uppercase font-bold text-xs">
                            <span class="mb-4">Advertentie</span>
                            <div class="w-full h-px bg-gray-100 mb-4"></div>
                            <i data-lucide="layout" class="w-10 h-10 mb-2"></i>
                            <span>Space for Rent</span>
                        </div>
                        
                        <div class="mt-10 border border-black p-4 bg-black text-white text-[10px] font-bold uppercase text-center">
                            Premium Analyse<br>Abonnement v.a. €5,-
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    renderRelated();
    window.scrollTo(0, 0);
    document.getElementById('back-btn').onclick = () => loadView('topics');
    lucide.createIcons();
}

// --- HULPFUNCTIE VOOR GERELATEERDE ARTIKELEN ---
function renderRelated() {
    const container = document.getElementById('related-articles');
    if (!container) return;
    
    // We pakken de eerste 2 analyses uit je data.js
    const related = data.analysis.slice(0, 2); 
    
    related.forEach(item => {
        const div = document.createElement('div');
        div.className = 'group cursor-pointer border border-black overflow-hidden bg-white';
        div.innerHTML = `
            <div class="aspect-video overflow-hidden border-b border-black">
                <img src="${item.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
            </div>
            <div class="p-4">
                <h5 class="font-extrabold uppercase text-sm group-hover:underline">${item.title}</h5>
            </div>
        `;
        div.onclick = () => openArticle(item);
        container.appendChild(div);
    });
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
        if (viewName === 'portfolio') renderPortfolio();
    }
    lucide.createIcons();
}

function renderHome() {
    const fContainer = document.getElementById('featured-container');
    if (fContainer && data.featured) {
        fContainer.innerHTML = `
            <div class="md:col-span-2 border-r border-black relative border-b md:border-b-0">
                <img src="${data.featured.image}" alt="Featured" class="w-full h-full object-cover min-h-[400px] grayscale">
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
        vContainer.innerHTML = '';
        data.videos.forEach(v => {
            const vEl = document.createElement('div');
            vEl.className = 'border-b border-black p-4 group cursor-pointer';
            vEl.innerHTML = `
                <div class="relative w-full h-40 mb-3 bg-gray-200 border border-black overflow-hidden">
                    <img src="${v.thumb}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
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
        aContainer.innerHTML = '';
        data.analysis.slice(0, 3).forEach(a => {
            const aEl = document.createElement('div');
            aEl.className = 'border-b border-black p-6 cursor-pointer hover:bg-gray-50 transition-none';
            aEl.innerHTML = `
                <div class="text-xs font-bold uppercase mb-2 text-gray-500">${a.date}</div>
                <h3 class="font-extrabold uppercase text-xl mb-3">${a.title}</h3>
                <p class="text-sm font-semibold line-clamp-2">${a.intro}</p>
            `;
            aEl.onclick = () => openArticle(a);
            aContainer.appendChild(aEl);
        });
    }

    const rContainer = document.getElementById('col-raw');
    if (rContainer && data.rawData) {
        rContainer.innerHTML = '';
        data.rawData.forEach(r => {
            const rEl = document.createElement('div');
            rEl.className = 'border-l-4 border-black pl-3 text-sm font-semibold py-2 mb-4';
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
    const categories = ['ALLES', ...data.topics];
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `border border-black px-4 py-2 text-xs font-bold uppercase ${cat === 'ALLES' ? 'bg-black text-white' : 'bg-white text-black'}`;
        btn.textContent = cat;
        btn.onclick = (e) => {
            Array.from(filterContainer.children).forEach(c => {
                c.classList.remove('bg-black', 'text-white');
                c.classList.add('bg-white', 'text-black');
            });
            e.target.classList.add('bg-black', 'text-white');
            renderTopicGrid(cat);
        };
        filterContainer.appendChild(btn);
    });

    function renderTopicGrid(filter) {
        gridContainer.innerHTML = '';
        let items = data.analysis;
        if (filter !== 'ALLES') items = items.filter(a => a.tags && a.tags.includes(filter));
        
        items.forEach(a => {
            const el = document.createElement('div');
            el.className = 'border border-black flex flex-col cursor-pointer hover:bg-gray-50 group transition-all overflow-hidden bg-white';
            el.innerHTML = `
                <div class="aspect-video w-full overflow-hidden border-b border-black">
                    <img src="${a.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
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
    renderTopicGrid('ALLES');
}

function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !data.portfolio) return;
    grid.innerHTML = ''; 
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border border-black flex flex-col hover:bg-gray-50 cursor-pointer group transition-all bg-white';
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${item.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
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
