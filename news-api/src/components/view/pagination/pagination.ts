import './pagination.css';

class Pagination {
  draw(data: string[]): void {
    const nav = document.createElement('nav');
    const navList = document.createElement('ul');
    navList.classList.add('pagination');

    data.forEach((item) => {
      const navItem = document.createElement('li');
      navItem.classList.add('pagination__item');
      navItem.setAttribute('data-letter-id', item);
      navItem.textContent = item;

      navList.append(navItem);
    });

    nav.append(navList);

    const mainContainer = document.querySelector('.main__container');
    mainContainer?.prepend(nav);
  }

  activeElement(selectedBtn: Element): void {
    const letter = document.querySelector('.pagination__item_active');
    letter?.classList.toggle('pagination__item_active');
    selectedBtn.classList.toggle('pagination__item_active');
  }
}

export default Pagination;
