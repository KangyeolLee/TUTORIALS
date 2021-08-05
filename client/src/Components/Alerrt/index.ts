import Component from '@/Core/Component';
import { Props, State } from '@/utils/types';
import './styles';
import { customEventEmitter, html } from '@/utils/helper';

interface IAlertState extends State {
  historyId: number;
}

export default class Alert extends Component<IAlertState, Props> {
  setup() {
    this.$state = {
      historyId: -1,
    };
  }

  template() {
    const { historyId } = this.$state!;
    return html`
      <div class="alert-message">
        <div class="alert-header">주의</div>
        <div class="alert-body">
          <text>정말로 삭제하시겠습니까?</text>
          <div class="button-area">
            <div class="button cancel">취소</div>
            <div class="button confirm data-id=${historyId}">삭제</div>
          </div>
        </div>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.button.cancel', this.closeAlert.bind(this));
    this.addEvent(
      'open-alert',
      this.$target.className,
      (e: CustomEvent) => this.setState(e.detail),
      true
    );
    this.addEvent(
      'click',
      '.button.confirm',
      this.handleDeleteHistory.bind(this)
    );
  }

  closeAlert() {
    this.$target.style.display = 'none';
  }

  handleDeleteHistory() {
    const { historyId } = this.$state!;
    const $dayCardList = document.querySelector(
      '.day-card-list'
    ) as HTMLElement;
    customEventEmitter('delete-history', { historyId }, $dayCardList);
    this.$target.style.display = 'none';
  }
}
