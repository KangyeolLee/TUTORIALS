import Component from '@/Core/Component';
import './styles';
import {
  HistoryModelType,
  Props,
  State,
  Today,
  HistoryType,
} from '@/utils/types';
import { asyncSetState, customEventEmitter, html } from '@/utils/helper';
import HistoryModel from '@/Model/HistoryModel';
import { IHistory } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import HistoryDayCard from '@/Components/HistoryDayCard/index';
import DropDown from '@/Components/DropDown';

interface IMainState extends State {
  historyCards: IHistory[];
  today: Today;
  historyType: HistoryType;
}

export default class Main extends Component<IMainState, Props> {
  historyModel!: HistoryModelType;

  setup() {
    this.historyModel = HistoryModel;
  }

  template() {
    return html`
      <section class="main-history-total">
        <div>전체 내역 <span class="history-total-num"></span>건</div>
        <div class="history-selectors">
          <button class="history-select-btn active" id="history-select-income">
            ${svgIcons.checkSmall}
          </button>
          <span class="text">수입 <span class="income-sum"></span></span>
          <button class="history-select-btn active" id="history-select-expense">
            ${svgIcons.checkSmall}
          </button>
          <span class="text">지출 <span class="expense-sum"></span></span>
        </div>
      </section>
      <ul class="day-card-list"></ul>
      <div class="dropdown"></div>
    `;
  }

  mounted() {
    const $daycardList = this.$target.querySelector(
      '.day-card-list'
    ) as HTMLUListElement;
    const $totalNum = this.$target.querySelector(
      '.history-total-num'
    ) as HTMLSpanElement;
    const $incomeSum = this.$target.querySelector(
      '.income-sum'
    ) as HTMLSpanElement;
    const $expenseSum = this.$target.querySelector(
      '.expense-sum'
    ) as HTMLSpanElement;
    const dropdown = this.$target.querySelector('.dropdown') as HTMLDivElement;

    new HistoryDayCard($daycardList, undefined, {
      $totalNum,
      $incomeSum,
      $expenseSum,
    });

    new DropDown(dropdown, {
      handler: this.handleDropDown.bind(this),
      dropdownList: [
        { text: '수정하기', type: 'edit' },
        {
          text: '삭제하기',
          type: 'delete',
          style: [{ attribute: 'color', value: '#f45452' }],
        },
      ],
    });
  }

  setEvent() {
    this.addEvent(
      'click',
      '#history-select-income',
      this.toggleIncomBtn.bind(this)
    );
    this.addEvent(
      'click',
      '#history-select-expense',
      this.toggleExpenseBtn.bind(this)
    );
    this.addEvent(
      'contextmenu',
      '.day-card-list',
      this.handleContextMenu.bind(this)
    );
  }

  toggleIncomBtn() {
    this.$target
      .querySelector('#history-select-income')
      ?.classList.toggle('active');
    asyncSetState(this.historyModel.toggleType('income'));
  }

  toggleExpenseBtn() {
    this.$target
      .querySelector('#history-select-expense')
      ?.classList.toggle('active');
    asyncSetState(this.historyModel.toggleType('expense'));
  }

  handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    const target = (<HTMLElement>e.target).closest('.history-list-item');
    if (!target) return;

    const dropdown = this.$target.querySelector(
      '.drop-down'
    ) as HTMLUListElement;
    dropdown.style.display = 'flex';
    dropdown.style.top = `${e.pageY}px`;
    dropdown.style.left = `${e.pageX}px`;
    dropdown.style.opacity = '1';
    dropdown.dataset.historyId = (<HTMLUListElement>target).dataset.id;
  }

  handleDropDown(e: MouseEvent) {
    const dropdown = (<HTMLElement>e.target).closest(
      '.drop-down'
    ) as HTMLUListElement;
    const dropdownTarget = (<HTMLElement>e.target).closest(
      '.drop-down-item'
    ) as HTMLLIElement;
    const type = dropdownTarget.dataset.type;
    const historyId = dropdownTarget.parentElement?.dataset.historyId;
    if (!historyId) return;

    if (type === 'edit') this.handleEditHistory(+historyId);
    else if (type === 'delete') this.handleDeleteHistory(+historyId);

    // close dropdown
    dropdown.style.display = 'none';
    dropdown.style.opacity = '0';
  }

  handleEditHistory(historyId: number) {
    const inputbarWrapper = document.querySelector(
      '.input-bar-wrapper'
    ) as HTMLElement;
    const targetHistory = this.historyModel.historyCards.filter(
      (history) => history.id === +historyId
    )[0];
    customEventEmitter('edit-history', targetHistory, inputbarWrapper);
  }
  handleDeleteHistory(historyId: number) {
    customEventEmitter('delete-history', { historyId });
  }
}
