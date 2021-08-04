import Component from '@/Core/Component';
import './styles';
import {
  HistoryModelType,
  Props,
  State,
  Today,
  HistoryType,
} from '@/utils/types';
import { asyncSetState, html } from '@/utils/helper';
import HistoryModel from '@/Model/HistoryModel';
import { IHistory } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import HistoryDayCard from '@/Components/HistoryDayCard/index';
import DropDown from '../DropDown';

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
      dropdownList: [
        { text: '수정하기', handler: this.editHistory },
        {
          text: '삭제하기',
          handler: this.deleteHistory,
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
    console.log(e.clientX, e.clientY);

    const dropdown = this.$target.querySelector(
      '.drop-down'
    ) as HTMLUListElement;
    dropdown.style.display = 'flex';
    dropdown.style.top = `${e.clientY}px`;
    dropdown.style.left = `${e.clientX}px`;
    dropdown.style.opacity = '1';

    console.log('click');
  }

  editHistory(e: MouseEvent) {
    const history = (<HTMLElement>e.target).closest('.history-list-item');
    if (!history) return;

    const id = (<HTMLLIElement>history).dataset.id;
  }

  deleteHistory() {
    console.log('history');
  }
}
