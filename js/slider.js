const grid = document.querySelector('.stages__block');
const cards = Array.from(document.querySelectorAll('.stages__block_card'));
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

// Слайдер
function slider() {

    // Инициализация
    let currentIndex = 0;
    dotsContainer.innerHTML = '';
    prevButton.disabled = true

    if (window.innerWidth <= 768) {

        const visibleCards = cards.filter((div) => div.classList.contains('hidden') === false);
        // console.log(visibleCards)
        visibleCards.forEach((div, index) => {
            const dot = document.createElement('div');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
            console.log(dotsContainer)
        });

        // Обновить слайдер
        function updateSlider() {
            const dots = document.querySelectorAll('.dots div');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
            grid.style.transform = `translateX(-${currentIndex * 200}%)`;
            currentIndex === 0 ? prevButton.disabled = true : prevButton.disabled = false
            currentIndex === (dots.length - 1) ? nextButton.disabled = true : nextButton.disabled = false
        }

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < visibleCards.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        document.querySelectorAll('.dots div').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
    } else {
        grid.style.transform = `translateX(0)`;
        dotsContainer.innerHTML = '';
    }
}

window.addEventListener('resize', slider);
slider();

