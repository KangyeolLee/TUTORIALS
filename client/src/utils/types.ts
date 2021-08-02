import Component from '@/Core/Component';

/**
import { histories } from './../assets/dummy';
 * @example
 * Modal 관련 공통 타입
 */
interface Model {
  subscribe: (key: string, observer: any) => void;
  unsubscribe: (key: string, observer: any) => void;
  notify: (key: string, data: any) => void;
}

export type ObserversType = {
  [key: string]: { new (): Component<State, Props> }[];
};

export type subscribeType = {
  key: string;
  observer: { new (): Component<State, Props> };
};

/**
 * @example
 * Router 관련 타입
 */
export type RouterType = {
  $root: HTMLElement;
  routes: Route[];
  fallback?: string;
};

export type Route = {
  path: string;
  redirect?: string;
  component?: any;
};

/**
 * @example
 * Component 관련 타입
 */
export type EventListener = {
  type: string;
  listener: (e: Event) => void;
};

export type State = {};
export type Props = {};

/**
 * @example
 * TodayModel 관련 타입
 */
export type Today = {
  year: number;
  month: number;
};

export interface TodayModelType extends Model {
  today: Today;
  key: string;
  getPrevDate: () => Promise<curType>;
  getNextData: () => Promise<curType>;
}

export interface CalendarState extends State {
  today: Today;
  historyCards?: IHistory[];
  historyType: HistoryType;
}

/**
 * @example
 * MainModel 관련 타입
 */

export type typeString = 'expense' | 'income';
export interface HistoryType {
  expense?: boolean;
  income?: boolean;
}
export interface MainModelType extends Model {
  key: string;
  historyCards: IHistory[];
  historyType: HistoryType;
  getHistoryCard: (today: Today) => Promise<curType>;
  addHistory: (history: IHistory) => Promise<curType>;
  toggleType: (nextType: typeString) => Promise<curType>;
}

export interface DateState extends State {
  today: Today;
  historyCards?: IHistory[];
}

/**
 * @example
 * history 리스트 타입
 */
export interface IHistory {
  date: string;
  type: number;
  category: string;
  content: string;
  payment: string;
  price: number;
}

export interface IValidationType {
  date: boolean;
  category: boolean;
  content: boolean;
  payment: boolean;
  price: boolean;
}

/**
 * @example
 * 비동기 setState 데이터 관련 타입
 */
export type curType = {
  name: string;
  observer: any;
  data: any;
};

export type accType = {
  [key: string]: {
    observer: any;
    data: any;
  };
};

/**
 * @example
 * Diffing 데이터 관련 타입
 */
export type DiffingNodesType = {
  $old?: HTMLElement | DocumentFragment;
  node: HTMLElement;
  $oldNode: HTMLElement;
};

/**
 * @example
 * PaymentsModel 데이터 관련 타입
 */
export interface PaymentsModelType extends Model {
  key: string;
  paymentList: PaymentType[];
  getUserPayments: () => Promise<curType>;
}
export type PaymentType = {
  id: number;
  type: string;
};
