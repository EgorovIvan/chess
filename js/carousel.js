const carousel = document.querySelector('.participants__carousel');
const carouselCards = document.querySelectorAll('.participants__carousel_card');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const counter = document.getElementById('carousel-counter');

// Инициализация данных
let currentIndex = 0;
let counterMovement = 0;
const itemsToShow = window.innerWidth > 768 ? 3 : 1;
const totalItems = carouselCards.length;
let itemWidth = carousel.offsetWidth / itemsToShow;
// Идентификатор для хранения текущего setInterval
let slideInterval;

// Функция для автоматического переключения слайдов
function startAutoSlide(interval, callback) {
    if (typeof callback !== 'function') {
        console.error('Callback должен быть функцией');
        return;
    }

    slideInterval = setInterval(() => {
        callback(); // Вызываем переданную функцию
    }, interval);
}

// Функция для остановки автоматического переключения слайдов
function stopAutoSlide() {
    clearInterval(slideInterval);
}

function updateCarousel() {
    const displayedIndex = (currentIndex % totalItems) + itemsToShow;
    counter.textContent = `${displayedIndex > totalItems ? displayedIndex % totalItems : displayedIndex}/${totalItems}`;

}

function nextSlide() {
    currentIndex = (currentIndex + 1) % (totalItems + itemsToShow);

    // Сохраняем первую карточку
    const firstCard = carouselCards[(counterMovement) % 6]
    counterMovement = counterMovement + 1;
    console.log(firstCard)
    // Анимируем смещение всех карточек
    carouselCards.forEach((card, index) => {
        card.style.transform = `translateX(-${itemWidth}px)`;
    });

    // Ждем окончания анимации
    setTimeout(() => {
        // Убираем смещение
        carouselCards.forEach(card => {
            card.style.transition = 'none';
            card.style.transform = 'translateX(0)';
        });

        // Перемещаем первую карточку в конец
        carousel.append(firstCard);
        // Сбрасываем transition
        setTimeout(() => {
            carouselCards.forEach(card => {
                card.style.transition = 'transform 0.5s ease-in-out';
            });
        }, 50);
    }, 500); // Длительность анимации совпадает с CSS transition

    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + (totalItems + itemsToShow)) % (totalItems + itemsToShow);


    // console.log(counterMovement)
    const itemWidth = carousel.offsetWidth / itemsToShow;
    // Сохраняем последнюю карточку
    if (counterMovement === 0 ) {
        counterMovement = totalItems - 1;
    } else {
        counterMovement = counterMovement - 1;
    }

    const lastCard = carouselCards[Math.abs(counterMovement) % 6];

    console.log(lastCard);

    // Анимируем смещение всех карточек
    carouselCards.forEach((card, index) => {
        card.style.transform = `translateX(${itemWidth}px)`;
    });

    // Ждем окончания анимации
    setTimeout(() => {
        // Убираем смещение
        carouselCards.forEach(card => {
            card.style.transition = 'none';
            card.style.transform = 'translateX(0)';
        });

        // Перемещаем последнюю карточку в начало
        carousel.prepend(lastCard);
        console.log(carousel)

        // Сбрасываем transition
        setTimeout(() => {
            carouselCards.forEach(card => {
                card.style.transition = 'transform 0.5s ease-in-out';
            });
        }, 50);
    }, 500); // Длительность анимации совпадает с CSS transition

    updateCarousel();
}

// Список событий
carouselNext.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide(4000, nextSlide);
});
carouselPrev.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide(4000, prevSlide);
});

// Инициализация при рендере
startAutoSlide(4000, nextSlide);
updateCarousel();

// При изменении ширины окна
window.addEventListener('resize', () => {
    updateCarousel();
});