// DOM Elements
const music = document.getElementById('bg-music');
const loadingText = document.getElementById('loading-text');
const passwordInput = document.getElementById('password-input');
const loginHint = document.getElementById('login-hint');
const typewriterText = document.getElementById('typewriter-text');
const btnContinue = document.getElementById('btn-continue');
const darkText = document.getElementById('dark-text');
const btnNo = document.getElementById('btn-no');
const secretText = document.getElementById('secret-text');

let loginAttempts = 0;

// Helper to switch screens
function switchScreen(fromId, toId, delay = 0) {
    setTimeout(() => {
        document.getElementById(fromId).classList.remove('active');
        document.getElementById(toId).classList.add('active');
    }, delay);
}

// 1. Loading Sequence
window.addEventListener('DOMContentLoaded', () => {
    const sequence = [
        { text: "Kingdom of Lembayung...", time: 1000 },
        { text: "Initializing...", time: 2500 },
        { text: "Searching for Princess...", time: 4000 },
        { text: "Princess Found.", time: 5500 }
    ];

    sequence.forEach(step => {
        setTimeout(() => { loadingText.innerText = step.text; }, step.time);
    });

    switchScreen('screen-loading', 'screen-login', 7000);
});

// 2. Login Logic
document.getElementById('btn-login').addEventListener('click', () => {
    const pw = passwordInput.value.trim();
    // Kamu bisa ganti password-nya di sini sesukamu
    if (pw.toLowerCase() === 'lembayung' || pw === 'princess') {
        music.play().catch(e => console.log("Audio play deferred"));
        switchScreen('screen-login', 'screen-gate');
        
        // Gate Opening Animation
        setTimeout(() => {
            document.getElementById('screen-gate').classList.add('gate-open');
            switchScreen('screen-gate', 'screen-garden', 2000);
            startSakura();
        }, 1500);

    } else {
        loginAttempts++;
        if (loginAttempts === 1) loginHint.innerText = "Hmm... kayaknya bukan Princess deh.";
        else if (loginAttempts === 2) loginHint.innerText = "Princess lupa passwordnya sendiri? 🤨";
        else loginHint.innerText = "Gapapa... rakyat juga sering lupa kok. 😭";
    }
});

// 3. Sakura Effect
function startSakura() {
    const container = document.getElementById('sakura-bg');
    for (let i = 0; i < 30; i++) {
        let petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.width = Math.random() * 10 + 10 + 'px';
        petal.style.height = Math.random() * 10 + 10 + 'px';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.animationDuration = Math.random() * 3 + 4 + 's';
        container.appendChild(petal);
    }
}

// 4. Envelope Click
document.getElementById('envelope').addEventListener('click', function() {
    this.style.transform = "translateY(50px) scale(0.9)";
    this.querySelector('.flap').style.transform = "rotateX(180deg)";
    this.querySelector('.flap').style.zIndex = "1";
    
    switchScreen('screen-garden', 'screen-letter', 1200);
    setTimeout(startTypewriter, 2000);
});

// 5. Letter Typewriter Effect
const letterParagraphs = [
    "Hai Princess Lembayung.\n",
    "Sebenernya surat ini ga dibuat karena ada acara khusus.",
    "Ga juga karena hari spesial.\n",
    "Gua cuma kepikiran...",
    "Kayaknya ada beberapa hal yang pengen gua ucapin.",
    "Walaupun sederhana.\n",
    "Makasih ya. Makasih karena udah hadir.",
    "Mungkin buat lu... kehadiran lu biasa aja.",
    "Tapi tanpa sadar... hari-hari gua jadi lebih berwarna sejak kenal sama lu.\n",
    "Kadang cuma ngobrol bentar.",
    "Kadang becanda random.",
    "Kadang saling ganggu.",
    "Kadang cuma kirim meme ga jelas.",
    "Tapi anehnya... itu cukup bikin hari gua lebih seru.\n",
    "Makasih juga... karena udah jadi diri lu sendiri.",
    "Karena menurut gua... justru sifat lu yang random, ceria, kadang nyebelin dikit, dan suka bikin orang ketawa... itu yang bikin lu beda.\n",
    "Semoga semua hal baik selalu dateng ke hidup lu.",
    "Semoga apa pun yang lagi lu perjuangin bisa berhasil.",
    "Semoga kalau lagi capek... selalu ada alasan buat senyum lagi.\n",
    "Dan semoga... Princess Lembayung selalu diperlakukan dengan baik.",
    "Karena menurut gua... Princess memang pantas diperlakukan dengan baik.\n",
    "Dan terakhir... Makasih ya. Udah hadir.",
    "Mungkin lu ga sadar. Tapi kehadiran lu bikin beberapa hari seseorang jadi lebih indah.\n",
    "Dari salah satu rakyat."
];

