/* any는 나중에 꼭꼮꼭 타입을 바꿔주도록 해보아요 */
import { Store } from '@/Core/Store';

export default class Observable {
  private _observers: any;

  constructor() {
    this._observers = Store.getStates;
  }

  subscribe(key: string, observer: any) {
    if (!this._observers[key]) {
      this._observers[key] = [];
    }

    this._observers[key].push(observer);
  }

  unsubscribe(key: string, observer: any) {
    if (!this._observers[key]) return;
    this._observers[key] = [...this._observers[key]].filter(
      (subscriber) => subscriber !== observer
    );
  }

  notify(key: string, data: any) {
    this._observers[key].forEach((observer: any) => observer.setState(data));
  }
}
