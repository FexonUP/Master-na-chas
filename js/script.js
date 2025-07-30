
// === Динамический отступ hero ===
function adjustHeroPadding() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    if(header && hero){
        const extraSpace = window.innerWidth <= 768 ? 40 : 60;
        hero.style.paddingTop = (header.offsetHeight + extraSpace) + 'px';
    }
}
window.addEventListener('load', adjustHeroPadding);
window.addEventListener('resize', adjustHeroPadding);

// === Модальное окно с scroll-lock ===
const modal = document.getElementById('orderModal');
document.querySelectorAll('.order-btn, .floating-call-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    });
});
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
});
modal?.addEventListener('click', e => {
    if(e.target.id === 'orderModal'){
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

// === Маска телефона РФ ===
function maskPhone(input){
    input.addEventListener('input', () => {
        let x = input.value.replace(/\D/g, '');
        if (!x.startsWith('7')) x = '7' + x;
        x = x.substring(0,11);
        let formatted = '+7';
        if(x.length>1) formatted += ' ('+x.substring(1,4);
        if(x.length>=5) formatted += ') '+x.substring(4,7);
        if(x.length>=8) formatted += '-'+x.substring(7,9);
        if(x.length>=10) formatted += '-'+x.substring(9,11);
        input.value = formatted;
    });
}
document.querySelectorAll('input[type="tel"]').forEach(maskPhone);

// === Карусель отзывов ===
const reviews = document.querySelectorAll('.review');
let currentReview = 0;
let reviewInterval;
function showReview(index) {
    reviews.forEach((rev, i) => {
        rev.classList.remove('active');
        if(i === index) rev.classList.add('active');
    });
}
function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}
function prevReview() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    showReview(currentReview);
}
if(reviews.length){
    showReview(currentReview);
    reviewInterval = setInterval(nextReview, 5000);
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if(prevBtn) prevBtn.addEventListener('click', () => {
        prevReview();
        clearInterval(reviewInterval);
        reviewInterval = setInterval(nextReview, 5000);
    });
    if(nextBtn) nextBtn.addEventListener('click', () => {
        nextReview();
        clearInterval(reviewInterval);
        reviewInterval = setInterval(nextReview, 5000);
    });
}


// === Анимация появления карточек услуг ===
function revealServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    const windowHeight = window.innerHeight;
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < windowHeight - 50) {
            card.classList.add('visible');
        }
    });
}
window.addEventListener('load', revealServiceCards);
window.addEventListener('scroll', revealServiceCards);
