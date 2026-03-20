export const aboutData = {
    title: "OVER HAZY STANDARD",
    date: "EDITORIAL MANIFEST",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200&auto=format&fit=crop", // Artistiek/Filmisch beeld
    intro: "Hazy Standard is een onafhankelijk platform op het snijvlak van actualiteit, reflectie en visuele storytelling. In een medialandschap gedomineerd door ruis, kiest Hazy Standard voor de essentie.",
    content: `
        <div class="space-y-12 text-gray-950">
            <section>
                <h3 class="text-3xl font-black uppercase border-b-4 border-black pb-2 italic text-red-600">Onafhankelijkheid, Kern en Verbinding</h3>
                <p class="text-xl leading-relaxed mt-6 font-medium">
                    Hazy Standard gelooft dat verhalen met een te grote verpakking de kern uit het oog verliezen. Wij strippen de ruis weg om tot de essentie te komen. Onze lezers en kijkers krijgen een zorgvuldige selectie van het belangrijkste nieuws, diepgaande documentaires en blogs die er echt toe doen.
                </p>
                <p class="text-xl leading-relaxed mt-4 font-bold">
                    Onze missie is simpel maar ambitieus: de wereld door middel van eerlijke informatie en oprechte verhalen beetje bij beetje mooier maken.
                </p>
            </section>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50 p-8 border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <div>
                    <h4 class="font-black uppercase text-sm mb-2 italic">De Visie</h4>
                    <p class="text-sm font-bold leading-snug">Wij staan alleen stevig in onze schoenen als we ruimte maken voor creativiteit, verbinding en — bovenal — bij onszelf blijven.</p>
                </div>
                <div>
                    <h4 class="font-black uppercase text-sm mb-2 italic">De Focus</h4>
                    <p class="text-sm font-bold leading-snug">Informatie moet terug naar de kern. Geen complexe verpakkingen, maar de onversneden kracht van het pure verhaal.</p>
                </div>
            </section>

            <section class="pt-8">
                <h3 class="text-3xl font-black uppercase border-b-4 border-black pb-2 italic">Over de Oprichtster</h3>
                <div class="flex flex-col md:flex-row gap-10 mt-8">
                    <div class="md:w-1/3">
                        <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" class="w-full grayscale border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]" alt="Daniëlle de Wilde">
                    </div>
                    <div class="md:w-2/3">
                        <h4 class="font-black uppercase text-xl mb-4">Daniëlle de Wilde</h4>
                        <p class="text-base leading-relaxed mb-4">
                            Als oprichtster (1990) coördineert Daniëlle de Wilde de volledige online aanwezigheid en de inhoudelijke koers van Hazy Standard. Vanuit een diepe overtuiging analyseert zij de wereld op zoek naar de meest relevante stukken en video's.
                        </p>
                        <p class="text-base leading-relaxed">
                            Als trotse moeder brengt zij een uniek perspectief naar haar werk: een focus op de toekomst en de wens om een positieve impact achter te laten. Wanneer zij niet analyseert, vindt zij haar balans in beweging en geniet zij volop van het leven.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    `
};

export const data = {
    featured: {
        title: "De Val van Commercieel Vastgoed: Een Systeemfout",
        excerpt: "Analyse van de leegstand in de Zuidas en de kettingreactie in de pensioenfondsen. De data wijst op een structurele overwaardering van 40%.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        author: "Studio",
        date: "19 MAART 2026"
    },
    videos:[
        {
            title: "Project Z: Verlaten Kantoorkolossen",
            duration: "14:20",
            thumb: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=600&auto=format&fit=crop",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
        },
        {
            title: "Grondstoftekorten in de Haven",
            duration: "08:45",
            thumb: "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=600&auto=format&fit=crop",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
        }
    ],
    analysis:[
        {
            title: "Inflatiecijfers Q1: De Verborgen Variabelen",
            date: "18 MRT 2026",
            intro: "Officiële cijfers tonen krimp, maar onze ruwe dataset wijst op stagflatie in de logistieke sector.",
            image: "https://images.unsplash.com/photo-1611974714024-462775bb3433?q=80&w=800", 
            tags: ["Economie", "Data"]
        },
        {
            title: "Onderwijshervorming 2026: Een Data-Audit",
            date: "20 MRT 2026",
            intro: "Nieuwe extracties uit het leerlingvolgsysteem laten een verontrustende trend zien in de basisvaardigheden.",
            content: "Hier typ je de volledige feitelijke analyse. Je kunt hier duizenden woorden kwijt.",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800", 
            tags: ["Onderwijs"]
        },
        {
            title: "Urbanisatie 2.0: De Vlucht uit de Stad",
            date: "12 MRT 2026",
            intro: "Demografische hittekaarten tonen een omkering van de trek naar de Randstad.",
            content: "Hier typ je de volledige feitelijke analyse.",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800", 
            tags: ["Vastgoed", "Maatschappij"]
        }
    ],
    rawData:[
        "19/03 08:30 - AEX opent -1.2% onder invloed van tech-correctie.",
        "18/03 16:45 - Faillissementen bouwsector +15% YoY.",
        "18/03 12:00 - ECB houdt rente ongewijzigd op 4.25%.",
        "17/03 09:15 - Koperprijzen bereiken 3-jarig dieptepunt.",
        "16/03 14:00 - Leegstandsindex kantoren Randstad stijgt naar 18.4%.",
        "15/03 10:30 - Werkloosheid stabiliseert, krapte IT-markt neemt af."
    ],
    topics:["Vastgoed", "Maatschappij", "Klimaat", "Economie", "Onderwijs"],
    
    portfolio: [
        {
            title: "Data-extractie Logistiek",
            date: "MAART 2026",
            intro: "Automatisering van rapportages voor transportbewegingen in de haven.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8ed745da33?q=80&w=800", 
            content: "Hier kun je de uitgebreide uitleg van je project kwijt."
        },
        {
            title: "Dashboarding Vastgoed",
            date: "FEBRUARI 2026",
            intro: "Visuele weergave van de leegstandscijfers in de Randstad.",
            image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=800", 
            content: "Details over de gebruikte parameters en bronnen."
        }
    ]
};
