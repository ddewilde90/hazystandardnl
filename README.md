# 📑 Hazy Standard Control Center

## 🚀 Nieuw Artikel Sjabloon
Kopieer dit blok en plak het in `data.js` onder de sectie `analysis: [`. 
Vergeet de komma aan het einde niet als er nog een artikel onder komt!

```javascript
{
    id: "dossier-${new Date().getTime()}", 
    date: "${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}",
    title: "HIER DE TITEL",
    image: "./images/jouw-afbeelding.jpg",
    intro: "Schrijf hier de vette, schuine introductie van 2-3 zinnen.",
    content: `
        <p class="mb-6">Start hier de feitelijke analyse...</p>
        
        <h3 class="text-2xl font-black uppercase mt-12 mb-4 italic border-b-2 border-black pb-2">01. Analyse</h3>
        <p class="mb-6">Inhoud van het eerste hoofdstuk...</p>

        <blockquote class="border-l-4 border-red-600 pl-6 my-10 italic font-bold text-xl text-gray-900">
            "Plaats hier een belangrijk citaat of kernpunt."
        </blockquote>

        <h3 class="text-2xl font-black uppercase mt-12 mb-4 italic border-b-2 border-black pb-2">02. Conclusie</h3>
        <p>Afsluitende feiten en volgende stappen.</p>
    `
},
