import './alphabet.css';

class Alphabet {
    draw(data: string[]): void {
        const nav = document.createElement('nav');
        const navList = document.createElement('ul');
        navList.classList.add('alphabet');

        data.forEach((item) => {
            const navItem = document.createElement('li');
            navItem.classList.add('alphabet__item');
            navItem.setAttribute('data-letter-id', item);
            navItem.textContent = item;

            navList.append(navItem);
        });

        nav.append(navList);

        const mainContainer = document.querySelector('.main__container');
        mainContainer?.prepend(nav);
    }
}

export default Alphabet;
