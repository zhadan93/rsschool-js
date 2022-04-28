export class Slider {
  constructor(pets) {
    this.pets = pets;
    this.prevRandomPetCards = [];
    this.currentRandomPetCards = [];
    this.generatedPetCards = [];
  }

  initializeSlider() {
    this.generatePetCards();
    document.querySelector('.slider__content').append(...this.generatedPetCards);
    this.changeCardState();
  }

  changeCardState() {
    this.prevRandomPetCards = [...this.currentRandomPetCards];
    this.currentRandomPetCards = [];
    this.generatedPetCards = [];
  }

  generatePetCards() {
    const generatedCardNumber = this.getCardNumber();
    
    for(let i = 0; i < generatedCardNumber; i++) {
      const cardNumber = this.getRandomPetCard();
      this.currentRandomPetCards.push(cardNumber);
      this.generatedPetCards.push(this.generatePetCardContent(cardNumber));
    }
  }

  getRandomPetCard() {
    let randomPetCard;

    do {
      randomPetCard = this.getRandom();
    } while(this.currentRandomPetCards.includes(randomPetCard) || this.prevRandomPetCards.includes(randomPetCard));

    return randomPetCard;
  }

  getRandom() {
    const min = 0;
    const max = this.pets.length - 1;

    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  generatePetCardContent(petNumber) {
    const pet = this.pets[petNumber];
    let template = '';
    const petCard = document.createElement('div');
    petCard.classList.add('slider__item');
    petCard.dataset.petName = pet.name;

    pet.img && 
      (template += `<img class="slider__img" src=${pet.img} alt=${pet.name}></img>`)

    pet.name &&
      (template += `<p class="slider__pet-name">${pet.name}</p>`)

    template += `<button class="button button--bordered">Learn more</button>`;

    petCard.innerHTML = template;

    return petCard;
  }

  switchSlider(event) {
    const clickedElement = event.target;
    if (clickedElement.closest('.slider__button--prev')) {
      this.switchSliderToTheLeft();
    }

    if (clickedElement.closest('.slider__button--next')) {
      this.switchSliderToTheRight();
    }

    document.querySelector('.slider__content').addEventListener('animationend', this.addSliderButtonClickHandler);
  }

  switchSliderToTheLeft() {
    this.generatePetCards();
    document.querySelector('.slider__content').prepend(...this.generatedPetCards);
    this.changeCardState();
    document.querySelector('.slider__content').classList.add('left');
  }

  switchSliderToTheRight() {
    this.initializeSlider();
    document.querySelector('.slider__content').classList.add('right');
  }

  addSliderButtonClickHandler(event) {
    const cards = Array.from(document.querySelectorAll('.slider__item'));
    let className;

    const windowWidth = document.documentElement.clientWidth;
    let windowCardNumber;
    if (windowWidth < 768) {
      windowCardNumber = 1;
    } else if (windowWidth >= 768 && windowWidth < 1280) {
      windowCardNumber = 2;
    } else {
      windowCardNumber = 3;
    }
    
    if (event.animationName === 'move-to-the-left') {
      className = 'left';
      cards.splice(cards.length - windowCardNumber).forEach(el => el.remove());
    } else {
      className = 'right';
      cards.splice(0, windowCardNumber).forEach(el => el.remove());
    }
    document.querySelector('.slider__content').classList.remove(className);
  }

  getCardNumber() {
    const windowWidth = document.documentElement.clientWidth;
    let windowCardNumber;
    if (windowWidth < 768) {
      windowCardNumber = 1;
    } else if (windowWidth >= 768 && windowWidth < 1280) {
      windowCardNumber = 2;
    } else {
      windowCardNumber = 3;
    }

    return windowCardNumber;
  }
}
