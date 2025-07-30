
// === Бургер-меню ===
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav ul');
if(burger && nav){
    burger.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
}

// === Карусель отзывов (простая версия) ===
const reviews = document.querySelectorAll('.review');
let currentReview = 0;
function showReview(index) {
    reviews.forEach((rev, i) => {
        rev.style.display = i === index ? 'block' : 'none';
    });
}
if(reviews.length){
    showReview(currentReview);
    setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }, 5000);
}

// === Анимация появления карточек услуг ===
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

// === Счётчики чисел ===
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

// === Lazy-loading для изображений ===
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading','lazy');
});

// === Плавный скролл по якорям ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Всплывающее окно «Мы перезвоним» ===
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

// === Плавающая кнопка вызова мастера ===
const floatingBtn = document.querySelector('.floating-call-btn');
if(floatingBtn){
    floatingBtn.addEventListener('click', () => {
        const modal = document.getElementById('orderModal');
        if(modal) modal.style.display = 'flex';
    });
}

// === Промо-модальное окно со скидкой 30% ===
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById('orderModal');
        if(modal) modal.style.display = 'flex';
    });
});

const closeModalBtn = document.querySelector('.close-modal');
if(closeModalBtn){
    closeModalBtn.addEventListener('click', () => {
        document.getElementById('orderModal').style.display = 'none';
    });
}

const orderModal = document.getElementById('orderModal');
if(orderModal){
    orderModal.addEventListener('click', e => {
        if(e.target.id === 'orderModal'){
            e.target.style.display = 'none';
        }
    });
}

const leadForm = document.getElementById('leadForm');
if(leadForm){
    leadForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Спасибо! Ваша заявка отправлена.');
        document.getElementById('orderModal').style.display = 'none';
    });
}
