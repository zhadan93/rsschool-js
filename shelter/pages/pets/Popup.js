export class Popup {
  constructor({name, img, type, breed, description, age, inoculations, diseases, parasites}) {
    this.popup = '';
    this.popupCloseButton = '';
    this.overlay = '';
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  renderPopupContent() {
    const popupContent = this.generatePopupContent();
    this.buildPopup(popupContent);
  }

  generatePopupContent () {
    let template = '';
    const petCardContent = document.createElement('div');
    petCardContent.classList.add('popup__content');

    this.img && 
      (template += `<img class="popup__image" src=${this.img} alt=${this.name}></img>`)

    if (this.name || this.type || this.breed || this.description || this.age || this.inoculations || this.diseases || this.parasites) {
      template += `<div class="popup__pets-description">`

      this.name &&
        (template += `<h3 class="title title__h3 popup__title--h3">${this.name}</h3>`)

      this.type && 
        (template += `<h4 class="title title__h4 popup__title--h4">${this.type}`)

      template += this.breed ? ` - ${this.breed}</h4>` : `</h4>`

      this.description && 
        (template += `<h5 class="title popup__title--h5">${this.description}</h5>`)

      if (this.age || this.inoculations || this.diseases || this.parasites) {
        template += `<ul class="popup__list">`

        this.age && 
          (template += `<li class="title popup__item"><span class="popup__title--bold">Age:</span> ${this.age}</li>`)

        this.inoculations && 
          (template += `<li class="title popup__item"><span class="popup__title--bold">Inoculations:</span> ${[...this.inoculations]}</li>`)

        this.diseases && 
          (template += `<li class="title popup__item"><span class="popup__title--bold">Diseases:</span> ${[...this.diseases]}</li>`)

        this.parasites && 
          (template += `<li class="title popup__item"><span class="popup__title--bold">Parasites:</span> ${[...this.parasites]}</li>`)

        template += `</ul>`
      }

      template += `</div>`
    } 

    petCardContent.innerHTML = template;

    return petCardContent;
  }

  buildPopup(content) {
    // Overlay
    this.overlay = this.createElement(this.overlay, 'div', 'popup-overlay');
    //this.overlay.style.top = `${window.pageYOffset}px`;
   
    // Popup
    this.popup = this.createElement(this.popup, 'div', 'popup');

    // Set content
    this.setContent(content);

    // Popup close button
    this.popupCloseButton = this.createElement(this.popupCloseButton, 'button', 'popup__close-button');

    // Add popup on window
    this.appendPopupElements();

    //Bind events
    this.bindEvents();

    // Open popup
    this.openPopup();

    this.addRightPaddingForDocument();
  }

  createElement(element, tag, ...classes) {
    element = document.createElement(tag);
    element.classList.add(...classes);

    return element;
  }

  setContent(content) {
    if (typeof content === 'string') {
      this.popup.innerHTML = content;
    } else {
      this.popup.append(content);
    }
  }

  appendPopupElements() {
    this.popup.append(this.popupCloseButton);
    this.overlay.append(this.popup);
  }

  bindEvents() {
    this.popupCloseButton.addEventListener('click', this.closePopup);
    this.overlay.addEventListener('click', this.closePopup);
  }

  openPopup() {
    document.body.append(this.overlay);
  }

  addRightPaddingForDocument() {
    document.documentElement.style.paddingRight = `${this.getScrollBarWidth()}px`;
    document.querySelector('.page').classList.add('removeScrollBar');
  }
  
  getScrollBarWidth() {
    let documentWithScrollBarWidth = window.innerWidth;
  
    let scrollBarWidth = documentWithScrollBarWidth - document.documentElement.clientWidth;
  
    return scrollBarWidth;
  }

  closePopup(e) {
    const classes = e.target.classList;
    if(classes.contains('popup-overlay') || classes.contains('popup__close-button')) {
      e.stopPropagation();
      document.querySelector('.popup-overlay').remove();
      document.querySelector('.page').classList.remove('removeScrollBar');
      document.documentElement.style.paddingRight = '0px';
    } 
  }
}