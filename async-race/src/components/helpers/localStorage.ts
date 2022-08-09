import { GarageState } from '../types/dataInterface';

export default class LocalStorage {
  static getStorage(key: string) {
    const state = window.localStorage.getItem(key);
    let savedState = null;
    if (state) savedState = JSON.parse(state);
    return savedState;
  }

  static setStorage(key: string, obj: GarageState) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }
}
