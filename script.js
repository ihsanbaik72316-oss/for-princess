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
    if (pw.toLowerCase() === 'boneka mampang') {
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
    "Haloo Lembayuuungg... ✨\n",
    "Gua cuma mau bilang makasih banyak buat semuanya. Gua bener-bener ga nyangka kita bakal bisa temenan sedeket ini.",
    "Dari yang awalnya gua kira lu cuma mau curhat, sampai akhirnya lu jadi orang yang masuk ke second account gua.\n",
    "Gua juga ga expect bakal ketemu cewe yang sefrekuensi begini. Yang sabar banget kalau gua lagi mode iseng, yang selalu bisa bikin gua ketawa ngakak, dan selalu nanggepin yappingan gua yang agak laen wkwk.\n",
    "Jujur, ngobrol sama lu itu seru banget! Apalagi pas lagi gibah bareng wkwk. Lu selalu bisa diajak ngobrolin apa aja dan terbukti ampuh bikin mood gua langsung naik drastis.",
    "Kalau gua ga ketemu lu, gua gabakal tahu tuh yang namanya typing huruf kecil semua, typing 'hmmzz', atau typing 'stres tapi ok' wkwk.\n",
    "Walaupun lu orangnya cerewet, ngeselin, kadang pemarah, kecanduan video JJ, dan suka ngehayal (apalagi kalau udah velocity cute kayak boneka mampang 😭), tapi gua suka kok!\n",
    "Oya, gua mau minta maaf ya kalau selama ini sering bikin lu marah, bad mood, atau kalau ada ketikan gua yang sempat nyakitin hati lu. IM SORRY BANGET, maafin ya Princess... 🙏👑\n",
    "Btw, kita masih ada 3 tahun lagi di Al-Kahfi. Jujur gua males banget bayangin PETA, mukhoyyam, LDK, dan kawan-kawannya.",
    "Tapi kayaknya kalau ngelewatin itu bareng lu lagi, gua bakal semangat 10000% (apalagi kalau disemangatin terus wkwk).\n",
    "Semoga nanti pas Nevastra kedatangan anak baru, kita tetep bisa kayak gini ya. Tenang aja, gua bakal tetep stay dan gabakal kemana-mana.",
    "Udah ah, kepanjangan nanti lu pegel bacanya wkwk.\n",
    "Dah, sekian dari polisi kecil. Bye! 🌟"
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
