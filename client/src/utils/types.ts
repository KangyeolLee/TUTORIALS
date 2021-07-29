/**
 * @example
 * Modal 관련 공통 타입
 */
interface Model {
  subscribe: (key: string, observer: any) => void;
  unsubscribe: (key: string, observer: any) => void;
  notify: (key: string, data: any) => void;
}

/**
 * @example
 * Router 관련 타입
 */
export type RouterType = {
  $app: HTMLElement;
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

export interface TodayModel extends Model {
  today: Today;
  key: string;
  getPrevDate: () => void;
  getNextData: () => void;
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
  getHistoryCard: (today: Today) => void;
  addHistory: (history: IHistory) => void;
  toggleType: (nextType: typeString) => void;
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
