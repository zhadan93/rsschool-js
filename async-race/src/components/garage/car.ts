import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { CarDetails, GarageState } from '../types/dataInterface';
import { URLS, BTN_NAMES, carQueriesParams } from '../../constants';
import apiRequest from '../apiRequest';
import SVGControl from '../helpers/control/svgControl';
import SVGUseControl from '../helpers/control/svgUseControl';
import SVGSprite from '../../assets/svg/sprite.svg';
import Style from '../helpers/style';
import './garage.css';

const { GARAGE_URL, ENGINE_URL } = URLS;
const { SELECT_BTN_NAME, REMOVE_BTN_NAME, ENGINE_START_BTN_NAME, ENGINE_STOP_BTN_NAME } = BTN_NAMES;
const [btnClassName, engineBtnClassName, disabledBtnClassName] = ['btn', 'engine-btn', 'btn--disabled'];

export default class Car extends HTMLControl {
  private drivingCars = new Map<string, HTMLElement | SVGElement | HTMLButtonElement>();

  private disabledDrivingButton = new Set<HTMLButtonElement>();

  private velocity = 0;

  private animationIds: number[] = [];

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render(carData: CarDetails) {
    const { name, color, id } = carData;

    const carCharacteristicNavigationContainer = new HTMLControl(this.node, 'div', 'container');

    const selectBtn = new HTMLControl(
      carCharacteristicNavigationContainer.node,
      'button',
      btnClassName,
      SELECT_BTN_NAME
    );
    const selectBtnElement = selectBtn.node;
    selectBtnElement.addEventListener('click', async () => {
      const data = await apiRequest.getDataById(GARAGE_URL, id);
      this.state.data = { ...this.state.data, selectedCar: data };
    });

    const removeBtn = new HTMLControl(
      carCharacteristicNavigationContainer.node,
      'button',
      btnClassName,
      REMOVE_BTN_NAME
    );
    const removeBtnElement = removeBtn.node;
    removeBtnElement.addEventListener('click', () => this.removeCar(id));

    (() => new HTMLControl(carCharacteristicNavigationContainer.node, 'h3', 'garage__car-name', name))();

    const carDrivingContainer = new HTMLControl(this.node, 'div', 'container car-race__container');
    const carDrivingContainerElement = carDrivingContainer.node;
    this.drivingCars.set('trackContainer', carDrivingContainerElement);

    const engineStartBtn = new HTMLControl<HTMLButtonElement>(
      carDrivingContainerElement,
      'button',
      engineBtnClassName,
      ENGINE_START_BTN_NAME
    );
    const engineStartBtnElement = engineStartBtn.node;

    const queryParams = {
      id,
      status: '',
    };

    engineStartBtnElement.addEventListener('click', async () => {
      this.changeDisabledDrivingButton(engineStartBtnElement);

      queryParams.status = 'started';
      const engineData = await apiRequest.startOrStopEngine(ENGINE_URL, queryParams);

      if (engineData) {
        this.switchButtonState();

        const { velocity, distance } = engineData;
        this.velocity = velocity;

        const time = distance / velocity;
        this.handleAnimation(this.linear, this.draw.bind(this), time);

        queryParams.status = 'drive';
        const { success } = await apiRequest.switchEngineToDriveMode(ENGINE_URL, queryParams);

        if (!success) {
          this.stopAnimation();
        }
      }
    });

    this.drivingCars.set('startEngineBtn', engineStartBtnElement);

    const engineStoptBtn = new HTMLControl<HTMLButtonElement>(
      carDrivingContainerElement,
      'button',
      engineBtnClassName,
      ENGINE_STOP_BTN_NAME
    );
    const engineStopBtnElement = engineStoptBtn.node;
    engineStopBtnElement.addEventListener('click', async () => {
      this.changeDisabledDrivingButton(engineStopBtnElement);

      queryParams.status = 'stopped';
      const stoppedCar = await apiRequest.startOrStopEngine(ENGINE_URL, queryParams);
      if (stoppedCar) {
        this.switchButtonState();

        this.stopAnimation();
        this.draw(0);
      }
    });

    this.drivingCars.set('stopEngineBtn', engineStopBtnElement);

    this.disabledDrivingButton.add(engineStopBtnElement);
    this.switchButtonState();

    const carSvg = new SVGControl(carDrivingContainerElement, 'svg', 'car-icon');
    const carUse = new SVGUseControl(`${SVGSprite}#car`, carSvg.node);
    carUse.node.style.fill = color;
    this.drivingCars.set('car', carSvg.node);

    const raceFlag = new HTMLControl(carDrivingContainerElement, 'div', 'garage__flag');
    this.drivingCars.set('flag', raceFlag.node);
  }

  async removeCar(id: number): Promise<void> {
    const response = await apiRequest.deleteData(GARAGE_URL, id);

    if (response) {
      const { pageNumber, carCount } = this.state.data;

      const currentPageNumber = (carCount - 1) % carQueriesParams.limit ? pageNumber : pageNumber - 1 || 1;
      carQueriesParams.page = currentPageNumber;
      const { data, count } = await apiRequest.getData(GARAGE_URL, carQueriesParams);

      this.state.data = { ...this.state.data, pageNumber: currentPageNumber, carCount: +count, carData: data };
    }
  }

  handleAnimation(timing: (timeFraction: number) => number, draw: (progress: number) => void, duration: number) {
    const start = performance.now();
    const animations = this.animationIds;

    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        const animationId = requestAnimationFrame(animate);
        animations.push(animationId);
      }
    });
  }

  linear(timeFraction: number): number {
    return timeFraction;
  }

  draw(progress: number): void {
    const car = this.drivingCars.get('car');

    if (car instanceof SVGElement) {
      const track = this.getTrackDistance(car);
      car.style.marginLeft = `${progress * track}px`;
    }
  }

  getTrackDistance(car: SVGElement): number {
    const flag = this.drivingCars.get('flag');
    const trackContainer = this.drivingCars.get('trackContainer');
    const startEngineBtn = this.drivingCars.get('startEngineBtn');
    let track = 0;

    if (car && flag && trackContainer && startEngineBtn) {
      const flagComputedStyle = getComputedStyle(flag);
      const trackContainerComputedStyle = getComputedStyle(trackContainer);
      const gap = parseInt(trackContainerComputedStyle.gap, 10);
      const startFlagRight = parseInt(flagComputedStyle.right, 10) + flag.clientWidth / 2;
      track = trackContainer.clientWidth - startFlagRight - 2 * startEngineBtn.clientWidth - gap * 2;
    }

    return track;
  }

  stopAnimation() {
    this.animationIds.forEach((animationId) => cancelAnimationFrame(animationId));
  }

  switchButtonState(): void {
    const drivingButtons = [this.drivingCars.get('startEngineBtn'), this.drivingCars.get('stopEngineBtn')];

    drivingButtons.forEach((btn) => {
      if (btn instanceof HTMLButtonElement) {
        const isDisabled = this.disabledDrivingButton.has(btn);
        Style.switchDisabledState(btn, isDisabled, disabledBtnClassName);
      }
    });
  }

  changeDisabledDrivingButton(disabledBtn: HTMLButtonElement) {
    this.disabledDrivingButton.clear();
    this.disabledDrivingButton.add(disabledBtn);
  }
}
