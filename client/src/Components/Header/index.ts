import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { $router } from '@/Core/Router';
import { svgIcons } from '@/assets/svgIcons';
import { MainModelType, Props, TodayModelType } from '@/utils/types';
import DateModel from '@/Model/DateModel';
import { DateState } from '@/utils/types';
import HeaderController from '@/Controller/HeaderController';

export default class Header extends Component<DateState, Props> {
  dateModel!: TodayModelType;
  headerController!: any;
  mainModel!: MainModelType;

  setup() {
    this.classIDF = 'Header';

    this.dateModel = DateModel;
    this.dateModel.subscribe(DateModel.key, this);

    this.headerController = HeaderController;

    this.$state = {
      today: this.dateModel.today,
    };
  }

  template() {
    const { year, month } = this.$state!.today;

    return html`
      <div class="header-wrapper container">
        <span class="header-title">우아한 가계부</span>
        <div class="switch">
          <div class="switch btn" id="btn-prev-month">${svgIcons.leftBtn}</div>
          <div class="switch-text">
            <div class="switch-text month">${month}월</div>
            <div class="switch-text year">${year}</div>
          </div>
          <div class="switch btn" id="btn-next-month">${svgIcons.rightBtn}</div>
        </div>
        <ul class="menu">
          <li class="menu-list" id="menu-main">${svgIcons.fileText}</li>
          <li class="menu-list" id="menu-calendar">${svgIcons.calendar}</li>
          <li class="menu-list" id="menu-chart">${svgIcons.chart}</li>
        </ul>
      </div>
    `;
  }

  mounted() {
    this.headerController.changeMenu(this.$target);
  }

  setEvent() {
    this.addEvent('click', '#btn-prev-month', () =>
      this.headerController.handleClickPrevBtn()
    );
    this.addEvent('click', '#btn-next-month', () =>
      this.headerController.handleClickNextBtn()
    );
    this.addEvent('click', '#menu-main', () => {
      $router.push('/main');
      this.headerController.changeMenu(this.$target);
    });
    this.addEvent('click', '#menu-calendar', () => {
      $router.push('/calendar');
      this.headerController.changeMenu(this.$target);
    });
    this.addEvent('click', '#menu-chart', () => {
      $router.push('/charts');
      this.headerController.changeMenu(this.$target);
    });
  }

  removeEvent() {}
  resetEvent() {}
}
