import './sources.css';
import { SourceDetails } from '../../app/interfaces';

class Sources {
    draw(data: SourceDetails[]): void {
        const sources = document.querySelectorAll('.source__item');

        if (sources.length) {
            const sourcesList = Array.from(sources);
            sourcesList.forEach((item) => item.remove());
        }

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
                const sourceCloneName = sourceClone.querySelector('.source__item-name');

                if (sourceCloneName) {
                    sourceCloneName.textContent = item.name;

                    const sourceCloneItem = sourceClone.querySelector('.source__item');
                    sourceCloneItem?.setAttribute('data-source-id', item.id);

                    fragment.append(sourceClone);
                }
            });

            const sourcesContainer = document.querySelector('.sources');
            sourcesContainer?.append(fragment);
        }
    }
}

export default Sources;
