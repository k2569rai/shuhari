function setLang(lang) {
    let t;
    if (lang === 'ja') t = translationsJa;
    else if (lang === 'de') t = translationsDe;
    else t = translationsEn; // デフォルトは英語
    
    // 1. HERO セクションの更新
    document.getElementById('h-date').innerText = t.hero.date;
    document.getElementById('h-entry').innerText = t.hero.entry;
    document.getElementById('h-venue').innerHTML = t.hero.venue;
    
    // リンクの更新
    const registerBtn = document.getElementById('h-btn');
    if (registerBtn) {
        registerBtn.innerText = t.hero.btn;
        registerBtn.href = t.hero.url; 
        console.log("Link updated to:", t.hero.url);
    }
    
    document.getElementById('h-img').src = t.hero.img;

    // 2. VISION セクションの更新
    document.getElementById('v-main').innerHTML = t.vision.main;
    document.getElementById('v-sub').innerText = t.vision.sub;

    // 3. CONCEPT セクションの更新
    document.getElementById('c-title').innerText = t.concept.title;
    document.getElementById('c-body').innerHTML = t.concept.body;

    // 4. 動的リストの描画
    renderArtists(t.artists.list);
    renderSchedule(t.schedule.events);

    // SNSリンクの描画（ヘッダーとフッター両方）
    const socialHtml = `
        <a href="${t.social.instagram}" target="_blank" class="hover:opacity-50 transition-opacity">
            <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="${t.social.facebook}" target="_blank" class="hover:opacity-50 transition-opacity">
            <i class="fa-brands fa-facebook"></i>
        </a>
    `;

    document.getElementById('header-social').innerHTML = socialHtml;
    document.getElementById('footer-social').innerHTML = socialHtml;
    
    document.documentElement.lang = lang;
    localStorage.setItem('shuhari-lang', lang);
}

// アーティスト一覧を描画する関数
function renderArtists(list) {
    const grid = document.getElementById('artists-grid');
    if (!grid) return;

    grid.innerHTML = list.map(a => {
        // ここでデータの "color" に合わせてホバー時のクラスを変える
        let hoverClass = 'hover:bg-black'; // デフォルト
        if (a.color === 'shu') hoverClass = 'hover:bg-[#3F51B5]'; // 守 (青)
        if (a.color === 'ha')  hoverClass = 'hover:bg-[#D32F2F]'; // 破 (赤)
        if (a.color === 'ri')  hoverClass = 'hover:bg-[#4CAF50]'; // 離 (緑)

        return `
            <div class="artist-card p-10 flex flex-col justify-end grid-line-r grid-line-b min-h-[400px] transition-all duration-500 ${hoverClass} hover:text-white group relative cursor-pointer bg-white">
                <img src="${a.img}" class="absolute inset-0 p-16 object-contain opacity-10 group-hover:opacity-50 transition-all duration-500 pointer-events-none">
                
                <div class="relative z-10">
                    <span class="text-[10px] font-bold uppercase tracking-widest">${a.id} / ${a.cat}</span>
                    <h3 class="text-3xl font-black leading-none">${a.name}</h3>
                    <p class="text-xs mt-3 opacity-60">${a.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

// スケジュール一覧を描画する関数
function renderSchedule(events) {
    const list = document.getElementById('schedule-list');
    if (!list) return;
    list.innerHTML = events.map(e => `
        <div class="flex justify-between border-b border-black/10 py-5">
            <span class="font-mono text-sm">${e.time}</span>
            <span class="font-bold">${e.name}</span>
        </div>
    `).join('');
}

function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    setLang('en'); // 初期言語を英語に
});