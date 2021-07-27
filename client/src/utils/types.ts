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

export type EventListener = {
  type: string;
  listener: (e: Event) => void;
};

export type State = {};
export type Props = {};
