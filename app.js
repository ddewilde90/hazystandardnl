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
            <div class="flex gap-2 mb-10">
                ${article.tags.map(tag => `<span class="bg-black text-white text-[10px] px-2 py-1 uppercase font-bold">${tag}</span>`).join('')}
            </div>
            <div class="prose max-w-none text-lg leading-relaxed font-medium">
                ${article.content || article.intro}
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
    }
}

function renderHome() {
    const fContainer = document.getElementById('featured-container');
    fContainer.innerHTML = `
        <div class="md:col-span-2 border-r border-black relative border-b md:border-b-0">
            <img src="${data.featured.image}" alt="Featured" class="w-full h-full object-cover min-h-[300px]">
        </div>
        <div class="p-6 md:p-10 flex flex-col justify-center bg-white">
            <div class="text-xs font-bold uppercase mb-4 border-b border-black inline-block pb-1">${data.featured.author} // ${data.featured.date}</div>
            <h2 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight uppercase cursor-pointer hover:underline">${data.featured.title}</h2>
            <p class="text-lg font-semibold">${data.featured.excerpt}</p>
        </div>
    `;

    const vContainer = document.getElementById('col-video');
    data.videos.forEach(v => {
        const vEl = document.createElement('div');
        vEl.className = 'border-b border-black p-4 group cursor-pointer';
        vEl.innerHTML = `
            <div class="relative w-full h-40 mb-3 bg-gray-200 border border-black video-thumb" data-url="${v.videoUrl}">
                <img src="${v.thumb}" class="w-full h-full object-cover">
                <div class="absolute inset