function startTypewriter() {
    let pIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (pIndex < letterParagraphs.length) {
            if (charIndex < letterParagraphs[pIndex].length) {
                typewriterText.innerHTML += letterParagraphs[pIndex].charAt(charIndex);
                charIndex++;
                typewriterText.scrollTop = typewriterText.scrollHeight;
                setTimeout(type, 35);
            } else {
                typewriterText.innerHTML += "\n";
                pIndex++;
                charIndex = 0;
                setTimeout(type, 500); // jeda antar paragraf
            }
        } else {
            btnContinue.classList.remove('hidden');
        }
    }
    type();
}

// 6. Continue to Intermission
btnContinue.addEventListener('click', () => {
    document.getElementById('screen-letter').classList.remove('active');
    const darkScreen = document.getElementById('screen-dark');
    darkScreen.classList.add('active');
    
    setTimeout(() => { darkText.style.opacity = 1; }, 1000);
    setTimeout(() => { darkText.innerText = "Belum selesai."; }, 3000);
    setTimeout(() => {
        darkScreen.classList.remove('active');
        document.getElementById('screen-easter').classList.add('active');
    }, 5000);
});

// 7. Easter Egg (Runaway Button "Engga")
function moveButton() {
    const x = Math.random() * (window.innerWidth - btnNo['offsetWidth'] - 40);
    const y = Math.random() * 100 - 50; // bergerak di area tombol
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}
btnNo.addEventListener('mouseenter', moveButton);
btnNo.addEventListener('click', moveButton);

// "Iya" Button Click -> Achievement
document.getElementById('btn-yes').addEventListener('click', () => {
    switchScreen('screen-easter', 'screen-achievement');
});

// 8. Secret Screen Logic
const secretParagraphs = [
    "Sebenernya...",
    "Surat ini... ga dikirim sama kerajaan.",
    "Yang bikin... cuma satu rakyat.",
    "Yang pengen ngucapin... makasih.",
    "Karena Princess Lembayung... udah hadir."
];

document.getElementById('btn-secret').addEventListener('click', () => {
    switchScreen('screen-achievement', 'screen-secret');
    setTimeout(startSecretSequence, 1000);
});

function startSecretSequence() {
    let index = 0;
    function showText() {
        if (index < secretParagraphs.length) {
            secretText.style.opacity = 0;
            setTimeout(() => {
                secretText.innerText = secretParagraphs[index];
                secretText.style.opacity = 1;
                index++;
                setTimeout(showText, 3000);
            }, 500);
        } else {
            switchScreen('screen-secret', 'screen-ending', 1500);
        }
    }
    // inject transition css dynamically
    secretText.style.transition = "opacity 0.5s ease-in-out";
    showText();
}

// 9. Ending -> Final Version
document.getElementById('btn-leave').addEventListener('click', () => {
    document.getElementById('screen-ending').classList.remove('active');
    document.getElementById('screen-final').classList.add('active');
    
    // Fade out music
    let fadeAudio = setInterval(() => {
        if (music.volume > 0.05) {
            music.volume -= 0.05;
        } else {
            music.pause();
            clearInterval(fadeAudio);
        }
    }, 1500);
});
