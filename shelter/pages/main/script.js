
window.onload = function() {
  addBurgerMenuClickHandler();
};


const addBurgerMenuClickHandler = () => {
  document.querySelector('.burger-menu').addEventListener('click', toggleBurgerMenu);
};


const toggleBurgerMenu = () => {
  document.querySelector('.burger-menu').classList.toggle('open');
  document.querySelector('.burger-logo').classList.toggle('open');
  document.querySelector('.header__navigation').classList.toggle('open');
  document.querySelector('.overlay').classList.toggle('open');
  document.querySelector('.page').classList.toggle('open');

  if (document.querySelector('.burger-menu').classList.contains('open')) {
    addNavigationMenuClickHandler();
    addOverlayClickHandler();
    addLogoBurgerMenuHandler();
  } else {
    removeNavigationMenuClickHandler();
    removeOverlayClickHandler();
    removeLogoBurgerMenuHandler();
  } 
};

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
  document.querySelector('.header__navigation').addEventListener('click', closeBurgerMenu)
};

const closeBurgerMenu = (e) => {
  if (e.target.classList.contains('navigation__link')) toggleBurgerMenu();
};

const removeNavigationMenuClickHandler = () => {
  document.querySelector('.overlay').removeEventListener('click', closeBurgerMenu);
};
