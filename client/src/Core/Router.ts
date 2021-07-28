import { isClass, customEventEmitter } from '@/utils/helper';
import { Route, RouterType } from '@/utils/types';

class Router {
  $app: HTMLElement;
  routes: {
    [key: string]: Route;
  } = {};
  fallback: string;

  constructor({ $app, routes, fallback = '/' }: RouterType) {
    this.$app = $app;
    this.fallback = fallback;
    this.generateRoutes(routes);
    this.initEvent();
  }

  generateRoutes(routes: Route[]) {
    routes.forEach((route: Route) => {
      this.routes[route.path] = route;
    });
  }

  initEvent() {
    document.addEventListener(
      'moveroutes',
      this.moveroutesHandler.bind(this) as EventListener
    );
    window.addEventListener('popstate', this.popstateHandler.bind(this));
  }

  getRoute(path: string) {
    const route: Route = this.routes[path];
    if (!route)
      throw new Error('[라우트 에러] 해당 경로 라우트를 찾을 수 없습니다.');

    return route;
  }

  hasRoute(path: string) {
    return typeof this.routes[path] !== 'undefined';
  }

  getComponent(route: Route) {
    const component = route.component;
    return component;
  }

  // customEvent 'moveroutes' 관련 경로 이동 이벤트 핸들러 (pushState 감지)
  moveroutesHandler(event: CustomEvent) {
    this.unmountComponent();
    const path: string = event.detail.path;
    history.pushState(event.detail, '', path);
    this.renderComponent(path, event.detail);
  }

  // 기본 브라우저 이벤트 'popstate' 관련 이벤트 핸들러 (뒤로가기/앞으로가기)
  popstateHandler() {
    this.unmountComponent();
    this.renderComponent(history.state.path, history.state);
  }

  renderComponent(path: string, detail: object) {
    let route: Route;

    if (this.hasRoute(path)) {
      route = this.getRoute(path);
    } else {
      route = this.getRoute(this.fallback);
    }

    if (route.redirect) {
      this.push(route.redirect);
      return;
    }

    const component = this.getComponent(route);
    if (component && isClass(component)) {
      new component(this.$app, detail);
    } else {
      throw new Error('[라우터 에러] 유효한 형식의 라우터가 아닙니다.');
    }
  }

  unmountComponent() {
    const { path } = history.state ?? { path: '/main' };

    customEventEmitter('componentWillUnmount');

    console.log('해당 컴포넌트는 언마운트 될겁니다...: ', path);
  }

  push(path: string) {
    customEventEmitter('moveroutes', {
      ...history.state,
      path,
    });
  }
}

export let $router: {
  push: (path: string) => void;
};

export function initRouter(options: RouterType) {
  const router = new Router(options);

  $router = {
    push: (path) => router.push(path),
  };

  customEventEmitter(
    'moveroutes',
    history.state ?? {
      path: '/',
    }
  );
}
