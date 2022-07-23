import { CardState, CartState } from '../types/stateInterfaces';

export default class LocalStorage {
  static getStorage(key: string) {
    const state = window.localStorage.getItem(key);
    let savedState = null;
    if (state) savedState = JSON.parse(state);
    return savedState;
  }

  static setStorage(key: string, obj: CartState | Omit<CardState, 'resultCardData'>) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }
}
