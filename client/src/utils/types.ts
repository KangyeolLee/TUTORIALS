import Component from '@/Core/Component';

/**
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
  day?: number;
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
  historyCardForToday?: IHistory[];
}

/**
 * @example
 * HistoryModel 관련 타입
 */

export type typeString = 'expense' | 'income';
export interface HistoryType {
  expense?: boolean;
  income?: boolean;
}
export interface HistoryModelType extends Model {
  key: string;
  historyCards: IHistory[];
  historyType: HistoryType;
  historyCardForToday: IHistory[];
  getHistoryCard: ({ year, month }: Today) => Promise<curType>;
  addHistory: (history: IHistory) => Promise<curType>;
  toggleType: (nextType: typeString) => Promise<curType>;
  getTodaysHistoryCard: (today: Today) => Promise<curType>;
  getHistoryPayAmount: () => PriceAmountType;
  initHistoryForToday: () => Promise<curType>;
}

export interface DateState extends State {
  today: Today;
  historyCards?: IHistory[];
}

export type PriceAmountType = {
  amount: number;
  income: number;
  outcome: number;
};

/**
 * @example
 * history 리스트 타입
 */
export interface IHistory {
  createdAt: string;
  type: number;
  category: string;
  content: string;
  payment: string;
  price: number;
  id: number;
}

export interface IValidationType {
  date: boolean;
  category: boolean;
  content: boolean;
  payment: boolean;
  price: boolean;
}

export interface IHistoryDayCardProps extends Props {
  onlyToday?: boolean;
  $totalNum?: HTMLSpanElement;
  $incomeSum?: HTMLSpanElement;
  $expenseSum?: HTMLSpanElement;
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
 * Calendar Component 데이터 관련 타입
 */
export type DatesType = {
  today_date: number;
  last_date: number;
  first_day: number;
};

export type CalendarControllerType = {
  getTodayDates: (today: Today) => DatesType;
  makeCalendar: (
    t1: number,
    t2: number,
    t3: number,
    state: CalendarState,
    target: HTMLElement
  ) => void;
};

export type HistoryForDate = {
  date: number;
  history?: {
    income: number;
    outcome: number;
    amount: number | null;
  };
};

export type HistoryTypeForDate = {
  history: {
    income: number;
    outcome: number;
    amount: number | null;
  };
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
