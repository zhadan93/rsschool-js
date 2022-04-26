import { Popup } from './Popup.js'

import { pets } from './pets.js'

window.onload = function() {
  addBurgerMenuClickHandler();

  addPetsCardClickHandler();
};


const addBurgerMenuClickHandler = () => {
  document.querySelector('.burger-button').addEventListener('click', toggleBurgerMenu);
};

const toggleBurgerMenu = () => {
  const classNameElements = ['.burger-button', '.burger-logo', '.header__navigation', '.overlay'];

  const burgerMenuElements = getBurgerMenuElements(classNameElements);
  const page = getElements('.page');
  const logo = getElements('.logo');
  
  if (document.querySelector('.burger-button').classList.contains('open')) {
    removeBurgerMenu(burgerMenuElements, 'open');
    removeNavigationMenuClickHandler();
    removeOverlayClickHandler();
    removeLogoBurgerMenuHandler();
    removeRightPaddingForDocument();
    removeClassName(page, 'removeScrollBar');
    removeClassName(logo, 'hidden');
  } else {
    addBurgerMenu(burgerMenuElements, 'open'); 
    addNavigationMenuClickHandler();
    addOverlayClickHandler();
    addLogoBurgerMenuHandler();
    addRightPaddingForDocument();
    addClassName(page, 'removeScrollBar');
    addClassName(logo, 'hidden');
  } 
};

const getBurgerMenuElements = (classNames) => {
   const burgerMenuElements = [];

   classNames.forEach(className => burgerMenuElements.push(getElements(className)));

   return burgerMenuElements;
}

const getElements = (className) => {
  return document.querySelector(className);
}

const addBurgerMenu = (elements, className) => {
  elements.forEach(element => {
    addClassName(element, className);
  });
}

const addClassName = (element, className) => {
  element.classList.add(className);
}

const removeBurgerMenu = (elements, className) => {
  elements.forEach(element => {
    removeClassName(element, className);
  });
}

const removeClassName = (element, className) => {
  element.classList.remove(className);
}

const addLogoBurgerMenuHandler = () => {
  document.querySelector('.burger-logo').addEventListener('click', toggleBurgerMenu);
};

const removeLogoBurgerMenuHandler = () => {
  document.querySelector('.burger-logo').removeEventListener('click', toggleBurgerMenu);
};

const addOverlayClickHandler = () => {
  document.querySelector('.overlay').addEventListener('click', toggleBurgerMenu);
};

const removeOverlayClickHandler = () => {
  document.querySelector('.overlay').removeEventListener('click', toggleBurgerMenu);
}; 

const addNavigationMenuClickHandler = () => {
  document.querySelector('.header__navigation').addEventListener('click', closeBurgerMenu);
};

const removeNavigationMenuClickHandler = () => {
  document.querySelector('.header__navigation').removeEventListener('click', closeBurgerMenu);
};

const closeBurgerMenu = (e) => {
  if (e.target.classList.contains('navigation__link')) toggleBurgerMenu();
};

const addRightPaddingForDocument = () => {
  document.documentElement.style.paddingRight = `${getScrollBarWidth()}px`;
}

const getScrollBarWidth = () => {
  let documentWithScrollBarWidth = window.innerWidth;

  let scrollBarWidth = documentWithScrollBarWidth - document.documentElement.clientWidth;

  return scrollBarWidth;
}

const removeRightPaddingForDocument = () => {
  document.documentElement.style.paddingRight = '0px';
}

const addPetsCardClickHandler = () => {
  document.querySelector('.slider__list').addEventListener('click', openPopupWindow);
}

const openPopupWindow = (e) => {
  if (e.target.closest('.slider__item')) {
    const clickedPetCard = e.target.closest('.slider__item').dataset.petName;
    const content = getPetInformation(clickedPetCard);

    renderPopup(content);
  }
}

const getPetInformation = (name) => {
  return pets.find(pet => pet.name === name)
}

const renderPopup = (content) => {
  let popup = new Popup(content);
  popup.renderPopupContent();
}


console.log(`Реализованы бургер меню и popup.
Общая оценка 35 баллов`)