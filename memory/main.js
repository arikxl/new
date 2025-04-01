const cards = document.querySelectorAll('figure');
console.log(cards)


function flipCard() {
    // console.log(this)
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));