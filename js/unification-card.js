const card1 = document.querySelector('.card-1');
const card2 = document.querySelector('.card-2');

const card4 = document.querySelector('.card-4');
const card5 = document.querySelector('.card-5');

const stateCard1 = card1.cloneNode(true);
const stateCard4 = card4.cloneNode(true);

// Объединение карточек
function combineCards() {
    if (window.innerWidth <= 768) {
        card1.innerHTML = '';
        card1.innerHTML = stateCard1.innerHTML;
        card1.innerHTML += card2.innerHTML;
        card2.classList.add('hidden');

        card4.innerHTML = '';
        card4.innerHTML = stateCard4.innerHTML;
        card4.innerHTML += card5.innerHTML;
        card5.classList.add('hidden');
    } else {
        card1.innerHTML = '';
        card1.innerHTML = stateCard1.innerHTML;
        card2.classList.remove('hidden');

        card4.innerHTML = '';
        card4.innerHTML = stateCard4.innerHTML;
        card5.classList.remove('hidden');
    }
}

window.addEventListener('resize', combineCards);
combineCards();
