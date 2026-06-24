// --- In je app.js ---

document.addEventListener('DOMContentLoaded', () => {
    // Check welke pagina we zijn op basis van het aanwezige grid-element in de HTML
    if (document.getElementById('topics-grid')) renderTopics();
    if (document.getElementById('portfolio-grid')) renderPortfolio();
    
    // Voer algemene functies uit
    if (window.lucide) lucide.createIcons();
    setDate();
    setupNavigation();
});

// Specifieke render functie voor Verhalen
function renderTopics() {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    data.analysis.forEach(a => {
        const el = document.createElement('div');
        // 'border-r border-b' zorgt voor de raster-lijnen, container in HTML krijgt border-l/t
        el.className = 'border-r border-b border-black flex flex-col cursor-pointer hover:bg-gray-50 group bg-white';
        
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${a.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
            </div>
            <div class="p-8 flex flex-col flex-grow">
                <h3 class="font-extrabold uppercase text-xl mb-4 leading-tight">${a.title}</h3>
                <p class="text-sm font-semibold mb-6 text-gray-700 line-clamp-3">${a.intro}</p>
                <div class="text-[10px] font-bold uppercase border-t border-black pt-4 mt-auto">${a.date}</div>
            </div>
        `;
        el.onclick = () => openArticle(a);
        grid.appendChild(el);
    });
}

// Specifieke render functie voor Portfolio
function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !data.portfolio) return;
    grid.innerHTML = ''; 
    
    data.portfolio.forEach(item => {
        const el = document.createElement('div');
        el.className = 'border-r border-b border-black flex flex-col hover:bg-gray-50 cursor-pointer group bg-white';
        
        el.innerHTML = `
            <div class="aspect-video w-full overflow-hidden border-b border-black">
                <img src="${item.image || 'placeholder.jpg'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
            </div>
            <div class="p-8">
                <h3 class="text-xl font-extrabold uppercase mb-4">${item.title}</h3>
                <p class="text-sm font-semibold text-gray-700 line-clamp-2">${item.intro}</p>
            </div>
        `;
        el.onclick = () => openArticle(item);
        grid.appendChild(el);
    });
}
