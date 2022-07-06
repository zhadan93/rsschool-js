import './sources.css';
import { SourceDetails } from '../../app/interfaces';

class Sources {
    draw(data: SourceDetails[]) {
        const sources = document.querySelectorAll('.source__item');

        if (sources.length) {
            const sourcesList = Array.from(sources);
            sourcesList.forEach((item) => item.remove());
        }

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
