import HistoryModel from '@/Model/HistoryModel';
import { HistoryModelType, TodayModelType } from '@/utils/types';
import DateModel from '@/Model/DateModel';
import { asyncSetState } from '@/utils/helper';

class HeaderController {
  historyModel!: HistoryModelType;
  dateModel!: TodayModelType;

  constructor() {
    this.historyModel = HistoryModel;
    this.dateModel = DateModel;
  }

  handleClickPrevBtn() {
    asyncSetState(
      this.dateModel.getPrevDate(),
      this.historyModel.initState(this.dateModel.today),
      this.historyModel.initHistoryForToday()
    );
  }

  handleClickNextBtn() {
    asyncSetState(
      this.dateModel.getNextData(),
      this.historyModel.initState(this.dateModel.today),
      this.historyModel.initHistoryForToday()
    );
  }

  changeMenu($target: HTMLElement) {
    const path = history.state.path as string;
    $target
      .querySelectorAll('li.menu-list')
      .forEach((elem: Element) => elem.removeAttribute('active'));
    switch (path) {
      case '/main':
        $target.querySelector('li#menu-main')?.setAttribute('active', '');
        break;
      case '/calendar':
        $target.querySelector('li#menu-calendar')?.setAttribute('active', '');
        break;
      case '/charts':
        $target.querySelector('li#menu-chart')?.setAttribute('active', '');
        break;
      case '/user':
        $target.querySelector('li#menu-user')?.setAttribute('active', '');
        break;
    }
  }
}

export default new HeaderController();
