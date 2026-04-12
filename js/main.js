function setLang(lang) {
    const t = lang === 'ja' ? translationsJa : translationsEn;
    
    // Vision
    document.getElementById('v-main').innerHTML = t.vision.main;
    document.getElementById('v-sub').innerText = t.vision.sub;
    document.getElementById('v-img').src = t.vision.img;

    // Concept
    document.getElementById('c-title').innerText = t.concept.title;
    document.getElementById('c-body').innerHTML = t.concept.body;

    // Artists
    const artistsContainer = document.getElementById('artists-grid');
    artistsContainer.innerHTML = t.artists.list.map(a => `
        <div class="artist-card card-${a.color} p-10 flex flex-col justify-end grid-line-r grid-line-b">
            <img src="${a.img}" class="artist-img-bg">
            <div class="relative z-10">
                <span class="text-[10px] font-bold uppercase tracking-widest">${a.id} / ${a.cat}</span>
                <h3 class="text-2xl font-black">${a.name}</h3>
                <p class="text-xs mt-2 opacity-60">${a.desc}</p>
            </div>
        </div>
    `).join('');

    // Schedule
    document.getElementById('schedule-list').innerHTML = t.schedule.events.map(e => `
        <div class="flex justify-between border-b border-black/10 py-4">
            <span class="font-mono text-sm">${e.time}</span>
            <span class="font-bold">${e.name}</span>
        </div>
    `).join('');

    // Access
    document.getElementById('access-info').innerHTML = `
        <p class="text-3xl font-black">${t.access.venue}</p>
        <p class="text-sm opacity-50">${t.access.address}</p>
        <p class="text-xs mt-4 font-bold text-ha">${t.access.note}</p>
    `;

    document.documentElement.lang = lang;
}

function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => setLang('ja'));