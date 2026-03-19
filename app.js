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
            <h2 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight uppercase">${data.featured.title}</h2>
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
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <i data-lucide="play-circle" class="text-white w-12 h-12"></i>
                </div>
                <div class="absolute bottom-2 right-2 bg-black text-white text-xs font-bold px-2 py-1">${v.duration}</div>
            </div>
            <h3 class="font-bold uppercase text-lg">${v.title}</h3>
        `;
        vContainer.appendChild(vEl);
    });


    document.querySelectorAll('.video-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            this.innerHTML = `<video src="${url}" controls autoplay class="w-full h-full object-cover border border-black"></video>`;
        });
    });


    const aContainer = document.getElementById('col-analysis');
    data.analysis.forEach(a => {
        const aEl = document.createElement('div');
        aEl.className = 'border-b border-black p-6';
        aEl.innerHTML = `
            <div class="text-xs font-bold uppercase mb-2 text-gray-500">${a.date}</div>
            <h3 class="font-extrabold uppercase text-xl mb-3">${a.title}</h3>
            <p class="text-sm font-semibold">${a.intro}</p>
        `;
        aContainer.appendChild(aEl);
    });


    const rContainer = document.getElementById('col-raw');
    data.rawData.forEach(r => {
        const rEl = document.createElement('div');
        rEl.className = 'border-l-4 border-black pl-3 text-sm font-semibold py-1';
        rEl.textContent = r;
        rContainer.appendChild(rEl);
    });

    lucide.createIcons();
}

function renderTopics() {
    const filterContainer = document.getElementById('topics-filters');
    const gridContainer = document.getElementById('topics-grid');
    

    const allBtn = document.createElement('button');
    allBtn.className = 'border border-black px-4 py-2 text-xs font-bold uppercase bg-black text-white hover:bg-black hover:text-white';
    allBtn.textContent = 'ALLES';
    allBtn.onclick = () => renderTopicGrid('ALLES');
    filterContainer.appendChild(allBtn);

    data.topics.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'border border-black px-4 py-2 text-xs font-bold uppercase bg-white text-black hover:bg-black hover:text-white';
        btn.textContent = t;
        btn.onclick = (e) => {
            Array.from(filterContainer.children).forEach(c => {
                c.classList.remove('bg-black', 'text-white');
                c.classList.add('bg-white', 'text-black');
            });
            e.target.classList.add('bg-black', 'text-white');
            e.target.classList.remove('bg-white', 'text-black');
            renderTopicGrid(t);
        };
        filterContainer.appendChild(btn);
    });

    function renderTopicGrid(filter) {
        gridContainer.innerHTML = '';
        let items = data.analysis;
        if (filter !== 'ALLES') {
            items = items.filter(a => a.tags.includes(filter));
        }
        
        items.forEach(a => {
            const el = document.createElement('div');
            el.className = 'border-r border-b border-black p-6 flex flex-col justify-between';
            el.innerHTML = `
                <div>
                    <div class="flex space-x-2 mb-3">
                        ${a.tags.map(tag => `<span class="bg-black text-white text-[10px] px-2 py-1 uppercase font-bold">${tag}</span>`).join('')}
                    </div>
                    <h3 class="font-extrabold uppercase text-2xl mb-4 leading-tight">${a.title}</h3>
                    <p class="text-sm font-semibold mb-6">${a.intro}</p>
                </div>
                <div class="text-xs font-bold uppercase border-t border-black pt-2">${a.date}</div>
            `;
            gridContainer.appendChild(el);
        });
    }

    renderTopicGrid('ALLES');
}
