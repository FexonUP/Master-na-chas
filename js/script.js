
document.addEventListener('DOMContentLoaded', () => {
    /* === Бургер-меню === */
    const header = document.querySelector('header .container');
    let burger = document.querySelector('.burger');

    // Создаем бургер, если его нет
    if (!burger) {
        burger = document.createElement('div');
        burger.classList.add('burger');
        burger.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(burger);
    }

    const navMenu = document.querySelector('nav ul');

    // Переключение меню
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Закрытие меню при клике на ссылку
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    /* === Карусель отзывов (только на десктопе) === */
    const reviews = document.querySelectorAll('.review');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let interval;

    function showReview(index) {
        reviews.forEach((review, i) => {
            review.classList.toggle('active', i === index);
        });
    }

    function nextReview() {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
    }

    function prevReview() {
        currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
        showReview(currentIndex);
    }

    function startAutoSlide() {
        interval = setInterval(nextReview, 10000);
    }

    // Включаем карусель только на десктопе
    if (window.innerWidth > 768 && reviews.length) {
        showReview(0);
        startAutoSlide();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(interval);
                nextReview();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(interval);
                prevReview();
                startAutoSlide();
            });
        }

        const carousel = document.querySelector('.reviews-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(interval));
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
    } else {
        // На мобильных показываем все отзывы, отключаем кнопки
        if (reviews.length) {
            reviews.forEach(r => r.classList.add('active'));
        }
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
});



/* === Появление карточек при скролле === */
function revealOnScroll() {
    const cards = document.querySelectorAll('.service-card');
    const windowHeight = window.innerHeight;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < windowHeight - 50) {
            card.classList.add('visible');
        }
    });
}

window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* === Параллакс для hero === */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if(hero){
        let offset = window.scrollY * 0.4;
        hero.style.backgroundPosition = `center ${offset}px`;
    }
});



/* === Плавная прокрутка по якорям === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* === Плавающая кнопка открывает модалку === */
const floatingBtn = document.querySelector('.floating-call-btn');
if (floatingBtn) {
    floatingBtn.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        if(modal) modal.style.display = 'block';
    });
}

/* === Всплывающее окно через 30 сек или при уходе === */
const callbackPopup = document.getElementById('callbackPopup');
if(callbackPopup){
    let popupTimer = setTimeout(() => {
        callbackPopup.style.display = 'block';
    }, 30000);

    document.addEventListener('mouseleave', e => {
        if (e.clientY <= 0) callbackPopup.style.display = 'block';
    });

    const closeBtn = callbackPopup.querySelector('.close-popup');
    if(closeBtn){
        closeBtn.addEventListener('click', () => {
            callbackPopup.style.display = 'none';
            clearTimeout(popupTimer);
        });
    }
}



/* === Таймер акции === */
function startPromoTimer(duration) {
    let timer = duration, hours, minutes, seconds;
    const display = document.getElementById('promoTimer');

    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (display) display.textContent = hours + ":" + minutes + ":" + seconds;
        if (--timer < 0) { timer = 0; }
    }, 1000);
}
startPromoTimer(24 * 60 * 60);

/* === Закрытие баннера === */
const promoBanner = document.getElementById('promoBanner');
const closeBanner = document.querySelector('.close-banner');
if(closeBanner){
    closeBanner.addEventListener('click', () => {
        promoBanner.style.display = 'none';
    });
}

/* === Lazy-loading для картинок === */
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading','lazy');
});

/* === Анимация чисел (счётчики) === */
function animateNumbers() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const increment = target / 100;

        function updateCounter() {
            current += increment;
            if(current < target){
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        updateCounter();
    });
}
window.addEventListener('scroll', animateNumbers);

/* === Canvas искры в hero === */
const canvas = document.getElementById('heroCanvas');
if(canvas){
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('.hero').offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for(let i=0;i<40;i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*2+1,
            dx: (Math.random()-0.5)*0.5,
            dy: (Math.random()-0.5)*0.5
        });
    }

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if(p.x<0||p.x>canvas.width) p.dx*=-1;
            if(p.y<0||p.y>canvas.height) p.dy*=-1;
        });
        requestAnimationFrame(animate);
    }
    animate();
}
