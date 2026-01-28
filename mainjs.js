// 1. Initialize AOS
AOS.init({ duration: 1200, once: true });

// 2. Scroll Progress
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

// 3. Date Counter (Dec 24, 2024)
const startDate = new Date(2024, 11, 24); 
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    if(diff >= 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("timer").innerText = days;
    }
}
updateTimer();

// 4. Typewriter Effect
const texts = ["My Favorite Duo.", "The Best Healer.", "My Forever Player 2."];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) { count = 0; }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    document.getElementById("typing-text").textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Wait before next phrase
    } else {
        setTimeout(type, 100);
    }
}());

// 5. Reasons Generator
const reasons = [
    "Because your voice is my favorite sound.",
    "Because you carry me in Valorant (sometimes).",
    "Because you make ordinary days feel special.",
    "Because you get my weird sense of humor.",
    "Because of the way you say 'hello'.",
    "Because you are the prettiest girl in the world.",
    "Because you are my safe space.",
    "Because even in silence, I feel connected to you."
];
document.getElementById('generateBtn').addEventListener('click', function() {
    const random = Math.floor(Math.random() * reasons.length);
    document.getElementById('reasonDisplay').innerText = reasons[random];
    document.getElementById('reasonDisplay').style.color = "#ff2a6d";
});

// 6. Canvas Stardust Effect (Background)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 42, 109, ${Math.random() * 0.5})`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01; // Fade out
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        // Reset particle if too small
        if (particlesArray[i].size <= 0.2) {
            particlesArray[i].x = Math.random() * canvas.width;
            particlesArray[i].y = Math.random() * canvas.height;
            particlesArray[i].size = Math.random() * 3;
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 7. Music Player
const playBtn = document.getElementById('playPauseBtn');
const audio = document.getElementById('bgMusic');
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        document.querySelector('.equalizer').style.opacity = '1';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.equalizer').style.opacity = '0.5';
    }
});

// 8. Final Surprise (Confetti Explosion)
document.getElementById('finalSurpriseBtn').addEventListener('click', () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) { return Math.random() * (max - min) + min; }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff2a6d', '#05d9e8'] }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff2a6d', '#ffffff'] }));
    }, 250);
    
    document.getElementById('finalSurpriseBtn').innerText = "I Love You Koko! ❤️";
});