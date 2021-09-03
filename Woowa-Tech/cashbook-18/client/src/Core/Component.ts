import { EventListener, Props, State } from '@/utils/types';
import { diffing } from '@/Core/diffing';

export default class Component<S extends State, P extends Props> {
  $target: HTMLElement;
  $state?: S;
  $props?: P;
  eventlisteners: EventListener[];
  classIDF: string;

  constructor($target: HTMLElement, $state?: S, $props?: P) {
    this.$target = $target;
    this.$state = $state;
    this.$props = $props;
    this.eventlisteners = [];
    this.classIDF = '';
    this.setup();
    this.render();
    this.setEvent();
    this.resetEvent();
  }

  setup() {}

  template(): HTMLElement {
    throw new Error('[WARNING✌] template 메서드를 정의하셔야 합니다.');
  }

  setEvent() {}

  // 컴포넌트가 unmount 되는 시점에 호출되는 메서드
  resetEvent() {
    document.addEventListener(
      'componentWillUnmount',
      () => {
        this.removeEvent();
        this.setUnmount();
        this.$target.innerHTML = '';
      },
      {
        once: true,
      }
    );
  }

  addEvent(
    eventType: string,
    selector: string,
    callback: Function,
    custom?: boolean
  ) {
    const children: Element[] = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target: Element) =>
      children.includes(target) ||
      target.closest(selector) ||
      (custom && this.$target.className === selector);

    const listener = (event: Event) => {
      if (!isTarget(event.target as Element)) return false;
      callback(event);
    };

    this.$target.addEventListener(eventType, listener);
    this.eventlisteners.push({ type: eventType, listener });
  }

  // addEvent를 통해 등록된 이벤트 리스트를 모두 초기화하는 메서드
  removeEvent() {
    this.eventlisteners.forEach(({ type, listener }) => {
      this.$target.removeEventListener(type, listener);
    });
    this.eventlisteners = [];
  }

  setState(nextState: S) {
    this.$state = { ...this.$state, ...nextState };
    this.render();
  }

  render() {
    const template = this.template();
    diffing(template, this.$target);
    this.mounted();
  }

  mounted() {}

  // 컴포넌트 단위에서 언마운트 되는 시점에 지정할 작업을 작성하는 메서드
  setUnmount() {}
}
